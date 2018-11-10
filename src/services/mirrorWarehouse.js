import axios from 'axios'

const listMirrorWarehouse = (page = 1, page_size = 10, search) => {
  return axios.get('https://api.daocloud.io/hub/v2/hub/daohub/repos', {
    params: {
      page: page,
      page_size: page_size,
      q: search
    }
  })
}

export default {
  listMirrorWarehouse
}
