/**
 * Created by JiapengDeng on 2015/3/25.
 */
/*该文件提供一个Date函数给app.js,
把所有url的参数，及stream流上的参数绑定到req上
只要有数据过来首先就是绑定数据，绑定数据完成后解绑数据
**/
var url=require('url');
var util=require('util');
var EventEmitter=require('events').EventEmitter;
var querystring=require('querystring');
function Data(req,res){
    this.req=req;
    this.res=res;
    function dealUrlData(){
        var urlString=url.parse(req.url).query;
        if(urlString===""){
            return null;
        }else{
            return querystring.parse(urlString);
        }
        //if()
    }
    function mime(req){
        var str=req.headers["Content-Type"].split[0];
        return str;
    }
    this.getData=function(callback){
        req.param={};
        req.err=null;
        var bodyDataString="";
        var emitter=new EventEmitter();
        req.param.headparam=dealUrlData();
        if("Content-length" in req.headers||"Transfer-Encoding" in req.headers){
            emitter.on("data",function(chunk){
                bodyDataString+=chunk;
            });
            emitter.on("end",function(){
                req.rawBody=bodyDataString;
                if(req.headers["Content-Type"]==="application/x-www-form-urlencoded"){
                    try{
                        req.param.bodyparam=querystring.parse(req.rawBody);
                    } catch(err){
                        req.err=err;
                    }
                }else if(mime(req)==="application/json"){//由于JSON数据的Content-Type:application/json;charset=utf-8
                    try{
                        req.param.bodyparam=JSON.parse(req.rawBody);
                    }catch (err){
                        req.err=err;
                    }
                }else if(mime(req)==="application/xml"){
                    try{

                    }catch (err){
                        req.err=err;
                    }
                }else{
                    console.log("deal with  m-form");
                }
                callback(req,res);
            });
        }//if POST有数据
        callback(req,res);
        console.log("++++++++++++++++++++++++++*********************************");

  }//getData

}//Data

module.exports=Data;