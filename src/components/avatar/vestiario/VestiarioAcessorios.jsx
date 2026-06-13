import { useOutfit } from "../../../context/OutfitContext";
import { useLyrium } from "../../../context/LyriumContext";
import { getBuddyImg } from "../../../utils/buddyImages";
import garrafaImg from "../../../assets/garrafa.png";
import testeiraImg from "../../../assets/testeira.png";
import faixaRoxaImg from "../../../assets/Faixa-roxa.png";
import pocheteImg from "../../../assets/pochete.png";
import boneImg    from "../../../assets/bone.png";
import s from "../../../styles/vestiario-sub.module.css";

const IconBack     = (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>);
const IconCheck    = (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" width="11" height="11"><path d="M5 12l4 4 10-10" /></svg>);
const IconLock     = (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="11" height="11" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>);


const ACESSORIOS = [
  { id: "garrafa",   slot: "garrafa",   name: "Garrafa",       img: garrafaImg,   itemId: "aces_garrafa"  },
  { id: "testeira",  slot: "testeira",  name: "Testeira",      img: testeiraImg,  itemId: "aces_testeira" },
  { id: "faixaroxa", slot: "faixaroxa", name: "Faixa Roxa 🏅", img: faixaRoxaImg, itemId: "bau_faixaroxa" }, 
  { id: "pochete",   slot: "pochete",   name: "Pochete",       img: pocheteImg,   itemId: "aces_pochete"  },
  { id: "bone",      slot: "bone",      name: "Boné",          img: boneImg,      itemId: "aces_bone"     },
];

const WARDROBE_NAV = [
  { id: "roupas",         label: "Vestuário"      },
  { id: "acessorios",     label: "Acessórios"     },
  { id: "personalidades", label: "Personalidades" },
  { id: "tags",           label: "Tags"           },
];

export default function VestiarioAcessorios({ onBack, onNavigate }) {
  const { outfit, equipItem, unequipItem, buddyImageName } = useOutfit();
  const { hasBought } = useLyrium();

  
  function isOwned(item) {
    return hasBought(item.itemId);
  }

  function isEquipped(item) {
    return !!outfit[item.slot];
  }

  function handleToggle(item) {
    if (!isOwned(item)) return;
    if (isEquipped(item)) {
      unequipItem(item.slot);
    } else {
      
      equipItem("skin", null);
      equipItem(item.slot, true);
    }
  }

  const equippedNames = ACESSORIOS.filter(a => isEquipped(a)).map(a => a.name).join(", ") || "Nenhum";

  return (
    <>
      <header className={s.subHeader}>
        <div className={s.headerLeft}>
          <button type="button" className={s.btnBack} onClick={onBack} aria-label="Voltar">{IconBack}</button>
          <h1>Acessórios</h1>
        </div>
      </header>

      <div className={s.wardrobeDesktopGrid}>
        <aside className={s.wardrobeAvatarCol}>
          <h2>Seu Avatar</h2>
          <div className={s.avatarPreviewWrap}><img src={getBuddyImg(buddyImageName)} alt="Avatar" /></div>
          <div className={s.avatarShadowSm} />
          <div className={s.equippedBadge} style={{ fontSize:".78rem" }}>
            Equipado: {equippedNames}
          </div>
          <nav className={s.wardrobeSubNav}>
            {WARDROBE_NAV.map(item => (
              <button key={item.id} type="button"
                className={[s.wardrobeSubLink, item.id === "acessorios" ? s.wardrobeSubLinkActive : ""].filter(Boolean).join(" ")}
                onClick={() => item.id !== "acessorios" && onNavigate && onNavigate(item.id)}
              >{item.label}</button>
            ))}
          </nav>
        </aside>

        <div className={s.wardrobeItemsCol}>
          <div className={s.subSection}>
            <p className={s.subSectionTitle}>💧 Acessórios</p>
            <p style={{ fontSize:".78rem", color:"var(--text-muted,#8a9bb5)", marginBottom:".5rem" }}>
              Vários acessórios podem ser equipados ao mesmo tempo.
            </p>
            {outfit.skin && (
              <p style={{ fontSize:".77rem", color:"#f59e0b", marginBottom:".75rem" }}>
                ⚠️ Equipar um acessório vai remover a skin ativa.
              </p>
            )}
            <div className={s.itemsGrid}>
              {ACESSORIOS.map(item => {
                const owned    = isOwned(item);
                const equipped = isEquipped(item);
                return (
                  <article
                    key={item.id}
                    className={[s.itemCard, equipped ? s.itemEquipped : "", !owned ? s.itemLocked : ""].filter(Boolean).join(" ")}
                    onClick={() => handleToggle(item)}
                    role="button" tabIndex={owned ? 0 : -1}
                    aria-label={equipped ? `${item.name} — equipado` : !owned ? `${item.name} — não disponível` : `Equipar ${item.name}`}
                  >
                    <div className={s.itemImg}><img src={item.img} alt={item.name} /></div>
                    <div className={s.itemFooter}>
                      <span className={s.itemName}>{item.name}</span>
                      <span className={[s.itemPrice, owned ? s.itemPriceOwned : ""].filter(Boolean).join(" ")}>
                        {equipped ? "Equipado" : owned ? "Obtido" : item.id === "faixaroxa" ? "Baú 🏅" : "Loja →"}
                      </span>
                    </div>
                    {equipped && <span className={s.checkBadge} aria-hidden="true">{IconCheck}</span>}
                    {!owned   && <span className={s.lockBadge}  aria-hidden="true">{IconLock}</span>}
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
