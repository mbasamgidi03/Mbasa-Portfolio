/* =========================
   NAVIGATION & SECTIONS
========================= */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");


/* Active Navigation */

function updateActiveNav() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 160;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }

    });

}


/* =========================
   SECTION ANIMATION
========================= */

const observer = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            } else {

                entry.target.classList.remove("show");

            }

        });

    },

    {
        threshold: 0.15
    }

);


/* Observe Each Section */

sections.forEach(section => {

    observer.observe(section);

});


/* Update Navigation While Scrolling */

window.addEventListener("scroll", updateActiveNav);

window.addEventListener("load", updateActiveNav);



/* =========================
   CHATBOT
========================= */

const chatbot = document.querySelector(".chatbot");

const chatbotToggle = document.getElementById("chatbot-toggle");

const chatbotBox = document.getElementById("chatbot-box");

const chatbotClose = document.getElementById("chatbot-close");

const chatbotInput = document.getElementById("chatbot-input");

const chatbotSend = document.getElementById("chatbot-send");

const chatbotMessages = document.getElementById("chatbot-messages");



/* =========================
   OPEN CHATBOT
========================= */

chatbotToggle.addEventListener("click", () => {

    chatbotBox.style.display = "flex";

    chatbotInput.focus();

});



/* =========================
   CLOSE CHATBOT
========================= */

chatbotClose.addEventListener("click", () => {

    chatbotBox.style.display = "none";

});



/* =========================
   CLOSE WHEN CLICKING OUTSIDE
========================= */

document.addEventListener("click", event => {

    const chatbotIsOpen =
        chatbotBox.style.display === "flex";

    if (
        chatbotIsOpen &&
        !chatbot.contains(event.target)
    ) {

        chatbotBox.style.display = "none";

    }

});



/* =========================
   KEEP SCROLLING INSIDE CHATBOT
========================= */

chatbotMessages.addEventListener(
    "wheel",
    event => {

        const scrollTop =
            chatbotMessages.scrollTop;

        const scrollHeight =
            chatbotMessages.scrollHeight;

        const clientHeight =
            chatbotMessages.clientHeight;

        const scrollingUp =
            event.deltaY < 0;

        const scrollingDown =
            event.deltaY > 0;

        const atTop =
            scrollTop <= 0;

        const atBottom =
            scrollTop + clientHeight >= scrollHeight - 1;


        if (
            (scrollingUp && !atTop) ||
            (scrollingDown && !atBottom)
        ) {

            event.stopPropagation();

        }


        if (
            (scrollingUp && atTop) ||
            (scrollingDown && atBottom)
        ) {

            event.preventDefault();

        }

    },

    {
        passive: false
    }

);



/* =========================
   CREATE QUICK OPTIONS
========================= */

function createQuickOptions() {

    const optionsContainer =
        document.createElement("div");

    optionsContainer.classList.add(
        "chatbot-options"
    );

    optionsContainer.innerHTML = `

        <button
            class="chat-option"
            data-question="projects"
            type="button"
        >
            Projects
        </button>

        <button
            class="chat-option"
            data-question="skills"
            type="button"
        >
            Skills
        </button>

        <button
            class="chat-option"
            data-question="experience"
            type="button"
        >
            Experience
        </button>

        <button
            class="chat-option"
            data-question="about"
            type="button"
        >
            About
        </button>

        <button
            class="chat-option"
            data-question="contact"
            type="button"
        >
            Contact
        </button>

    `;


    const optionButtons =
        optionsContainer.querySelectorAll(
            ".chat-option"
        );


    optionButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                chatbotInput.value =
                    button.dataset.question;

                sendMessage();

            }
        );

    });


    return optionsContainer;

}



/* =========================
   SEND MESSAGE
========================= */

function sendMessage() {

    const message =
        chatbotInput.value.trim();


    /* Don't Send Empty Messages */

    if (message === "") {

        return;

    }


    /* Create User Message */

    const userMessage =
        document.createElement("div");

    userMessage.classList.add(
        "user-message"
    );

    userMessage.textContent =
        message;

    chatbotMessages.appendChild(
        userMessage
    );


    /* Clear Input */

    chatbotInput.value = "";


    /* Scroll Down */

    chatbotMessages.scrollTop =
        chatbotMessages.scrollHeight;


    /* Bot Reply */

    setTimeout(() => {

        const botMessage =
            document.createElement("div");

        botMessage.classList.add(
            "bot-message"
        );

        botMessage.textContent =
            getBotResponse(message);

        chatbotMessages.appendChild(
            botMessage
        );


        /* Show Quick Options Again */

        const newOptions =
            createQuickOptions();

        chatbotMessages.appendChild(
            newOptions
        );


        /* Scroll to Latest Response */

        chatbotMessages.scrollTop =
            chatbotMessages.scrollHeight;

    }, 500);

}



/* =========================
   SEND BUTTON
========================= */

chatbotSend.addEventListener(
    "click",
    sendMessage
);



/* =========================
   ENTER KEY
========================= */

chatbotInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            event.preventDefault();

            sendMessage();

        }

    }
);



/* =========================
   ORIGINAL QUICK OPTIONS
========================= */

const originalChatOptions =
    document.querySelectorAll(
        ".chat-option"
    );

originalChatOptions.forEach(option => {

    option.addEventListener(
        "click",
        () => {

            chatbotInput.value =
                option.dataset.question;

            sendMessage();

        }
    );

});



/* =========================
   CHATBOT RESPONSES
========================= */

function getBotResponse(message) {

    const text = message
        .toLowerCase()
        .replace(/[?.!,]/g, "");



    /* =========================
       GREETINGS
    ========================= */

    if (
        text.includes("hello") ||
        text.includes("hi") ||
        text.includes("hey")
    ) {

        return "Hi! 👋 I'm Mbasa's portfolio assistant. You can ask me about her projects, skills, experience or contact information.";

    }



    /* =========================
       SENTIMENTIQ
    ========================= */

    if (
        text.includes("sentimentiq") ||
        text.includes("sentiment iq")
    ) {

        return "SentimentIQ is an ecommerce sentiment analysis dashboard that analyses customer reviews and classifies feedback as positive, negative or neutral. The results are presented through dashboards and visualisations to help businesses understand customer sentiment.";

    }



    /* =========================
       TAXGUARD
    ========================= */

    if (
        text.includes("taxguard") ||
        text.includes("tax guard")
    ) {

        return "TaxGuard is a salary and tax tracking application designed around South African employees and PAYE deductions. It allows users to track salary information, tax deductions, potential tax obligations and financial records.";

    }



    /* =========================
       SMALLBIZ
    ========================= */

    if (
        text.includes("smallbiz") ||
        text.includes("small biz")
    ) {

        return "SmallBiz is a digital platform designed to help small-business owners create and manage content while providing a practical workspace for managing business information.";

    }



    /* =========================
       PROJECTS
    ========================= */

    if (
        text.includes("project") ||
        text.includes("built") ||
        text.includes("work")
    ) {

        return "Mbasa's portfolio currently includes SentimentIQ, TaxGuard and SmallBiz. You can ask me about any of these projects individually and I'll tell you more.";

    }



    /* =========================
       WEB DEVELOPMENT
    ========================= */

    if (
        text.includes("html") ||
        text.includes("css") ||
        text.includes("javascript") ||
        text.includes("web development")
    ) {

        return "Mbasa's web development skills include HTML, CSS and JavaScript.";

    }



    /* =========================
       PROGRAMMING
    ========================= */

    if (
        text.includes("java") ||
        text.includes("python") ||
        text.includes("vb.net") ||
        text.includes("vb net") ||
        text.includes("programming language")
    ) {

        return "Mbasa has experience with Java, Python and VB.NET, as well as SQL for working with databases.";

    }



    /* =========================
       TOOLS
    ========================= */

    if (
        text.includes("github") ||
        text.includes("git") ||
        text.includes("figma") ||
        text.includes("visual studio") ||
        text.includes("oracle") ||
        text.includes("tool")
    ) {

        return "Mbasa uses Git, GitHub, Figma, Visual Studio Code and Oracle APEX.";

    }



    /* =========================
       SKILLS
    ========================= */

    if (
        text.includes("skill") ||
        text.includes("technology") ||
        text.includes("technologies") ||
        text.includes("tech stack")
    ) {

        return "Mbasa's technical skills include HTML, CSS, JavaScript, Java, Python, VB.NET and SQL. She also works with Git, GitHub, Figma, Visual Studio Code and Oracle APEX.";

    }



    /* =========================
       CAPACITI
    ========================= */

    if (
        text.includes("capaciti") ||
        text.includes("digital associate") ||
        text.includes("current job") ||
        text.includes("currently work")
    ) {

        return "Mbasa is currently a Digital Associate at CAPACITI. She is participating in a software engineering programme and gaining exposure to artificial intelligence, software development, collaborative projects and AI-assisted development tools.";

    }



    /* =========================
       TUTOR EXPERIENCE
    ========================= */

    if (
        text.includes("tutor") ||
        text.includes("tutoring")
    ) {

        return "Mbasa worked as a Tutor at Walter Sisulu University from May to December 2024, supporting first-year students with programming and web development concepts.";

    }



    /* =========================
       STUDENT ASSISTANT
    ========================= */

    if (
        text.includes("student assistant")
    ) {

        return "Mbasa worked as a Student Assistant at Walter Sisulu University from July to November 2024. She assisted with academic events, online learning sessions and technical support.";

    }



    /* =========================
       EXPERIENCE
    ========================= */

    if (
        text.includes("experience") ||
        text.includes("work history") ||
        text.includes("previous job")
    ) {

        return "Mbasa is currently a Digital Associate at CAPACITI. Her previous experience includes working as a Tutor and Student Assistant at Walter Sisulu University.";

    }



    /* =========================
       ABOUT
    ========================= */

    if (
        text.includes("about") ||
        text.includes("who is mbasa") ||
        text.includes("tell me about mbasa")
    ) {

        return "Mbasa is a Junior Software Engineer focused on building practical digital solutions and continuously growing her skills in software development, artificial intelligence and modern development practices.";

    }



    /* =========================
       ROLE
    ========================= */

    if (
        text.includes("software engineer") ||
        text.includes("career") ||
        text.includes("profession")
    ) {

        return "Mbasa is building her career as a Junior Software Engineer, with an interest in practical software development, artificial intelligence and user-focused digital solutions.";

    }



    /* =========================
       LOCATION
    ========================= */

    if (
        text.includes("location") ||
        text.includes("where is mbasa") ||
        text.includes("cape town")
    ) {

        return "Mbasa is based in Cape Town, South Africa.";

    }



    /* =========================
       EMAIL
    ========================= */

    if (
        text.includes("email")
    ) {

        return "You can email Mbasa at Mbasamgidi03@gmail.com.";

    }



    /* =========================
       CONTACT
    ========================= */

    if (
        text.includes("contact") ||
        text.includes("reach") ||
        text.includes("get in touch")
    ) {

        return "You can contact Mbasa using the contact form on this portfolio or email her at Mbasamgidi03@gmail.com. Her GitHub profile is also available in the Contact section.";

    }



    /* =========================
       THANK YOU
    ========================= */

    if (
        text.includes("thank") ||
        text.includes("thanks")
    ) {

        return "You're welcome! 😊 Feel free to ask me anything else about Mbasa's portfolio.";

    }



    /* =========================
       DEFAULT RESPONSE
    ========================= */

    return "I don't have information about that yet. Try asking me about Mbasa's projects, skills, experience, current role or contact information.";

}
