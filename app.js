/**
 * Created by JiapengDeng on 2015/3/24.
 */
/**启动文件创建服务器*/
var http=require('http');
var url=require('url');
var util=require('util');
var router=require('./lib/router.js');
var Data=require('./lib/data.js');
var querystring=require("querystring");
var formatConfig=require("./config/formatConfig.js");

/*把全局路径放到formatConfig配置文件中*/
formatConfig.baseDIR=__dirname;




http.createServer(function(req,res){
    var pathname=url.parse(req.url).pathname;
    /*如果是图标的请求，那么直接返回*/
    if(pathname=="/favicon.ico") return;
    /*引用Data模块，该模块用来异步解析该次请求的数据，由于是异步
    * 所以在异步完成后执行回调函数，回调函数中进入路由分配
    * */
    var data=new Data(req,res);
    data.getData(function(req,res){
        if(req.err===null){
            //如果参数解析没有失败，那么进入路由处理;
            router(req,res);
        }
    })


}).listen(3000);
console.log("服务器监听3000端口");