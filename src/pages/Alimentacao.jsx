import { Link } from "react-router-dom";
import styles from "../styles/alimentacao.module.css";
import styles2 from "../styles/index.module.css";
import Sidebar from "../components/Sidebar";
import BottomNav from "../components/BottomNav";
import Notificacao from "../components/Notificacao";

const svg = {
  camera: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                                        <path
                                            d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                                        <circle cx="12" cy="13" r="4" />
                                    </svg>
  ),
  xicara: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--green-mid)"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                                <line x1="6" y1="1" x2="6" y2="4" />
                                <line x1="10" y1="1" x2="10" y2="4" />
                                <line x1="14" y1="1" x2="14" y2="4" />
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

function Alimentacao() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <header className={styles2.desktopHeader}>
                    <h1>Alimentação</h1>
            
                    <div className={styles2.headerActions}>
                      <div className={styles2.desktopUserPill}>
                        <span>Nome</span>
                        {svg.relogio}
                      </div>
            
                      <Notificacao/>
                    </div>
                  </header>
      <header className={styles.appHeader}>
        <Link to="/resumo" className={`${styles.btnIcon} ${styles.btnBack}`}>
          ←
        </Link>
        <h1>Alimentação</h1>
        <span className={styles.headerSpacer}></span>
      </header>

      <div className={styles.scrollContent}>
        <section className={styles.section}>
          <div className={styles.summaryRow}>
            
            <div className={styles.calTotalCard}>
              <p className={styles.calTotalLabel}>Calorias</p>
              <p className={styles.calTotalSub}>Consumidas hoje</p>
              <p className={styles.calTotalValue}>-- kcal</p>
            </div>

            <div className={styles.cameraCard}>
              <div className={styles.cameraCardTop}>
                <span className={styles.cameraLabel}>Registrar</span>
                {svg.camera}
              </div>

              <p className={styles.cameraDesc}>
                Tire uma foto da sua refeição
              </p>

              <span className={styles.cameraArrow}>→</span>
            </div>

          </div>
        </section>

        <section className={`${styles.section} ${styles.mealsSection}`}>
          <h2 className={styles.dayHeading}>Hoje</h2>

          <ul className={styles.mealsList}>

            <li className={styles.mealItem}>
              <div className={styles.mealThumb}>{svg.xicara}</div>
              <div className={styles.mealInfo}>
                <span className={styles.mealName}>Café da manhã</span>
                <span className={styles.mealCal}>-- kcal</span>
              </div>
            </li>

            <li className={styles.mealItem}>
              <div className={styles.mealThumb}>{svg.xicara}</div>
              <div className={styles.mealInfo}>
                <span className={styles.mealName}>Almoço</span>
                <span className={styles.mealCal}>-- kcal</span>
              </div>
            </li>

            <li className={styles.mealItem}>
              <div className={styles.mealThumb}>{svg.xicara}</div>
              <div className={styles.mealInfo}>
                <span className={styles.mealName}>Jantar</span>
                <span className={styles.mealCal}>-- kcal</span>
              </div>
            </li>

            <li className={styles.mealItem}>
              <div className={styles.mealThumb}>{svg.xicara}</div>
              <div className={styles.mealInfo}>
                <span className={styles.mealName}>Lanches</span>
                <span className={styles.mealCal}>-- kcal</span>
              </div>
            </li>

          </ul>
        </section>
      </div>
      <BottomNav />
    </div>
  );
}

export default Alimentacao;