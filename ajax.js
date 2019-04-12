import axios from "axios";

// create an axios instance
const ajax = axios.create({
  timeout: 10000 // request timeout
});

// request interceptor
ajax.interceptors.request.use(
  config => {
    // Do something before request is sent
    // console.log(config);
    if (config.method == "post" && !config.isUpdate) {
      config.transformRequest = [
        function(data) {
          var ret = "";
          for (var it in data) {
            ret +=
              encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
          }
          return ret;
        }
      ];
    }
    if (config.isUpdate) {
      config.headers = { "Content-Type": "multiple/form-data" };
      config.method = "post";
    }
    return config;
  },
  error => {
    // Do something with request error

    console.log(error); // for debug
    Promise.reject(error);
  }
);

// response interceptor
ajax.interceptors.response.use(
  response => {
    console.log(response)
    return response;
  },

  error => {
    console.log("err" + error); // for debug

    return Promise.reject(error);
  }
);


export default function(url, options) {
  return new Promise((resolve, reject) => {
    ajax(url, options)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}
