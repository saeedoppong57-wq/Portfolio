const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('nav');
const header = document.querySelector('header');

menuToggle?.addEventListener('click', () => {
    const isOpen = navMenu?.classList.toggle('open');
    header?.classList.toggle('menu-open', isOpen);
    menuToggle?.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('lazy-loaded');
            sectionObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
        }
    });
}, observerOptions);

document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    imageObserver.observe(img);
});

const contObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('lazy-loaded');
            contObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.cont, .link-project, .cont-1, .cont-2, .cont-3, .cont-4').forEach(el => {
    contObserver.observe(el);
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

const skillItems = document.querySelectorAll('.skill-item');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('lazy-loaded');
            skillObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

skillItems.forEach(item => skillObserver.observe(item));

const filterButtons = document.querySelectorAll('.project-button p');
const projectItems = document.querySelectorAll('.containers > div');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filter = button.classList[0];
        projectItems.forEach(item => {
            if (filter === 'all') {
                item.style.display = 'block';
            } else {
                const showMap = { web: 'web-design', fig: 'figma' };
                const targetClass = showMap[filter];
                item.style.display = item.classList.contains(targetClass) ? 'block' : 'none';
            }
        });
    });
});

const allButton = document.querySelector('.project-button .all');
if (allButton) {
    allButton.click();
}

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

const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.documentElement.classList.remove('dark');
    } else {
        document.documentElement.classList.add('dark');
    }

    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}