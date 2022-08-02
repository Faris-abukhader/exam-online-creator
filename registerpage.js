// for animation start //
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});
sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});
// for animation end //



var firebaseConfig = {
    apiKey: "AIzaSyChALbrjjrhF5YInX6RKdumg2iQbT-K7YU",
    authDomain: "onlineexamcreator.firebaseapp.com",
    projectId: "onlineexamcreator",
    storageBucket: "onlineexamcreator.appspot.com",
    messagingSenderId: "1033187612539",
    appId: "1:1033187612539:web:6a19fca823779ccffc4fde"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();


// signUp elements
const signUpButton = document.getElementById('signUpBtn');
const signUpusername = document.getElementById('signUp-Username');
const signUpemail = document.getElementById('signUp-Email');
const signUppassword = document.getElementById('signUp-Password');


// signIn elementss
const signInButton = document.getElementById('loginBtn');
const signInUsername = document.getElementById('signIn-Username');
const signInpassword = document.getElementById('signIn-Password');
const id = 123456789;


// adding event for  signIn signUp buttons
signUpButton.addEventListener('click', signUp);
signInButton.addEventListener('click', signIn);

const usernameForUI = "";
const usernameBox = document.getElementById("usernameBox");

function signUp() {

    console.log(signUpemail);
    // to check all the input valiation
    if (!emailValidation(signUpemail.value)) {
        alert("Please enter valid email.");
        return;
    }
    if (!usernameValidation(signUpusername.value)) {
        alert("Username length should be at least 8 character.");
        return;
    }
    if (!passwordValidation(signUppassword.value)) {
        alert("Password length should be at least 8 character.");
        return;
    }

    auth.createUserWithEmailAndPassword(signUpemail.value, signUppassword.value)
        .then(function() {

            var user = auth.currentUser;
            var user_data = {
                email: signUpemail.value,
                username: signUpusername.value,
                password: signUppassword.value
            }
            database.ref('users/' + signUpusername.value).set(user_data);

            console.log("new user created")
            console.log(user_data)

        })
        .catch(function(error) {
            var error_code = error.code;
            var error_message = error.message;
            alert(error_message);
        })




}

function emailValidation(email) {
    const expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
        return true;
    }
    return false;
}

function passwordValidation(password) {
    if (password.length < 6) {
        return false
    }
    return true;
}

function usernameValidation(username) {
    if (username.length < 8) {
        return false;
    }
    return true;
}




console.log(loadingContainer)



function signIn() {




    // input validation
    if (signInUsername.value.length == 0 || signInpassword.value.length == 0) {
        alert("password or username isn't correct")

    }



    const loadingContainer = document.querySelector("#loadingContainer");
    var loadingView =
        `
<div class='loadingAnimation'style='position: absolute;bottom:19px;left:5px;z-index:3'>
<lottie-player src="https://assets7.lottiefiles.com/packages/lf20_0zkokwjx.json" background="transparent" speed="2" style="width: 30px; height: 30px;" loop autoplay></lottie-player>
</div>

`
    var loadingViewContainer = document.createElement("div");
    loadingViewContainer.innerHTML = loadingView
    loadingContainer.appendChild(loadingViewContainer)





    console.log("hi")
    database.ref('users/' + signInUsername.value).on('value', (snapsot) => {
        const data = snapsot.val();
        if (data != null) {
            loadingViewContainer.remove()
            console.log(data)

            if (data.password == signInpassword.value) {
                localStorage.setItem("username", signInUsername.value)
                window.location.href = 'userPage.html'
                return;

            } else {
                alert("password or username isn't correct")

            }

        } else {
            loadingViewContainer.remove()

            alert("password or username isn't correct")
        }
    })
    return false;

}