document.addEventListener('DOMContentLoaded', () =>{

    const cardArray = [
        {
            name: 'Zombie',
            img: 'images/Zombie.png'
        },
        {
            name: 'Zombie',
            img: 'images/Zombie.png'
        },
        {
            name: 'Sherman',
            img: 'images/sherman.png'
        },
        {
            name: 'Sherman',
            img: 'images/sherman.png'
        },
        {
            name: 'Lenard',
            img: 'images/lenard.png'
        },
        {
            name: 'Lenard',
            img: 'images/lenard.png'
        },
        {
            name: 'Mestus',
            img: 'images/Mestus.png'
        },
        {
            name: 'Mestus',
            img: 'images/Mestus.png'
        },
        {
            name: 'Endicott',
            img: 'images/Endicott.png'
        },
        {
            name: 'Endicott',
            img: 'images/Endicott.png'
        },
        {
            name: 'Grey',
            img: 'images/Grey.png'
        },
        {
            name: 'Grey',
            img: 'images/Grey.png'
        },
    ];
    let cardsChosen = [];
    let cardsChosenID = [];
    let cardsWon = [];
    
    cardArray.sort(() => 0.5 - Math.random());
    const grid = document.querySelector('.grid');
    const resultsDisplay = document.querySelector('#result');

    function createBoard(){
        for (let i = 0; i< cardArray.length; i++) {
            var card = document.createElement('img');
            card.setAttribute('src', 'images/Back.png');
            card.setAttribute('data-id', i);
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        }
    }
    createBoard();

    function checkForMatch() {
        console.log(cardsChosen[0]);
        console.log(cardsChosen[1]);
        let cards = document.querySelectorAll('img');
        const optionOneId = cardsChosenID[0];
        const optionTwoId = cardsChosenID[1];
    
        if (cardsChosen[0] === cardsChosen[1]){
            alert('die');
            cards[optionOneId].setAttribute('src', 'images/Uncovered.png');
            cards[optionTwoId].setAttribute('src', 'images/Uncovered.png');
            cardsWon.push(cardsChosen);
        }
        else {
            cards[optionOneId].setAttribute('src', 'images/Back.png');
            cards[optionTwoId].setAttribute('src', 'images/Back.png');
            alert('no');
        }
        cardsChosen = [];
        cardsChosenID = [];
        resultsDisplay.textContent = cardsWon.length;
    
        if (cardsWon.length === cardArray.length/2){
            resultsDisplay.textContent = 'You win';
            let reset = document.createElement('button');
            reset.setAttribute('onclick', 'createBoard();');
            reset.textContent = 'Play again!';
            document.getElementById('webpage').appendChild(reset);


        }
    }
    
    function flipCard(){
        var cardID = this.getAttribute('data-id');
        if (this.getAttribute('src') !== 'images/Uncovered.png')
        {
            cardsChosen.push(cardArray[cardID].name);
            cardsChosenID.push(cardID);
            this.setAttribute('src', cardArray[cardID].img);
            if (cardsChosen.length === 2){
                setTimeout(checkForMatch, 500);
        }
        }
        
    }
    
    
    
});

