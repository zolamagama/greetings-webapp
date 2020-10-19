module.exports = function greetRoutes(greetings) {


    async function greet(req, res) {
        const counter = await greetings.getCounter()

        res.render('index', {
            counter,
        });

    };

    async function namesGreeted(req, res) {

        const name = req.body.name;
        const language = req.body.language;

        if (!name) {
            req.flash('error', 'Please enter a name')
            res.render('index', {
                counter: await greetings.getCounter()
            });
            return;
        }

        else if (!language) {
            req.flash('error', 'Please select a language')
            res.render('index', {
                counter: await greetings.getCounter()
            });
            return;
        }

        else if (isNaN(name) === false) {
            req.flash('error', 'Please dont enter a number')
            res.render('index', {
                counter: await greetings.getCounter()
            });
            return;
        }
        else {
            await greetings.greetWork(name, language)

            res.render('index', {
                message: greetings.greetMe(name, language),
                counter: await greetings.getCounter()
            });
        };
    }

    async function greetedCounter(req, res) {


        const user = await greetings.userCounter()

        res.render('greeted', {
            user
        })
    };

    async function eachUserCounter(req, res) {
        const name = req.params.user_name;
        const count = await greetings.incrementExistingUser(name);


        res.render('amount', {
            name, count

        })
    };

    async function deleteFromDt(req, res) {

        await greetings.reset()

        res.render('index', {
            counter: await greetings.getCounter()
        })


    };


    return {
        greet,
        namesGreeted,
        greetedCounter,
        eachUserCounter,
        deleteFromDt
    }











}