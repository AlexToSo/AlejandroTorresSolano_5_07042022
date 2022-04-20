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
        itemColorOption.setAttribute('value', color)
        itemColorOption.innerText = color
        document.getElementById('colors').appendChild(itemColorOption)
    }
}

const addToCart = (articleId, articleNumber, articleColor) => {
    let cartList = getCart();
    let articleToAdd = new CartItem(articleId, articleNumber, articleColor);

    let alreadyInCart = false;

    for (let i in cartList) {
        if ((cartList[i].id == articleToAdd.id) && (cartList[i].color == articleToAdd.color)) {
            cartList[i].quantity += articleToAdd.quantity;
            alreadyInCart = true;
            break
        }
    }

    if (!alreadyInCart) {
        cartList.push(articleToAdd);
    }
    saveCart(cartList);
}



const main = async () => {
    var url = new URL(window.location.href);
    const articleId = url.searchParams.get('id');

    const product = await retrieveProducts(articleId);
    createProduct(product);

    document.getElementById('addToCart').addEventListener('click', function () {
        let articleNumber = Number(document.getElementById('quantity').value);
        let articleColor = document.getElementById('colors').value;

        if ((articleNumber > 0) && (articleColor != '')) {
            addToCart(articleId, articleNumber, articleColor);
        }

    });
}

main()