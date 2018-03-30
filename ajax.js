// axios get
axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

  
// axios post
axios({
    method: "post",
    url: userlogin,
    data: {

    },
    transformRequest: [
        function(data) {
            var ret = ''
            for (var it in data) {
                ret += encodeURIComponent(it) +
                    '=' +
                    encodeURIComponent(data[it]) +
                    '&'
            }
            return ret
        }
    ]
}).then(function(res) {

})


// 上传formdata
var formdata = new FormData();
formdata.append("type", "1");
axios.post(queren, formdata, {
    headers: {
        'Content-Type': 'multiple/form-data'
    }
}).then(function(res) {
    console.log(res);
    location.href = "/";
});