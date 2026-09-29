/**
 * CodeLearn Monaco Editor Integration (MAIN World)
 * Tích hợp trực tiếp vào trình soạn thảo Monaco của CodeLearn.io
 * Cung cấp IntelliSense Snippet Autocomplete, Tab-Stops và gợi ý chuẩn VS Code
 */

(function () {
  console.log("[CodeLearn Helper] Monaco Snippets Injector khởi chạy...");

  const SNIPPETS_DATA = window.CODE_SNIPPETS || globalThis.CODE_SNIPPETS;
  let isRegistered = false;
  let activeLanguage = "python"; // Mặc định hoặc theo model

  // Chuyển đổi tên ngôn ngữ của Monaco sang id nội bộ ('python' | 'cpp')
  function normalizeLang(monacoLang) {
    if (!monacoLang) return null;
    const l = monacoLang.toLowerCase();
    if (l.includes("py") || l === "python" || l === "python3") return "python";
    if (l.includes("c++") || l.includes("cpp") || l === "c_cpp" || l === "c") return "cpp";
    return null;
  }

  // Đăng ký CompletionItemProvider cho Monaco
  function registerMonacoProviders() {
    if (!window.monaco || !window.monaco.languages) return;
    if (isRegistered) return;
    isRegistered = true;

    const data = window.CODE_SNIPPETS || SNIPPETS_DATA;
    if (!data) {
      console.warn("[CodeLearn Helper] Chưa tìm thấy CODE_SNIPPETS");
      return;
    }

    console.log("[CodeLearn Helper] Đang đăng ký VS Code Snippet Providers vào Monaco Editor...");

    // Cấu hình ngôn ngữ đăng ký
    const langMap = [
      { key: "python", targets: ["python", "python3", "py"] },
      { key: "cpp", targets: ["cpp", "c++", "c_cpp", "c"] }
    ];

    langMap.forEach(({ key, targets }) => {
      const langConfig = data[key];
      if (!langConfig || !langConfig.snippets) return;

      targets.forEach((targetLang) => {
        try {
          window.monaco.languages.registerCompletionItemProvider(targetLang, {
            triggerCharacters: [".", ">", ":", " ", "(", "_"],
            provideCompletionItems: function (model, position) {
              const wordUntil = model.getWordUntilPosition(position);
              const defaultRange = {
                startLineNumber: position.lineNumber,
                endLineNumber: position.lineNumber,
                startColumn: wordUntil.startColumn,
                endColumn: wordUntil.endColumn
              };

              const suggestions = [];

              langConfig.snippets.forEach((snip, index) => {
                const prefixes = Array.isArray(snip.prefix) ? snip.prefix : [snip.prefix || snip.id];

                prefixes.forEach((pfx, pfxIndex) => {
                  suggestions.push({
                    label: {
                      label: pfx,
                      detail: ` (${snip.title})`,
                      description: snip.category
                    },
                    kind: window.monaco.languages.CompletionItemKind.Snippet,
                    documentation: {
                      value: `### 💡 ${snip.title}\n**Phân loại:** \`${snip.category}\`\n\n${snip.desc}\n\n\`\`\`${key === "python" ? "python" : "cpp"}\n${snip.code}\n\`\`\``
                    },
                    detail: `CodeLearn • ${snip.title}`,
                    insertText: snip.body || snip.code,
                    insertTextRules: window.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    range: defaultRange,
                    // Sắp xếp ưu tiên hiển thị cao
                    sortText: `00_${String(index).padStart(3, "0")}_${pfxIndex}`
                  });
                });
              });

              return { suggestions: suggestions };
            }
          });
          console.log(`[CodeLearn Helper] Đã kích hoạt Snippets cho ngôn ngữ: ${targetLang}`);
        } catch (err) {
          console.error(`[CodeLearn Helper] Lỗi đăng ký ${targetLang}:`, err);
        }
      });
    });

    // Thông báo cho Content script biết đã kích hoạt Monaco thành công
    window.dispatchEvent(new CustomEvent("CODELEARN_HELPER_MONACO_READY"));

    // Lắng nghe phát hiện ngôn ngữ tự động khi editor được tạo
    listenToEditorChanges();
  }

  // Lắng nghe thay đổi editor và model
  function listenToEditorChanges() {
    if (!window.monaco || !window.monaco.editor) return;

    function checkActiveModel() {
      const editors = window.monaco.editor.getEditors();
      if (editors && editors.length > 0) {
        const ed = editors.find((e) => e.hasWidgetFocus()) || editors[0];
        const model = ed.getModel();
        if (model) {
          const monacoLang = model.getLanguageId();
          const normalized = normalizeLang(monacoLang);
          if (normalized && normalized !== activeLanguage) {
            activeLanguage = normalized;
            window.dispatchEvent(
              new CustomEvent("CODELEARN_HELPER_LANG_DETECTED", {
                detail: { lang: normalized, raw: monacoLang }
              })
            );
          }
        }
      }
    }

    // Kiểm tra định kỳ và khi editor được tạo
    window.monaco.editor.onDidCreateModel(() => {
      setTimeout(checkActiveModel, 300);
    });

    setInterval(checkActiveModel, 2000);
    checkActiveModel();
  }

  // Chèn snippet vào Monaco Editor hiện tại
  function insertSnippetIntoMonaco(body, code) {
    if (!window.monaco || !window.monaco.editor) return false;
    const editors = window.monaco.editor.getEditors();
    if (!editors || editors.length === 0) return false;

    const editor = editors.find((e) => e.hasTextFocus()) || editors[0];
    editor.focus();

    // Thử dùng snippetController2 (chuẩn VS Code để hỗ trợ Tab-stops)
    try {
      const snippetController = editor.getContribution("snippetController2");
      if (snippetController && typeof snippetController.insert === "function") {
        snippetController.insert(body || code);
        return true;
      }
    } catch (e) {
      console.warn("snippetController2 error, fallback to executeEdits:", e);
    }

    // Fallback: Chèn qua executeEdits
    const selection = editor.getSelection();
    editor.executeEdits("codelearn-helper", [
      {
        range: selection,
        text: code,
        forceMoveMarkers: true
      }
    ]);
    return true;
  }

  // Lắng nghe yêu cầu chèn code từ Content Script
  window.addEventListener("CODELEARN_HELPER_REQUEST_INSERT", (e) => {
    if (e.detail) {
      const { body, code } = e.detail;
      const success = insertSnippetIntoMonaco(body, code);
      window.dispatchEvent(
        new CustomEvent("CODELEARN_HELPER_INSERT_RESULT", {
          detail: { success }
        })
      );
    }
  });

  // Vòng lặp chờ Monaco sẵn sàng
  function waitForMonaco() {
    if (window.monaco && window.monaco.languages) {
      registerMonacoProviders();
    } else {
      let attempts = 0;
      const interval = setInterval(() => {
        attempts++;
        if (window.monaco && window.monaco.languages) {
          clearInterval(interval);
          registerMonacoProviders();
        } else if (attempts > 50) {
          // Dừng sau 25 giây
          clearInterval(interval);
        }
      }, 500);
    }
  }

  waitForMonaco();
})();
