// =============================================================
// Demo Data — All dummy/seed data in one place.
// Remove this file (and its <script> tag) when connecting Firebase.
// =============================================================

const DEMO_DATA = {
  users: [
    { username: "nay", password: "test", role: "admin", name: "Naiberly" },
    { username: "mike", password: "test", role: "admin", name: "Michael" },
    { username: "nay2", password: "test", role: "client", name: "Naiberly (Cliente)", cedula: "111111111" },
    { username: "mike2", password: "test", role: "client", name: "Michael (Cliente)", cedula: "222222222" },
  ],

  clients: [
    {
      id: "cli-demo-001",
      name: "Naiberly Omodeo",
      cedula: "111111111",
      phone: "8888-1111",
      email: "naiberly@correo.com",
      address: "San José, Escazú",
      notes: "Clienta frecuente",
      createdAt: "2026-03-01T10:00:00.000Z",
    },
    {
      id: "cli-demo-002",
      name: "Michael Sevilla",
      cedula: "222222222",
      phone: "8888-2222",
      email: "michael@correo.com",
      address: "San José, Santa Ana",
      notes: "",
      createdAt: "2026-03-05T10:00:00.000Z",
    },
  ],

  packages: [
    {
      id: "pkg-demo-001",
      trackingNumber: "TRK-900101",
      clientName: "Naiberly Omodeo",
      clientId: "111111111",
      description: "Bolso Coach signature tote",
      status: "Disponible para entrega",
      notes: "Color: café con monograma",
      statusUpdatedAt: "2026-04-08T14:30:00.000Z",
      createdAt: "2026-03-20T09:00:00.000Z",
    },
    {
      id: "pkg-demo-002",
      trackingNumber: "TRK-900102",
      clientName: "Naiberly Omodeo",
      clientId: "111111111",
      description: "2x Nike Air Max 90 (talla 7 y 8)",
      status: "En tránsito",
      notes: "",
      statusUpdatedAt: "2026-04-06T11:00:00.000Z",
      createdAt: "2026-03-28T15:00:00.000Z",
    },
    {
      id: "pkg-demo-003",
      trackingNumber: "TRK-900103",
      clientName: "Michael Sevilla",
      clientId: "222222222",
      description: "MacBook Pro 14\" M3",
      status: "En aduana",
      notes: "Declarar como equipo personal",
      statusUpdatedAt: "2026-04-07T08:45:00.000Z",
      createdAt: "2026-03-25T12:00:00.000Z",
    },
    {
      id: "pkg-demo-004",
      trackingNumber: "TRK-900104",
      clientName: "Michael Sevilla",
      clientId: "222222222",
      description: "Vitaminas y suplementos (3 frascos)",
      status: "Recibido en EE.UU.",
      notes: "GNC – sin receta",
      statusUpdatedAt: "2026-04-09T16:00:00.000Z",
      createdAt: "2026-04-09T16:00:00.000Z",
    },
    {
      id: "pkg-demo-005",
      trackingNumber: "TRK-900105",
      clientName: "Naiberly Omodeo",
      clientId: "111111111",
      description: "Set de maquillaje Fenty Beauty",
      status: "Entregado",
      notes: "Entregado el 5 de abril",
      statusUpdatedAt: "2026-04-05T10:00:00.000Z",
      createdAt: "2026-03-15T08:00:00.000Z",
    },
  ],

  catalog: [
    {
      id: "cat-demo-001",
      productCode: "PRD-10001",
      name: "Bolso Michael Kors Jet Set",
      price: "85000",
      currency: "CRC",
      notes: "Tote mediano, color negro con herrajes dorados",
      location: "Casa",
      image: "",
      createdAt: "2026-03-10T10:00:00.000Z",
    },
    {
      id: "cat-demo-002",
      productCode: "PRD-10002",
      name: "Cartera Coach Crossbody",
      price: "65",
      currency: "USD",
      notes: "Crossbody pequeño, ideal para salir",
      location: "Casa",
      image: "",
      createdAt: "2026-03-11T10:00:00.000Z",
    },
    {
      id: "cat-demo-003",
      productCode: "PRD-10003",
      name: "Perfume Versace Bright Crystal",
      price: "35000",
      currency: "CRC",
      notes: "90ml, sellado de fábrica",
      location: "Santa Ana",
      image: "",
      createdAt: "2026-03-12T10:00:00.000Z",
    },
    {
      id: "cat-demo-004",
      productCode: "PRD-10004",
      name: "Nike Air Force 1 Blancas",
      price: "55",
      currency: "USD",
      notes: "Tallas disponibles: 7, 8, 9, 10",
      location: "Santa Ana",
      image: "",
      createdAt: "2026-03-13T10:00:00.000Z",
    },
    {
      id: "cat-demo-005",
      productCode: "PRD-10005",
      name: "Billetera Kate Spade",
      price: "28000",
      currency: "CRC",
      notes: "Compacta con cierre, color rosado",
      location: "Casa",
      image: "",
      createdAt: "2026-03-14T10:00:00.000Z",
    },
    {
      id: "cat-demo-006",
      productCode: "PRD-10006",
      name: "Set Stanley Tumbler 40oz",
      price: "25",
      currency: "USD",
      notes: "Incluye pajilla y tapa, color Quencher Rose",
      location: "Casa",
      image: "",
      createdAt: "2026-03-15T10:00:00.000Z",
    },
    {
      id: "cat-demo-007",
      productCode: "PRD-10007",
      name: "Lentes Ray-Ban Aviator",
      price: "45000",
      currency: "CRC",
      notes: "Montura dorada, lente verde clásico",
      location: "Santa Ana",
      image: "",
      createdAt: "2026-03-16T10:00:00.000Z",
    },
    {
      id: "cat-demo-008",
      productCode: "PRD-10008",
      name: "Mochila Herschel Classic",
      price: "40",
      currency: "USD",
      notes: "Color gris oscuro, compartimiento para laptop",
      location: "Santa Ana",
      image: "",
      createdAt: "2026-03-17T10:00:00.000Z",
    },
    {
      id: "cat-demo-009",
      productCode: "PRD-10009",
      name: "Faja Colombiana Salome",
      price: "32000",
      currency: "CRC",
      notes: "Tallas S, M, L disponibles. Control abdomen",
      location: "Casa",
      image: "",
      createdAt: "2026-03-18T10:00:00.000Z",
    },
    {
      id: "cat-demo-010",
      productCode: "PRD-10010",
      name: "Reloj Fossil Mujer Rosé Gold",
      price: "75",
      currency: "USD",
      notes: "Acero inoxidable, resistente al agua",
      location: "Santa Ana",
      image: "",
      createdAt: "2026-03-19T10:00:00.000Z",
    },
  ],
};

// ---- Seed localStorage if empty ----
(function seedDemoData() {
  const STORAGE_KEY = "rastreo_packages";
  const CATALOG_KEY = "rastreo_catalog";
  const CLIENTS_KEY = "rastreo_clients";

  if (!localStorage.getItem(STORAGE_KEY) || JSON.parse(localStorage.getItem(STORAGE_KEY)).length === 0) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEMO_DATA.packages));
  }
  if (!localStorage.getItem(CATALOG_KEY) || JSON.parse(localStorage.getItem(CATALOG_KEY)).length === 0) {
    localStorage.setItem(CATALOG_KEY, JSON.stringify(DEMO_DATA.catalog));
  }
  if (!localStorage.getItem(CLIENTS_KEY) || JSON.parse(localStorage.getItem(CLIENTS_KEY)).length === 0) {
    localStorage.setItem(CLIENTS_KEY, JSON.stringify(DEMO_DATA.clients));
  }
})();
