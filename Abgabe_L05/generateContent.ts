namespace WitchesCauldron {

    export function generateContent(_data: Ingredient[]): void {
        console.log(_data);

        let selectbox: HTMLElement | null =  document.getElementById("zutatenSelect");
        for (let ingredient of _data) {
            console.log(ingredient);
            console.log(ingredient.price);
            let option: HTMLOptionElement = document.createElement("option");
            option.value = ingredient.name;
            option.innerText = ingredient.name;
            option.setAttribute("price", ingredient.price.toFixed(2));
            option.setAttribute("name", ingredient.name);
            if (selectbox)
                selectbox.appendChild(option);
        }
    }
}