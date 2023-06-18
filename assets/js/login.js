$(function(){
    $('#link_reg').on('click',function(e){
        $('.login-box').hide()
        $('.reg-box').show()
    })

    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
      })

      var form = layui.form
      var layer = layui.layer

      form.verify({
        //定义个密码的校验规则
        pwd:[/^[\S]{6,12}$/,"密码必须为6~12位非空字符"],

        //校验二次密码是否一致的规则
        repwd:function (value) {  
          var pwd = $('.reg-box [name=password]').val()
          if(pwd !== value){
            return '两次密码不一致'
          }
        }
      })


      //监听注册表单的提交事件
      $('#form_reg').on('submit', function(e){
        //1、阻止默认表单提交事件
        e.preventDefault()
        //2、发起ajax的post请求
        var data = {
          username:$('.reg-box [name=username]').val(),
          password:$('.reg-box [name=password]').val()
        }
        $.post('/api/reguser',data,function (res){
          if(res.status !== 0){
            return layer.msg(res.message)
          }

          layer.msg('注册成功,请登录')
          $('#link_login').click()
        })
      })

      $('#form_login').on('submit', function(e){
        e.preventDefault()
        $.ajax({
          url:'/api/login',
          method:'POST',
          data:$(this).serialize(),
          success:function(res){
            if(res.status !== 0){
              return layer.msg('登录失败！')
            }

            layer.msg('登录成功！')
            localStorage.setItem('token',res.token)

            // 跳转到后台主页
            location.href = '/index.html'
          }
        })
      })

})