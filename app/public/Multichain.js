var myBoxMultichain = $("#indicatorMultichain");

function wakeMultichain() {
    $.ajax({
        type: "POST",
        url: "/wake",
        data: JSON.stringify({ mac: '90-1B-0E-85-78-33' }),
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    });
}

myBoxMultichain.click(function() {
        wakeMultichain();
});

async function pingMultichain() {
    $.ajax({
        type: "POST",
        url: "/ping",
        data: JSON.stringify({ address: '192.168.2.2' }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            console.log(data);
            if (data == 0) {
                $('#indicatorMultichain').css('background-color', 'green');
            } else {
                $('#indicatorMultichain').css('background-color', 'red');
            }
        },
        error: function(errMsg) {
            console.error(errMsg);
        }
    });
}

pingMultichain();
setInterval(pingMultichain, 10000);