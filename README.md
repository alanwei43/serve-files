# 文件管理服务

## 安装

```bash
npm install -g @js-core/serve-files
```

## 使用

```bash
serve-files start 8005 # 指定端口号启动服务(默认使用程序安装目录)
serve-files start 8005 D:\files # 指定端口号和文件目录启动服务
```

## TODO

- [ ] 支持点击标题排序
- [ ] 支持分页展示
- [x] 上传文件增加进度
- [x] 支持创建目录
- [x] 支持图片和文本文件在线查看
- [x] 终端和页面显示多个IP地址访问链接
- [x] 页面展示配置信息
- [ ] 支持文件拖拽上传
