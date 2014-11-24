jQuery(document).ready(function () {
  'use strict';

  var activeNode;

  $('.panel').on('dragstart', function (e) {
    console.log(e);
    $(this).addClass('dragging');
    activeNode = this;
  }).on('dragend', function () {
    $(this).removeClass('dragging');
  });

  $('.kanban-board').find('.kanban-column').on('dragover', function (e) {
    if (e.originalEvent.preventDefault) {
      e.preventDefault();
    }

    e.originalEvent.dataTransfer.dropEffect = 'move';

    $(this).addClass('over');
  }).on('dragleave', function () {
    $(this).removeClass('over');
  }).on('drop', function (e) {
    if (e.originalEvent.stopPropagation) {
      e.originalEvent.stopPropagation(); // stops the browser from redirecting.
    }

    var $this = $(this),
        element = activeNode,
        columnInner = $this.find('.column-inner');

    $(element).appendTo(columnInner);

    $this.removeClass('over');
  });

});
