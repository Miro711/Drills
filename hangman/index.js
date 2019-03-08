$(document).ready(function () {

    let word = 'podiatrist';
    let wrongGuesses = 0;
    let guessedWord = [];
    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
        'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
        'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ];

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
        for (let char = 0; char <= word.length - 1; char++) {
            if (word[char] == guessedLetter) {
                $('li.guess').eq(char).html(`${guessedLetter.toUpperCase()}`);
                guessedWord[char] = guessedLetter;
                console.log(guessedWord);
                if (guessedWord.join("") == word) {
                    setTimeout(function(){ alert("Congratulations! You win!"); }, 100);
                }
            }
        }

        if (word.indexOf(guessedLetter) == -1) {
            wrongGuesses += 1;
            $('div#lives img').attr("src", `images/${wrongGuesses}.jpg`);
            if (wrongGuesses == 6) {
                setTimeout(function(){ alert("Better luck next time..."); }, 100);
            }
        }

    });

});