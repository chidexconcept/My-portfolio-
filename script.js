document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation Toggle
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const navItems = document.querySelectorAll(".nav-item");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      const isExpanded = navLinks.classList.contains("active");
      menuToggle.setAttribute("aria-expanded", isExpanded);
      menuToggle.innerHTML = isExpanded 
        ? '<i class="fa-solid fa-xmark"></i>' 
        : '<i class="fa-solid fa-bars"></i>';
    });

    // Close menu when clicking a link
    navItems.forEach(item => {
      item.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }

  // Active Link Highlight on Scroll
  const sections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute("id");
      const link = document.querySelector(`.nav-links a[href*=${sectionId}]`);

      if (link) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      }
    });
  });

  // Scroll Reveal Animations
  const revealElements = document.querySelectorAll(".reveal");

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        element.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // Trigger on load

  // Contact Form Handling
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      formStatus.style.color = "var(--accent-gold)";
      formStatus.innerText = "Sending message...";

      try {
        const response = await fetch(contactForm.action, {
          method: "POST",
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          formStatus.style.color = "#22c55e";
          formStatus.innerText = "Thank you! Your message has been sent successfully.";
          contactForm.reset();
        } else {
          throw new Error("Form submission failed");
        }
      } catch (error) {
        formStatus.style.color = "#ef4444";
        formStatus.innerText = "Message delivery error. Please use WhatsApp (+234 704 962 3191) or direct email.";
      }
    });
  }
});

