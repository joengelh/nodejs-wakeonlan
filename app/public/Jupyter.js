var myBoxJupyter = $("#indicatorJupyter");

function wakeJupyter() {
    $.ajax({
        type: "POST",
        url: "/wake",
        data: JSON.stringify({ mac: '90-1B-0E-84-DA-48' }),
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    });
}

myBoxJupyter.click(function() {
        wakeJupyter();
});

async function pingJupyter() {
    $.ajax({
        type: "POST",
        url: "/ping",
        data: JSON.stringify({ address: '192.168.2.15' }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            console.log(data);
            if (data == 0) {
                $('#indicatorJupyter').css('background-color', 'green');
            } else {
                $('#indicatorJupyter').css('background-color', 'red');
            }
        },
        error: function(errMsg) {
            console.error(errMsg);
        }
    });
}

pingJupyter();
setInterval(pingJupyter, 10000);