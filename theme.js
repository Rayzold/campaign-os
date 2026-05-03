// theme.js
export function setupThemeToggle() {
  // Fallback localStorage helpers if campaignOS is not ready
  function getTheme() {
    try {
      if (window.campaignOS && window.campaignOS.loadData) {
        return window.campaignOS.loadData('theme', 'dark');
      }
      const v = localStorage.getItem('theme');
      return v ? JSON.parse(v) : 'dark';
    } catch (e) { return 'dark'; }
  }
  function setThemeStorage(mode) {
    try {
      if (window.campaignOS && window.campaignOS.saveData) {
        window.campaignOS.saveData('theme', mode);
      } else {
        localStorage.setItem('theme', JSON.stringify(mode));
      }
    } catch (e) {}
  }
  const themeBtn = document.getElementById('theme-toggle');
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
  if (themeBtn) {
    const setTheme = (mode) => {
      document.documentElement.setAttribute('data-theme', mode);
      setThemeStorage(mode);
      themeBtn.textContent = mode === 'dark' ? '🌙 Dark' : '☀️ Light';
      applyThemeVars(mode);
    };
    let theme = getTheme();
    setTheme(theme);
    themeBtn.onclick = () => {
      theme = (theme === 'dark') ? 'light' : 'dark';
      setTheme(theme);
    };
  }
  // Also apply on load
  applyThemeVars(getTheme());
}
