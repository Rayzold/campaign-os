// Dark/Light mode toggle
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    const setTheme = (mode) => {
      document.documentElement.setAttribute('data-theme', mode);
      window.campaignOS.saveData('theme', mode);
      themeBtn.textContent = mode === 'dark' ? '🌙 Dark' : '☀️ Light';
    };
    // Initial theme
    let theme = window.campaignOS.loadData('theme', 'dark');
    setTheme(theme);
    themeBtn.onclick = () => {
      theme = (theme === 'dark') ? 'light' : 'dark';
      setTheme(theme);
    };
  }

  // Theme CSS variables
  const themeVars = {
    dark: {
      '--bg': '#13131f', '--surface': '#1a1a2e', '--surface2': '#161625', '--border': '#252538', '--muted': '#4a4a6a', '--text': '#e2e8f0'
    },
    light: {
      '--bg': '#f8fafc', '--surface': '#fff', '--surface2': '#f1f5f9', '--border': '#e2e8f0', '--muted': '#64748b', '--text': '#22223b'
    }
  };
  function applyThemeVars(mode) {
    const vars = themeVars[mode] || themeVars.dark;
    for (const k in vars) document.documentElement.style.setProperty(k, vars[k]);
  }
  document.documentElement.addEventListener('data-theme', (e) => applyThemeVars(e.detail));
  // Also apply on load
  applyThemeVars(window.campaignOS.loadData('theme', 'dark'));

  // --- Export/Import Data ---
  const exportBtn = document.getElementById('export-btn');
  const importBtn = document.getElementById('import-btn');
  const importFile = document.getElementById('import-file');

  if (exportBtn) {
    exportBtn.onclick = () => {
      // Gather all localStorage keys for this app
      const data = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) data[key] = localStorage.getItem(key);
      }
      const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'campaign-os-data.json';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 100);
    };
  }

  if (importBtn && importFile) {
    importBtn.onclick = () => importFile.click();
    importFile.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const data = JSON.parse(evt.target.result);
          for (const key in data) {
            localStorage.setItem(key, data[key]);
          }
          alert('Data imported! Please refresh the page.');
        } catch (err) {
          alert('Import failed: Invalid file.');
        }
      };
      reader.readAsText(file);
    };
  }
  // --- End Export/Import ---

// campaign-os.js
// Scaffold for future JavaScript interactivity
// Add your interactive logic here

document.addEventListener('DOMContentLoaded', () => {
  // Example: log page load
  console.log('campaign-os loaded');
  // Persistent data storage helpers
  window.campaignOS = window.campaignOS || {};
  window.campaignOS.saveData = function(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) { console.warn('Save failed', e); }
  };
  window.campaignOS.loadData = function(key, fallback) {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : fallback;
    } catch (e) { return fallback; }
  };

  // Example usage: campaignOS.saveData('notes', {text: 'Session 1'});
  // Example usage: const notes = campaignOS.loadData('notes', {});

  // Help button logic
  const helpBtn = document.getElementById('help-btn');
  const helpModal = document.getElementById('help-modal');
  if (helpBtn && helpModal) {
    helpBtn.onclick = () => {
      helpModal.style.display = 'flex';
    };
    document.addEventListener('keydown', (e) => {
      if (helpModal.style.display !== 'none' && (e.key === 'Escape' || e.key === 'Esc')) {
        helpModal.style.display = 'none';
      }
    });
  }
});
