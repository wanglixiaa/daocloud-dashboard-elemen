webpackJsonp([10],{"5EO1":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app"},[a("el-container",[a("el-header",{attrs:{height:"50"}},[a("el-row",{attrs:{gutter:5}},[a("el-col",{attrs:{span:6}},[a("div",{staticClass:"grid-content bg-purple"},[a("el-button",{attrs:{type:"primary"}},[a("i",{staticClass:"el-icon-upload el-icon--right"}),t._v("本地Push镜像")])],1)]),t._v(" "),a("el-col",{attrs:{span:6,offset:0}},[a("div",{staticClass:"grid-content bg-purple"},[t._v("共7个镜像")])]),t._v(" "),a("el-col",{attrs:{span:6,offset:5}},[a("div",{staticClass:"grid-content bg-purple"},[a("el-input",{attrs:{placeholder:"搜索镜像","prefix-icon":"el-icon-search"},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1)])],1)],1),t._v(" "),a("el-main",[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,"tooltip-effect":"dark","show-header":!1}},[a("el-table-column",{attrs:{prop:"name",label:"项目名称",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[t._v(t._s(e.row.name))]),t._v(" "),a("div",[t._v(t._s(e.row.time))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"image_url",label:"镜像",width:"300"},scopedSlots:t._u([{key:"default",fn:function(t){}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"new_version",label:"重新部署",width:"700"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{icon:"el-icon-refresh"}},[t._v(t._s(e.row.new_version))])]}}])})],1)],1)],1)],1)},staticRenderFns:[]};var n=a("VU/8")({data:function(){return{search:"",tableData:[]}},created:function(){this.getProjectInfo()},methods:{getProjectInfo:function(){var t=this;this.axios.get("https://api.daocloud.io/hub/v2/hub/daohub/repos?",{headers:{Authorization:this.$cookies.get("token")}}).then(function(e){for(var a=function(a){t.tableData.push({name:e.data.results[a].name,time:t.$moment(e.data.results[a].updated_at).fromNow(),image_url:e.data.results[a].image_url,version:e.data.results[a].latest_tag.name,new_version:e.data.results[a].latest_tag?"部署最新版本":"null"})},s=0;s<e.data.total_count;s++)a(s)})}}},s,!1,function(t){a("JJoA")},"data-v-0e84579e",null);e.default=n.exports},JJoA:function(t,e){}});
//# sourceMappingURL=10.85f0c14c6d61d154f0ac.js.map