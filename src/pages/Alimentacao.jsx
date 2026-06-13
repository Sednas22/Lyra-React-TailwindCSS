import { Link }   from "react-router-dom";
import { useApp } from "../context/AppContext";
import styles  from "../styles/alimentacao.module.css";
import styles2 from "../styles/index.module.css";
import Sidebar   from "../components/Sidebar";
import BottomNav from "../components/BottomNav";
import Notificacao from "../components/Notificacao";

const svgCamera = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
    <circle cx="12" cy="13" r="4"/>
  </svg>
);
const svgXicara = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--green-mid)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
    <line x1="6" y1="1" x2="6" y2="4"/>
    <line x1="10" y1="1" x2="10" y2="4"/>
    <line x1="14" y1="1" x2="14" y2="4"/>
  </svg>
);
const svgRelogio = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);

function Alimentacao() {
  const { userName, healthData } = useApp();
  const displayName = userName || "Você";
  const h = healthData;

  const cafe    = h ? Math.round(h.calorias_consumidas * 0.22) : null;
  const almoco  = h ? Math.round(h.calorias_consumidas * 0.38) : null;
  const jantar  = h ? Math.round(h.calorias_consumidas * 0.28) : null;
  const lanches = h ? Math.round(h.calorias_consumidas * 0.12) : null;

  return (
    <div className={styles.app}>
      <Sidebar />

      <header className={styles2.desktopHeader}>
        <h1>Alimentação</h1>
        <div className={styles2.headerActions}>
          <div className={styles2.desktopUserPill}><span>{displayName}</span>{svgRelogio}</div>
          <Notificacao />
        </div>
      </header>

      <header className={styles.appHeader}>
        <Link to="/resumo" className={`${styles.btnIcon} ${styles.btnBack}`}>←</Link>
        <h1>Alimentação</h1>
        <span className={styles.headerSpacer}></span>
      </header>

      <div className={styles.scrollContent}>
        <section className={styles.section}>
          <div className={styles.summaryRow}>
            <div className={styles.calTotalCard}>
              <p className={styles.calTotalLabel}>Calorias</p>
              <p className={styles.calTotalSub}>Consumidas hoje</p>
              <p className={styles.calTotalValue}>
                {h ? `${h.calorias_consumidas} kcal` : "-- kcal"}
              </p>
              {h && (
                <p style={{ fontSize:".78rem", color:"var(--text-muted,#8a9bb5)", marginTop:".3rem" }}>
                  Meta: {h.calorias_meta} kcal
                </p>
              )}
            </div>

            <div className={styles.cameraCard}>
              <div className={styles.cameraCardTop}>
                <span className={styles.cameraLabel}>Registrar</span>
                {svgCamera}
              </div>
              <p className={styles.cameraDesc}>Tire uma foto da sua refeição</p>
              <span className={styles.cameraArrow}>→</span>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.mealsSection}`}>
          <h2 className={styles.dayHeading}>Hoje</h2>
          <ul className={styles.mealsList}>
            {[
              { nome:"Café da manhã", cal: cafe   },
              { nome:"Almoço",        cal: almoco  },
              { nome:"Jantar",        cal: jantar  },
              { nome:"Lanches",       cal: lanches },
            ].map(meal => (
              <li key={meal.nome} className={styles.mealItem}>
                <div className={styles.mealThumb}>{svgXicara}</div>
                <div className={styles.mealInfo}>
                  <span className={styles.mealName}>{meal.nome}</span>
                  <span className={styles.mealCal}>
                    {meal.cal !== null ? `${meal.cal} kcal` : "-- kcal"}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <BottomNav />
    </div>
  );
}

export default Alimentacao;