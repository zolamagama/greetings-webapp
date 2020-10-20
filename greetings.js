module.exports = function greet(pool) {
    

    async function setNames(name) {
       // const capitalize = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()

        let inspect = await pool.query('select name from greeted where name = $1;', [name]);
        return inspect.rows;


    }

    async function incrementExistingUser(name) {
        // const capitalize = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()


        const sql = 'select * from greeted where name = $1;';

        const userCounter = await pool.query(sql, [name]);

        return userCounter.rows[0].counter;

    }

    async function userCounter() {

        const count = await pool.query('select name from greeted');
        return count.rows;


    }


    async function getCounter() {
        const counter = await pool.query('select * from greeted');
        return await counter.rowCount;
    }



    async function greetWork(name, language) {
        let dataNames = await setNames(name)
        if (dataNames.length === 0) {
            await insertName(name);
        }
        else {
            await updateName(name);
        }
        return greetMe(name, language)
    }

     function greetMe(name, language) {
        if (language === "IsiXhosa") {
         return "Molo, " + name;
        }
        if (language === "English") {
            return "Hello, " + name;
        }
        if (language === "Afrikaans") {
            return "Hallo, " + name;
        }        
    }

    async function insertName(name) {
       // const capitalize = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()

        var results = await pool.query('insert into greeted (name, counter) values ($1,$2);', [name, 1])

        return results
    }

    async function updateName(name) {


        var updating = await pool.query('update greeted set counter = counter+1 where name = $1;', [name])
        return updating.rowCount;
    }

    async function reset() {

        var deleted = await pool.query('delete from greeted');
        return deleted;

    }




    return {
        greetMe,
        reset,
        setNames,
        getCounter,
        updateName,
        greetWork,
        incrementExistingUser,
        userCounter,
        insertName

    }

}


