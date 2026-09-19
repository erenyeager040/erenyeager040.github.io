/* ================================= */
/* SETTINGS */
/* ================================= */

// Change this to whatever password you want.
const SECRET_PASSWORD = "nur";


/* ================================= */
/* GET ELEMENTS */
/* ================================= */

const pages = document.querySelectorAll(".page");

const passwordScreen =
    document.getElementById("passwordScreen");

const homeScreen =
    document.getElementById("homeScreen");

const passwordInput =
    document.getElementById("passwordInput");

const unlockBtn =
    document.getElementById("unlockBtn");

const passwordMessage =
    document.getElementById("passwordMessage");

const objectButtons =
    document.querySelectorAll(".object");

const backButtons =
    document.querySelectorAll(".back-button");

const openGiftBtn =
    document.getElementById("openGiftBtn");

const giftBox =
    document.getElementById("giftBox");

const finalMessage =
    document.getElementById("finalMessage");


/* ================================= */
/* PAGE NAVIGATION */
/* ================================= */

function showPage(pageId) {

    pages.forEach(page => {

        page.classList.remove("active");

    });

    const page =
        document.getElementById(pageId);

    if (page) {

        page.classList.add("active");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }

}


/* ================================= */
/* PASSWORD */
/* ================================= */

function unlockWebsite() {

    const enteredPassword =
        passwordInput.value.trim().toLowerCase();

    if (enteredPassword === SECRET_PASSWORD) {

        passwordMessage.textContent = "";

        showPage("homeScreen");

    } else {

        passwordMessage.textContent =
            "Hmm... that's not it 👀";

        passwordInput.value = "";

        passwordInput.focus();

    }

}


unlockBtn.addEventListener("click", unlockWebsite);


passwordInput.addEventListener("keydown", event => {

    if (event.key === "Enter") {

        unlockWebsite();

    }

});


/* ================================= */
/* HOME OBJECTS */
/* ================================= */

objectButtons.forEach(button => {

    button.addEventListener("click", () => {

        const section =
            button.dataset.section;

        showPage(section + "Screen");

    });

});


/* ================================= */
/* BACK BUTTONS */
/* ================================= */

backButtons.forEach(button => {

    button.addEventListener("click", () => {

        showPage("homeScreen");

    });

});

/* ================================= */
/* ROCK PAPER SCISSORS */
/* ================================= */

const openSurpriseBtn =
    document.getElementById("openSurpriseBtn");

const surpriseIntro =
    document.getElementById("surpriseIntro");

const rpsGame =
    document.getElementById("rpsGame");

const playerWinsElement =
    document.getElementById("playerWins");

const nurWinsElement =
    document.getElementById("nurWins");

const roundNumberElement =
    document.getElementById("roundNumber");

const kissCountElement =
    document.getElementById("kissCount");

const playerChoiceElement =
    document.getElementById("playerChoice");

const nurChoiceElement =
    document.getElementById("nurChoice");

const rpsResult =
    document.getElementById("rpsResult");

const rpsButtons =
    document.querySelectorAll(".rps-button");


/* FINAL PAGE */

const rewardScreen =
    document.getElementById("rewardScreen");

const finalPlayerWins =
    document.getElementById("finalPlayerWins");

const finalNurWins =
    document.getElementById("finalNurWins");

const finalKissCount =
    document.getElementById("finalKissCount");

const roseRain =
    document.getElementById("roseRain");


/* ================================= */
/* GAME SETTINGS */
/* ================================= */

const TOTAL_ROUNDS = 10;


/* ================================= */
/* GAME VARIABLES */
/* ================================= */

let currentRound = 0;

let playerWins = 0;

let nurWins = 0;

let kissesOwed = 0;


/* ================================= */
/* CHOICES */
/* ================================= */

const choices = {

    rock: "🪨",

    paper: "📄",

    scissors: "✂️"

};


/* ================================= */
/* OPEN GAME */
/* ================================= */

openSurpriseBtn.addEventListener("click", () => {

    // Hide birthday intro
    surpriseIntro.classList.add("hidden");

    // Show game
    rpsGame.classList.remove("hidden");

    // Start the game
    startGame();

    // Smoothly scroll to the game
    setTimeout(() => {

        rpsGame.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }, 100);

});

/* ================================= */
/* START GAME */
/* ================================= */

function startGame() {

    currentRound = 0;

    playerWins = 0;

    nurWins = 0;

    kissesOwed = 0;


    updateGameUI();

    nextRound();

}


/* ================================= */
/* NEXT ROUND */
/* ================================= */

function nextRound() {

    currentRound++;


    /*
        After round 10,
        immediately open the new page.
    */

    if (currentRound > TOTAL_ROUNDS) {

        finishGame();

        return;

    }


    roundNumberElement.textContent =
        currentRound;


    playerChoiceElement.textContent =
        "?";

    nurChoiceElement.textContent =
        "?";


    rpsResult.textContent =
        "Choose your move 👇";


    rpsButtons.forEach(button => {

        button.disabled = false;

    });

}


/* ================================= */
/* BUTTON CLICK */
/* ================================= */

rpsButtons.forEach(button => {

    button.addEventListener("click", () => {

        const playerChoice =
            button.dataset.choice;


        /* Nur chooses */

        const nurChoice =
            Object.keys(choices)[
                Math.floor(
                    Math.random() *
                    3
                )
            ];


        playerChoiceElement.textContent =
            choices[playerChoice];

        nurChoiceElement.textContent =
            choices[nurChoice];


        /* Disable buttons */

        rpsButtons.forEach(btn => {

            btn.disabled = true;

        });


        determineWinner(
            playerChoice,
            nurChoice
        );

    });

});


/* ================================= */
/* WINNER */
/* ================================= */

function determineWinner(
    playerChoice,
    nurChoice
) {

    /* DRAW */

    if (playerChoice === nurChoice) {

        rpsResult.textContent =
            "DRAW 😭";

    }


    /* PLAYER WINS */

    else if (

        (playerChoice === "rock" &&
            nurChoice === "scissors") ||

        (playerChoice === "paper" &&
            nurChoice === "rock") ||

        (playerChoice === "scissors" &&
            nurChoice === "paper")

    ) {

        playerWins++;

        rpsResult.textContent =
            "You win this round 🔥";

    }


    /* NUR WINS */

    else {

        nurWins++;

        kissesOwed++;

        rpsResult.textContent =
            "Nur wins 😌  •  Kiss owed 💋";

    }


    /*
        IMPORTANT:
        Update the visible counter
        immediately after every round.
    */

    updateGameUI();


    setTimeout(() => {

        nextRound();

    }, 2000);

}


/* ================================= */
/* UPDATE GAME UI */
/* ================================= */

function updateGameUI() {

    playerWinsElement.textContent =
        playerWins;

    nurWinsElement.textContent =
        nurWins;

    kissCountElement.textContent =
        kissesOwed;

}


/* ================================= */
/* FINISH GAME */
/* ================================= */

function finishGame() {

    /*
        Update FINAL values BEFORE
        changing the page.
    */

    finalPlayerWins.textContent =
        playerWins;

    finalNurWins.textContent =
        nurWins;

    finalKissCount.textContent =
        kissesOwed;


    /*
        Hide entire game page
    */

    document
        .getElementById("surpriseScreen")
        .classList.remove("active");


    /*
        Show completely separate page
    */

    rewardScreen.classList.add("active");


    /*
        Start roses AFTER
        final values are ready.
    */

    startRoseRain();

}


/* ================================= */
/* ROSE RAIN */
/* ================================= */

function createRose() {

    const rose =
        document.createElement("div");

    rose.className =
        "falling-rose";

    rose.textContent =
        "🌹";


    rose.style.left =
        Math.random() * 100 + "%";


    rose.style.fontSize =
        `${22 + Math.random() * 25}px`;


    rose.style.animationDuration =
        `${4 + Math.random() * 4}s`;


    rose.style.animationDelay =
        `${Math.random() * 1.5}s`;


    roseRain.appendChild(rose);


    setTimeout(() => {

        rose.remove();

    }, 9000);

}


/* ================================= */
/* START ROSE RAIN */
/* ================================= */

function startRoseRain() {

    /* Initial explosion */

    for (let i = 0; i < 40; i++) {

        setTimeout(() => {

            createRose();

        }, i * 70);

    }


    /* Continuous rain */

    setInterval(() => {

        if (
            rewardScreen.classList.contains("active")
        ) {

            createRose();

        }

    }, 230);

}
/* ================================= */
/* MEMORY LIGHTBOX */
/* ================================= */

const memoryPhotos =
    document.querySelectorAll(".memory-photo");

const photoLightbox =
    document.getElementById("photoLightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const closeLightbox =
    document.getElementById("closeLightbox");


/* Make sure popup starts hidden */

photoLightbox.classList.add("hidden");


/* ================================= */
/* OPEN PHOTO */
/* ================================= */

memoryPhotos.forEach(photo => {

    photo.addEventListener("click", () => {

        const image =
            photo.querySelector("img");

        if (!image) return;


        /*
            Use the actual image URL
            that the browser loaded.
        */

        lightboxImage.src =
            image.currentSrc || image.src;


        photoLightbox.classList.remove("hidden");

    });

});


/* ================================= */
/* CLOSE */
/* ================================= */

function closePhotoLightbox() {

    photoLightbox.classList.add("hidden");

    lightboxImage.removeAttribute("src");

}


closeLightbox.addEventListener(
    "click",
    closePhotoLightbox
);


/* Click outside image */

photoLightbox.addEventListener(
    "click",
    event => {

        if (
            event.target === photoLightbox
        ) {

            closePhotoLightbox();

        }

    }
);


/* Escape key */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closePhotoLightbox();

        }

    }
);

/* ================================= */
/* SPOTIFY MUSIC */
/* ================================= */

const spotifyPlayer =
    document.getElementById("spotifyPlayer");

const songItems =
    document.querySelectorAll(".song-item");


songItems.forEach(song => {

    song.addEventListener("click", () => {

        const trackId =
            song.dataset.track;


        if (!trackId) {

            return;

        }


        /* Remove active from all songs */

        songItems.forEach(item => {

            item.classList.remove("active");

        });


        /* Activate selected song */

        song.classList.add("active");


        /* Change Spotify player */

        spotifyPlayer.src =
            `https://open.spotify.com/embed/track/${trackId}?utm_source=generator`;

    });

});