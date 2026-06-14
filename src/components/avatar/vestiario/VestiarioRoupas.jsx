import { useMemo } from "react";
import { useOutfit, SKINS_COMPOSTAS, SKINS_PERSONAGEM } from "../../../context/OutfitContext";
import { useLyrium } from "../../../context/LyriumContext";
import { getBuddyImg } from "../../../utils/buddyImages";
import s from "../../../styles/vestiario-sub.module.css";
import { Link } from "react-router-dom";

const skinImgs = import.meta.glob(
  "../../../assets/personalizacao/*.png",
  { eager:true }
);
function getSkinImg(skinId) {
  const key = `../../../assets/personalizacao/buddy_${skinId}.png`;
  return skinImgs[key]?.default ?? null;
}

const pecaImgs = import.meta.glob(
  "../../../assets/*.png",
  { eager:true }
);
function getPecaImg(filename) {
  const key = `../../../assets/${filename}`;
  return pecaImgs[key]?.default ?? null;
}

const IconBack  = (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>);
const IconCheck = (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" width="11" height="11"><path d="M5 12l4 4 10-10"/></svg>);
const IconLock  = (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="11" height="11"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>);

const WARDROBE_NAV = [
  { id:"roupas",         label:"Vestuário"      },
  { id:"personalidades", label:"Personalidades" },
  { id:"tags",           label:"Tags"           },
];

function ProgressDots({ pecas, hasBought }) {
  return (
    <div style={{
      position:"absolute", bottom:5, left:5,
      display:"flex", flexWrap:"wrap", gap:3,
      maxWidth:"calc(100% - 10px)",
    }}>
      {pecas.map(p => {
        const got = hasBought(p.id);
        const img = getPecaImg(p.img);
        return (
          <div key={p.id} title={p.nome} style={{
            width:18, height:18, borderRadius:"50%",
            border: got ? "1.5px solid #22c55e" : "1.5px solid #9ca3af",
            background: got ? "rgba(34,197,94,.25)" : "rgba(156,163,175,.2)",
            display:"flex", alignItems:"center", justifyContent:"center",
            overflow:"hidden",
          }}>
            {img
              ? <img src={img} alt={p.nome} style={{ width:13, height:13, objectFit:"contain", opacity: got ? 1 : 0.4 }} />
              : <span style={{ fontSize:".45rem", color: got ? "#22c55e" : "#9ca3af" }}>{p.nome[0]}</span>
            }
          </div>
        );
      })}
    </div>
  );
}

export default function VestiarioRoupas({ onBack, onNavigate }) {
  const { outfit, equipSkin, unequipSkin, buddyImageName, isSkinCompostaUnlocked } = useOutfit();
  const { hasBought } = useLyrium();

  function handleEquip(skinId) {
    if (outfit.skin === skinId) unequipSkin();
    else equipSkin(skinId);
  }

  const compostas = useMemo(() =>
    Object.entries(SKINS_COMPOSTAS).map(([id, data]) => ({
      id,
      ...data,
      unlocked: isSkinCompostaUnlocked(id, hasBought),
      equipped: outfit.skin === id,
    })),
  [hasBought, outfit.skin, isSkinCompostaUnlocked]);

  const personagem = useMemo(() =>
    SKINS_PERSONAGEM.map(sk => ({
      ...sk,
      owned:    hasBought(sk.itemId),
      equipped: outfit.skin === sk.id,
    })),
  [hasBought, outfit.skin]);

  return (
    <>
      <header className={s.subHeader}>
        <div className={s.headerLeft}>
          <button type="button" className={s.btnBack} onClick={onBack}>{IconBack}</button>
          <h1>Vestuário</h1>
        </div>
      </header>

      <div className={s.wardrobeDesktopGrid}>
        <aside className={s.wardrobeAvatarCol}>
          <h2>Seu Buddy</h2>
          <div className={s.avatarPreviewWrap}>
            <img src={getBuddyImg(buddyImageName)} alt="Avatar" />
          </div>
          <div className={s.avatarShadowSm} />
          <div className={s.equippedBadge}>
            {outfit.skin ? `Skin: ${outfit.skin}` : "Buddy padrão"}
          </div>
          <nav className={s.wardrobeSubNav}>
            {WARDROBE_NAV.map(item => (
              <button key={item.id} type="button"
                className={[s.wardrobeSubLink, item.id==="roupas" ? s.wardrobeSubLinkActive : ""].filter(Boolean).join(" ")}
                onClick={() => item.id !== "roupas" && onNavigate?.(item.id)}
              >{item.label}</button>
            ))}
          </nav>
        </aside>

        <div className={s.wardrobeItemsCol}>

          <div className={s.subSection}>
            <p className={s.subSectionTitle} style={{color:"#2db56e"}}>🧢 Skins de Roupa</p>
            <p style={{ fontSize:".78rem", color:"#8a9bb5", marginBottom:".75rem" }}>
              Desbloqueie comprando todas as peças na loja de Roupas & Skins.
            </p>
            <div className={s.itemsGrid}>
              {compostas.map(skin => {
                const preview = getSkinImg(skin.id);
                return (
                  <article key={skin.id}
                    className={[
                      s.itemCard,
                      skin.equipped ? s.itemEquipped : "",
                      !skin.unlocked ? s.itemLocked : "",
                    ].filter(Boolean).join(" ")}
                    onClick={() => skin.unlocked && handleEquip(skin.id)}
                    role="button"
                    tabIndex={skin.unlocked ? 0 : -1}
                    style={{ cursor: skin.unlocked ? "pointer" : "default" }}
                  >
                    <div className={s.itemImg} style={{ position:"relative" }}>
                      {preview
                        ? <img src={preview} alt={skin.nome} />
                        : <span style={{ fontSize:"2rem" }}>🧢</span>
                      }
                      <ProgressDots pecas={skin.pecas} hasBought={hasBought} />
                    </div>

                    <div className={s.itemFooter}>
                      <span className={s.itemName}>{skin.nome}</span>
                    </div>
                    <div className={s.itemFooter}>
                      <span className={[s.itemPrice, skin.unlocked ? s.itemPriceOwned : ""].filter(Boolean).join(" ")}>
                        {skin.equipped ? "Equipada" : skin.unlocked ? "Obtida" : <Link to="/loja">Colete peças →</Link>}
                      </span>
                    </div>

                    {skin.equipped && <span className={s.checkBadge}>{IconCheck}</span>}
                    {!skin.unlocked && <span className={s.lockBadge}>{IconLock}</span>}
                  </article>
                );
              })}
            </div>
          </div>

          <div className={s.subSection} style={{ marginTop:"1.5rem" }}>
            <p className={s.subSectionTitle} style={{color:"#2db56e"}}>🎭 Skins de Personagem</p>
            <p style={{ fontSize:".78rem", color:"#8a9bb5", marginBottom:".75rem" }}>
              Compradas na loja ou obtidas pelo Baú Surpresa.
            </p>
            <div className={s.itemsGrid}>
              {personagem.map(skin => {
                const img = getSkinImg(skin.id);
                return (
                  <article key={skin.id}
                    className={[s.itemCard, skin.equipped ? s.itemEquipped : "", !skin.owned ? s.itemLocked : ""].filter(Boolean).join(" ")}
                    onClick={() => skin.owned && handleEquip(skin.id)}
                    role="button" tabIndex={skin.owned ? 0 : -1}
                  >
                    <div className={s.itemImg}>
                      {img
                        ? <img src={img} alt={skin.nome} />
                        : <span style={{ fontSize:"2rem" }}>🎭</span>
                      }
                    </div>
                    <div className={s.itemFooter}>
                      <span className={s.itemName}>{skin.nome}</span>
                    </div>
                    <div className={s.itemFooter}>
                      <span className={[s.itemPrice, skin.owned ? s.itemPriceOwned : ""].filter(Boolean).join(" ")}>
                        {skin.equipped ? "Equipada" : skin.owned ? "Obtida" : <Link to="/loja/roupas">Loja →</Link>}
                      </span>
                    </div>
                    {skin.equipped && <span className={s.checkBadge}>{IconCheck}</span>}
                    {!skin.owned   && <span className={s.lockBadge}>{IconLock}</span>}
                  </article>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}