/**
options = {
  url: "",
  method: "",
  headers: {}, 
  data: "",
  success: function(result) {},  // 请求成功后调用此方法
  fail: function(error) {}    // 请求失败或出错后调用此方法
}
**/
window.ajax = function (options) {
  var request = new XMLHttpRequest();
  if (options.data) {
    options.data = JSON.stringify(options.data);
  }

  options.method = options.method.toUpperCase();

  request.onreadystatechange = function () {
    if(request.readyState == 4){
      if((request.status >= 200 && request.status < 300)||request.status == 304){
        options.success(JSON.parse(request.responseText));
      } else {
        options.error();
      }
    }  
  }

  request.open(options.method, options.url, true);
  
  if (options.method == "POST" || options.method == "PUT") {
    request.setRequestHeader("Content-type","application/json");
    request.send(options.data);
  } else if (options.method == "GET" || options.method == "DELETE") {
    request.send();
  }
}

