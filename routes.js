module.exports = function greetRoutes(greetings) {


    function greet (req, res) {


        res.render('index', {
        });
    
    };

    async function namesGreeted (req, res) {

        const { name, language } = req.body;
        const message = await greetings.greetWork(name, language);
      
        const counter = await greetings.getCounter();
        res.render('index', {
            counter,
            message,
        
        });
    };


        async function greetedCounter (req, res) {


            const user = await greetings.userCounter()
        
            res.render('greeted', {
                user
            })
        };

        async function eachUserCounter(req, res) {
            const name = req.params.user_name;
            const count = await greetings.incrementExistingUser(name);
        
            //    console.log(count);
        
        
        
            res.render('amount', {
                name, count
        
            })
        };
    

return {
    greet,
    namesGreeted,
    greetedCounter,
    eachUserCounter,
}











}