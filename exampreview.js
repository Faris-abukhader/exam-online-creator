const result = document.getElementsByClassName("result");
const submitButton = document.getElementById("submit");
const shareUrlField = document.getElementById("shareUrlField");
const copyUrlButton = document.getElementById("copyUrlButton");
const logOutButton = document.querySelector("#logoutButton");
const examQuestions = []
const answers = []
const correctAnswer = []
var examName = ""
var hasDoneThisExam = false;


var firstVar = '"The replace() method searches a string for a specified value, or a regular expression, and returns a new string where the specified values are replaced. Note: If you are replacing a value (and not a regular expression), only the first instance of the value will be replaced. To replace all occurrences of a specified value, use the global (g) modifier (see "More Examples" below). Read more about regular expressions in our RegExp Tutorial and our RegExp Object Reference. replace() does not change the original string."'
var secondVar = '"The replace() method searches a string for a specified value, or a regular expression, and returns a new string where the specified values are replaced. Note: If you are replacing a value (and not a regular expression), only the first instance of the value will be replaced. To replace all occurrences of a specified value, use the global (g) modifier (see "More Examples" below). Read more about regular expressions in our RegExp Tutorial and our RegExp Object Reference. replace() does not change the original string"'

if (firstVar == secondVar) {
    console.log("There are same")
} else {
    console.log("There are not same")
}



logOutButton.addEventListener("click", logOut)

function logOut() {
    localStorage.removeItem("username")
    window.location.href = 'index.html'
}



function shuffleArray() {
    var array = [0, 1, 2, 3]
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    console.log(array)
    return array
}


onload = function() {
    if (localStorage.getItem('username') == null) {
        window.location.href = 'index.html'
    } else {
        document.querySelector(".username").innerHTML += " , " + localStorage.getItem("username")
    }
}



function getExamId() {
    const parameter = new URLSearchParams(window.location.search);
    console.log(parameter.get("id"))
    return parameter.get("id")
}


function getExamName() {
    const parameter = new URLSearchParams(window.location.search);
    console.log(parameter.get("examName"))
    return parameter.get("examName")
}



function setUrl() {
    var currentUrl = window.location.href
    var takeExamUrl = currentUrl.replace('examPreview', 'ExamPage')
    shareUrlField.value = takeExamUrl
}


setUrl()
getExamId()
getExamName()



copyUrlButton.addEventListener('click', function() {

    console.log("hello world")
        // copying the url to clipboard . . . 

})

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



showExamFunction();


function showExamFunction() {
    var username = localStorage.getItem("username")
    database.ref('exam/' + username + '/' + getExamId() + '/').once('value', function(snapshot) {
        console.log(snapshot.val())
        examName = snapshot.val().examName
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
            console.log(random)
            console.log(random[0])
            console.log(answers[i][random[0]])
            console.log(answers[i][random[0]])
            var newTestQuestion =
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
            container.innerHTML += newTestQuestion
        }

        // removing laoding View after we got the data
        var laodingView = document.getElementById('loading');
        laodingView.parentNode.removeChild(laodingView)
    }
}


document.getElementById("showUpModel").addEventListener('click', getStatic())

function getStatic() {
    database.ref('result/' + getExamId()).once('value', function(snapshot) {
        const examMarkList = document.getElementById('examMarkList')
        var data = snapshot.val();
        if (data != null) {
            var dataKeys = Object.keys(data);
            console.log(dataKeys.length)
            console.log(data)
            for (d in data) {
                var newItem =
                    `
                <div class="row">
                <div class="col" style='font-size:10px'>
                date : ${data[d].date}
                </div>
                <div class="col" style='font-size:10px'>
                mark: ${data[d].mark}
                </div>
                </div>
               `
                examMarkList.innerHTML += newItem
            }


            var moreInfo = document.getElementsByClassName('examInfo')
            moreInfo.innerHTML =
                `
                total people have taken the exam ${dataKeys.length}
                `
        } else {
            var noDataAlert =
                `
            <div class='center'>
            <i class="bi bi-exclamation-triangle" style='font-size:80px;color:red'></i>
            <h2>No data was founded</h2>
            <h6>share your exam and get people result.</h6>
            </div>
            `
            examMarkList.innerHTML += noDataAlert
        }
    })
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