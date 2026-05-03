// help.js
export function setupHelpModal() {
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
}
