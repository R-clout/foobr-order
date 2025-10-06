const productItem = document.querySelectorAll(".product-item");
const proceedButton = document.getElementById("proceed-button");

const shopItemsData = Array.from(productItem).map(product => {
    const id = product.dataset.itemId;
    const name = product.querySelector(`#product-${id}`)?.textContent.trim();
    const priceText = product.querySelector('p.text-grey800')?.textContent?.trim() || '';
    const priceMatch = priceText.match(/([\d.]+)/);
    const price = priceMatch ? parseFloat(priceMatch[1]) : 0;
    const perElement = product.querySelector('.text-grey400');
    const perText = perElement ? perElement.textContent.trim().split(' ').pop() : '';
    const quantity = parseInt(product.querySelector(`#food-${id}`)?.textContent.trim(), 10);
    const image = product.querySelector('img')?.getAttribute('src');
    return { id, name, price, quantity, image, perText };
});

let basket = JSON.parse(localStorage.getItem("data")) || [];
let cart = [];

function update(id) {
    basket = JSON.parse(localStorage.getItem("data")) || [];
    let search = basket.find((x) => x.id === id);
    document.getElementById(`food-${id}`).innerHTML = search ? search.item : 0;
    updateProceedButton();
}

function increase(id) {
    let search = basket.find((item) => item.id === id);
    if (search === undefined) {
        basket.push({ id: id, item: 1 });
    } else {
        search.item += 1;
    }
    localStorage.setItem("data", JSON.stringify(basket));
    update(id);
}

function decrease(id) {
    let search = basket.find((item) => item.id === id);
    if (!search || search.item === 0) return;
    search.item -= 1;
    basket = basket.filter((x) => x.item !== 0);
    localStorage.setItem("data", JSON.stringify(basket));
    update(id);
}

shopItemsData.forEach((shopitem) => {
    let search = basket.find((x) => x.id === shopitem.id);
    let searchCheck = search ? search.item : 0;
    const quantityElement = document.getElementById(`food-${shopitem.id}`);
    if (quantityElement) {
        quantityElement.innerHTML = searchCheck;
    }
});

function updateProceedButton() {
    if (!Array.isArray(basket) || basket.length === 0) {
        proceedButton.style.display = "none";
    } else {
        proceedButton.style.display = "block";
    }
}
updateProceedButton();

function renderCart() {
    const cartInfo = document.getElementById("cart-info");
    if (!Array.isArray(cart) || cart.length === 0) {
        cartInfo.innerHTML = `
            <p class="text-[2rem] text-center my-4">This Cart is empty</p>
        `;
        document.getElementById("total-price").textContent = 0;
        return;
    }
    const mergedCart = cart.map(bask => {
        let product = shopItemsData.find(item => item.id === bask.id);
        return {
            ...product,
            item: bask.item
        };
    });

    cartInfo.innerHTML = mergedCart.map((cartItem) => {
        let totalPrice = cartItem.price * cartItem.item;
        return `
            <div class="flex justify-between items-center p-4">
                <div class="flex items-center gap-4">
                    <div>
                        <p class="text-[1.5rem]">${cartItem.name}</p>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <p class="text-[1.5rem] font-bold">₦${totalPrice}</p>
                    <p class="text-[0.9rem]">-${cartItem.item} ${cartItem.perText}</p>
                </div>
            </div>
        `;
    }).join("");

    const total = mergedCart
        .map(item => item.price * item.item)
        .reduce((a, b) => a + b, 0);

    document.getElementById("total-price").textContent = total;
}

document.getElementById("back-button").addEventListener('click', () => {
    document.getElementById('cart').classList.add("hidden");
});

document.getElementById("clearCart").addEventListener('click', () => {
    localStorage.removeItem("data");
    basket = [];
    updateProceedButton();
    shopItemsData.forEach((shopitem) => {
        const quantityElement = document.getElementById(`food-${shopitem.id}`);
        if (quantityElement) {
            quantityElement.innerHTML = 0;
        }
    });
    cart = [];
    renderCart();
});

proceedButton.addEventListener('click', () => {
    cart = basket.map(item => ({ ...item }));
    renderCart();
    document.getElementById('cart').classList.remove("hidden");
    console.log('Cart:', cart);
});