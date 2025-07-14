// carousel.js

// carousel.js
$(document).ready(function() {
  $('.center-mode-carousel').each(function() { // Process each carousel on the page
      var $thisCarousel = $(this); // Current carousel instance
      
      // --- Find the counter associated with THIS specific carousel ---
      // Adjust this selector based on your HTML structure.
      // Example: If .custom-slick-controls is a sibling of the carousel div:
      var $thisSlickCounter = $thisCarousel.siblings('.custom-slick-controls').find('.slick-counter');
      
      // Example: If .custom-slick-controls is inside a common parent wrapper of the carousel:
      // var $thisSlickCounter = $thisCarousel.closest('.your-carousel-wrapper-class').find('.custom-slick-controls .slick-counter');

      if ($thisSlickCounter.length) {
          $thisSlickCounter.text("... / ..."); // Set an initial placeholder
      } else {
          // You can uncomment this log if you're debugging multiple carousels and some are missing counters
          // console.warn("Slick counter display element not found for a carousel instance:", $thisCarousel[0]);
      }

      // --- Carousel settings ---
      var slidesToShow = $thisCarousel.hasClass('five-wide') ? 3 : 2;
      var centerPaddingValue = '60px'; // Default center padding, adjust as needed

      var responsiveSettings = [
        {
          breakpoint: 1280, 
          settings: {
            centerPadding: '40px',
            slidesToShow: 1,       
          }
        },  
        {
            breakpoint: 980, 
            settings: {
              centerPadding: '40px',
              slidesToShow: 1,       
            }
          },
          {
              breakpoint: 736,
              settings: {
                  centerPadding: '40px',
                  slidesToShow: 1,
              }
          },
          {
              breakpoint: 480,
              settings: {
                  centerPadding: '40px',
                  slidesToShow: 1
              }
          }
      ];

      // --- Function to update this carousel's specific counter ---
      function updateCounterForThisCarousel(slick, currentSlide) {
          if (!$thisSlickCounter.length) {
              return; // No counter element to update for this instance
          }

          var slideIndex = 0;
          if (currentSlide !== undefined) {
              slideIndex = currentSlide;
          } else if (slick && slick.currentSlide !== undefined) {
              slideIndex = slick.currentSlide;
          }

          var i = slideIndex + 1; // Slick's currentSlide is 0-based
          var totalSlides = slick.slideCount;

          if (isNaN(i) || isNaN(totalSlides) || totalSlides === 0) {
              $thisSlickCounter.text("? / ?"); // Fallback text for invalid numbers
              return;
          }
          
          $thisSlickCounter.text(i + ' / ' + totalSlides);
      }

      // --- Event listeners for this specific carousel instance ---
      $thisCarousel.on('init', function(event, slick) {
          // The 'init' event fires after Slick is fully initialized.
          // A tiny timeout often helps ensure all properties are available.
          setTimeout(function() {
              updateCounterForThisCarousel(slick, slick.currentSlide);
          }, 1); // 1ms delay
      });

      $thisCarousel.on('afterChange', function(event, slick, currentSlide) {
          updateCounterForThisCarousel(slick, currentSlide);
      });

      $thisCarousel.on('reInit', function(event, slick) { // After responsive breakpoint changes etc.
           setTimeout(function() { // Similar timeout for robustness
              updateCounterForThisCarousel(slick, slick.currentSlide);
          }, 1);
      });

      // --- Initialize Slick Carousel ---
      $thisCarousel.slick({
          centerMode: true,
          centerPadding: centerPaddingValue,
          slidesToShow: slidesToShow,
          arrows: true,
          infinite: false,
          speed: 0, // Standard speed
          useCSS: true,
          useTransform: true,
          cssEase: 'ease', // Standard ease
          responsive: responsiveSettings
          // speed: 300, // Adjust animation speed if needed
      });

      // --- MANUAL UPDATE FALLBACK for initial load ---
      // This was likely important in the version that "worked" for you initially.
      // It runs right after .slick() is called.
      if ($thisCarousel.hasClass('slick-initialized') && $thisSlickCounter.length) {
          var currentCounterText = $thisSlickCounter.text();
          // Only update if the 'init' event hasn't already (e.g., if placeholder is still there)
          if (currentCounterText.includes("...") || currentCounterText.includes("? / ?") || currentCounterText.trim() === "") {
              var slickInstance = $thisCarousel.slick('getSlick');
              if (slickInstance) {
                  updateCounterForThisCarousel(slickInstance, slickInstance.currentSlide);
              }
          }
      }

  }); // End of .each() loop for carousels
}); // End of $(document).ready()

