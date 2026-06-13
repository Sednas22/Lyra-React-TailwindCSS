import { useOutfit, TAGS_INFO } from "../../../context/OutfitContext";
import { useLyrium } from "../../../context/LyriumContext";
import { getBuddyImg } from "../../../utils/buddyImages";
import tag1 from "../../../assets/tag1.png";
import tag2 from "../../../assets/tag2.png";
import tag3 from "../../../assets/tag3.png";
import tag4 from "../../../assets/tag4.png";
import tag5 from "../../../assets/tag5.png";
import s from "../../../styles/vestiario-sub.module.css";

const IconBack  = (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>);
const IconCheck = (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" width="11" height="11"><path d="M5 12l4 4 10-10" /></svg>);
const IconLock  = (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="11" height="11" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>);
const IconTag   = (<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M10.6 3H5a2 2 0 0 0-2 2v5.6a2 2 0 0 0 .6 1.4l8.4 8.4a2 2 0 0 0 2.8 0l6.2-6.2a2 2 0 0 0 0-2.8L12 3.6A2 2 0 0 0 10.6 3z" /></svg>);

const RARITY_LABEL  = { common:"Comum", rare:"Rara", epic:"Épica", legendary:"Lendária" };
const RARITY_BONUS  = { common:"+10%", rare:"+25%", epic:"+50%", legendary:"+100%" };
const RARITY_COLOR  = { common:"#94a3b8", rare:"#3b82f6", epic:"#a855f7", legendary:"#f59e0b" };

const TAGS = [
  { id: "guardiao",    name: "Guardião do Coração",    img: tag5, itemId: "tag_guardiao"    },
  { id: "maratonista", name: "Maratonista",             img: tag4, itemId: "tag_maratonista" },
  { id: "mestre",      name: "Mestre do Sono",          img: tag3, itemId: "tag_mestre"      },
  { id: "arquiteto",   name: "Arquiteto da Vida",       img: tag2, itemId: "tag_arquiteto"   },
  { id: "navegador",   name: "Navegador da Vitalidade", img: tag1, itemId: "tag_navegador"   },
];

const WARDROBE_NAV = [
  { id: "roupas",         label: "Vestuário"      },
  { id: "personalidades", label: "Personalidades" },
  { id: "tags",           label: "Tags"           },
];

export default function VestiarioTags({ onBack, onNavigate }) {
  const { outfit, equipItem, unequipItem, buddyImageName } = useOutfit();
  const { hasBought } = useLyrium();

  const equippedTag = TAGS.find(t => t.id === outfit.tag);

  function handleEquip(tag) {
    if (!hasBought(tag.itemId)) return;
    if (outfit.tag === tag.id) unequipItem("tag");
    else equipItem("tag", tag.id);
  }

  return (
    <>
      <header className={s.subHeader}>
        <div className={s.headerLeft}>
          <button type="button" className={s.btnBack} onClick={onBack} aria-label="Voltar">{IconBack}</button>
          <h1>Tags</h1>
        </div>
      </header>

      <div className={s.wardrobeDesktopGrid}>
        <aside className={s.wardrobeAvatarCol}>
          <h2>Seu Avatar</h2>
          <div className={s.avatarPreviewWrap}><img src={getBuddyImg(buddyImageName)} alt="Avatar" /></div>
          <div className={s.avatarShadowSm} />

          {equippedTag ? (
            <div className={s.equippedTagInfo}>
              <p className={s.equippedTagLabel}>Tag equipada</p>
              <img src={equippedTag.img} alt={equippedTag.name} className={s.equippedTagImg} />
              <span className={s.equippedTagName}>{equippedTag.name}</span>
              <span style={{ fontSize:".75rem", color:"#ffd700", fontWeight:700 }}>
                {RARITY_BONUS[TAGS_INFO[equippedTag.id]?.rarityKey]} nos baús
              </span>
            </div>
          ) : (
            <p style={{ fontSize:".8rem", color:"var(--text-muted,#8a9bb5)", textAlign:"center", marginTop:".5rem" }}>
              Sem tag equipada. Tags aumentam o lyrium dos baús!
            </p>
          )}

          <nav className={s.wardrobeSubNav}>
            {WARDROBE_NAV.map(item => (
              <button key={item.id} type="button"
                className={[s.wardrobeSubLink, item.id === "tags" ? s.wardrobeSubLinkActive : ""].filter(Boolean).join(" ")}
                onClick={() => item.id !== "tags" && onNavigate && onNavigate(item.id)}
              >{item.label}</button>
            ))}
          </nav>
        </aside>

        <div className={s.wardrobeItemsCol}>
          <div className={s.subSection}>
            <p className={s.subSectionTitle}>🏷️ Suas tags</p>
            <p style={{ fontSize:".78rem", color:"var(--text-muted,#8a9bb5)", marginBottom:".75rem" }}>
              Tags equipadas aumentam o lyrium ganho nos baús. Só uma por vez.
            </p>
            <div className={s.tagsGrid}>
              {TAGS.map(tag => {
                const owned    = hasBought(tag.itemId);
                const equipped = outfit.tag === tag.id;
                const info     = TAGS_INFO[tag.id];
                return (
                  <article key={tag.id}
                    className={[s.tagCard, equipped ? s.tagEquipped : "", !owned ? s.tagLocked : ""].filter(Boolean).join(" ")}
                  >
                    {equipped && <span className={s.checkBadge} aria-hidden="true">{IconCheck}</span>}
                    {!owned   && <span className={s.lockBadge}  aria-hidden="true">{IconLock}</span>}
                    <img src={tag.img} alt={tag.name} className={s.tagImg} />
                    <div className={s.tagInfo}>
                      <p className={s.tagName}>{tag.name}</p>
                      <p style={{ fontSize:".72rem", fontWeight:700, color: RARITY_COLOR[info?.rarityKey] }}>
                        {RARITY_LABEL[info?.rarityKey]} • {RARITY_BONUS[info?.rarityKey]} baús
                      </p>
                      {owned && !equipped && (
                        <button type="button" className={s.btnEquip} onClick={() => handleEquip(tag)}>Equipar</button>
                      )}
                      {owned && equipped && (
                        <button type="button" className={`${s.btnEquip} ${s.btnEquipEquipped}`} onClick={() => handleEquip(tag)}>Desequipar</button>
                      )}
                      {!owned && (
                        <span style={{ fontSize:".72rem", color:"var(--text-muted,#8a9bb5)" }}>Compre na Loja</span>
                      )}
                    </div>
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
