# 王赫邦 · 个人网站

药学 × AI × 营销 — 复合型开发者个人主页。

## 文件结构

```
个人网站/
├── index.html          # 单页主页
├── css/
│   └── style.css       # Apple 风格样式
├── js/
│   └── main.js         # 滚动动画 / 数字 count-up / 视差
├── assets/             # 附件原文档 + 个人照片 + 协会照片
│   ├── 王赫邦-简历.docx
│   ├── Resume_Wang_Hebang_EN.docx   # 英文偏药学方向简历
│   ├── whb-portrait.png              # 个人照片
│   ├── 远征协会.png                  # 协会照片
│   ├── AI观察-穿越泡沫交付结果.docx
│   ├── AI思考文章.docx
│   ├── 珠峰之路AI海报.png
│   ├── 两只老虎五一线上活动.docx
│   ├── 羚锐整合营销方案.pptx
│   ├── 2024暑期东北行.pdf
│   └── 2026寒假入滇.pdf
└── README.md
```

## 本地预览

任选一种：

```bash
# Python
python -m http.server 8000
# 然后访问 http://localhost:8000

# Node
npx serve .
```

直接双击 `index.html` 也可，但部分浏览器对 `file://` 下的字体/脚本有限制，建议用本地服务器。

## 部署到 GitHub Pages

1. 在 GitHub 新建仓库，例如 `whb-portfolio`。
2. 把本目录所有文件推上去：

   ```bash
   git init
   git add .
   git commit -m "init: personal website"
   git branch -M main
   git remote add origin https://github.com/<你的用户名>/whb-portfolio.git
   git push -u origin main
   ```

3. 仓库 Settings → Pages → Source 选 `main` / `(root)` → Save。
4. 等 1–2 分钟，访问 `https://<你的用户名>.github.io/whb-portfolio/`。

## 附件预览说明

`index.html` 里 docx/pptx 的"新标签页内嵌预览"用的是 Google Docs Viewer：

```
https://docs.google.com/gview?embedded=true&url=<文件公开URL>
```

**部署后无需手动改 URL**：`js/main.js` 里的 `buildDocUrls()` 会根据当前页面地址自动构造绝对 URL，部署到任何域名都能直接生效。

PDF / PNG 文件直接用浏览器原生预览（`<a target="_blank">`），无需 Viewer。

如果访问者网络无法访问 Google Docs Viewer，可右键"另存为"下载原文件。

## 中英双语切换

- 右上角导航有 **中 / EN** 切换按钮，一键切换全站语言
- 所有可翻译文本用 `data-zh` / `data-en` 双属性存储，`js/main.js` 的 `applyLang()` 动态替换
- 语言偏好存储在 `localStorage`，下次访问自动恢复

## 内容板块

1. **Hero** — 个人照片 + 姓名 / 定位 / 关键数字徽章
2. **关于我** — 4 条自我评价
3. **教育 & 技能** — 华科背景 + 技能矩阵
4. **核心项目** — 焦点卡（华科远征协会官网，配协会实景照片）+ 4 个项目卡
5. **实习 & 经历** — Timeline 形式（按时间倒序），每项配品牌 logo
6. **作品集** — AI 思考 / 产品市场 / 中英文简历，所有附件可点击查看
7. **联系** — 协会官网 / GitHub / 邮箱

## 设计

- 配色：浅蓝 `#a8c8ff` + 紫 `#b4a7e8` + 浅黄 `#f5e6a8`，理性与人文交叉
- 字体：Inter + Noto Sans SC（正文）、Noto Serif SC（可选引用）
- 动效：fade-up 渐入 / 滚动 reveal / count-up 数字 / hero 鼠标视差
- 缓动：`cubic-bezier(0.16, 1, 0.3, 1)`

---

© 2026 王赫邦
