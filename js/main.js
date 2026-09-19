/* ==========================================================================
   Main Application Script - Dhivya Dharshini Portfolio
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTypingEffect();
  initScrollEffects();
  initNavigation();
  initProjectFilters();
  initProjectModal();
  initContactForm();
  initSkillTabs();
});

/* --------------------------------------------------------------------------
   1. Theme Switcher (Dark / Light Mode)
   -------------------------------------------------------------------------- */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;
  const currentTheme = localStorage.getItem('portfolio-theme') || 'dark';

  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'light') {
      themeIcon.className = 'fa-solid fa-moon';
    } else {
      themeIcon.className = 'fa-solid fa-sun';
    }
  }
}

/* --------------------------------------------------------------------------
   2. Dynamic Typing Effect
   -------------------------------------------------------------------------- */
function initTypingEffect() {
  const typingElement = document.getElementById('typing-text');
  if (!typingElement) return;

  const roles = [
    'Full Stack Software Engineer',
    'React.js & Frontend Specialist',
    'Angular & Enterprise Web Developer',
    'Node.js & REST API Engineer',
    'B.Tech Information Technology (8.65 CGPA)'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 90;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 45;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 90;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typeSpeed = 1800; // Pause at end of text
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 400; // Pause before new word
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* --------------------------------------------------------------------------
   3. Scroll Effects: Progress Bar, Navbar Sticky & Scroll Reveal
   -------------------------------------------------------------------------- */
function initScrollEffects() {
  const navbar = document.getElementById('navbar');
  const progressBar = document.getElementById('scroll-progress');
  const scrollTopBtn = document.getElementById('scroll-top-btn');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

    // Progress Bar
    if (progressBar) {
      progressBar.style.width = `${scrollPercent}%`;
    }

    // Navbar Scrolled Style
    if (navbar) {
      if (scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Back to Top Button
    if (scrollTopBtn) {
      if (scrollY > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }

    // Active Navigation Highlight on Scroll
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // IntersectionObserver for Scroll Reveal
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));
}

/* --------------------------------------------------------------------------
   4. Mobile Navigation Toggle
   -------------------------------------------------------------------------- */
function initNavigation() {
  const hamburger = document.getElementById('hamburger-btn');
  const navLinksList = document.getElementById('nav-links');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && navLinksList) {
    hamburger.addEventListener('click', () => {
      navLinksList.classList.toggle('open');
      const isOpen = navLinksList.classList.contains('open');
      hamburger.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinksList.classList.remove('open');
        hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }
}

/* --------------------------------------------------------------------------
   5. Skill Category Filtering
   -------------------------------------------------------------------------- */
function initSkillTabs() {
  const tabBtns = document.querySelectorAll('.skill-tab-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.classList.add('reveal');
          setTimeout(() => card.classList.add('active'), 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   6. Projects Filter
   -------------------------------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory.includes(category)) {
          card.parentElement.style.display = 'block';
        } else {
          card.parentElement.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   7. Project Detail Modal
   -------------------------------------------------------------------------- */
const projectsData = {
  chemistry: {
    title: "Chemistry Learning Platform",
    subtitle: "Enterprise Ed-Tech Single Page Application (SPA)",
    role: "Frontend Engineer (ESG Sentinel Private Limited)",
    tech: ["React.js", "Bootstrap 5", "JavaScript (ES6+)", "Context API", "Client Auth", "REST APIs"],
    description: "Architected the client-side single page application for an interactive chemistry educational platform. Engineered modular assessment engines, state-driven quizzes, dynamic practice modules, and real-time performance evaluation dashboards with robust cross-device responsiveness.",
    keyFeatures: [
      "Client-side session authentication & secure state persistence",
      "Dynamic assessment engine with categorized question banks and instant feedback",
      "Real-time student progress tracking metrics and score visualization",
      "Mobile-first responsive interface adhering to accessibility and WCAG standards"
    ]
  },
  school: {
    title: "School Management System",
    subtitle: "Enterprise Institutional Administration & Student Portal",
    role: "Full Stack Engineer (ESG Sentinel Private Limited)",
    tech: ["Angular", "Bootstrap 5", "Java REST APIs", "MySQL", "Reactive Forms"],
    description: "Engineered an institutional management web application designed to streamline academic operations, faculty workflows, and student records. Built dynamic forms with comprehensive client-side validation and integrated secure Java RESTful endpoints backed by a normalized MySQL relational database.",
    keyFeatures: [
      "Role-based modular dashboards for administrators, educators, and students",
      "Dynamic reactive forms with complex asynchronous field validation",
      "Optimized Java REST API data consumption and JSON payload serialization",
      "Efficient relational database querying and automated record update pipelines"
    ]
  },
  petcare: {
    title: "Pet Care Management System",
    subtitle: "Full-Stack Animal Wellness & Clinical Facility Platform",
    role: "Full Stack Engineer (KGiSL Microcollege)",
    tech: ["Node.js", "Express.js", "MongoDB", "Mongoose", "HTML5/CSS3", "JavaScript"],
    description: "Developed an end-to-end full-stack portal to manage veterinary clinical operations, animal medical histories, and customer service bookings. Designed RESTful backend services in Node.js/Express connected to MongoDB for scalable document storage and real-time query retrieval.",
    keyFeatures: [
      "Comprehensive medical record schema modeling with vaccination and treatment tracking",
      "Interactive appointment scheduling system with automated timeslot validation",
      "Secure RESTful API architecture with controller-service-model separation",
      "NoSQL database indexing for high-performance record retrieval and low latency"
    ]
  }
};

function initProjectModal() {
  const modalOverlay = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalContent = document.getElementById('modal-dynamic-content');
  const detailBtns = document.querySelectorAll('.view-project-btn');

  if (!modalOverlay || !modalContent) return;

  detailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      const project = projectsData[projectId];

      if (project) {
        modalContent.innerHTML = `
          <div style="margin-bottom: 1.5rem;">
            <span class="section-tag">${project.role}</span>
            <h2 style="font-size: 1.85rem; margin-top: 0.5rem; margin-bottom: 0.25rem;">${project.title}</h2>
            <p style="color: var(--secondary); font-weight: 600; font-size: 0.95rem;">${project.subtitle}</p>
          </div>

          <div style="margin-bottom: 1.5rem;">
            <h4 style="font-size: 1rem; color: var(--text-primary); margin-bottom: 0.5rem;">Tech Stack</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
              ${project.tech.map(t => `<span class="tech-tag" style="background: rgba(99,102,241,0.15); border-color: rgba(99,102,241,0.3); color: var(--primary); font-size: 0.85rem; padding: 0.3rem 0.75rem;">${t}</span>`).join('')}
            </div>
          </div>

          <div style="margin-bottom: 1.5rem;">
            <h4 style="font-size: 1rem; color: var(--text-primary); margin-bottom: 0.5rem;">Overview</h4>
            <p style="color: var(--text-secondary); line-height: 1.7; font-size: 0.95rem;">${project.description}</p>
          </div>

          <div style="margin-bottom: 2rem;">
            <h4 style="font-size: 1rem; color: var(--text-primary); margin-bottom: 0.75rem;">Key Highlights & Architecture</h4>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem;">
              ${project.keyFeatures.map(feat => `
                <li style="position: relative; padding-left: 1.4rem; color: var(--text-secondary); font-size: 0.92rem;">
                  <span style="position: absolute; left: 0; color: var(--primary); font-weight: bold;">▹</span>
                  ${feat}
                </li>
              `).join('')}
            </ul>
          </div>

          <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <a href="#contact" onclick="closeModal()" class="btn btn-primary btn-sm">
              <i class="fa-solid fa-paper-plane"></i> Discuss This Project
            </a>
          </div>
        `;

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  window.closeModal = function() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   8. Contact Form Handling & Toast Feedback
   -------------------------------------------------------------------------- */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnHtml = submitBtn ? submitBtn.innerHTML : 'Send Message';

      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const subject = document.getElementById('form-subject').value.trim();
      const message = document.getElementById('form-message').value.trim();

      if (!name || !email || !message) {
        if (submitBtn) {
          submitBtn.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Please fill in all required fields';
          setTimeout(() => { submitBtn.innerHTML = originalBtnHtml; }, 2500);
        }
        return;
      }

      if (submitBtn) {
        submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Opening Email Client...';
        submitBtn.disabled = true;
      }

      // Construct a mailto link to send directly to Dhivya's email
      const mailtoUrl = `mailto:dhivyadharshini687@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry from ' + name)}&body=${encodeURIComponent('From: ' + name + ' (' + email + ')\n\n' + message)}`;

      setTimeout(() => {
        window.location.href = mailtoUrl;
        contactForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;
        }
      }, 700);
    });
  }
}
