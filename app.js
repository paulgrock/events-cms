
/**
 * Module dependencies.
 */

var express = require('express')
    , http = require('http')
    , path = require('path')
    , index = require('./routes')
    , events = require('./routes/events')
    , matchups = require('./routes/matchups')
    , teams = require('./routes/teams')
    , shows = require('./routes/shows')
    , videos = require('./routes/videos')
    , api = require('./routes/api');

var app = express();

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
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

//App Locals
function Page(id, title, url, filters) {
    this.id = id;
    this.title = title;
    this.url = url;
    this.filters = filters;
}

var filters = [
    {title: "All",                slug: undefined},
    {title: "Starcraft 2",        slug: "starcraft-2"},
    {title: "League of Legends",  slug: "league-of-legends"},
    {title: "Shootmania",         slug: "shootmania"}
];

app.locals.pages = {
    home:     new Page('home', 'Home', '/'),
    events:   new Page('events', 'Events', '/events', filters),
    matchups: new Page('matchups', 'Matchups', '/matchups', filters),
    teams:    new Page('teams', 'Teams', '/teams', filters),
    videos:   new Page('videos', 'Videos', '/videos', filters)
};

// Basic Webserver
app.get('/', index.index);
app.get('/events', events.list);
app.get('/events/new', events.new);
app.get('/events/:event_id', events.edit);
app.get('/matchups', matchups.list);
app.get('/matchups/:id', matchups.edit)
app.get('/teams', teams.list);
app.get('/teams/:id', teams.edit);
app.get('/shows', shows.list);
app.get('/shows/:id', shows.edit);
app.get('/videos', videos.list);
app.get('/videos/:id', videos.edit);

// Api Passthrough
app.get('/api/:type', api.passThrough);
app.get('/api/:type/:id', api.passThrough);
app.put('/api/:type/:id', api.action);
app.post('/api/:type', api.action);
app.delete('/api/:type/:id', api.action);



http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});
