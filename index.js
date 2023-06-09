//#region DATA
const pokeAPI = 'https://pokeapi.co/api/v2';
let selectedType = '';
let selectedMove = '';
let selectedPokemonName = '';
let typePokemon = [];
let movePokemon = [];
let selectedPokemon = null;

const quizQuestionA = 'What\'s your favorite type?';
const quizQuestionAOptions = [
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
];

const quizQuestionB = 'What\'s one of your favorite moves?';

const buttonColors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark'];
//#endregion

//#region POKEMON
const getPokemonByType = () => {
    fetch(`${pokeAPI}/type/${selectedType}`)
        .then(res => res.json())
        .then((response) => {
            typePokemon = response.pokemon.map(x => x.pokemon);
            const moveOptions = response.moves.map((moves) => moves.name);
            removeCurrentQuestion();
            renderQuiz(quizQuestionB, moveOptions, selectMove);
        })
}

const getPokemonByMove = () => {
    fetch(`${pokeAPI}/move/${selectedMove}`)
        .then(res => res.json())
        .then((response) => {
            movePokemon = response.learned_by_pokemon;
            pickPokemon();
        })
}

const getPokemonByName = () => {
    fetch(`${pokeAPI}/pokemon/${selectedPokemonName}`)
        .then(res => res.json())
        .then((response) => {
            selectedPokemon = response;
            renderPokemon();
            console.log({ response })
        })
}

const pickPokemon = () => {
    const typePokemonNames = typePokemon.map(tp => tp.name);
    const movePokemonNames = movePokemon.map(mp => mp.name);

    const matchingPokemon = typePokemonNames.filter(p => movePokemonNames.includes(p));
    const pokemon = selectRandom(matchingPokemon);
    selectedPokemonName = pokemon;
    getPokemonByName();
}

const renderPokemon = () => {
    const quizContainer = document.getElementById('quizContainer');
    quizContainer.remove();

    const container = document.getElementById('pokemonContainer');

    const newQuizContainer = document.createElement('div');
    newQuizContainer.id = 'quizContainer';
    container.insertAdjacentElement('beforebegin', newQuizContainer);


    const { id, name, sprites, height, weight, stats, types } = selectedPokemon;
    const typeLis = types.map(t => `<li>${t.type.name}</li>`).join('');
    const typesLabel = types.length === 1 ? 'Type' : 'Types';

    const pokemonMarkup = `
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-xs-12">
                <div class="pokemon">
                    <h2>${name.toUpperCase()}</h2>
                    <img class="img-fluid" src="${sprites.front_default}" />
                </div>
            </div>
            <div class="col-md-4 col-xs-12">
                <div class="poke-metadata">
                    <ul>
                        <li>
                            Index: ${id}
                        </li>
                        <li>
                            Height: ${height}
                        </li>
                        <li>
                            Weight: ${weight}
                        </li>
                        <li>
                            ${typesLabel}:
                                <ul> 
                                    ${typeLis}
                                </ul>
                        </li>
                        </li>
                        <li>
                            Stats:
                                <ul> 
                                    ${stats.map(s => `<li>${s.stat.name}</li>`).join('')}
                                </ul>
                        </li>
                    </ul>
                    <button type="button" class="btn btn-md btn-outline-danger" onclick="resetQuiz()">Reset</button>
                </div>
            </div>
        </div>
    </div>
    `;

    container.insertAdjacentHTML('afterbegin', pokemonMarkup);
}
//#endregion

//#region EVENT LISTENERS
const selectType = (e) => {
    const userAnswer = e.target.value;
    selectedType = userAnswer;
    getPokemonByType();
}

const selectMove = (e) => {
    const userAnswer = e.target.value;
    selectedMove = userAnswer;
    getPokemonByMove();
}
//#endregion

//#region QUIZ
const resetQuiz = () => {
    const container = document.getElementById('pokemonContainer');
    container.remove();

    const quizContainer = document.getElementById('quizContainer');

    const newPokemonContainer = document.createElement('div');
    newPokemonContainer.id = 'pokemonContainer';
    quizContainer.insertAdjacentElement('afterend', newPokemonContainer);

    selectedType = '';
    selectedMove = '';
    selectedPokemonName = '';
    typePokemon = [];
    movePokemon = [];
    selectedPokemon = null;

    renderQuiz(quizQuestionA, quizQuestionAOptions, selectType);
}

const removeCurrentQuestion = () => {
    const questionContainer = document.getElementsByClassName('question-container')[0];
    questionContainer.remove();
}

const renderQuizOption = (options, container, optionClickHandler) => {
    options.map((option) => {
        const optEl = document.createElement('button');
        optEl.textContent = option.charAt(0).toUpperCase() + option.slice(1);
        optEl.value = option.toLowerCase();

        const color = selectRandom(buttonColors);
        optEl.className = `btn btn-md btn-outline-${color} m-1`;

        optEl.addEventListener('click', optionClickHandler);

        container.appendChild(optEl);
    });
}

const renderQuiz = (question, options, optionClickHandler) => {
    const container = document.getElementById('quizContainer');
    const questionContainer = document.createElement('div');
    questionContainer.className = 'question-container';
    container.appendChild(questionContainer);

    const questionEl = document.createElement('h2');
    questionEl.textContent = question;
    questionEl.className = 'quiz-question';
    questionContainer.appendChild(questionEl);

    renderQuizOption(options, questionContainer, optionClickHandler);
}

//#endregion

const selectRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const render = () => {
    renderQuiz(quizQuestionA, quizQuestionAOptions, selectType);
}

render();