# Cart process

- First off, i had to call them, by adding a common class to their parent div, using the querySelector all. 
- Then added them to a array of object, where each has an id, name, price, and the quantity which i'd be using later in the code
- i created a increase, decrease, and update function.
- Inside the increase and decrease function, i called an id which was the argument added to the onclick attribute linking it to the script.js  had prepared. 
- I, then, created a basket array, that be holding the object increased or decreased. i added a search variable that checks if the item clicked already exists in the array or not.

`let search = basket.find((x) => x.id === id)`
    `if(search === undefined){`
        `basket.push({`
            `id: id,`
           `item: 1`
        `})`
    `} else {`
        `search.item += 1;`
   ` }`
`
- An update function is added to each the decrease and increase functions which allows it to run after each of the function runs respectively. What the update function does is uodate the textContent of the quantity whenever the increase and decrease function runs


- Another one is the calculate function which is called inside the update function. The basket array is called and then mapped, extracting the item property of the object, then a reduce function is added to add this numbers together and then passed to the textContent of the cartIcon;

- We now ran into a problem where after reloading the shopping page the value disappears, which was solved using the localStorage, added to the increment and decrement function with `JSON.stringify(array)`.

- Then to the array which the objects are added, we called the `JSON.parse(localStorage.getItem("data")) || []` which tells the program to either get the localStorage or return an empty array if there's none. 

- to be able to allow this information to be passed after reload, although they were working with a json formatted file in the tutorial, i had to improvise by calling the array of object i had extracted information containing the id and the likes, then intiating a search on the basket array which checks if there's any of the shopItems array in the basket's returns a zero if there's none and returns the item of item if there's any and runs the calculate function, passing the carticon innerText

`shopItemsData.forEach((shopitem) => {
    let search = basket.find((x) => x.id === shopitem.id) || [];
    console.log(search);
    let searchCheck = search.item === undefined ? 0 : search.item;
    document.getElementById('food-${shopitem.id}').innerHTML = searchCheck;
})
calculation();`
