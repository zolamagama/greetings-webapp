const express = require('express');

const exphbs = require('express-handlebars');

const app = express();

const bodyParser = require('body-parser');

const greet = require('./greetings');

const greetings = greet();

const pg = require("pg");

const Pool = pg.Pool;



app.engine('handlebars', exphbs({
    layoutsDir: './views/layouts'
}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));
;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:3023/greeted';


let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}

const pool = new Pool({
    connectionString,
    ssl: useSSL
});



app.get('/', function (req, res) {


    res.render('index', {
        "counter": greetings.nameCounter(),
    });

});

app.post('/greetings', function (req, res) {

    var name = req.body.user_name;
    var language = req.body.greetingRadio;
    var error = greetings.flashMessage(req.body.name, req.body.language)


    greetings.setNames(name);

    res.render('greetings', {
        "counter": greetings.nameCounter(),
        "message": greetings.greetMe(name, language),
        "error": (error === '') ? greetings.greetMe(req.body.name, req.body.language) : error,

    })

});

app.get('/greeted', function (req, res) {

    res.render('greeted', {
        "user": greetings.getNamesAsList()
    })
});

app.get('/amount/:user_name', function (req, res) {
    var name = req.params.user_name;
    // console.log(name);
    // var name = greet(req.body.user_name);
    var count = greetings.nameCounter();
    var language = req.body.greetingRadio;



    res.render('amount', {
        name,
        "count": greetings.oneCounter(name)

    })
});



const PORT = process.env.PORT || 3023;

app.listen(PORT, function () {

    console.log("App started at port:", PORT)

});