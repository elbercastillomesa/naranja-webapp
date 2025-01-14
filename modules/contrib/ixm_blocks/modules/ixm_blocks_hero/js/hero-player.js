(function (Drupal, drupalSettings, once) {
  class HeroBannerPlayer {
    constructor(heroBanner) {
      this.heroBanner = heroBanner;
      this.audioControls = heroBanner.querySelector(".hero__banner--audio-controls");
      this.initPlayer();
    }

    initPlayer() {
      const playerMap = {
        ".hero__banner-video--html5-player": this.initHTML5Player,
        ".hero__banner-video--vimeo-player": this.initVimeoPlayer,
        ".hero__banner-video--youtube-player": this.initYouTubePlayer,
      };

      for (const [selector, initFn] of Object.entries(playerMap)) {
        const element = this.heroBanner.querySelector(selector);
        if (element) {
          initFn.call(this, element);
          return;
        }
      }
    }

    attachControls(playFn, pauseFn, unmuteFn, muteFn) {
      const events = {
        ".hero__banner--btn-play": playFn,
        ".hero__banner--btn-pause": pauseFn,
        ".hero__banner--btn-unmute": unmuteFn,
        ".hero__banner--btn-mute": muteFn,
      };

      for (const [selector, handler] of Object.entries(events)) {
        const button = this.heroBanner.querySelector(selector);
        if (button) {
          button.addEventListener("click", () => {
            handler();
            this.updateControlsState(selector);
          });
        }
      }
    }

    updateControlsState(selector) {
      if (selector.includes("play")) {
        this.audioControls.classList.add("is-playing");
      }
      if (selector.includes("pause")) {
        this.audioControls.classList.remove("is-playing");
      }
      if (selector.includes("unmute")) {
        this.audioControls.classList.remove("is-muted");
      }
      if (selector.includes("mute") && !selector.includes("unmute")) {
        this.audioControls.classList.add("is-muted");
      }
    }

    initHTML5Player(video) {
      video.currentTime = 0;
      this.attachControls(
        () => video.play(),
        () => video.pause(),
        () => (video.muted = false),
        () => (video.muted = true)
      );
    }

    initVimeoPlayer(iframe) {
      const options = { loop: true };
      const player = new Vimeo.Player(iframe, options);
      player.setVolume(0);

      this.attachControls(
        () => player.play().catch(console.error),
        () => player.pause().catch(console.error),
        () => player.setVolume(1),
        () => player.setVolume(0)
      );
    }

    initYouTubePlayer(wrapper) {
      if (!window.YT) this.loadYouTubeAPI();

      window.onYouTubePlayerAPIReady = () => {
        const videoId = drupalSettings.heroPlayer.youtubeId;
        const player = new YT.Player(wrapper, {
          videoId,
          playerVars: {
            modestbranding: true,
            controls: 0,
            autohide: 1,
            wmode: "opaque",
            showinfo: 0,
            loop: 1,
            rel: 0,
          },
          events: {
            onReady: () => {
              player.mute();
            },
          },
        });

        this.attachControls(
          () => player.playVideo(),
          () => player.pauseVideo(),
          () => player.unMute(),
          () => player.mute()
        );
      };
    }

    loadYouTubeAPI() {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/player_api";
      document.head.appendChild(script);
    }
  }

  class HeroCarouselController {
    constructor(carousel) {
      this.carousel = carousel;
      this.initCarouselEvents();
      this.autoplayFirstSlide();
    }

    initCarouselEvents() {
      this.carousel.addEventListener('slid.bs.carousel', () => {
        const activeSlide = this.carousel.querySelector('.carousel-item.active');
        const allVideos = this.carousel.querySelectorAll('iframe, video');

        // Pause all videos and remove `is-playing` class
        allVideos.forEach((video) => this.pauseVideo(video));
        this.togglePlayingClass(null, false);

        // Play the active video's video
        const activeVideo = activeSlide.querySelector('iframe, video');
        if (activeVideo) {
          this.playVideo(activeVideo);
          this.togglePlayingClass(activeSlide, true);
        }
      });

      // Ensure all videos are paused initially
      const allVideos = this.carousel.querySelectorAll('iframe, video');
      allVideos.forEach((video) => this.pauseVideo(video));
    }

    autoplayFirstSlide() {
      // Use a small delay to ensure the carousel is fully initialized and the first slide has the "active" class
      setTimeout(() => {
        const firstSlide = this.carousel.querySelector('.carousel-item.active');
        const firstVideo = firstSlide ? firstSlide.querySelector('iframe, video') : null;

        if (firstVideo) {
          this.playVideo(firstVideo);
          this.togglePlayingClass(firstSlide, true);
        }
      }, 1000); // Adjust the delay time if needed
    }

    playVideo(videoElement) {
      if (videoElement.tagName === 'IFRAME') {
        if (videoElement.src.includes('youtube')) {
          this.playYouTubeVideo(videoElement);
        } else if (videoElement.src.includes('vimeo')) {
          const vimeoPlayer = new Vimeo.Player(videoElement);
          vimeoPlayer.play();
        }
      } else if (videoElement.tagName === 'VIDEO') {
        videoElement.play();
      }
    }

    pauseVideo(videoElement) {
      if (videoElement.tagName === 'IFRAME') {
        if (videoElement.src.includes('youtube')) {
          this.pauseYouTubeVideo(videoElement);
        } else if (videoElement.src.includes('vimeo')) {
          const vimeoPlayer = new Vimeo.Player(videoElement);
          vimeoPlayer.pause();
        }
      } else if (videoElement.tagName === 'VIDEO') {
        videoElement.pause();
      }
    }

    playYouTubeVideo(iframe) {
      iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    }

    pauseYouTubeVideo(iframe) {
      iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    }

    togglePlayingClass(slide, isPlaying) {
      const audioControls = slide?.querySelector('.hero__banner--audio-controls');
      if (audioControls) {
        audioControls.classList.toggle('is-playing', isPlaying);
      }
    }
  }


  Drupal.behaviors.heroBannerPlayer = {
    attach: function (context, settings) {
      // Initialize Hero Banners
      once("hero-banner-player", ".hero__banner", context).forEach((heroBanner) => {
        new HeroBannerPlayer(heroBanner);
      });

      // Initialize Hero Carousels
      once("hero-carousel-controller", ".hero-carousel", context).forEach((carousel) => {
        new HeroCarouselController(carousel);
      });
    },
  };
})(Drupal, drupalSettings, once);
