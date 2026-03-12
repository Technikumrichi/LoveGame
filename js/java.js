document.addEventListener("DOMContentLoaded", () => {
    let username = prompt("Bitte geben Sie Ihren Namen ein:");
    document.getElementById("username").textContent = username || "Mario";

    let attempts = 0;
    let timeElapsed = 0;
    let selectedCards = [];
    let matchedPairs = 0;
    let isChecking = false;

    const images = [
        "card1.png", "card1.png", "card2.png", "card2.png",
        "card3.png", "card3.png", "card4.png", "card4.png",
        "card5.png", "card5.png", "card6.png", "card6.png",
        "card7.png", "card7.png", "card8.png", "card8.png"
    ];

    images.sort(() => Math.random() - 0.5);

    const gameBoard = document.getElementById("spielbereich");

    images.forEach((imgSrc) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.image = imgSrc;

        card.style.backgroundImage = "url('pics/memoryBg.png')";
        card.style.backgroundSize = "cover";

        card.addEventListener("click", () => flipCard(card));
        gameBoard.appendChild(card);
    });

    function flipCard(card) {
        if (isChecking || selectedCards.length >= 2 || card.classList.contains("flipped")) return;

        card.classList.add("flipped");
        card.style.backgroundImage = `url('pics/${card.dataset.image}')`;
        selectedCards.push(card);

        if (selectedCards.length === 2) {
            isChecking = true;
            attempts++;
            document.getElementById("attempts").textContent = attempts;
            setTimeout(checkMatch, 1000);
        }
    }

    function checkMatch() {
        const [card1, card2] = selectedCards;

        if (card1.dataset.image === card2.dataset.image) {
            card1.style.backgroundImage = "url(pics/memoryBgI.png)";
            card2.style.backgroundImage = "url(pics/memoryBgI.png)";
            card1.removeEventListener("click", () => flipCard(card1));
            card2.removeEventListener("click", () => flipCard(card2));
            matchedPairs++;

            if (matchedPairs === 8) {
                clearInterval(timer);
                alert(`Herzlichen Glückwunsch ${username}, Sie haben das Spiel in ${timeElapsed} Sekunden beendet und ${attempts} Versuche benötigt.`);
            }
        } else {
            setTimeout(() => {
                card1.classList.remove("flipped");
                card2.classList.remove("flipped");
                card1.style.backgroundImage = "url('pics/memoryBg.png')";
                card2.style.backgroundImage = "url('pics/memoryBg.png')";
            }, 1000);
        }
        selectedCards = [];
        isChecking = false;
    }

    let timer = setInterval(() => {
        timeElapsed++;
        document.getElementById("time").textContent = timeElapsed + "s";
    }, 1000);
});
