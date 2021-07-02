/**
 * Accordion like module.
 */

(function($) {
  $().ready(function() {
    var $accordion = $('DIV.template-custom-accordion'),
        $accordionContents = $accordion.find('.ui-accordion-content'),
        $accordionHeaders = $accordion.find('.ui-accordion-header');

    // Default state - first open.
    $accordionContents.hide();
    $accordionContents.first().show();
    $accordionHeaders.first().addClass('ui-accordion-header-active');

    $accordionHeaders.click(function() {
      var $next = $(this).next();
      $next.toggle();
      if ($next.is(':visible')) {
        $(this).addClass('ui-accordion-header-active');
      }
      else {
        $(this).removeClass('ui-accordion-header-active');
      }
    });
  });
})(jQuery);
;
/**
 * @file
 * Custom behaviors for EMTA Feedback module.
 */
(function($) {
  Drupal.behaviors.feedbackActive = {
    attach: function (context) {
      var form = $('#emta-feedback-node-form');

      if (form.length) {
        // Hide feedback container with javascript, so you could still use it without js.
        var feedback = form.find('#edit-feedback-comment-container');

        if (feedback.length) {
          feedback.hide();
        }

        // Button click adds clicked button class "active" and also on the form itself, to show feedback container.
        var btn = form.find('.form-type-radio label');

        btn.on('click', function() {
          btn.removeClass('active');
          $(this).addClass('active');
          $(this).prev('input').prop('checked', 'checked');

          $(this).parents('form').addClass('active');
        });
      }
    }
  };
})(jQuery);;
