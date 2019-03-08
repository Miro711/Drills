$(document).ready(function () {

    const arrayOfWords = ['podiatrist', 'Dawn'];
    var word = arrayOfWords[Math.floor(Math.random()*arrayOfWords.length)];
    var wrongGuesses = 0;
    var guessedWord = [];
    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
        'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
        'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ];
    function hangman(guessedLetter) {
        for (let char = 0; char <= word.length - 1; char++) {
            if (word[char] == guessedLetter) {
                $('li.guess').eq(char).html(`${guessedLetter.toUpperCase()}`);
                guessedWord[char] = guessedLetter;
                console.log(guessedWord);
                if (guessedWord.join("") == word) {
                    const winSound = () => new Audio('sounds/Yo Adrian I did it.mp3');
                    winSound().play();
                    reset();
                    setTimeout(function(){ alert("Congratulations! You win!"); }, 100);
                }
            }
        }

        if (word.indexOf(guessedLetter) == -1) {
            wrongGuesses += 1;
            $('div#lives img').attr("src", `images/${wrongGuesses}.jpg`);
            if (wrongGuesses == 6) {
                const loseSound = () => new Audio('sounds/Bum.mp3');
                loseSound().play();
                reset();
                setTimeout(function(){ alert("Better luck next time..."); }, 100);
            }
        }
    }

    function reset() {
        const arrayOfWords = ['podiatrist', 'Dawn'];
        word = arrayOfWords[Math.floor(Math.random()*arrayOfWords.length)];
        wrongGuesses = 0;
        guessedWord = [];
        $('div#lives img').attr("src", `images/0.jpg`);
        $('#alphabet li#letter').removeClass('highlighted');
        $('li.guess').html("_")
    }

    myButtons = document.getElementById('buttons');
    letters = document.createElement('ul');

    for (let i = 0; i < alphabet.length; i++) {
        letters.id = 'alphabet';
        list = document.createElement('li');
        list.id = 'letter';
        list.innerHTML = alphabet[i];
        myButtons.appendChild(letters);
        letters.appendChild(list);
    }

    wordHolder = document.getElementById('word');
    correct = document.createElement('ul');

    for (let i = 0; i < word.length; i++) {
        correct.id = 'my-word';
        guess = document.createElement('li');
        guess.setAttribute('class', 'guess');
        guess.innerHTML = "_";
        wordHolder.appendChild(correct);
        correct.appendChild(guess);
    }

    $('#alphabet li#letter').on('click', function (event) {
        $(this).addClass('highlighted');
        const guessedLetter = $(this).html().toLowerCase();
        hangman(guessedLetter);
    });

    $(document).on('keypress', function(event) {
        const keyCode = event.which; // same as const { keyCode } = event;
        console.log(keyCode);
        const key = String.fromCharCode(keyCode);
        $('#alphabet li#letter').eq(keyCode-97).addClass('highlighted');
        hangman(key);
    });

});