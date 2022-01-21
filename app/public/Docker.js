var myBoxDocker = $("#indicatorDocker");

function wakeDocker() {
    $.ajax({
        type: "POST",
        url: "/wake",
        data: JSON.stringify({ mac: '90-1B-0E-84-DA-48' }),
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    });
}

myBoxDocker.click(function() {
        wakeDocker();
});

async function pingDocker() {
    $.ajax({
        type: "POST",
        url: "/ping",
        data: JSON.stringify({ address: '192.168.2.15' }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            console.log(data);
            if (data == 0) {
                $('#indicatorDocker').css('background-color', 'green');
            } else {
                $('#indicatorDocker').css('background-color', 'red');
            }
        },
        error: function(errMsg) {
            console.error(errMsg);
        }
    });
}

pingDocker();
setInterval(pingDocker, 10000);