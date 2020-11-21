"use strict";
var WitchesCauldron;
(function (WitchesCauldron) {
    function generateContent(_data) {
        console.log(_data);
        let selectbox = document.getElementById("zutatenSelect");
        for (let ingredient of _data) {
            console.log(ingredient);
            console.log(ingredient.price);
            let option = document.createElement("option");
            option.value = ingredient.name;
            option.innerText = ingredient.name;
            option.setAttribute("price", ingredient.price.toFixed(2));
            option.setAttribute("name", ingredient.name);
            if (selectbox)
                selectbox.appendChild(option);
        }
    }
    WitchesCauldron.generateContent = generateContent;
})(WitchesCauldron || (WitchesCauldron = {}));
//# sourceMappingURL=generateContent.js.map