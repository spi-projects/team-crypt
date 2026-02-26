document.addEventListener('DOMContentLoaded', () => {
    // Containers
    const projectContainer = document.getElementById('project-container');
    const teamContainer = document.getElementById('team-container');

    // Fetch and render projects
    fetch('projects.json')
        .then(response => response.json())
        .then(projects => {
            projects.forEach(project => {
                const projectCard = `
                    <a href="${project.link}" class="nostyle" target="_blank">
                        <div class="card">
                            <img src="${project.image}" alt="${project.name}">
                            <div class="text-con">
                                <p class="title">${project.name}</p>
                                <p class="des">${project.description}</p>
                            </div>
                        </div>
                    </a>
                `;
                projectContainer.innerHTML += projectCard;
            });
        })
        .catch(error => console.error('Error loading projects:', error));

    // Fetch and render team members
    fetch('team.json')
        .then(response => response.json())
        .then(team => {
            team.forEach(member => {
                const teamCard = `
                    <a href="${member.portfolio}" class="nostyle">
                        <div class="t-card">
                            <img src="${member.photo}" alt="${member.name}">
                            <div class="team-text">
                                <p class="title">${member.name}</p>
                                <p class="des">${member.role}</p>
                            </div>
                        </div>
                    </a>
                `;
                teamContainer.innerHTML += teamCard;
            });
        })
        .catch(error => console.error('Error loading team:', error));

    // Circular Reveal Effect for Headlines
    const headLines = document.querySelectorAll('.head-line');
    headLines.forEach(headline => {
        headline.addEventListener('mousemove', (e) => {
            const rect = headline.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            headline.style.setProperty('--x', `${x}px`);
            headline.style.setProperty('--y', `${y}px`);
        });
    });

    // Smooth Scrolling for Navbar Links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Offset for fixed nav
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
