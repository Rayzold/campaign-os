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
      /* Canvas darkest; surfaces clearly elevated; borders readable */
      '--bg': '#06060e',
      '--surface': '#13132a',
      '--surface2': '#1a1a38',
      '--border': '#4a4a78',
      '--muted': '#a8b8d0',
      '--text': '#f4f6fb',
      '--text-subtle': '#7c8ca3'
    },
    light: {
      /* Low-glare “paper”: no pure white; darker desk + softer panels */
      '--bg': '#6f7a89',
      '--surface': '#a8b2c0',
      '--surface2': '#949fae',
      '--border': '#4a5462',
      '--muted': '#1c2533',
      '--text': '#0b0f14',
      '--text-subtle': '#323c49'
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
