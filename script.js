// Dark mode toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
});

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    body.classList.add('dark-mode');
}

// Generate Table of Contents
const toc = document.getElementById('toc');
const headings = document.querySelectorAll('h2');
const tocList = document.createElement('ul');

headings.forEach(heading => {
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    link.textContent = heading.textContent;
    link.href = `#${heading.id}`;
    listItem.appendChild(link);
    tocList.appendChild(listItem);
});

toc.appendChild(tocList);

// Highlight active section in Table of Contents
window.addEventListener('scroll', () => {
    let currentSection = '';
    headings.forEach(heading => {
        const sectionTop = heading.offsetTop;
        if (window.pageYOffset >= sectionTop - 60) {
            currentSection = heading.id;
        }
    });

    document.querySelectorAll('#toc a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// Social sharing functionality
const twitterButton = document.querySelector('.social-share button:first-child');
const linkedinButton = document.querySelector('.social-share button:last-child');

twitterButton.addEventListener('click', () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(document.title)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(twitterUrl, '_blank');
});

linkedinButton.addEventListener('click', () => {
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
    window.open(linkedinUrl, '_blank');
});

document.addEventListener('DOMContentLoaded', function() {
    const tocContainer = document.getElementById('toc-container');
    const tocList = document.getElementById('toc-list');
    const main = document.querySelector('main');

    if (!tocContainer || !tocList || !main) {
        console.error('Required elements for Table of Contents not found');
        return;
    }

    // Function to generate table of contents
    function generateTableOfContents() {
        const headings = main.querySelectorAll('h2, h3');
        if (headings.length === 0) {
            console.warn('No headings found in the main content');
            tocContainer.style.display = 'none';
            return;
        }

        headings.forEach((heading, index) => {
            if (!heading.id) {
                heading.id = `section-${index + 1}`;
            }

            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.textContent = heading.textContent;
            link.href = `#${heading.id}`;
            
            // Add class based on heading level
            listItem.classList.add(heading.tagName.toLowerCase());
            
            listItem.appendChild(link);
            tocList.appendChild(listItem);
        });
    }

    // Function to highlight active section
    function highlightActiveSection() {
        const scrollPosition = window.scrollY;
        const headings = main.querySelectorAll('h2, h3');
        const tocLinks = tocList.querySelectorAll('a');

        let currentActiveIndex = -1;

        headings.forEach((heading, index) => {
            if (heading.offsetTop <= scrollPosition + 60) {
                currentActiveIndex = index;
            }
        });

        tocLinks.forEach((link, index) => {
            if (index === currentActiveIndex) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    generateTableOfContents();
    
    if (tocList.children.length > 0) {
        window.addEventListener('scroll', highlightActiveSection);
        highlightActiveSection(); // Initial call to highlight the active section
    } else {
        tocContainer.style.display = 'none';
    }
});
