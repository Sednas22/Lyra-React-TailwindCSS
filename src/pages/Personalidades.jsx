import { useState } from "react";
import { useApp }   from "../context/AppContext";
import { Link }     from "react-router-dom";
import styles       from "../styles/index.module.css";
import "../styles/personalidadesLoja.css";
import Sidebar    from "../components/Sidebar";
import BottomNav  from "../components/BottomNav";
import { useLyrium } from "../context/LyriumContext";
import cowboy  from "../assets/cowboy.png";
import robo    from "../assets/robo.png";
import general from "../assets/militar.png";
import caipira from "../assets/caipira.png";
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

const PERS = [
  { id:"pers_cowboy",  label:"Cowboy",   img:cowboy,  price:300 },
  { id:"pers_robo",    label:"Robô",     img:robo,    price:800 },
  { id:"pers_militar", label:"Militar",  img:general, price:800 },
  { id:"pers_caipira", label:"Caipira",  img:caipira, price:800 },
];

function Personalidades() {
  const { userName }  = useApp();
  const displayName   = userName || "Você";
  const { points, spendPoints, buyItem, hasBought } = useLyrium();
  const [modal, setModal] = useState(null);

  function handleClick(p) {
    if (hasBought(p.id)) return;
    setModal({ type: points < p.price ? "insufficient" : "confirm", item: p });
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
          <Link to="/loja" className="back-button">← Personalidades</Link>
        </div>
        <div className="section-title-container">
          <h2 className="section-title">Compre novas personalidades para o seu avatar!</h2>
        </div>

        <section className="personalities-section">
          <ul className="personalities-list" role="list">
            {PERS.map(p => {
              const bought = hasBought(p.id);
              return (
                <li key={p.id} className="personality-item" style={{ opacity: bought ? 0.6 : 1 }}>
                  <div className="personality-content">
                    <div className="personality-image"><img src={p.img} alt={p.label} /></div>
                    <div className="personality-info">
                      <h3 className="personality-name">{p.label}</h3>
                    </div>
                  </div>
                  <div className="personality-action">
                    {bought
                      ? <p className="personality-price" style={{ color:"#22c55e" }}>✓ Comprado</p>
                      : <>
                          <p className="personality-price">{p.price} <span>◎</span></p>
                          <button className="btn-buy" onClick={() => handleClick(p)}>Comprar</button>
                        </>
                    }
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      <BottomNav />

      {modal?.type === "confirm" && (
        <div style={overlayStyle} onClick={() => setModal(null)}>
          <div style={sheetStyle} onClick={e => e.stopPropagation()}>
            <div style={hdrStyle}>
              <h2 style={{ margin:0,fontSize:"1.1rem", color:"#000" }}>Confirmar compra?</h2>
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

export default Personalidades;