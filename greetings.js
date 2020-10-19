// const { Pool } = require("pg");
// const { query } = require("express");

module.exports = function greet(pool) {

    // var namesList = {};

    async function setNames(name) {
        const capitalize = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()

        // if (namesList[name] === undefined) {
        //     namesList[name] = 0;
        // }
        // namesList[name] += 1;
        let inspect = await pool.query('select name from greeted where name = $1;', [capitalize]);
        return inspect.rows;


    }

    async function incrementExistingUser(name) {

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


    // async function individualCounter (name){
    //     const oneCounter = await pool.query('select counter from greeted where name = $1')
    //     return oneCounter.rows[0].counter


    // }

    // async function addNames(names) {
    //     if ('select names from greeted where names = $1') {
    //     }
    //     let results = await pool.query('insert into greeted (names) values ($1) ', [names]);

    //     return results.rows

    // }

    // function getNamesAsList() {
    //     return Object.keys(namesList);
    // }


    // async function nameCounter() {
    //     // return Object.keys(namesList).length;
    //     const counter = await pool.query('select * from greeted;')
    //     // console.log(nameCounter);
    //     return counter.rows

    // }


    async function greetWork(name, language) {
        let dataNames = await setNames(name)
        //  console.log(dataNames + " dsdsdsdsd" )
        if (dataNames.length === 0) {
            await insertName(name);
        }
        else {
            await updateName(name);

        }
        return greetMe(name, language);
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

        console.log(name, language);
        
    }





    async function insertName(name) {
        const capitalize = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()

        var results = await pool.query('insert into greeted (name, counter) values ($1,$2);', [capitalize, 1])

        return results
    }

    async function updateName(name) {
        // const capitalize = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()


        var updating = await pool.query('update greeted set counter = counter+1 where name = $1;', [name])
        return updating.rowCount;
    }

    async function reset() {

        var deleted = await pool.query('delete from greeted');
        return deleted;

    }

    // async function counter (){
    //     var nameCounter = await pool.query('select * from greeted')
    //     return nameCounter.rowCount

    // }


    // function oneCounter(name) {
    //     for (const keys in namesList) {
    //         console.log(keys)
    //         if (keys === name) {
    //             var amount = namesList[keys]
    //         }
    //         // console.log(namesList + ' list');
    //     }
    // console.log(amount + ' amount');

    //     return amount


    // }



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



// if (nameInserted.value == "") {
//     message1.innerHTML = "Enter a name";
//     return;
// }