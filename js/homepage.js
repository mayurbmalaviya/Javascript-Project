"use strict";
$(document).ready(function() {
    const checkSession = getItem("bewakoof_session");
    if(checkSession == null) {
        window.location.href = "login-registration.html";
    }
    const getSession = JSON.parse(getItem("bewakoof_session"));
    $('#userName').text(getSession[0].name);

    /** this will get all products from the localhost by using our own javascript common library */
    const products = JSON.parse(getItem('products'));
    for(let product of products) {
        const data = `<div class="grid-item">
            <img src="images/${product.imageName}" onclick="window.location.href='product-detail.html?id=${product.id}'" class="pro-img">
            <h4>${product.name}</h4>  
            <strong><span> $${product.price}.00</span></strong>
            <a href='' onclick='addProductToCart(${product.id})'>
                <img src="images/shopping-cart2.png" class="cart-img" />
                <span>Add to cart</span>
            </a>
        </div>`;
        $('#product_section').append(data);
    }

    /** It will assign the length of the products to the cart symbol. */
    document.getElementById('total_count').innerText = JSON.parse(getCart()).length;
});