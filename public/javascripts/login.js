function getUser(){
    let user = {};
    user.username = $("#username").val();
    user.password = $("#password").val();
    return user;
}

$("input.submit-login").click(function () {
    let user = getUser();

    if (user.username !== '' && user.password !== '') {
        $.ajax({
            type: 'POST',
            url: "/user/login/",
            data: JSON.stringify(user),
            success: function (data) {
                if (data.state === 0) {
                    alert('登陆成功');
                    window.location.href = data.url;
                } else if (data.state === 1) {
                    alert('登陆失败')
                }
            },
            contentType: 'application/json',
            dataType: 'json'
        });
    } else {
        alert('用户名和密码不得为空');
    }
});

$("input.submit-register").click(function () {
    let user = getUser();

    if (user.username !== '' && user.password !== '') {
        $.ajax({
            type: 'POST',
            url: "/user/register/",
            data: JSON.stringify(user),
            success: function (data) {
                if (data.state === 0) {
                    alert('注册成功，请登录');
                } else if (data.state === 1) {
                    alert('注册失败')
                }
            },
            contentType: 'application/json',
            dataType: 'json'
        });
    } else {
        alert('用户名和密码不得为空');
    }
});