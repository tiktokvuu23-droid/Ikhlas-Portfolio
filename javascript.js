// Typing Animation with Premium feel
const textArray = ["DEVELOPER ISHAN", "Tournament Architect", "Full-Stack Creator"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingElement = document.getElementById("typing");

function typeEffect() {
    if (!typingElement) return;
    const current = textArray[textIndex];
    if (isDeleting) {
        typingElement.innerHTML = current.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
        }
        setTimeout(typeEffect, 80);
    } else {
        typingElement.innerHTML = current.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
        } else {
            setTimeout(typeEffect, 120);
        }
    }
}

// Mobile Menu Toggle
function toggleMenu() {
    const nav = document.getElementById("navMenu");
    if (nav.style.display === "flex") {
        nav.style.display = "none";
    } else {
        nav.style.display = "flex";
        nav.style.flexDirection = "column";
        nav.style.position = "absolute";
        nav.style.top = "70px";
        nav.style.left = "0";
        nav.style.width = "100%";
        nav.style.background = "rgba(10, 15, 30, 0.98)";
        nav.style.backdropFilter = "blur(16px)";
        nav.style.padding = "25px";
        nav.style.gap = "20px";
        nav.style.borderBottom = "1px solid #38bdf8";
    }
}

// Payment Modal
function openPayment(name, number, type) {
    document.getElementById("methodName").innerHTML = name + " Payment";
    document.getElementById("methodNumber").innerText = number;
    document.getElementById("methodType").innerText = type;
    document.getElementById("paymentModal").style.display = "block";
}

function closeModal() {
    document.getElementById("paymentModal").style.display = "none";
}

// Close modal on outside click
window.onclick = function(event) {
    const modal = document.getElementById("paymentModal");
    if (event.target === modal) closeModal();
}

// Contact Form with Telegram Integration + Premium Validation
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();
    
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    
    if (!name || !email || !message) {
        alert("⚠️ Please fill all fields to reach the expert.");
        return;
    }
    
    const botToken = "8743428726:AAECq5QEsSS6vWcGfYDWVZS4OOTyKyRPhOg";
    const chatId = "7397424367";
    
    const telegramMessage = `🚀 *New Portfolio Inquiry*\n\n` +
        `👤 *Name:* ${name}\n` +
        `📧 *Email:* ${email}\n` +
        `💬 *Message:* ${message}\n` +
        `🔗 From Dev Ishan Portfolio`;
    
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const data = {
        chat_id: chatId,
        text: telegramMessage,
        parse_mode: "Markdown"
    };
    
    const submitBtn = e.target.querySelector(".submit-btn");
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = "Sending... <i class='fas fa-spinner fa-pulse'></i>";
    submitBtn.disabled = true;
    
    fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            alert("✅ Message delivered! I'll get back to you ASAP.");
            document.getElementById("contactForm").reset();
        } else {
            alert("❌ Delivery failed. Please reach me on Telegram directly.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("⚠️ Network error. Try again or DM on Telegram.");
    })
    .finally(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
});

// Scroll animation for telegram button (premium addition)
window.addEventListener('scroll', function() {
    const supportBtn = document.querySelector('.telegram-float');
    if (supportBtn) {
        if (window.scrollY > 200) {
            supportBtn.style.opacity = "1";
            supportBtn.style.transform = "scale(1)";
        } else {
            supportBtn.style.opacity = "0.9";
        }
    }
});

// Start typing on load
window.addEventListener("load", () => {
    typeEffect();
    
    // Add subtle parallax effect to hero
    const hero = document.querySelector('.hero');
    if (hero) {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth) * 20;
            const y = (e.clientY / window.innerHeight) * 20;
            hero.style.transform = `translate(${x * 0.05}px, ${y * 0.05}px)`;
        });
    }
    
    // Close mobile menu on clicking a link
    const navLinks = document.querySelectorAll('#navMenu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const nav = document.getElementById('navMenu');
            if (window.innerWidth <= 768) nav.style.display = 'none';
        });
    });
});

// Optional: Smooth scroll with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === "#") return;
        const target = document.querySelector(targetId);
        if (target) {
            const offset = 80;
            const position = target.offsetTop - offset;
            window.scrollTo({ top: position, behavior: "smooth" });
        }
    });
});