const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('nav');
const header = document.querySelector('header');

menuToggle?.addEventListener('click', () => {
    const isOpen = navMenu?.classList.toggle('open');
    header?.classList.toggle('menu-open', isOpen);
    menuToggle?.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});
const skills = [
    { label: "HTML", percent: 92 },
    { label: "CSS", percent: 87 },
    { label: "JavaScript", percent: 34 },
    { label: "UI/UX Design", percent: 75 },
    { label: "Photoshop" , percent: 40 } ,
    { label: "WordPress" , percent: 20 } 
];

const list = document.getElementById("skills-list");

skills.forEach(skill => {
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
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;

    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});