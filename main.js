// main.js
import { setupThemeToggle } from './theme.js';
import { setupStorageHelpers, setupExportImport } from './storage.js';
import { setupHelpModal } from './help.js';
import { setupDiceRoller } from './dice.js';

document.addEventListener('DOMContentLoaded', () => {
  setupStorageHelpers();
  setupThemeToggle();
  setupExportImport();
  setupHelpModal();
  setupDiceRoller();
  // ...add more setup as needed
});
