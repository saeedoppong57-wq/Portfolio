const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('nav');
const header = document.querySelector('header');

menuToggle?.addEventListener('click', () => {
    const isOpen = navMenu?.classList.toggle('open');
    header?.classList.toggle('menu-open', isOpen);
    menuToggle?.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});
const specialties = [
    { label: "HTML", percent: 95 },
    { label: "CSS", percent: 90 },
    { label: "JavaScript", percent: 20 },
    { label: "UI/UX Design", percent: 75 },
    { label: "React", percent: 0 },
    { label: "Node.js", percent: 0 }
];

const list = document.getElementById("specialty-list");

specialties.forEach(skill => {
    const li = document.createElement("li");
    li.className = "skill-item";

    li.innerHTML = `
        <div class="skill-header">
            <span class="skill-name">${skill.label}</span>
            <span class="skill-percent">${skill.percent}%</span>
        </div>

        <div class="progress-container">
            <div class="progress-bar" style="width:${skill.percent}%"></div>
        </div>
    `;

    list.appendChild(li);
});