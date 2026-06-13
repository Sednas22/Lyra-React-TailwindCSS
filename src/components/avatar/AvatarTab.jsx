import { useState, useMemo } from "react";
import { useLyrium }  from "../../context/LyriumContext";
import { useOutfit }  from "../../context/OutfitContext";
import { useApp }     from "../../context/AppContext";
import { getBuddySpeech, getSituacaoAutomatica } from "../../utils/buddySpeech";
import { getBuddyImg } from "../../utils/buddyImages";


const IconTrophy = (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 21h8" /><path d="M12 17v4" /><path d="M7 4h10v4a5 5 0 0 1-10 0V4z" /><path d="M17 6h2a2 2 0 0 1 0 4h-2" /><path d="M7 6H5a2 2 0 0 0 0 4h2" /></svg>);
const IconFlame  = (<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 2s.3 2.2-1.4 4.5c-1.2 1.7-3.1 2.9-4.2 4.8A7.8 7.8 0 0 0 7 15c0 4 2.8 7 6.8 7 3.9 0 7.2-2.9 7.2-7.1 0-5-3.4-8.1-7.5-12.9z" /></svg>);
const IconCheck  = (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l4 4 10-10" /></svg>);

function AvatarTab({ styles: s }) {
  const { claimAvatarChest, hasAvatarChest, CHESTS_CONFIG, streak } = useLyrium();
  const { outfit, buddyImageName, getLyriumBonus } = useOutfit();
  const { userName, healthData, goalPrefs, getGoalProgress } = useApp();

  const [modal, setModal] = useState(null);

  const trofeus = useMemo(() =>
    CHESTS_CONFIG.filter(c => hasAvatarChest(c.id)).length,
  [CHESTS_CONFIG, hasAvatarChest]);

  
  const fala = useMemo(() => {
    const situacao = getSituacaoAutomatica(
      healthData, goalPrefs, getGoalProgress, null, streak
    );
    return getBuddySpeech(situacao, outfit.personalidade, userName, streak);
  }, [healthData, goalPrefs, getGoalProgress, outfit.personalidade, userName, streak]);

  const lyriumBonus = getLyriumBonus();
  const buddyImg    = getBuddyImg(buddyImageName);

  function handleChestClick(chest) {
    if (hasAvatarChest(chest.id)) return;
    setModal({ type: "confirm", chest });
  }

  function handleChestConfirm() {
    const chest  = modal.chest;
    const ganhou = claimAvatarChest(chest.id, chest.prizePoints, lyriumBonus);
    setModal({ type: "prize", ganhou });
  }

  return (
    <>
      {}
      <section className={s.heroSection}>
        <h2 className="sr-only">Avatar principal</h2>
        <div className={s.avatarStage}>
          {}
          <p className={s.speechBubble}>{fala}</p>
          <figure className={s.avatarFigure}>
            <div className={s.avatarCharacter}>
              <img src={buddyImg} alt="Avatar Buddy" />
            </div>
          </figure>
          <div className={s.avatarShadow} />
        </div>

        {}
        {outfit.tag && lyriumBonus > 1 && (
          <p style={{ textAlign:"center", fontSize:".78rem", color:"#ffd700", fontWeight:600, marginTop:".4rem" }}>
            🏷️ Bônus de tag ativo: +{Math.round((lyriumBonus - 1) * 100)}% nos baús
          </p>
        )}
      </section>

      {}
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
              <strong>{streak} dias</strong>
            </div>
          </article>
        </div>
      </section>

      {}
      <section className={s.chestsSection}>
        <div className={s.sectionHeader}>
          <h2>Baús do Dia</h2>
          <span style={{ fontSize:".78rem", color:"var(--text-muted,#8a9bb5)" }}>Renova à meia-noite</span>
        </div>
        <div className={s.chestsGrid}>
          {CHESTS_CONFIG.map(chest => {
            const claimed        = hasAvatarChest(chest.id);
            const pontosComBonus = Math.round(chest.prizePoints * lyriumBonus);
            return (
              <article key={chest.id} className={s.chestCard}>
                <div className={`${s.chestShell}${claimed ? ` ${s.chestShellLight}` : ""}`}>
                  <button
                    type="button"
                    className={s.chestBtn}
                    aria-label={claimed ? `${chest.label} já aberto hoje` : `Abrir ${chest.label} — ${pontosComBonus} ◎`}
                    disabled={claimed}
                    onClick={() => handleChestClick(chest)}
                    style={{ opacity: claimed ? 0.45 : 1 }}
                  >
                    <div className={s.chestIllustration}>
                      <span className={s.chestLid} />
                      <span className={s.chestBase} />
                      <span className={s.chestBand} />
                      <span className={s.chestLock} />
                    </div>
                  </button>
                </div>
                <span className={`${s.chestBadge} ${claimed ? s.success : s.sparkle}`}>
                  {claimed && IconCheck}
                </span>
                <p style={{ textAlign:"center", fontSize:".72rem", color:"var(--text-muted,#8a9bb5)", marginTop:".2rem" }}>
                  {claimed ? "Aberto ✓" : `+${pontosComBonus} ◎`}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {}
      {modal?.type === "confirm" && (
        <div className={s.modalOverlay} role="dialog" aria-modal="true" onClick={() => setModal(null)}>
          <div className={s.modalSheet} onClick={e => e.stopPropagation()}>
            <div className={s.modalHeader}>
              <h2>Abrir {modal.chest.label}?</h2>
              <button className={s.modalClose} type="button" onClick={() => setModal(null)} aria-label="Fechar">✕</button>
            </div>
            <p style={{ marginBottom:"1rem" }}>
              Você receberá{" "}
              <strong>+{Math.round(modal.chest.prizePoints * lyriumBonus)} ◎ Lyrium</strong>
              {lyriumBonus > 1 && <span style={{ color:"#ffd700" }}> (bônus de tag incluído!)</span>}
            </p>
            <div style={{ display:"flex", gap:".75rem" }}>
              <button
                style={{ flex:1, padding:".7rem", background:"var(--bg-surface, #fff)", border:"1px solid var(--border, #2db56e)", borderRadius:".75rem", color:"var(--text-primary, #2db56e)", fontWeight:600, cursor:"pointer" }}
                onClick={() => setModal(null)}
              >Cancelar</button>
              <button
                style={{ flex:1, padding:".7rem", background:"#2db56e", border:"none", borderRadius:".75rem", color:"#fff", fontWeight:700, cursor:"pointer" }}
                onClick={handleChestConfirm}
              >Abrir!</button>
            </div>
          </div>
        </div>
      )}

      {}
      {modal?.type === "prize" && (
        <div className={s.modalOverlay} role="dialog" aria-modal="true" onClick={() => setModal(null)}>
          <div className={s.modalSheet} onClick={e => e.stopPropagation()}>
            <div className={s.modalHeader}>
              <h2>🎉 Baú aberto!</h2>
              <button className={s.modalClose} type="button" onClick={() => setModal(null)} aria-label="Fechar">✕</button>
            </div>
            <p style={{ marginBottom:"1rem" }}>
              Você ganhou <strong>+{modal.ganhou} ◎ Lyrium</strong>! Volte amanhã para abrir de novo.
            </p>
            <button
              style={{ width:"100%", padding:".75rem", background:"#22c55e", border:"none", borderRadius:".75rem", color:"#fff", fontWeight:700, cursor:"pointer" }}
              onClick={() => setModal(null)}
            >Ótimo!</button>
          </div>
        </div>
      )}
    </>
  );
}

export default AvatarTab;
