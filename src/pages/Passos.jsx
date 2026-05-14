import { Link } from "react-router-dom";
import "../styles/passos.css";
import styles from "../styles/index.module.css"
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

function Passos() {
  return (
    <div className="app">
      <Sidebar />
      <header className={styles.desktopHeader}>
                          <h1>Passos</h1>
                  
                          <div className={styles.headerActions}>
                            <div className={styles.desktopUserPill}>
                              <span>Nome</span>
                              {svg.relogio}
                            </div>
                  
                            <Notificacao/>
                          </div>
                        </header>

      <header className="app-header">
        <Link to="/resumo" className="btn-icon btn-back" aria-label="Voltar">←</Link>
        <h1>Passo &amp; Distancia</h1>
        <span className="header-spacer" aria-hidden="true"></span>
      </header>

      <main className="scroll-content">
        <section className="section tabs-section" aria-label="Período">
          <nav className="period-tabs" role="tablist">
            <button className="tab-pill tab-sm active" role="tab" aria-selected="true">D</button>
          </nav>
        </section>

        <section className="section chart-section" aria-labelledby="passos-heading">
          <div className="chart-header">
            <h2 className="chart-title" id="passos-heading">Passos</h2>
            <div className="chart-dotted" aria-hidden="true"></div>
            <span className="chart-total">--</span>
          </div>

          <div className="chart-box" aria-label="Gráfico de barras — passos">
            <div className="bar-chart" aria-hidden="true">

              <div className="bar" style={{ "--h": "1%" }}></div>
              <div className="bar" style={{ "--h": "1%" }}></div>
              <div className="bar" style={{ "--h": "1%" }}></div>
              <div className="bar" style={{ "--h": "1%" }}></div>
              <div className="bar" style={{ "--h": "1%" }}></div>
              <div className="bar" style={{ "--h": "1%" }}></div>
              <div className="bar" style={{ "--h": "1%" }}></div>
              <div className="bar" style={{ "--h": "1%" }}></div>
              <div className="bar" style={{ "--h": "1%" }}></div>
              <div className="bar" style={{ "--h": "1%" }}></div>
              <div className="bar" style={{ "--h": "1%" }}></div>
              <div className="bar" style={{ "--h": "1%" }}></div>
              <div className="bar" style={{ "--h": "1%" }}></div>
              <div className="bar" style={{ "--h": "1%" }}></div>
            </div>

            <div className="chart-axis" aria-hidden="true">
              <span>--</span>
              <span>--</span>
            </div>
          </div>
        </section>

        <section className="section chart-section" aria-labelledby="distancia-heading">
          <div className="chart-header">
            <h2 className="chart-title" id="distancia-heading">Distancia</h2>
            <div className="chart-dotted" aria-hidden="true"></div>
            <span className="chart-total">-- km</span>
          </div>

          <div className="chart-box" aria-label="Gráfico de barras — distância">
            <div className="bar-chart" aria-hidden="true">

              <div className="bar" style={{ "--h": "1%" }}></div>
              <div className="bar" style={{ "--h": "1%" }}></div>
              <div className="bar" style={{ "--h": "1%" }}></div>
              <div className="bar" style={{ "--h": "1%" }}></div>
              <div className="bar" style={{ "--h": "1%" }}></div>
              <div className="bar" style={{ "--h": "1%" }}></div>
              <div className="bar" style={{ "--h": "1%" }}></div>
              <div className="bar" style={{ "--h": "1%" }}></div>
              <div className="bar" style={{ "--h": "1%" }}></div>
              <div className="bar" style={{ "--h": "1%" }}></div>
              <div className="bar" style={{ "--h": "1%" }}></div>
              <div className="bar" style={{ "--h": "1%" }}></div>
              <div className="bar" style={{ "--h": "1%" }}></div>
              <div className="bar" style={{ "--h": "1%" }}></div>
            </div>

            <div className="chart-axis" aria-hidden="true">
              <span>--</span>
              <span>--</span>
            </div>
          </div>
        </section>
      </main>
      <BottomNav />
    </div>
  );
}

export default Passos;