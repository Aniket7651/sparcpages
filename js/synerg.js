// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
        }
    });
}, observerOptions);

document.querySelectorAll('.sparc-synergies-timeline-item').forEach((item, index) => {
    observer.observe(item);
    item.style.animationDelay = `${index * 0.2}s`;
});

// Smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';