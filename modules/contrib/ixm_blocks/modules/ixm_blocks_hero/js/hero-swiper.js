(function () {
  const playVideo = (video) => {
    if (!video) return;

    if (video.tagName === "IFRAME") {
      if (video.src.includes("youtube")) {
        video.contentWindow.postMessage(
          '{"event":"command","func":"playVideo","args":""}',
          "*"
        );
      } else if (video.src.includes("vimeo")) {
        const vimeoPlayer = new Vimeo.Player(video);
        vimeoPlayer.play();
      }
    } else if (video.tagName === "VIDEO") {
      video.play();
    }
  };

  const pauseVideo = (video) => {
    if (!video) return;

    if (video.tagName === "IFRAME") {
      if (video.src.includes("youtube")) {
        video.contentWindow.postMessage(
          '{"event":"command","func":"pauseVideo","args":""}',
          "*"
        );
      } else if (video.src.includes("vimeo")) {
        const vimeoPlayer = new Vimeo.Player(video);
        vimeoPlayer.pause();
      }
    } else if (video.tagName === "VIDEO") {
      if (!video.paused) {
        video.pause();
      }
    }
  };

  const toggleAudioControls = (controls, isPlaying) => {
    if (!controls) return;

    if (isPlaying) {
      controls.classList.add("is-playing");
    } else {
      controls.classList.remove("is-playing");
    }
  };

  const handleSlideVideo = (slide, shouldPlay) => {
    const video = slide.querySelector("iframe, video");
    const audioControls = slide.querySelector(".hero__banner--audio-controls");

    if (shouldPlay) {
      playVideo(video);
      toggleAudioControls(audioControls, true);
    } else {
      pauseVideo(video);
      toggleAudioControls(audioControls, false);
    }
  };

  var heroSwiper = new Swiper(".hero-swiper", {
    slidesPerView: 1,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    on: {
      afterInit: function () {
        // Delay the video play for the first slide
        setTimeout(() => {
          handleSlideVideo(this.slides[this.activeIndex], true);
        }, 1000); // 1-second delay to ensure readiness
      },
      slideChange: function () {
        // Pause all videos and play the active one
        this.slides.forEach((slide) => handleSlideVideo(slide, false));
        handleSlideVideo(this.slides[this.activeIndex], true);
      },
    },
  });
})();
