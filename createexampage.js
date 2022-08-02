// const examNameField = document.getElementById('examNameField');
const questionField = document.getElementById('questionField');
const firstAnswer = document.getElementById('firstAnswerField');
const secondAnswer = document.getElementById('secondAnswerField');
const thirdAnswer = document.getElementById('thirdAnswerField');
const fourthAnswer = document.getElementById('fourthAnswerField');
const publishExamButton = document.getElementById('publish-btn');
const comfirmButton = document.getElementById('comfirmButton');
const questionsTable = document.querySelector('tbody');
const table = document.getElementById("questionsTable");
const navUser = document.getElementById("nav-username");
const examNameField = document.getElementById("examNameField");
const logOutButton = document.querySelector("#logoutButton");
var examData = [];
var questions = []
examNameField.value = localStorage.getItem("examName")


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



comfirmButton.addEventListener('click', addNewQuestion);

function addNewQuestion() {
    //input validation
    if (firstAnswer.value.length == 0 || secondAnswer.value.length == 0 || thirdAnswer.value.length == 0 || fourthAnswer.value.length == 0) {
        alert("Make sure you filled all the blanks")
        return
    }


    // creating new question object 
    var newQuestion = {
        firstAnswer: firstAnswer.value,
        secondAnswer: secondAnswer.value,
        thirdAnswer: thirdAnswer.value,
        fourthAnswer: fourthAnswer.value
    }

    // adding the object to our main object (examData)
    examData.push(newQuestion);
    questions.push(questionField.value);

    // adding new row to questions table
    var newRowData = `
        <tr >
        <th scope="row">${examData.length}</th>
        <td>${questions[questions.length-1]}</td>
        <td align="right">

        <button type="button" class="emptyButton editButton" data-bs-toggle="modal" data-bs-target="#staticBackdrop2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-pencil-square" viewBox="0 0 16 16">
        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z "/>
        <path fill-rule="evenodd " d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z "/>
        </svg>
        </button>

       <button type="button" class="reviewButton emptyButton" data-bs-toggle="modal" data-bs-target="#staticBackdrop3">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-eye" viewBox="0 0 16 16">
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
      </svg>
      </button>


        <svg  xmlns="http://www.w3.org/2000/svg " width="16" height="16" fill="black " class="bi bi-trash-fill " viewBox="0 0 16 16 ">
            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0
            0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z "/>
          </svg>
        <svg  xmlns="http://www.w3.org/2000/svg " width="16" height="16" fill="black " class="bi bi-trash-fill" viewBox="0 0 16 16 ">
            0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z "/>
          </svg>
          </td>
           </tr> 
        
        `;

    questionsTable.innerHTML += newRowData;


    console.log(examData)


    //empty the text field after adding the value to our object
    questionField.value = ""
    firstAnswer.value = ""
    secondAnswer.value = ""
    thirdAnswer.value = ""
    fourthAnswer.value = ""


    // for closing the modal after click on confirm button
    hideFunction()


    //if the questions is more than five then show up the publish button
    if (examData.length >= 5) {
        showPublishButton()
    }



}


function hideFunction() {
    const moda = document.querySelector('#staticBackdrop');
    const modal = bootstrap.Modal.getInstance(moda);
    modal.hide();
}

function showPublishButton() {
    var newButton =
        ` 
<div class="container">
<button onclick="${publishExam()}" type="button" class="btn btn-primary centerButton">
    publish your exam now
</button>
</div>
`
    console.log("Add new button")
    const Button = document.createElement('div');
    Button.innerHTML = newButton;
    const container = document.getElementById("co");
    container.innerHTML += newButton;

}

// for delete or remve table row data
$(document).on('click', '.bi-trash-fill', function() {
    var indexRow = this.parentNode.parentNode.rowIndex;
    console.log(indexRow)
    document.getElementById("questionsTable").deleteRow(indexRow);
    examData.slice(indexRow - 1, 1);
});

// for editting table row data
$(document).on('click', '.editButton', function() {
    var indexRow = (this.parentNode.parentNode.rowIndex);
    indexRow -= 1
    editQuestion(indexRow);
});

// for review table row data
$(document).on('click', '.reviewButton', function() {
    var indexRow = (this.parentNode.parentNode.rowIndex);
    indexRow -= 1
    console.log(examData[indexRow].firstAnswer)
    document.getElementById("qu").innerHTML = questions[indexRow]
    document.getElementById("a1").innerHTML = examData[indexRow].firstAnswer
    document.getElementById("a2").innerHTML = examData[indexRow].secondAnswer
    document.getElementById("a3").innerHTML = examData[indexRow].thirdAnswer
    document.getElementById("a4").innerHTML = examData[indexRow].fourthAnswer


});



function editQuestion(rowIndex) {
    const data = examData[rowIndex]
    const questionField = document.getElementById('questionFieldE');
    const firstAnswer = document.getElementById('firstAnswerFieldE');
    const secondAnswer = document.getElementById('secondAnswerFieldE');
    const thirdAnswer = document.getElementById('thirdAnswerFieldE');
    const fourthAnswer = document.getElementById('fourthAnswerFieldE');
    const comfirmButton = document.getElementById('comfirmButtonE');

    questionField.value = questions[rowIndex]
    firstAnswer.value = data.firstAnswer;
    secondAnswer.value = data.secondAnswer;
    thirdAnswer.value = data.thirdAnswer;
    fourthAnswer.value = data.fourthAnswer;


    comfirmButton.addEventListener('click', function() {
        // upating data
        questions[rowIndex] = questionField.value;
        examData[rowIndex].firstAnswer = firstAnswer.value
        examData[rowIndex].secondAnswer = secondAnswer.value
        examData[rowIndex].thirdAnswer = thirdAnswer.value
        examData[rowIndex].fourthAnswer = fourthAnswer.value
        document.getElementById("questionsTable").rows[1].cells[1].innerHTML = questionField.value;


        //hiding the modal
        const moda = document.querySelector('#staticBackdrop2');
        const modal = bootstrap.Modal.getInstance(moda);
        modal.hide();

        // empty the textFields
        questionField.value = ""
        firstAnswer.value = ""
        secondAnswer.value = ""
        thirdAnswer.value = ""
        fourthAnswer.value = ""

    })

}


function publishExam() {

    var username = localStorage.getItem('username')
    const rootRef = database.ref("exam/" + username)
    if (examNameField.value == null) {
        alert("make sure that you give the exam a name.")
        return
    }
    var examId = Math.floor(Math.random() * 1000000000)
    const exam = {
        examName: examNameField.value,
        examId: examId,
        question: questions,
        answers: examData
    }
    rootRef.child(examId).set(exam)


    localStorage.removeItem("examName")
    window.location.href = 'userPage'


}