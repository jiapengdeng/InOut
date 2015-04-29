/**
 * Created by JiapengDeng on 2015/4/29.
 */
var formatConfig=require("../config/formatConfig.js");
function Parse(){
    this.isStatic=function(style){
        //判断是不是静态文件请求
        for(var i= 0,len=formatConfig.staticFormat.length;i<len;i++){
            if(style===formatConfig.staticFormat[i]){
                return true;
            }else{
                return false;
            }
        }
    }
    this.actionParse=function(){
        //路由解析
    }
    this.staticParse=function(){
        //静态文件解析
    }
    this.templateParse=function(){
        //模板解析
    }
}

module.exports=Parse;