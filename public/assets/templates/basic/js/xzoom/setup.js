function initializeXZOOM() {
  $('.xzoom5, .xzoom-gallery5').xzoom({
    tint: '#006699',
    Xoffset: 15,
  });

  //Integration with hammer.js
  var isTouchSupported = 'ontouchstart' in window;

  if (isTouchSupported) {
    //If touch device
    $('.xzoom5').each(function () {
      var xzoom = $(this).data('xzoom');
      xzoom.eventunbind();
    });

    $('.xzoom5').each(function () {
      var xzoom = $(this).data('xzoom');
      $(this)
        .hammer()
        .on('tap', function (event) {
          event.pageX = event.gesture.center.pageX;
          event.pageY = event.gesture.center.pageY;
          var s = 1,
            ls;

          xzoom.eventmove = function (element) {
            element.hammer().on('drag', function (event) {
              event.pageX = event.gesture.center.pageX;
              event.pageY = event.gesture.center.pageY;
              xzoom.movezoom(event);
              event.gesture.preventDefault();
            });
          };

          var counter = 0;
          xzoom.eventclick = function (element) {
            element.hammer().on('tap', function () {
              counter++;
              if (counter == 1) setTimeout(openmagnific, 300);
              event.gesture.preventDefault();
            });
          };

          function openmagnific() {
            if (counter == 2) {
              xzoom.closezoom();
              var gallery = xzoom.gallery().cgallery;
              var i,
                images = new Array();
              for (i in gallery) {
                images[i] = { src: gallery[i] };
              }
              $.magnificPopup.open({ items: images, type: 'image', gallery: { enabled: true } });
            } else {
              xzoom.closezoom();
            }
            counter = 0;
          }
          xzoom.openzoom(event);
        });
    });
  } else {
    //If not touch device

    //Integration with magnific popup plugin
    $('.xzoom5').bind('click', function (event) {
      if (document.body.classList.contains('modal-open')) {
        return false;
      }
      var xzoom = $(this).data('xzoom');
      xzoom.closezoom();
      var gallery = xzoom.gallery().cgallery;
      var i,
        images = new Array();
      for (i in gallery) {
        images[i] = { src: gallery[i] };
      }
      $.magnificPopup.open({ items: images, type: 'image', gallery: { enabled: true } });
      event.preventDefault();
    });
  }
}

initializeXZOOM();
