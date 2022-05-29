"use strict";
/** This are the constant which are used to set and get data into/from localhost */
const sessionName = 'bewakoof_session';
const products = 'products';
const cart_details = 'cart_details';
const ADD = 'ADD';
const REMOVE = 'REMOVE';
const CLEAR = 'CLEAR';

/** This method is used to get item from the localhost */
const getItem = (key) => {
    return localStorage.getItem(key);
}

/** This method is used to set item into the localhost */
const setItem = (key, value) => {
    localStorage.setItem(key, value);
}

/** Set all products while login successful. */
const setProducts = () => {
    const products_detail = [
        {id:1, name: "Laptop", imageName: "img2.png", price: 685.00, description: 'A laptop computer, sometimes called a notebook computer by manufacturers, is a battery- or AC-powered personal computer generally smaller than a briefcase that can easily be transported and conveniently used in temporary spaces such as on airplanes, in libraries, temporary offices, and at meetings.'},
        {id:2, name: "Head phone", imageName: "img3.png", price: 100.00, description:'Headphones are a pair of small speakers used for listening to sound from a computer, music player or other such electronic device. Headphones originally consisted of one speaker for each ear, connected by a band over the head.'},
        {id:3, name: "Machine", imageName: "img1.png", price: 55.00, description:'A machine is a physical system using power to apply forces and control movement to perform an action. The term is commonly applied to artificial devices, such those employing engines or motors, but also to natural biological macromolecules, such as molecular machines.'},
        {id:4, name: "Mobile", imageName: "img4.png", price: 885.00, description: 'A  mobile phone is a wireless handheld device that allows users to make and receive calls. While the earliest generation of mobile phones could only make and receive calls, todays mobile phones do a lot more, accommodating web browsers, games, cameras, video players and navigational systems.'},
        {id:5, name: "Camera", imageName: "img5.png", price: 240.00, description: 'camera, in photography, device for recording an image of an object on a light-sensitive surface; it is essentially a light-tight box with an aperture to admit light focused onto a sensitized film or plate.'},
        {id:6, name: "Printer", imageName: "img6.png", price: 350.00, description: 'A printer is a device that accepts text and graphic output from a computer and transfers the information to paper, usually to standard-size, 8.5" by 11" sheets of paper. Printers vary in size, speed, sophistication and cost.'},
        {id:7, name: "Laptop", imageName: "img2.png", price: 400.00, description: 'A laptop computer, sometimes called a notebook computer by manufacturers, is a battery- or AC-powered personal computer generally smaller than a briefcase that can easily be transported and conveniently used in temporary spaces such as on airplanes, in libraries, temporary offices, and at meetings.'},
        {id:8, name: "Head phone", imageName: "img3.png", price: 120.00, description:'Headphones are a pair of small speakers used for listening to sound from a computer, music player or other such electronic device. Headphones originally consisted of one speaker for each ear, connected by a band over the head.'}
    ];
    localStorage.setItem(products, JSON.stringify(products_detail));
}

/** Get all products from the localhost */
const getProducts = () => {
    return localStorage.getItem(products);
}

// const searchProducts = (value) => {
//     const products =  localStorage.getItem(products);
//     alert(products.filter(product => product.name == value));
// }

/** clear all details from the localhost */
const clearSession = () => {
    localStorage.removeItem(sessionName);
    localStorage.removeItem(products);
    localStorage.removeItem(cart_details);
}

const getSession = () => {
    return localStorage.getItem(sessionName);
}

const setCart = () => {
    localStorage.setItem(cart_details, JSON.stringify([]));
}

const getCart = () => {
    return localStorage.getItem(cart_details);
}

const addProductToCart =  (id) => {
    return manageCart(id, ADD);
}

const removeProductFromCart =  (id) => {
    return manageCart(id, REMOVE);
}

const clearProductToCart =  () => {
    const value = manageCart(1, CLEAR);
    if(value) {
        alert(`Thanks for shopping!`);
        window.location.href=`index.html`;
    } else {
        alert(`Something went wrong!`);
    }
}

/** This function is used to ADD, REMOVE, and CLEAR. */
const manageCart = (id, operator) => {
    if (operator == ADD) {
        const cartDetail = JSON.parse(getCart());
//        const data = cartDetail.filter(detail => detail.id == id);
        let isMatch = false;
        console.log(cartDetail);
        for(let i = 0; i < cartDetail.length; i++) {
            if(cartDetail[i].id == id) {
                isMatch = true;
                cartDetail[i].qty++;
                break;
            }
        }
        if(isMatch) {
            localStorage.setItem(cart_details, JSON.stringify(cartDetail));
        } else {
            const product = { id : id, qty: 1};
            cartDetail.push(product);
            
            localStorage.setItem(cart_details, JSON.stringify(cartDetail));
            document.getElementById('total_count').innerText = JSON.parse(getCart()).length;
        }
        return isMatch;
    } else if(operator == REMOVE) {
        const cartDetail = JSON.parse(getCart());
        let isMatch = false;
        for(let i=0; i < cartDetail.length; i++) {
            if(cartDetail[i].id == id) {
                isMatch = true;
                if(cartDetail[i].qty == 1) {
                    cartDetail.splice(i, 1);
                } else {
                    cartDetail[i].qty--;
                }
                break;
            }
        }
        console.log("array ::::: ");
        console.log(cartDetail);
        if(isMatch) {
            localStorage.setItem(cart_details, JSON.stringify(cartDetail));
        }
        return isMatch;
    } else if(operator == CLEAR) {
        localStorage.setItem(cart_details, JSON.stringify([]));
        return true;
    }
}

/** This function is used to get url from query parameter */
const getUrlParameter = (name) => {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " ")).replace(/'/g, '');
}

