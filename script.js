document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const tocContainer = document.getElementById('toc-container');
    const tocList = document.getElementById('toc-list');
    const main = document.querySelector('main');

    // Dark mode toggle
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
    });

    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
        body.classList.add('dark-mode');
    }

    // Generate Table of Contents
    function generateTableOfContents() {
        const headings = main.querySelectorAll('h2, h3');
        if (headings.length === 0) {
            tocContainer.style.display = 'none';
            return;
        }

        headings.forEach((heading, index) => {
            const id = heading.id || `section-${index + 1}`;
            heading.id = id;
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.textContent = heading.textContent;
            link.href = `#${id}`;
            listItem.classList.add(heading.tagName.toLowerCase());
            listItem.appendChild(link);
            tocList.appendChild(listItem);
        });
    }

    // Highlight active section
    function highlightActiveSection() {
        const scrollPosition = window.scrollY;
        const headings = Array.from(main.querySelectorAll('h2, h3'));
        const tocLinks = tocList.querySelectorAll('a');
        
        let currentActiveIndex = headings.findIndex(heading => 
            heading.offsetTop > scrollPosition + 60
        ) - 1;

        if (currentActiveIndex === -2) currentActiveIndex = headings.length - 1;

        tocLinks.forEach((link, index) => {
            link.classList.toggle('active', index === currentActiveIndex);
        });
    }

    generateTableOfContents();
    
    if (tocList.children.length > 0) {
        window.addEventListener('scroll', highlightActiveSection);
        highlightActiveSection();

        // Smooth scrolling for ToC links
        tocList.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                e.preventDefault();
                const targetId = e.target.getAttribute('href').slice(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    } else {
        tocContainer.style.display = 'none';
    }

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
});
