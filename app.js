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
  const AUTH_KEY = "rastreo_auth";
  const LOCATIONS = ["Casa", "Santa Ana"];

  // Demo admin credentials
  const DEMO_EMAIL = "admin@demo.com";
  const DEMO_PASS = "admin123";

  // ---- Helpers ----

  function generateTrackingNumber() {
    const num = String(Date.now()).slice(-6);
    return `TRK-${num}`;
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

  // ---- Demo Mode (localStorage) ----

  const demo = {
    async searchPackages(query) {
      const q = query.toLowerCase();
      return getPackagesFromStorage().filter(
        p =>
          p.clientId.toLowerCase() === q ||
          p.trackingNumber.toLowerCase() === q
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

    async login(email, password) {
      if (email === DEMO_EMAIL && password === DEMO_PASS) {
        sessionStorage.setItem(AUTH_KEY, "true");
        return { success: true };
      }
      return { success: false, error: "Credenciales incorrectas. Demo: admin@demo.com / admin123" };
    },

    logout() {
      sessionStorage.removeItem(AUTH_KEY);
    },

    isLoggedIn() {
      return sessionStorage.getItem(AUTH_KEY) === "true";
    },

    // ---- Catalog ----

    async getAllProducts() {
      return getProductsFromStorage();
    },

    async addProduct(data) {
      const products = getProductsFromStorage();
      const product = {
        id: crypto.randomUUID(),
        name: data.name,
        price: data.price || "",
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
  };

  const backend = typeof DEMO_MODE !== "undefined" && DEMO_MODE ? demo : firebase;

  return {
    STAGES,
    LOCATIONS,
    searchPackages: (q) => backend.searchPackages(q),
    getAllPackages: () => backend.getAllPackages(),
    addPackage: (d) => backend.addPackage(d),
    updatePackage: (id, d) => backend.updatePackage(id, d),
    deletePackage: (id) => backend.deletePackage(id),
    getAllProducts: () => backend.getAllProducts(),
    addProduct: (d) => backend.addProduct(d),
    updateProduct: (id, d) => backend.updateProduct(id, d),
    deleteProduct: (id) => backend.deleteProduct(id),
    login: (e, p) => backend.login(e, p),
    logout: () => backend.logout(),
    isLoggedIn: () => backend.isLoggedIn(),
  };
})();
