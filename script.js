document.addEventListener("DOMContentLoaded", function () {

    // ==============================
    // 1. MOBILE NAVIGATION
    // ==============================
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", function () {
            navMenu.classList.toggle("active");

            const isOpen = navMenu.classList.contains("active");
            menuToggle.setAttribute("aria-expanded", isOpen);
        });

        navMenu.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navMenu.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }


    // ==============================
    // 2. DARK MODE
    // ==============================
    const themeToggle = document.getElementById("themeToggle");

    if (themeToggle) {
        let darkMode = false;

        try {
            darkMode = localStorage.getItem("portfolio-theme") === "dark";
        } catch (error) {}

        document.body.classList.toggle("dark-mode", darkMode);
        themeToggle.textContent = darkMode ? "☀️" : "🌙";

        themeToggle.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");

            const isDark = document.body.classList.contains("dark-mode");

            themeToggle.textContent = isDark ? "☀️" : "🌙";
            themeToggle.setAttribute(
                "aria-label",
                isDark ? "Switch to light mode" : "Switch to dark mode"
            );

            try {
                localStorage.setItem(
                    "portfolio-theme",
                    isDark ? "dark" : "light"
                );
            } catch (error) {}
        });
    }


    // ==============================
    // 3. AUTOMATIC FOOTER YEAR
    // ==============================
    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    // ==============================
    // 4. PROJECT PLACEHOLDER LINKS
    // ==============================
    document.querySelectorAll(".project-link").forEach(function (link) {
        const href = (link.getAttribute("href") || "").trim();

        if (
            href === "javascript:void(0)" ||
            href === "#" ||
            href === ""
        ) {
            link.addEventListener("click", function (event) {
                event.preventDefault();
                alert("This project link will be available soon!");
            });
        }
    });


    // ==============================
    // 5. CHATBOT ELEMENTS
    // ==============================
    const chatWindow = document.getElementById("ai-chat-window");
    const chatInput = document.getElementById("chat-user-input");
    const chatMessages = document.getElementById("chat-messages");


    // Open and close chatbot
    window.toggleChat = function () {
        if (chatWindow) {
            chatWindow.classList.toggle("chat-hidden");
        }
    };


    // Send message using Enter key
    window.handleChatKey = function (event) {
        if (event && event.key === "Enter") {
            event.preventDefault();
            window.sendChatMessage();
        }
    };


    // Add chatbot message
    function addChatMessage(message, className) {
        if (!chatMessages) return;

        const messageElement = document.createElement("div");
        messageElement.className = className;
        messageElement.textContent = message;

        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }


    // ==============================
    // 6. CHATBOT RESPONSE SYSTEM
    // ==============================
    function getLocalAIResponse(userMessage) {
        const message = userMessage.toLowerCase();

        if (
            message.includes("hello") ||
            message.includes("hi") ||
            message.includes("hey") ||
            message.includes("namaste")
        ) {
            return "Hello! Welcome to Satyam's portfolio. How can I help you?";
        }

        if (
            message.includes("who are you") ||
            message.includes("about")
        ) {
            return "I am Satyam's portfolio assistant. Satyam Kumar Jha is a BCA student at Lovely Professional University and is interested in cloud computing and software development.";
        }

        if (
            message.includes("skill") ||
            message.includes("technology")
        ) {
            return "Satyam is learning Python, Java, C++, HTML, CSS, JavaScript, SQL, cloud computing, Git and GitHub.";
        }

        if (message.includes("project")) {
            return "Satyam's portfolio includes a Personal Portfolio Website and project concepts related to Cloud Computing and Student Management. Visit the Projects section to learn more.";
        }

        if (
            message.includes("education") ||
            message.includes("qualification") ||
            message.includes("study")
        ) {
            return "Satyam is pursuing a Bachelor of Computer Applications (BCA) at Lovely Professional University. He completed his Higher Secondary Education in Science from SNKN College, Bhirha, Samastipur.";
        }

        if (
            message.includes("contact") ||
            message.includes("email") ||
            message.includes("hire")
        ) {
            return "You can connect with Satyam through the GitHub and LinkedIn links on his portfolio, or visit the Contact section.";
        }

        if (
            message.includes("certificate") ||
            message.includes("certification")
        ) {
            return "Satyam's portfolio includes certificates related to Python, serverless applications, AWS Cloud and cloud computing fundamentals. Visit the Certifications section.";
        }

        if (
            message.includes("achievement") ||
            message.includes("award")
        ) {
            return "Satyam highlights hackathon participation, continuous learning and project development in the Achievements section.";
        }

        if (message.includes("github")) {
            return "Satyam's GitHub profile is: github.com/Satyam91-42";
        }

        if (message.includes("linkedin")) {
            return "You can connect with Satyam on LinkedIn through the LinkedIn link in the Home section.";
        }

        if (message.includes("thank")) {
            return "You're welcome! Feel free to ask me anything else.";
        }

        return "Thanks for your question! You can explore the About, Education, Skills, Projects, Achievements and Certifications sections to learn more about Satyam.";
    }


    // ==============================
    // 7. SEND CHATBOT MESSAGE
    // ==============================
    window.sendChatMessage = function () {
        if (!chatInput || !chatMessages) return;

        const userMessage = chatInput.value.trim();

        if (userMessage === "") return;

        addChatMessage(userMessage, "user-msg");
        chatInput.value = "";

        const response = getLocalAIResponse(userMessage);

        window.setTimeout(function () {
            addChatMessage(response, "bot-msg");
        }, 400);
    };

});
// Scroll Reveal Animation

document.addEventListener("DOMContentLoaded", () => {

    const revealElements = document.querySelectorAll(
        "section, .about-card, .timeline-card, .skill-card, .project-card, .achievement-card"
    );

    revealElements.forEach(element => {
        element.classList.add("reveal");
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12
    });

    revealElements.forEach(element => {
        observer.observe(element);
    });

});
