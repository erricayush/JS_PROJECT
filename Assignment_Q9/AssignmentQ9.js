"use strict";

// 4 & 11. Event Delegation and Propagation
const nav = document.querySelector('.nav-bar');
nav.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Check if clicked element is a link
    if (e.target.classList.contains('nav-link')) {
        const id = e.target.getAttribute('href');
        
        // 2. Smooth Scrolling
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
});

// 3. Tabbed Component (using Delegation)
const tabsContainer = document.querySelector('.tabs-header');
tabsContainer.addEventListener('click', (e) => {
    const clicked = e.target.closest('.tab-btn');
    if (!clicked) return;

    // Remove active classes
    document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

    // Activate current tab
    clicked.classList.add('active');
    document.getElementById(`tab-${clicked.dataset.tab}`).classList.add('active');
});

// 5. Sticky Navigation
const initialCoords = document.querySelector('#section-tabs').getBoundingClientRect();
window.addEventListener('scroll', function() {
    if (window.scrollY > initialCoords.top) {
        nav.classList.add('sticky');
    } else {
        nav.classList.remove('sticky');
    }
});

// 6. Intersection Observer API (Reveal Elements)
const allSections = document.querySelectorAll('.section');
const revealSection = function(entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section-hidden');
    observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
});

allSections.forEach(section => {
    sectionObserver.observe(section);
});

// 8. Slider Component
const slides = document.querySelectorAll('.slide');
let curSlide = 0;

const goToSlide = (slide) => {
    slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`));
};

document.querySelector('.btn-next').addEventListener('click', () => {
    curSlide = curSlide === slides.length - 1 ? 0 : curSlide + 1;
    goToSlide(curSlide);
});

// 9. DOM Traversing: Dynamically Adding Content
const footer = document.querySelector('footer');
const addNewSection = () => {
    const newSec = document.createElement('section');
    newSec.className = 'section';
    newSec.innerHTML = '<h3>New Dynamic Section</h3>';
    
    // Insert before footer using traversing
    document.body.insertBefore(newSec, footer);
};