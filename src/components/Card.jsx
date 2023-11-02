import '../styles/Card.css';

export default function Card({ imgSrc, name, onClick, className="card-inner" }) {
  return (
    <div className="card" onClick={onClick}>
      <div className={className}>
        <div className="card-front">
          <img src={imgSrc} alt={name} />
          <div className="card-info">
            <h3>{name.toUpperCase()}</h3>
          </div>
        </div>
        <div class="card-back">Poké</div>
      </div>
    </div>
  );
} 