

const logo = document.querySelector('.hero-image');

if (logo) {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;

        const rotation = scrollPosition / 10; // Adjust the multiplier for speed
        const scale = Math.max(0.5, 1 - scrollPosition / 2000); // Limit the maximum scale to 0.5

        logo.style.transform = `rotate(${rotation}deg) scale(${scale})`;
    });
}


function addStar() {
    const star = document.createElement('div');
    star.classList.add('star');

    // LEFT CORNER, CENTER, RIGHT CORNER — SAB SE
    const x = Math.random() * window.innerWidth;  // 0 se full width
    star.style.left = x + 'px';

    // Size random
    const size = 1.5 + Math.random() * 2.5;
    star.style.width = size + 'px';
    star.style.height = size + 'px';

    // Fall time: 10 to 18 seconds
    const time = 10 + Math.random() * 8;
    star.style.animation = `fall ${time}s linear forwards, blink ${0.8 + Math.random() * 1}s infinite`;

    document.body.appendChild(star);

    // Remove after fall
    setTimeout(() => star.remove(), time * 1000);
}

// Har 400ms mein naya star
setInterval(addStar, 400);

// Shuru mein 10 stars
for (let i = 0; i < 10; i++) {
    setTimeout(addStar, i * 300);
}



// Step 1: Add animation class to all cards
const cards = document.querySelectorAll('.card');
cards.forEach(card => card.classList.add('scroll-animate'));

// Step 2: Scroll event
window.addEventListener('scroll', () => {
    const triggerPoint = window.innerHeight * 0.8; // Trigger when 80% in view

    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;

        if (cardTop < triggerPoint) {
            card.classList.add('show');  // FIXED: »add → add
        }
        // Optional: Remove on scroll up (for repeat)
        // else { card.classList.remove('show'); }
    });
});

// Smooth scroll behavior for horizontal card containers
const cardsContainer = document.querySelector('.objective-cards');
if (cardsContainer) {
    cardsContainer.addEventListener('wheel', (e) => {
        if (e.deltaY !== 0) {
            e.preventDefault();
            cardsContainer.scrollLeft += e.deltaY;
        }
    });
}


document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.sparc-policy-flip-card-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.02)';
        });
        card.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
        });
    });
});


function togglePanel(panel) {
    const isActive = panel.classList.contains('active');
    // Close all panels
    document.querySelectorAll('.sparc-result-panel').forEach(p => {
        p.classList.remove('active');
        p.style.zIndex = '1';
    });
    // Open clicked panel
    if (!isActive) {
        panel.classList.add('active');
        panel.style.zIndex = '10';
    }
}

// --- Multi-item carousel (responsive pages) ---

function getVisibleCount() {
    const w = window.innerWidth;
    if (w >= 1100) return 4;
    if (w >= 900) return 3;
    if (w >= 600) return 2;
    return 1;
}

function initCarousel() {
    const containers = document.querySelectorAll('.partner-slideshow-container');
    if (!containers || containers.length === 0) return;

    // Initialize each carousel instance
    containers.forEach(container => setupCarousel(container));

    // Recompute on resize for all containers
    window.addEventListener('resize', debounce(() => {
        containers.forEach(c => setupCarousel(c));
    }, 200));
}

function setupCarousel(container) {
    if (!container) return;
    const track = container.querySelector('.partner-track');
    const slides = track ? track.querySelectorAll('.partner-slides') : [];
    const visible = getVisibleCount();
    const pages = Math.max(1, Math.ceil(slides.length / visible));

    // per-container state
    container._carousel = { track, slides, visible, pages, page: 0, timer: null };

    // build UI and set handlers
    buildDots(container);
    bindControls(container);

    showPage(0, container);
    resetAutoSlide(container);
}

function buildDots(container) {
    if (!container || !container._carousel) return;
    const dotsContainer = container.querySelector('.partner-dots');
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    for (let i = 0; i < container._carousel.pages; i++) {
        const dot = document.createElement('span');
        dot.className = 'dot';
        dot.addEventListener('click', () => { showPage(i, container); resetAutoSlide(container); });
        dotsContainer.appendChild(dot);
    }
    updateDots(container);
}

function bindControls(container) {
    if (!container || !container._carousel) return;
    const prev = container.querySelector('.prev');
    const next = container.querySelector('.next');
    if (prev) {
        prev.addEventListener('click', (e) => { e.preventDefault(); changePage(-1, container); });
    }
    if (next) {
        next.addEventListener('click', (e) => { e.preventDefault(); changePage(1, container); });
    }
}

function showPage(i, container) {
    if (!container || !container._carousel) return;
    const info = container._carousel;
    info.page = ((i % info.pages) + info.pages) % info.pages;
    // compute slide width from DOM to avoid any padding/box-sizing mismatch
    const firstSlide = info.slides && info.slides[0];
    const slideWidth = firstSlide ? firstSlide.getBoundingClientRect().width : (container.clientWidth / info.visible);
    const pageWidth = slideWidth * info.visible;
    const shiftPx = info.page * pageWidth;
    info.track.style.transform = `translateX(-${shiftPx}px)`;
    updateDots(container);
}

function changePage(delta, container) {
    if (!container || !container._carousel) return;
    const info = container._carousel;
    const pages = info.pages;
    showPage((info.page + delta + pages) % pages, container);
    resetAutoSlide(container);
}

function updateDots(container) {
    if (!container || !container._carousel) return;
    const dots = container.querySelectorAll('.partner-dots .dot');
    dots.forEach((d, idx) => d.classList.toggle('active-dot', idx === container._carousel.page));
}

function startAutoSlide(container) {
    if (!container || !container._carousel) return;
    container._carousel.timer = setInterval(() => changePage(1, container), 5000);
}

function resetAutoSlide(container) {
    if (!container || !container._carousel) return;
    if (container._carousel.timer) clearInterval(container._carousel.timer);
    startAutoSlide(container);
}

function debounce(fn, ms) {
    let t;
    return function () { clearTimeout(t); t = setTimeout(fn, ms); };
}

document.addEventListener('DOMContentLoaded', initCarousel);


function togglePilot(header) {
    const content = header.nextElementSibling;
    content.classList.toggle('open');
    const icon = header.querySelector('.pilot-number');
    // Optional: Rotate number or add icon, but keeping simple
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.pilot-card').forEach(card => {
    observer.observe(card);
});

// Scroll to Top functionality
function initScrollToTop() {
    const scrollButton = document.querySelector('.scroll-to-top');
    if (!scrollButton) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    });

    // Scroll to top when clicked
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll to top when DOM is loaded
document.addEventListener('DOMContentLoaded', initScrollToTop);

// Smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';