"use strict";
$(document).ready(function() {
    const checkSession = getItem("bewakoof_session");
    if(checkSession == null) {
        window.location.href = "login-registration.html";
    }
    const getSession = JSON.parse(getItem("bewakoof_session"));

    const cart_details = JSON.parse(getCart());
    let total_amount = 0;
    for(let cart_detail of cart_details) {
        const products = JSON.parse(getProducts());
        const filterProduct = products.filter(product => product.id == cart_detail.id);
        const data = `<div class="grid-container2">
                        <div class="grid-item2">
                            <img src="images/${filterProduct[0].imageName}" class="p-img"/> 
                        </div>
                        <div class="grid-item2"> 
                            <h4>${filterProduct[0].name}</h4> 
                        </div>
                        <div class="grid-item2">
                            <div class="number">
                                <a href=""><span class="minus" onclick="removeProductFromCart(${filterProduct[0].id})">-</span></a>
                                <input type="text" value="${cart_detail.qty}"/>
                                <a href=""><span class="plus" onclick="addProductToCart(${filterProduct[0].id})">+</span></a>
                            </div>
                        </div>
                        <div class="grid-item2"> 
                            <strong><span> $${filterProduct[0].price}</span></strong> 
                        </div>
                        <div class="grid-item2">
                            <a href="" onclick=''><img src="images/delete.png" onclick="removeProductFromCart(${cart_detail.id})" class="delete-img"/></a>
                        </div>
                    </div>`;
        $('#gridContainer').append(data);
        total_amount = total_amount + ((cart_detail.qty) * filterProduct[0].price);
    }
    document.getElementById('total_amount').innerText = `$${total_amount}`;
});