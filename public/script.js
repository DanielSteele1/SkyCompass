
// Initialisation 
const navMenu = document.querySelector(".nav-menu");
const hamburger = document.querySelector(".hamburger");
const bars = document.querySelectorAll('.bar');
const loginicon = document.querySelector(".nav-link .login-icon");

// ------------------------------- Hamburger JS
hamburger.addEventListener("click", toggleMenu);

document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", closeMenu);
});

function toggleMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}

//----------------------------------- DARK MODE JS
const darkModeButton = document.getElementById('darkMode-Button');
darkModeButton.addEventListener('click', toggleDarkMode);

// LocalStorage 
window.onload = function () {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    updateDarkMode(isDarkMode);
};

function updateDarkMode(isDarkMode) {
    const element = document.body;
    const navMenu = document.querySelector(".nav-menu");
    const bgcards = document.querySelectorAll(".data-cards");
    const darkmodeicon = document.querySelector(".darkMode-icon")

    if (isDarkMode) {
        // Dark Mode
        element.classList.add("darkmode");
        navMenu.style.backgroundColor = "#212120";
        loginicon.src = 'media/login-white.png';
        bgcards.backgroundColor = "#212120";
        darkmodeicon.src = 'media/sun.png';

        bars.forEach((bar) => {
            bar.style.backgroundColor = "white";

        })

    } else {
        // Light Mode
        element.classList.remove("darkmode");
        navMenu.style.backgroundColor = "white";
        loginicon.src = 'media/login.png';
        bgcards.backgroundColor = "white";
        darkmodeicon.src = 'media/moon.png';

        bars.forEach((bar) => {
            bar.style.backgroundColor = "black";

        });
    }
}

function toggleDarkMode() {
    const isDarkMode = document.body.classList.contains('darkmode');
    updateDarkMode(!isDarkMode);
    localStorage.setItem("darkMode", !isDarkMode);
}