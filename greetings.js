module.exports = function greet() {

    var namesList = {};

    function setNames(name) {
        if (namesList[name] === undefined) {
            namesList[name] = 0;
        }
        namesList[name] += 1;

    }


    function getName() {
        return namesList
    }

    function getNamesAsList() {
        return Object.keys(namesList);
    }


    function nameCounter() {
        return Object.keys(namesList).length;
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

    function flashMessage(name, language) {

        if (name == '') {

            var message = "Please enter a name";
        }
        if (!language) {
            var message = "Select a language";
        }
        return message
    }



    function oneCounter(name) {
        for (const keys in namesList) {
            console.log(keys)
            if (keys === name) {
                var amount = namesList[keys]
            }
            // console.log(namesList + ' list');
        }
        // console.log(amount + ' amount');

        return amount


    }



    return {
        greetMe,
        nameCounter,
        setNames,
        getName,
        getNamesAsList,
        oneCounter,
        flashMessage
    }

}



// if (nameInserted.value == "") {
//     message1.innerHTML = "Enter a name";
//     return;
// }