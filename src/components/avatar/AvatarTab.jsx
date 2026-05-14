import { useState } from "react";
import avatarImg from "../../assets/buddy.png";
import LyriumModal from "../LyriumModal";
import { useLyrium } from "../../context/LyriumContext";

const IconTrophy = (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 21h8" /><path d="M12 17v4" /><path d="M7 4h10v4a5 5 0 0 1-10 0V4z" /><path d="M17 6h2a2 2 0 0 1 0 4h-2" /><path d="M7 6H5a2 2 0 0 0 0 4h2" /></svg>);
const IconFlame = (<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 2s.3 2.2-1.4 4.5c-1.2 1.7-3.1 2.9-4.2 4.8A7.8 7.8 0 0 0 7 15c0 4 2.8 7 6.8 7 3.9 0 7.2-2.9 7.2-7.1 0-5-3.4-8.1-7.5-12.9z" /></svg>);
const IconCheck = (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l4 4 10-10" /></svg>);
const IconLock = (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>);

const CHESTS = [
  { id: "avatar_bau_1", unlocked: true,  badge: "sparkle", prizePoints: 100, label: "Baú 1" },
  { id: "avatar_bau_2", unlocked: true, badge: "sparkle", prizePoints: 150, label: "Baú 2" },
  { id: "avatar_bau_3", unlocked: true, badge: "sparkle", prizePoints: 200, label: "Baú 3" },
  { id: "avatar_bau_4", unlocked: true,  badge: "leaf",    prizePoints: 75,  label: "Baú 4" },
];

function AvatarTab({ styles: s }) {
  const { claimAvatarChest, hasAvatarChest, addPoints } = useLyrium();

  const [modal, setModal] = useState(null);

  const trofeus = "--";
  const streak  = "--";

  function handleChestClick(chest) {
    if (!chest.unlocked) return;
    if (hasAvatarChest(chest.id)) return;
    setModal({ chestId: chest.id, type: "confirm", chest });
  }

  function handleChestConfirm() {
    const chest = modal.chest;
    claimAvatarChest(chest.id);
    addPoints(chest.prizePoints);
    setModal({ ...modal, type: "item" });
  }

  return (
    <>
      <section className={s.heroSection}>
        <h2 className="sr-only">Avatar principal</h2>
        <div className={s.avatarStage}>
          <p className={`${s.speechBubble} ${s.speechBubbleLeft}`}>Tá com fome?<br />Bora Almoçar</p>
          <p className={`${s.speechBubble} ${s.speechBubbleRight}`}>Aoba meu fi,<br />Bora Treinar?</p>
          <figure className={s.avatarFigure}>
            <div className={s.avatarCharacter}>
              <img src={avatarImg} alt="Avatar virtual segurando uma garrafa e acenando" />
            </div>
          </figure>
          <div className={s.avatarShadow} />
        </div>
      </section>

      <section className={s.statusSection}>
        <div className={s.statusGrid}>
          <article className={s.statusCard}>
            <div className={s.statusCardHeading}><h3>Troféus</h3></div>
            <div className={`${s.statusCardBody} ${s.cardGreen}`}>
              <span className={s.statusIcon}>{IconTrophy}</span>
              <strong>{trofeus}</strong>
            </div>
          </article>
          <article className={s.statusCard}>
            <div className={`${s.statusCardHeading} ${s.headingRight}`}><h3>Streak</h3></div>
            <div className={`${s.statusCardBody} ${s.cardLime}`}>
              <span className={s.statusIcon}>{IconFlame}</span>
              <strong>{streak}</strong>
            </div>
          </article>
        </div>
      </section>

      <section className={s.chestsSection}>
        <div className={s.sectionHeader}><h2>Baús</h2></div>
        <div className={s.chestsGrid}>
          {CHESTS.map((chest) => {
            const claimed = hasAvatarChest(chest.id);
            const disabled = !chest.unlocked || claimed;
            return (
              <article key={chest.id} className={s.chestCard}>
                {!chest.unlocked && <span className={s.lockIcon}>{IconLock}</span>}
                <div className={`${s.chestShell}${!chest.unlocked ? ` ${s.chestShellLight}` : ""}`}>
                  <button
                    type="button"
                    className={s.chestBtn}
                    aria-label={claimed ? `Baú ${chest.id} já resgatado` : chest.unlocked ? `Abrir baú` : `Baú bloqueado`}
                    disabled={disabled}
                    onClick={() => handleChestClick(chest)}
                    style={{ opacity: claimed ? 0.5 : 1 }}
                  >
                    <div className={s.chestIllustration}>
                      <span className={s.chestLid} />
                      <span className={s.chestBase} />
                      <span className={s.chestBand} />
                      <span className={s.chestLock} />
                    </div>
                  </button>
                </div>
                <span className={`${s.chestBadge} ${s[chest.badge]}`}>
                  {(chest.badge === "success" || claimed) && IconCheck}
                </span>
              </article>
            );
          })}
        </div>
      </section>

      {modal?.type === "confirm" && (
        <div className={s.modalOverlay} role="dialog" aria-modal="true" onClick={() => setModal(null)}>
          <div className={s.modalSheet} onClick={(e) => e.stopPropagation()}>
            <div className={s.modalHeader}>
              <h2>Abrir {modal.chest.label}?</h2>
              <button className={s.modalClose} type="button" onClick={() => setModal(null)} aria-label="Fechar">✕</button>
            </div>
            <p className={s.modalEmpty} style={{marginBottom:"1rem"}}>
              Você receberá <strong>+{modal.chest.prizePoints} ◎ Lyrium</strong>!
            </p>
            <div style={{display:"flex",gap:".75rem"}}>
              <button
                style={{flex:1,padding:".7rem",background:"var(--bg-surface,#252b3b)",border:"1px solid var(--border,#2d3548)",borderRadius:".75rem",color:"var(--text-primary,#e2e8f0)",fontWeight:600,cursor:"pointer"}}
                onClick={() => setModal(null)}
              >Cancelar</button>
              <button
                style={{flex:1,padding:".7rem",background:"var(--green-mid,#22c55e)",border:"none",borderRadius:".75rem",color:"#fff",fontWeight:700,cursor:"pointer"}}
                onClick={handleChestConfirm}
              >Abrir!</button>
            </div>
          </div>
        </div>
      )}

      {modal?.type === "item" && (
        <div className={s.modalOverlay} role="dialog" aria-modal="true" onClick={() => setModal(null)}>
          <div className={s.modalSheet} onClick={(e) => e.stopPropagation()}>
            <div className={s.modalHeader}>
              <h2>Baú aberto!</h2>
              <button className={s.modalClose} type="button" onClick={() => setModal(null)} aria-label="Fechar">✕</button>
            </div>
            <p className={s.modalEmpty} style={{marginBottom:"1rem"}}>
              Você ganhou <strong>+{modal.chest.prizePoints} ◎ Lyrium</strong>!
            </p>
            <button
              style={{width:"100%",padding:".75rem",background:"var(--green-mid,#22c55e)",border:"none",borderRadius:".75rem",color:"#fff",fontWeight:700,cursor:"pointer"}}
              onClick={() => setModal(null)}
            >Ótimo!</button>
          </div>
        </div>
      )}
    </>
  );
}

export default AvatarTab;
