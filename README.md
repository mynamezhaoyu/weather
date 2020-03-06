# weather

基于 taro 和 taro ui 编写
图标使用了 taro-iconfont-cli

什么叫跨域 ?
http://www.taobao.com/index.html 调用 http://www.taobao.com/server.php （同源）

http://www.taobao.com/index.html 调用 http://www.tencent.com/server.php （taobao/tencent 跨域）主域名不同

http://www.taobao.com/index.html 调用 http://zzz.taobao.com/server.php （www/zzz 跨域）子域名不同

http://www.taobao.com:8080/index.html 调用 http://www.taobao.com:8088/server.php （8080/8088，跨域）端口不同

http://www.123.com/index.html 调用 https://www.123.com/server.php （协议不同:http/https，跨域）

请注意：localhost 和 127.0.0.1 虽然都指向本机，但也属于跨域。
