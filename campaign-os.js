// Shared init for static HTML tool pages (not using main.js as entry).
document.addEventListener('DOMContentLoaded', () => {
  void (async () => {
    const { setupStorageHelpers, setupExportImport } = await import('./storage.js');
    const { setupThemeToggle } = await import('./theme.js');
    const { setupHelpModal } = await import('./help.js');
    setupStorageHelpers();
    setupThemeToggle();
    setupExportImport();
    setupHelpModal();
  })().catch(function (err) {
    console.warn('campaign-os init failed', err);
  });
});
