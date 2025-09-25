const cartMessage = document.getElementById("cart-message");


let fooditemsArray = JSON.parse(localStorage.getItem("data")) || []



let generateCardItem = () => {
    if(fooditemsArray.length !== 0){
        return cartMessage.innerHTML = fooditemsArray.map((fooditem) => {
            const name = fooditem.name ? fooditem.name : 'N/A';
            const price = (fooditem.price !== undefined && fooditem.price !== null) ? fooditem.price : 'N/A';
            return `
                <div class="bg-amber-500 flex justify-between p-5 my-2" id="product-id-${item.id}">
                    <div class="flex gap-2">
                        <div>
                            <img src="./assets/img/download.png" alt="take out" class="w-20 rounded-[50%]" />
                        </div>
                        <div>
                            <p class="text-black font-bold text-[1.1rem]">${name}</p>
                            <p class="text-[1.1rem] text-black font-semibold">${fooditem.item}x</p>
                        </div>
                    </div>
                    <div class="flex gap-3 items-center">
                        <p class="text-black text-[1.2rem] font-bold">${price}</p>
                        <button>
                            <img src="./assets/icons/x (1).svg" class="w-8" />
                        </button>
                    </div>
                </div>  
            `
        }).join("")
    }
    else{
        cartMessage.innerHTML = `
            <h2 class="text-center text-[2rem]">This Cart is Empty</h2>
            <p class="text-center text-[1.2rem]">Kindly make an order</p>
        `
    }
}


generateCardItem();