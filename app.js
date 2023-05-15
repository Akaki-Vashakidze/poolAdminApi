const path = require('path'),
  https = require('https'),
  fs = require('fs'),
  express = require('express'),
  serveStatic = require('serve-static'),
  proxy = require('http-proxy-middleware');
const database = require('./config/database');
const port = 3000;
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

const session = require('express-session');
const cors = require('cors');

app.use(cors());
app.use(session({
  secret: 'shssshshshshhs',
  resave: true,
  saveUninitialized: true,
  cookie: {maxAge: 6000000}
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
require('./routes/config')(app);


const options = require('./proxy.json');
Object.keys(options).forEach(key => {
  if (['/assets'].indexOf(key) < 0) {
    app.use(key, proxy(options[key]));
  }
});

var mognoConnect = function () {
  mongoose.connect(database.url, { useNewUrlParser: true } ,function (err, db) {
    if (err) {
      console.log(err['message']);
      mognoConnect();
    } else {
      console.log("connected to mongoose");
    }
  });
};

mognoConnect();


process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
});


app.use(serveStatic(__dirname + '/dist/pool-admin'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/dist/pool-admin');
// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/pool-admin/index.html'));
});

app.use((err,req, res, next)=>{
  console.log(err)
})
https.createServer({
  key: fs.readFileSync(__dirname + '/ssl/ca.key'),
  cert: fs.readFileSync(__dirname + '/ssl/ca.crt')
}, app).listen(port, () => {
  console.log('Server listening on port ' + port);
});
