var myBoxWindow3 = $("#indicatorWindow3");

function wakeWindow3() {
    $.ajax({
        type: "POST",
        url: "/wake",
        data: JSON.stringify({ mac: '90-1B-0E-84-DA-53' }),
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    });
}

myBoxWindow3.click(function() {
        wakeWindow3();
});

async function pingWindow3() {
    $.ajax({
        type: "POST",
        url: "/ping",
        data: JSON.stringify({ address: '192.168.2.7' }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            console.log(data);
            if (data == 0) {
                $('#indicatorWindow3').css('background-color', 'green');
            } else {
                $('#indicatorWindow3').css('background-color', 'red');
            }
        },
        error: function(errMsg) {
            console.error(errMsg);
        }
    });
}

pingWindow3();
setInterval(pingWindow3, 10000);