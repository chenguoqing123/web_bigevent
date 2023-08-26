$(function () {
    //点击去注册
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    //点击去登录
    $('#link_login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    //从layui中获取form对象
    var form = layui.form
    var layer = layui.layer
    //通过form.verify()自定义检验规则
    form.verify({
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

            //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
            if (value === 'xxx') {
                alert('用户名不能为敏感词');
                return true;
            }
        }

        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        , pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        //校验两次密码是否一致
        repwd: function (value) {
            //value: 是再次确认中的值
            var pwd = $('.reg-box [name=password]').val()
            if (pwd != value) {
                return '两次密码不一致'
            }
        }
    })

    //监听注册表单
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        $.post('/api/reguser',
            { username: $('.reg-box [name=username]').val(), password: $('.reg-box [name=password]').val() },
            function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                //console.log('注册成功!');
                layer.msg('注册成功！')
                //模拟人的点击行为
                $('#link_login').click()
            })
    })

    //监听登录表单
    $('#form_login').submit(function(e){
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            //快速获取表单中的数据
            data: $(this).serialize(),
            success:function(res){
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('登录成功！')
                //将登录成功的值存到localstroage中，方便后续取值
                localStorage.setItem('token',res.token)
                //跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})




