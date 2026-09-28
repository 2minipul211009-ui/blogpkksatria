/**
 * TechMarket Journal - Editorial Blog & News Edition
 * Materi: Bab 4 Pemasaran Produk Perangkat Keras (Hal. 103-122)
 * Developed by: Satria Nugraha
 * Features: Reading Progress, Sticky TOC Tracking, Font Resizer, Dark/Light Mode, Print & Share
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ===================================================================
     1. Theme Switcher (Light Mode default for editorial reading)
  =================================================================== */
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const savedTheme = localStorage.getItem('techmarket_theme') || 'light';
  document.body.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.body.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      document.body.setAttribute('data-theme', newTheme);
      localStorage.setItem('techmarket_theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    const icon = themeToggleBtn.querySelector('i');
    if (theme === 'dark') {
      icon.className = 'fa-solid fa-sun';
      icon.style.color = '#f59e0b';
    } else {
      icon.className = 'fa-solid fa-moon';
      icon.style.color = '';
    }
  }

  /* ===================================================================
     2. Reading Progress Indicator & Scroll-to-Top Button
  =================================================================== */
  const readingProgressBar = document.getElementById('readingProgressBar');
  const scrollToTopBtn = document.getElementById('scrollToTopBtn');

  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    if (readingProgressBar) {
      readingProgressBar.style.width = scrolled + '%';
    }

    if (scrollToTopBtn) {
      if (winScroll > 400) {
        scrollToTopBtn.classList.add('visible');
      } else {
        scrollToTopBtn.classList.remove('visible');
      }
    }
  });

  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ===================================================================
     3. Font Size Adjuster for Reading Comfort (A- / A / A+)
  =================================================================== */
  const fontDecBtn = document.getElementById('fontDecBtn');
  const fontResetBtn = document.getElementById('fontResetBtn');
  const fontIncBtn = document.getElementById('fontIncBtn');
  const articleBody = document.getElementById('articleBody');

  let currentFontSize = parseFloat(localStorage.getItem('reading_font_size')) || 1.08; // rem

  function applyFontSize(size) {
    if (!articleBody) return;
    const paragraphs = articleBody.querySelectorAll('.article-content p, .editorial-numbered-list li, .editorial-bullet-check li');
    paragraphs.forEach(p => {
      p.style.fontSize = `${size}rem`;
    });
    localStorage.setItem('reading_font_size', size);
  }

  if (currentFontSize !== 1.08) {
    applyFontSize(currentFontSize);
  }

  if (fontIncBtn) {
    fontIncBtn.addEventListener('click', () => {
      if (currentFontSize < 1.35) {
        currentFontSize += 0.08;
        applyFontSize(currentFontSize);
      }
    });
  }

  if (fontDecBtn) {
    fontDecBtn.addEventListener('click', () => {
      if (currentFontSize > 0.9) {
        currentFontSize -= 0.08;
        applyFontSize(currentFontSize);
      }
    });
  }

  if (fontResetBtn) {
    fontResetBtn.addEventListener('click', () => {
      currentFontSize = 1.08;
      applyFontSize(currentFontSize);
    });
  }

  /* ===================================================================
     4. Table of Contents (TOC) Active Link on Scroll
  =================================================================== */
  const tocLinks = document.querySelectorAll('.toc-links-list .toc-link');
  const trackedSections = document.querySelectorAll('.editorial-section, .author-editorial-box');

  function updateActiveToc() {
    const scrollPosition = window.scrollY + 160;

    trackedSections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        tocLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveToc);

  /* ===================================================================
     5. Print Clean Article Action
  =================================================================== */
  const printArticleBtn = document.getElementById('printArticleBtn');
  if (printArticleBtn) {
    printArticleBtn.addEventListener('click', () => {
      window.print();
    });
  }

  /* ===================================================================
     6. Copy Page URL / Share Button
  =================================================================== */
  const copyUrlBtn = document.getElementById('copyUrlBtn');
  const copyAlert = document.getElementById('copyAlert');

  if (copyUrlBtn) {
    copyUrlBtn.addEventListener('click', () => {
      const currentUrl = window.location.href;
      navigator.clipboard.writeText(currentUrl).then(() => {
        if (copyAlert) {
          copyAlert.classList.remove('hidden');
          setTimeout(() => {
            copyAlert.classList.add('hidden');
          }, 3000);
        }
      }).catch(() => {
        // Fallback
        alert("Tautan halaman: " + window.location.href);
      });
    });
  }

});
