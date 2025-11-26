// Smooth scroll avec easing personnalisé pour les ancres
        function smoothScrollToElement(element, duration = 800, targetId = null) {
            const start = window.scrollY;
            const offset = targetId && offsetConfig[targetId] ? offsetConfig[targetId] : 100;
            const target = element.getBoundingClientRect().top + window.scrollY - offset;
            const distance = target - start;
            let startTime = null;

            // Fonction d'easing (cubic-in-out)
            function easeInOutCubic(t) {
                return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
            }

            function scrollAnimation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                const easedProgress = easeInOutCubic(progress);

                window.scrollTo(0, start + distance * easedProgress);

                if (progress < 1) {
                    requestAnimationFrame(scrollAnimation);
                }
            }

            requestAnimationFrame(scrollAnimation);
        }

        // Configuration des offsets par section
        const offsetConfig = {
            '#header': 0,
            '#photos': 40,
            '#sejour': 20,
            '#avis': 20,
            '#cta': 120
        };

        // Gestion des clics sur les liens de navigation
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    smoothScrollToElement(targetElement, 800, targetId);
                }
            });
        });

        // Gestion des clics sur les boutons contact
        const contactButtons = document.querySelectorAll('.contact');
        contactButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const targetElement = document.querySelector('#header');
                if (targetElement) {
                    smoothScrollToElement(targetElement, 800, '#header');
                }
            });
        });


        document.querySelectorAll('.accordion-question').forEach(btn => {
            btn.addEventListener('click', function(){
                const item = this.parentElement;
                const isActive = item.classList.contains('active');
                document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
                if(!isActive) item.classList.add('active');
            });
        });