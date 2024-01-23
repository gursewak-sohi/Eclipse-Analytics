(function() {

    // JS loaded
    let body = document.body;
    body.classList.add('js-loaded');

     // gsap animations
     gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

     let smWidth;
     screen.width < 1024
        ? smWidth = true
        : smWidth = false;

      if(!smWidth)   {
        ScrollSmoother.create({
          smooth: 0.5, // how long (in seconds) it takes to "catch up" to the native scroll position
          effects: true, // looks for data-speed and data-lag attributes on elements
      });
      }

      
      // Scroll To function
      const navLinks = document.querySelectorAll("[data-scroll]");
      if (navLinks.length > 0) {
          navLinks.forEach(navLink => {
              navLink.addEventListener("click", event => {
                  event.preventDefault();
                  const scrollToId = event.currentTarget.dataset.scroll;
                  gsap.to(window, {
                      duration: 1,
                      scrollTo: `#${scrollToId}`,
                      ease: "Expo.easeInOut"
                  });
              });
          });
      }


      // Meet Swiper
      const meetSwiper = document.querySelector("#meetSwiper");
      if (meetSwiper) {
          const swiper = new Swiper('#meetSwiper', {
              // Optional parameters
              slidesPerView: 1,
              spaceBetween: 27,
              // loop: true,
              navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              },
              breakpoints: {
                1280: {
                  slidesPerView: 2,
                },
              },
              on: {
                slideChange: function () {
                    // Remove 'active' class from all content divs
                    document.querySelectorAll('.content').forEach(function(element) {
                        element.classList.remove('active');
                    });
        
                    // Add 'active' class to the corresponding content div
                    var activeIndex = this.activeIndex;
                    var activeContent = document.getElementById('content-' + (activeIndex + 1));
                    if (activeContent) {
                        activeContent.classList.add('active');
                    }
                }
            }
          });
      }


    //  Scroll Animation
    var lines = document.querySelectorAll('.line-animation');
    if (lines.length > 0) {
        lines.forEach(function(line, lineIndex) {
            var isReverse = line.classList.contains('reverse');
            var width = line.offsetWidth; // Total width of the line container
            var xValue = isReverse ? width : -width; // Determine direction based on 'reverse' class
    
            gsap.to(line, {
                x: xValue,
                ease: "none",
                scrollTrigger: {
                    trigger: line,
                    start: "top bottom", // Adjust these values based on when you want the animation to start and end
                    end: "bottom top",
                    scrub: true,
                }
            });
        });
    }

})();