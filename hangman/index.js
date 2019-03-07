$(document).ready(function () {

    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
        'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
        'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

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

    $('#alphabet li#letter').on('click', function(event) {
        console.log($(this));
        $(this).addClass('highlighted');
    });


});