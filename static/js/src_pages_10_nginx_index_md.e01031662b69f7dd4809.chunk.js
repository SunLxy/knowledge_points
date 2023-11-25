(self.webpackChunkknowledge_points=self.webpackChunkknowledge_points||[]).push([["src_pages_10_nginx_index_md"],{37865:function(n,e,t){"use strict";t.r(e),t.d(e,{default:function(){return o}});var o={components:{},data:{},source:'# nginx\n\n## 安装nginx\n\n```bash\nbrew install nginx \n```\n\n## nginx操作\n\n### 启动\n\n```bash\nnginx  -s start # nginx \n```\n\n### 重新加载配置文件\n\n```bash\nnginx -s reload\n```\n\n### 停止\n\n```bash\nnginx -s stop\n```\n\n## nginx 配置\n\n`brew`安装的`nginx`路径为`/opt/homebrew/etc/nginx`\n\n### nginx配置文件树\n\n```bash\n.\n├── fastcgi.conf\n├── fastcgi.conf.default\n├── fastcgi_params\n├── fastcgi_params.default\n├── koi-utf\n├── koi-win\n├── logs\n│\xa0\xa0 └── nginx.pid\n├── mime.types\n├── mime.types.default\n├── nginx.conf\n├── nginx.conf.default\n├── scgi_params\n├── scgi_params.default\n├── servers\n│\xa0\xa0 └── 9001.conf\n├── uwsgi_params\n├── uwsgi_params.default\n└── win-utf\n```\n\n### `nginx.conf`配置\n\n```nginx\n# 1、几个常见配置项：\n\n# 1.$remote_addr 与 $http_x_forwarded_for 用以记录客户端的ip地址；\n# 2.$remote_user ：用来记录客户端用户名称；\n# 3.$time_local ： 用来记录访问时间与时区；\n# 4.$request ： 用来记录请求的url与http协议；\n# 5.$status ： 用来记录请求状态；成功是200；\n# 6.$body_bytes_s ent ：记录发送给客户端文件主体内容大小；\n# 7.$http_referer ：用来记录从那个页面链接访问过来的；\n# 8.$http_user_agent ：记录客户端浏览器的相关信息；\n# 2、惊群现象：一个网路连接到来，多个睡眠的进程被同时叫醒，但只有一个进程能获得链接，这样会影响系统性能。\n\n# 3、每个指令必须有分号结束。\n#\n#\n#\n#\n#\n#配置用户或者组，默认为nobody nobody。\n#user  nobody;\n# user root admin;\n# user root wheel;\n#允许生成的进程数，默认为1\n#user  nobody;\nworker_processes 1;\n\n#error_log  logs/error.log;\n#error_log  logs/error.log  notice;\n#error_log  logs/error.log  info;\n\n#pid        logs/nginx.pid;\n#制定日志路径，级别。这个设置可以放入全局块，http块，server块，级别以此为：debug|info|notice|warn|error|crit|alert|emerg\n#error_log  logs/error.log;\n#error_log  logs/error.log  notice;\n#error_log  logs/error.log  info;\n#指定nginx进程运行文件存放地址\npid /opt/homebrew/etc/nginx/logs/nginx.pid;\nevents {\n    #设置网路连接序列化，防止惊群现象发生，默认为on\n    # accept_mutex on;\n    #设置一个进程是否同时接受多个网络连接，默认为off\n    # multi_accept off;\n\n    #事件驱动模型，select|poll|kqueue|epoll|resig|/dev/poll|eventport\n    #use epoll;\n    worker_connections 1024;\n}\n\n\nhttp {\n    include mime.types;\n    default_type application/octet-stream;\n\n    #log_format  main  \'$remote_addr - $remote_user [$time_local] "$request" \'\n    #                  \'$status $body_bytes_sent "$http_referer" \'\n    #                  \'"$http_user_agent" "$http_x_forwarded_for"\';\n\n    #access_log  logs/access.log  main;\n    #tcp_nopush     on;\n    #access_log off; #取消服务日志\n    #log_format  main  \'$remote_addr - $remote_user [$time_local] "$request" \'\n    #                  \'$status $body_bytes_sent "$http_referer" \'\n    #                  \'"$http_user_agent" "$http_x_forwarded_for"\';\n    #自定义格式\n    # log_format myFormat \'$remote_addr–$remote_user [$time_local] $request $status $body_bytes_sent $http_referer $http_user_agent $http_x_forwarded_for\';\n    #combined为日志格式的默认值\n    #  access_log log/access.log myFormat;\n    # 开启gzip\n    gzip on;\n\n    # 启用gzip压缩的最小文件，小于设置值的文件将不会压缩\n    gzip_min_length 1k;\n\n    # gzip 压缩级别，1-9，数字越大压缩的越好，也越占用CPU时间，后面会有详细说明\n    gzip_comp_level 1;\n\n    # 进行压缩的文件类型。javascript有多种形式。其中的值可以在 mime.types 文件中找到。\n    gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png application/vnd.ms-fontobject font/ttf font/opentype font/x-woff image/svg+xml;\n\n    # 是否在http header中添加Vary: Accept-Encoding，建议开启\n    gzip_vary on;\n\n    # 禁用IE 6 gzip\n    gzip_disable "MSIE [1-6]\\.";\n\n    # 设置压缩所需要的缓冲区大小\n    gzip_buffers 32 4k;\n\n    # allow all;\n    #deny all;\n    #access_log  logs/access.log  main;\n    sendfile on;#允许sendfile方式传输文件，默认为off，可以在http块，server块，location块。\n    #tcp_nopush     on;\n\n    client_max_body_size 1024m;\n    client_body_buffer_size 1000m;\n\n    #每个进程每次调用传输数量不能大于设定的值，默认为0，即不设上限。\n    # sendfile_max_chunk 100k;\n\n    #连接超时时间，默认为75s，可以在http，server，location块。\n    #keepalive_timeout  0;\n    keepalive_timeout 65;\n\n    #gzip  on;\n\n    # proxy_cache_path /path/to/cache levels=1:2 keys_zone=my_cache:10m max_size=10g inactive=60m use_temp_path=off;\n    #  upstream mysvr {\n    #       server 127.0.0.1:7878;\n    #       server 192.168.10.121:3333 backup;  #热备\n    #     }\n    # error_page 404 https://xxxx.xxxx.xxx; #错误页\n    server {\n        listen 8080;\n        server_name localhost;\n\n        #charset koi8-r;\n\n        #access_log  logs/host.access.log  main;\n        location / {\n            root html;\n            index index.html index.htm;\n        }\n\n        #error_page  404              /404.html;\n\n        # redirect server error pages to the static page /50x.html\n        #\n        error_page 500 502 503 504 /50x.html;\n        location = /50x.html {\n            root html;\n        }\n\n        # proxy the PHP scripts to Apache listening on 127.0.0.1:80\n        #\n        #location ~ \\.php$ {\n        #    proxy_pass   http://127.0.0.1;\n        #}\n\n        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000\n        #\n        #location ~ \\.php$ {\n        #    root           html;\n        #    fastcgi_pass   127.0.0.1:9000;\n        #    fastcgi_index  index.php;\n        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;\n        #    include        fastcgi_params;\n        #}\n        # deny access to .htaccess files, if Apache\'s document root\n        # concurs with nginx\'s one\n        #\n        #location ~ /\\.ht {\n        #    deny  all;\n        #}\n    }\n\n\n    # another virtual host using mix of IP-, name-, and port-based configuration\n    #\n    #server {\n    #    listen       8000;\n    #    listen       somename:8080;\n    #    server_name  somename  alias  another.alias;\n    #    location / {\n    #        root   html;\n    #        index  index.html index.htm;\n    #    }\n    #}\n    # HTTPS server\n    #\n    #server {\n    #    listen       443 ssl;\n    #    server_name  localhost;\n    #    ssl_certificate      cert.pem;\n    #    ssl_certificate_key  cert.key;\n    #    ssl_session_cache    shared:SSL:1m;\n    #    ssl_session_timeout  5m;\n    #    ssl_ciphers  HIGH:!aNULL:!MD5;\n    #    ssl_prefer_server_ciphers  on;\n    #    location / {\n    #        root   html;\n    #        index  index.html index.htm;\n    #    }\n    #}\n    include servers/*;\n}\n\n```\n\n### `servers/9001.conf文件配置`\n\n```nginx\n\nserver {\n  listen 9001;\n  server_name localhost;\n  error_page 500 502 503 504 /50x.html;\n  client_body_buffer_size 1000m;\n  client_max_body_size 1000m;\n\n  location /api {\n    proxy_pass http://192.168.1.1:8000; #请求转向 定义的服务器列表\n  }\n\n  location / {\n    root /Users/zhangsan/demo/build; #根目录\n    index index.html index.htm;  # 设置默认页\n    try_files $uri $uri/ /index.html$args;# 页面刷新重定向\n    deny 127.0.0.1;  #拒绝的ip\n    allow 172.18.5.54; #允许的ip  \n  }\n}\n```\n',headings:[{key:0,value:"nginx",depth:1,children:[{key:1,value:"安装nginx",depth:2},{key:3,value:"nginx操作",depth:2,children:[{key:4,value:"启动",depth:3},{key:6,value:"重新加载配置文件",depth:3},{key:8,value:"停止",depth:3}]},{key:10,value:"nginx 配置",depth:2,children:[{key:12,value:"nginx配置文件树",depth:3},{key:14,value:"nginx.conf配置",depth:3},{key:16,value:"servers/9001.conf文件配置",depth:3}]}]}],headingsList:[{key:0,value:"nginx",depth:1},{key:1,value:"安装nginx",depth:2},{key:3,value:"nginx操作",depth:2},{key:4,value:"启动",depth:3},{key:6,value:"重新加载配置文件",depth:3},{key:8,value:"停止",depth:3},{key:10,value:"nginx 配置",depth:2},{key:12,value:"nginx配置文件树",depth:3},{key:14,value:"nginx.conf配置",depth:3},{key:16,value:"servers/9001.conf文件配置",depth:3}]}}}]);