var connections = [];

var removeConnection = function(res){
    'use strict';
    var index = connections.indexOf(res);
    connections.splice(index, 1);
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
    res.header({
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': req.headers.origin
    });
    if(req.xhr) {
        res.xhr = null;
    }

    connections.push(res);
    res.write('id\n');
    req.on('close', removeConnection);
};
