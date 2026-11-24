import { useState } from "react";

const DATOS_PRINCIPIO = [
  { id: 1, imagen: "Frijoles", titulo: "Frijoles Guisados", descripcion: "Guisados estilo Tradicional." },
  { id: 2, imagen: "Lentejas", titulo: "Lentejas Caseras", descripcion: "Con ahogado de la casa." }
];

const DATOS_PROTEINA = [
  { id: 1, imagen: "Carne", titulo: "Carne Asada", descripcion: "Corte magro a la plancha." },
  { id: 2, imagen: "Pechuga", titulo: "Pechuga a la plancha", descripcion: "Fileteada con sazon casera." }
];

const DATOS_ACOMPANAMIENTO = [
  { id: 1, imagen: "Arroz", titulo: "Arroz Blanco", descripcion: "Porcion tradicional de la casa." },
  { id: 2, imagen: "Platano/Ensalada", titulo: "Tajada o Ensalada", descripcion: "Maduro frito o ensalda fresca." }
];

export function useMenuState() {
  const [openPrincipio, setOpenPrincipio] = useState(false);
  const [openProteina, setOpenProteina] = useState(false);
  const [openAcompanamiento, setOpenAcompanamiento] = useState(false);

  const [modalAbierto, setModalAbierto] = useState(false);
  const [itemSeleccionado, setItemSeleccionado] = useState(null);

  const handleAbrirModal = (item) => {
    setItemSeleccionado(item);
    setModalAbierto(true);
  };

  const handleCerrarModal = () => {
    setModalAbierto(false);
    setItemSeleccionado(null);
  };

  return {
    datosPrincipio: DATOS_PRINCIPIO,
    datosProteina: DATOS_PROTEINA,
    datosAcompanamiento: DATOS_ACOMPANAMIENTO,
    openPrincipio,
    setOpenPrincipio,
    openProteina,
    setOpenProteina,
    openAcompanamiento,
    setOpenAcompanamiento,
    modalAbierto,
    itemSeleccionado,
    handleAbrirModal,
    handleCerrarModal
  };
}