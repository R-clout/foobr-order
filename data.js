const productItem = document.querySelectorAll(".product-item");

const shopItemsData = Array.from(productItem).map(product => {
    const id = product.dataset.itemId;
    const name = product.querySelector(`#product-${id}`)?.textContent.trim();
    const priceText = product.querySelector('p.text-grey800')?.textContent?.trim() || '';
    const priceMatch = priceText.match(/([\d.]+)/);
    const price = priceMatch ? parseFloat(priceMatch[1]) : 0;
    const quantity = parseInt(product.querySelector(`#food-${id}`)?.textContent.trim(),10)
    const image = product.querySelector('img')?.getAttribute('src');
    

    return {id, name, price, quantity, image};
})