import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/index.module.css";
import "../styles/tagsLoja.css";
import Sidebar from "../components/Sidebar";
import BottomNav from "../components/BottomNav";
import LyriumModal from "../components/LyriumModal";
import { useLyrium } from "../context/LyriumContext";
import navegador from "../assets/tag1.png";
import arquiteto from "../assets/tag2.png";
import mestre from "../assets/tag3.png";
import maratonista from "../assets/tag4.png";
import guardiao from "../assets/tag5.png";
import Notificacao from "../components/Notificacao";

const svg = {
  notificacao: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>),
  relogio: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>),
  lyrium: (<svg width="16" height="16" viewBox="0 0 24 24" fill="#ffd700"><circle cx="12" cy="12" r="10" /><text x="12" y="15" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">◎</text></svg>),
}

const TAGS = [
  { id: "tag_guardiao",    label: "Guardião do Coração", img: guardiao,    price: 1500, rarity: "Raras" },
  { id: "tag_maratonista", label: "Maratonista",         img: maratonista, price: 1500, rarity: "Raras" },
  { id: "tag_mestre",      label: "Mestre do Sono",      img: mestre,      price: 3000, rarity: "Épicas" },
  { id: "tag_arquiteto",   label: "Arquiteto da Vida",   img: arquiteto,   price: 3000, rarity: "Épicas" },
  { id: "tag_navegador",   label: "Navegador da Vitalidade", img: navegador, price: 6000, rarity: "Lendária" },
];

function TagCard({ tag }) {
  const { points, spendPoints, buyItem, hasBought } = useLyrium();
  const [modal, setModal] = useState(null);
  const bought = hasBought(tag.id);

  function handleClick() {
    if (bought) return;
    setModal(points < tag.price ? "insufficient" : "confirm");
  }

  function handleConfirm() {
    spendPoints(tag.price);
    buyItem(tag.id);
    setModal(null);
  }

  return (
    <li className="tag-item">
      <article className="tag-card" style={{ opacity: bought ? 0.55 : 1 }}>
        <img src={tag.img} alt={tag.label} />
        <div className="tag-content">
          {bought
            ? <p className="tag-price" style={{color:"var(--green-mid,#22c55e)"}}>✓ Comprado</p>
            : <p className="tag-price">{tag.price} <span>{svg.lyrium}</span></p>
          }
          {!bought && (
            <button className="btn-buy-tag" type="button" onClick={handleClick}>Comprar</button>
          )}
        </div>
      </article>

      {modal === "confirm" && <LyriumModal type="confirm" itemName={tag.label} price={tag.price} onConfirm={handleConfirm} onCancel={() => setModal(null)} />}
      {modal === "insufficient" && <LyriumModal type="insufficient" itemName={tag.label} onCancel={() => setModal(null)} />}
    </li>
  );
}

function Tags() {
  const { points } = useLyrium();
  const rarities = [...new Set(TAGS.map(t => t.rarity))];

  return (
    <div className={styles.app}>
      <Sidebar />
      <header className={styles.appHeader}>
        <h1>Loja</h1>
        <div className={styles.headerActions}>
          <div className={styles.badgePoints}><span>{points}</span>{svg.lyrium}</div>
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
          <Link to="/loja" className="back-button">← Tags</Link>
        </div>
        <main className="tags-store">
          {rarities.map(rarity => (
            <section key={rarity} className="rarity-section" aria-labelledby={`${rarity}-title`}>
              <h2 id={`${rarity}-title`} className="rarity-title">{rarity}</h2>
              <ul className={`tags-grid${rarity === "Lendária" ? " tags-grid-single" : ""}`} role="list">
                {TAGS.filter(t => t.rarity === rarity).map(tag => <TagCard key={tag.id} tag={tag} />)}
              </ul>
            </section>
          ))}
        </main>
      </div>
      <BottomNav />
    </div>
  );
}

export default Tags;
