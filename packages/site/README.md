# site

使用 next 搭建的静态页面

## 结构说明

- apps/app-name/manifest.ts: 注册 app 的所有信息。
- sitemap.ts: 注册静态页面的所有 app
- route.ts: 根据 sitemap.ts 中注册的 app 列表生成 pages 下的文件。

### 引用关系

- manifest.ts 虽然定义了 app 的信息，但只会引用 app 下的图片，app 下的页面通过字符串引用页面名来引入。
- sitemap.ts 引用 manifest.ts 生成 app 列表，同时 sitemap.ts 会被 Launcher 和 Acknowledgements 引用。
- router.ts 引用 sitemap.ts，但作为独立的 node 脚本在构建前被执行。
- sitemap.ts 和 manifest.ts 疑似会发生循环引用关系，但实际由于 manifest.ts 只会引用图片而图片无法引用 sitemap.ts，因此循环应用不会发生。
