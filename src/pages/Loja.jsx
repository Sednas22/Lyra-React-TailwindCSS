import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/index.module.css";
import "../styles/Loja.css";
import BottomNav from "../components/BottomNav";
import Sidebar from "../components/Sidebar";
import LyriumModal from "../components/LyriumModal";
import { useLyrium } from "../context/LyriumContext";
import cabide from "../assets/cabide.png";
import personalidades from "../assets/personalidades.png";
import tags from "../assets/tags.png";
import bau from "../assets/bau.png";
import Notificacao from "../components/Notificacao";

const svg = {
  notificacao: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>),
  relogio: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>),
  lyrium: (<svg width="16" height="16" viewBox="0 0 24 24" fill="#ffd700"><circle cx="12" cy="12" r="10" /><text x="12" y="15" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">◎</text></svg>),
}

function Loja() {
  const { points, spendPoints, claimShopChest, hasShopChest, BAU_PRIZE, BAU_PRICE } = useLyrium();
  const [modal, setModal] = useState(null);

  function handleBauClick() {
    if (hasShopChest) return;
    setModal(points < BAU_PRICE ? "insufficient" : "chest_confirm");
  }

  function handleBauConfirm() {
    spendPoints(BAU_PRICE);
    claimShopChest();
    setModal("item");
  }

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
        <section className={styles.section}>
          <div className={styles.sectionHeader}><h2>Roupas & Skins</h2></div>
          <Link to="/loja/roupas" className="shop-card-link">
            <article className="shop-card shop-card-featured">
              <div className="shop-card-image"><img src={cabide} alt="Roupas e Skins" /></div>
              <div className="shop-card-content"><h3>Roupas & Skins</h3></div>
            </article>
          </Link>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}><h2>Personalidades</h2></div>
          <Link to="/loja/personalidades" className="shop-card-link">
            <article className="shop-card shop-card-featured">
              <div className="shop-card-image"><img src={personalidades} alt="Personalidades" /></div>
              <div className="shop-card-content"><h3>Personalidades</h3></div>
            </article>
          </Link>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}><h2>Tags</h2></div>
          <Link to="/loja/tags" className="shop-card-link">
            <article className="shop-card shop-card-featured">
              <div className="shop-card-image"><img src={tags} alt="Tags" /></div>
              <div className="shop-card-content"><h3>Tags</h3></div>
            </article>
          </Link>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}><h2>Baú</h2></div>
          <article
            className="shop-card shop-card-featured"
            style={{ cursor: hasShopChest ? "default" : "pointer", opacity: hasShopChest ? 0.6 : 1 }}
            onClick={handleBauClick}
          >
            <div className="shop-card-image"><img src={bau} alt="Baú" /></div>
            <div className="shop-card-content">
              <h3>Baú</h3>
              {hasShopChest
                ? <p className="shop-card-price" style={{color:"var(--green-mid,#22c55e)"}}>✓ Já resgatado</p>
                : <p className="shop-card-price"><span className="price-value">{BAU_PRICE}</span>{svg.lyrium}</p>
              }
            </div>
          </article>
        </section>
      </div>
      <BottomNav />

      {modal === "chest_confirm" && <LyriumModal type="chest_confirm" price={BAU_PRICE} onConfirm={handleBauConfirm} onCancel={() => setModal(null)} />}
      {modal === "insufficient" && <LyriumModal type="insufficient" itemName="Baú" onCancel={() => setModal(null)} />}
      {modal === "item" && <LyriumModal type="item" itemName={BAU_PRIZE.name} onCancel={() => setModal(null)} />}
    </div>
  );
}

export default Loja;
