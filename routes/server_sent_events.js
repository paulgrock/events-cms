var notifier = require('../lib/notifier');

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
        res.writeHead(200, {
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

        notifier.connections.push(res);
        res.write('id\n');

        var interval = setInterval(function () {
            res.write('data: ' + Date() + '\n\n');
        }, 1000);

        req.on('close', function(){
            notifier.removeConnection(res, interval);
        });
    } else {
        res.send('');
    }
};
