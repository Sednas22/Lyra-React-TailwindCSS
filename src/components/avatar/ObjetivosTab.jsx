import { useState } from "react";
import { useApp }    from "../../context/AppContext";
import { useLyrium } from "../../context/LyriumContext";
import "../../styles/objetivos.css";

const IconTarget = (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" /><path d="M15 9l5-5" /></svg>);
const IconAlterar= (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 4v6h-6" /><path d="M3 20v-6h6" /><path d="M20 10a8 8 0 0 0-14-3l-3 3" /><path d="M4 14a8 8 0 0 0 14 3l3-3" /></svg>);

const GOAL_META = {
  alimentacao: { label: "Alimentação", emoji: "🥗", lyrium: 50, desc: "Calorias no alvo" },
  sono:        { label: "Sono",        emoji: "🌙", lyrium: 60, desc: "Horas dormidas"  },
  passos:      { label: "Passos",      emoji: "👟", lyrium: 40, desc: "Passos diários"  },
  exercicio:   { label: "Exercícios",  emoji: "🏋️", lyrium: 70, desc: "Calorias gastas" },
  hidratacao:  { label: "Hidratação",  emoji: "💧", lyrium: 30, desc: "Água consumida"  },
};

const NIVEIS = ["leve", "moderado", "intenso"];
const NIVEL_LABEL = { leve: "Leve", moderado: "Moderado", intenso: "Intenso" };

function ProgressBar({ pct, cumprida }) {
  return (
    <div className="goal-track">
      <span
        className="goal-fill"
        style={{
          width: `${pct}%`,
          background: cumprida
            ? "linear-gradient(90deg,#22c55e,#16a34a)"
            : pct > 60
            ? "linear-gradient(90deg,#3b82f6,#6366f1)"
            : "linear-gradient(90deg,#f59e0b,#ef4444)",
          transition: "width .5s",
        }}
      />
    </div>
  );
}

function ObjetivosTab() {
  const { userName, healthData, goalPrefs, setGoalPrefs, getGoalProgress } = useApp();
  const { claimGoal, hasGoal, streak } = useLyrium();
  const [modal, setModal]       = useState(false);
  const [tmpPrefs, setTmpPrefs] = useState(goalPrefs);
  const [toast, setToast]       = useState(null);

  const metasAtivas = Object.entries(goalPrefs)
    .filter(([, v]) => v.active)
    .map(([id, v]) => ({ id, ...v, ...GOAL_META[id] }));

  const progressoGeral = metasAtivas.length === 0 ? 0
    : Math.round(metasAtivas.reduce((acc, m) => acc + getGoalProgress(m.id).pct, 0) / metasAtivas.length);

  function handleClaimGoal(goalId, lyriumAmount) {
    claimGoal(goalId, lyriumAmount);
    setToast(`+${lyriumAmount} ◎ Lyrium por cumprir ${GOAL_META[goalId].label}!`);
    setTimeout(() => setToast(null), 3000);
  }

  function savePrefs() {
    setGoalPrefs(tmpPrefs);
    setModal(false);
  }

  function toggleGoal(id) {
    setTmpPrefs(p => ({ ...p, [id]: { ...p[id], active: !p[id].active } }));
  }
  function setNivel(id, nivel) {
    setTmpPrefs(p => ({ ...p, [id]: { ...p[id], nivel } }));
  }

  return (
    <div className="page-meta">
      {toast && (
        <div style={{
          position:"fixed", top:"1.5rem", left:"50%", transform:"translateX(-50%)",
          background:"#22c55e", color:"#fff", padding:".6rem 1.4rem",
          borderRadius:"2rem", fontWeight:700, fontSize:".95rem",
          zIndex:9999, boxShadow:"0 4px 24px rgba(0,0,0,.3)",
          animation:"fadeInDown .3s ease",
        }}>
          {toast}
        </div>
      )}

      <section className="profile-progress-section" style={{marginBottom:"25px"}}>
        <article className="profile-progress-card">
          <h3>{userName || "Você"}</h3>
          {!healthData && (
            <p style={{ fontSize:".82rem", color:"#fff", marginBottom:".5rem" }}>
              ⚠️ Sincronize um app de saúde para ver seus dados reais.
            </p>
          )}
          <div className="profile-progress-content">
            <div className="goal-track-large goal-track">
              <span className="goal-fill goal-fill-main" style={{ width:`${progressoGeral}%` }} />
            </div>
            <span className="goal-side-icon">{IconTarget}</span>
          </div>
        </article>
      </section>

      <section>
        <div className="goals-panel">
          <div className="goals-panel-header">
            <h2>Meus Objetivos</h2>
            <span className="panel-line" />
          </div>

          {metasAtivas.length === 0 && (
            <p style={{ color:"var(--text-muted,#8a9bb5)", fontSize:".9rem", textAlign:"center", padding:"1rem 0" }}>
              Nenhuma meta ativa. Clique em "Alterar Metas" para começar.
            </p>
          )}

          <ul className="goals-list">
            {metasAtivas.map(goal => {
              const prog     = getGoalProgress(goal.id);
              const claimed  = hasGoal(goal.id);
              const podeResgatar = prog.cumprida && !claimed;

              return (
                <li key={goal.id} className="goal-item">
                  <article className="goal-card">

                    <div className="goal-header">
                      <span className="goal-emoji">{goal.emoji}</span>

                      <div className="goal-info">
                        <h4>{goal.label}</h4>
                        <small>{goal.desc}</small>
                      </div>

                      <div className="goal-percent">
                        {prog.pct}%
                      </div>
                    </div>

                    <div className="goal-values">
                      {healthData
                        ? `${prog.valor} / ${prog.meta} ${prog.unidade}`
                        : "-- / --"
                      }
                    </div>

                    <ProgressBar
                      pct={prog.pct}
                      cumprida={prog.cumprida}
                    />

                    {podeResgatar && (
                      <button
                        className="goal-claim-btn"
                        onClick={() =>
                          handleClaimGoal(goal.id, goal.lyrium)
                        }
                      >
                        Resgatar +{goal.lyrium} ◎
                      </button>
                    )}

                    {claimed && (
                      <div className="goal-claimed">
                        ✓ Lyrium resgatado hoje
                      </div>
                    )}

                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="action-section">
        <button className="primary-action" onClick={() => { setTmpPrefs(goalPrefs); setModal(true); }}>
          <span>Alterar Metas</span>
          {IconAlterar}
        </button>
      </section>

      {modal && (
        <div className="modalOverlay" onClick={() => setModal(false)}>
          <div className="modalSheet" onClick={e => e.stopPropagation()} style={{ maxHeight:"80vh", overflowY:"auto" }}>
            <div className="modalHeader">
              <h2>Alterar Metas <button className="modalClose" style={{width:"auto"}} onClick={() => setModal(false)}>✕</button></h2>
            </div>

            <p style={{ fontSize:".82rem", color:"var(--text-muted,#8a9bb5)", marginBottom:"1rem" }}>
              Escolha quais categorias acompanhar e o nível de dificuldade. As metas são definidas pelo Lyra com base nos seus dados.
            </p>

            {Object.entries(GOAL_META).map(([id, meta]) => {
              const pref = tmpPrefs[id] || { active: false, nivel: "moderado" };
              return (
                <div key={id} style={{
                  padding:".75rem", marginBottom:".6rem",
                  border: pref.active ? "1.5px solid #2db56e" : "1.5px solid var(--border, #2db56e)",
                  borderRadius:".75rem",
                  background: pref.active ? "#fff" : "var(--bg-surface, #fff)",
                }}>
                  <div style={{ display:"flex", alignItems:"center", gap:".75rem", marginBottom: pref.active ? ".6rem" : 0 }}>
                    <span style={{ fontSize:"1.2rem" }}>{meta.emoji}</span>
                    <span style={{ fontWeight:600, flex:1 }}>{meta.label}</span>
                    <button
                      onClick={() => toggleGoal(id)}
                      style={{
                        padding:".3rem .8rem", borderRadius:"2rem",
                        border:"none", fontWeight:700, fontSize:".8rem", cursor:"pointer",
                        background: pref.active ? "#2db56e" : "var(--bg-card, #000)",
                        color: pref.active ? "#fff" : "#2db56e",
                      }}
                    >
                      {pref.active ? "Ativo" : "Inativo"}
                    </button>
                  </div>

                  {pref.active && (
                    <div style={{ display:"flex", gap:".4rem" }}>
                      {NIVEIS.map(n => (
                        <button
                          key={n}
                          onClick={() => setNivel(id, n)}
                          style={{
                            flex:1, padding:".35rem", borderRadius:".5rem",
                            border:"none", fontSize:".75rem", fontWeight:600, cursor:"pointer",
                            background: pref.nivel === n ? "#3b82f6" : "var(--bg-card, #fff)",
                            color: pref.nivel === n ? "#fff" : "#000",
                          }}
                        >
                          {NIVEL_LABEL[n]}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <button
              onClick={savePrefs}
              style={{
                width:"100%", padding:".75rem", background:"#22c55e",
                border:"none", borderRadius:".75rem", color:"#fff",
                fontWeight:700, fontSize:"1rem", cursor:"pointer", marginTop:".5rem",
              }}
            >
              Salvar Metas
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ObjetivosTab;
