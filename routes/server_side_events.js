var connections = [];


var removeConnection = function(res){
  var index = connection.indexOf(res);
  connections.splice(index, 1);
}

// Global function to trigger server side event
app.notify = function(method, type, data){
  var message = '';
  data = JSON.parse(data);
  var messageObj = {
    method: method,
    title: data.title,
    matchup: data.matchup,
    starts_at: data.starts_at
  }
  message += 'event: ' + type + '\n';
  message += 'data: ' + JSON.stringify(messageObj) + '\n\n';
  console.log(message);
  connections.forEach(function(res){
    res.write(message);
  })
}

exports.index = function(req, res){
  if(req.accepts('text/event-stream')){
    res.header({
      'content-type': 'text/event-stream',
      'cache-control': 'no-cache',
      'connection': 'keep-alive'
    });
    if(req.xhr) {
      res.xhr = null;
    }

    connections.push(res);
    res.write('id\n');
    req.on('close', removeConnection);
  } else {
    res.send(200, 'foo');
  }
};