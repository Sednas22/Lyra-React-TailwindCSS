import { Link } from "react-router-dom";
import styles from "../styles/index.module.css"
import "../styles/sono.css";
import Sidebar from "../components/Sidebar";
import BottomNav from "../components/BottomNav";
import Notificacao from "../components/Notificacao";

const svg = {
  notificacao: (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
  <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
  ),
  relogio: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                    stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                </svg>
  ),
  lyrium: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffd700">
                    <circle cx="12" cy="12" r="10" />
                    <text x="12" y="15" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">◎</text>
                  </svg>
  ),
}

function Sono() {
  return (
    
    <div className="app">
      <Sidebar />
      <header className={styles.desktopHeader}>
                    <h1>Sono</h1>
            
                    <div className={styles.headerActions}>
                      <div className={styles.desktopUserPill}>
                        <span>Nome</span>
                        {svg.relogio}
                      </div>
            
                      <Notificacao/>
                    </div>
                  </header>
      <header className="app-header">
        <Link to="/resumo" className="btn-icon btn-back">←</Link>
        <h1>Sono</h1>
        <span className="header-spacer"></span>
      </header>

      <main className="scroll-content">

        <section className="section quality-section">
          <h2 className="quality-heading">
            Qualidade de Sono
          </h2>

          <span className="quality-badge">
            Moderado
          </span>
        </section>

        <section className="section history-section">
          <h2 className="history-heading">
            Últimos 12 Meses
          </h2>

          <div className="sleep-row">
            <div className="sleep-row-label">
              <span className="sleep-icon">🛏️</span>
              <span className="sleep-row-title">Sono</span>
            </div>

            <span className="arrow-icon">→</span>
          </div>

          <div className="sleep-time-block">
            <span className="sleep-time-label">
              Tempo Dormindo
            </span>

            <div className="sleep-time-value">
              <strong>--</strong>
              <span className="sleep-unit">h</span>
              <strong>--</strong>
              <span className="sleep-unit">min</span>
            </div>
          </div>
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
              <h3 className="article-title">
                Avalie se você está dormindo bem
              </h3>

              <p className="article-desc">
                Como dormir o necessário e por que isso é importante
              </p>
            </div>

          </article>
        </section>

      </main>
      <BottomNav/>
    </div>
  );
}

export default Sono;