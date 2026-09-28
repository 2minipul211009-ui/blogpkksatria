/**
 * HARDWARE PKK BAB 4 - NEO-CYBERPUNK SCRIPTS
 * Developed by: Satria Nugraha
 * Features:
 * - Dynamic 0-100% Rainbow Floating Progress Bar Capsule
 * - Real-Time Percentage Display (⚡ 0% to ⚡ 100%)
 * - Active Left Dock Link on Scroll
 * - Smooth Quick Scroll & Utilities (Share, Print)
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ===================================================================
     1. Floating Rainbow Progress Capsule (0% - 100%)
     Matching the Screenshots' signature floating bottom progress bar!
  =================================================================== */
  const rainbowProgressFill = document.getElementById('rainbowProgressFill');
  const percentText = document.getElementById('percentText');
  const floatingCapsule = document.getElementById('floatingProgressCapsule');

  function updateRainbowProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    if (docHeight > 0) {
      let progress = (scrollTop / docHeight) * 100;
      progress = Math.min(100, Math.max(0, progress));
      const roundedPercent = Math.round(progress);

      if (rainbowProgressFill) {
        rainbowProgressFill.style.width = `${progress}%`;
      }

      if (percentText) {
        percentText.textContent = `${roundedPercent}%`;
      }

      // Visual feedback when reaching 100%
      if (floatingCapsule) {
        if (roundedPercent >= 99) {
          floatingCapsule.style.borderColor = '#00ff87';
          floatingCapsule.style.boxShadow = '0 0 25px rgba(0, 255, 135, 0.7), 4px 4px 0px #000';
        } else {
          floatingCapsule.style.borderColor = '#000000';
          floatingCapsule.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.75), 4px 4px 0px #000';
        }
      }
    }
  }

  window.addEventListener('scroll', updateRainbowProgress, { passive: true });
  updateRainbowProgress(); // initial call

  /* ===================================================================
     2. Left Floating Dock Active Tracker
  =================================================================== */
  const dockLinks = document.querySelectorAll('.floating-left-dock .dock-btn');
  const sections = document.querySelectorAll('section[id], header[id]');

  function updateActiveDock() {
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        dockLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveDock, { passive: true });

  /* ===================================================================
     3. Right Floating Dock Actions
  =================================================================== */
  const btnScrollUp = document.getElementById('btnScrollUp');
  const btnSharePage = document.getElementById('btnSharePage');
  const btnPrintClean = document.getElementById('btnPrintClean');

  if (btnScrollUp) {
    btnScrollUp.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (btnSharePage) {
    btnSharePage.addEventListener('click', () => {
      const url = window.location.href;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
          showFloatingToast("⚡ Tautan artikel berhasil disalin!");
        }).catch(() => {
          prompt("Salin tautan ini:", url);
        });
      } else {
        prompt("Salin tautan ini:", url);
      }
    });
  }

  if (btnPrintClean) {
    btnPrintClean.addEventListener('click', () => {
      window.print();
    });
  }

  /* ===================================================================
     4. Custom Toast Notification
  =================================================================== */
  function showFloatingToast(msg) {
    const existingToast = document.querySelector('.neo-toast');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.className = 'neo-toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${msg}`;
    
    // Toast styling
    toast.style.position = 'fixed';
    toast.style.top = '24px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.backgroundColor = '#ffe600';
    toast.style.color = '#000000';
    toast.style.border = '2.5px solid #000000';
    toast.style.borderRadius = '9999px';
    toast.style.padding = '8px 20px';
    toast.style.fontFamily = "'Outfit', sans-serif";
    toast.style.fontWeight = '800';
    toast.style.fontSize = '0.9rem';
    toast.style.boxShadow = '4px 4px 0px #000000';
    toast.style.zIndex = '999999';
    toast.style.animation = 'fadeInDown 0.25s ease';

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(-10px)';
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }

  /* ===================================================================
     5. Theme Mode Toggle Button
  =================================================================== */
  const themeModeToggle = document.getElementById('themeModeToggle');
  if (themeModeToggle) {
    themeModeToggle.addEventListener('click', () => {
      showFloatingToast("Modul Resmi Bab 4 PKK - SMK TKJ (Satria Nugraha)");
    });
  }

});
