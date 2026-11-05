// Contenido de la página de inicio (extraído del HTML original).

export const NAV_LINKS = [
  { index: 0, label: "Recorrido" },
  { index: 1, label: "Nosotros" },
  { index: 2, label: "Proceso" },
  { index: 3, label: "Menú" },
  { index: 4, label: "Experiencia" },
];

export const SLIDES = [
  {
    index: 0,
    step: "01",
    label: "INICIO",
    shortLabel: "INICIO",
    titleId: "inicio-title",
    background:
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1920&auto=format&fit=crop",
  },
  {
    index: 1,
    step: "02",
    label: "NUESTRA HISTORIA",
    shortLabel: "NOSOTROS",
    titleId: "historia-title",
    background:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1920&auto=format&fit=crop",
  },
  {
    index: 2,
    step: "03",
    label: "NUESTRA PROMESA",
    shortLabel: "PROCESO",
    titleId: "proceso-title",
    background:
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=1920&auto=format&fit=crop",
  },
  {
    index: 3,
    step: "04",
    label: "ARMA TU MENÚ",
    shortLabel: "MENÚ",
    titleId: "menu-title",
    background:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1920&auto=format&fit=crop",
  },
  {
    index: 4,
    step: "05",
    label: "EL LUGAR",
    shortLabel: "AMBIENTE",
    titleId: "ambiente-title",
    background:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1920&auto=format&fit=crop",
  },
];

export const HERO_TAGS = [
  "Cocina Casera",
  "Desayunos",
  "Almuerzos Ejecutivos",
];

export const PROCESO_PASOS = [
  {
    id: "frescos",
    icon: "carrot",
    step: "PASO 01",
    title: "Ingredientes Frescos",
    description:
      "Seleccionamos diariamente insumos del campo local para garantizar frescura y calidad nutricional.",
  },
  {
    id: "sabor",
    icon: "flame",
    step: "PASO 02",
    title: "Sabor Casero",
    description:
      "Cocinamos con recetas tradicionales perfeccionadas durante más de 20 años de experiencia.",
  },
  {
    id: "preparacion",
    icon: "clock",
    step: "PASO 03",
    title: "Preparación al Instante",
    description:
      "Servimos la comida a la temperatura ideal para mantener su textura y jugosidad óptimas.",
  },
  {
    id: "servicio",
    icon: "heart",
    step: "PASO 04",
    title: "Servicio Caluroso",
    description:
      "Atención amable y dedicada para que te sientas como en casa en cada almuerzo o desayuno.",
  },
];

export const MENU_SECTIONS = [
  {
    id: "principio",
    title: "Principio",
    icon: "utensilsCrossed",
    items: [
      {
        icon: "soup",
        title: "Frijoles Cazuela",
        description: "Sazonados al estilo tradicional antioqueño",
      },
      {
        icon: "leaf",
        title: "Lentejas Caseras",
        description: "Con verduras frescas de la sabana",
      },
      {
        icon: "utensils",
        title: "Sopa del Día",
        description: "Sancocho, crema vegetal o Ajiaco",
      },
      {
        icon: "sprout",
        title: "Garbanzos Guisados",
        description: "Con sofrito especial de tomate y cebolla",
      },
    ],
  },
  {
    id: "proteinas",
    title: "Proteínas",
    icon: "drumstick",
    items: [
      {
        title: "Cañón de Cerdo Dorado",
        description: "A la plancha o en salsa agridulce",
      },
      {
        title: "Pechuga a la Plancha",
        description: "Jugosa fileteada con especias de la casa",
      },
      {
        title: "Carne Desmechada",
        description: "Cocinada a fuego lento en salsa criolla",
      },
      {
        title: "Bagre en Salsa",
        description: "Medallón en guiso de leche de coco",
      },
    ],
  },
  {
    id: "acompanamiento",
    title: "Acompañamiento",
    icon: "salad",
    items: [
      {
        title: "Arroz Blanco o de Coco",
        description: "Suave y granado diariamente",
      },
      {
        title: "Patacón Crispy",
        description: "Plátano verde crujiente con ahogao",
      },
      {
        title: "Ensalada Mixta",
        description: "Vegetales frescos con vinagreta artesanal",
      },
      {
        title: "Papa Francesa o Salada",
        description: "Doradas al punto perfecto",
      },
    ],
  },
];

export const CONTACTO = {
  direccion: "Crra 19 # 14B - 28",
  barrio: "Barrio Prado Vegas",
  horario: "Lunes a domingo, de 07:00 a 16:00",
  horarioDetalle: "Desayunos y Almuerzos Caseros",
  telefono: "3228658935",
  telefonoHref: "tel:+573228658935",
  correo: "jcCasasRestaurant@gmail.com",
  maps: "https://maps.google.com",
  instagram: "https://instagram.com",
  facebook: "https://facebook.com",
  whatsapp: "https://wa.me/573228658935",
};

export const FOOTER_LINKS = [
  { index: 0, label: "Recorrido" },
  { index: 3, label: "Carta" },
  { index: 1, label: "Experiencias" },
  { index: 2, label: "Proceso" },
];

export const FOOTER_LEGAL_LINKS = [
  "Aviso legal",
  "Privacidad",
  "Cookies",
  "Términos de compra",
];
