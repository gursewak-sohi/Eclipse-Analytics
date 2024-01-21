(function() {

    // JS loaded
    let body = document.body;
    body.classList.add('js-loaded');

     // gsap animations
     gsap.registerPlugin(ScrollSmoother);

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

      var baseSpeed = smWidth ? 30 : 60; // pixels per second

      document.fonts.ready.then(function () {
        var lines = document.querySelectorAll('.line-animation');
        lines.forEach(function(line, lineIndex) {
            var h3Elements = line.querySelectorAll('h3');
            var isReverse = line.classList.contains('reverse');

            // Use the width of the first h3 as the reference for duration calculation
            var referenceWidth = h3Elements[0].getBoundingClientRect().width;
            var duration = referenceWidth / baseSpeed; // Duration based on the first h3 width

            h3Elements.forEach(function(h3, index) {
                var width = h3.getBoundingClientRect().width;
                var animationName = `red-scroll-${lineIndex}-${index}-${isReverse ? 'reverse' : 'forward'}`;

                createKeyframes(animationName, width, index, isReverse);
                h3.style.animation = `${animationName} ${duration}s linear ${index === 0 ? `-${duration}s` : `-${duration / 2}s`} infinite`;
            });
        });
      });
      
      function createKeyframes(name, width, index, isReverse) {
        var keyframes;

        if (isReverse) {
            if (index === 0) {
                keyframes = `
                    @keyframes ${name} {
                        0% { transform: translateX(-${width}px); }
                        to { transform: translateX(${width}px); }
                    }
                `;
            } else {
                keyframes = `
                    @keyframes ${name} {
                        0% { transform: translateX(-${2 * width}px); }
                        to { transform: translateX(0); }
                    }
                `;
            }
        } else {
            if (index === 0) {
                keyframes = `
                    @keyframes ${name} {
                        0% { transform: translateX(${width}px); }
                        to { transform: translateX(-${width}px); }
                    }
                `;
            } else {
                keyframes = `
                    @keyframes ${name} {
                        0% { transform: translateX(0); }
                        to { transform: translateX(-${2 * width}px); }
                    }
                `;
            }
        }

          dynamicStyleSheet.insertRule(keyframes, dynamicStyleSheet.cssRules.length);
      }
  


      function createStyleElement() {
        var style = document.createElement('style');
        style.type = 'text/css';
        document.head.appendChild(style);
        return style.sheet;
    }

    var dynamicStyleSheet = createStyleElement();

  

})();