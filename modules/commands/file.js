const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "vfile",
    version: "1.0.0", 
    hasPermssion: 0,
    Rent: 1,
    credits: "Vtuandz",
    description: "Hiển thị thư mục và dung lượng các file",
    commandCategory: "admin", 
    usages: "showFolder [đường dẫn]", 
    cooldowns: 0
  },
  run: async function({ api, event, args }) {
    const p = args[0] || './';
    let d = [];
    let t = 0;

    try {
      const f = fs.readdirSync(p).filter(i => !i.startsWith('.')).sort((a, b) => {
        const aP = path.join(p, a);
        const bP = path.join(p, b);
        const sA = fs.statSync(aP);
        const sB = fs.statSync(bP);
        return (sA.isDirectory() !== sB.isDirectory()) ? sB.isDirectory() - sA.isDirectory() : a.localeCompare(b);
      });

      f.forEach((n, i) => {
        const p2 = path.join(p, n);
        const s = fs.statSync(p2);

        if (s.isDirectory()) {
          const ts = getTotalSize(p2);
          d.push(`${'  '.repeat(1)}${d.length + 1}. 📁 ${n} - ${formatSize(ts)}`);
          t += ts;
        } else {
          d.push(`${'  '.repeat(1)}${d.length + 1}. 📄 ${n} - ${formatSize(s.size)}`);
          t += s.size;
        }
      });

      const r = `Danh sách thư mục và file:\n${d.join('\n')}\n\nTổng dung lượng: ${formatSize(t)}`;
      api.sendMessage(r, event.threadID);
    } catch (e) {
      api.sendMessage(`Đã xảy ra lỗi: ${e.message}`, event.threadID);
    }
  }
};

const formatSize = (size) => {
  if (size < 1024) return `${size} B`;
  else if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
  else return `${(size / (1024 * 1024)).toFixed(2)} MB`;
};

const getTotalSize = (dirPath) => {
  let totalSize = 0;

  const calculateSize = (filePath) => {
    const stats = fs.statSync(filePath);
    if (stats.isFile()) {
      totalSize += stats.size;
    } else if (stats.isDirectory()) {
      const fileNames = fs.readdirSync(filePath);
      fileNames.forEach(fileName => {
        calculateSize(path.join(filePath, fileName));
      });
    }
  };

  calculateSize(dirPath);

  return totalSize;
};