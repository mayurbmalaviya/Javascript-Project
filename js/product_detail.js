"use strict";
$(document).ready(function() {
    /** It will check the session first. If it's not logged in then it won't allow to use home page. */
    const checkSession = getItem("bewakoof_session");
    if(checkSession == null) {
        window.location.href = "login-registration.html";
    }
    /** It will fetch session detail */
    const getSession = JSON.parse(getItem("bewakoof_session"));
    
    /** It will get id from query parameter using our common javascript library. */
    const value = getUrlParameter('id');
    /** It will get product detail from local storage */
    const products = JSON.parse(getItem('products'));

    /** It will filter id from the products and fetch specific products */
    const [product] = products.filter(product => product.id == value);

    /** Create the dynamic content for specific product */
    const data = `<div class="pro-d-grid">  
                    <div class="pro-d-item"> 
                        <div class="pro-d-img">
                            <img src="images/${product.imageName}"/>
                        </div>
                        <div class="pro-d-text">
                            <h4>${product.name}</h4>
                            <h3><strong> $${product.price}</strong></h3>

                            <p>${product.description}</p>
                            <a href="cart.html" onclick="addProductToCart(${product.id})">Check out</a>
                        </div>
                    </div>
                </div>`;
        $('#product_description').append(data);
    

    /** It will assign the total product which are in cart and show it to header of the product detail page. */
    document.getElementById('total_count').innerText = JSON.parse(getCart()).length;

});



