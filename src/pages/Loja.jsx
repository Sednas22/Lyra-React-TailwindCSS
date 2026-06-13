import { useState } from "react";
import { useApp }    from "../context/AppContext";
import { Link }      from "react-router-dom";
import styles        from "../styles/index.module.css";
import "../styles/Loja.css";
import BottomNav   from "../components/BottomNav";
import Sidebar     from "../components/Sidebar";
import { useLyrium } from "../context/LyriumContext";
import cabide        from "../assets/cabide.png";
import personalidades from "../assets/personalidades.png";
import tags          from "../assets/tags.png";
import bau           from "../assets/bau.png";
import faixaRoxa     from "../assets/Faixa-roxa.png";
import gaucho        from "../assets/gaucho.png";
import militar       from "../assets/militar.png";
import Notificacao   from "../components/Notificacao";

const svg = {
  relogio: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>),
  lyrium:  (<svg width="16" height="16" viewBox="0 0 24 24" fill="#ffd700"><circle cx="12" cy="12" r="10" /><text x="12" y="15" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">◎</text></svg>),
};

const overlay = { position:"fixed", inset:0, background:"rgba(0,0,0,.65)", display:"flex", alignItems:"flex-end", justifyContent:"center", zIndex:99999 };
const sheet   = { background:"#fff", borderRadius:"1.2rem 1.2rem 0 0", padding:"1.5rem", width:"100%", maxWidth:"480px", boxShadow:"0 -4px 32px rgba(0,0,0,.4)" };
const hdr     = { display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:".75rem" };
const btnGreen= { flex:1, padding:".75rem", background:"#2db56e", color:"#fff", border:"none", borderRadius:".75rem", fontWeight:700, fontSize:"1rem", cursor:"pointer" };
const btnGray = { flex:1, padding:".75rem", background:"#fff", color:"#2db56e", border:"1px solid #2db56e", borderRadius:".75rem", fontWeight:600, fontSize:"1rem", cursor:"pointer" };
const btnX    = { background:"none", border:"none", fontSize:"1.2rem", cursor:"pointer", color:"#000", padding:"4px", width:"auto" };


const PRIZE_IMGS = {
  bau_faixaroxa:  faixaRoxa,
  skin_gaucho:    gaucho,
  skin_militar:   militar,
};

function Loja() {
  const { userName }  = useApp();
  const displayName   = userName || "Você";
  const {
    points, spendPoints,
    claimShopChest, hasShopChest, BAU_PRICE, lastShopPrize,
  } = useLyrium();

  const [modal, setModal] = useState(null); 

  function handleBauClick() {
    if (hasShopChest) return;
    setModal(points < BAU_PRICE ? "insufficient" : "confirm");
  }

  function handleConfirm() {
    spendPoints(BAU_PRICE);
    const prize = claimShopChest(); 
    setModal({ type: "prize", prize });
  }

  
  const PRIZE_LABELS = {
    bau_faixaroxa: "Faixa Roxa 🏅",
    skin_gaucho:   "Skin Gaúcho 🧉",
    skin_militar:  "Skin Militar 🪖",
  };

  return (
    <div className={styles.app}>
      <Sidebar />

      <header className={styles.appHeader}>
        <h1>Loja</h1>
        <div className={styles.headerActions}>
          <div className={styles.badgePoints}><span>{points}</span>{svg.lyrium}</div>
          <Notificacao />
        </div>
      </header>

      <header className={styles.desktopHeader}>
        <h1>Loja</h1>
        <div className={styles.headerActions}>
          <div className={styles.desktopUserPill}><span>{displayName}</span>{svg.relogio}</div>
          <Notificacao />
        </div>
      </header>
      <div className={styles.nameBar}><span>{displayName}</span>{svg.relogio}</div>

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
          <div className={styles.sectionHeader}>
            <h2>Baú Surpresa</h2>
          </div>
          <article
            className="shop-card shop-card-featured"
            style={{ cursor: hasShopChest ? "default" : "pointer", opacity: hasShopChest ? 0.6 : 1 }}
            onClick={handleBauClick}
          >
            <div className="shop-card-image"><img src={bau} alt="Baú Surpresa" /></div>
            <div className="shop-card-content">
              <h3>Baú Surpresa</h3>
              {hasShopChest
                ? <p className="shop-card-price" style={{ color:"#22c55e" }}>✓ Aberto hoje · Volta amanhã</p>
                : <p className="shop-card-price"><span className="price-value">{BAU_PRICE}</span>{svg.lyrium}</p>
              }
            </div>
          </article>
        </section>
      </div>

      <BottomNav />

      {modal === "confirm" && (
        <div style={overlay} onClick={() => setModal(null)}>
          <div style={sheet} onClick={e => e.stopPropagation()}>
            <div style={hdr}>
              <h2 style={{ margin:0, fontSize:"1.1rem" }}>Abrir Baú Surpresa?</h2>
              <button style={btnX} onClick={() => setModal(null)}>✕</button>
            </div>
            <p style={{ color:"#000", lineHeight:1.5, marginBottom:"1rem" }}>
              Custa <strong>{BAU_PRICE} ◎ Lyrium</strong>. Você receberá um item aleatório exclusivo.<br />
              Pode ser: <strong>Faixa Roxa, Skin Gaúcho ou Skin Militar</strong>.
            </p>
            <div style={{ display:"flex", gap:".75rem" }}>
              <button style={btnGray}  onClick={() => setModal(null)}>Cancelar</button>
              <button style={btnGreen} onClick={handleConfirm}>Abrir!</button>
            </div>
          </div>
        </div>
      )}

      {modal === "insufficient" && (
        <div style={overlay} onClick={() => setModal(null)}>
          <div style={sheet} onClick={e => e.stopPropagation()}>
            <div style={hdr}>
              <h2 style={{ margin:0, fontSize:"1.1rem" }}>Lyrium insuficiente</h2>
              <button style={btnX} onClick={() => setModal(null)}>✕</button>
            </div>
            <p style={{ color:"#000", lineHeight:1.5, marginBottom:"1rem" }}>
              Você precisa de <strong>{BAU_PRICE} ◎</strong> para abrir o Baú. Complete metas para ganhar mais!
            </p>
            <button style={{ ...btnGreen, width:"100%" }} onClick={() => setModal(null)}>OK</button>
          </div>
        </div>
      )}

      {modal?.type === "prize" && (
        <div style={overlay} onClick={() => setModal(null)}>
          <div style={sheet} onClick={e => e.stopPropagation()}>
            <div style={hdr}>
              <h2 style={{ margin:0, fontSize:"1.1rem" }}>🎉 Item sorteado!</h2>
              <button style={btnX} onClick={() => setModal(null)}>✕</button>
            </div>
            <div style={{ textAlign:"center", margin:"1rem 0" }}>
              <img
                src={PRIZE_IMGS[modal.prize] || bau}
                alt={PRIZE_LABELS[modal.prize]}
                style={{ width:100, height:100, objectFit:"contain", marginBottom:".75rem" }}
              />
              <p style={{ fontWeight:700, fontSize:"1.1rem", marginBottom:".3rem" }}>
                {PRIZE_LABELS[modal.prize] || modal.prize}
              </p>
              <p style={{ color:"#8a9bb5", fontSize:".88rem" }}>
                Já disponível no Vestiário para equipar!
              </p>
            </div>
            <button style={{ ...btnGreen, width:"100%" }} onClick={() => setModal(null)}>Ótimo!</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Loja;
