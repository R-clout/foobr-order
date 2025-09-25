
const cart = document.getElementById("cart-message");
const foodItem = document.getElementById("food-item");
const values = document.querySelectorAll('.value');

// Debug: log all value ids
const valueIds = Array.from(values).map(value => value.id);

let fooditemsArray = JSON.parse(localStorage.getItem("data")) || [];




document.addEventListener('DOMContentLoaded', () => {
    // Loop through fooditemsArray to restore UI
    fooditemsArray.forEach(fooditem => {
        const el = document.getElementById(`food-${fooditem.id}`);
        if (el) {
            el.innerHTML = fooditem.item;
        }
    });
    calculation();

    // Event delegation for all plus buttons
    document.body.addEventListener('click', function(e) {
        const plusBtn = e.target.closest('button[data-id][data-name][data-price]');
        if (plusBtn) {
            const id = plusBtn.getAttribute('data-id');
            const name = plusBtn.getAttribute('data-name');
            const price = parseFloat(plusBtn.getAttribute('data-price'));
            increment(id, name, price);
        }
    });
});







// Usage in HTML: onclick="increment('item1', 'Take Away', 300)"
let increment = (id, name, price) => {
    let search = fooditemsArray.find((fooditem) => fooditem.id === id);
    if (search === undefined) {
        fooditemsArray.push({
            id: id,
            name: name,
            price: price,
            item: 1,
        });
    } else {
        search.item += 1;
    }
    update(id);
    localStorage.setItem("data", JSON.stringify(fooditemsArray));
};



let decrement = (id) => {
    let search = fooditemsArray.find((fooditem) => fooditem.id === id);
    if (!search) return;
    if (search.item === 0) return;
    search.item -= 1;
    update(id);
    fooditemsArray = fooditemsArray.filter((fooditems) => fooditems.item !== 0);
    console.log(fooditemsArray)
    

    localStorage.setItem("data", JSON.stringify(fooditemsArray));
};



let update = (id) => {
    let search = fooditemsArray.find((fooditem) => fooditem.id === id);
    if (search) {
        document.getElementById(`food-${id}`).innerHTML = search.item;
    }
    calculation();
};




let calculation = () => {
    let cartIcon = document.getElementById("cart-amount");
    // Sum all item quantities for total cart count
    let totalItems = fooditemsArray.reduce((sum, fooditem) => sum + fooditem.item, 0);
    cartIcon.innerHTML = totalItems;
};


