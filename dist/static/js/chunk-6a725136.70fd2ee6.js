(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6a725136"],{"35ef":function(e,t,c){},"37f9":function(e,t,c){"use strict";c.r(t);var r=function(){var e=this,t=e.$createElement,c=e._self._c||t;return c("el-row",{attrs:{type:"flex"}},[c("el-col",{attrs:{span:3}},[c("el-card",{attrs:{shadow:"always"}},[c("div",[e._v(" 用户")]),e._v(" 注册用户数 "+e._s(e.user_count)+" ")])],1),c("el-col",{attrs:{span:3}},[c("el-card",{attrs:{shadow:"always"}},[c("div",[e._v(" 订阅源")]),e._v(" 源总数 "+e._s(e.resource_count)+" 公开源 "+e._s(e.public_resource_count)+" 私人源 "+e._s(e.private_resource_count)+" ")])],1),c("el-col",{attrs:{span:3}},[c("el-card",{attrs:{shadow:"always"}},[c("div",[e._v(" 反馈")]),e._v(" 反馈总数 "+e._s(e.feedback_count)+" ")])],1)],1)},u=[],n=c("b775");function o(){return Object(n["a"])({url:"/admin/homepage",method:"get"})}var s={name:"Index",data:function(){return{user_count:0,resource_count:0,public_resource_count:0,private_resource_count:0,feedback_count:0}},created:function(){this.getList()},methods:{getList:function(){var e=this;return o().then((function(t){e.user_count=t.user_count,e.resource_count=t.resource_count,e.public_resource_count=t.public_resource_count,e.private_resource_count=t.private_resource_count,e.feedback_count=t.feedback_count}))}}},a=s,_=(c("785d"),c("2877")),i=Object(_["a"])(a,r,u,!1,null,null,null);t["default"]=i.exports},"785d":function(e,t,c){"use strict";c("35ef")}}]);