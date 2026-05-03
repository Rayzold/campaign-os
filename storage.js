// storage.js
export function setupStorageHelpers() {
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
}

export function setupExportImport() {
  const exportBtn = document.getElementById('export-btn');
  const importBtn = document.getElementById('import-btn');
  const importFile = document.getElementById('import-file');

  if (exportBtn) {
    exportBtn.onclick = () => {
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
}
