/**
 * Admin Dashboard & Management Logic
 * Supports Dashboard Metrics, Projects Management, Services Management, and Customer Inquiries
 */

document.addEventListener('DOMContentLoaded', () => {
  initAdminAuth();
  initAdminSidebar();
  initDashboardStats();
  initProjectsTable();
  initServicesTable();
  initInquiriesTable();
});

/* Sidebar & Mobile toggle */
function initAdminSidebar() {
  const hamburger = document.querySelector('.hamburger-btn');
  const sidebar = document.querySelector('.admin-sidebar');
  if (hamburger && sidebar) {
    hamburger.addEventListener('click', () => {
      sidebar.classList.toggle('show');
    });
  }
}

/* Authentication Check & Login Form */
function initAdminAuth() {
  const loginForm = document.getElementById('adminLoginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const usernameInput = document.getElementById('adminUsername');
      const passwordInput = document.getElementById('adminPassword');
      const errorBox = document.getElementById('adminLoginError');

      const u = usernameInput.value.trim();
      const p = passwordInput.value.trim();

      if (!u || !p) {
        if (errorBox) {
          errorBox.textContent = 'Please enter both username/email and password.';
          errorBox.style.display = 'block';
        }
        return;
      }

      const success = Store.loginAdmin(u, p);
      if (success) {
        window.location.href = '1-%20Profile.html';
      } else {
        if (errorBox) {
          errorBox.textContent = 'Invalid credentials. Hint: use admin / admin123';
          errorBox.style.display = 'block';
        }
      }
    });
  }
}

function adminLogout() {
  Store.logoutAdmin();
  window.location.href = '4.%20Login%20%20page.html';
}

/* Dashboard Metrics & Recent Inquiries (Fig 2.2) */
function initDashboardStats() {
  const totalProjectsEl = document.getElementById('statTotalProjects');
  const totalServicesEl = document.getElementById('statTotalServices');
  const newInquiriesEl = document.getElementById('statNewInquiries');
  const recentTableBody = document.getElementById('recentInquiriesTbody');

  if (!totalProjectsEl && !recentTableBody) return;

  const stats = Store.getStats();

  if (totalProjectsEl) totalProjectsEl.textContent = stats.totalProjects;
  if (totalServicesEl) totalServicesEl.textContent = stats.totalServices;
  if (newInquiriesEl) newInquiriesEl.textContent = stats.newInquiries;

  if (recentTableBody) {
    if (stats.recentInquiries.length === 0) {
      recentTableBody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:#718096;">No recent inquiries.</td></tr>`;
      return;
    }
    recentTableBody.innerHTML = stats.recentInquiries.map(item => `
      <tr>
        <td style="font-weight: 600;">${item.name}</td>
        <td>${item.projectType}</td>
        <td>${item.date}</td>
        <td>
          <span class="status-badge badge-${item.status.toLowerCase()}">${item.status}</span>
        </td>
      </tr>
    `).join('');
  }
}

/* Manage Projects Table & Modals (Fig 2.3) */
function initProjectsTable() {
  const tbody = document.getElementById('projectsTableBody');
  const searchInput = document.getElementById('searchProjectsInput');
  const categoryFilter = document.getElementById('filterCategorySelect');

  if (!tbody) return;

  function render() {
    const query = (searchInput ? searchInput.value : '').toLowerCase();
    const category = categoryFilter ? categoryFilter.value : 'All';

    let list = Store.getProjects();

    if (category !== 'All') {
      list = list.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    if (query) {
      list = list.filter(p => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query));
    }

    if (list.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 24px; color:#718096;">No projects matching criteria.</td></tr>`;
      return;
    }

    tbody.innerHTML = list.map(p => `
      <tr>
        <td>
          <img src="${p.image}" alt="${p.name}" class="table-thumb">
        </td>
        <td style="font-weight: 600;">${p.name}</td>
        <td>${p.category}</td>
        <td>${p.date || '20 May 2025'}</td>
        <td>
          <button class="btn-table-icon" onclick="openEditProjectModal(${p.id})">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
            Edit
          </button>
          <button class="btn-table-icon delete-btn" onclick="deleteProjectItem(${p.id})">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            Delete
          </button>
        </td>
      </tr>
    `).join('');
  }

  if (searchInput) searchInput.addEventListener('input', render);
  if (categoryFilter) categoryFilter.addEventListener('change', render);

  render();
}

function openAddProjectModal() {
  const modal = document.getElementById('projectModal');
  if (!modal) return;
  document.getElementById('projectModalTitle').textContent = 'Add New Project';
  document.getElementById('projectId').value = '';
  document.getElementById('projectName').value = '';
  document.getElementById('projectCategory').value = 'Residential';
  document.getElementById('projectDate').value = '25 May 2025';
  document.getElementById('projectImage').value = 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80';
  document.getElementById('projectDesc').value = '';
  modal.classList.add('active');
}

function openEditProjectModal(id) {
  const modal = document.getElementById('projectModal');
  if (!modal) return;
  const project = Store.getProjects().find(p => p.id === Number(id));
  if (!project) return;

  document.getElementById('projectModalTitle').textContent = 'Edit Project';
  document.getElementById('projectId').value = project.id;
  document.getElementById('projectName').value = project.name;
  document.getElementById('projectCategory').value = project.category;
  document.getElementById('projectDate').value = project.date || '';
  document.getElementById('projectImage').value = project.image;
  document.getElementById('projectDesc').value = project.description || '';
  modal.classList.add('active');
}

function closeProjectModal() {
  const modal = document.getElementById('projectModal');
  if (modal) modal.classList.remove('active');
}

function handleSaveProject(e) {
  e.preventDefault();
  const id = document.getElementById('projectId').value;
  const name = document.getElementById('projectName').value.trim();
  const category = document.getElementById('projectCategory').value;
  const date = document.getElementById('projectDate').value.trim();
  const image = document.getElementById('projectImage').value.trim();
  const description = document.getElementById('projectDesc').value.trim();

  if (!name || !image) {
    alert('Project name and image URL are required.');
    return;
  }

  Store.saveProject({
    id: id ? Number(id) : null,
    name,
    category,
    date,
    image,
    description
  });

  closeProjectModal();
  initProjectsTable();
  initDashboardStats();
}

function deleteProjectItem(id) {
  if (confirm('Are you sure you want to delete this project?')) {
    Store.deleteProject(id);
    initProjectsTable();
    initDashboardStats();
  }
}

/* Manage Services Table & Modals (Fig 2.4) */
function initServicesTable() {
  const tbody = document.getElementById('servicesTableBody');
  if (!tbody) return;

  function render() {
    const list = Store.getServices();
    tbody.innerHTML = list.map(s => `
      <tr>
        <td style="font-weight: 600;">
          <div style="display:flex; align-items:center; gap:10px;">
            <span style="display:inline-flex; padding:6px; background:#f7fafc; border-radius:4px; border:1px solid #e2e8f0; color:#b8860b;">✦</span>
            ${s.name}
          </div>
        </td>
        <td>${s.description}</td>
        <td>
          <span class="status-badge badge-active">${s.status || 'Active'}</span>
        </td>
        <td>
          <button class="btn-table-icon" onclick="openEditServiceModal(${s.id})">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
            Edit
          </button>
          <button class="btn-table-icon delete-btn" onclick="deleteServiceItem(${s.id})">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            Delete
          </button>
        </td>
      </tr>
    `).join('');
  }

  render();
}

function openAddServiceModal() {
  const modal = document.getElementById('serviceModal');
  if (!modal) return;
  document.getElementById('serviceModalTitle').textContent = 'Add New Service';
  document.getElementById('serviceId').value = '';
  document.getElementById('serviceName').value = '';
  document.getElementById('serviceDesc').value = '';
  document.getElementById('serviceStatus').value = 'Active';
  modal.classList.add('active');
}

function openEditServiceModal(id) {
  const modal = document.getElementById('serviceModal');
  if (!modal) return;
  const service = Store.getServices().find(s => s.id === Number(id));
  if (!service) return;

  document.getElementById('serviceModalTitle').textContent = 'Edit Service';
  document.getElementById('serviceId').value = service.id;
  document.getElementById('serviceName').value = service.name;
  document.getElementById('serviceDesc').value = service.description;
  document.getElementById('serviceStatus').value = service.status || 'Active';
  modal.classList.add('active');
}

function closeServiceModal() {
  const modal = document.getElementById('serviceModal');
  if (modal) modal.classList.remove('active');
}

function handleSaveService(e) {
  e.preventDefault();
  const id = document.getElementById('serviceId').value;
  const name = document.getElementById('serviceName').value.trim();
  const description = document.getElementById('serviceDesc').value.trim();
  const status = document.getElementById('serviceStatus').value;

  if (!name || !description) {
    alert('Please provide service name and description.');
    return;
  }

  Store.saveService({
    id: id ? Number(id) : null,
    name,
    description,
    status
  });

  closeServiceModal();
  initServicesTable();
  initDashboardStats();
}

function deleteServiceItem(id) {
  if (confirm('Are you sure you want to delete this service?')) {
    Store.deleteService(id);
    initServicesTable();
    initDashboardStats();
  }
}

/* Customer Inquiries Table & Details Drawer (Fig 2.5) */
let currentDrawerInquiryId = null;

function initInquiriesTable() {
  const tbody = document.getElementById('inquiriesTableBody');
  const searchInput = document.getElementById('searchInquiryInput');
  const statusFilter = document.getElementById('filterStatusSelect');

  if (!tbody) return;

  function render() {
    const query = (searchInput ? searchInput.value : '').toLowerCase();
    const status = statusFilter ? statusFilter.value : 'All';

    let list = Store.getInquiries();

    if (status !== 'All') {
      list = list.filter(i => i.status.toLowerCase() === status.toLowerCase());
    }
    if (query) {
      list = list.filter(i => 
        i.name.toLowerCase().includes(query) || 
        i.email.toLowerCase().includes(query) || 
        i.phone.includes(query)
      );
    }

    if (list.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 24px; color:#718096;">No inquiries found.</td></tr>`;
      return;
    }

    tbody.innerHTML = list.map(i => `
      <tr>
        <td style="font-weight: 600;">${i.name}</td>
        <td>${i.email}</td>
        <td>${i.phone}</td>
        <td>${i.projectType}</td>
        <td>${i.date}</td>
        <td>
          <span class="status-badge badge-${i.status.toLowerCase()}">${i.status}</span>
        </td>
        <td>
          <button class="btn btn-outline btn-sm" onclick="openInquiryDrawer(${i.id})">View Details</button>
        </td>
      </tr>
    `).join('');
  }

  if (searchInput) searchInput.addEventListener('input', render);
  if (statusFilter) statusFilter.addEventListener('change', render);

  render();
}

function openInquiryDrawer(id) {
  const drawer = document.getElementById('inquiryDrawer');
  const overlay = document.getElementById('drawerOverlay');
  if (!drawer) return;

  const inquiry = Store.getInquiries().find(i => i.id === Number(id));
  if (!inquiry) return;

  currentDrawerInquiryId = inquiry.id;

  document.getElementById('drawerName').textContent = inquiry.name;
  document.getElementById('drawerEmail').textContent = inquiry.email;
  document.getElementById('drawerPhone').textContent = inquiry.phone;
  document.getElementById('drawerType').textContent = inquiry.projectType;
  document.getElementById('drawerDate').textContent = inquiry.date;
  document.getElementById('drawerMessage').textContent = inquiry.message;
  
  const statusSelect = document.getElementById('drawerStatusSelect');
  if (statusSelect) statusSelect.value = inquiry.status;

  drawer.classList.add('open');
  if (overlay) overlay.classList.add('active');
}

function closeInquiryDrawer() {
  const drawer = document.getElementById('inquiryDrawer');
  const overlay = document.getElementById('drawerOverlay');
  if (drawer) drawer.classList.remove('open');
  if (overlay) overlay.classList.remove('active');
  currentDrawerInquiryId = null;
}

function updateCurrentInquiryStatus() {
  if (!currentDrawerInquiryId) return;
  const statusSelect = document.getElementById('drawerStatusSelect');
  const newStatus = statusSelect ? statusSelect.value : 'Reviewed';

  Store.updateInquiryStatus(currentDrawerInquiryId, newStatus);
  initInquiriesTable();
  initDashboardStats();
  closeInquiryDrawer();
}

function markCurrentAsReviewed() {
  if (!currentDrawerInquiryId) return;
  Store.updateInquiryStatus(currentDrawerInquiryId, 'Reviewed');
  initInquiriesTable();
  initDashboardStats();
  closeInquiryDrawer();
}

