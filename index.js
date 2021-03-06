const express = require('express');

const exphbs = require('express-handlebars');

const flash = require('express-flash');

const session = require('express-session');

const app = express();

const bodyParser = require('body-parser');

const greet = require('./greetings');

const routeFunction = require('./routes');


const pg = require("pg");

const Pool = pg.Pool;


app.use(session({
    secret : "Align messages",
    resave: false,
    saveUninitialized: true
  }));

  // initialise the flash middleware
  app.use(flash());


app.engine('handlebars', exphbs({
    layoutsDir: './views/layouts'
}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));
;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/greeted';


let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}

const pool = new Pool({
    connectionString,
  //  ssl: useSSL
});


const greetings = greet(pool);
const routeInstance = routeFunction(greetings)

app.get('/', routeInstance.greet)

app.post('/', routeInstance.namesGreeted)

app.get('/greeted', routeInstance.greetedCounter)

app.get('/reset', routeInstance.deleteFromDt)

app.get('/amount/:user_name', routeInstance.eachUserCounter)

const PORT = process.env.PORT || 3023;

app.listen(PORT, function () {

    console.log("App started at port:", PORT)

});