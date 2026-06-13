import { useState } from "react";
import { useApp }   from "../context/AppContext";
import { Link }     from "react-router-dom";
import styles       from "../styles/index.module.css";
import "../styles/tagsLoja.css";
import Sidebar    from "../components/Sidebar";
import BottomNav  from "../components/BottomNav";
import { useLyrium } from "../context/LyriumContext";
import navegador  from "../assets/tag1.png";
import arquiteto  from "../assets/tag2.png";
import mestre     from "../assets/tag3.png";
import maratonista from "../assets/tag4.png";
import guardiao   from "../assets/tag5.png";
import Notificacao from "../components/Notificacao";

const LyriumIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffd700">
    <circle cx="12" cy="12" r="10"/>
    <text x="12" y="15" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">◎</text>
  </svg>
);
const svgRelogio = (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>);

const overlayStyle = { position:"fixed",inset:0,background:"rgba(0,0,0,.6)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:99999 };
const sheetStyle   = { background:"#fff",borderRadius:"1.2rem 1.2rem 0 0",padding:"1.5rem",width:"100%",maxWidth:"480px",boxShadow:"0 -4px 32px rgba(0,0,0,.4)" };
const rowStyle     = { display:"flex",gap:".75rem",marginTop:"1rem" };
const btnOk        = { flex:1,padding:".75rem",background:"#2db56e",color:"#fff",border:"none",borderRadius:".75rem",fontWeight:700,fontSize:"1rem",cursor:"pointer" };
const btnCancel    = { flex:1,padding:".75rem",background:"#fff",color:"#2db56e",border:"1px solid #2db56e",borderRadius:".75rem",fontWeight:600,fontSize:"1rem",cursor:"pointer" };
const btnClose     = { background:"none",border:"none",fontSize:"1.2rem",cursor:"pointer",color:"#000",lineHeight:1,padding:"4px", width:"auto" };
const hdrStyle     = { display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:".75rem" };

const TAGS = [
  { id:"tag_guardiao",    label:"Guardião do Coração",    img:guardiao,    price:1500, rarity:"Raras"    },
  { id:"tag_maratonista", label:"Maratonista",            img:maratonista, price:1500, rarity:"Raras"    },
  { id:"tag_mestre",      label:"Mestre do Sono",         img:mestre,      price:3000, rarity:"Épicas"   },
  { id:"tag_arquiteto",   label:"Arquiteto da Vida",      img:arquiteto,   price:3000, rarity:"Épicas"   },
  { id:"tag_navegador",   label:"Navegador da Vitalidade",img:navegador,   price:6000, rarity:"Lendária" },
];

const RARITIES = ["Raras","Épicas","Lendária"];

function Tags() {
  const { userName }  = useApp();
  const displayName   = userName || "Você";
  const { points, spendPoints, buyItem, hasBought } = useLyrium();
  const [modal, setModal] = useState(null);

  function handleClick(tag) {
    if (hasBought(tag.id)) return;
    setModal({ type: points < tag.price ? "insufficient" : "confirm", item: tag });
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
          <div className={styles.badgePoints}><span>{points}</span><LyriumIcon /></div>
          <Notificacao />
        </div>
      </header>

      <header className={styles.desktopHeader}>
        <h1>Loja</h1>
        <div className={styles.headerActions}>
          <div className={styles.desktopUserPill}><span>{displayName}</span>{svgRelogio}</div>
          <Notificacao />
        </div>
      </header>
      <div className={styles.nameBar}><span>{displayName}</span>{svgRelogio}</div>

      <div className={styles.scrollContent}>
        <div className="back-button-container">
          <Link to="/loja" className="back-button">← Tags</Link>
        </div>

        <main className="tags-store">
          {RARITIES.map(rarity => {
            const grupo = TAGS.filter(t => t.rarity === rarity);
            if (!grupo.length) return null;
            return (
              <section key={rarity} className="rarity-section">
                <h2 className="rarity-title">{rarity}</h2>
                <ul className={`tags-grid${rarity === "Lendária" ? " tags-grid-single" : ""}`} role="list">
                  {grupo.map(tag => {
                    const bought = hasBought(tag.id);
                    return (
                      <li key={tag.id} className="tag-item">
                        <article className="tag-card" style={{ opacity: bought ? 0.55 : 1 }}>
                          <img src={tag.img} alt={tag.label} />
                          <div className="tag-content">
                            {bought
                              ? <p className="tag-price" style={{ color:"#22c55e" }}>✓ Comprado</p>
                              : <p className="tag-price">{tag.price} <span><LyriumIcon /></span></p>
                            }
                            {!bought && (
                              <button className="btn-buy-tag" type="button" onClick={() => handleClick(tag)}>
                                Comprar
                              </button>
                            )}
                          </div>
                        </article>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </main>
      </div>

      <BottomNav />

      {modal?.type === "confirm" && (
        <div style={overlayStyle} onClick={() => setModal(null)}>
          <div style={sheetStyle} onClick={e => e.stopPropagation()}>
            <div style={hdrStyle}>
              <h2 style={{ margin:0,fontSize:"1.1rem" }}>Confirmar compra?</h2>
              <button style={btnClose} onClick={() => setModal(null)}>✕</button>
            </div>
            <p style={{ color:"#000",lineHeight:1.5 }}>
              Comprar <strong>{modal.item.label}</strong> por <strong>{modal.item.price} ◎</strong>?
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
              <h2 style={{ margin:0,fontSize:"1.1rem" }}>Lyrium insuficiente</h2>
              <button style={btnClose} onClick={() => setModal(null)}>✕</button>
            </div>
            <p style={{ color:"#000",lineHeight:1.5 }}>
              Você precisa de <strong>{modal.item.price} ◎</strong> para comprar <strong>{modal.item.label}</strong>.
            </p>
            <button style={{ ...btnOk,width:"100%" }} onClick={() => setModal(null)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tags;