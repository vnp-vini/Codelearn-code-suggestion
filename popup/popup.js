/**
 * Script điều khiển giao diện Popup của CodeLearn Helper
 */

document.addEventListener("DOMContentLoaded", () => {
  // State
  let currentLang = "python";
  let currentCategory = "Tất cả";
  let searchQuery = "";

  // DOM Elements
  const langButtons = document.querySelectorAll(".lang-btn");
  const searchInput = document.getElementById("search-input");
  const clearSearchBtn = document.getElementById("clear-search-btn");
  const categoryChips = document.getElementById("category-chips");
  const snippetsContainer = document.getElementById("snippets-container");
  const resultCount = document.getElementById("result-count");
  const toast = document.getElementById("toast");

  // Helper hàm chuẩn hóa tiếng Việt không dấu để tìm kiếm thông minh
  function removeVietnameseTones(str) {
    if (!str) return "";
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    return str;
  }

  // Load language đã lưu trước đó
  function loadSavedLanguage() {
    if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
      chrome.storage.local.get(["codelearn_lang"], (result) => {
        if (result && result.codelearn_lang) {
          switchLanguage(result.codelearn_lang, false);
        } else {
          renderCategories();
          renderSnippets();
        }
      });
    } else {
      const saved = localStorage.getItem("codelearn_lang");
      if (saved) {
        switchLanguage(saved, false);
      } else {
        renderCategories();
        renderSnippets();
      }
    }
  }

  // Lưu ngôn ngữ đã chọn
  function saveLanguage(lang) {
    if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
      chrome.storage.local.set({ codelearn_lang: lang });
    } else {
      localStorage.setItem("codelearn_lang", lang);
    }
  }

  // Chuyển đổi ngôn ngữ
  function switchLanguage(lang, doSave = true) {
    if (!CODE_SNIPPETS[lang]) return;
    currentLang = lang;
    currentCategory = "Tất cả";
    if (doSave) saveLanguage(lang);

    langButtons.forEach((btn) => {
      if (btn.dataset.lang === lang) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    renderCategories();
    renderSnippets();
  }

  // Render danh sách Category Chips
  function renderCategories() {
    const langData = CODE_SNIPPETS[currentLang];
    if (!langData) return;

    categoryChips.innerHTML = "";
    langData.categories.forEach((cat) => {
      const btn = document.createElement("button");
      btn.className = `chip-btn ${cat === currentCategory ? "active" : ""}`;
      btn.textContent = cat;
      btn.addEventListener("click", () => {
        currentCategory = cat;
        document.querySelectorAll(".chip-btn").forEach((c) => c.classList.remove("active"));
        btn.classList.add("active");
        renderSnippets();
      });
      categoryChips.appendChild(btn);
    });
  }

  // Render danh sách Snippets lọc theo tìm kiếm và category
  function renderSnippets() {
    const langData = CODE_SNIPPETS[currentLang];
    if (!langData) return;

    const normalizedQuery = removeVietnameseTones(searchQuery.trim());

    const filtered = langData.snippets.filter((snip) => {
      // Lọc theo Category
      if (currentCategory !== "Tất cả" && snip.category !== currentCategory) {
        return false;
      }

      // Lọc theo Search Query
      if (normalizedQuery) {
        const titleMatch = removeVietnameseTones(snip.title).includes(normalizedQuery);
        const descMatch = removeVietnameseTones(snip.desc).includes(normalizedQuery);
        const codeMatch = removeVietnameseTones(snip.code).includes(normalizedQuery);
        const tagMatch = snip.tags && snip.tags.some((t) => removeVietnameseTones(t).includes(normalizedQuery));
        return titleMatch || descMatch || codeMatch || tagMatch;
      }

      return true;
    });

    resultCount.textContent = `Hiển thị ${filtered.length} câu lệnh (${langData.name})`;

    snippetsContainer.innerHTML = "";

    if (filtered.length === 0) {
      snippetsContainer.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">🔎</div>
          <p>Không tìm thấy lệnh nào phù hợp với "<b>${escapeHtml(searchQuery)}</b>"</p>
        </div>
      `;
      return;
    }

    filtered.forEach((snip) => {
      const card = document.createElement("div");
      card.className = "snippet-card";
      const pfxDisplay = Array.isArray(snip.prefix) ? snip.prefix.join(", ") : snip.prefix;

      card.innerHTML = `
        <div class="snippet-header">
          <div class="snippet-title-group">
            <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
              <span class="snippet-prefix-tag">${escapeHtml(pfxDisplay)}</span>
              <span class="snippet-title">${escapeHtml(snip.title)}</span>
            </div>
            <span class="snippet-badge">${escapeHtml(snip.category)}</span>
          </div>
        </div>
        <p class="snippet-desc">${escapeHtml(snip.desc)}</p>
        <div class="code-wrapper">
          <pre><code>${escapeHtml(snip.code)}</code></pre>
          <button class="copy-btn" title="Sao chép câu lệnh" data-code="${encodeURIComponent(snip.code)}">
            📋 Sao chép
          </button>
        </div>
      `;

      // Copy button handler
      const copyBtn = card.querySelector(".copy-btn");
      copyBtn.addEventListener("click", () => {
        const codeToCopy = decodeURIComponent(copyBtn.getAttribute("data-code"));
        copyToClipboard(codeToCopy, copyBtn);
      });

      snippetsContainer.appendChild(card);
    });
  }

  // Sao chép code vào clipboard
  function copyToClipboard(text, btnElement) {
    navigator.clipboard.writeText(text).then(() => {
      if (btnElement) {
        const originalText = btnElement.innerHTML;
        btnElement.innerHTML = "✓ Đã chép!";
        btnElement.classList.add("copied");
        setTimeout(() => {
          btnElement.innerHTML = originalText;
          btnElement.classList.remove("copied");
        }, 1800);
      }
      showToast("Đã chép mã lệnh vào clipboard!");
    }).catch((err) => {
      console.error("Không thể chép:", err);
      // Fallback
      fallbackCopy(text);
      showToast("Đã sao chép!");
    });
  }

  function fallbackCopy(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }

  // Hiển thị Toast thông báo
  let toastTimer = null;
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2000);
  }

  // Escape HTML để tránh XSS
  function escapeHtml(str) {
    if (!str) return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Event Listeners cho Ngôn ngữ
  langButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const selected = btn.dataset.lang;
      if (selected !== currentLang) {
        switchLanguage(selected, true);
      }
    });
  });

  // Event Listener cho Tìm kiếm
  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    clearSearchBtn.style.display = searchQuery ? "block" : "none";
    renderSnippets();
  });

  clearSearchBtn.addEventListener("click", () => {
    searchInput.value = "";
    searchQuery = "";
    clearSearchBtn.style.display = "none";
    searchInput.focus();
    renderSnippets();
  });

  // Khởi tạo
  loadSavedLanguage();
});
