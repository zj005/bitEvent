$(function () {
    console.log('----------')
    var form = layui.form
    form.verify({
        pwd:[/^[\S]{6,12}$/, '密码必须为6到12位的非空字符'],
        newPwd:function (value) {  
            var pwdValue = $('[name="oldPwd"]').val()
            var len = pwdValue.length
            if(pwdValue === value){
                return "新密码不能和原密码相同！"
            }

            if(len < 6 || len >12){
                return "新密码长度必须为6到12位的非空字符"
            }
        },
        samePwd:function(value){
            var newPwd = $('[name="newPwd"]').val()
            if(newPwd !== value){
                return '二次密码输入必须一致'
            }
        }
    })

    $('.layui-form').on('submit',function (e) {
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:function (res) {
                if(res.status !== 0){
                    return layui.layer.msg('更新密码失败！')
                }
                layui.layer.msg('更新密码成功！')
                $('.layui-form')[0].reset()
              }
           
        })
      })

  })