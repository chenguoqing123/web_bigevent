$(function () {
    var layer = layui.layer
    //获取用户信息
    getUserInfo()

    //退出
    $('#btnLogout').on('click', function () {
        //
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            // 1. 清空本地存储
            localStorage.removeItem('token')
            // 2. 返回登录页面
            location.href = '/login.html'
            //关闭弹出提示框
            layer.close(index)
        });
    })
})

//获取用户信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败!')
            }
            //渲染用户头像
            renderAvatar(res.data)
        }
    })
}
//渲染用户头像
function renderAvatar(user) {
    //获取用户名
    var name = user.nickname || user.username
    //设置欢迎文本
    $('#welcome').html('欢迎&nbsp&nbsp;' + name)
    //按需渲染头像
    if (user.user_pic !== null) {
        //渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        //渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show()
    }
}