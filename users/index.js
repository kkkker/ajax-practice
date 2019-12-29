(function () {
    const API_ROOT = "http://localhost:3000/users";
    let $userList = document.getElementById('user-list');
    let $username = document.getElementById('username');
    let $password = document.getElementById('password');

    // TODO： get user list，when success, run renderUserList
    function getListData() {
      ajax({
        method: 'get',
        url: API_ROOT,
        success: function (res) {
          renderUserList(res);
        },
        error: function (error) {
          console.log('error', error);
        }
      });
    }

    // TODO:  add user info,when success, run addItem
    function addItemData(data) {
      ajax({
        method: 'post',
        url: API_ROOT,
        data: data,
        success: function (res) {
          addItem(res);
        },
        error: function (error) {
          console.log('error', error);
        }
      });
    }

    // TODO: update user info,when success, run updateItem
    // 提示：Math.random().toString(36).substring(2) 生成随机的字符串
    function updateItemData(id) {
      var data = {};
      data.id = id;
      data.password = Math.random().toString(36).substring(2);
      data.username = Math.random().toString(36).substring(2);
      ajax({
        method: 'put',
        url: API_ROOT + '/' + id,
        data: data, 
        success: function (res) {
          updateItem(res);
        },
        error: function (error) {
          console.log('error', error);
        }
      });
    }

    // TODO: delete user info,,when success, run  deleteItem
    function deleteItemData(id) {
      ajax({
        method: 'delete',
        url: API_ROOT + '/' + id,
        success: function () {
          deleteItem(id);
        } ,
        error: function (error) {
          console.log('error', error);
        }
      });
    }

    document.getElementById('add-btn').addEventListener('click', function () {
        let $username = document.getElementById('username').value;
        let $password = document.getElementById('password').value;
        let data = {
            "username": $username, // Math.random().toString(36).substring(2),
            "password": $password
        }
        addItemData(data);
    })

    $userList.addEventListener('click', function (event) {
        let id = event.target.getAttribute('data-id') || event.target.parentElement.getAttribute('data-id');

        switch (true) {
            case event.target.innerHTML === 'X':
                deleteItemData(id);
                break;
            default:
                updateItemData(id);
        }
    })

    function renderUserList(data) {
        if (!Array.isArray(data) && !data instanceof Array) {
            return false;
        }

        $userList.innerHTML = data.reduce((acc, cur) => {
            return acc += `<li data-id="${cur.id}"><span>用户名：${cur.username} - 密码：${cur.password}</span><span>X</span></li>`;
        }, '');

    }

    function addItem(item) {
        var $item = document.createElement('li');
        $item.setAttribute('data-id', item.id);
        $item.innerHTML = `<span>用户名：${item.username} - 密码：${item.password}</span><span>X</span>`;
        $userList.appendChild($item);
        $username.value = '';
        $password.value = '';
    }

    function updateItem(item) {
        var $item = $userList.querySelector(`li[data-id='${item.id}']`);
        $item.innerHTML = `<span>用户名：${item.username} - 密码：${item.password}</span><span>X</span>`;
    }

    function deleteItem(id) {
        var $item = $userList.querySelector(`li[data-id='${id}']`);
        $userList.removeChild($item);
    }

    getListData();

})();