import axiosRestClient from 'axios-rest-client'
import JsCookie from 'js-cookie'

const token = JsCookie.get('token')
console.log(process.env.NUXT_ENV_SERVER_API_URL)
const api = axiosRestClient({
  baseUrl: 'https://h5rey2wka4.execute-api.us-east-1.amazonaws.com/prod/v1.1/',
  // baseUrl: process.env.NUXT_ENV_SERVER_API_URL || '',
})
const api2 = axiosRestClient({
  baseUrl: 'https://jzdulunu9c.execute-api.us-east-1.amazonaws.com/prod/',
  // baseUrl: process.env.NUXT_ENV_SERVER_API_URL_COLLAGES || '',
})

let headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  // 'Access-Control-Allow-Credentials': true,
  // 'Access-Control-Allow-Origin': '*'

}

if (token || null) {
  headers = Object.assign({ 'Authorization': `Bearer ${token}` }, headers)
}

api.axios().defaults.withCredentials = true
api.axios().defaults.headers.common = headers

api.axios().interceptors.response.use((response) => {
    return response
  },
  async function (error) {
    let st = error.response && error.response.status || null
    if (st === 422) {
      return Promise.reject({
        status: 422,
        data: error.response.data.errors,
        message: `Error code: ${ st }`
      })
    } else {
      return Promise.reject({
        status: st,
        message: `Error code: ${ st }`
      })
    }
})

export const restApi = api
export const restApi2 = api2

export default (context, inject) => {
  inject('api', api)
  inject('api2', api2)
}
