console.log("🚀 Designab loaded successfully!");

// ======================================
// LOADER
// ======================================
window.addEventListener("load", () => {
    const loader = document.querySelector("#loader");
    setTimeout(() => {
        loader.classList.add("hide");
    }, 1200);
});

// ======================================
// SPOTLIGHT
// ======================================
const spotlight = document.querySelector("#spotlight");
document.addEventListener("mousemove", (e) => {
    spotlight.style.left = e.clientX + "px";
    spotlight.style.top = e.clientY + "px";
});

// ======================================
// NAVIGATION
// ======================================
const nav = document.querySelector("nav");
const menuToggle = document.querySelector("#menutoggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section");

// Scroll effect
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }
});

// Mobile menu toggle
menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    const icon = menuToggle.querySelector("i");
    if (navLinks.classList.contains("open")) {
        icon.className = "fa-solid fa-xmark";
    } else {
        icon.className = "fa-solid fa-bars";
    }
});

// Close menu on link click
navItems.forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        const icon = menuToggle.querySelector("i");
        icon.className = "fa-solid fa-bars";
    });
});

// Active link on scroll
window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 200;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });
    navItems.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

// ======================================
// BACK TO TOP
// ======================================
const backtotop = document.querySelector("#backtotop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
        backtotop.classList.add("show");
    } else {
        backtotop.classList.remove("show");
    }
});

backtotop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// ======================================
// SCROLL REVEAL
// ======================================
const revealElements = document.querySelectorAll(".service-card, .portfolio-card, .about-container");

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, {
        threshold: 0.1,
    }
);

revealElements.forEach((el) => {
    el.classList.add("reveal");
    revealObserver.observe(el);
});

// ======================================
// SERVICE CARDS - GLOW EFFECT
// ======================================
const cards = document.querySelectorAll(".service-card");

cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--x", x + "px");
        card.style.setProperty("--y", y + "px");
    });
});

// ======================================
// 3D TILT EFFECT
// ======================================
const tiltCards = document.querySelectorAll(".service-card, .portfolio-card");

tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = ((x / rect.width) - 0.5) * 10;
        const rotateX = ((y / rect.height) - 0.5) * -10;

        card.style.transform =
            `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(900px) rotateX(0) rotateY(0) translateY(0)";
    });
});

// ======================================
// CONTACT FORM
// ======================================
const contactForm = document.querySelector("#contactForm");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const messageInput = document.querySelector("#message");
const formMessage = document.querySelector("#formMessage");
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    // Validation
    if (name === "") {
        formMessage.textContent = "❌ لطفاً نام خود را وارد کنید.";
        formMessage.style.color = "#ff4d4d";
        return;
    }

    if (email === "") {
        formMessage.textContent = "❌ لطفاً ایمیل خود را وارد کنید.";
        formMessage.style.color = "#ff4d4d";
        return;
    }

    if (!emailPattern.test(email)) {
        formMessage.textContent = "❌ ایمیل معتبر نیست.";
        formMessage.style.color = "#ff4d4d";
        return;
    }

    if (message === "") {
        formMessage.textContent = "❌ لطفاً پیام خود را وارد کنید.";
        formMessage.style.color = "#ff4d4d";
        return;
    }

    if (message.length < 10) {
        formMessage.textContent = "❌ پیام باید حداقل ۱۰ کاراکتر باشد.";
        formMessage.style.color = "#ff4d4d";
        return;
    }

    // Success
    formMessage.textContent = "✅ پیام شما با موفقیت ثبت شد. به زودی با شما تماس می‌گیریم!";
    formMessage.style.color = "#4CAF50";
    contactForm.reset();

    setTimeout(() => {
        formMessage.textContent = "";
    }, 5000);
});

// Clear message on input
[nameInput, emailInput, messageInput].forEach((input) => {
    input.addEventListener("input", () => {
        formMessage.textContent = "";
    });
});

console.log("✅ All systems ready!");