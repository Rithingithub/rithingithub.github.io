$(document).ready(function () {
  // Mobile menu toggle
  $("#mobile-menu").click(function () {
    $(".nav-links").toggleClass("active");
  });

  // Navbar scroll effect
  $(window).scroll(function () {
    if ($(window).scrollTop() > 50) {
      $("#navbar").addClass("scrolled");
    } else {
      $("#navbar").removeClass("scrolled");
    }

    // Update active nav link
    let scrollPos = $(window).scrollTop() + 100;
    $(".nav-links a").each(function () {
      let href = $(this).attr("href");
      if (href.startsWith("#")) {
        let section = $(href);
        if (section.length) {
          let sectionTop = section.offset().top;
          let sectionBottom = sectionTop + section.outerHeight();

          if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
            $(".nav-links a").removeClass("active");
            $(this).addClass("active");
          }
        }
      }
    });

    // Fade in animation
    $(".fade-in").each(function () {
      let elementTop = $(this).offset().top;
      let windowBottom = $(window).scrollTop() + $(window).height() - 100;

      if (elementTop < windowBottom) {
        $(this).addClass("visible");
      }
    });

    // Scroll progress indicator
    const scrollTop = $(window).scrollTop();
    const docHeight = $(document).height() - $(window).height();
    const scrollPercent = (scrollTop / docHeight) * 100;
    $(".scroll-progress").css("width", scrollPercent + "%");
  });

  // Smooth scrolling
  $('a[href^="#"]').on("click", function (e) {
    e.preventDefault();

    let target = this.hash;
    let $target = $(target);

    if ($target.length) {
      $("html, body").animate(
        {
          scrollTop: $target.offset().top - 80,
        },
        600,
        "swing"
      );
    }
  });

  // Create floating particles
  function createParticles() {
    const particlesContainer = $(".particles");
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      const particle = $('<div class="particle"></div>');
      particle.css({
        left: Math.random() * 100 + "%",
        top: Math.random() * 100 + "%",
        animationDelay: Math.random() * 6 + "s",
        animationDuration: Math.random() * 3 + 3 + "s",
      });
      particlesContainer.append(particle);
    }
  }

  // Initialize particles
  createParticles();

  // Contact form submission
  $("form").on("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = {
      name: $('input[name="name"]').val(),
      email: $('input[name="email"]').val(),
      subject: $('input[name="subject"]').val(),
      message: $('textarea[name="message"]').val(),
    };

    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields.");
      return;
    }

    // Simulate form submission
    const submitBtn = $(this).find('button[type="submit"]');
    const originalText = submitBtn.text();

    submitBtn.text("Sending...").prop("disabled", true);

    // Simulate API call
    setTimeout(() => {
      alert("Thank you for your message! I'll get back to you soon.");
      this.reset();
      submitBtn.text(originalText).prop("disabled", false);
    }, 2000);
  });

  // Trigger initial fade-in animation
  setTimeout(() => {
    $(".fade-in").each(function () {
      let elementTop = $(this).offset().top;
      let windowBottom = $(window).scrollTop() + $(window).height();

      if (elementTop < windowBottom) {
        $(this).addClass("visible");
      }
    });
  }, 100);

  // Add typing effect to hero title
  function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.text("");

    function type() {
      if (i < text.length) {
        element.text(element.text() + text.charAt(i));
        i++;
        setTimeout(type, speed);
      }
    }
    type();
  }

  // Initialize typing effect after a short delay
  setTimeout(() => {
    typeWriter($(".hero-title"), "Rithin Lehan", 150);
  }, 1000);

  // Add scroll progress indicator
  $("body").prepend(
    '<div class="scroll-indicator"><div class="scroll-progress"></div></div>'
  );
});

