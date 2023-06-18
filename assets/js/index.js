$(function () {
    getUserInfo()

})

var res = {
    nickname:'zhangsan',
    username:'占山',
    user_pic:''
}
function getUserInfo(){
    console.log('----11---')
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) {
              return layui.layer.msg('获取用户信息失败！')
            }
            // 调用 renderAvatar 渲染用户的头像
            renderAvatar(res.data)
          },
        complete:function () { 
            renderAvatar(res)
         }

    })
}

//渲染用户头像
function renderAvatar(user){
    console.log('----renderAvatar---')
    //1、获取用户名称
    var name = user.nickname || user.username
    //2、设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;&nbsp;'+name)
    //3、按需渲染图片头像
    if(user.user_pic != null){
        $('.layui-nav-img')
        .attr('src',user.user_pic)
        .show()
        $('.layui-nav-img').hide()
    }else{
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar')
        .html(first)
        .show()
    }
}