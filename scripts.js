document.addEventListener("DOMContentLoaded", () => {
  const darkModeToggle = document.getElementById("darkModeToggle");

  // Check for saved theme preference or default to light mode
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);

  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";

      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
    });
  }

  const animatedText = document.getElementById("animatedText");
  if (animatedText) {
    const texts = ["Ezra Ariwomoi", "a software developer"];
    let currentIndex = 0;
    let currentText = "";
    let isDeleting = false;
    let charIndex = 0;

    function typeWriter() {
      const fullText = texts[currentIndex];

      if (isDeleting) {
        // Backspacing
        currentText = fullText.substring(0, charIndex - 1);
        charIndex--;
      } else {
        // Typing
        currentText = fullText.substring(0, charIndex + 1);
        charIndex++;
      }

      animatedText.textContent = currentText;

      let typeSpeed = 100;

      if (isDeleting) {
        typeSpeed = 50;
      }

      // Check if word is complete
      if (!isDeleting && charIndex === fullText.length) {
        // Pause at end of word
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        // Move to next word
        isDeleting = false;
        currentIndex = (currentIndex + 1) % texts.length;
        typeSpeed = 500;
      }

      setTimeout(typeWriter, typeSpeed);
    }

    setTimeout(typeWriter, 1000);
  }

  const menuToggles = document.querySelectorAll(".menu-toggle");

  menuToggles.forEach((toggle) => {
    toggle.addEventListener("click", function () {
      const navId = this.getAttribute("aria-controls");
      const navList = document.getElementById(navId);

      if (navList) {
        const isExpanded = this.getAttribute("aria-expanded") === "true";
        this.setAttribute("aria-expanded", !isExpanded);
        navList.classList.toggle("show");
      }
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navList = document.getElementById("mobileNav");
  const overlay = document.querySelector(".nav-overlay");

  menuToggle.addEventListener("click", () => {
    navList.classList.toggle("show");
    menuToggle.classList.toggle("active");
    overlay.classList.toggle("show");
  });

  overlay.addEventListener("click", () => {
    navList.classList.remove("show");
    menuToggle.classList.remove("active");
    overlay.classList.remove("show");
  });
});

  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = this.name.value.trim();
      const email = this.email.value.trim();
      const subject = this.subject ? this.subject.value.trim() : "";
      const message = this.message.value.trim();

      // Validation
      if (name === "" || email === "" || message === "") {
        showMessage("Please fill out all required fields.", "error");
        return;
      }

      if (
        this.subject &&
        this.subject.hasAttribute("required") &&
        subject === ""
      ) {
        showMessage("Please select a project type.", "error");
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.match(emailPattern)) {
        showMessage("Please enter a valid email address.", "error");
        return;
      }

      if (message.length < 10) {
        showMessage(
          "Please provide more details about your project (minimum 10 characters).",
          "error"
        );
        return;
      }

      showMessage(
        `Thank you for reaching out, ${name}! I'll review your message and get back to you within 24 hours.`,
        "success"
      );

      this.reset();
    });
  }

  function showMessage(text, type) {
    const messageBox = document.getElementById("formMessages");
    if (!messageBox) return;

    messageBox.innerHTML = "";

    const message = document.createElement("div");
    message.className = `form-message ${type}`;
    message.textContent = text;
    message.style.cssText = `
    padding: 1rem;
    margin-top: 1rem;
    border-radius: 8px;
    font-weight: 500;
    animation: fadeIn 0.3s ease-out;
    ${
      type === "success"
        ? "background: #d4edda; color: #155724; border: 1px solid #c3e6cb;"
        : "background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;"
    }
  `;

    messageBox.appendChild(message);

    setTimeout(() => {
      if (message.parentNode) {
        message.remove();
      }
    }, 5000);
  }

  const internalLinks = document.querySelectorAll('a[href^="#"]');
  internalLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});
