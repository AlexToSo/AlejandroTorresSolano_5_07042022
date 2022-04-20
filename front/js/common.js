////////////////////////////////////////////////////
// Classe pour définir les objets dans le pannier //
////////////////////////////////////////////////////
class CartItem {
    constructor(id, quantity, color) {
        this.id = id;
        this.quantity = quantity;
        this.color = color;
    }
}

/////////////////////////////////////////////////////
// Classe pour définir les informations de contact //
/////////////////////////////////////////////////////
class Contact {
    constructor(firstName, lastName, address, city, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.email = email;
    }
}

////////////////////////////////////////////////////////////
// Fonction pour obtenir le/s produits à partir de l'API  //
////////////////////////////////////////////////////////////
const retrieveProducts = async (articleId) => {
    try {

        // Vérification poour savoir si l'on demande la liste de tous les produits ou un seul
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

////////////////////////////////////////////////////////////////////
// Fonction pour récuperer la liste de pannier du le localStorage //
////////////////////////////////////////////////////////////////////
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

////////////////////////////////////////////////////////////////////////
// Fonction pour sauvegarder la liste de pannier dans le localStorage //
////////////////////////////////////////////////////////////////////////
const saveCart = (cartList) => {
    // Enregistrement de la liste en objet JSON
    localStorage.setItem('cartList', JSON.stringify(cartList));
}