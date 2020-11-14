namespace WitchesCauldron {
    export interface Ingredient {
        name: string;
        price: number;
    }

    export let data: Ingredient[] = [
            {name: "spider legs", price: 25},
            {name: "moon stone powder", price: 10},
            {name: "unicorn hairs", price: 500}
    ];
}