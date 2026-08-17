const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

// Skip admin pages and Footer (Footer already has dark bg by design)
const skipFiles = ['Footer.tsx', 'AdminLayout.tsx', 'AdminDashboardPage.tsx', 'AdminEntityPages.tsx', 'AdminImpactPage.tsx', 'AdminLoginPage.tsx'];

walkDir(path.join(__dirname, 'client/src'), function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    const basename = path.basename(filePath);
    if (skipFiles.includes(basename)) return;

    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Reverse dark-mode text colors back to light-mode
    content = content.replace(/text-white(?=[\s"'])/g, 'text-gray-900');
    content = content.replace(/text-gray-100(?=[\s"'])/g, 'text-gray-800');
    content = content.replace(/text-gray-200(?=[\s"'])/g, 'text-gray-700');
    content = content.replace(/text-gray-300(?=[\s"'])/g, 'text-gray-600');
    content = content.replace(/text-slate-100(?=[\s"'])/g, 'text-slate-800');
    content = content.replace(/text-slate-200(?=[\s"'])/g, 'text-slate-700');
    content = content.replace(/text-slate-300(?=[\s"'])/g, 'text-slate-600');

    // Reverse dark-mode backgrounds back to light-mode
    content = content.replace(/bg-surface(?=[\s"'/])/g, 'bg-white');
    content = content.replace(/bg-background(?=[\s"'/])/g, 'bg-gray-50');

    // Reverse dark-mode borders
    content = content.replace(/border-border(?=[\s"'/])/g, 'border-gray-200');

    if (original !== content) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated: ' + filePath);
    }
  }
});
