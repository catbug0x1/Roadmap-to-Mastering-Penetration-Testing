// Smooth scroll for sidebar links and active state
document.addEventListener('DOMContentLoaded', function () {
    const sidebarLinks = document.querySelectorAll('.sidebar a');
    const sections = document.querySelectorAll('main section');
    const contentArea = document.querySelector('.content');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Calculate position relative to the content scrolling area
                const targetPosition = targetElement.offsetTop - contentArea.offsetTop + contentArea.scrollTop;
                
                // For main content scroll
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });


                // Remove active class from all links
                sidebarLinks.forEach(l => l.classList.remove('active'));
                // Add active class to the clicked link
                this.classList.add('active');
            }
        });
    });

    // Highlight sidebar link based on scroll position
    function onScroll() {
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 100; // offset for better active state trigger
                if (contentArea.scrollTop >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        sidebarLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add("active");
            }
        });
    }
    // Listen to scroll on the main content area if it's the one scrolling
    // If body scrolls, use window.addEventListener('scroll', onScroll);
        contentArea.addEventListener('scroll', onScroll); // If .content is the scroll container
        window.addEventListener('scroll', onScroll); // Fallback if window itself scrolls

        // Initial check in case a section is already in view on load (e.g. due to hash in URL)
    onScroll();
});