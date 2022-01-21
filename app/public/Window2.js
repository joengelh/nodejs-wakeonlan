var myBoxWindow2 = $("#indicatorWindow2");

function wakeWindow2() {
    $.ajax({
        type: "POST",
        url: "/wake",
        data: JSON.stringify({ mac: '90-1B-0E-85-41-AC' }),
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    });
}

myBoxWindow2.click(function() {
        wakeWindow2();
});

async function pingWindow2() {
    $.ajax({
        type: "POST",
        url: "/ping",
        data: JSON.stringify({ address: '192.168.2.6' }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            console.log(data);
            if (data == 0) {
                $('#indicatorWindow2').css('background-color', 'green');
            } else {
                $('#indicatorWindow2').css('background-color', 'red');
            }
        },
        error: function(errMsg) {
            console.error(errMsg);
        }
    });
}

pingWindow2();
setInterval(pingWindow2, 10000);