# 王赫邦个人主页 - 技术架构文档

## 1. 技术架构总览

### 1.1 架构模式
单页面应用(SPA)架构，纯静态HTML/CSS/JS实现，零依赖。

### 1.2 文件结构
```
新建文件夹/
├── index.html          # 主页面文件
├── css/
│   └── style.css       # 样式表
├── js/
│   └── main.js         # 交互逻辑
└── assets/
    ├── 珠峰之路 AI 宣传海报.png
    └── 从2025GAIE UASE双展观望新产业.jpg
```

## 2. 设计系统实现

### 2.1 CSS变量体系
```css
:root {
    /* 色彩 */
    --bg-primary: #0a0a0a;
    --bg-secondary: #111111;
    --bg-tertiary: #1a1a1a;
    --text-primary: #ffffff;
    --text-secondary: #a0a0a0;
    --text-tertiary: #666666;
    --accent: #4a9eff;
    --accent-warm: #ff6b35;

    /* 字体 */
    --font-sans: 'SF Pro Display', 'PingFang SC', -apple-system, sans-serif;
    --font-serif: 'Noto Serif SC', 'Songti SC', Georgia, serif;

    /* 间距 */
    --space-xs: 8px;
    --space-sm: 16px;
    --space-md: 32px;
    --space-lg: 64px;
    --space-xl: 128px;

    /* 动画 */
    --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
    --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
    --duration-fast: 0.3s;
    --duration-normal: 0.6s;
    --duration-slow: 1s;
}
```

### 2.2 字体方案
- 使用Google Fonts加载独特字体组合
- 显示字体：使用具有艺术感的无衬线字体
- 正文字体：使用优雅易读的中文字体
- 字重范围：100-900，充分利用字重层级

### 2.3 响应式断点
```css
@media (min-width: 768px) { /* 平板 */ }
@media (min-width: 1024px) { /* 桌面 */ }
@media (min-width: 1440px) { /* 大屏 */ }
```

## 3. 组件架构

### 3.1 导航组件 (Navigation)
- 固定顶部导航，滚动时背景模糊化
- 锚点导航：Home / About / AI / Cycling / Contact
- 移动端：全屏汉堡菜单

### 3.2 Hero组件
- 全屏高度 (100vh)
- 居中大字排版
- 分段入场动画序列

### 3.3 Section组件
- 统一的section padding体系
- 左侧大标题 + 右侧内容区的非对称布局
- 滚动触发渐显动画

### 3.4 卡片组件 (Card)
- 极简卡片设计，无多余装饰
- hover状态：微妙的光影变化
- 支持图片 + 文字组合

### 3.5 图片组件
- 响应式图片容器
- 懒加载实现
- 优雅的加载过渡效果

## 4. 动画系统

### 4.1 入场动画
```css
@keyframes fadeUp {
    from {
        opacity: 0;
        transform: translateY(40px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
```

### 4.2 滚动动画实现
```javascript
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    },
    { threshold: 0.1 }
);
```

### 4.3 微动效
- 链接hover：下划线动画
- 按钮hover：背景色平滑过渡
- 图片hover：轻微缩放 + 阴影增强

## 5. 性能优化

### 5.1 加载优化
- CSS内联关键样式
- JS模块异步加载
- 图片懒加载

### 5.2 渲染优化
- 使用transform和opacity实现动画（GPU加速）
- 避免布局抖动
- will-change提示浏览器优化

### 5.3 资源优化
- 图片压缩与格式选择
- 字体子集化（如需）
- 最小化CSS/JS

## 6. 浏览器兼容性
- 支持现代浏览器（Chrome, Safari, Firefox, Edge最新两个版本）
- 优雅降级处理旧版浏览器
- 移动端Safari特别优化
