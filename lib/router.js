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
    var _indexOf=pathname.lastIndexOf(".");
    var formatType=formatConfig.staticFormat;
    /*进行模板解析，如果后缀是formatConfig。templateEngine那么进行模板解析
    * 如果是静态文件，如js，jpg，。。。那么就进入静态文件读写
    * 如果是action，那么进入动态解析
    * */
    var parse=new Parse(req,res);
    if(_indexOf!=-1){
        //如果不等于-1，说明是请求模板文件或请求静态文件
        /*再用条件判断模板和静态文件*/
        var reqStyle=pathname.substr(_indexOf+1);
        if(reqStyle===formatConfig.templateEngine){
            //模板解析
            console.log("template parse");
            //以后再做。
            parse.templateParse();
        }else{
            //不是模板解析，说明是调取静态文件
            console.log("static file");
            parse.staticParse();
        }
    }else{
        //如果不是前两种情况，说明是动态路由
        console.log("action router");
        parse.actionParse();
    }

}

module.exports=router;