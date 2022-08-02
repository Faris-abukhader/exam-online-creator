const result = document.getElementsByClassName("result");
const submitButton = document.getElementById("submit");
const shareUrlField = document.getElementById("shareUrlField");
const examQuestions = []
const answers = []
const correctAnswer = []
var examName = ""
let hasDoneThisExam = false;
var test = "test 1"



function shuffleArray() {
    var array = [0, 1, 2, 3]
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}


function getCurrentDate() {
    const currentData = new Date()
    var year = currentData.getFullYear()
    var month = currentData.getMonth()
    var day = currentData.getDay()
    var hour = currentData.getHours()
    var minute = currentData.getMinutes()
    var second = currentData.getSeconds()
    month = month < 10 ? '0' + month : month
    day = day < 10 ? '0' + day : day
    hour = hour < 10 ? '0' + hour : hour
    minute = minute < 10 ? '0' + minute : minute
    second = second < 10 ? '0' + second : second
    console.log(year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second)
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
}


function getExamId() {
    const parameter = new URLSearchParams(window.location.search);
    return parameter.get("id")
}


function getExamName() {
    const parameter = new URLSearchParams(window.location.search);
    console.log(parameter.get("examName"))
    return parameter.get("examName")
}

getExamId()
getExamName()


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
const database = firebase.database();


//getting current IP
var currentIP = document.getElementById('IPText').innerHTML.split('.').join('')


//checking if this user has already has taken this exam
database.ref('result/' + getExamId()).once('value', function(snapshot) {
    var results = snapshot.val();
    if (results != null) {
        console.log(results.userIP, currentIP)
        for (d in results) {
            if (results[d].userIP == currentIP) {
                hasDoneThisExam = true
                test = "test 2"
                console.log("exam has already done before")
                localStorage.setItem('hasDoneThisExam', true);
                showIfExamHasDone(results[d].mark)
                return;
            }
        }

        var resultsKey = Object.keys(results);
        for (var i = 0; i < results.length; i++) {
            var k = resultsKey[i];
            var ip = results[k].userIP

        }

        for (item in results) {
            var i = String(item)
            var ip = document.getElementById('IPText').innerHTML.split('.').join('')
            if (item == document.getElementById('IPText').innerHTML.split('.').join('')) {

                hasDoneThisExam = true
                console.log("exam dodne")
            }
        }
        showExamFunction();
    } else {
        showExamFunction();
    }
})

var testBool = localStorage.getItem('hasDoneThisExam')

function showIfExamHasDone(mark) {
    var laodingView = document.getElementById('loading');
    laodingView.parentNode.removeChild(laodingView)

    var doneExam =
        `
    <div class='center'>
    <img src='images/Checklist.jpg' class='center' style='width:250px'>
    <div> You already have Done this exam
    </div>
    <div>your mark is ${mark}</div>
    </div>

    `
    var container = document.createElement('div')
    container.innerHTML = doneExam
    document.body.appendChild(container)

}

function showExamFunction() {

    var usernmae = localStorage.getItem("username")
    database.ref('exam/' + usernmae + '/' + getExamId() + '/').once('value', function(snapshot) {
        var questions = snapshot.val().question
        for (var i = 0; i < questions.length; i++) {
            examQuestions.push(questions[i])
        }
        var answer = snapshot.val().answers
        var answersKey = Object.keys(answer);
        for (var i = 0; i < answersKey.length; i++) {
            var k = answersKey[i];
            var firstAnswer = answer[k].firstAnswer
            var secondAnswer = answer[k].secondAnswer
            var thirdAnswer = answer[k].thirdAnswer
            var fourthAnswer = answer[k].fourthAnswer
            answers.push([firstAnswer, secondAnswer, thirdAnswer, fourthAnswer])
            correctAnswer.push(firstAnswer)
        }
        examQuestions.push(questions)

        snapshot.forEach(
            function(CurrentRecord) {
                var exam = CurrentRecord.val();
                console.log(exam)
                console.log(exam[0])

            }
        )
    }).then((result) => {
        showExam()
    }).catch((err) => {
        console.log(err)
    });

    function showExam() {
        for (var i = 0; i < examQuestions.length - 1; i++) {
            var random = shuffleArray()
            var oneQuestionMark = Math.ceil(100 / (examQuestions.length - 1))
            var newQuestion =
                `
            <div class="myContainer">
            <div class="myQuestionContainer">
            <div class='right'>${oneQuestionMark} marks</div>
            <div>${i+1} .${examQuestions[i]} </div>
            </div>
            <div class="myAnswersContainer">
            <div class="myAnswer secondAnswer" id='0'>
            <span>A.</span> <span class='spanAnswer'>${answers[i][random[0]]}</span>
            </div>
            <div class="myAnswer secondAnswer" id='1'>
            <span>B.</span> <span class='spanAnswer'>${answers[i][random[1]]}</span>
            </div>
            <div class="myAnswer thirdAnswer" id='2'>
            <span>C.</span> <span class='spanAnswer'>${answers[i][random[2]]}</span>
            </div>
            <div class="myAnswer fourthAnswer" id='3'>
            <span>D.</span> <span class='spanAnswer'>${answers[i][random[3]]}</span>
            </div>
            </div>
            <div class="myCheckBar">
            <div class='checkBoxContainer'>
            <label class="form-check-label" for="exampleRadio${i+1}">A.</label>
            <input type="radio" name="exampleRadio${i+1}" id="exampleRadio${i+1}" value="${answers[i][random[0]]}" onclick="getResult(this)">
            </div>
            <div class='checkBoxContainer'>
            <label class="form-check-label" for="exampleRadio${i+1}">B.</label>
            <input type="radio" name="exampleRadio${i+1}" id="exampleRadio${i+1}" value="${answers[i][random[1]]}" onclick="getResult(this)">
            </div>
            <div class='checkBoxContainer'>
            <label class="form-check-label" for="exampleRadio${i+1}">C.</label>
            <input type="radio" name="exampleRadio${i+1}" id="exampleRadio${i+1}" value="${answers[i][random[2]]}" onclick="getResult(this)">
            </div>
            <div class='checkBoxContainer'>
            <label class="form-check-label" for="exampleRadio${i+1}${i+1}">D.</label>
            <input type="radio" name="exampleRadio${i+1}" id="exampleRadio" value="${answers[i][random[3]]}" onclick="getResult(this)">
            </div>
            </div>
            </div>
                `
            var container = document.getElementById("qeustionsContainer")
            container.innerHTML += newQuestion
        }

        // removing laoding View after we got the data
        console.log(correctAnswer)
        var laodingView = document.getElementById('loading');
        laodingView.parentNode.removeChild(laodingView)

        // dislaying submit button
        showButton()


    }

    function showButton() {
        const submit = document.getElementById("submitButtonContainer")
        submit.classList.add("cont1")
    }


    submitButton.addEventListener('click', submitExam)

    function submitExam() {
        // getting the result
        var result = []
        for (var i = 1; i < examQuestions.length + 1; i++) {

            // checking if all the question was answered
            if ($('input:radio[name="exampleRadio' + i + '"]:checked').val() == undefined) {
                continue
            }

            // adding the user result 
            result.push($('input:radio[name="exampleRadio' + i + '"]:checked').val());
        }


        if (result.length != examQuestions.length - 1) {
            alert("make sure that you answered all the questions")
            console.log(result.length, examQuestions.length)
            return
        }
        for (var i = 0; i < result.length; i++) {
            console.log(result[i])
        }



        // find the mark 
        var marks = 0
        for (var i = 0; i < examQuestions.length - 1; i++) {
            if (correctAnswer[i] == result[i]) {
                marks += 1
            }
            continue
        }
        marks = Math.ceil((marks / examQuestions.length) * 100)

        var userIP = document.getElementById('IPText').innerHTML
        userIP = userIP.split('.').join('');

        var finalResult = {
            answers: result,
            mark: marks,
            userIP: userIP,
            date: getCurrentDate()
        }

        const rootRef = database.ref("result/" + getExamId() + '/')
        rootRef.child(userIP).set(finalResult)

        window.location.reload(true)

    }
}

function getResult(e) {
    var checkedValue = $(e).val()
    var answers = $(e).closest('.myContainer').find('.spanAnswer')
    var answersContainer = $(e).closest('.myContainer').find('.myAnswer')
    for (var i = 0; i < 4; i++) {
        answersContainer[i].classList.remove("checked")
        if (answers[i].innerHTML == checkedValue) {
            answersContainer[i].classList.add("checked")
        }
    }
}