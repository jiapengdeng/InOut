/**
 * Created by JiapengDeng on 2015/5/3.
 * 该模块 采用工厂模式,不用公用函数是多个请求相互干扰
*/
// 创建初始化函数
function Index(req,res){
    this.req=req;
    this.res=res;
    //该层的this才是module；

    this.index=function(){
        console.log("index action");
        res.render("/Index/index",{name:"hamng"});
    }
    this.addname=function(){
         //函数内部，由于没有对象调用他，所以指向全局变量
        _this.index();
        console.log("addname action");
    }
    this.remove=function(){
        console.log("remove action")
    }

    //如果要同个module中跳转，那么采_this把this存起来，在函数内部调用
    var _this=this;
}

/*返回一个对象*/

module.exports=Index;

