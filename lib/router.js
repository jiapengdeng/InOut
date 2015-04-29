/**
 * Created by JiapengDeng on 2015/3/24.
 */
/*路由处理函数*/
var querystring=require("querystring");
var url=require("url");
var formatConfig=require("../config/formatConfig.js");
var Parse=require("../lib/parse.js");
var fs=require("fs");

/*路由解析进性判断，如果是静态页面，那么进入staticParse，如果是动态的那么进入action环境配置*/
function router(req,res){
    var pathname=url.parse(req.url).pathname;
    var reqStyle=pathname.substr(pathname.lastIndexOf(".")+1);
    var formatType=formatConfig.staticFormat;
    /*进行模板解析，如果后缀是formatConfig。templateEngine那么进行模板解析
    * 如果是静态文件，如js，jpg，。。。那么就进入静态文件读写
    * 如果是action，那么进入动态解析
    * */
    var parse=new Parse();

    if(reqStyle===formatConfig.templateEngine){
        //进入模板解析
        parse.templateParse();
        console.log("解析模板文件");
    }else if(parse.isStatic(reqStyle)){
        // 静态页面加载
        parse.staticParse()
        console.log("静态页面加载")
    }else{
        //路由解析
        parse.actionParse();
        console.log("路由解析");
    }
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.end(pathname);

}

module.exports=router;