const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('nav');
const header = document.querySelector('header');
const overlay = document.querySelector('.mobile-menu-overlay');

const setMenuState = (isOpen) => {
    navMenu?.classList.toggle('open', isOpen);
    header?.classList.toggle('menu-open', isOpen);
    menuToggle?.classList.toggle('open', isOpen);
    overlay?.classList.toggle('active', isOpen);
    document.body.classList.toggle('menu-open-body', isOpen);
    menuToggle?.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
};

menuToggle?.addEventListener('click', () => {
    const isOpen = !navMenu?.classList.contains('open');
    setMenuState(isOpen);
});

overlay?.addEventListener('click', () => {
    setMenuState(false);
});

document.querySelectorAll('.nav').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 900) {
            setMenuState(false);
        }
    });
});

window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        setMenuState(false);
    }
});

document.addEventListener('click', (event) => {
    const isMobile = window.innerWidth <= 900;
    const isMenuOpen = header?.classList.contains('menu-open');
    const clickedInsideHeader = header?.contains(event.target);
    const clickedToggle = menuToggle?.contains(event.target);

    if (isMobile && isMenuOpen && !clickedInsideHeader && !clickedToggle) {
        setMenuState(false);
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
        setMenuState(false);
    }
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
    { label: "HTML", percent: 94 },
    { label: "CSS", percent: 89 },
    { label: "JavaScript", percent: 45 },
    { label: "UI/UX Design", percent: 78 },
    { label: "Photoshop" , percent: 20 } ,
    { label: "WordPress" , percent: 10 } 
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
const accordionItems = document.querySelectorAll(".accordion-item");
accordionItems.forEach(item => {
    const header = item.querySelector(".accordion-header");
    header.addEventListener("click", () => {
        // Close every other item
        accordionItems.forEach(otherItem => {
            if(otherItem !== item){
                otherItem.classList.remove("active");
                otherItem.querySelector(".accordion-content").style.maxHeight = null;
            }
        });
        // Toggle current item
        item.classList.toggle("active");
        const content = item.querySelector(".accordion-content");
        if(item.classList.contains("active")){
            content.style.maxHeight = content.scrollHeight + "px";
        }else{
            content.style.maxHeight = null;
        }
    });
});
// Open the first item on page load
const firstContent = document.querySelector(".accordion-item.active .accordion-content");
firstContent.style.maxHeight = firstContent.scrollHeight + "px";