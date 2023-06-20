$(function () {
    var form = layui.form;
    var layer = layui.layer
    form.verify({
        // 函数写法
        // 参数 value 为表单的值；参数 item 为表单的 DOM 对象
        nickname: function(value, item){
            console.log('----length----',value.length)
            if(value.length < 6){
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        },
      });

      $('#submit').on('click', function(e){
            e.preventDefault();
      })

      initUserInfo()

      function initUserInfo(){
            $.ajax({
                method:'GET',
                url:'./my/userinfo',
                success:function(res){
                    if(res.status !== 0){
                        return layer.msg('获取用户信息失败')
                    }
                   form.val('formUserInfo',res.data) 
                }
            })
      }

      $('#btnReset').on('click',function (e) {
        e.preventDefault();
        initUserInfo()
        })

        //监听表单的提交事件
        $('.layui-form').on('submit',function(e){
            e.preventDefault()
            $.ajax({
                method:'POST',
                url:'/my/userinfo',
                data:$(this).serialize(),
                success:function (res) {
                    if(res.status !== 0){
                        return layer.msg('更新用户信息失败')
                    }
                    layer.msg('更新用户信息成功')
                    window.parent.getUerInfo()
                  }
            })
        })

})