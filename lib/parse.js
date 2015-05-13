/**
 * Created by JiapengDeng on 2015/4/29.
 */
var formatConfig=require("../config/formatConfig.js");
var url=require("url");
var fs=require("fs");
var ejs=require("ejs");
function Parse(req,res){
    this.req=req;
    this.res=res;
    /*gei res 添加render方法*/

    /* protected方法*/
    this.actionParse=function(){
        //路由解析
        var pathname=url.parse(req.url).pathname;
        var paths=pathname.split("/");
        paths.shift();
        var controller=paths[0]?paths[0]:"index";
        var action=paths[1]?paths[1]:"index";
        var module,Module;
        console.log(formatConfig.baseDIR);
        try{
            Module=require("../controller/"+controller+".js");
            module=new Module(req,res);
            module[action].call();
        }catch (err){
            console.log("can not find "+controller+" module "+err);
            // 以后定义服务器不可用的hande500()函数
            return;
        }

    }
    this.staticParse=function(){
        //静态文件解析
        var pathname=url.parse(req.url).pathname;
        var path=formatConfig.baseDIR+"/public"+url.parse(req.url).pathname;
        var type=pathname.substring(pathname.lastIndexOf(".")+1);
        console.log(type);
        fs.exists(path,function(exists){
            if(!exists){
                /*所请求文件不存在*/
                console.log("file not find");
                //head500;
            }else{
                /*请求文件存在，读取文件并返回*/
           /*     if(type="png"||"jpg"||"gif"){
                    fs.readFile(path,function(err,data){
                        res.writeHead(200,{"Content-Type":"image/png"});
                        res.end(data);
                    })
                }*/
                fs.readFile(path,function(err,data){
                    if(err){
                        console.log(err);
                        //head500()
                    }else{
                        console.log(formatConfig.mimeType[type]);
                        res.writeHead(200,{"Content-Type":formatConfig.mimeType[type]});
                        res.write(data);
                        res.end();
                    }
                })
            }
        })
    }

    /*给res绑定render函数作为模板解析,第一个参数为要解析的模板路径，第二个为解析传递的对象*/
    this.res.render=function(string,obj){
        //先根据string异步读取文件，读取文件后解析文件,
        var path=formatConfig.baseDIR+"/view"+string+"."+formatConfig.templateEngine;
        var type=formatConfig.templateEngine;
        fs.exists(path,function(exists){
            /*判断函数是不是存在，如果不存在，则调用handle500，如果存在则调用fs。readFile函数去读*/
            if(!exists){
                //handle500();
                console.log("file not exists");
            }else{
                fs.readFile(path,function(err,data){
                    if(err){
                        //错误，
                        //handle(500);
                        return;
                    }else{
                       var html=ejs.render(data.toString(),obj);
                        res.writeHead(200,{"Content-Type":formatConfig.mimeType[formatConfig.templateEngine]});//模板文件后缀对应的content-type
                        res.end(html);
                    }
                })
            }
        })
    }

}
module.exports=Parse;