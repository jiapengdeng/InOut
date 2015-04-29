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



http.createServer(function(req,res){
    var pathname=url.parse(req.url).pathname;
    if(pathname=="/favicon.ico") return;
    console.log("++++++++++++++++++++++++++++++++++++++++++++pathname.substring");
    console.log(pathname);
    console.log(pathname.substring('.'));
    var data=new Data(req,res);
    console.log("****************************");
    data.getData(function(req,res){
        console.log("+++++++");
        console.log(req.err);
        if(req.err===null){
            console.log("asdajsd");
            router(req,res);
        }
    })


}).listen(3000);
console.log("服务器监听3000端口");