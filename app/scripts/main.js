require.config({
  paths: {
    'jquery': '../bower_components/jquery/dist/jquery.min',
    'jquery-ui': '../bower_components/jquery-ui/ui',
    'bootstrap': '../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap'
  },
  shim: {
    'bootstrap': {
      deps: ['jquery']
    }
  }
});
require([
  'jquery',
  'jquery-ui/draggable',
  'jquery-ui/droppable',
  'jquery-ui/sortable',
  'bootstrap'
], function ($) {
  'use strict';

  var activeNode;

  $('.panel').draggable({
    appendTo: 'body',
    connectToSortable: '.column-inner',
    start: function (event, ui) {
      var $this = $(this),
          $parent = $this.parent();

      if ($parent.children().length === 1) {
        $('<p></p>').addClass('empty-column').css('visibility', 'hidden').text('Empty').appendTo($parent);
      }
    }
  });

  $('.kanban-board .kanban-column').droppable({
    accept: ':not(.ui-sortable-helper)',
    drop: function (event, ui) {
      $(this).find('.empty-column').remove();
      ui.draggable.appendTo($(this).find('.column-inner'));
    }
  });

  $('.column-inner').sortable({
    items: '.panel',
    sort: function (event, ui) {
      ui.item.css('height', '').css('width', '');
    }
  });

});
