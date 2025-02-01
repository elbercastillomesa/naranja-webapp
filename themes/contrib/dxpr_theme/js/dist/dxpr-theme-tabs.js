/**
 * @file
 * Provides interactivity for showing and hiding the primary tabs at mobile widths.
 */

((Drupal, once) => {
  /**
   * Initialize the primary tabs.
   *
   * @param {HTMLElement} el
   *   The DOM element containing the primary tabs.
   */
  function init(el) {
    const tabs = el.querySelector("ul.tabs");
    const expandedClass = "is-expanded";
    const activeTab = tabs.querySelector("li.active");

    /**
     * Determines if primary tabs are expanded for mobile layouts.
     *
     * @return {boolean}
     *   Whether the tabs trigger element is expanded.
     */
    function isTabsMobileLayout() {
      return tabs.querySelector(".tabs__trigger").clientHeight > 0;
    }

    /**
     * Controls primary tab visibility on click events.
     *
     * @param {Event} e
     *   The event object.
     */
    function handleTriggerClick(e) {
      const s = !tabs.classList.contains(expandedClass);
      e.currentTarget.setAttribute("aria-expanded", s);
      tabs.classList.toggle(expandedClass);
    }

    if (isTabsMobileLayout() && !activeTab.matches(".tabs__tab:first-child")) {
      const newActiveTab = activeTab.cloneNode(true);
      const firstTab = tabs.querySelector(".tabs__tab:first-child");
      tabs.insertBefore(newActiveTab, firstTab);
      tabs.removeChild(activeTab);
    }

    tabs
      .querySelector(".tabs__trigger")
      .addEventListener("click", handleTriggerClick);
  }

  /**
   * Initialize the primary tabs.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Display primary tabs according to the screen width.
   */
  Drupal.behaviors.dxprPrimaryTabs = {
    attach(context) {
      once("dxpr-tabs", "[data-drupal-nav-primary-tabs]", context).forEach(
        init,
      );
    },
  };
})(Drupal, once);
