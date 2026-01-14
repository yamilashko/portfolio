(function () {
  const THEME_KEY = "portfolio_theme"; // ← вот так

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme); // ← вот так

    const btn = document.getElementById("themeToggle");
    if (btn) {
      const isDark = theme === "dark";
      btn.setAttribute("aria-pressed", isDark ? "true" : "false");
      btn.textContent = isDark ? "Светлая тема" : "Тёмная тема";
    }
  }

  function init() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "dark" || saved === "light") {
      applyTheme(saved);
    } else {
      const prefersDark = window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      applyTheme(prefersDark ? "dark" : "light");
    }

    const toggle = document.getElementById("themeToggle");
    if (toggle) {
      toggle.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme") || "light";
        const next = current === "dark" ? "light" : "dark";
        localStorage.setItem(THEME_KEY, next);
        applyTheme(next);
      });
    }

    const backBtn = document.getElementById("backToTop");
    if (backBtn) {
      backBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    const form = document.getElementById("contactForm");
    if (form) {
      const status = document.getElementById("formStatus");

      const setStatus = (text) => {
        if (!status) return;
        status.textContent = text;
        status.hidden = !text;
      };

      form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Сброс подсветки ошибок
        form.querySelectorAll("[aria-invalid='true']").forEach((el) => {
          el.removeAttribute("aria-invalid");
        });

        if (!form.checkValidity()) {
          const firstInvalid = form.querySelector(":invalid");
          if (firstInvalid) {
            firstInvalid.setAttribute("aria-invalid", "true");
            firstInvalid.focus();
          }
          setStatus("Пожалуйста, заполните все поля корректно.");
          return;
        }

        setStatus("Спасибо! Сообщение готово к отправке. Я отвечу вам как можно скорее.");
        form.reset();
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();