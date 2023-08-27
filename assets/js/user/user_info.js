$(function () {
    var form = layui.form
    var layer = layui.layer
    //创建自定义的验证规则
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符长度之间！'
            }
        }
    })

    //初始化用户信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取信息失败！')
                }
                //调用layui中form.val()快速给表单赋值
                form.val('formUserInfo', res.data)
            }
        })
    }

    //重置
    $('#btnreset').on('click', function (e) {
        //阻止默认重置行为
        e.preventDefault()
        initUserInfo()

    })

    //监听表单提交事件
    $('.layui-form').on('submit', function (e) {
        //阻止表单默认提交行为
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            // 快速获取表单值
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                //调用父页面的方法，重新渲染用户的头像和信息
                window.parent.getUserInfo()
            }
        })
    })
})