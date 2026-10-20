
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

// Toggle Chat Window
function toggleChat() {
  const chatWin = document.getElementById("ai-chat-window");
  chatWin.classList.toggle("chat-hidden");
}

function handleChatKey(event) {
  if (event.key === "Enter") {
    sendChatMessage();
  }
}

// Knowledge Base & Smart Response Engine
function getLocalAIResponse(query) {
  const text = query.toLowerCase();

  if (text.includes("skill") || text.includes("knowledge") || text.includes("technology")) {
    return "Satyam ke core skills: Python, Java, C++, Cloud Fundamentals & Deployment concepts, Web Dev (HTML, CSS, JS), aur SQL Database management.";
  }
  
  if (text.includes("project") || text.includes("work")) {
    return "Featured Projects: \n1. Cloud-Based Application (Deployment & Scalability)\n2. Personal Portfolio Website\n3. Student Management System (Python & SQL).";
  }

  if (text.includes("education") || text.includes("college") || text.includes("degree") || text.includes("lpu")) {
    return "Satyam abhi Lovely Professional University (LPU) se Bachelor of Computer Applications (BCA) kar rahe hain with focus on Cloud Computing.";
  }

  if (text.includes("certif") || text.includes("course")) {
    return "Certifications:\n- AWS Cloud Technical Essentials (Coursera)\n- Programming For Everybody & Python Data Structures (Coursera)\n- Cloud Computing Fundamentals (IBM SkillsBuild).";
  }

  if (text.includes("contact") || text.includes("email") || text.includes("hire") || text.includes("reach")) {
    return "Aap Satyam se page ke footer ya 'Contact Me' section ke through email aur LinkedIn par connect kar sakte hain!";
  }

  if (text.includes("hello") || text.includes("hi") || text.includes("hey")) {
    return "Hello! Main Satyam ke baare mein kya jankari share karoon? (Skills, Projects, Education ya Certifications)";
  }

  return "Yeh sawal kafi interesting hai! Iske baare mein deep discuss karne ke liye aap page ke 'Contact Me' section se seedhe Satyam ko connect kar sakte hain.";
}

function sendChatMessage() {
  const input = document.getElementById("chat-user-input");
  const msgContainer = document.getElementById("chat-messages");
  const text = input.value.trim();

  if (!text) return;

  // Add User Message
  const userDiv = document.createElement("div");
  userDiv.className = "user-msg";
  userDiv.innerText = text;
  msgContainer.appendChild(userDiv);
  input.value = "";

  // Scroll to bottom
  msgContainer.scrollTop = msgContainer.scrollHeight;

  // Simulate Thinking & Reply
  setTimeout(() => {
    const botDiv = document.createElement("div");
    botDiv.className = "bot-msg";
    botDiv.innerText = getLocalAIResponse(text);
    msgContainer.appendChild(botDiv);
    msgContainer.scrollTop = msgContainer.scrollHeight;
  }, 400);
}

/* Mini Compact Theme Button */
.mini-theme-btn {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  width: 34px;           /* Chhota aur compact size */
  height: 34px;
  font-size: 15px;       /* Subtle icon size */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.25s ease;
  margin-right: 10px;    /* Hamburger menu se safe distance */
  vertical-align: middle;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.mini-theme-btn:hover {
  transform: translateY(-1px) scale(1.05);
  background: rgba(255, 255, 255, 0.18);
  border-color: #38bdf8;
}

/* Light Mode Overrides */
body.light-theme {
  background-color: #f8fafc !important;
  color: #0f172a !important;
}

body.light-theme header,
body.light-theme nav,
body.light-theme .card,
body.light-theme .project-card,
body.light-theme .cert-card,
body.light-theme div[class*="card"] {
  background-color: #ffffff !important;
  color: #0f172a !important;
  border-color: #e2e8f0 !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05) !important;
}

body.light-theme h1,
body.light-theme h2,
body.light-theme h3,
body.light-theme p,
body.light-theme span {
  color: #0f172a !important;
}

body.light-theme .mini-theme-btn {
  background: #e2e8f0;
  border-color: #cbd5e1;
}

