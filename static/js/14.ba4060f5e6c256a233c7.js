webpackJsonp([14],{aMNo:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app"},[a("el-container",[a("el-header",{attrs:{height:"50"}},[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:6}},[a("div",{staticClass:"grid-content bg-purple"},[t._v("当前收藏1个镜像")])]),t._v(" "),a("el-col",{attrs:{span:6,offset:11}},[a("div",{staticClass:"grid-content bg-purple"},[a("el-input",{attrs:{placeholder:"搜索镜像","prefix-icon":"el-icon-search"},model:{value:t.mirror_name,callback:function(e){t.mirror_name=e},expression:"mirror_name"}})],1)])],1)],1),t._v(" "),a("el-main",[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,"tooltip-effect":"dark","show-header":!1}},[a("el-table-column",{attrs:{prop:"name",label:"项目名称",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[t._v(t._s(e.row.name))]),t._v(" "),a("div",[t._v("更新于"+t._s(e.row.time))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"image_url",label:"镜像",width:"300"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[t._v("镜像:"+t._s(e.row.image_url))]),t._v(" "),a("div",[t._v("版本:"+t._s(e.row.version))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"new_version",label:"重新部署",width:"700"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-dropdown",{attrs:{"split-button":"",type:"primary"}},[a("i",{staticClass:"el-icon-refresh"}),t._v("\n                "+t._s(e.row.new_version)+"\n                "),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[a("el-dropdown-item",[t._v("取消收藏")])],1)],1)]}}])})],1)],1)],1)],1)},staticRenderFns:[]},o=a("VU/8")({data:function(){return{mirror_name:"",tableData:[]}},created:function(){this.getProjectInfo()},methods:{getProjectInfo:function(){var t=this;this.axios.get("https://api.daocloud.io/hub/v2/hub/starred/repos?",{headers:{Authorization:this.$cookies.get("token")}}).then(function(e){for(var a=function(a){t.tableData.push({name:e.data.results[a].name,image_url:e.data.results[a].image_url,version:e.data.results[a].latest_tag.name,new_version:e.data.results[a].latest_tag?"部署最新版本":"null",time:t.$moment(e.data.results[a].updated_at).fromNow()})},r=0;r<e.data.total_count;r++)a(r)})}}},r,!1,null,null,null);e.default=o.exports}});
//# sourceMappingURL=14.ba4060f5e6c256a233c7.js.map