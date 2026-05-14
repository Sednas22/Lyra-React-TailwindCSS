import { Link } from "react-router-dom";
import styles from "../styles/dicas.module.css";
import styles2 from "../styles/index.module.css";
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

function Dicas() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <header className={styles2.desktopHeader}>
                    <h1>Dicas</h1>
            
                    <div className={styles2.headerActions}>
                      <div className={styles2.desktopUserPill}>
                        <span>Nome</span>
                        {svg.relogio}
                      </div>
            
                      <Notificacao/>
                    </div>
                  </header>
      <header className={styles.appHeader}>
        <Link to="/resumo" className={`${styles.btnIcon} ${styles.btnBack}`} aria-label="Voltar">←</Link>

        <h1>Dicas</h1>

        <span className={styles.headerSpacer} aria-hidden="true"></span>
      </header>

      <main className={styles.scrollContent}>

        <article className={styles.tipCard} aria-labelledby="tip-sono">
          <h2 className={styles.tipHeading} id="tip-sono">Dicas de Sono</h2>
          <p className={styles.tipText}>
            Para uma vida plena, dormir bem é fundamental para restaurar sua mente,
            enquanto o exercício fortalece seu corpo. Contudo, a chave para a longevidade
            é o cuidado preventivo, e fazer seu exame na Care Plus garante o monitoramento
            preciso da sua saúde.
          </p>
        </article>

        <article className={styles.tipCard} aria-labelledby="tip-treino">
          <h2 className={styles.tipHeading} id="tip-treino">Dicas de Treino</h2>
          <p className={styles.tipText}>
            Para que seus treinos tenham o máximo resultado, dormir bem é crucial para
            a recuperação muscular. Manter essa rotina de exercícios exige um corpo saudável
            e fazer seu exame na Care Plus garante que você treine com total segurança e
            performance.
          </p>
        </article>

      </main>
      <BottomNav />
    </div>
  );
}

export default Dicas;