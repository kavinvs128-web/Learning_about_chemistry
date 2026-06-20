// periodicTable.jsx
// Exports: <PeriodicBackground /> — the animated periodic table grid used as a background

// ── Element data ───────────────────────────────────────────────
const ELEMENTS = [
  { n: 1, sym: "H", name: "Hydrogen", type: "reactive", col: 1, row: 1 },
  { n: 2, sym: "He", name: "Helium", type: "noble", col: 18, row: 1 },

  { n: 3, sym: "Li", name: "Lithium", type: "alkali", col: 1, row: 2 },
  { n: 4, sym: "Be", name: "Beryllium", type: "alkaline", col: 2, row: 2 },
  { n: 5, sym: "B", name: "Boron", type: "metalloid", col: 13, row: 2 },
  { n: 6, sym: "C", name: "Carbon", type: "nonmetal", col: 14, row: 2 },
  { n: 7, sym: "N", name: "Nitrogen", type: "nonmetal", col: 15, row: 2 },
  { n: 8, sym: "O", name: "Oxygen", type: "nonmetal", col: 16, row: 2 },
  { n: 9, sym: "F", name: "Fluorine", type: "halogen", col: 17, row: 2 },
  { n: 10, sym: "Ne", name: "Neon", type: "noble", col: 18, row: 2 },

  { n: 11, sym: "Na", name: "Sodium", type: "alkali", col: 1, row: 3 },
  { n: 12, sym: "Mg", name: "Magnesium", type: "alkaline", col: 2, row: 3 },
  { n: 13, sym: "Al", name: "Aluminum", type: "post", col: 13, row: 3 },
  { n: 14, sym: "Si", name: "Silicon", type: "metalloid", col: 14, row: 3 },
  { n: 15, sym: "P", name: "Phosphorus", type: "nonmetal", col: 15, row: 3 },
  { n: 16, sym: "S", name: "Sulfur", type: "nonmetal", col: 16, row: 3 },
  { n: 17, sym: "Cl", name: "Chlorine", type: "halogen", col: 17, row: 3 },
  { n: 18, sym: "Ar", name: "Argon", type: "noble", col: 18, row: 3 },

  { n: 19, sym: "K", name: "Potassium", type: "alkali", col: 1, row: 4 },
  { n: 20, sym: "Ca", name: "Calcium", type: "alkaline", col: 2, row: 4 },
  { n: 21, sym: "Sc", name: "Scandium", type: "transition", col: 3, row: 4 },
  { n: 22, sym: "Ti", name: "Titanium", type: "transition", col: 4, row: 4 },
  { n: 23, sym: "V", name: "Vanadium", type: "transition", col: 5, row: 4 },
  { n: 24, sym: "Cr", name: "Chromium", type: "transition", col: 6, row: 4 },
  { n: 25, sym: "Mn", name: "Manganese", type: "transition", col: 7, row: 4 },
  { n: 26, sym: "Fe", name: "Iron", type: "transition", col: 8, row: 4 },
  { n: 27, sym: "Co", name: "Cobalt", type: "transition", col: 9, row: 4 },
  { n: 28, sym: "Ni", name: "Nickel", type: "transition", col: 10, row: 4 },
  { n: 29, sym: "Cu", name: "Copper", type: "transition", col: 11, row: 4 },
  { n: 30, sym: "Zn", name: "Zinc", type: "transition", col: 12, row: 4 },
  { n: 31, sym: "Ga", name: "Gallium", type: "post", col: 13, row: 4 },
  { n: 32, sym: "Ge", name: "Germanium", type: "metalloid", col: 14, row: 4 },
  { n: 33, sym: "As", name: "Arsenic", type: "metalloid", col: 15, row: 4 },
  { n: 34, sym: "Se", name: "Selenium", type: "nonmetal", col: 16, row: 4 },
  { n: 35, sym: "Br", name: "Bromine", type: "halogen", col: 17, row: 4 },
  { n: 36, sym: "Kr", name: "Krypton", type: "noble", col: 18, row: 4 },

  { n: 37, sym: "Rb", name: "Rubidium", type: "alkali", col: 1, row: 5 },
  { n: 38, sym: "Sr", name: "Strontium", type: "alkaline", col: 2, row: 5 },
  { n: 39, sym: "Y", name: "Yttrium", type: "transition", col: 3, row: 5 },
  { n: 40, sym: "Zr", name: "Zirconium", type: "transition", col: 4, row: 5 },
  { n: 41, sym: "Nb", name: "Niobium", type: "transition", col: 5, row: 5 },
  { n: 42, sym: "Mo", name: "Molybdenum", type: "transition", col: 6, row: 5 },
  { n: 43, sym: "Tc", name: "Technetium", type: "transition", col: 7, row: 5 },
  { n: 44, sym: "Ru", name: "Ruthenium", type: "transition", col: 8, row: 5 },
  { n: 45, sym: "Rh", name: "Rhodium", type: "transition", col: 9, row: 5 },
  { n: 46, sym: "Pd", name: "Palladium", type: "transition", col: 10, row: 5 },
  { n: 47, sym: "Ag", name: "Silver", type: "transition", col: 11, row: 5 },
  { n: 48, sym: "Cd", name: "Cadmium", type: "transition", col: 12, row: 5 },
  { n: 49, sym: "In", name: "Indium", type: "post", col: 13, row: 5 },
  { n: 50, sym: "Sn", name: "Tin", type: "post", col: 14, row: 5 },
  { n: 51, sym: "Sb", name: "Antimony", type: "metalloid", col: 15, row: 5 },
  { n: 52, sym: "Te", name: "Tellurium", type: "metalloid", col: 16, row: 5 },
  { n: 53, sym: "I", name: "Iodine", type: "halogen", col: 17, row: 5 },
  { n: 54, sym: "Xe", name: "Xenon", type: "noble", col: 18, row: 5 },

  { n: 55, sym: "Cs", name: "Cesium", type: "alkali", col: 1, row: 6 },
  { n: 56, sym: "Ba", name: "Barium", type: "alkaline", col: 2, row: 6 },
  { n: 57, sym: "La", name: "Lanthanum", type: "lanth", col: 3, row: 6 },
  { n: 72, sym: "Hf", name: "Hafnium", type: "transition", col: 4, row: 6 },
  { n: 73, sym: "Ta", name: "Tantalum", type: "transition", col: 5, row: 6 },
  { n: 74, sym: "W", name: "Tungsten", type: "transition", col: 6, row: 6 },
  { n: 75, sym: "Re", name: "Rhenium", type: "transition", col: 7, row: 6 },
  { n: 76, sym: "Os", name: "Osmium", type: "transition", col: 8, row: 6 },
  { n: 77, sym: "Ir", name: "Iridium", type: "transition", col: 9, row: 6 },
  { n: 78, sym: "Pt", name: "Platinum", type: "transition", col: 10, row: 6 },
  { n: 79, sym: "Au", name: "Gold", type: "transition", col: 11, row: 6 },
  { n: 80, sym: "Hg", name: "Mercury", type: "transition", col: 12, row: 6 },
  { n: 81, sym: "Tl", name: "Thallium", type: "post", col: 13, row: 6 },
  { n: 82, sym: "Pb", name: "Lead", type: "post", col: 14, row: 6 },
  { n: 83, sym: "Bi", name: "Bismuth", type: "post", col: 15, row: 6 },
  { n: 84, sym: "Po", name: "Polonium", type: "metalloid", col: 16, row: 6 },
  { n: 85, sym: "At", name: "Astatine", type: "halogen", col: 17, row: 6 },
  { n: 86, sym: "Rn", name: "Radon", type: "noble", col: 18, row: 6 },
];

// ── Single cell ────────────────────────────────────────────────
function ElementCell({ el }) {
  return (
    <div
      className={`element ${el.type}`}
      style={{ "--col": el.col, "--row": el.row }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-0.7rem) scale(1.04)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "";
      }}
    >
      <span>{el.n}</span>
      <strong>{el.sym}</strong>
      <em>{el.name}</em>
    </div>
  );
}

// ── Background grid ───────────────────────────────────────────
function PeriodicBackground() {
  return (
    <div className="periodic-bg" aria-hidden="true">
      {ELEMENTS.map((el) => (
        <ElementCell key={el.n} el={el} />
      ))}
    </div>
  );
}

export default PeriodicBackground;
