exports.notifier = {
    connections: [],
    removeConnection: function(res, interval){
        'use strict';
        var index = this.connections.indexOf(res);
        this.connections.splice(index, 1);
        clearInterval(interval);
    },
    notify: function(method, type, data){
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
        this.connections.forEach(function(res){
            res.write(message);
        });
    }
};
