/**
 * Stats counter.
 */
(function ($, Drupal) {

  var controller = new ScrollMagic.Controller();

  // Animate the statistic up with commas.
  function animateNumber() {
    $(".js-count").each(function () {
      var $this = $(this),
        countTo = $this.attr("data-count"),
        countDuration = $this.attr("data-duration");

      $({countNum: $this.text()}).animate(
        {
          countNum: countTo
        },
        {
          duration: countDuration ? parseInt(countDuration) : 3000,
          easing: "linear",
          step: function () {
            // Count up with commas
            $this.text(Math.floor(this.countNum).toLocaleString("en"));
          },
          complete: function () {
            // Add comma after done counting
            $this.text(this.countNum.toLocaleString("en"));
          }
        }
      );
    });
  }

  // Set the counter back to 0.
  function resetNumber() {
    $(".js-count").each(function () {
      $(this).text('0');
    });
  }

  // When scrolling in & out of view.
  new ScrollMagic.Scene({
    triggerElement: ".ixm-stats-block"
  })
  .on("enter", function () {
    $(".ixm-stats-block").addClass("ixm-stats-block-animated");
    animateNumber();
  })
  .on("leave", function () {
    $(".ixm-stats-block").removeClass("ixm-stats-block-animated");
    resetNumber();
  })
  .addTo(controller);

})(jQuery, Drupal);
