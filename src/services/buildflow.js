import axios from 'axios'

// const listProjects = (page = 0, size = 3, search) => {
//   let result = []
//   axios.get(`https://api.daocloud.io/v1/ship/projects`, {
//     params: {
//       size,
//       search,
//       offset: page * size
//     }
//   }).then(res => {
//     res.data.projects.forEach(item => {
//       result.push({
//         id: item.project.buildflow_id,
//         name: item.project.name,
//         build_tag: item.last_build ? item.last_build.tag : '',
//         updated_at: item.project.updated_at,
//         code_src: item.project.source,
//         code_src_url: item.project.repo_url,
//         code_src_kind: item.project.remote,
//         status: item.last_build ? item.last_build.status : ''
//       })
//     })
//   })
//   return result
// }

const semanticStatusMap = {
  Failure: '执行失败',
  Error: '执行错误',
  Success: '执行成功',
  Cancelled: '执行取消',
  '': '尚未构建'
}
const listProjects = (page = 0, size = 3, search) =>
  axios.get(`https://api.daocloud.io/v1/ship/projects`, {
    params: {
      size,
      search,
      offset: (page - 1) * size
    }
  })
export default {
  semanticStatusMap,
  listProjects: listProjects
}
// console.log(listProjects)
