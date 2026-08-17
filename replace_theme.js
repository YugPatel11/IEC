const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir(path.join(__dirname, 'client/src'), function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    content = content.replace(/text-gray-900/g, 'text-white');
    content = content.replace(/text-slate-900/g, 'text-white');
    content = content.replace(/text-gray-800/g, 'text-gray-100');
    content = content.replace(/text-gray-700/g, 'text-gray-200');
    content = content.replace(/text-slate-800/g, 'text-slate-100');
    content = content.replace(/text-slate-700/g, 'text-slate-200');
    content = content.replace(/text-gray-600/g, 'text-gray-300');
    content = content.replace(/text-slate-600/g, 'text-slate-300');
    
    // Backgrounds
    content = content.replace(/bg-white/g, 'bg-surface');
    content = content.replace(/bg-gray-50/g, 'bg-background');
    content = content.replace(/bg-slate-50/g, 'bg-background');
    content = content.replace(/bg-gray-100/g, 'bg-surface');
    content = content.replace(/bg-slate-100/g, 'bg-surface');
    
    // Borders
    content = content.replace(/border-gray-200/g, 'border-border');
    content = content.replace(/border-slate-200/g, 'border-border');
    content = content.replace(/border-gray-300/g, 'border-border');
    content = content.replace(/border-slate-300/g, 'border-border');

    if (original !== content) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated: ' + filePath);
    }
  }
});
