import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/index.module.css";
import "../styles/skinsLoja.css";
import Sidebar from "../components/Sidebar";
import BottomNav from "../components/BottomNav";
import { useLyrium } from "../context/LyriumContext";
import camisa from "../assets/camisa.png";
import regata from "../assets/regata.png";
import shorts from "../assets/shorts.png";
import tenis from "../assets/tenis.png";
import garrafa from "../assets/garrafa.png";
import testeira from "../assets/Faixa-roxa.png";
import pochete from "../assets/pochete.png";
import bone from "../assets/bone.png";
import homemaranha from "../assets/homemAranha.png";
import robo from "../assets/robo.png";
import caipira from "../assets/caipira.png";
import neymar from "../assets/neymar.png";
import Notificacao from "../components/Notificacao";

const LyriumIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffd700">
    <circle cx="12" cy="12" r="10" />
    <text x="12" y="15" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">◎</text>
  </svg>
);

const ITEMS = [
  { id: "roupa_camisa",   label: "Camisa",       img: camisa,      price: 50, category: "Roupas" },
  { id: "roupa_regata",   label: "Regata",       img: regata,      price: 50, category: "Roupas" },
  { id: "roupa_shorts",   label: "Shorts",       img: shorts,      price: 50, category: "Roupas" },
  { id: "roupa_tenis",    label: "Tênis",        img: tenis,       price: 50, category: "Roupas" },
  { id: "aces_garrafa",   label: "Garrafa",      img: garrafa,     price: 50, category: "Acessórios" },
  { id: "aces_testeira",  label: "Testeira",     img: testeira,    price: 50, category: "Acessórios" },
  { id: "aces_pochete",   label: "Pochete",      img: pochete,     price: 50, category: "Acessórios" },
  { id: "aces_bone",      label: "Boné",         img: bone,        price: 50, category: "Acessórios" },
  { id: "skin_aranha",    label: "Homem-Aranha", img: homemaranha, price: 50, category: "Skins" },
  { id: "skin_robo",      label: "Robô",         img: robo,        price: 50, category: "Skins" },
  { id: "skin_caipira",   label: "Caipira",      img: caipira,     price: 50, category: "Skins" },
  { id: "skin_neymar",    label: "Neymar",       img: neymar,      price: 50, category: "Skins" },
];

// ── estilos inline do modal ─────────────────────────────────────────────────
const overlayStyle = {
  position: "fixed", inset: 0,
  background: "rgba(0,0,0,.6)",
  display: "flex", alignItems: "flex-end", justifyContent: "center",
  zIndex: 99999,
};
const sheetStyle = {
  background: "#1a1f2e",
  borderRadius: "1.2rem 1.2rem 0 0",
  padding: "1.5rem",
  width: "100%",
  maxWidth: "480px",
  boxShadow: "0 -4px 32px rgba(0,0,0,.4)",
};
const rowStyle   = { display: "flex", gap: ".75rem", marginTop: "1rem" };
const btnOk      = { flex:1, padding:".75rem", background:"#22c55e", color:"#fff", border:"none", borderRadius:".75rem", fontWeight:700, fontSize:"1rem", cursor:"pointer" };
const btnCancel  = { flex:1, padding:".75rem", background:"#252b3b", color:"#e2e8f0", border:"1px solid #2d3548", borderRadius:".75rem", fontWeight:600, fontSize:"1rem", cursor:"pointer" };
const btnClose   = { background:"none", border:"none", fontSize:"1.2rem", cursor:"pointer", color:"#8a9bb5", lineHeight:1, padding:"4px" };
const hdrStyle   = { display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:".75rem" };
const bodyStyle  = { color:"#8a9bb5", lineHeight:1.5, fontSize:".95rem" };

function Roupas() {
  const { points, spendPoints, buyItem, hasBought } = useLyrium();

  const [modal, setModal] = useState(null);

  const categories = [...new Set(ITEMS.map(i => i.category))];

  function handleBuyClick(item) {
    console.log("handleBuyClick chamado", item.label, "points:", points); 
    if (hasBought(item.id)) return;
    setModal({ type: points < item.price ? "insufficient" : "confirm", item });
  }

  function handleConfirm() {
    spendPoints(modal.item.price);
    buyItem(modal.item.id);
    setModal(null);
  }

  return (
    <div className={styles.app}>
      <Sidebar />

      <header className={styles.appHeader}>
        <h1>Loja</h1>
        <div className={styles.headerActions}>
          <div className={styles.badgePoints}>
            <span>{points}</span>
            <LyriumIcon />
          </div>
          <Notificacao />
        </div>
      </header>

      <header className={styles.desktopHeader}>
        <h1>Loja</h1>
        <div className={styles.headerActions}>
          <div className={styles.desktopUserPill}>
            <span>Nome</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <Notificacao />
        </div>
      </header>

      <div className={styles.nameBar}>
        <span>Nome</span>
      </div>

      <div className="scroll-content">
        <div className="back-button-container">
          <Link to="/loja" className="back-button">← Roupas & Skins</Link>
        </div>

        {categories.map(cat => (
          <section key={cat} className="category-section">
            <h2 className="category-title">{cat}</h2>
            <div className="carousel-container">
              <div className="carousel-scroll" role="region" aria-label={`Carrossel de ${cat}`}>
                {ITEMS.filter(i => i.category === cat).map(item => {
                  const bought = hasBought(item.id);
                  return (
                    <article key={item.id} className="carousel-item">
                      <div className="item-card" style={{ opacity: bought ? 0.55 : 1 }}>
                        <div className="item-image">
                          <img src={item.img} alt={item.label} />
                        </div>
                        <div className="item-info">
                          {bought
                            ? <p className="item-price" style={{ color: "#22c55e" }}>✓ Comprado</p>
                            : <p className="item-price">{item.price} <span><LyriumIcon /></span></p>
                          }
                        </div>
                        {!bought && (
                          <button
                            type="button"
                            className="btn-buy-tag"
                            style={{ marginTop: "6px", width: "100%" }}
                            onClick={() => handleBuyClick(item)}
                          >
                            Comprar
                          </button>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        ))}
      </div>

      <BottomNav />

      {modal?.type === "confirm" && (
        <div style={overlayStyle} onClick={() => setModal(null)}>
          <div style={sheetStyle} onClick={e => e.stopPropagation()}>
            <div style={hdrStyle}>
              <h2 style={{ margin: 0, fontSize: "1.1rem" }}>Confirmar compra</h2>
              <button style={btnClose} onClick={() => setModal(null)}>✕</button>
            </div>
            <p style={bodyStyle}>
              Comprar <strong>{modal.item.label}</strong> por{" "}
              <strong>{modal.item.price} ◎</strong>?
            </p>
            <div style={rowStyle}>
              <button style={btnCancel} onClick={() => setModal(null)}>Cancelar</button>
              <button style={btnOk}     onClick={handleConfirm}>Confirmar</button>
            </div>
          </div>
        </div>
      )}

      {modal?.type === "insufficient" && (
        <div style={overlayStyle} onClick={() => setModal(null)}>
          <div style={sheetStyle} onClick={e => e.stopPropagation()}>
            <div style={hdrStyle}>
              <h2 style={{ margin: 0, fontSize: "1.1rem" }}>Lyrium insuficiente</h2>
              <button style={btnClose} onClick={() => setModal(null)}>✕</button>
            </div>
            <p style={bodyStyle}>
              Você não tem Lyrium suficiente para comprar <strong>{modal.item.label}</strong>.
              Continue completando metas para ganhar mais!
            </p>
            <button style={{ ...btnOk, flex: undefined, width: "100%" }} onClick={() => setModal(null)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Roupas;
