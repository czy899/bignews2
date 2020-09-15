$(function () {


    // 渲染头像和名字
    function userInfo() {
        $.ajax({
            url: '/my/userinfo',

            success: function (res) {
                if (res.status === 1) {
                    return
                }
                console.log(res)
                var resname = res.data.nickname || res.data.username
                $('.wel').html('欢迎 ' + resname);
                if (res.data.user_pic) {
                    $('.layui-nav-img').attr('src', res.data.user_pic).show()
                    $('.nickname').hide()
                } else {
                    $('.layui-nav-img').hide()
                    $('.nickname').text(resname[0].toUpperCase())
                }
            },

        })
    }

    userInfo();

    window.userInfo = userInfo;
    //退出事件
    $('.exit').on('click', function (e) {
        e.preventDefault()
        layui.layer.confirm('确定退出?', { icon: 3, title: '提示' }, function (index) {
            //do something
            window.location.href = '/login.html'
            window.localStorage.removeItem('token')
            layer.close(index);
        });
    })




})