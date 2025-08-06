/**
 * Slider functionality for the frontend.
 */
(() => {
  document.addEventListener("DOMContentLoaded", () => {
    initSliders();
  });

  function initSliders() {
    const sliders = document.querySelectorAll(".slider-container");

    sliders.forEach((sliderContainer) => {
      const slider = sliderContainer.querySelector(".slider");
      const track = slider.querySelector(".slider-track");
      const slides = track.children;
      const prevBtn = slider.querySelector(".slider-prev");
      const nextBtn = slider.querySelector(".slider-next");
      const dotsContainer = slider.querySelector(".slider-dots");

      // Skip if no slides
      if (slides.length === 0) return;

      // Configuration
      const autoplay = sliderContainer.dataset.autoplay === "true";
      const autoplaySpeed =
        Number.parseInt(sliderContainer.dataset.autoplaySpeed, 10) || 5000;
      const showDots = sliderContainer.dataset.showDots === "true";

      // State
      let currentSlide = 0;
      let autoplayInterval;

      // Initialize
      setupSlider();

      function setupSlider() {
        // Set initial position
        updateSlidePosition();

        // Create dots
        if (showDots && dotsContainer) {
          createDots();
        }

        // Add event listeners
        if (prevBtn) prevBtn.addEventListener("click", goToPrevSlide);
        if (nextBtn) nextBtn.addEventListener("click", goToNextSlide);

        // Start autoplay if enabled
        if (autoplay) {
          startAutoplay();

          // Pause on hover
          sliderContainer.addEventListener("mouseenter", stopAutoplay);
          sliderContainer.addEventListener("mouseleave", startAutoplay);
        }
      }

      function createDots() {
        for (let i = 0; i < slides.length; i++) {
          const dot = document.createElement("button");
          dot.classList.add("dot");
          dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
          dot.addEventListener("click", () => goToSlide(i));

          if (i === currentSlide) {
            dot.classList.add("active");
          }

          dotsContainer.appendChild(dot);
        }
      }

      function updateSlidePosition() {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;

        // Update active dot
        if (dotsContainer) {
          const dots = dotsContainer.querySelectorAll(".dot");
          dots.forEach((dot, index) => {
            if (index === currentSlide) {
              dot.classList.add("active");
            } else {
              dot.classList.remove("active");
            }
          });
        }
      }

      function goToSlide(index) {
        currentSlide = index;
        updateSlidePosition();

        // Reset autoplay
        if (autoplay) {
          stopAutoplay();
          startAutoplay();
        }
      }

      function goToNextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlidePosition();
      }

      function goToPrevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlidePosition();
      }

      function startAutoplay() {
        if (autoplayInterval) return;
        autoplayInterval = setInterval(goToNextSlide, autoplaySpeed);
      }

      function stopAutoplay() {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
      }
    });
  }
})();
