// Store
const STORE = {
    currentQ: -1,
    correctAns: 0,
    isSubmit: false,
    ansIsCorrect: false,
    questions: [
        {
            declaration: "<p>20 % of 2 is equal to:</p>",
            options: ["20", "4", "0.4", "0.04", "40"],
            answer: 2,
        },
        {
            declaration:
                "<p>If Logx (1 / 8) = - 3 / 2, then x is equal to:</p>",
            options: ["-4", "4", "1 / 4", "10"],
            answer: 2,
        },
        {
            declaration:
                "<p>The probability that an electronic device produced by a company does not function properly is equal to 0.1. If 10 devices are bought, then the probability, to the nearest thousandth, that 7 devices function properly is:</p>",
            options: ["0.057", "0.478", "0.001", "0", "0.01"],
            answer: 1,
        },
        {
            declaration: "<p>The period of 2 sin x cos x is :</p>",
            options: ["4 π 2", "2 π", "4 π", "π"],
            answer: 2,
        },
        {
            declaration: `
                <img src="images/problem-5-equation.png" alt="problem 5 equation">
                <p>The equation above shows how temperature F, measured in degrees Fahrenheit, relates to a temperature C, measured in degrees Celsius. Based on the equation, which of the following must be true?</p>
                <ul>
                    <li>A temperature increase of 1 degree Fahrenheit is equivalent to a temperature increase of 5/9 degree Celsius.</li>
                    <li>A temperature increase of 1 degree Celsius is equivalent to a temperature increase of 1.8 degrees Fahrenheit.</li>
                    <li> temperature increase of 5/9 degree Fahrenheit is equivalent to a temperature increase of 1 degree Celsius.</li>
                </ul>`,
            options: ["I only", "II only", "III only", "I and II only"],
            answer: 3,
        },
    ],
};

// Render question(q)
// qu = store.question[1]
// if no qu return end of quiz.
// else render the the q.
//determine the quiz cotent
// q
// possble answers
//return the quiz cotent

function quizResult() {
    return `
            <section id="finish">
                <div class="final-result container">
                    <h2>Final Result</h2>
                    <p>You scored <span>${STORE.correctAns}</span> correct out of ${STORE.questions.length} questions</p>
                    <div class="button-box">
                        <button class="js-start-quiz" type="button">Start a New Quiz</button>
                    </div>
                </div>
            </section>`;
}

function getGetQuestionOptions(options) {
    let response = "";
    options.forEach((element, i) => {
        response = response.concat(`
             <input type="radio" name="answer" id="opt${i}" value="${i}" required>
             <label for="opt${i}">${element}</label><br/>`);
    });
    return response;
}

function nextQuestion() {
    let html = "",
        disabled = "",
        result = "",
        resultText = STORE.ansIsCorrect
            ? "Congratulations, that is the correct answer!"
            : "Sorry, your answer is incorrect";
    const qNum = STORE.currentQ + 1,
        totalQ = STORE.questions.length,
        question = STORE.questions[STORE.currentQ];

    if (STORE.isSubmit) {
        disabled = "disabled";
        result = `
            <div class="result">
                <h3>Result</h3>
                <p>${resultText}</p>
                <div class="button-box">
                    <button class="js-next-question" type="button">Next Question</button>
                    <h4>Your current score is <span>${STORE.correctAns}</span> correct out of <span>${totalQ}</span></h4>
                </div>
            </div>`;
    }

    if (question) {
        const options = getGetQuestionOptions(question.options);
        html = `
            <section id="question">
                <div class="container">
                    <h2>Problem ${qNum} of ${totalQ}</h2>
                    <div class="problem-desc">
                        ${question.declaration}
                    </div>
                    <form action="#">
                        <fieldset>
                        ${options}
                        </fieldset>
                        
                        <div class="button-box">
                            <button class="js-submit-answer" type="submit" ${disabled}>Submit Answer</button>
                        </div>
                        
                    </form>
                    ${result}
                </div>
            </section>`;
    } else {
        html = quizResult();
    }
    return html;
}

function render() {
    let html;
    if (STORE.currentQ < 0) {
        html = `<section id="splash">
                    <div class="splash container">
                        <!-- The starting screen should have a button that users can click to start the quiz. -->
                        <img class="hero" src="images/stern-teacher.jpg" alt="stern math teacher">
                        <p>How are your math skills these days?  Take this 5 question quiz to find out.</p>
                        <button class="js-start-quiz" type="button">Take the Quiz</button>
                    </div>
                </section>`;
    } else {
        html = nextQuestion();
    }
    $(".wrapper").html(html);
}

// if html is EOQ,
// return EOQ content
//else html += answer corrected section if applicable
// append html to element and return
// set element html = home content.

// Click button to start the quiz.
function startQuiz() {
    STORE.correctAns = 0;
    STORE.currentQ = 0;
    render();
}

function handleStartQuiz() {
    $(".js-start-quiz").click(function (event) {
        startQuiz();
    });

    $("#js-content-wrapper").on("click", ".js-start-quiz", function (event) {
        startQuiz();
    });
}

function checkAnswer() {
    const correctAnswer = STORE.questions[STORE.currentQ].answer;
    const userAnswer = $(":checked").val();
    return correctAnswer == userAnswer;
}

// Submit Question Answer
function handleSubmitAnswer() {
    $("#js-content-wrapper").on("submit", "form", function (event) {
        event.preventDefault();
        STORE.isSubmit = true;
        if (checkAnswer()) {
            STORE.correctAns++;
            STORE.ansIsCorrect = true;
        }
        // Append Result to html
        render();
    });
}

// Get Next Question
function handleNextQuestion() {
    $("#js-content-wrapper").on("click", ".js-next-question", function (event) {
        STORE.currentQ++;
        STORE.isSubmit = false;
        STORE.ansIsCorrect = false;
        render();
    });
}

// Users should also be able to see which question they're on (for instance, "7 out of 10") and their current score ("5 correct, 2 incorrect").
// Upon submitting an answer, users should:
// receive textual feedback about their answer.If they were incorrect, they should be told the correct answer.
// be moved onto the next question(or interact with an element to move on).
// Users should be shown their overall score at the end of the quiz.In other words, how many questions they got right out of the total questions asked.
// Users should be able to start a new quiz.

function handleQuizApp() {
    handleStartQuiz();
    handleNextQuestion();
    handleSubmitAnswer();
    render();
}

$(handleQuizApp());
