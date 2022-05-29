"use strict";
$(document).ready(function() {
    const checkSession = getItem("bewakoof_session");
    if(checkSession != null) {
        window.location.href = "index.html";
        return;
    }
    const userName = getUrlParameter('name');  
    $('#userName').text(userName);
});

/** This function will used while do login */
const login = () => {
    const email = document.getElementById('login_email').value;
    const password = document.getElementById('login_password').value;

    /** This variable is used to check the error is occured or not. */
    let isError = false;
    /** Error handling for email of login */
    if(email == "") {
        isError = true;
        document.getElementById('error_login_email').innerText = "Enter the email";
        document.getElementById('error_login_email').style.display = "inline";
     } else {
         document.getElementById('error_login_email').innerText = "*";
         document.getElementById('error_login_email').style.display = "none";
     }

     /** Error handling for password of login */
    if(password == "") {
        isError = true;
        document.getElementById('error_login_password').innerText = "Enter the password";
        document.getElementById('error_login_password').style.display = "inline";
    } else {
        document.getElementById('error_login_password').innerText = "*";
        document.getElementById('error_login_password').style.display = "none";
    }

    /** It won't allow to do any action if there are any error. */
    if(isError) { 
        return;
    }

    /** This will fetch the user details from the localhost */
    const user_detail = localStorage.getItem('user_detail');
    /** This will check either user is registered or not. */
    if(user_detail == null) {
        isError = true;
        document.getElementById('error_login_email').innerText = "User must register first.";
        document.getElementById('error_login_email').style.display = "inline";
    } else {
        const users = JSON.parse(getItem('user_detail'));
        const user = users.filter(user => user.email == email && user.password == password);

        if(user.length) {
            /** if user is belong to the system, set the session data using our library function */
            setItem("bewakoof_session", JSON.stringify(user));
            setProducts();
            setCart();
            //this will redirect to the home page successfully.
            window.location.href=`index.html`;
        } else {
            document.getElementById('error_login_email').innerText = "Please enter valid email";
            document.getElementById('error_login_password').innerText = "Please enter valid password";
            document.getElementById('error_login_email').style.display = "inline";
            document.getElementById('error_login_password').style.display = "inline";
        }
    }
}

/** This function is used to do registration */
const registration = () => {
    const userName = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    /** This variable will used to check error handling */
    let isError = false;

    /** It will check user is empty or not */
    if(userName == "") {
        isError = true;
       document.getElementById('error_username').innerText = "Enter the username";
       document.getElementById('error_username').style.display = "inline";
    } else {
        document.getElementById('error_username').innerText = "*";
        document.getElementById('error_username').style.display = "none";
    }

    /** It will check email is empty or not */
    if(email == "") {
        isError = true;
        document.getElementById('error_email').innerText = "Enter the email";
        document.getElementById('error_email').style.display = "inline";
     } else {
        document.getElementById('error_email').innerText = "*";
         document.getElementById('error_email').style.display = "none";
     }

    /** It will check password is empty or not */
    if(password == "") {
        isError = true;
        document.getElementById('error_password').innerText = "Enter the password";
        document.getElementById('error_password').style.display = "inline";
    } else {
        document.getElementById('error_password').innerText = "*";
         document.getElementById('error_password').style.display = "none";
    }

    /** It will check the error is occured or not. */
    if(isError) {
        return;
    }

    /** It will fetch the users detail */
    const user_detail = localStorage.getItem('user_detail');

    /** It will check if user is already registered or not. If not then do register. */
    if(user_detail == null) {
        const user = [{id: 1, name: userName, email: email, password: password}];
        setItem("user_detail", JSON.stringify(user));
        alert('User is registered successfully.');
    } else {
        const users = JSON.parse(getItem('user_detail'));
        console.log(users);
        const user = users.filter(user => user.email == email);

        if(user.length) {
            document.getElementById('error_email').innerText = "Enter the unique email";
            document.getElementById('error_email').style.display = "inline";
            return;
        } else {
            users.push({id: users.length+1, name: userName, email: email, password: password});
            setItem("user_detail", JSON.stringify(users));
            alert("User is registered successfully.");
        }
    }
}