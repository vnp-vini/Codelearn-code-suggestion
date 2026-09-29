/**
 * CodeLearn Helper - Content Script (VS Code Extension Experience)
 * 1. Tiêm Monaco Snippets vào MAIN world để kích hoạt IntelliSense chuẩn VS Code khi gõ code
 * 2. Tạo VS Code Status Bar ở góc màn hình
 * 3. Tạo VS Code Quick Pick / Command Palette (Alt + P hoặc Ctrl + Shift + P)
 * 4. Tạo VS Code Sidebar Panel (Alt + K)
 */

(function () {
  if (document.getElementById("clh-status-bar")) return;

  // State
  let currentLang = "python";
  let currentCategory = "Tất cả";
  let searchQuery = "";
  let isPanelOpen = false;
  let isQuickPickOpen = false;
  let selectedQuickPickIndex = 0;
  let quickPickItems = [];

  // 1. Tiêm Script vào MAIN World để can thiệp trực tiếp vào Monaco Editor
  function injectMainScripts() {
    function inject(file) {
      try {
        const s = document.createElement("script");
        s.src = chrome.runtime.getURL(file);
        s.onload = function () {
          this.remove();
        };
        (document.head || document.documentElement).appendChild(s);
      } catch (err) {
        console.error("[CodeLearn Helper] Lỗi tiêm script:", file, err);
      }
    }

    inject("data/snippets.js");
    inject("injected/monaco-snippets.js");
  }

  injectMainScripts();

  // Dữ liệu Snippets
  const SNIPPETS_DATA = window.CODE_SNIPPETS || globalThis.CODE_SNIPPETS || {};

  // Hàm chuẩn hóa tiếng Việt không dấu
  function removeVietnameseTones(str) {
    if (!str) return "";
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    return str;
  }

  function escapeHtml(str) {
    if (!str) return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // 2. Tạo VS Code Status Bar ở góc dưới màn hình
  const statusBar = document.createElement("div");
  statusBar.id = "clh-status-bar";
  statusBar.title = "Bấm để mở VS Code Quick Pick (Alt+P) hoặc đổi ngôn ngữ";
  statusBar.innerHTML = `
    <div class="clh-status-item">
      <span>$(code)</span>
      <b>CodeLearn Snippets</b>
    </div>
    <div class="clh-status-divider"></div>
    <div class="clh-status-item" id="clh-status-lang-btn">
      <span id="clh-status-lang-icon">🐍</span>
      <span id="clh-status-lang-text">Python 3</span>
    </div>
    <div class="clh-status-divider"></div>
    <div class="clh-status-item">
      <span class="clh-status-badge">Alt+K Panel</span>
      <span class="clh-status-badge">Alt+P QuickPick</span>
    </div>
  `;
  document.body.appendChild(statusBar);

  // 3. Tạo Floating Launcher Button (Biểu tượng Extension VS Code)
  const launcherBtn = document.createElement("div");
  launcherBtn.id = "clh-launcher-btn";
  launcherBtn.title = "Mở bảng nhắc câu lệnh (Phím tắt: Alt+K)";
  launcherBtn.innerHTML = `
    <span class="clh-launcher-icon">💡</span>
    <span>Nhắc Code</span>
  `;
  document.body.appendChild(launcherBtn);

  // 4. Tạo VS Code Quick Pick / Command Palette (Alt + P / Ctrl + Shift + P)
  const quickPickModal = document.createElement("div");
  quickPickModal.id = "clh-quick-pick-modal";
  quickPickModal.className = "clh-hidden";
  quickPickModal.innerHTML = `
    <div class="clh-qp-input-wrapper">
      <input type="text" class="clh-qp-input" id="clh-qp-input" placeholder="> Chọn ngôn ngữ hoặc gõ tên lệnh để chèn (VD: fastio, cin, fori, sort)..." autocomplete="off">
    </div>
    <div class="clh-qp-list" id="clh-qp-list"></div>
    <div class="clh-qp-footer">
      <span>Dùng phím <b>↑ / ↓</b> để chọn, <b>Enter</b> để chèn, <b>Esc</b> để đóng</span>
      <span>VS Code Quick Pick</span>
    </div>
  `;
  document.body.appendChild(quickPickModal);

  // 5. Tạo VS Code Sidebar Panel (Alt + K)
  const panel = document.createElement("div");
  panel.id = "clh-panel-container";
  panel.className = "clh-hidden";
  panel.innerHTML = `
    <!-- Header (Draggable) -->
    <div class="clh-header" id="clh-drag-handle">
      <div class="clh-brand">
        <span class="clh-brand-icon">📦</span>
        <span class="clh-brand-title">CodeLearn Snippets (VS Code)</span>
      </div>
      <div class="clh-header-actions">
        <button class="clh-icon-btn" id="clh-close-btn" title="Đóng bảng (Esc)">✕</button>
      </div>
    </div>

    <!-- Thanh chọn ngôn ngữ -->
    <div class="clh-lang-bar">
      <span class="clh-lang-label">NGÔN NGỮ HIỆN TẠI:</span>
      <div class="clh-lang-pills">
        <button class="clh-lang-pill active" data-lang="python">
          <span>🐍</span> Python 3
        </button>
        <button class="clh-lang-pill" data-lang="cpp">
          <span>⚡</span> C++
        </button>
      </div>
    </div>

    <!-- Tìm kiếm -->
    <div class="clh-search-wrapper">
      <span class="clh-search-icon-left">🔍</span>
      <input type="text" class="clh-search-input" id="clh-search-input" placeholder="Lọc câu lệnh hoặc gõ tiền tố (fastio, cin, vec)...">
      <button class="clh-search-clear" id="clh-search-clear">✕</button>
    </div>

    <!-- Danh mục Chips -->
    <div class="clh-categories" id="clh-categories"></div>

    <!-- Danh sách câu lệnh -->
    <div class="clh-body" id="clh-body"></div>

    <!-- Footer -->
    <div class="clh-footer">
      <span>Mẹo: Gõ trực tiếp trong khung code kèm <b>Tab</b> để kích hoạt</span>
      <span>Alt+K</span>
    </div>
  `;
  document.body.appendChild(panel);

  // Toast
  const toast = document.createElement("div");
  toast.className = "clh-toast";
  toast.textContent = "Đã sao chép!";
  document.body.appendChild(toast);

  let toastTimer = null;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("clh-show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("clh-show");
    }, 2200);
  }

  // 6. Xử lý Chuyển đổi Ngôn ngữ
  function updateLanguageState(lang, save = true) {
    currentLang = lang;
    currentCategory = "Tất cả";
    if (save && typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
      chrome.storage.local.set({ codelearn_lang: lang });
    }

    // Cập nhật Status Bar
    const statusIcon = document.getElementById("clh-status-lang-icon");
    const statusText = document.getElementById("clh-status-lang-text");
    if (statusIcon && statusText) {
      statusIcon.textContent = lang === "python" ? "🐍" : "⚡";
      statusText.textContent = lang === "python" ? "Python 3" : "C++";
    }

    // Cập nhật Panel Pills
    panel.querySelectorAll(".clh-lang-pill").forEach((pill) => {
      if (pill.dataset.lang === lang) pill.classList.add("active");
      else pill.classList.remove("active");
    });

    renderCategories();
    renderSnippets();
    if (isQuickPickOpen) renderQuickPick();
  }

  // Lắng nghe phát hiện ngôn ngữ tự động từ Monaco (khi người dùng mở bài Python hoặc C++ trên CodeLearn)
  window.addEventListener("CODELEARN_HELPER_LANG_DETECTED", (e) => {
    if (e.detail && e.detail.lang && e.detail.lang !== currentLang) {
      console.log("[CodeLearn Helper] Tự động đồng bộ ngôn ngữ từ Monaco Editor:", e.detail.lang);
      updateLanguageState(e.detail.lang, true);
      showToast(`⚡ Tự động chuyển sang ${e.detail.lang === "python" ? "Python 3" : "C++"}`);
    }
  });

  // 7. Quick Pick Logic (Command Palette)
  const qpInput = document.getElementById("clh-qp-input");
  const qpList = document.getElementById("clh-qp-list");

  function toggleQuickPick(open) {
    isQuickPickOpen = typeof open === "boolean" ? open : !isQuickPickOpen;
    if (isQuickPickOpen) {
      quickPickModal.classList.remove("clh-hidden");
      qpInput.value = "";
      selectedQuickPickIndex = 0;
      renderQuickPick();
      setTimeout(() => qpInput.focus(), 50);
    } else {
      quickPickModal.classList.add("clh-hidden");
    }
  }

  function renderQuickPick() {
    const langData = (window.CODE_SNIPPETS || SNIPPETS_DATA)[currentLang];
    if (!langData) return;

    const query = removeVietnameseTones(qpInput.value.trim());
    quickPickItems = [];

    // Luôn đưa 2 tùy chọn đổi ngôn ngữ lên đầu
    quickPickItems.push({
      type: "action",
      action: "switch-lang",
      targetLang: currentLang === "python" ? "cpp" : "python",
      prefix: "⚡",
      title: currentLang === "python" ? "Đổi sang ngôn ngữ C++" : "Đổi sang ngôn ngữ Python 3",
      category: "Cài đặt ngôn ngữ"
    });

    // Lọc snippets theo query
    langData.snippets.forEach((snip) => {
      const pfxStr = Array.isArray(snip.prefix) ? snip.prefix.join(", ") : snip.prefix;
      const titleMatch = removeVietnameseTones(snip.title).includes(query);
      const descMatch = removeVietnameseTones(snip.desc).includes(query);
      const pfxMatch = removeVietnameseTones(pfxStr).includes(query);
      const tagMatch = snip.tags && snip.tags.some((t) => removeVietnameseTones(t).includes(query));

      if (!query || titleMatch || descMatch || pfxMatch || tagMatch) {
        quickPickItems.push({
          type: "snippet",
          snippet: snip,
          prefix: Array.isArray(snip.prefix) ? snip.prefix[0] : snip.prefix,
          title: snip.title,
          category: snip.category
        });
      }
    });

    qpList.innerHTML = "";
    if (quickPickItems.length === 0) {
      qpList.innerHTML = `<div style="padding: 16px; text-align: center; color: #858585; font-size: 12px;">Không tìm thấy câu lệnh phù hợp</div>`;
      return;
    }

    if (selectedQuickPickIndex >= quickPickItems.length) selectedQuickPickIndex = 0;

    quickPickItems.forEach((item, idx) => {
      const el = document.createElement("div");
      el.className = `clh-qp-item ${idx === selectedQuickPickIndex ? "selected" : ""}`;
      el.innerHTML = `
        <div class="clh-qp-item-main">
          <span class="clh-qp-prefix">${escapeHtml(item.prefix)}</span>
          <span class="clh-qp-title">${escapeHtml(item.title)}</span>
        </div>
        <span class="clh-qp-category">${escapeHtml(item.category)}</span>
      `;

      el.addEventListener("click", () => {
        executeQuickPickItem(item);
      });

      qpList.appendChild(el);
    });

    // Cuộn tới mục đang chọn
    const activeEl = qpList.children[selectedQuickPickIndex];
    if (activeEl) activeEl.scrollIntoView({ block: "nearest" });
  }

  function executeQuickPickItem(item) {
    if (!item) return;
    if (item.type === "action" && item.action === "switch-lang") {
      updateLanguageState(item.targetLang, true);
      renderQuickPick();
      showToast(`Đã chuyển sang ${item.targetLang === "python" ? "Python 3" : "C++"}`);
    } else if (item.type === "snippet") {
      insertSnippetToMonaco(item.snippet.body, item.snippet.code);
      toggleQuickPick(false);
    }
  }

  qpInput.addEventListener("input", () => {
    selectedQuickPickIndex = 0;
    renderQuickPick();
  });

  qpInput.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      selectedQuickPickIndex = (selectedQuickPickIndex + 1) % quickPickItems.length;
      renderQuickPick();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      selectedQuickPickIndex = (selectedQuickPickIndex - 1 + quickPickItems.length) % quickPickItems.length;
      renderQuickPick();
    } else if (e.key === "Enter") {
      e.preventDefault();
      executeQuickPickItem(quickPickItems[selectedQuickPickIndex]);
    } else if (e.key === "Escape") {
      toggleQuickPick(false);
    }
  });

  // Bấm vào status bar mở Quick Pick
  statusBar.addEventListener("click", () => toggleQuickPick());

  // 8. Chèn Snippet vào Monaco Editor
  function insertSnippetToMonaco(body, code) {
    // 1. Thử gửi event tới MAIN world để Monaco snippetController xử lý tab-stops
    window.dispatchEvent(
      new CustomEvent("CODELEARN_HELPER_REQUEST_INSERT", {
        detail: { body: body || code, code: code }
      })
    );

    // 2. Fallback nếu đang ở trong textarea hoặc input thường
    const activeEl = document.activeElement;
    if (activeEl && (activeEl.tagName === "TEXTAREA" || activeEl.tagName === "INPUT")) {
      const start = activeEl.selectionStart || 0;
      const end = activeEl.selectionEnd || 0;
      const val = activeEl.value;
      activeEl.value = val.substring(0, start) + "\n" + code + "\n" + val.substring(end);
      activeEl.selectionStart = activeEl.selectionEnd = start + code.length + 2;
      activeEl.focus();
      showToast("✓ Đã chèn vào trình soạn thảo!");
      return;
    }

    // 3. Fallback sao chép vào clipboard để người dùng dán nếu cần
    copyCode(code);
    showToast("⚡ Đã chèn / sao chép lệnh!");
  }

  function copyCode(text, btnElement) {
    navigator.clipboard.writeText(text).then(() => {
      if (btnElement) {
        const orig = btnElement.innerHTML;
        btnElement.innerHTML = "✓ Đã chép!";
        btnElement.classList.add("clh-copied");
        setTimeout(() => {
          btnElement.innerHTML = orig;
          btnElement.classList.remove("clh-copied");
        }, 1500);
      }
    }).catch(() => {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    });
  }

  // 9. Sidebar Panel Controls (Alt + K)
  function togglePanel(open) {
    isPanelOpen = typeof open === "boolean" ? open : !isPanelOpen;
    if (isPanelOpen) {
      panel.classList.remove("clh-hidden");
      renderCategories();
      renderSnippets();
      const input = document.getElementById("clh-search-input");
      setTimeout(() => input && input.focus(), 100);
    } else {
      panel.classList.add("clh-hidden");
    }
  }

  launcherBtn.addEventListener("click", () => togglePanel());
  document.getElementById("clh-close-btn").addEventListener("click", () => togglePanel(false));

  // Kéo thả Panel
  const dragHandle = document.getElementById("clh-drag-handle");
  let isDragging = false, startX, startY, origX = 0, origY = 0;
  dragHandle.addEventListener("mousedown", (e) => {
    if (e.target.closest(".clh-icon-btn")) return;
    startX = e.clientX - origX;
    startY = e.clientY - origY;
    isDragging = true;
  });
  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    origX = e.clientX - startX;
    origY = e.clientY - startY;
    panel.style.transform = `translate3d(${origX}px, ${origY}px, 0)`;
  });
  document.addEventListener("mouseup", () => {
    isDragging = false;
  });

  // Switch language trên panel
  panel.querySelectorAll(".clh-lang-pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      updateLanguageState(pill.dataset.lang, true);
    });
  });

  // Render Categories trên Panel
  const catContainer = document.getElementById("clh-categories");
  function renderCategories() {
    const langData = (window.CODE_SNIPPETS || SNIPPETS_DATA)[currentLang];
    if (!langData) return;

    catContainer.innerHTML = "";
    langData.categories.forEach((cat) => {
      const chip = document.createElement("button");
      chip.className = `clh-cat-chip ${cat === currentCategory ? "active" : ""}`;
      chip.textContent = cat;
      chip.addEventListener("click", () => {
        currentCategory = cat;
        panel.querySelectorAll(".clh-cat-chip").forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        renderSnippets();
      });
      catContainer.appendChild(chip);
    });
  }

  // Render Snippets trên Panel
  const bodyContainer = document.getElementById("clh-body");
  function renderSnippets() {
    const langData = (window.CODE_SNIPPETS || SNIPPETS_DATA)[currentLang];
    if (!langData) return;

    const query = removeVietnameseTones(searchQuery.trim());
    const filtered = langData.snippets.filter((snip) => {
      if (currentCategory !== "Tất cả" && snip.category !== currentCategory) return false;
      if (query) {
        const pfxStr = Array.isArray(snip.prefix) ? snip.prefix.join(", ") : snip.prefix;
        const titleMatch = removeVietnameseTones(snip.title).includes(query);
        const descMatch = removeVietnameseTones(snip.desc).includes(query);
        const codeMatch = removeVietnameseTones(snip.code).includes(query);
        const pfxMatch = removeVietnameseTones(pfxStr).includes(query);
        return titleMatch || descMatch || codeMatch || pfxMatch;
      }
      return true;
    });

    bodyContainer.innerHTML = "";
    if (filtered.length === 0) {
      bodyContainer.innerHTML = `<div style="text-align: center; padding: 30px; color: #858585; font-size: 12px;">Không tìm thấy câu lệnh phù hợp.</div>`;
      return;
    }

    filtered.forEach((snip) => {
      const card = document.createElement("div");
      card.className = "clh-card";
      const pfxDisplay = Array.isArray(snip.prefix) ? snip.prefix.join(", ") : snip.prefix;

      card.innerHTML = `
        <div class="clh-card-top">
          <div class="clh-card-title-group">
            <span class="clh-card-prefix-tag">${escapeHtml(pfxDisplay)}</span>
            <span class="clh-card-title">${escapeHtml(snip.title)}</span>
          </div>
          <span class="clh-card-badge">${escapeHtml(snip.category)}</span>
        </div>
        <div class="clh-card-desc">${escapeHtml(snip.desc)}</div>
        <div class="clh-code-block">
          <pre><code>${escapeHtml(snip.code)}</code></pre>
        </div>
        <div class="clh-btn-actions">
          <button class="clh-action-btn clh-copy-btn" title="Sao chép câu lệnh">
            📋 Sao chép
          </button>
          <button class="clh-action-btn clh-insert-btn" title="Chèn vào Monaco Editor">
            ⚡ Chèn vào Editor
          </button>
        </div>
      `;

      card.querySelector(".clh-copy-btn").addEventListener("click", function () {
        copyCode(snip.code, this);
        showToast("Đã chép vào clipboard!");
      });

      card.querySelector(".clh-insert-btn").addEventListener("click", () => {
        insertSnippetToMonaco(snip.body, snip.code);
      });

      bodyContainer.appendChild(card);
    });
  }

  // Tìm kiếm Panel
  const panelSearch = document.getElementById("clh-search-input");
  const panelClear = document.getElementById("clh-search-clear");
  panelSearch.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    panelClear.style.display = searchQuery ? "block" : "none";
    renderSnippets();
  });
  panelClear.addEventListener("click", () => {
    panelSearch.value = "";
    searchQuery = "";
    panelClear.style.display = "none";
    panelSearch.focus();
    renderSnippets();
  });

  // 10. Phím tắt toàn cục:
  // - Alt + K: Bật/Tắt Sidebar Panel
  // - Alt + P hoặc Ctrl + Shift + P: Bật/Tắt VS Code Quick Pick / Command Palette
  // - Esc: Đóng các bảng
  document.addEventListener("keydown", (e) => {
    if (e.altKey && (e.key === "p" || e.key === "P")) {
      e.preventDefault();
      toggleQuickPick();
    } else if (e.ctrlKey && e.shiftKey && (e.key === "P" || e.key === "p")) {
      e.preventDefault();
      toggleQuickPick();
    } else if (e.altKey && (e.key === "k" || e.key === "K")) {
      e.preventDefault();
      togglePanel();
    } else if (e.key === "Escape") {
      if (isQuickPickOpen) toggleQuickPick(false);
      else if (isPanelOpen) togglePanel(false);
    }
  });

  // Khởi tạo ngôn ngữ lưu trữ
  if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
    chrome.storage.local.get(["codelearn_lang"], (res) => {
      if (res && res.codelearn_lang) {
        updateLanguageState(res.codelearn_lang, false);
      } else {
        updateLanguageState("python", false);
      }
    });
  } else {
    updateLanguageState("python", false);
  }
})();
