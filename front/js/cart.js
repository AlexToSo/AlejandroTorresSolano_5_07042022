const createCart = async () => {
    let cartList = getCart();

    let articlesNumber = 0
    let articlesPrice = 0

    const cartSection = document.getElementById('cart__items')

    for (let cartProduct of cartList) {
        const product = await retrieveProducts(cartProduct.id);

        const cartArticle = document.createElement('article')
        cartArticle.classList.add('cart__item')
        cartArticle.setAttribute('data-id', cartProduct.id)
        cartArticle.setAttribute('data-color', cartProduct.color)

        const cartDivImage = document.createElement('div')
        cartDivImage.classList.add('cart__item__img')

        const cartImage = document.createElement('img')
        cartImage.setAttribute('src', product.imageUrl)
        cartImage.setAttribute('alt', product.altTxt)

        const cartDivContent = document.createElement('div')
        cartDivContent.classList.add('cart__item__content')

        const cartDivDescription = document.createElement('div')
        cartDivDescription.classList.add('cart__item__content__description')

        const cartProductName = document.createElement('h2')
        cartProductName.innerText = product.name

        const cartProductColor = document.createElement('p')
        cartProductColor.innerText = cartProduct.color

        const cartProductPrice = document.createElement('p')
        cartProductPrice.innerText = (product.price * cartProduct.quantity).toFixed(2)  + ' €'

        const cartDivSettings = document.createElement('div')
        cartDivSettings.classList.add('cart__item__content__settings')

        const cartDivSettingsQuantity = document.createElement('div')
        cartDivSettingsQuantity.classList.add('cart__item__content__settings__quantity')

        const cartPSettingsQuantity = document.createElement('p')
        cartPSettingsQuantity.innerText = 'Qté : '

        const cartInputSettingsQuantity = document.createElement('input')
        cartInputSettingsQuantity.setAttribute('type', 'number')
        cartInputSettingsQuantity.classList.add('itemQuantity')
        cartInputSettingsQuantity.setAttribute('name', 'itemQuantity')
        cartInputSettingsQuantity.setAttribute('min', '1')
        cartInputSettingsQuantity.setAttribute('max', '100')
        cartInputSettingsQuantity.setAttribute('value', cartProduct.quantity)

        cartDivSettingsQuantity.appendChild(cartPSettingsQuantity)
        cartDivSettingsQuantity.appendChild(cartInputSettingsQuantity)

        const cartDivSettingsDelete = document.createElement('div')
        cartDivSettingsDelete.classList.add('cart__item__content__settings__delete')

        const cartDeleteItem = document.createElement('p')
        cartDeleteItem.classList.add('deleteItem')
        cartDeleteItem.innerText = 'Supprimer'


        cartDivImage.appendChild(cartImage)

        cartDivDescription.appendChild(cartProductName)
        cartDivDescription.appendChild(cartProductColor)
        cartDivDescription.appendChild(cartProductPrice)

        cartDivSettingsQuantity.appendChild(cartPSettingsQuantity)
        cartDivSettingsQuantity.appendChild(cartInputSettingsQuantity)

        cartDivSettingsDelete.appendChild(cartDeleteItem)

        cartDivSettings.appendChild(cartDivSettingsQuantity)
        cartDivSettings.appendChild(cartDivSettingsDelete)

        cartDivContent.appendChild(cartDivDescription)
        cartDivContent.appendChild(cartDivSettings)

        cartArticle.appendChild(cartDivImage)
        cartArticle.appendChild(cartDivContent)

        cartSection.appendChild(cartArticle)

        articlesNumber += cartProduct.quantity
        articlesPrice += product.price * cartProduct.quantity
    }

    document.getElementById('totalQuantity').innerText = articlesNumber
    document.getElementById('totalPrice').innerText = articlesPrice.toFixed(2)

}

const main = async () => {
    createCart();
}

main()