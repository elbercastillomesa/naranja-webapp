/**
 * Image Carousel functionality for the frontend.
 */
;(() => {
  document.addEventListener("DOMContentLoaded", () => {
    initImageCarousels()
  })

  function initImageCarousels() {
    const carousels = document.querySelectorAll(".image-carousel-content")

    carousels.forEach((carousel) => {
      const track = carousel.querySelector(".image-carousel-track")
      const slides = track.children
      const prevBtn = carousel.querySelector(".image-carousel-prev")
      const nextBtn = carousel.querySelector(".image-carousel-next")

      // Skip if no slides
      if (slides.length === 0) return

      // Configuration
      const autoplay = carousel.dataset.autoplay === "true"
      const duration = Number.parseInt(carousel.dataset.duration, 10) || 3000

      // Get the number of slides to show based on screen width
      const getVisibleSlides = () => {
        const width = window.innerWidth
        if (width < 768) {
          return Number.parseInt(carousel.dataset.mobileSlides, 10) || 1
        } else if (width < 1024) {
          return Number.parseInt(carousel.dataset.tabletSlides, 10) || 3
        } else {
          return Number.parseInt(carousel.dataset.desktopSlides, 10) || 5
        }
      }

      // State
      let currentSlide = 0
      let autoplayInterval
      let visibleSlides = getVisibleSlides()
      const totalSlides = slides.length

      // Initialize
      setupCarousel()

      function setupCarousel() {
        // Set initial slide width
        updateSlideWidth()

        // Set initial position
        updateSlidePosition()

        // Add event listeners
        if (prevBtn) prevBtn.addEventListener("click", goToPrevSlide)
        if (nextBtn) nextBtn.addEventListener("click", goToNextSlide)

        // Handle window resize
        window.addEventListener("resize", handleResize)

        // Start autoplay if enabled
        if (autoplay) {
          startAutoplay()

          // Pause on hover
          carousel.addEventListener("mouseenter", stopAutoplay)
          carousel.addEventListener("mouseleave", startAutoplay)
        }
      }

      function updateSlideWidth() {
        visibleSlides = getVisibleSlides()
        const slideWidth = 100 / visibleSlides

        for (let i = 0; i < slides.length; i++) {
          slides[i].style.width = `${slideWidth}%`
        }
      }

      function updateSlidePosition() {
        // For smooth looping, we need to handle the transition differently
        // If we're at the end and going forward, or at the beginning and going backward
        track.style.transition = "transform 0.5s ease"
        track.style.transform = `translateX(-${currentSlide * (100 / visibleSlides)}%)`
      }

      function goToSlide(index) {
        // Implement looping by wrapping around the index
        if (index < 0) {
          currentSlide = totalSlides - visibleSlides
        } else if (index > totalSlides - visibleSlides) {
          currentSlide = 0
        } else {
          currentSlide = index
        }

        updateSlidePosition()

        // Reset autoplay
        if (autoplay) {
          stopAutoplay()
          startAutoplay()
        }
      }

      function goToNextSlide() {
        // If we're at the last possible position, loop to the beginning
        if (currentSlide >= totalSlides - visibleSlides) {
          goToSlide(0)
        } else {
          goToSlide(currentSlide + 1)
        }
      }

      function goToPrevSlide() {
        // If we're at the first position, loop to the end
        if (currentSlide <= 0) {
          goToSlide(totalSlides - visibleSlides)
        } else {
          goToSlide(currentSlide - 1)
        }
      }

      function handleResize() {
        updateSlideWidth()

        // Make sure currentSlide is still valid after resize
        const maxPosition = Math.max(0, totalSlides - visibleSlides)
        if (currentSlide > maxPosition) {
          currentSlide = maxPosition
        }

        updateSlidePosition()
      }

      function startAutoplay() {
        if (autoplayInterval) return
        autoplayInterval = setInterval(goToNextSlide, duration)
      }

      function stopAutoplay() {
        clearInterval(autoplayInterval)
        autoplayInterval = null
      }
    })
  }
})()
