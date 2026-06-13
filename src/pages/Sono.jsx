import { Link }   from "react-router-dom";
import { useApp } from "../context/AppContext";
import styles from "../styles/index.module.css";
import "../styles/sono.css";
import Sidebar   from "../components/Sidebar";
import BottomNav from "../components/BottomNav";
import Notificacao from "../components/Notificacao";

const svgRelogio = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);

function Sono() {
  const { userName, healthData } = useApp();
  const displayName = userName || "Você";
  const h = healthData;

  const horasInteiras = h ? Math.floor(h.sono_horas) : null;
  const minutos       = h ? Math.round((h.sono_horas % 1) * 60) : null;

  const semana = h?.semana ?? [];
  const maxSono = semana.length ? Math.max(...semana.map(d => d.sono)) : 1;

  const qualidadeColor = {
    "Ótima":   "#22c55e",
    "Boa":     "#3b82f6",
    "Regular": "#f59e0b",
    "Ruim":    "#ef4444",
  };

  return (
    <div className="app">
      <Sidebar />

      <header className={styles.desktopHeader}>
        <h1>Sono</h1>
        <div className={styles.headerActions}>
          <div className={styles.desktopUserPill}><span>{displayName}</span>{svgRelogio}</div>
          <Notificacao />
        </div>
      </header>

      <header className="app-header">
        <Link to="/resumo" className="btn-icon btn-back">←</Link>
        <h1>Sono</h1>
        <span className="header-spacer"></span>
      </header>

      <main className="scroll-content">
        <section className="section quality-section">
          <h2 className="quality-heading">Qualidade de Sono</h2>
          <span
            className="quality-badge"
            style={h ? { background: qualidadeColor[h.sono_qualidade] + "22", color: qualidadeColor[h.sono_qualidade], border: `1px solid ${qualidadeColor[h.sono_qualidade]}` } : {}}
          >
            {h ? h.sono_qualidade : "Moderado"}
          </span>
        </section>

        <section className="section history-section">
          <h2 className="history-heading">Semana</h2>

          <div className="sleep-row">
            <div className="sleep-row-label">
              <span className="sleep-icon">🛏️</span>
              <span className="sleep-row-title">Sono</span>
            </div>
            <span className="arrow-icon">→</span>
          </div>

          {semana.length > 0 && (
            <div style={{ display:"flex", alignItems:"flex-end", gap:"6px", height:80, margin:"1rem 0 .5rem" }}>
              {semana.map((d, i) => (
                <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:"4px" }}>
                  <div style={{
                    width:"100%",
                    height: `${Math.round((d.sono / maxSono) * 64)}px`,
                    background: "var(--green-mid,#22c55e)",
                    borderRadius:"4px 4px 0 0",
                    opacity: i === semana.length - 1 ? 1 : 0.5,
                    minHeight:4,
                  }} />
                  <span style={{ fontSize:".6rem", color:"var(--text-muted,#8a9bb5)" }}>{d.dia}</span>
                </div>
              ))}
            </div>
          )}

          <div className="sleep-time-block">
            <span className="sleep-time-label">Tempo Dormindo</span>
            <div className="sleep-time-value">
              <strong>{horasInteiras !== null ? horasInteiras : "--"}</strong>
              <span className="sleep-unit">h</span>
              <strong>{minutos !== null ? minutos : "--"}</strong>
              <span className="sleep-unit">min</span>
            </div>
          </div>

          {h && (
            <p style={{ fontSize:".8rem", color:"var(--text-muted,#8a9bb5)", marginTop:".5rem" }}>
              Meta: {h.sono_meta}h por noite
            </p>
          )}
        </section>

        <section className="section article-section">
          <article className="sleep-article">
            <div className="article-img-wrap">
              <div className="cloud-art">
                <div className="cloud"></div>
                <span className="zzz">z z z</span>
              </div>
            </div>
            <div className="article-body">
              <h3 className="article-title">Avalie se você está dormindo bem</h3>
              <p className="article-desc">Como dormir o necessário e por que isso é importante</p>
            </div>
          </article>
        </section>
      </main>
      <BottomNav />
    </div>
  );
}

export default Sono;