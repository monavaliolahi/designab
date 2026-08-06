console.log("disegnabloaded");

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

const backtotopbutton = document.querySelector("#backtotop");

const menuToggle = document.querySelector("#menutoggle");
const nav = document.querySelector("nav");

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

    if (name === "") {

        formMessage.textContent = "لطفاً نام خود را وارد کنید.";
        formMessage.style.color = "#ff4d4d";

        return;
    }

    if (email === "") {

        formMessage.textContent = "لطفاً ایمیل خود را وارد کنید.";
        formMessage.style.color = "#ff4d4d";
    
        return;
    }
    
    if (!emailPattern.test(email)) {

        formMessage.textContent = "ایمیل معتبر نیست.";
        formMessage.style.color = "#ff4d4d";
    
        return;
    }

    if (message === "") {

        formMessage.textContent = "لطفاً پیام خود را وارد کنید.";
        formMessage.style.color = "#ff4d4d";
    
        return;
    }
    
    if (message.length < 10) {
    
        formMessage.textContent = "پیام باید حداقل ۱۰ کاراکتر باشد.";
        formMessage.style.color = "#ff4d4d";
    
        return;
    }

    formMessage.textContent = "✅ پیام شما با موفقیت ثبت شد.";
formMessage.style.color = "#4CAF50";

contactForm.reset();

formMessage.textContent = "✅ پیام شما با موفقیت ثبت شد.";
formMessage.style.color = "#4CAF50";

contactForm.reset();

setTimeout(() => {
    formMessage.textContent = "";
}, 3000);

});

[nameInput, emailInput, messageInput].forEach(input => {

    input.addEventListener("input", () => {

        formMessage.textContent = "";

    });

});

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectiontop = section.offsetTop;
        const sectionheight = section.offsetHeight;
        if(window.scrollY >= sectiontop-200){
            current = section.getAttribute("id");
        }
    });
    navLinks.forEach(link => {
        link.classList.remove("active");
        if(link.getAttribute("href") === "#" + current){
            link.classList.add("active")
        }
    });
});

window.addEventListener("scroll", () =>{
    if(window.scrollY > 500){
        backtotopbutton.classList.add("show");
    }
    else{
        backtotopbutton.classList.remove("show");
    }
});
backtotopbutton.addEventListener("click", () => {
    window.scrollTo({
        top:0,
        behavior:"smooth"
    });
});

menuToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
    if (nav.classList.contains("open")) {
        menuToggle.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    }
    else {
        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }
});

 navLinks.forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
 });

 /* ======================================
   Scroll Reveal
========================================= */

const revealElements = document.querySelectorAll(
    ".service-card, .portfolio-card"
    );
    
function revealOnScroll() {
    revealElements.forEach(element => {
        const windowHeight = window.innerHeight;
        const revealTop = element.getBoundingClientRect().top;

        if (revealTop < windowHeight - 100) {
            element.classList.add("active");
        }
    });
}

revealElements.forEach((element, index) => {
    element.classList.add("reveal");
    element.style.transitionDelay = `${index * 0.15}s`;
});

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();


const cards = document.querySelectorAll(".service-card");

cards.forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty("--x", `${x}px`);
        card.style.setProperty("--y", `${y}px`);

    });

});

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

});

sections.forEach(section=>{

    section.classList.add("hidden");

    observer.observe(section);

});

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            const counter = entry.target;

            const target = +counter.dataset.target;

            let count = 0;

            const update = ()=>{

                const increment = Math.ceil(target/50);

                count += increment;

                if(count >= target){

                    counter.innerText = target + "+";

                }else{

                    counter.innerText = count;

                    requestAnimationFrame(update);

                }

            };

            update();

            counterObserver.unobserve(counter);

        }

    });

});

counters.forEach(counter=>{

    counterObserver.observe(counter);

});

window.addEventListener("load",()=>{

    const loader=document.querySelector("#loader");

    setTimeout(()=>{

        loader.classList.add("hide");

    },1200);

});

const spotlight = document.querySelector("#spotlight");

document.addEventListener("mousemove",(e)=>{

    spotlight.style.left = e.clientX + "px";
    spotlight.style.top  = e.clientY + "px";

});

const tiltCards = document.querySelectorAll(".service-card, .portfolio-card");

tiltCards.forEach(card => {

    card.addEventListener("mousemove",(e)=>{

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = ((x / rect.width)-0.5)*10;
        const rotateX = ((y / rect.height)-0.5)*-10;

        card.style.transform =
        `perspective(900px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-8px)`;

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform =
        "perspective(900px) rotateX(0) rotateY(0) translateY(0)";

    });

});