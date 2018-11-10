import axios from 'axios'

// const executionRecord = (
//   offset = 0,
//   size = 10,
//   stream_room = '228aa4c1.1540299414.620e809cede98d752eabbcdd7011f1f988126a0d'
// ) => {
//   return axios.get(
//     ' https://api.daocloud.io/v1/ship/project/671eae2e-0712-478b-9bcc-c5278efa020a/pipelines',
//     {
//       params: {
//         offset,
//         size,
//         stream_room
//       }
//     }
//   )
// }
const executionRecord = (offset = 0, size = 10, streamRoom, id) => {
  return axios.get(`https://api.daocloud.io/v1/ship/project/${id}/pipelines`, {
    params: {
      offset,
      size,
      streamRoom
    }
  })
}
const processDefinition = id => {
  return axios.get(
    `https://api.daocloud.io/v1/ship/project/${id}/flow?yaml-status=cloud`
  )
}
export default {
  executionRecord,
  processDefinition
}
