$(function () {
    // 点击去登陆，注册框消失，登陆框出现
    $('.reg').click(function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })
    // 点击去注册，登陆框消失，注册框出现
    $('.login').click(function () {
        $('.reg-box').show()
        $('.login-box').hide()
    })

    // 校验
    layui.form.verify({
        username: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }
        }

        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        , pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repass: function (value, item) {
            console.log('re', value)
            var pass = $('.psw').val()
            console.dir(pass)
            if (value !== pass) {
                return '密码不一致'
            }
        }
    });

    // 注册框的后台交互
    $('.regForm').on('submit', function (e) {
        e.preventDefault();
        var data = $(this).serialize();
        $.post('/api/reguser', data, function (res) {
            layui.layer.msg(res.message);
            if (res.status === 0) {
                $('.reg-box').hide()
                $('.login-box').show()
            }
        })
    })

    // 登陆框的后台交互

    $('.loginForm').on('submit', function (e) {
        e.preventDefault();
        var data = $(this).serialize();
        $.post('/api/login', data, function (res) {
            layui.layer.msg(res.message);
            if (res.status === 0) {
                location.href = '/index.html'
            }
        })

    })

})