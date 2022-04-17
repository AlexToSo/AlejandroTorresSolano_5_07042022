const createProduct = (item) => {
    const itemImage = document.createElement('img')
    const itemTitle = document.getElementById('title')
    const itemPrice = document.getElementById('price')
    const itemDescription = document.getElementById('description')

    itemImage.setAttribute('src', item.imageUrl)
    itemTitle.innerText = item.name
    itemPrice.innerText = item.price
    itemDescription.innerText = item.description

    document.querySelector('.item__img').appendChild(itemImage)
    
    for (color of item.colors) {
        const itemColorOption = document.createElement('option')
        itemColorOption.setAttribute('value',color)
        itemColorOption.innerText = color
        document.getElementById('colors').appendChild(itemColorOption)
    }
}

const main = async () => {
    var url = new URL(window.location.href);
    const id = url.searchParams.get("id");

    const product = await retrieveProducts(id);
    createProduct(product);
}

main()