// Debounced scroll event to toggle navbar background
const handleNavbarScroll = () => {
  const navbar = document.querySelector("header");
  const upperSticky = document.querySelector('.upper-arow-sticky')
  window.addEventListener("scroll", () => {
    if (window.scrollY > 90) {
      upperSticky.classList.add('run')
      navbar.classList.add("scrolled");
    } else {
      upperSticky.classList.remove('run')
      navbar.classList.remove("scrolled");
    }
  });
};

// Handle opening and closing of the menu
const handleMenuToggle = () => {
  const headerMenu = document.querySelector(".header-menu");
  const menuIcon = document.querySelector("#menuIcon");
  const closeIcon = document.querySelector("#closeIcon");
  const toggleMenu = (e) => {
    e.stopPropagation();
    headerMenu.classList.toggle("open-menu");
    menuIcon.classList.toggle("hidden");
    closeIcon.classList.toggle("hidden");
  };
  menuIcon.addEventListener("click", toggleMenu);
  closeIcon.addEventListener("click", toggleMenu);
};

// Custom Cursor
const handleCustomCursor = () => {
  const cursor = document.getElementById("cursor");
  if (!cursor) return;

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  Object.assign(cursor.style, {
    position: "fixed",
    pointerEvents: "none",
    zIndex: "10000",
    width: "35px",
    height: "35px",
    borderRadius: "50%",
    transform: "translate(-50%, -50%)",
    top: "0px",
    left: "0px",
    background: "transparent",
    border: "2px solid #EEFF00",
    boxShadow: "0 0 12px #EEFF00, 0 0 30px #EEFF00, inset 0 0 10px rgba(238,255,0,0.2)",
    transition: "width 0.3s ease, height 0.3s ease, box-shadow 0.3s ease",
  });

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  const animate = () => {
    cursorX += (mouseX - cursorX) * 0.12;
    cursorY += (mouseY - cursorY) * 0.12;
    cursor.style.left = cursorX + "px";
    cursor.style.top = cursorY + "px";
    requestAnimationFrame(animate);
  };
  animate();

  document.querySelectorAll("a, button, .service-card, .portfolio-card").forEach(el => {
    el.addEventListener("mouseenter", () => {
      cursor.style.width = "60px";
      cursor.style.height = "60px";
      cursor.style.boxShadow = "0 0 25px #EEFF00, 0 0 60px #EEFF00, 0 0 100px rgba(238,255,0,0.4), inset 0 0 20px rgba(238,255,0,0.3)";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.width = "35px";
      cursor.style.height = "35px";
      cursor.style.boxShadow = "0 0 12px #EEFF00, 0 0 30px #EEFF00, inset 0 0 10px rgba(238,255,0,0.2)";
    });
  });
};

// Toast Notification System
const showToast = (title, message, variant = "success") => {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast-${variant}`;
  
  const icon = variant === "success" ? "check-circle" : "alert-circle";
  
  toast.innerHTML = `
    <i data-lucide="${icon}"></i>
    <div class="toast-content">
      <h4>${title}</h4>
      <p>${message}</p>
    </div>
  `;

  container.appendChild(toast);
  lucide.createIcons(); // Initialize the new icon

  // Auto remove
  setTimeout(() => {
    toast.style.animation = "toastOut 0.4s forwards";
    setTimeout(() => toast.remove(), 400);
  }, 5000);
};

// EmailJS (Now Web3Forms)
const handleEmailSubmission = (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const submitButton = form.querySelector('button[type="submit"]');
  const originalText = submitButton.innerText;

  submitButton.innerText = "Sending...";
  submitButton.disabled = true;

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: formData
  })
    .then(response => response.json())
    .then(result => {
      if (result.success) {
        showToast("Message Sent ✅", "Thanks for contacting me. I’ll get back to you soon.");
        form.reset();
      } else {
        showToast("Error ❌", result.message || "Something went wrong.", "error");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      showToast("Error ❌", "Message failed to send. Please try again later.", "error");
    })
    .finally(() => {
      submitButton.innerText = originalText;
      submitButton.disabled = false;
    });
};

// GSAP Animations
const initializeAnimations = () => {
  lucide.createIcons();
  gsap.registerPlugin(ScrollTrigger);
  if(window.innerWidth > 768){
    startDesktopAnimations();
  }
};

const startDesktopAnimations = () => {
  const tl = gsap.timeline();
  tl.from(".header-logo .logo", { y: -50, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.8") 
    .from("header li", { y: -50, opacity: 0, duration: 1, ease: "power3.out", stagger: 0.2 }, "-=0.8")
    .from(".hero-section .hero-left h1", { opacity: 0, y: 50, duration: 1, ease: "power3.out" }, "-=0.5")
    .from(".hero-section .hero-left p", { opacity: 0, y: 50, duration: 1, ease: "power3.out" }, "-=0.7")
    .from(".hero-section .hero-left .hero-btns", { opacity: 0, y: 50, duration: 1, ease: "power3.out" }, "-=0.9")
    .from(".hero-section .hero-right img", { opacity: 0, scale: 0.8, duration: 1.2, ease: "power3.out" }, "-=0.7");
};

const aboutSectionAnimation = () => {
  gsap.timeline({
    scrollTrigger: {
      trigger: ".about-section",
      start: "0% 70%",
      end: "50% 50%",
      scrub: true,
    }
  }).to(".rounded-wrapper", { height: 0, marginTop: 0, duration: 1.5, ease: "power3.inOut" });
};

const servicesSectionAnimation = () => {
  gsap.timeline({
    scrollTrigger: {
      trigger: ".services-section",
      start: "0% 70%",
      end: "50% 50%",
      scrub: true,
    }
  }).to(".rounded-wrapper1", { height: 0, marginTop: 0, duration: 1.5, ease: "power3.inOut" });
};

// ✅ Sab kuch DOMContentLoaded ke andar
document.addEventListener("DOMContentLoaded", () => {
  handleNavbarScroll();
  handleMenuToggle();
  handleCustomCursor();
  initializeAnimations();
  aboutSectionAnimation();
  servicesSectionAnimation();

  // ✅ Swiper bhi andar
  const swiperOptions = {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    spaceBetween: 0, // Coverflow works better with 0 spaceBetween
    slidesPerView: "auto", 
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    coverflowEffect: {
      rotate: 30,
      stretch: 0,
      depth: 100,
      modifier: 2,
      slideShadows: true,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      0: { slidesPerView: 1 },
      768: { slidesPerView: 2, centeredSlides: false },
      1024: { slidesPerView: 3, centeredSlides: true },
    }
  };

  const swiper = new Swiper(".mySwiper", swiperOptions);
  swiper.autoplay.start();
});