function ChemistryCard({ icon, title, text, button }) {
  return (
    <div className="card">
      <h2>{icon}</h2>

      <h3>{title}</h3>

      <p>{text}</p>

      <button>{button}</button>
    </div>
  );
}

export default ChemistryCard;
