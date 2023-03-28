//#region DATA
let userElementChoice = null;

const quiz = [
    {
        question: 'What\'s your favorite element?',
        options: [
            'Normal',
            'Fire',
            'Water',
            'Grass',
            'Flying',
            'Fighting',
            'Poison',
            'Electric',
            'Ground',
            'Rock',
            'Psychic',
            'Ice',
            'Bug',
            'Ghost',
            'Steel',
            'Dragon',
            'Dark',
            'Fairy'
        ]
    }
];

const buttonColors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark'];
//#endregion

//#region QUIZ
const renderQuizOption = (options, container) => {
    options.map((option) => {
        const optEl = document.createElement('button');
        optEl.textContent = option;
        optEl.value = option;

        const color = buttonColors[Math.floor(Math.random() * buttonColors.length)];
        optEl.className = `btn btn-md btn-outline-${color} m-1`;

        optEl.addEventListener('click', (e) => {
            const userAnswer = e.target.value;
            userElementChoice = userAnswer;
        });

        container.appendChild(optEl);
    });
}

const renderQuiz = () => {
    const container = document.getElementById('quizContainer');

    if (userElementChoice) {
        return renderResetQuiz();
    }

    quiz.map((question) => {
        const questionEl = document.createElement('h2');
        questionEl.textContent = question.question;
        questionEl.className = 'quiz-question';
        container.appendChild(questionEl);

        renderQuizOption(question.options, container);
    });

}
//#endregion

const render = () => {
    renderQuiz();
}

render();