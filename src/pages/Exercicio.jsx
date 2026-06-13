import { Link }   from "react-router-dom";
import { useApp } from "../context/AppContext";
import "../styles/exercicio.css";
import styles from "../styles/index.module.css";
import Sidebar   from "../components/Sidebar";
import BottomNav from "../components/BottomNav";
import Notificacao from "../components/Notificacao";

const svgIcone = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--green-mid)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="2"/>
    <path d="M6.5 6.5a6 6 0 0 0 0 11"/>
    <path d="M17.5 6.5a6 6 0 0 1 0 11"/>
    <line x1="4" y1="12" x2="7" y2="12"/>
    <line x1="17" y1="12" x2="20" y2="12"/>
  </svg>
);
const svgRelogio = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);

function Exercicio() {
  const { userName, healthData } = useApp();
  const displayName = userName || "Você";
  const h = healthData;

  const treinos = h
    ? [
        { nome:"Treino de Força",      cal: Math.round(h.calorias_gastas * 0.35) },
        { nome:"Cardio",               cal: Math.round(h.calorias_gastas * 0.30) },
        { nome:"Alongamento",          cal: Math.round(h.calorias_gastas * 0.15) },
        { nome:"Atividade do dia a dia",cal: Math.round(h.calorias_gastas * 0.20) },
      ]
    : [
        { nome:"Treino Tradicional de Força", cal: null },
        { nome:"Treino Tradicional de Força", cal: null },
        { nome:"Treino Tradicional de Força", cal: null },
        { nome:"Treino Tradicional de Força", cal: null },
      ];

  const mesAtual = new Date().toLocaleDateString("pt-BR", { month:"long", year:"numeric" });

  return (
    <div className="app">
      <Sidebar />

      <header className={styles.desktopHeader}>
        <h1>Exercícios</h1>
        <div className={styles.headerActions}>
          <div className={styles.desktopUserPill}><span>{displayName}</span>{svgRelogio}</div>
          <Notificacao />
        </div>
      </header>

      <header className="app-header">
        <Link to="/resumo" className="btn-icon btn-back" aria-label="Voltar">←</Link>
        <h1>Exercício</h1>
        <span className="header-spacer" aria-hidden="true"></span>
      </header>

      <main className="scroll-content">
        {h && (
          <section className="section" style={{ padding:"1rem" }}>
            <div style={{ display:"flex", gap:"1rem", justifyContent:"space-around", textAlign:"center" }}>
              <div>
                <p style={{ fontSize:"1.4rem", fontWeight:700, color:"var(--green-mid,#22c55e)" }}>{h.calorias_gastas}</p>
                <p style={{ fontSize:".75rem", color:"var(--text-muted,#8a9bb5)" }}>cal gastas</p>
              </div>
              <div>
                <p style={{ fontSize:"1.4rem", fontWeight:700, color:"var(--green-mid,#22c55e)" }}>{h.minutos_exercicio}</p>
                <p style={{ fontSize:".75rem", color:"var(--text-muted,#8a9bb5)" }}>minutos</p>
              </div>
              <div>
                <p style={{ fontSize:"1.4rem", fontWeight:700, color:"var(--green-mid,#22c55e)" }}>{h.calorias_exercicio_meta}</p>
                <p style={{ fontSize:".75rem", color:"var(--text-muted,#8a9bb5)" }}>meta cal</p>
              </div>
            </div>
          </section>
        )}

        <section className="section month-section" aria-labelledby="mes-heading">
          <h2 className="month-heading" id="mes-heading">{mesAtual}</h2>
          <ul className="exercise-list" role="list">
            {treinos.map((t, i) => (
              <li key={i} className="exercise-item" role="listitem">
                <div className="ex-thumb">{svgIcone}</div>
                <div className="ex-info">
                  <p className="ex-name">{t.nome}</p>
                  <strong className="ex-cal">
                    {t.cal !== null ? `${t.cal} CAL` : "-- CAL"}
                  </strong>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <BottomNav />
    </div>
  );
}

export default Exercicio;