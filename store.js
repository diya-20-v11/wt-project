/**
 * Shared Data Store for Interior Design Firm Portfolio
 * Manages Projects, Services, Inquiries, and User Sessions via localStorage
 */
const Store = {
  PROJECTS_KEY: 'wt_interior_projects',
  SERVICES_KEY: 'wt_interior_services',
  INQUIRIES_KEY: 'wt_interior_inquiries',
  USERS_KEY: 'wt_interior_users',
  ADMIN_SESSION_KEY: 'wt_interior_admin_logged_in',
  CLIENT_SESSION_KEY: 'wt_interior_client_logged_in',

  defaultProjects: [
    {
      id: 1,
      name: 'Modern Living Room',
      category: 'Residential',
      date: '20 May 2025',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80',
      description: 'Elegant warm-toned living room featuring custom walnut cabinetry, ambient recessed lighting, and minimalist furniture.',
      scope: 'Full living & dining renovation',
      duration: '6 Weeks',
      location: 'Greenwood Heights'
    },
    {
      id: 2,
      name: 'Luxury Apartment',
      category: 'Residential',
      date: '18 May 2025',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80',
      description: 'High-rise apartment interior featuring floor-to-ceiling windows, Italian marble accents, and bespoke contemporary art.',
      scope: 'Complete 3BHK penthouse interior',
      duration: '10 Weeks',
      location: 'Skyline Towers'
    },
    {
      id: 3,
      name: 'Office Space',
      category: 'Commercial',
      date: '15 May 2025',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80',
      description: 'High-tech open office space with ergonomic workstations, collaborative break-out pods, and acoustic privacy booths.',
      scope: 'Corporate headquarters fit-out',
      duration: '8 Weeks',
      location: 'Innovation Business Hub'
    },
    {
      id: 4,
      name: 'Cafe Interior',
      category: 'Commercial',
      date: '12 May 2025',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=900&q=80',
      description: 'Artisanal coffee house with exposed brickwork, brass light fixtures, customized timber banquet seating, and warm ambiance.',
      scope: 'Turnkey hospitality design',
      duration: '5 Weeks',
      location: 'Old Town Heritage Quarter'
    },
    {
      id: 5,
      name: 'Creative Workspace',
      category: 'Office',
      date: '10 May 2025',
      image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80',
      description: 'Modern dynamic design studio workspace equipped with flexible ideation zones, modular desks, and biophilic green walls.',
      scope: 'Creative agency studio interior',
      duration: '4 Weeks',
      location: 'Design District'
    },
    {
      id: 6,
      name: 'Executive Office',
      category: 'Office',
      date: '08 May 2025',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80',
      description: 'Sophisticated corporate executive suite finished in rift-sawn oak, Italian full-grain leather seating, and integrated AV tech.',
      scope: 'C-Suite boardroom & executive office',
      duration: '6 Weeks',
      location: 'Financial Center'
    },
    {
      id: 7,
      name: 'Modern Villa',
      category: 'Residential',
      date: '20 May 2025',
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=900&q=80',
      description: 'Expansive contemporary private villa embracing indoor-outdoor living, stone feature walls, and natural cedar accents.',
      scope: 'Architectural interior planning & furnishing',
      duration: '14 Weeks',
      location: 'Palm Haven Enclave'
    },
    {
      id: 8,
      name: 'Corporate Office',
      category: 'Commercial',
      date: '15 May 2025',
      image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=900&q=80',
      description: 'Multi-story corporate space designed to optimize energy efficiency, natural light distribution, and hybrid team collaboration.',
      scope: '3-floor commercial revamp',
      duration: '12 Weeks',
      location: 'Apex Commercial Plaza'
    },
    {
      id: 9,
      name: 'Retail Space',
      category: 'Commercial',
      date: '10 May 2025',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80',
      description: 'High-end fashion boutique with minimalist display racks, museum-grade spotlighting, and luxury fitting salons.',
      scope: 'Luxury retail flag-store design',
      duration: '7 Weeks',
      location: 'Boulevard Avenue'
    },
    {
      id: 10,
      name: 'Minimalist Home',
      category: 'Residential',
      date: '05 May 2025',
      image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=900&q=80',
      description: 'Scandinavian-inspired residential home showcasing clean geometrical lines, muted tones, and thoughtful spatial flow.',
      scope: 'Full residence interior concept',
      duration: '8 Weeks',
      location: 'Northwood Terrace'
    }
  ],

  defaultServices: [
    {
      id: 1,
      name: 'Residential Interior Design',
      icon: 'residential',
      description: 'Designing beautiful and functional living spaces.',
      status: 'Active',
      details: 'We craft personalized residences that capture your unique style and rhythm of life. From single-room revamps to complete architectural interior transformations, our residential services blend timeless elegance with everyday practicality.'
    },
    {
      id: 2,
      name: 'Commercial Interior Design',
      icon: 'commercial',
      description: 'Innovative designs for shops, offices and commercial spaces.',
      status: 'Active',
      details: 'Commanding brand environments tailored for retail boutiques, dining concepts, and commercial properties that attract footfall, amplify brand identity, and enrich customer experience.'
    },
    {
      id: 3,
      name: 'Office Design',
      icon: 'office',
      description: 'Ergonomic and productive office interior solutions.',
      status: 'Active',
      details: 'Creating inspiring, health-conscious work environments that empower teams and boost productivity. We engineer agile workspaces, executive suites, and collaborative zones.'
    },
    {
      id: 4,
      name: 'Space Planning',
      icon: 'planning',
      description: 'Efficient space utilization and layout planning.',
      status: 'Active',
      details: 'Strategic spatial organization that maximizes utility and aesthetic harmony. Our 2D/3D space plans resolve structural constraints and create intuitive, seamless human circulation.'
    }
  ],

  defaultInquiries: [
    {
      id: 1,
      name: 'Riya Shah',
      email: 'riya@example.com',
      phone: '9876543210',
      projectType: 'Residential',
      date: '25 May 2025',
      status: 'New',
      message: 'I would like to design the interiors of my 3BHK apartment. Please share your packages and process.'
    },
    {
      id: 2,
      name: 'Amit Patel',
      email: 'amit@example.com',
      phone: '9123456780',
      projectType: 'Commercial',
      date: '24 May 2025',
      status: 'Reviewed',
      message: 'We are opening a 1,800 sq ft retail boutique in the city center and need full interior concept design.'
    },
    {
      id: 3,
      name: 'Neha Mehta',
      email: 'neha@example.com',
      phone: '9988776655',
      projectType: 'Office',
      date: '21 May 2025',
      status: 'New',
      message: 'Looking to redesign our 40-person IT startup office to make it more ergonomic and collaborative.'
    },
    {
      id: 4,
      name: 'Karan Joshi',
      email: 'karan@example.com',
      phone: '9090909090',
      projectType: 'Residential',
      date: '20 May 2025',
      status: 'Responded',
      message: 'Need renovation guidance for our duplex penthouse living area and rooftop terrace.'
    },
    {
      id: 5,
      name: 'Priya Desai',
      email: 'priya@example.com',
      phone: '8787878787',
      projectType: 'Commercial',
      date: '18 May 2025',
      status: 'Reviewed',
      message: 'Planning an upscale specialty coffee shop. In need of interior mood boards, lighting design, and branding integration.'
    }
  ],

  init() {
    if (!localStorage.getItem(this.PROJECTS_KEY)) {
      localStorage.setItem(this.PROJECTS_KEY, JSON.stringify(this.defaultProjects));
    }
    if (!localStorage.getItem(this.SERVICES_KEY)) {
      localStorage.setItem(this.SERVICES_KEY, JSON.stringify(this.defaultServices));
    }
    if (!localStorage.getItem(this.INQUIRIES_KEY)) {
      localStorage.setItem(this.INQUIRIES_KEY, JSON.stringify(this.defaultInquiries));
    }
    if (!localStorage.getItem(this.USERS_KEY)) {
      localStorage.setItem(this.USERS_KEY, JSON.stringify([
        {
          name: 'Diya Vadgama',
          email: 'diya@example.com',
          phone: '9876543210',
          password: 'Password@123',
          registeredDate: '10 May 2025'
        }
      ]));
    }
  },

  // Projects
  getProjects() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(this.PROJECTS_KEY)) || this.defaultProjects;
    } catch (e) {
      return this.defaultProjects;
    }
  },

  saveProject(project) {
    const projects = this.getProjects();
    if (project.id) {
      const idx = projects.findIndex(p => p.id === Number(project.id));
      if (idx !== -1) {
        projects[idx] = { ...projects[idx], ...project };
      }
    } else {
      project.id = Date.now();
      if (!project.date) {
        const d = new Date();
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        project.date = `${d.getDate().toString().padStart(2, '0')} ${months[d.getMonth()]} ${d.getFullYear()}`;
      }
      projects.unshift(project);
    }
    localStorage.setItem(this.PROJECTS_KEY, JSON.stringify(projects));
    return project;
  },

  deleteProject(id) {
    let projects = this.getProjects();
    projects = projects.filter(p => p.id !== Number(id));
    localStorage.setItem(this.PROJECTS_KEY, JSON.stringify(projects));
  },

  // Services
  getServices() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(this.SERVICES_KEY)) || this.defaultServices;
    } catch (e) {
      return this.defaultServices;
    }
  },

  saveService(service) {
    const services = this.getServices();
    if (service.id) {
      const idx = services.findIndex(s => s.id === Number(service.id));
      if (idx !== -1) {
        services[idx] = { ...services[idx], ...service };
      }
    } else {
      service.id = Date.now();
      service.status = service.status || 'Active';
      services.push(service);
    }
    localStorage.setItem(this.SERVICES_KEY, JSON.stringify(services));
    return service;
  },

  deleteService(id) {
    let services = this.getServices();
    services = services.filter(s => s.id !== Number(id));
    localStorage.setItem(this.SERVICES_KEY, JSON.stringify(services));
  },

  // Inquiries
  getInquiries() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(this.INQUIRIES_KEY)) || this.defaultInquiries;
    } catch (e) {
      return this.defaultInquiries;
    }
  },

  addInquiry(inquiry) {
    const inquiries = this.getInquiries();
    inquiry.id = Date.now();
    const d = new Date();
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    inquiry.date = `${d.getDate().toString().padStart(2, '0')} ${months[d.getMonth()]} ${d.getFullYear()}`;
    inquiry.status = 'New';
    inquiries.unshift(inquiry);
    localStorage.setItem(this.INQUIRIES_KEY, JSON.stringify(inquiries));
    return inquiry;
  },

  updateInquiryStatus(id, newStatus) {
    const inquiries = this.getInquiries();
    const idx = inquiries.findIndex(i => i.id === Number(id));
    if (idx !== -1) {
      inquiries[idx].status = newStatus;
      localStorage.setItem(this.INQUIRIES_KEY, JSON.stringify(inquiries));
      return inquiries[idx];
    }
    return null;
  },

  // Stats for Admin Dashboard
  getStats() {
    const projects = this.getProjects();
    const services = this.getServices();
    const inquiries = this.getInquiries();
    const newInquiries = inquiries.filter(i => i.status === 'New').length;

    return {
      totalProjects: (projects.length >= 10 ? '' : '0') + projects.length,
      totalServices: (services.length >= 10 ? '' : '0') + services.length,
      newInquiries: (newInquiries >= 10 ? '' : '0') + newInquiries,
      recentInquiries: inquiries.slice(0, 4)
    };
  },

  // Users (Client Accounts)
  getUsers() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(this.USERS_KEY)) || [];
    } catch (e) {
      return [];
    }
  },

  registerUser(user) {
    const users = this.getUsers();
    if (users.find(u => u.email.toLowerCase() === user.email.toLowerCase())) {
      throw new Error('An account with this email address already exists.');
    }
    const d = new Date();
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    user.registeredDate = `${d.getDate().toString().padStart(2, '0')} ${months[d.getMonth()]} ${d.getFullYear()}`;
    users.push(user);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    return user;
  },

  loginUser(email, password) {
    const users = this.getUsers();
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (found) {
      sessionStorage.setItem(this.CLIENT_SESSION_KEY, JSON.stringify({ name: found.name, email: found.email }));
      return found;
    }
    return null;
  },

  getCurrentClient() {
    try {
      return JSON.parse(sessionStorage.getItem(this.CLIENT_SESSION_KEY));
    } catch (e) {
      return null;
    }
  },

  logoutClient() {
    sessionStorage.removeItem(this.CLIENT_SESSION_KEY);
  },

  // Admin Auth
  loginAdmin(username, password) {
    if ((username === 'admin' || username === 'admin@interiorstudio.com') && (password === 'admin123' || password === 'Admin@123' || password === 'admin')) {
      sessionStorage.setItem(this.ADMIN_SESSION_KEY, 'true');
      return true;
    }
    return false;
  },

  isAdminLoggedIn() {
    return sessionStorage.getItem(this.ADMIN_SESSION_KEY) === 'true';
  },

  logoutAdmin() {
    sessionStorage.removeItem(this.ADMIN_SESSION_KEY);
  }
};

// Initialize right away
Store.init();

