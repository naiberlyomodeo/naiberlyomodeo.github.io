// =============================================================
// App — Package Tracking Logic
// =============================================================
// In DEMO_MODE (no Firebase configured), uses localStorage.
// With real Firebase config, uses Firestore + Auth.
// =============================================================

const App = (() => {
  const STAGES = [
    "Recibido en EE.UU.",
    "En tránsito",
    "En aduana",
    "Disponible para entrega",
    "Entregado",
  ];

  const STORAGE_KEY = "rastreo_packages";
  const CATALOG_KEY = "rastreo_catalog";
  const CLIENTS_KEY = "rastreo_clients";
  const AUTH_KEY = "rastreo_auth";
  const LOCATIONS = ["Casa", "Santa Ana"];

  // Demo users: { username, password, role, cedula (for clients) }
  const DEMO_USERS = [
    { username: "nay", password: "test", role: "admin", name: "Naiberly" },
    { username: "mike", password: "test", role: "admin", name: "Michael" },
    { username: "nay2", password: "test", role: "client", name: "Naiberly (Cliente)", cedula: "111111111" },
    { username: "mike2", password: "test", role: "client", name: "Michael (Cliente)", cedula: "222222222" },
  ];

  // ---- Helpers ----

  function generateTrackingNumber() {
    const num = String(Date.now()).slice(-6);
    return `TRK-${num}`;
  }

  function generateProductCode() {
    const num = String(Date.now()).slice(-5);
    return `PRD-${num}`;
  }

  function getPackagesFromStorage() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  }

  function savePackagesToStorage(packages) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(packages));
  }

  function getProductsFromStorage() {
    try {
      return JSON.parse(localStorage.getItem(CATALOG_KEY)) || [];
    } catch {
      return [];
    }
  }

  function saveProductsToStorage(products) {
    localStorage.setItem(CATALOG_KEY, JSON.stringify(products));
  }

  function getClientsFromStorage() {
    try {
      return JSON.parse(localStorage.getItem(CLIENTS_KEY)) || [];
    } catch {
      return [];
    }
  }

  function saveClientsToStorage(clients) {
    localStorage.setItem(CLIENTS_KEY, JSON.stringify(clients));
  }

  // ---- Demo Mode (localStorage) ----

  const demo = {
    async searchPackages(query) {
      const q = query.trim().toLowerCase();
      return getPackagesFromStorage().filter(
        p =>
          p.clientId.trim().toLowerCase() === q ||
          p.trackingNumber.trim().toLowerCase() === q
      );
    },

    async searchByTracking(query) {
      const q = query.toLowerCase();
      return getPackagesFromStorage().filter(
        p => p.trackingNumber.toLowerCase() === q
      );
    },

    async getAllPackages() {
      return getPackagesFromStorage();
    },

    async addPackage(data) {
      const packages = getPackagesFromStorage();
      const pkg = {
        id: crypto.randomUUID(),
        trackingNumber: generateTrackingNumber(),
        clientName: data.clientName,
        clientId: data.clientId,
        description: data.description,
        status: data.status || STAGES[0],
        notes: data.notes || "",
        statusUpdatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };
      packages.unshift(pkg);
      savePackagesToStorage(packages);
      return pkg;
    },

    async updatePackage(id, data) {
      const packages = getPackagesFromStorage();
      const idx = packages.findIndex(p => p.id === id);
      if (idx === -1) return;
      // Track when status changes
      if (data.status && data.status !== packages[idx].status) {
        data.statusUpdatedAt = new Date().toISOString();
      }
      packages[idx] = { ...packages[idx], ...data };
      savePackagesToStorage(packages);
    },

    async deletePackage(id) {
      const packages = getPackagesFromStorage().filter(p => p.id !== id);
      savePackagesToStorage(packages);
    },

    async login(username, password) {
      const user = DEMO_USERS.find(u => u.username === username && u.password === password);
      if (user) {
        sessionStorage.setItem(AUTH_KEY, JSON.stringify({
          username: user.username,
          name: user.name,
          role: user.role,
          cedula: user.cedula || "",
        }));
        return { success: true, role: user.role };
      }
      return { success: false, error: "Usuario o contraseña incorrectos." };
    },

    logout() {
      sessionStorage.removeItem(AUTH_KEY);
    },

    isLoggedIn() {
      return !!sessionStorage.getItem(AUTH_KEY);
    },

    getUser() {
      try {
        return JSON.parse(sessionStorage.getItem(AUTH_KEY));
      } catch {
        return null;
      }
    },

    // ---- Catalog ----

    async getAllProducts() {
      return getProductsFromStorage();
    },

    async addProduct(data) {
      const products = getProductsFromStorage();
      const product = {
        id: crypto.randomUUID(),
        productCode: generateProductCode(),
        name: data.name,
        price: data.price || "",
        currency: data.currency || "CRC",
        notes: data.notes || "",
        location: data.location || "",
        image: data.image || "",
        createdAt: new Date().toISOString(),
      };
      products.unshift(product);
      saveProductsToStorage(products);
      return product;
    },

    async updateProduct(id, data) {
      const products = getProductsFromStorage();
      const idx = products.findIndex(p => p.id === id);
      if (idx === -1) return;
      products[idx] = { ...products[idx], ...data };
      saveProductsToStorage(products);
    },

    async deleteProduct(id) {
      const products = getProductsFromStorage().filter(p => p.id !== id);
      saveProductsToStorage(products);
    },

    // ---- Clients ----

    async getAllClients() {
      return getClientsFromStorage();
    },

    async addClient(data) {
      const clients = getClientsFromStorage();
      const client = {
        id: crypto.randomUUID(),
        name: data.name,
        cedula: data.cedula,
        phone: data.phone || "",
        email: data.email || "",
        address: data.address || "",
        notes: data.notes || "",
        createdAt: new Date().toISOString(),
      };
      clients.unshift(client);
      saveClientsToStorage(clients);
      return client;
    },

    async updateClient(id, data) {
      const clients = getClientsFromStorage();
      const idx = clients.findIndex(c => c.id === id);
      if (idx === -1) return;
      clients[idx] = { ...clients[idx], ...data };
      saveClientsToStorage(clients);
    },

    async deleteClient(id) {
      const clients = getClientsFromStorage().filter(c => c.id !== id);
      saveClientsToStorage(clients);
    },
  };

  // ---- Firebase Mode ----
  // TODO: Implement when real Firebase config is provided.
  // The API shape is identical to demo — just swap localStorage
  // calls for Firestore queries and Auth calls.

  const firebase = {
    async searchPackages(query) {
      // Firestore: query where clientId == query OR trackingNumber == query
      console.warn("Firebase not configured. Using demo mode.");
      return demo.searchPackages(query);
    },
    async searchByTracking(query) {
      return demo.searchByTracking(query);
    },
    async getAllPackages() {
      return demo.getAllPackages();
    },
    async addPackage(data) {
      return demo.addPackage(data);
    },
    async updatePackage(id, data) {
      return demo.updatePackage(id, data);
    },
    async deletePackage(id) {
      return demo.deletePackage(id);
    },
    async login(email, password) {
      return demo.login(email, password);
    },
    logout() {
      return demo.logout();
    },
    isLoggedIn() {
      return demo.isLoggedIn();
    },
    getUser() {
      return demo.getUser();
    },
    async getAllProducts() {
      return demo.getAllProducts();
    },
    async addProduct(data) {
      return demo.addProduct(data);
    },
    async updateProduct(id, data) {
      return demo.updateProduct(id, data);
    },
    async deleteProduct(id) {
      return demo.deleteProduct(id);
    },
    async getAllClients() {
      return demo.getAllClients();
    },
    async addClient(data) {
      return demo.addClient(data);
    },
    async updateClient(id, data) {
      return demo.updateClient(id, data);
    },
    async deleteClient(id) {
      return demo.deleteClient(id);
    },
  };

  const backend = typeof DEMO_MODE !== "undefined" && DEMO_MODE ? demo : firebase;

  return {
    STAGES,
    LOCATIONS,
    searchPackages: (q) => backend.searchPackages(q),
    searchByTracking: (q) => backend.searchByTracking(q),
    getAllPackages: () => backend.getAllPackages(),
    addPackage: (d) => backend.addPackage(d),
    updatePackage: (id, d) => backend.updatePackage(id, d),
    deletePackage: (id) => backend.deletePackage(id),
    getAllProducts: () => backend.getAllProducts(),
    addProduct: (d) => backend.addProduct(d),
    updateProduct: (id, d) => backend.updateProduct(id, d),
    deleteProduct: (id) => backend.deleteProduct(id),
    getAllClients: () => backend.getAllClients(),
    addClient: (d) => backend.addClient(d),
    updateClient: (id, d) => backend.updateClient(id, d),
    deleteClient: (id) => backend.deleteClient(id),
    login: (u, p) => backend.login(u, p),
    logout: () => backend.logout(),
    isLoggedIn: () => backend.isLoggedIn(),
    getUser: () => backend.getUser(),
  };
})();
