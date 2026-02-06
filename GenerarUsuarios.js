use("Lab02");

db.createCollection("usuarios");

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomString(length) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
  return result;
}

function randomEmail(nombre) {
  const domains = ["gmail.com", "outlook.com", "yahoo.com", "example.com", "mail.com"];
  const clean = nombre.toLowerCase().replace(/\s+/g, ".");
  return `${clean}${randomInt(1, 9999)}@${randomFrom(domains)}`;
}

function randomDateBetween(startDate, endDate) {
  const start = startDate.getTime();
  const end = endDate.getTime();
  return new Date(randomInt(start, end));
}

// Datos base
const nombres = [
  "Adriana Pineda","Bruno Salvatierra","Cecilia Montoya","Dario Figueroa","Elena Solares",
  "Fabian Arriola","Gabriela Chavarria","Hector Manrique","Isabela Santizo","Julian Cifuentes",
  "Karina Escobar","Leonardo Gaitán","Mariana Borrayo","Nicolas Barrios","Olivia Saravia",
  "Pablo Fuentes","Renata Zúñiga","Santiago Tello","Tamara Ibarra","Uriel Córdova",
  "Valentina Avelar","Walter Orellana","Ximena Porras","Yamil Solís","Zoe Villagrán",
  "Alonso Castañeda","Belen Quezada","Cristian Urrutia","Daniela Roldán","Esteban Salguero",
  "Fernanda Munguía","Gustavo Velásquez","Helena Ordóñez","Ivan Cárdenas","Jazmin Perdomo",
  "Kevin Alvarado","Lorena Pacheco","Mateo Contreras","Noemi Fajardo","Oscar Cordero",
  "Paula Coto","Rafael Larios","Sara Carias","Tomas Mazariegos","Ursula Caal",
  "Veronica Barahona","William Paz","Yael Mendizábal","Zaira Mijangos","Arturo Echeverría"
];

const calles = [
  "Avenida Los Próceres",
  "Calle Real del Bosque",
  "Boulevard San Cristóbal",
  "Avenida Reforma Norte",
  "Callejón El Mirador",
  "Boulevard Vista Hermosa",
  "Avenida Las Américas",
  "Calle del Comercio",
  "Boulevard La Montaña",
  "Avenida El Progreso",
  "Calle La Esperanza",
  "Boulevard Jardines del Norte",
  "Avenida Los Álamos",
  "Calle Santa Lucía",
  "Boulevard El Encinal",
  "Avenida La Independencia",
  "Calle Los Cipreses",
  "Boulevard El Dorado",
  "Avenida Las Palmas",
  "Calle La Arboleda",
  "Boulevard San Rafael",
  "Avenida El Rosario",
  "Calle Los Olivos",
  "Boulevard La Paz",
  "Avenida El Cafetal",
  "Calle Monte Verde",
  "Boulevard Altavista",
  "Avenida El Paraíso",
  "Calle Las Magnolias",
  "Boulevard El Mirador Sur",
  "Avenida Los Pinos",
  "Calle San Miguel",
  "Boulevard El Manantial",
  "Avenida Las Rosas",
  "Calle El Molino",
  "Boulevard Los Laureles",
  "Avenida El Sol",
  "Calle La Colina",
  "Boulevard Valle Verde",
  "Avenida Los Cedros",
  "Calle El Refugio",
  "Boulevard Santa Elena",
  "Avenida Las Flores",
  "Calle El Bosque",
  "Boulevard San Antonio",
  "Avenida La Unión",
  "Calle El Horizonte",
  "Boulevard Las Acacias",
  "Avenida El Roble",
  "Calle Los Sauces"
];

const ciudades = [
  "Ciudad de Guatemala",
  "Mixco Viejo",
  "Villa Canales",
  "San Miguel Petapa",
  "Amatitlán",
  "Santa Catarina Pinula",
  "Fraijanes",
  "Chinautla",
  "San José Pinula",
  "Palín",
  "Mazatenango",
  "Coatepeque",
  "Retalhuleu",
  "Chimaltenango",
  "Sololá",
  "Totonicapán",
  "Huehuetenango",
  "Zacapa",
  "Chiquimula",
  "Jalapa",
  "Jutiapa",
  "Puerto Barrios",
  "Livingston",
  "Cobán",
  "San Pedro Carchá",
  "Salamá",
  "Baja Verapaz",
  "Santa Cruz del Quiché",
  "Nebaj",
  "Uspantán",
  "Patzún",
  "Patzicía",
  "Tecpán",
  "San Marcos",
  "Malacatán",
  "Ayutla",
  "La Democracia",
  "Nueva Concepción",
  "La Gomera",
  "Santa Lucía Cotzumalguapa",
  "Tiquisate",
  "El Estor",
  "Río Dulce",
  "Morales",
  "Gualán",
  "Esquipulas",
  "Asunción Mita",
  "El Progreso",
  "Guastatoya",
  "Sanarate"
];

const colores = ["anaranjado","azul","verde","negro","blanco","morado", "rosado"];
const idiomas = ["es","en","fr", "pt", "de", "it"];
const temas = ["claro","oscuro"];

const productos = ["Producto 1", "Producto 2", "Producto 3", "Producto 4", "Producto 5"];

const tagsPool = ["tag1", "tag2", "tag3", "tag4", "tag5", "promo", "vip", "nuevo"];

const startReg = new Date("2022-01-01T00:00:00Z");
const endReg = new Date();

const TOTAL = 105000;
const BATCH_SIZE = 2000; // inserta por lotes para no reventar memoria

let batch = [];

for (let i = 1; i <= TOTAL; i++) {
  const nombre = randomFrom(nombres);

  const email = randomEmail(nombre);

  const fecha_registro = randomDateBetween(startReg, endReg);

  const puntos = randomInt(0, 5000);

  const comprasCount = randomInt(0, 12);
  const historial_compras = [];

  for (let c = 0; c < comprasCount; c++) {
    const usarProducto1 = Math.random() < 0.60; // 60% de compras serán Producto 1
    const producto = usarProducto1 ? "Producto 1" : randomFrom(productos);
    const fechaCompra = randomDateBetween(fecha_registro, endReg);

    historial_compras.push({
      producto: producto,
      fecha: fechaCompra
    });
  }

  const direccion = {
    calle: `${randomFrom(calles)} #${randomInt(1, 999)}`,
    ciudad: randomFrom(ciudades),
    codigo_postal: randomInt(1000, 99999)
  };

  const tags = [];
  const incluirTag2 = Math.random() < 0.70;
  if (incluirTag2) tags.push("tag2");

  const extraTagsCount = randomInt(0, 4);
  while (tags.length < (incluirTag2 ? 1 + extraTagsCount : extraTagsCount)) {
    const t = randomFrom(tagsPool);
    if (!tags.includes(t)) tags.push(t);
  }

  const activo = Math.random() < 0.85;

  const notas = `Nota_${randomString(10)}`;

  const visitas = randomInt(0, 2000);

  const superPopular = Math.random() < 0.03;
  const cantidad_amigos = superPopular ? randomInt(1001, 10000) : randomInt(0, 1000);

  const preferencias = {
    color: randomFrom(colores),
    idioma: randomFrom(idiomas),
    tema: randomFrom(temas)
  };

  const doc = {
    nombre,
    email,
    fecha_registro,
    puntos,
    historial_compras,
    direccion,
    tags,
    activo,
    notas,
    visitas,
    cantidad_amigos,
    preferencias
  };

  batch.push(doc);

  if (batch.length === BATCH_SIZE) {
    db.usuarios.insertMany(batch);
    batch = [];
  }
}

if (batch.length > 0) {
  db.usuarios.insertMany(batch);
}
