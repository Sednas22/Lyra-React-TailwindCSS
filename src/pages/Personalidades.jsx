import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/index.module.css";
import "../styles/personalidadesLoja.css";
import Sidebar from "../components/Sidebar";
import BottomNav from "../components/BottomNav";
import LyriumModal from "../components/LyriumModal";
import { useLyrium } from "../context/LyriumContext";
import cowboy from "../assets/cowboy.png";
import robo from "../assets/robo.png";
import general from "../assets/militar.png";
import caipira from "../assets/caipira.png";
import gaucho from "../assets/gaucho.png";
import Notificacao from "../components/Notificacao";

const svg = {
  notificacao: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>),
  relogio: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>),
}

const PERS = [
  { id: "pers_cowboy",  label: "Cowboy",   img: cowboy,   price: 1, sub: "Exemplares" },
  { id: "pers_robo",    label: "Robô",     img: robo,     price: 800, sub: "Exemplares" },
  { id: "pers_militar", label: "Militar",  img: general,  price: 800, sub: "Exemplares" },
  { id: "pers_caipira", label: "Caipira",  img: caipira,  price: 800, sub: "Exemplares" },
  { id: "pers_gaucho",  label: "Gaúcho",   img: gaucho,   price: 800, sub: "Exemplares" },
];

function PersonalidadeItem({ p }) {
  const { points, spendPoints, buyItem, hasBought } = useLyrium();
  const [modal, setModal] = useState(null);
  const bought = hasBought(p.id);

  function handleClick() {
    if (bought) return;
    setModal(points < p.price ? "insufficient" : "confirm");
  }

  function handleConfirm() {
    spendPoints(p.price);
    buyItem(p.id);
    setModal(null);
  }

  return (
    <li className="personality-item" role="listitem" style={{ opacity: bought ? 0.6 : 1 }}>
      <div className="personality-content">
        <div className="personality-image"><img src={p.img} alt={p.label} /></div>
        <div className="personality-info">
          <h3 className="personality-name">{p.label}</h3>
          <p className="personality-label">{p.sub}</p>
        </div>
      </div>
      <div className="personality-action">
        {bought
          ? <p className="personality-price" style={{color:"var(--green-mid,#22c55e)"}}>✓ Comprado</p>
          : <>
              <p className="personality-price">{p.price} <span>◎</span></p>
              <button className="btn-buy" onClick={handleClick} aria-label={`Comprar ${p.label}`}>Comprar</button>
            </>
        }
      </div>

      {modal === "confirm" && <LyriumModal type="confirm" itemName={p.label} price={p.price} onConfirm={handleConfirm} onCancel={() => setModal(null)} />}
      {modal === "insufficient" && <LyriumModal type="insufficient" itemName={p.label} onCancel={() => setModal(null)} />}
    </li>
  );
}

function Personalidades() {
  const { points } = useLyrium();

  return (
    <div className={styles.app}>
      <Sidebar />
      <header className={styles.appHeader}>
        <h1>Loja</h1>
        <div className={styles.headerActions}>
          <div className={styles.badgePoints}>
            <span>{points}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffd700"><circle cx="12" cy="12" r="10" /><text x="12" y="15" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">◎</text></svg>
          </div>
          <Notificacao/>
        </div>
      </header>
      <header className={styles.desktopHeader}>
        <h1>Loja</h1>
        <div className={styles.headerActions}>
          <div className={styles.desktopUserPill}><span>Nome</span>{svg.relogio}</div>
          <Notificacao/>
        </div>
      </header>
      <div className={styles.nameBar}><span>Nome</span>{svg.relogio}</div>

      <div className={styles.scrollContent}>
        <div className="back-button-container">
          <Link to="/loja" className="back-button">← Personalidades</Link>
        </div>
        <div className="section-title-container">
          <h2 className="section-title">Compre novas personalidades para o seu avatar!</h2>
        </div>
        <section className="personalities-section">
          <ul className="personalities-list" role="list">
            {PERS.map(p => <PersonalidadeItem key={p.id} p={p} />)}
          </ul>
        </section>
      </div>
      <BottomNav />
    </div>
  );
}

export default Personalidades;
