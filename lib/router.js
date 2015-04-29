/**
 * Created by JiapengDeng on 2015/3/24.
 */
/*路由处理函数*/
var querystring=require("querystring");
var url=require("url");
var config=require("../config.js");
var formatConfig=require("../config/formatConfig.js");
var fs=require("fs");

/*路由解析进性判断，如果是静态页面，那么进入staticParse，如果是动态的那么进入action环境配置*/
function router(req,res){
    console.log(req.param.headparam);
    var pathname=url.parse(req.url).pathname;
    var reqStyle=pathname.substr(pathname.lastIndexOf(".")+1);
    console.log(reqStyle);
    var formatType=formatConfig.staticFormat;
    if(reqStyle.search(formatType)){
        //为真进入静态解析
       staticParse(pathname);

    }

    res.writeHead(200,{'Content-Type':'text/plain'});
    res.end(pathname);

}
function staticParse(pathname){
    /*静态解析函数*/
    var realPath=config.baseDir+pathname;
    console.log(realPath);
}
function actionParse(){
    /*进入路由判断*/


}
module.exports=router;