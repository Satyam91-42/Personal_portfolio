
// Select navigation elements

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");


// Mobile navigation menu

menuToggle.addEventListener("click", function () {

    const isOpen = navMenu.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", isOpen);

    menuToggle.textContent = isOpen ? "✕" : "☰";

});


// Close navigation after clicking a link

document.querySelectorAll("#navMenu a").forEach(function (link) {

    link.addEventListener("click", function () {

        navMenu.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.textContent = "☰";

    });

});


// Automatically update copyright year

document.getElementById("year").textContent =
    new Date().getFullYear();


// Prevent placeholder project links from navigating to the top

document.querySelectorAll(".project-placeholder").forEach(function (link) {

    link.addEventListener("click", function (event) {

        event.preventDefault();

        alert("Please add your actual GitHub repository link here.");

    });

});

