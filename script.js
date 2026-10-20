
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

// 1. Apni copied API key yahan paste karein:
const GEMINI_API_KEY = "AQ.Ab8RN6Idrv1iNw8vscXBHYUCCODLq3dDodz6nUyBN6VVIhoZfg";

// Chat window show/hide toggle
function toggleChat() {
  const chatWin = document.getElementById("ai-chat-window");
  if (chatWin) {
    chatWin.classList.toggle("chat-hidden");
  }
}

// Enter press karne par message bhejein
function handleChatKey(event) {
  if (event.key === "Enter") {
    sendChatMessage();
  }
}

// System context: AI Satyam ke profile ki specifics hi answer karega
const SYSTEM_INSTRUCTION = `
You are the AI portfolio assistant for Satyam Kumar Jha.
Profile context:
- Full Name: Satyam Kumar Jha
- Current Degree: BCA (Bachelor of Computer Applications) at Lovely Professional University (LPU), focusing on Cloud Computing and Software Development.
- Higher Secondary (12th): SNKN College Bhirha Samastipur (BSEB Science, 2026).
- Technical Skills:
  - Programming: Python, Java, C++
  - Web & DB: HTML, CSS, JavaScript, SQL (Relational DBs)
  - Cloud & Tools: Cloud Fundamentals, Deployment, Git, GitHub, Visual Studio Code
- Featured Projects:
  1. Cloud-Based Application (Exploring cloud hosting, scalability, and infrastructure)
  2. Personal Portfolio Website (Responsive portfolio built with HTML, CSS, JS)
  3. Student Management System (Python & SQL for academic records)
- Certifications:
  - AWS Cloud Technical Essentials (Coursera)
  - Programming for Everybody & Python Data Structures (Coursera)
  - Cloud Computing Fundamentals (IBM SkillsBuild)
- Important Links:
  - GitHub: https://github.com/satyam91-42
- Tone & Rules:
  - Answer naturally in the user's language (English or Hindi/Hinglish).
  - Keep answers concise, clear, and focused on Satyam's career, education, and skills.
  - For hiring or collaborations, suggest using the Contact Me / Email button or GitHub.
`;

// Direct Gemini API Call Function
async function callGeminiAPI(userQuery) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

  const payload = {
    system_instruction: {
      parts: [{ text: SYSTEM_INSTRUCTION }]
    },
    contents: [
      {
        role: "user",
        parts: [{ text: userQuery }]
      }
    ],
    generationConfig: {
      temperature: 0.6,
      maxOutputTokens: 250
    }
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || `HTTP ${response.status}`);
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

// Message Send Handler
async function sendChatMessage() {
  const input = document.getElementById("chat-user-input");
  const msgContainer = document.getElementById("chat-messages");
  const text = input.value.trim();

  if (!text) return;

  // Append user bubble
  const userDiv = document.createElement("div");
  userDiv.className = "user-msg";
  userDiv.innerText = text;
  msgContainer.appendChild(userDiv);
  input.value = "";
  msgContainer.scrollTop = msgContainer.scrollHeight;

  // Append bot bubble placeholder
  const botDiv = document.createElement("div");
  botDiv.className = "bot-msg";
  botDiv.innerText = "Soch raha hoon...";
  msgContainer.appendChild(botDiv);
  msgContainer.scrollTop = msgContainer.scrollHeight;

  try {
    const botReply = await callGeminiAPI(text);
    botDiv.innerText = botReply;
  } catch (err) {
    botDiv.innerText = "Error: API response connect nahi hua (" + err.message + "). Kripya API key aur network check karein.";
    console.error("Chatbot Error:", err);
  }

  msgContainer.scrollTop = msgContainer.scrollHeight;
}

