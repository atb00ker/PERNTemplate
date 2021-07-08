const axios = require('axios');
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = process.env.REACT_CORS;
axios.defaults.baseURL = `${process.env.HTTP_PROTOCOL}://${process.env.HTTP_HOST}:${process.env.HTTP_PORT}`;

function getData<T>(url: string): Promise<T> {
  return axios.get(url)
    .catch(function (error) {
      console.log(error);
    });
}

function postData<T>(url: string, data: any): Promise<T> {
  return axios.post(url, data)
    .catch(function (error) {
      console.log(error);
    });
}

function putData<T>(url: string, data: any): Promise<T> {
  return axios.put(url, data)
    .catch(function (error) {
      console.log(error);
    });
}

function deleteData<T>(url: string): Promise<T> {
  return axios.delete(url)
    .catch(function (error) {
      console.log(error);
    });
}

export { postData, getData, putData, deleteData };
