(self.webpackChunkknowledge_points=self.webpackChunkknowledge_points||[]).push([["src_pages_11_nodejs_index_md"],{6428:function(n,e,s){"use strict";s.r(e),s.d(e,{default:function(){return t}});var t={components:{},data:{},source:'# Nodejs\n\n## 初始化一个项目\n\n```bash\nmkdir nodejs && cd nodejs && npm init -y\n```\n\n自动生成一个package.json文件\n\n## 安装依赖\n\n```bash\nnpm install express \n```\n\nExpress 是一种保持最低程度规模的灵活 Node.js Web 应用程序框架\n\n## 创建一个入口文件\n\n```bash\nmkdir src && touch index.js \n```\n\n在index.js 文件中写：\n\n```js\nconst express = require(\'express\')\nconst app = express()\n\napp.get(\'/\', (req, res) => {\n  res.send(\'你好\')\n})\n\napp.listen(3000, () => console.log(\'服务器已就绪\'))\n```\n\n之后在package.json中设置命令并运行命令：\n\n```json5\n// package.json\n{\n  "name": "nodejs",\n  "version": "1.0.0",\n  "description": "",\n  "main": "index.js",\n  "scripts": {\n    "start": "node ./src/index.js", // 创建的命令\n    "test": "echo \\"Error: no test specified\\" && exit 1"\n  },\n  "keywords": [],\n  "author": "",\n  "license": "ISC",\n  "dependencies": {\n    "express": "^4.17.1"\n  }\n}\n\n运行命令\n\n```bash\nnpm start\n```\n\n## 路由\n\n1. 创建routers文件夹及index.js文件\n\n```bash\nmkdir routers && touch index.js\n```\n\n1. 写路由\n\n```js\nconst express = require(\'express\');\nconst router = express.Router();\n\nrouter.get(\'/\', function(req, res) {\n    res.send(\'Birds home page\');\n});\n\nrouter.get(\'/about\', function(req, res) {\n    res.send(\'About birds\');\n});\n\nmodule.exports = router;\n```\n\n1. 引入路由文件(在入口文件)写：\n\n```js\nconst express = require(\'express\')\nconst app = express()\n\nconst indexRouter = require(\'./routers\');\napp.use(\'/\', indexRouter);\n\napp.listen(3000, () => console.log(\'服务器已就绪\'))\n\n```\n\n## 创建静态文件\n\n1. 安装模板依赖 ejs\n\n```bash\nnpm install ejs\n```\n\n1. 入口文件改写：\n\n```js\nconst express = require(\'express\')\nconst app = express()\n\napp.set(\'views\', __dirname + \'/views\');//指定模板位置\napp.set("view engine","ejs");\n\nconst indexRouter = require(\'./routers\');\napp.use(\'/\', indexRouter);\n\napp.listen(3000, () => console.log(\'服务器已就绪\'))\n```\n\n1. 创建第一个ejs文件\n\n```bash\ncd views && touch index.ejs\n```\n\n```html\n<!--index.ejs -->\n<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>测试</title>\n</head>\n<body>\n    测试达成\n</body>\n</html>\n```\n\n4. 添加路由\n\n在 routers/index.js 文件加入：\n\n```js\nrouter.get(\'/index\', function(req, res) {\n    res.render("index",{});\n});\n\n```\n\n1. 重新启动服务，页面打开:localhost:3000/index \n\n案例：https://github.com/SunLxy/study_nodejs\n',headings:[{key:0,value:"Nodejs",depth:1,children:[{key:1,value:"初始化一个项目",depth:2},{key:4,value:"安装依赖",depth:2},{key:7,value:"创建一个入口文件",depth:2},{key:13,value:"路由",depth:2},{key:20,value:"创建静态文件",depth:2}]}],headingsList:[{key:0,value:"Nodejs",depth:1},{key:1,value:"初始化一个项目",depth:2},{key:4,value:"安装依赖",depth:2},{key:7,value:"创建一个入口文件",depth:2},{key:13,value:"路由",depth:2},{key:20,value:"创建静态文件",depth:2}]}}}]);