(function () {
  'use strict';

  const resumeContainer = document.querySelector('.resume-container');
  const modal = document.getElementById('resumeModal');
  if (!resumeContainer || !modal) return;

  if (window.location.search.includes('print=true')) {
    window.addEventListener('load', () => {
      setTimeout(() => window.generatePDF && window.generatePDF(true), 400);
    });
  }

  // Pull the resume content straight from the portfolio page so the PDF
  // always reflects what is actually shown on the site.
  const extractFromDOM = () => {
    const q = (sel, root = document) => root.querySelector(sel);
    const qa = (sel, root = document) => [...root.querySelectorAll(sel)];
    const clean = (str) => (str || '').replace(/\s+/g, ' ').trim();

    const name = clean(q('.name')?.textContent);

    const photoEl = q('.profile-img');
    const photo = photoEl ? photoEl.getAttribute('src') : '';

    const workEl = q('.work');
    let title = clean(workEl?.textContent);
    const struck = workEl?.querySelector('s');
    if (struck) title = clean(title.replace(clean(struck.textContent), ''));
    const subtitle = struck ? clean(struck.textContent) : '';

    let email = '', location = '', phone = '';
    qa('#contact .contact-item').forEach(item => {
      const value = clean(q('.item-info', item)?.textContent);
      const icon = q('i', item)?.className || '';
      if (icon.includes('envelope')) email = value;
      else if (icon.includes('location-dot')) location = value;
      else if (icon.includes('phone')) phone = value;
    });

    const gh = q('.social-icons a[href*="github"]');
    const li = q('.social-icons a[href*="linkedin"]');
    const github = gh ? clean(gh.getAttribute('href')).replace(/^https?:\/\//, '') : '';
    const linkedin = li ? clean(li.getAttribute('href')).replace(/^https?:\/\//, '') : '';

    const summary = qa('#about .who-info').map(p => clean(p.textContent)).join(' ');

    const SKILL_ICONS = {
      'HTML': 'fa-brands fa-html5',
      'CSS': 'fa-brands fa-css3-alt',
      'JavaScript': 'fa-brands fa-js',
      'UI/UX Design': 'fa-solid fa-pen-ruler',
      'Photoshop': 'fa-solid fa-image',
      'WordPress': 'fa-brands fa-wordpress'
    };
    const technical = qa('#skills .skill-item').map(li => {
      const skillName = clean(q('.skill-name', li)?.textContent);
      const percent = clean(q('.skill-percent', li)?.textContent);
      return {
        name: skillName,
        percent,
        pct: parseInt(percent, 10) || 0,
        icon: SKILL_ICONS[skillName] || 'fa-solid fa-code'
      };
    });

    const projectEls = qa('#works .containers > div');
    const projects = projectEls.map(div => {
      const img = q('.project-img', div);
      const info = clean(q('.info', div)?.textContent);
      const link = q('a', div);
      const href = link?.getAttribute('href') || '';
      const isExternal = href.startsWith('http');
      const isWeb = div.classList.contains('web-design');
      const titleText = clean(img?.getAttribute('alt')) || 'Project';
      return {
        title: titleText,
        category: isWeb ? 'Web Design' : 'UI/UX Design',
        description: info,
        tech: isWeb ? ['HTML', 'CSS', 'JavaScript'] : ['Figma', 'UI/UX Design'],
        liveUrl: isExternal ? href : '',
        githubUrl: ''
      };
    });

    const education = qa('#education .accordion-item').map(item => {
      const heading = clean(q('.accordion-header span', item)?.textContent);
      const institution = clean(q('.content-grid span', item)?.textContent);
      const description = clean(q('.content-grid p', item)?.textContent);
      return { title: heading, period: '', institution, description };
    });

    const experience = qa('#experience .experience-item').map(item => {
      const date = clean(q('.experience-date', item)?.textContent);
      const role = clean(q('h3', item)?.textContent);
      const description = clean(q('.experience-card p', item)?.textContent);
      return { date, role, description };
    });

    return { name, title, subtitle, email, location, phone, github, linkedin, photo, summary, technical, projects, education, experience };
  };

  const renderHeader = () => {};

  const renderProfile = (rd) => {
    const profile = document.getElementById('resume-profile');
    if (!profile) return;
    const photoHtml = rd.photo
      ? `<img class="resume-profile-photo" src="${rd.photo}" alt="${rd.name}">`
      : '';
    profile.innerHTML = `
      ${photoHtml}
      <h1 class="resume-profile-name">${rd.name}</h1>
      <p class="resume-profile-title">${rd.title}</p>
      ${rd.subtitle ? `<p class="resume-profile-subtitle">${rd.subtitle}</p>` : ''}`;
  };

  const renderSummary = (rd) => {
    const section = document.getElementById('resume-summary');
    if (!section) return;
    section.innerHTML = `<h3>Summary</h3><p>${rd.summary}</p>`;
  };

  const renderSkills = (rd) => {
    const section = document.getElementById('resume-skills');
    if (!section) return;

    const technicalHtml = rd.technical.map(s => `
      <div class="resume-skill">
        <div class="resume-skill-top">
          <span class="resume-skill-name"><i class="${s.icon}"></i> ${s.name}</span>
          <span class="resume-skill-pct">${s.percent || ''}</span>
        </div>
        <div class="resume-skill-bar"><span class="resume-skill-fill" style="width:${s.pct}%"></span></div>
      </div>
    `).join('');

    section.innerHTML = `
      <h3>Skills</h3>
      <div class="resume-skills">${technicalHtml}</div>`;
  };

  const renderProjects = (rd) => {
    const section = document.getElementById('resume-projects');
    if (!section) return;

    const itemsHtml = rd.projects.map(p => {
      const techHtml = (p.tech || []).map(t => `<span class="resume-project-tech">${t}</span>`).join('');
      const links = [];
      if (p.liveUrl && p.liveUrl !== '#') {
        links.push(`<a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" class="resume-project-link">Live Demo</a>`);
      }
      if (p.githubUrl) {
        links.push(`<a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="resume-project-link">GitHub</a>`);
      }
      const linksHtml = links.join(' <span class="resume-project-separator">|</span> ');

      return `
      <div class="resume-item">
        <div class="resume-item-header">
          <span class="resume-item-title">${p.title}</span>
        </div>
        <div class="resume-item-subtitle">${p.category || 'Project'} ${linksHtml ? '&mdash; ' + linksHtml : ''}</div>
        <p>${p.description || ''}</p>
        <div class="resume-project-techs">${techHtml}</div>
      </div>`;
    }).join('');

    section.innerHTML = `<h3>Selected Projects</h3>${itemsHtml || '<p class="resume-empty">No projects found on the page.</p>'}`;
  };

  const renderExperience = (rd) => {
    const section = document.getElementById('resume-experience');
    if (!section || !rd.experience.length) return;
    const itemsHtml = rd.experience.map(ex => `
      <div class="resume-item">
        <div class="resume-item-header">
          <span class="resume-item-title">${ex.role}</span>
          <span class="resume-item-date">${ex.date}</span>
        </div>
        <p>${ex.description}</p>
      </div>
    `).join('');
    section.innerHTML = `<h3>Experience</h3>${itemsHtml}`;
  };

  const renderEducation = (rd) => {
    const section = document.getElementById('resume-education');
    if (!section) return;

    const itemsHtml = rd.education.map(ed => `
      <div class="resume-item">
        <div class="resume-item-header">
          <span class="resume-item-title">${ed.title}</span>
          <span class="resume-item-date">${ed.period}</span>
        </div>
        <div class="resume-item-subtitle">${ed.institution}</div>
        <p>${ed.description}</p>
      </div>
    `).join('');

    section.innerHTML = `<h3>Education</h3>${itemsHtml || ''}`;
  };

  const renderContact = (rd) => {
    const section = document.getElementById('resume-contact');
    if (!section) return;
    const item = (icon, value, href) =>
      value ? (href
        ? `<a href="${href}" target="_blank" rel="noopener noreferrer"><i class="${icon}"></i> ${value}</a>`
        : `<span><i class="${icon}"></i> ${value}</span>`) : '';

    section.innerHTML = `
      <h3>Contact</h3>
      <div class="resume-contact">
        ${item('fa-solid fa-envelope', rd.email, 'mailto:' + rd.email)}
        ${item('fa-solid fa-location-dot', rd.location, '')}
        ${item('fa-solid fa-phone', rd.phone, '')}
        ${item('fa-brands fa-github', rd.github, 'https://' + rd.github)}
        ${item('fa-brands fa-linkedin', rd.linkedin, 'https://' + rd.linkedin)}
      </div>`;
  };

  const renderAll = () => {
    const rd = extractFromDOM();
    renderHeader(rd);
    renderProfile(rd);
    renderSummary(rd);
    renderSkills(rd);
    renderProjects(rd);
    renderExperience(rd);
    renderEducation(rd);
    renderContact(rd);
  };

  // Render the resume content straight into a downloadable PDF file.
  // Uses html2pdf.js (already loaded on the page) so a real .pdf is saved
  // without ever opening the browser's print dialog.
  window.generatePDF = (autoclose = false) => {
    renderAll();

    const wasOpen = modal.classList.contains('open');
    if (!wasOpen) {
      modal.removeAttribute('inert');
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    // Let the layout settle, then build the PDF after the next paint.
    window.requestAnimationFrame(async () => {
      const finish = () => {
        if (!wasOpen && autoclose) closeResume();
      };

      if (typeof window.html2pdf === 'undefined') {
        // Library failed to load: fall back to the print dialog.
        finish();
        window.print();
        return;
      }

      const rawName = (document.querySelector('.name')?.textContent || 'resume').trim();
      const filename = (rawName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'resume') + '-cv.pdf';

      // Wait for every image (profile photo, icons, etc.) to finish loading so
      // no detail is missing from the captured PDF.
      await new Promise(resolve => {
        const imgs = [...resumeContainer.querySelectorAll('img')];
        const settled = imgs.map(img => {
          if (img.complete && img.naturalWidth > 0) return Promise.resolve();
          return new Promise(done => {
            img.addEventListener('load', done, { once: true });
            img.addEventListener('error', done, { once: true });
            if (img.complete) done();
          });
        });
        Promise.race([
          Promise.all(settled),
          new Promise(done => setTimeout(done, 4000))
        ]).then(resolve);
      });

      // Brief extra settle so fonts/layout fully paint before capture.
      await new Promise(resolve => setTimeout(resolve, 200));

      // Standard A4 PDF config — this reliably renders the element into a real,
      // non-empty .pdf that is downloaded automatically (no print dialog).
      const opt = {
        margin: 10,
        filename: filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          scrollY: 0
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['css', 'legacy'] }
      };

      // (Nothing to restore — the resume element is captured in place and is
      // left untouched, so the live modal is unaffected.)
      const restoreResume = () => {};

      html2pdf().set(opt).from(resumeContainer).save()
        .then(() => {
          restoreResume();
          finish();
        })
        .catch(() => {
          restoreResume();
          finish();
          window.print();
        });
    });
  };

  // Open / close the in-page resume viewer.
  const openResume = () => {
    renderAll();
    modal.removeAttribute('inert');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    // Move focus into the dialog for keyboard/screen-reader users.
    const focusTarget = document.getElementById('resumeClose') || document.getElementById('resumeDownload');
    if (focusTarget) focusTarget.focus();
  };

  const closeResume = () => {
    // 1. Return focus to the trigger first...
    if (cvBtn) cvBtn.focus();
    // 2. ...then hide the modal with `inert` (not aria-hidden).
    modal.classList.remove('open');
    modal.setAttribute('inert', '');
    document.body.style.overflow = '';
  };

  const cvBtn = document.querySelector('.cv-btn');
  if (cvBtn) cvBtn.addEventListener('click', openResume);

  const downloadBtn = document.getElementById('resumeDownload');
  if (downloadBtn) downloadBtn.addEventListener('click', () => window.generatePDF());

  const closeBtn = document.getElementById('resumeClose');
  if (closeBtn) closeBtn.addEventListener('click', closeResume);

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('resume-view')) closeResume();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeResume();
  });

  // Keep the open resume in sync with any edits made on the website.
  let syncTimer = null;
  const syncResume = () => {
    if (!modal.classList.contains('open')) return;
    clearTimeout(syncTimer);
    syncTimer = setTimeout(renderAll, 200);
  };
  [document.querySelector('header'), document.querySelector('main')]
    .filter(Boolean)
    .forEach(root => new MutationObserver(syncResume).observe(root, {
      childList: true,
      subtree: true,
      characterData: true
    }));

  document.addEventListener('DOMContentLoaded', renderAll);
})();
