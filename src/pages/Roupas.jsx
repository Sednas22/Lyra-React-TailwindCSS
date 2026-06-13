import { useState } from "react";
import { useApp }   from "../context/AppContext";
import { Link }     from "react-router-dom";
import styles       from "../styles/index.module.css";
import "../styles/skinsLoja.css";
import Sidebar    from "../components/Sidebar";
import BottomNav  from "../components/BottomNav";
import { useLyrium } from "../context/LyriumContext";
import Notificacao   from "../components/Notificacao";


import testeira   from "../assets/testeira.png";
import faixaRoxa  from "../assets/Faixa-roxa.png";
import regata     from "../assets/regata.png";
import garrafa    from "../assets/garrafa.png";
import tenis      from "../assets/tenis.png";
import camisa     from "../assets/camisa.png";
import shorts     from "../assets/shorts.png";
import chinelo    from "../assets/chinelo.png";
import social     from "../assets/social.png";
import gravata    from "../assets/gravata.png";
import paleto     from "../assets/paleto.png";
import calca      from "../assets/calca.png";
import sapato     from "../assets/sapato.png";
import relogio    from "../assets/relogio.png";
import touca      from "../assets/touca.png";
import casaco     from "../assets/casaco.png";
import cachecol   from "../assets/cachecol.png";
import luva       from "../assets/luva.png";
import tenisFrio  from "../assets/tenis-frio.png";
import oculos     from "../assets/oculos.png";
import refresco   from "../assets/refresco.png";
import colar      from "../assets/colar.png";
import calcao     from "../assets/calcao.png";
import gorro      from "../assets/gorro.png";
import pijama     from "../assets/pijama.png";

import neymar     from "../assets/neymar.png";
import homemaranha from "../assets/homemAranha.png";
import cowboy     from "../assets/cowboy.png";
import robo       from "../assets/robo.png";
import militar    from "../assets/militar.png";
import caipira    from "../assets/caipira.png";
import gaucho     from "../assets/gaucho.png";
import chef       from "../assets/personalizacao/buddy_chef.png";

const LyriumIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffd700">
    <circle cx="12" cy="12" r="10" />
    <text x="12" y="15" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">◎</text>
  </svg>
);



const PECAS = [
  
  { id:"aces_testeira",  label:"Testeira",   img:testeira,  price:80,  grupo:"Maratonista" },
  { id:"bau_faixaroxa",  label:"Faixa Roxa", img:faixaRoxa, price:0,   grupo:"Maratonista", bauOnly:true },
  { id:"roupa_regata",   label:"Regata",     img:regata,    price:80,  grupo:"Maratonista" },
  { id:"aces_garrafa",   label:"Garrafa",    img:garrafa,   price:60,  grupo:"Maratonista" },
  { id:"roupa_tenis",    label:"Tênis",      img:tenis,     price:100, grupo:"Maratonista" },
  
  { id:"roupa_camisa",   label:"Camisa",     img:camisa,    price:80,  grupo:"Ficar em Casa" },
  { id:"roupa_shorts",   label:"Shorts",     img:shorts,    price:60,  grupo:"Ficar em Casa" },
  { id:"roupa_chinelo",  label:"Chinelo",    img:chinelo,   price:50,  grupo:"Ficar em Casa" },
  
  { id:"roupa_social",   label:"Camisa Social", img:social, price:150, grupo:"Formal" },
  { id:"aces_gravata",   label:"Gravata",    img:gravata,   price:100, grupo:"Formal" },
  { id:"roupa_paleto",   label:"Paletó",     img:paleto,    price:200, grupo:"Formal" },
  { id:"roupa_calca",    label:"Calça",      img:calca,     price:120, grupo:"Formal" },
  { id:"roupa_sapato",   label:"Sapato",     img:sapato,    price:130, grupo:"Formal" },
  { id:"aces_relogio",   label:"Relógio",    img:relogio,   price:180, grupo:"Formal" },
  
  { id:"aces_touca",     label:"Touca",      img:touca,     price:70,  grupo:"Inverno" },
  { id:"roupa_casaco",   label:"Casaco",     img:casaco,    price:180, grupo:"Inverno" },
  { id:"aces_cachecol",  label:"Cachecol",   img:cachecol,  price:80,  grupo:"Inverno" },
  { id:"aces_luva",      label:"Luva",       img:luva,      price:60,  grupo:"Inverno" },
  { id:"roupa_tenisfrio",label:"Tênis Frio", img:tenisFrio, price:120, grupo:"Inverno" },
  
  { id:"aces_oculos",    label:"Óculos",     img:oculos,    price:70,  grupo:"Praia" },
  { id:"aces_refresco",  label:"Refresco",   img:refresco,  price:50,  grupo:"Praia" },
  { id:"aces_colar",     label:"Colar",      img:colar,     price:80,  grupo:"Praia" },
  { id:"roupa_calcao",   label:"Calção",     img:calcao,    price:90,  grupo:"Praia" },
  
  { id:"aces_gorro",     label:"Gorro",      img:gorro,     price:60,  grupo:"Pijama" },
  { id:"roupa_pijama",   label:"Pijama",     img:pijama,    price:120, grupo:"Pijama" },
];


const SKINS_PERSONAGEM = [
  { id:"skin_neymar",      label:"Neymar Jr.",   img:neymar,     price:500  },
  { id:"skin_homemaranha", label:"Homem-Aranha", img:homemaranha,price:400  },
  { id:"skin_cowboy",      label:"Cowboy",       img:cowboy,     price:300  },
  { id:"skin_robo",        label:"Robô",         img:robo,       price:350  },
  { id:"skin_militar",     label:"Militar",      img:militar,    price:0,   bauOnly:true },
  { id:"skin_caipira",     label:"Caipira",      img:caipira,    price:300  },
  { id:"skin_gaucho",      label:"Gaúcho",       img:gaucho,     price:0,   bauOnly:true },
  { id:"skin_chef",        label:"Chef",         img:chef,       price:350  },
];

const GRUPOS = ["Maratonista","Ficar em Casa","Formal","Inverno","Praia","Pijama"];

const overlayStyle = { position:"fixed",inset:0,background:"rgba(0,0,0,.6)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:99999 };
const sheetStyle   = { background:"#fff",borderRadius:"1.2rem 1.2rem 0 0",padding:"1.5rem",width:"100%",maxWidth:"480px",boxShadow:"0 -4px 32px rgba(0,0,0,.4)" };
const rowStyle     = { display:"flex",gap:".75rem",marginTop:"1rem" };
const btnOk        = { flex:1,padding:".75rem",background:"#1a7a4a",color:"#fff",border:"none",borderRadius:".75rem",fontWeight:700,fontSize:"1rem",cursor:"pointer" };
const btnCancel    = { flex:1,padding:".75rem",background:"#fff",color:"#1a7a4a",border:"1px solid #1a7a4a",borderRadius:".75rem",fontWeight:600,fontSize:"1rem",cursor:"pointer" };
const btnClose     = { background:"none",border:"none",fontSize:"1.2rem",cursor:"pointer",color:"#000",lineHeight:1,padding:"4px", width:"auto" };
const hdrStyle     = { display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:".75rem" };

function Roupas() {
  const { userName }  = useApp();
  const displayName   = userName || "Você";
  const { points, spendPoints, buyItem, hasBought } = useLyrium();
  const [modal, setModal] = useState(null);
  const [abaAtiva, setAbaAtiva] = useState("pecas"); 

  function handleBuy(item) {
    if (hasBought(item.id) || item.bauOnly) return;
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
        <h1>Roupas & Skins</h1>
        <div className={styles.headerActions}>
          <div className={styles.badgePoints}><span>{points}</span><LyriumIcon /></div>
          <Notificacao />
        </div>
      </header>

      <div className="scroll-content">
        <div className="back-button-container">
          <Link to="/loja" className="back-button">← Loja</Link>
        </div>

        <div style={{ display:"flex", gap:".5rem", padding:"0 1rem 1rem" }}>
          {[["pecas","Peças de Roupa"],["skins","Skins de Personagem"]].map(([id,label]) => (
            <button key={id} onClick={() => setAbaAtiva(id)} style={{
              flex:1, padding:".6rem", borderRadius:".75rem", border:"none",
              fontWeight:700, fontSize:".85rem", cursor:"pointer",
              background: abaAtiva === id ? "#2db56e" : "#fff",
              color: abaAtiva === id ? "#fff" : "#1a7a4a",
            }}>{label}</button>
          ))}
        </div>

        {abaAtiva === "pecas" && GRUPOS.map(grupo => (
          <section key={grupo} className="category-section">
            <h2 className="category-title">
              {grupo}
              <span style={{ fontSize:".75rem", color:"#8a9bb5", marginLeft:".5rem", fontWeight:400 }}>
                — peças para skin composta
              </span>
            </h2>
            <div className="carousel-container">
              <div className="carousel-scroll">
                {PECAS.filter(p => p.grupo === grupo && !p.bauOnly).map(item => {
                  const bought = hasBought(item.id);
                  return (
                    <article key={item.id} className="carousel-item">
                      <div className="item-card" style={{ opacity: bought ? 0.55 : 1 }}>
                        <div className="item-image"><img src={item.img} alt={item.label} /></div>
                        <p style={{ fontSize:".8rem", fontWeight:600, textAlign:"center", margin:".3rem 0 .1rem" }}>{item.label}</p>
                        <div className="item-info">
                          {bought
                            ? <p className="item-price" style={{ color:"#22c55e" }}>✓ Obtido</p>
                            : item.bauOnly
                            ? <p className="item-price" style={{ color:"#f59e0b" }}>🏅 Baú</p>
                            : <p className="item-price">{item.price} <LyriumIcon /></p>
                          }
                        </div>
                        {!bought && !item.bauOnly && (
                          <button type="button" className="btn-buy-tag" style={{ marginTop:"6px",width:"100%" }}
                            onClick={() => handleBuy(item)}>Comprar</button>
                        )}
                        {item.bauOnly && !bought && (
                          <p style={{ fontSize:".7rem", color:"#f59e0b", textAlign:"center", marginTop:"4px" }}>
                            Exclusivo do Baú
                          </p>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        ))}

        {abaAtiva === "skins" && (
          <section className="category-section">
            <h2 className="category-title">Skins de Personagem</h2>
            <div className="carousel-container">
              <div className="carousel-scroll">
                {SKINS_PERSONAGEM.filter(item => !item.bauOnly).map(item => {
                  const bought = hasBought(item.id);
                  return (
                    <article key={item.id} className="carousel-item">
                      <div className="item-card" style={{ opacity: bought ? 0.55 : 1 }}>
                        <div className="item-image"><img src={item.img} alt={item.label} /></div>
                        <p style={{ fontSize:".8rem", fontWeight:600, textAlign:"center", margin:".3rem 0 .1rem" }}>{item.label}</p>
                        <div className="item-info">
                          {bought
                            ? <p className="item-price" style={{ color:"#22c55e" }}>✓ Obtido</p>
                            : item.bauOnly
                            ? <p className="item-price" style={{ color:"#f59e0b" }}>🏅 Baú</p>
                            : <p className="item-price">{item.price} <LyriumIcon /></p>
                          }
                        </div>
                        {!bought && !item.bauOnly && (
                          <button type="button" className="btn-buy-tag" style={{ marginTop:"6px",width:"100%" }}
                            onClick={() => handleBuy(item)}>Comprar</button>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        )}
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
              Você precisa de <strong>{modal.item.price} ◎</strong> para comprar <strong>{modal.item.label}</strong>. Complete metas para ganhar mais!
            </p>
            <button style={{ ...btnOk,width:"100%" }} onClick={() => setModal(null)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Roupas;