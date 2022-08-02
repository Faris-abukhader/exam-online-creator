const bodyContainer = document.querySelector('body');
const questionField = document.getElementById('questionField');
const firstAnswer = document.getElementById('firstAnswerField');
const secondAnswer = document.getElementById('secondAnswerField');
const thirdAnswer = document.getElementById('thirdAnswerField');
const fourthAnswer = document.getElementById('fourthAnswerField');
const publishExamButton = document.getElementById('publish-btn');
const logOutButton = document.querySelector("#logoutButton")
var questionStructe = {
    "firstAnswer": "",
    "secondAnswer": "",
    "thirdAnswer": "",
    "fourthAnswer": ""
};
var examData = [];
var questions = []


logOutButton.addEventListener("click", logOut)

function logOut() {
    localStorage.removeItem("username")
    window.location.href = 'index.html'
}


onload = function() {
    if (localStorage.getItem('username') == null) {
        window.location.href = 'index.html'
    } else {
        document.querySelector(".username").innerHTML += " , " + localStorage.getItem("username")
    }
}


function showWelcomingToast() {
    var toastLiveExample = document.getElementById('liveToast')
    var toast = new bootstrap.Toast(toastLiveExample)
    document.getElementById('usernameSpan').innerHTML = localStorage.getItem("username")
    toast.show()

    setTimeout(() => {
        toastLiveExample.remove()
    }, 2000);
}
showWelcomingToast()


var firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();



function checkDataConnection() {
    if (!window.navigator.online) {
        var alertInternet =
            `
        <div class='internetConnectionAlert'>
        <div class="alert alert-danger d-flex align-items-center" role="alert">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
        </svg>
        <div>
        check your internet connection.
        </div>
        <button id='closeAlertButton'type="button" class="btn-close alertCloseButton" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        </div>
        `
        bodyContainer.innerHTML += alertInternet
        bodyContainer.style.cssText = 'margin-top:55px'
            // document.querySelector("body").innerHTML += alertInternet
            // document.querySelector("body").style.cssText = 'margin-top:55px'
        document.querySelector('#closeAlertButton').addEventListener('click', afterCloseInternetAlert)
    }

    var connectedRef = firebase.database().ref(".info/connected");
    connectedRef.on("value", function(snap) {
        if (snap.val() != null) {} else {
            alert("check Your Enternet Connection");
            var alertInternet = document.createElement('div')
            alert.innerHTML =
                `
            <div class='internetConnectionAlert'>
            <div class="alert alert-danger d-flex align-items-center" role="alert">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg>
            <div>
            check your enternet connection.
            </div>
            <button type="button" class="btn-close alertCloseButton" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            </div>
            `
        }
    })
}
setTimeout(() => {
    console.log("again")
    checkDataConnection()
}, 5000);


function afterCloseInternetAlert() {
    document.querySelector("body").style.cssText = 'margin-top:0px'
}


function fetchData() {
    var loadingView =
        `
    <div class='loadingView'>
    <lottie-player src="https://assets10.lottiefiles.com/packages/lf20_WLDTXp.json" background="transparent" speed="1" style="width: 150px; height: 150px;" loop autoplay></lottie-player>
    </div>
    `
    var loadingContainer = document.createElement("div");
    loadingContainer.innerHTML = loadingView;

    document.querySelector("body").appendChild(loadingContainer)
    const username = localStorage.getItem("username");
    database.ref('exam/' + username).on('value', (snapshot) => {
        const data = snapshot.val();
        const list = document.getElementById("examList");
        if (data != null) {
            loadingContainer.remove(loadingContainer)
            for (d in data) {
                console.log(d)
                var item =
                    `
                <div class="card" style="width: 12rem;" id="exam-card">
                <div class="card-body" id="btn-new">
                <h5 class="card-title">${data[d].examName}</h5>
                <a href="examPreview.html?id=${data[d].examId}&examName=${data[d].examName}" target="_blank" class="btn btn-dark" id="new-btn" style="width:100px;font-size:10px;">more info</a>
                </div>
                </div>
                `
                list.innerHTML = item + list.innerHTML
            }
        } else {
            loadingContainer.remove(loadingContainer)
        }
    });
}
fetchData()