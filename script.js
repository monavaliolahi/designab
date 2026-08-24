console.log("designab loaded ✅");

// ===== تعریف متغیرها =====
const sections = document.querySelectorAll("section");
const nav = document.querySelector("nav");
const backtotopbutton = document.querySelector("#backtotop");

const contactForm = document.querySelector("#contactForm");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const messageInput = document.querySelector("#message");
const formMessage = document.querySelector("#formMessage");

const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");
const menuToggle = document.querySelector("#menutoggle");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ===== فرم تماس =====
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

    setTimeout(() => {
        formMessage.textContent = "";
    }, 3000);
});

// ===== پاک کردن پیام خطا هنگام تایپ =====
[nameInput, emailInput, messageInput].forEach(input => {
    input.addEventListener("input", () => {
        formMessage.textContent = "";
    });
});

// ===== اسکرول (Active Link) =====
window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectiontop = section.offsetTop;
        if (window.scrollY >= sectiontop - 200) {
            current = section.getAttribute("id");
        }
    });
    navItems.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

// ===== دکمه بازگشت به بالا =====
window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
        backtotopbutton.classList.add("show");
    } else {
        backtotopbutton.classList.remove("show");
    }
});

backtotopbutton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// ===== منو همبرگری =====
menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    if (navLinks.classList.contains("open")) {
        menuToggle.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    } else {
        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }
});

navItems.forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
});

// ===== Scroll Reveal =====
const revealElements = document.querySelectorAll(".service-card, .portfolio-card");

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

// ===== افکت موس روی کارت‌های خدمات =====
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

// ===== Intersection Observer برای بخش‌ها =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});

sections.forEach(section => {
    section.classList.add("hidden");
    observer.observe(section);
});

// ===== شمارنده‌ها (آمار) =====
const counters = document.querySelectorAll(".counter");

if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.dataset.target;
                let count = 0;

                const update = () => {
                    const increment = Math.ceil(target / 50);
                    count += increment;
                    if (count >= target) {
                        counter.innerText = target + "+";
                    } else {
                        counter.innerText = count;
                        requestAnimationFrame(update);
                    }
                };

                update();
                counterObserver.unobserve(counter);
            }
        });
    });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// ===== لودر =====
window.addEventListener("load", () => {
    const loader = document.querySelector("#loader");
    setTimeout(() => {
        loader.classList.add("hide");
    }, 1200);
});

// ===== اسپات‌لایت (نور افکت) =====
const spotlight = document.querySelector("#spotlight");

document.addEventListener("mousemove", (e) => {
    spotlight.style.left = e.clientX + "px";
    spotlight.style.top = e.clientY + "px";
});

// ===== افکت 3D روی کارت‌ها =====
const tiltCards = document.querySelectorAll(".service-card, .portfolio-card");

tiltCards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = ((x / rect.width) - 0.5) * 10;
        const rotateX = ((y / rect.height) - 0.5) * -10;

        card.style.transform =
            `perspective(900px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-8px)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform =
            "perspective(900px) rotateX(0) rotateY(0) translateY(0)";
    });
});

// ===== Lazy Loading برای تصاویر =====
document.addEventListener("DOMContentLoaded", function() {
    // انتخاب تمام تصاویر با attribute loading="lazy"
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    // اگر مرورگر از Intersection Observer پشتیبانی کند
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    // اگر تصویر دارای data-src باشد (برای تصاویر پس‌زمینه)
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback برای مرورگرهای قدیمی
        lazyImages.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
        });
    }
});

// ===== اشتراک‌گذاری در شبکه‌های اجتماعی =====
const shareButtons = document.querySelectorAll('.share-btn');

// ایجاد توست (پیام اعلان)
const toast = document.createElement('div');
toast.className = 'share-toast';
toast.textContent = 'لینک کپی شد!';
document.body.appendChild(toast);

shareButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        const platform = this.dataset.platform;
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(document.title);
        
        let shareUrl = '';
        
        switch(platform) {
            case 'telegram':
                shareUrl = `https://t.me/share/url?url=${url}&text=${title}`;
                break;
            case 'whatsapp':
                shareUrl = `https://wa.me/?text=${title}%20${url}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                break;
            case 'copy':
                // کپی لینک
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(window.location.href)
                        .then(() => {
                            showToast('✅ لینک با موفقیت کپی شد!');
                            this.classList.add('copied');
                            setTimeout(() => this.classList.remove('copied'), 2000);
                        })
                        .catch(() => {
                            // Fallback
                            copyFallback(window.location.href);
                        });
                } else {
                    // Fallback برای مرورگرهای قدیمی
                    copyFallback(window.location.href);
                }
                return;
            default:
                return;
        }
        
        // باز کردن در پنجره جدید
        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=500');
        }
    });
});

// تابع کمکی برای کپی در مرورگرهای قدیمی
function copyFallback(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
        showToast('✅ لینک با موفقیت کپی شد!');
    } catch (err) {
        showToast('❌ کپی ناموفق، لطفاً دستی کپی کنید');
    }
    document.body.removeChild(textarea);
}

// تابع نمایش توست
function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast.timeout);
    toast.timeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}