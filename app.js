
/**
 * Module dependencies.
 */

var express = require('express')
    , http = require('http')
    , path = require('path')
    , fs = require('fs')
    , util = require('util')
    , builder = require('./lib/builder')
    , activity_logger = require('./lib/activity_logger')
    , index = require('./routes')
    , events = require('./routes/events')
    , matchups = require('./routes/matchups')
    , teams = require('./routes/teams')
    , videos = require('./routes/videos')
    , api = require('./routes/api');


var port = 3000;
var authPath = "auth.json";

//Read Flags
(function() {
    process.argv.forEach(function (val, index, array) {
        switch(val) {
            case "--port":
                var flagVal = array[index+1];
                if(flagVal && !isNaN(flagVal)) {
                    port = flagVal;
                }
            break;

            case "--authPath":
                var flagVal = array[index+1];
                if(flagVal) {
                    authPath = flagVal;
                }
            break;
        }
    });
})();

//Read Basic Auth Credentials
var authConfig = (function() {

    if(!fs.existsSync(authPath)) {
        util.log("Could not find authentication config " + authPath + ". Aborting.");
        process.exit(0);
    }

    var rawJSON = fs.readFileSync(authPath);
    var parsedJSON = {};

    if(!rawJSON) return;

    try {parsedJSON = JSON.parse(rawJSON);}
    catch(e) {};

    return {
        user: parsedJSON.user || "hello",
        pass: parsedJSON.pass || "world"
    };

})();


var app = express();

app.configure(function() {
    app.use(express.basicAuth(authConfig.user, authConfig.pass));
    app.set('port', port);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
    
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

// Basic Webserver
app.get('/', index.index);
app.get('/events', events.list);
app.get('/events/new', events.new);
app.get('/events/:event_id', events.edit);
app.get('/matchups', matchups.list);
app.get('/matchups/new', matchups.new)
app.get('/matchups/:matchup_id', matchups.edit)
app.get('/teams', teams.list);
app.get('/teams/new', teams.new);
app.get('/teams/:team_id', teams.edit);
app.get('/videos', videos.list);
// app.get('/videos/:video_id', videos.edit);

// Api Passthrough
app.get('/api/:type', api.passThrough);
app.get('/api/:type/:id', api.passThrough);
app.put('/api/:type/:id', api.action);
app.post('/api/:type', api.action);
app.delete('/api/:type/:id', api.action);


//App Locals

app.locals.pages = (function() {
    function Page(id, title, url, filters) {
        this.id = id;
        this.title = title;
        this.url = url;
    }
    return {
        activity: new Page('activity', 'Activity', '/'),
        events:   new Page('events', 'Events', '/events'),
        matchups: new Page('matchups', 'Matchups', '/matchups'),
        teams:    new Page('teams', 'Teams', '/teams'),
        videos:   new Page('videos', 'Videos', '/videos')
    };
})();


http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});
