/**
 * @class
 * @classdesc Defines a product in the cart
 */
class CartItem {
    constructor(id, quantity, color) {
        this.id = id;
        this.quantity = quantity;
        this.color = color;
    }
}

/**
 * @class
 * @classdesc Defines the contact informations for an order
 */
class Contact {
    constructor(firstName, lastName, address, city, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.email = email;
    }
}

/**
 * Gets product/s from API
 * @param { String } [articleId]
 * @return { (Object | Object[])<altTxt: String, colors: String[], description: String, imageUrl: String, name: String, price: Integer[0..], _id: String> }
 */
const retrieveProducts = async (articleId) => {
    try {

        // Vérification pour savoir si l'on demande la liste de tous les produits ou un seul
        let url = articleId
            ? `http://localhost:3000/api/products/${articleId}`
            : `http://localhost:3000/api/products/`
        
        // Lancement de la requête GET
        let data = await fetch(url)

        if (data.ok) {
            return data.json()
        }
    }
    catch (err) {
        console.log("Erreur " + err)
    }
}

/**
 * Gets cart list from localStorage
 * @return { Object[]<color: String, id: String, quantity: Integer[1..]> }
 */
const getCart = () => {
    let cartList = localStorage.getItem('cartList');
    if (cartList == null) {
        return [];
    }
    else {
        // Envoi de la liste en objet JS
        return JSON.parse(cartList);
    }
}

/**
 * Saves cart list to localStorage
 * @param { Object[] } cartList
 * @param { String } cartList[].color
 * @param { String } cartList[].id
 * @param { Integer[1..] } cartList[].quantity
 */
const saveCart = (cartList) => {
    // Enregistrement de la liste en objet JSON
    localStorage.setItem('cartList', JSON.stringify(cartList));
}