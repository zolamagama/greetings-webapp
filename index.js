const express = require('express');

const exphbs = require('express-handlebars');

const flash = require('express-flash');

const session = require('express-session');

const app = express();

const bodyParser = require('body-parser');

const greet = require('./greetings');


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
    ssl: useSSL
});


const greetings = greet(pool);




app.get('/', function (req, res) {


    res.render('index', {
        // "counter": greetings.nameCounter(),
    });

});

app.post('/', async (req, res) => {

    // var name = req.body.user_name;
    // var language = req.body.greetingRadio;

    const { name, language } = req.body;
    const message = await greetings.greetWork(name, language);
    //console.log(language)
    // await greetings.greetWork(name);
    const counter = await greetings.getCounter();

    //const reset = await greetings.reset();

    // greetings.setNames(name);
    // greetings.insertName
    res.render('index', {
        counter,
        message,
       // reset
        // "counter": await greetings.nameCounter(),
        // "message": await greetings.greetMe(name, language),

    });

});

app.get('/greeted', async (req, res) => {


    const user = await greetings.userCounter()

    res.render('greeted', {
        user
    })
});

app.get('/amount/:user_name', async (req, res) => {
    const name = req.params.user_name;
    const count = await greetings.incrementExistingUser(name);

    //    console.log(count);



    res.render('amount', {
        name, count

    })
});



const PORT = process.env.PORT || 3023;

app.listen(PORT, function () {

    console.log("App started at port:", PORT)

});