var connections = [];
var removeConnection = function(res, interval){
    'use strict';
    var index = connections.indexOf(res);
    connections.splice(index, 1);
    clearInterval(interval);
};

// Global function to trigger server side event
app.notify = function(method, type, data){
    'use strict';
    var message = '';
    data = JSON.parse(data);
    var messageObj = {
        method: method,
        title: data.title,
        matchup: data.matchup,
        starts_at: data.starts_at
    };
    message += 'event: ' + type + '\n';
    message += 'data: ' + JSON.stringify(messageObj) + '\n\n';
    connections.forEach(function(res){
        res.write(message);
    });
};

exports.index = function(req, res){
    'use strict';
    if (req.method === 'OPTIONS') {
        res.writeHead(200, {
            'Access-Control-Allow-Origin': req.headers.origin,
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Last-Event-ID, Cache-Control',
            'Access-Control-Max-Age': '86400'
        });
        res.end();
        return;
    }
    if(req.accepts('text/event-stream')){
        res.header({
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Origin': req.headers.origin,
            'Access-Control-Allow-Headers': 'Last-Event-ID, Cache-Control',
            'Access-Control-Max-Age': '86400'
        });
        if(req.xhr) {
            res.xhr = null;
        }

        connections.push(res);
        res.write('id\n');

        var interval = setInterval(function () {
            res.write('data: ' + Date() + '\n\n');
        }, 1000);

        req.on('close', function(){
            removeConnection(res, interval);
        });
    } else {
        res.send('');
    }
};
