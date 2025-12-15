/* ============================================
   JUNIPER PORTFOLIO - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initTypingAnimation();
    initScrollReveal();
    initGrayscaleEffect();
    initSmoothScroll();
});

/* ============================================
   TYPING ANIMATION
   ============================================ */
function initTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    const text = 'Digital Presence Engineer.';
    let index = 0;

    function type() {
        if (index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;
            setTimeout(type, 80);
        }
    }

    // Start typing after a short delay
    setTimeout(type, 500);
}

/* ============================================
   SCROLL REVEAL ANIMATIONS
   ============================================ */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing after reveal
                // observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
}

/* ============================================
   GRAYSCALE TO COLOR EFFECT ON SCROLL
   ============================================ */
function initGrayscaleEffect() {
    const grayscaleImages = document.querySelectorAll('.grayscale-image');

    const grayscaleOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const grayscaleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            } else {
                entry.target.classList.remove('in-view');
            }
        });
    }, grayscaleOptions);

    grayscaleImages.forEach(img => {
        grayscaleObserver.observe(img);
    });
}

/* ============================================
   SMOOTH SCROLL FOR NAVIGATION
   ============================================ */
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);

                if (target) {
                    const navHeight = document.querySelector('.nav').offsetHeight;
                    const targetPosition = target.offsetTop - navHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

/* ============================================
   NAVIGATION BACKGROUND ON SCROLL
   ============================================ */
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');

    if (window.scrollY > 100) {
        nav.style.background = 'rgba(10, 10, 10, 0.95)';
    } else {
        nav.style.background = 'linear-gradient(to bottom, rgba(10, 10, 10, 0.95), transparent)';
    }
});

/* ============================================
   PORTFOLIO DATA (Easy to update)
   ============================================ */
const portfolioProjects = [
    // Add your projects here
    // Example:
    // {
    //     title: 'Project Name',
    //     description: 'Brief description of the project',
    //     image: 'https://example.com/image.jpg',
    //     link: 'https://project-url.com',
    //     tags: ['React', 'Tailwind']
    // }
];

/* ============================================
   RENDER PORTFOLIO (Call this to populate)
   ============================================ */
function renderPortfolio() {
    const portfolioGrid = document.querySelector('.portfolio-grid');

    if (!portfolioGrid) return;

    if (portfolioProjects.length === 0) {
        portfolioGrid.innerHTML = `
            <div class="portfolio-empty">
                <i data-lucide="folder-plus" class="portfolio-empty-icon"></i>
                <p class="portfolio-empty-text">Projects coming soon...</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }

    portfolioGrid.innerHTML = portfolioProjects.map(project => `
        <div class="portfolio-card reveal">
            <img src="${project.image}" alt="${project.title}" class="portfolio-card-image grayscale-image">
            <div class="portfolio-card-content">
                <h3 class="portfolio-card-title">${project.title}</h3>
                <p class="portfolio-card-description">${project.description}</p>
                <a href="${project.link}" target="_blank" class="portfolio-card-link">
                    View Project <i data-lucide="arrow-right"></i>
                </a>
            </div>
        </div>
    `).join('');

    // Re-initialize features for new elements
    lucide.createIcons();
    initScrollReveal();
    initGrayscaleEffect();
}

// Auto-render portfolio on load
document.addEventListener('DOMContentLoaded', renderPortfolio);
