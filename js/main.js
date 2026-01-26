// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const mainHeader = document.querySelector('.main-header');
    if (window.scrollY > 50) {
        mainHeader.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        mainHeader.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    }
});

// Highlight active navigation item on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.main-nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Call an Expert button functionality
document.querySelector('.btn-call').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Thank you for your interest! Please call us at 1-800-FINANCE or email info@company.com');
});

// Add animation on page load
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Carousel Functionality - Exact match to your example
"use strict";

let next = document.querySelector(".next");
let prev = document.querySelector(".prev");

if (next && prev) {
    next.addEventListener("click", function () {
        let items = document.querySelectorAll(".item");
        if (items.length > 0) {
            document.querySelector(".slide").appendChild(items[0]);
        }
    });

    prev.addEventListener("click", function () {
        let items = document.querySelectorAll(".item");
        if (items.length > 0) {
            document.querySelector(".slide").prepend(items[items.length - 1]);
        }
    });
}

// Background Style Selector Functionality
document.addEventListener('DOMContentLoaded', function() {
    const styleButtons = document.querySelectorAll('.style-btn');
    const vectorBackground = document.getElementById('vectorBackground');
    const mainHeader = document.getElementById('mainHeader');
    const dropdownTrigger = document.querySelector('.dropdown-trigger');
    const navDropdown = document.querySelector('.nav-item-dropdown');
    
    // Set default style (3rd style - Grid Dots)
    if (vectorBackground) {
        vectorBackground.className = 'vector-background style-3';
    }
    
    // Set default header style
    if (mainHeader) {
        mainHeader.classList.add('header-style-3');
    }
    
    // Toggle dropdown on click
    if (dropdownTrigger && navDropdown) {
        dropdownTrigger.addEventListener('click', function(e) {
            e.preventDefault();
            navDropdown.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!navDropdown.contains(e.target)) {
                navDropdown.classList.remove('active');
            }
        });
    }
    
    // Handle style button clicks
    
    styleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const style = this.getAttribute('data-style');
            
            // Remove active class from all buttons
            styleButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update background style
            if (vectorBackground) {
                vectorBackground.className = 'vector-background style-' + style;
            }
            
            // Update header style to match
            if (mainHeader) {
                // Remove all header style classes
                mainHeader.classList.remove('header-style-1', 'header-style-2', 'header-style-3', 'header-style-4', 'header-style-5');
                // Add the matching header style class
                mainHeader.classList.add('header-style-' + style);
            }
            
            // Save preference to localStorage
            localStorage.setItem('selectedBackgroundStyle', style);
            
            // Close dropdown after selection
            if (navDropdown) {
                navDropdown.classList.remove('active');
            }
        });
    });
    
    // Load saved preference or use default (style-3)
    const savedStyle = localStorage.getItem('selectedBackgroundStyle') || '3';
    const savedButton = document.querySelector(`.style-btn[data-style="${savedStyle}"]`);
    if (savedButton) {
        // Update background
        if (vectorBackground) {
            vectorBackground.className = 'vector-background style-' + savedStyle;
        }
        // Update header
        if (mainHeader) {
            mainHeader.classList.remove('header-style-1', 'header-style-2', 'header-style-3', 'header-style-4', 'header-style-5');
            mainHeader.classList.add('header-style-' + savedStyle);
        }
        // Update button
        styleButtons.forEach(btn => btn.classList.remove('active'));
        savedButton.classList.add('active');
    }
});

