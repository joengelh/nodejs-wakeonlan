var myBoxWindow1 = $("#indicatorWindow1");

function wakeWindow1() {
    $.ajax({
        type: "POST",
        url: "/wake",
        data: JSON.stringify({ mac: '90-1B-0E-89-C4-44' }),
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    });
}

myBoxWindow1.click(function() {
        wakeWindow1();
});

async function pingWindow1() {
    $.ajax({
        type: "POST",
        url: "/ping",
        data: JSON.stringify({ address: '192.168.2.12' }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            console.log(data);
            if (data == 0) {
                $('#indicatorWindow1').css('background-color', 'green');
            } else {
                $('#indicatorWindow1').css('background-color', 'red');
            }
        },
        error: function(errMsg) {
            console.error(errMsg);
        }
    });
}

pingWindow1();
setInterval(pingWindow1, 10000);