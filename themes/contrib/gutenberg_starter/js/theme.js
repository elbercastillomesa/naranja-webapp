((Drupal, once) => {
  Drupal.behaviors.gsMessages = {
    attach: function (context, settings) {
      once('gsMessages', 'div[data-drupal-messages]', context).forEach(
        function (element) {
          const closeButton = document.createElement('button');
          closeButton.classList.add('close');
          closeButton.setAttribute('type', 'button');
          closeButton.setAttribute('data-dismiss', 'alert');
          closeButton.setAttribute('aria-label', 'Close');
          closeButton.onclick = function() {
            element.classList.remove('show');
          };
          const closeIcon = document.createElement('span');
          closeIcon.setAttribute('aria-hidden', 'true');
          closeIcon.innerHTML = '&times;';
          closeButton.appendChild(closeIcon);
          const messages = element.querySelector('.messages');
          messages.insertBefore(closeButton, messages.firstChild);

          element.classList.add('show');
          setTimeout(function(){ element.classList.remove('show'); }, 10000);
        }
      );  
    }
  }
})(Drupal, once);