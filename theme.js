// theme.js
export function setupThemeToggle() {
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    const setTheme = (mode) => {
      document.documentElement.setAttribute('data-theme', mode);
      window.campaignOS.saveData('theme', mode);
      themeBtn.textContent = mode === 'dark' ? '🌙 Dark' : '☀️ Light';
    };
    let theme = window.campaignOS.loadData('theme', 'dark');
    setTheme(theme);
    themeBtn.onclick = () => {
      theme = (theme === 'dark') ? 'light' : 'dark';
      setTheme(theme);
    };
  }
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
  applyThemeVars(window.campaignOS.loadData('theme', 'dark'));
}
