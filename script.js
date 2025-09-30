const productItem = document.querySelectorAll(".product-item");

const shopItemsData = Array.from(productItem).map(product => {
    const id = product.dataset.itemId;
    const name = product.querySelector(`#product-${id}`)?.textContent.trim();
    const priceText = product.querySelector('p.text-grey800')?.textContent?.trim() || '';
    const priceMatch = priceText.match(/([\d.]+)/);
    const price = priceMatch ? parseFloat(priceMatch[1]) : 0;
    const quantity = parseInt(product.querySelector(`#food-${id}`)?.textContent.trim(), 10);
    const image = product.querySelector('img')?.getAttribute('src');
    return { id, name, price, quantity, image };
});

let basket = JSON.parse(localStorage.getItem("data")) || [];

// Function to update item quantity in UI and recalculate cart
function update(id) {
    let search = basket.find((x) => x.id === id);
    document.getElementById(`food-${id}`).innerHTML = search ? search.item : 0;
    calculation();
    generateItem();
}

// Function to calculate total items in cart (cart icon count)
function calculation() {
    let cartIcon = document.getElementById("cart-amount");
    const totalItems = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
    cartIcon.innerHTML = totalItems;
}

// Function to increase item quantity
function increase(id) {
    let search = basket.find((item) => item.id === id);
    if (search === undefined) {
        basket.push({
            id: id,
            item: 1
        });
    } else {
        search.item += 1;
    }
    localStorage.setItem("data", JSON.stringify(basket));
    update(id);
}

// Function to decrease item quantity
function decrease(id) {
    let search = basket.find((item) => item.id === id);
    if (!search || search.item === 0) return;
    search.item -= 1;
    basket = basket.filter((x) => x.item !== 0);
    localStorage.setItem("data", JSON.stringify(basket));
    update(id);
}

// Function to render cart items and total
function generateItem() {
    const cartInfo = document.getElementById("cart-info");

    if (basket.length !== 0) {
        const mergedCart = basket.map(bask => {
            let product = shopItemsData.find(item => item.id === bask.id);
            return {
                ...product,
                item: bask.item
            };
        });

        cartInfo.innerHTML = mergedCart.map((cartItem) => {
            let totalPrice = cartItem.price * cartItem.item;

            return `
                <div class="flex justify-between items-center p-4 bg-amber-400 my-4">
                    <div class="flex items-center gap-4">
                        <div>
                            <img src="${cartItem.image}" class="w-24 rounded-[50%]" />
                        </div>
                        <div>
                            <p class="text-[2rem]">${cartItem.name}</p>
                            <p class="text-[1.5rem]">${cartItem.item}x</p>
                        </div>
                    </div>
                    <div>
                        <p class="text-[1.5rem] font-bold">₦${totalPrice}</p>
                    </div>
                </div>
            `;
        }).join("");

        const total = mergedCart
            .map(item => item.price * item.item)
            .reduce((a, b) => a + b, 0);

        document.getElementById("total-price").textContent = total;

    } else {
        cartInfo.innerHTML = `
            <p class="text-[2rem] text-center my-4">This Cart is empty</p>
        `;
        document.getElementById("total-price").textContent = 0;
    }
}

// Initial rendering of quantities
shopItemsData.forEach((shopitem) => {
    let search = basket.find((x) => x.id === shopitem.id);
    let searchCheck = search ? search.item : 0;
    document.getElementById(`food-${shopitem.id}`).innerHTML = searchCheck;
});

// Initial calculation and cart rendering
calculation();
generateItem();


{/*  */}