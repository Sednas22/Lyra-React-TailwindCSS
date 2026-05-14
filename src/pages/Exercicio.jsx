import { Link } from "react-router-dom";
import "../styles/exercicio.css";
import styles from "../styles/index.module.css";
import Sidebar from "../components/Sidebar";
import BottomNav from "../components/BottomNav";
import Notificacao from "../components/Notificacao";

const svg = {
  icone: (
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--green-mid)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="2" />
                  <path d="M6.5 6.5a6 6 0 0 0 0 11" />
                  <path d="M17.5 6.5a6 6 0 0 1 0 11" />
                  <line x1="4" y1="12" x2="7" y2="12" />
                  <line x1="17" y1="12" x2="20" y2="12" />
                </svg>
  ),
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

function Exercicio() {
  return (
    <div className="app">
      <Sidebar />
      <header className={styles.desktopHeader}>
                    <h1>Exercícios</h1>
            
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
        <h1>Exercício</h1>
        <span className="header-spacer" aria-hidden="true"></span>
      </header>

      <main className="scroll-content">
        <section className="section month-section" aria-labelledby="nov-heading">
          <h2 className="month-heading" id="nov-heading">novembro 2025</h2>

          <ul className="exercise-list" role="list">

            <li className="exercise-item" role="listitem">
              <div className="ex-thumb">
                {svg.icone}
              </div>

              <div className="ex-info">
                <p className="ex-name">Treino Tradicional de Força</p>
                <strong className="ex-cal">-- CAL</strong>
              </div>
            </li>

            <li className="exercise-item" role="listitem">
              <div className="ex-thumb">
                {svg.icone}
              </div>

              <div className="ex-info">
                <p className="ex-name">Treino Tradicional de Força</p>
                <strong className="ex-cal">-- CAL</strong>
              </div>
            </li>

            <li className="exercise-item" role="listitem">
              <div className="ex-thumb">
                {svg.icone}
              </div>

              <div className="ex-info">
                <p className="ex-name">Treino Tradicional de Força</p>
                <strong className="ex-cal">-- CAL</strong>
              </div>
            </li>

            <li className="exercise-item" role="listitem">
              <div className="ex-thumb">
                {svg.icone}
              </div>

              <div className="ex-info">
                <p className="ex-name">Treino Tradicional de Força</p>
                <strong className="ex-cal">-- CAL</strong>
              </div>
            </li>

          </ul>
        </section>

        <section className="section month-section" aria-labelledby="oct-heading">
          <h2 className="month-heading" id="oct-heading">outubro 2025</h2>

          <ul className="exercise-list" role="list">

            <li className="exercise-item">
              <div className="ex-thumb">
                {svg.icone}
              </div>

              <div className="ex-info">
                <p className="ex-name">Treino Tradicional de Força</p>
                <strong className="ex-cal">-- CAL</strong>
              </div>
            </li>

            <li className="exercise-item">
              <div className="ex-thumb">
                {svg.icone}
              </div>

              <div className="ex-info">
                <p className="ex-name">Treino Tradicional de Força</p>
                <strong className="ex-cal">-- CAL</strong>
              </div>
            </li>

            <li className="exercise-item">
              <div className="ex-thumb">
                {svg.icone}
              </div>

              <div className="ex-info">
                <p className="ex-name">Treino Tradicional de Força</p>
                <strong className="ex-cal">-- CAL</strong>
              </div>
            </li>

          </ul>
        </section>
      </main>
      <BottomNav />
    </div>
  );
}

export default Exercicio;