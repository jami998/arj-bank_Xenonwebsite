// Initialize AOS (Animate on Scroll)
document.addEventListener("DOMContentLoaded", () => {
    // Check if AOS is already defined
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 800,
        easing: "ease",
        once: true,
        offset: 100,
      })
    } else {
      console.warn("AOS is not defined. Make sure AOS library is included.")
    }
  
    // Initialize other scripts after DOM is loaded
    initMobileNav()
    initHeaderScroll()
    initTestimonialSlider()
    initSmoothScrolling()
    initAnimationOnScroll()
    initFaqAccordion()
    initBackToTop()
    initCustomCursor()
  })
  
  // Mobile Navigation Toggle
  function initMobileNav() {
    const hamburger = document.getElementById("hamburger")
    const navLinks = document.getElementById("navLinks")
  
    if (hamburger && navLinks) {
      hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active")
        navLinks.classList.toggle("active")
      })
  
      // Close mobile menu when clicking on a nav link
      const navItems = document.querySelectorAll(".nav-links ul li a")
      navItems.forEach((item) => {
        item.addEventListener("click", () => {
          hamburger.classList.remove("active")
          navLinks.classList.remove("active")
        })
      })
    }
  }
  
  // Header scroll effect
  function initHeaderScroll() {
    const header = document.querySelector("header")
    if (header) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
          header.classList.add("scrolled")
        } else {
          header.classList.remove("scrolled")
        }
      })
    }
  }
  
  // Testimonial Slider
  function initTestimonialSlider() {
    const testimonialSlider = document.getElementById("testimonialSlider")
    const prevBtn = document.getElementById("prevBtn")
    const nextBtn = document.getElementById("nextBtn")
  
    if (testimonialSlider && prevBtn && nextBtn) {
      const testimonials = testimonialSlider.querySelectorAll(".testimonial-card")
      let currentIndex = 0
  
      // Hide all testimonials except the first one
      testimonials.forEach((testimonial, index) => {
        if (index !== 0) {
          testimonial.style.display = "none"
        }
      })
  
      // Show next testimonial
      nextBtn.addEventListener("click", () => {
        testimonials[currentIndex].style.display = "none"
        currentIndex = (currentIndex + 1) % testimonials.length
        testimonials[currentIndex].style.display = "block"
      })
  
      // Show previous testimonial
      prevBtn.addEventListener("click", () => {
        testimonials[currentIndex].style.display = "none"
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length
        testimonials[currentIndex].style.display = "block"
      })
  
      // Auto slide every 5 seconds
      setInterval(() => {
        nextBtn.click()
      }, 5000)
    }
  }
  
  // Smooth scrolling for anchor links
  function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        if (targetId === "#") return
  
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: "smooth",
          })
        }
      })
    })
  }
  
  // Animation on scroll
  function initAnimationOnScroll() {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll(".feature-card, .impact-card, .story-card")
  
      elements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top
        const screenPosition = window.innerHeight / 1.3
  
        if (elementPosition < screenPosition) {
          element.style.opacity = "1"
          element.style.transform = "translateY(0)"
        }
      })
    }
  
    // Set initial styles for animation
    const elements = document.querySelectorAll(".feature-card, .impact-card, .story-card")
  
    elements.forEach((element) => {
      element.style.opacity = "0"
      element.style.transform = "translateY(20px)"
      element.style.transition = "opacity 0.5s ease, transform 0.5s ease"
    })
  
    // Trigger animation for elements in view on page load
    animateOnScroll()
  
    // Listen for scroll to trigger animations
    window.addEventListener("scroll", animateOnScroll)
  }
  
  // FAQ Accordion
  function initFaqAccordion() {
    const faqItems = document.querySelectorAll(".faq-item")
  
    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question")
  
      question.addEventListener("click", () => {
        // Close all other items
        faqItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove("active")
          }
        })
  
        // Toggle current item
        item.classList.toggle("active")
      })
    })
  }
  
  // Back to Top Button
  function initBackToTop() {
    const backToTopButton = document.getElementById("backToTop")
  
    if (backToTopButton) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 500) {
          backToTopButton.classList.add("visible")
        } else {
          backToTopButton.classList.remove("visible")
        }
      })
  
      backToTopButton.addEventListener("click", () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      })
    }
  }
  
  // Custom Cursor
  function initCustomCursor() {
    const cursor = document.querySelector(".cursor")
    const cursorFollower = document.querySelector(".cursor-follower")
  
    if (cursor && cursorFollower && window.innerWidth > 1024) {
      document.addEventListener("mousemove", (e) => {
        cursor.style.left = e.clientX + "px"
        cursor.style.top = e.clientY + "px"
  
        setTimeout(() => {
          cursorFollower.style.left = e.clientX + "px"
          cursorFollower.style.top = e.clientY + "px"
        }, 100)
      })
  
      // Change cursor on hover over buttons and links
      const hoverElements = document.querySelectorAll("a, button, .feature-card, .story-card, .faq-question")
  
      hoverElements.forEach((element) => {
        element.addEventListener("mouseenter", () => {
          cursor.style.width = "20px"
          cursor.style.height = "20px"
          cursorFollower.style.width = "40px"
          cursorFollower.style.height = "40px"
        })
  
        element.addEventListener("mouseleave", () => {
          cursor.style.width = "10px"
          cursor.style.height = "10px"
          cursorFollower.style.width = "30px"
          cursorFollower.style.height = "30px"
        })
      })
    }
  }
  
  // Newsletter Form Submission
  const newsletterForm = document.querySelector(".newsletter-form")
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const emailInput = newsletterForm.querySelector('input[type="email"]')
  
      if (emailInput.value) {
        // Simulate form submission
        const submitButton = newsletterForm.querySelector("button")
        submitButton.textContent = "Subscribing..."
  
        setTimeout(() => {
          submitButton.textContent = "Subscribed!"
          emailInput.value = ""
  
          // Reset after 3 seconds
          setTimeout(() => {
            submitButton.textContent = "Subscribe"
          }, 3000)
        }, 1500)
      }
    })
  }
  