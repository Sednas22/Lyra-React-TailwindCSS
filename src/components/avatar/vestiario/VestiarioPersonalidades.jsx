import { useOutfit } from "../../../context/OutfitContext";
import { useLyrium } from "../../../context/LyriumContext";
import { getBuddyImg } from "../../../utils/buddyImages";
import s from "../../../styles/vestiario-sub.module.css";

const IconBack  = (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>);
const IconCheck = (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" width="11" height="11"><path d="M5 12l4 4 10-10" /></svg>);

const PERSONALIDADES = [
  {
    id:     "padrao",
    name:   "Padrão",
    emoji:  "😄",
    desc:   "Direto e motivador. O jeito original do buddy.",
    fala:   "E aí! Bora arrasar hoje?",
    itemId: null,
    color:  "#22c55e",
  },
  {
    id:     "cowboy",
    name:   "Cowboy",
    emoji:  "🤠",
    desc:   "Fala como xerife do faroeste. Yee-haw!",
    fala:   "Yee-haw, pardner! O oeste te chama!",
    itemId: "pers_cowboy",
    color:  "#f59e0b",
  },
  {
    id:     "robo",
    name:   "Robô",
    emoji:  "🤖",
    desc:   "Analítico e preciso. Dados e eficiência.",
    fala:   "SISTEMA ATIVO. Iniciando monitoramento...",
    itemId: "pers_robo",
    color:  "#3b82f6",
  },
  {
    id:     "militar",
    name:   "Militar",
    emoji:  "🪖",
    desc:   "Disciplina total. Missão cumprida, soldado!",
    fala:   "Atenção! Missão do dia iniciada!",
    itemId: "pers_militar",
    color:  "#84cc16",
  },
  {
    id:     "caipira",
    name:   "Caipira",
    emoji:  "🌽",
    desc:   "Jeito mineiro cheio de charme. Uai sô!",
    fala:   "Uai sô, que dia bão esse aqui!",
    itemId: "pers_caipira",
    color:  "#a16207",
  },
];

const WARDROBE_NAV = [
  { id: "roupas",         label: "Vestuário"      },
  { id: "personalidades", label: "Personalidades" },
  { id: "tags",           label: "Tags"           },
];

export default function VestiarioPersonalidades({ onBack, onNavigate }) {
  const { outfit, equipItem, buddyImageName } = useOutfit();
  const { hasBought } = useLyrium();

  const equippedPersona = PERSONALIDADES.find(p => p.id === outfit.personalidade) || PERSONALIDADES[0];

  function isOwned(p) {
    if (!p.itemId) return true;
    return hasBought(p.itemId);
  }

  function handleEquip(p) {
    if (!isOwned(p)) return;
    if (outfit.personalidade === p.id && p.id !== "padrao") equipItem("personalidade", "padrao");
    else equipItem("personalidade", p.id);
  }

  return (
    <>
      <header className={s.subHeader}>
        <div className={s.headerLeft}>
          <button type="button" className={s.btnBack} onClick={onBack} aria-label="Voltar">{IconBack}</button>
          <h1>Personalidades</h1>
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
            {equippedPersona.emoji} {equippedPersona.name} equipada
          </div>
          <p style={{ fontSize:".75rem", color:"var(--text-muted,#8a9bb5)", textAlign:"center", marginTop:".3rem", fontStyle:"italic", padding:"0 .5rem" }}>
            "{equippedPersona.fala}"
          </p>
          <p style={{ fontSize:".72rem", color:"var(--text-muted,#8a9bb5)", textAlign:"center", marginTop:".5rem" }}>
            ℹ️ A personalidade só altera as falas do buddy, não a aparência.
          </p>

          <nav className={s.wardrobeSubNav}>
            {WARDROBE_NAV.map(item => (
              <button key={item.id} type="button"
                className={[s.wardrobeSubLink, item.id === "personalidades" ? s.wardrobeSubLinkActive : ""].filter(Boolean).join(" ")}
                onClick={() => item.id !== "personalidades" && onNavigate?.(item.id)}
              >{item.label}</button>
            ))}
          </nav>
        </aside>

        <div className={s.wardrobeItemsCol}>
          <div className={s.subSection}>
            <p className={s.subSectionTitle}>💬 Personalidades</p>
            <p style={{ fontSize:".78rem", color:"var(--text-muted,#8a9bb5)", marginBottom:".75rem" }}>
              Escolha como o buddy vai se comunicar com você. Só uma por vez.
            </p>

            <div style={{ display:"flex", flexDirection:"column", gap:".75rem" }}>
              {PERSONALIDADES.map(persona => {
                const owned    = isOwned(persona);
                const equipped = outfit.personalidade === persona.id;
                return (
                  <article key={persona.id} style={{
                    display:"flex", alignItems:"center", gap:"1rem",
                    padding:".85rem 1rem",
                    borderRadius:".9rem",
                    border: equipped
                      ? `2px solid ${persona.color}`
                      : "1.5px solid var(--border,#2d3548)",
                    background: equipped
                      ? `${persona.color}14`
                      : "var(--bg-surface,#1a1f2e)",
                    opacity: owned ? 1 : 0.55,
                    cursor: owned ? "pointer" : "default",
                    transition:"all .2s",
                  }}
                    onClick={() => handleEquip(persona)}
                    role="button" tabIndex={owned ? 0 : -1}
                    aria-label={!owned ? `${persona.name} — compre na loja` : equipped ? `${persona.name} — equipada` : `Equipar ${persona.name}`}
                  >
                    <span style={{ fontSize:"1.8rem", minWidth:"2.2rem", textAlign:"center" }}>{persona.emoji}</span>
                    <div style={{ flex:1, minWidth:0 }}>
                      <p style={{ fontWeight:700, fontSize:".95rem", marginBottom:".2rem" }}>{persona.name}</p>
                      <p style={{ fontSize:".78rem", color:"var(--text-muted,#8a9bb5)", marginBottom:".25rem" }}>{persona.desc}</p>
                      <p style={{ fontSize:".73rem", color:"var(--text-muted,#8a9bb5)", fontStyle:"italic" }}>
                        "{persona.fala}"
                      </p>
                    </div>
                    <div style={{ minWidth:"1.5rem", textAlign:"center" }}>
                      {equipped && (
                        <span style={{
                          display:"inline-flex", alignItems:"center", justifyContent:"center",
                          width:"1.5rem", height:"1.5rem",
                          background: persona.color, borderRadius:"50%", color:"#fff",
                        }}>{IconCheck}</span>
                      )}
                      {!owned && <span style={{ fontSize:".8rem" }}>🔒</span>}
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
