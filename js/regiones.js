// Regiones y Comunas
const regionesComunas = {
  "Región Metropolitana de Santiago": ["Santiago", "Providencia", "Las Condes", "Maipú", "Puente Alto"],
  "Región de Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana", "San Antonio"],
  "Región del Biobío": ["Concepción", "Talcahuano", "Chillán", "Los Ángeles"],
  "Región de la Araucanía": ["Temuco", "Villarrica", "Angol"],
  "Región de Ñuble": ["Chillán", "San Carlos"],
  "Región de Coquimbo": ["La Serena", "Coquimbo", "Ovalle"]
};

// Cargar Regiones
function cargarRegiones() {
  const selectRegion = document.getElementById("region");
  if (!selectRegion) return;

  Object.keys(regionesComunas).forEach(region => {
    const opcion = document.createElement("option");
    opcion.value = region;
    opcion.textContent = region;
    selectRegion.appendChild(opcion);
  });
}

// Cargar comunas
function cargarComunas() {
  const selectRegion = document.getElementById("region");
  const selectComuna = document.getElementById("comuna");
  if (!selectRegion || !selectComuna) return;

  const regionElegida = selectRegion.value;

  // Limpiar campos
  selectComuna.innerHTML = '<option value="">-- Seleccione la comuna --</option>';

  if (regionElegida && regionesComunas[regionElegida]) {
    regionesComunas[regionElegida].forEach(comuna => {
      const opcion = document.createElement("option");
      opcion.value = comuna;
      opcion.textContent = comuna;
      selectComuna.appendChild(opcion);
    });
  }
}

// Carga contenido de la pagina 
document.addEventListener("DOMContentLoaded", () => {
  cargarRegiones();
  const selectRegion = document.getElementById("region");
  if (selectRegion) {
    selectRegion.addEventListener("change", cargarComunas);
  }
});