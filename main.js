/**
 * Client-Side Application Logic
 * Supports Home, About, Services, Projects, and Contact functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  initClientNav();
  initHomeFeaturedProjects();
  initProjectsPage();
  initContactForm();
  initModals();
});

/* Mobile Menu Toggle */
function initClientNav() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      const isVisible = navLinks.style.display === 'flex';
      navLinks.style.display = isVisible ? 'none' : 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '80px';
      navLinks.style.left = '0';
      navLinks.style.width = '100%';
      navLinks.style.background = '#ffffff';
      navLinks.style.padding = '20px';
      navLinks.style.boxShadow = '0 10px 15px rgba(0,0,0,0.1)';
    });
  }
}

/* Home Page: Featured Projects (Fig 1.1) */
function initHomeFeaturedProjects() {
  const container = document.getElementById('featured-projects-container');
  if (!container) return;

  const projects = Store.getProjects();
  // Wireframe shows: Modern Living Room - Residential, Luxury Apartment - Residential, Office Space - Commercial
  const featured = projects.slice(0, 3);

  container.innerHTML = featured.map(p => `
    <div class="project-card" onclick="openProjectModal(${p.id})">
      <div class="project-card-image">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        <span class="project-card-category-badge">${p.category}</span>
      </div>
      <div class="project-card-body">
        <div>
          <h3 class="project-card-title">${p.name}</h3>
          <p class="project-card-sub">${p.category} Design</p>
        </div>
        <button class="btn btn-outline btn-sm" style="width: 100%;">View Details</button>
      </div>
    </div>
  `).join('');
}

/* Projects Page: Category Filtering & Grid (Fig 1.4) */
function initProjectsPage() {
  const container = document.getElementById('projects-grid-container');
  if (!container) return;

  let activeCategory = 'All';
  const filterBtns = document.querySelectorAll('.filter-btn');

  function render(category) {
    const all = Store.getProjects();
    const filtered = (category === 'All') 
      ? all 
      : all.filter(p => p.category.toLowerCase() === category.toLowerCase());

    if (filtered.length === 0) {
      container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #718096;">No projects found in this category.</div>`;
      return;
    }

    container.innerHTML = filtered.map(p => `
      <div class="project-card">
        <div class="project-card-image">
          <img src="${p.image}" alt="${p.name}" loading="lazy">
          <span class="project-card-category-badge">${p.category}</span>
        </div>
        <div class="project-card-body">
          <div>
            <h3 class="project-card-title">${p.name}</h3>
            <p class="project-card-sub">${p.category} Interior</p>
          </div>
          <button class="btn btn-outline btn-sm" onclick="openProjectModal(${p.id})">View Details</button>
        </div>
      </div>
    `).join('');
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-category');
      render(activeCategory);
    });
  });

  // Handle URL hash if any (e.g. #projects or #services)
  if (window.location.hash === '#services') {
    const servicesTab = document.getElementById('tab-btn-services');
    if (servicesTab) servicesTab.click();
  }

  render('All');
}

/* Contact/Inquiry Form Submission with Validation (Fig 1.5) */
function initContactForm() {
  const form = document.getElementById('inquiryForm');
  if (!form) return;

  const nameInput = document.getElementById('inquiryName');
  const emailInput = document.getElementById('inquiryEmail');
  const phoneInput = document.getElementById('inquiryPhone');
  const typeInput = document.getElementById('inquiryType');
  const messageInput = document.getElementById('inquiryMessage');
  const alertBox = document.getElementById('inquiryAlert');

  // Real-time input validation listeners
  if (nameInput) {
    nameInput.addEventListener('input', () => {
      Validator.setFieldStatus(nameInput, Validator.isNotEmpty(nameInput.value), 'Name is required.');
    });
  }
  if (emailInput) {
    emailInput.addEventListener('input', () => {
      Validator.setFieldStatus(emailInput, Validator.isValidEmail(emailInput.value), 'Please enter a valid email address.');
    });
  }
  if (phoneInput) {
    phoneInput.addEventListener('input', () => {
      Validator.setFieldStatus(phoneInput, Validator.isValidPhone(phoneInput.value), 'Phone number must be exactly 10 digits.');
    });
  }
  if (typeInput) {
    typeInput.addEventListener('change', () => {
      Validator.setFieldStatus(typeInput, Validator.isNotEmpty(typeInput.value), 'Please select a project type.');
    });
  }
  if (messageInput) {
    messageInput.addEventListener('input', () => {
      Validator.setFieldStatus(messageInput, Validator.isNotEmpty(messageInput.value), 'Please describe your project.');
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid = Validator.isNotEmpty(nameInput.value);
    const isEmailValid = Validator.isValidEmail(emailInput.value);
    const isPhoneValid = Validator.isValidPhone(phoneInput.value);
    const isTypeValid = Validator.isNotEmpty(typeInput.value);
    const isMessageValid = Validator.isNotEmpty(messageInput.value);

    Validator.setFieldStatus(nameInput, isNameValid, 'Name is required.');
    Validator.setFieldStatus(emailInput, isEmailValid, 'Please enter a valid email address.');
    Validator.setFieldStatus(phoneInput, isPhoneValid, 'Phone number must be exactly 10 digits.');
    Validator.setFieldStatus(typeInput, isTypeValid, 'Please select a project type.');
    Validator.setFieldStatus(messageInput, isMessageValid, 'Please describe your project.');

    if (!isNameValid || !isEmailValid || !isPhoneValid || !isTypeValid || !isMessageValid) {
      if (alertBox) {
        alertBox.className = 'admin-notice-box';
        alertBox.style.borderColor = '#e53e3e';
        alertBox.style.color = '#c53030';
        alertBox.style.backgroundColor = '#fff5f5';
        alertBox.innerHTML = '⚠️ Please resolve the highlighted validation errors above.';
        alertBox.style.display = 'block';
      }
      return;
    }

    // Save to Store
    Store.addInquiry({
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      phone: phoneInput.value.trim(),
      projectType: typeInput.value,
      message: messageInput.value.trim()
    });

    form.reset();
    [nameInput, emailInput, phoneInput, typeInput, messageInput].forEach(Validator.clearFieldStatus);

    if (alertBox) {
      alertBox.className = 'admin-notice-box';
      alertBox.style.borderColor = '#38a169';
      alertBox.style.color = '#22543d';
      alertBox.style.backgroundColor = '#f0fff4';
      alertBox.innerHTML = '✓ Thank you! Your inquiry has been sent to our Admin team. We will contact you soon.';
      alertBox.style.display = 'block';
    }
  });
}

/* Modals & Dialogs */
function initModals() {
  const modal = document.getElementById('projectDetailsModal');
  const closeBtn = document.getElementById('closeModalBtn');
  if (modal && closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }
}

function openProjectModal(id) {
  const modal = document.getElementById('projectDetailsModal');
  if (!modal) return;

  const project = Store.getProjects().find(p => p.id === Number(id));
  if (!project) return;

  document.getElementById('modalProjectImg').src = project.image;
  document.getElementById('modalProjectTitle').textContent = project.name;
  document.getElementById('modalProjectCategory').textContent = project.category + ' Interior Design';
  document.getElementById('modalProjectDate').textContent = project.date || 'May 2025';
  document.getElementById('modalProjectDesc').textContent = project.description || 'Custom crafted interior design with modern aesthetics and bespoke styling.';
  document.getElementById('modalProjectScope').textContent = project.scope || 'Complete Interior Execution';
  document.getElementById('modalProjectDuration').textContent = project.duration || '6-8 Weeks';
  document.getElementById('modalProjectLocation').textContent = project.location || 'Metropolitan Area';

  modal.classList.add('active');
}

function openServiceModal(serviceName) {
  const modal = document.getElementById('serviceDetailsModal');
  if (!modal) return;

  const service = Store.getServices().find(s => s.name.toLowerCase() === serviceName.toLowerCase()) || {
    name: serviceName,
    description: 'Expert interior architectural solution tailored to client requirements.',
    details: 'Our specialized design team coordinates every facet from initial material sampling and lighting design to final handover.'
  };

  document.getElementById('modalServiceTitle').textContent = service.name;
  document.getElementById('modalServiceDesc').textContent = service.description;
  document.getElementById('modalServiceDetails').textContent = service.details;

  modal.classList.add('active');
}

