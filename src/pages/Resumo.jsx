import { Link } from "react-router-dom";
import { useApp }    from "../context/AppContext";
import { useLyrium } from "../context/LyriumContext";
import styles   from "../styles/index.module.css";
import Sidebar  from "../components/Sidebar";
import BottomNav from "../components/BottomNav";
import Notificacao from "../components/Notificacao";

const svgRelogio = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const svgLyrium = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffd700">
    <circle cx="12" cy="12" r="10"/>
    <text x="12" y="15" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">◎</text>
  </svg>
);
const svgCamera = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
    <circle cx="12" cy="13" r="4"/>
  </svg>
);


function ringOffset(pct, r) {
  const circ = 2 * Math.PI * r;
  return circ - (circ * Math.min(pct, 100)) / 100;
}

function Resumo() {
  const { userName, healthData, getGoalProgress, isBeneficiario } = useApp();
  const { points } = useLyrium();
  const displayName = userName || "Você";

  const h = healthData;

  
  const pctSono     = h ? Math.min(100, Math.round((h.sono_horas / h.sono_meta) * 100))          : 0;
  const pctPassos   = h ? Math.min(100, Math.round((h.passos / h.passos_meta) * 100))             : 0;
  const pctExerc    = h ? Math.min(100, Math.round((h.calorias_gastas / h.calorias_exercicio_meta) * 100)) : 0;

  
  const R = [38, 28, 18];
  const circunf = R.map(r => 2 * Math.PI * r);

  
  const sonoMsg = !h ? "Sincronize um app" :
    h.sono_horas >= 8 ? "Sono excelente! 🌙" :
    h.sono_horas >= 6 ? "Durma mais, fi!" :
    "Sono muito baixo! 😴";

  return (
    <div className={styles.app}>
      <Sidebar />

      <header className={styles.appHeader}>
        <h1>Resumo</h1>
        <div className={styles.headerActions}>
          <div className={styles.badgePoints}><span>{points}</span>{svgLyrium}</div>
          <Notificacao />
        </div>
      </header>

      <header className={styles.desktopHeader}>
        <h1>Resumo</h1>
        <div className={styles.headerActions}>
          <div className={styles.desktopUserPill}><span>{displayName}</span>{svgRelogio}</div>
          <Notificacao />
        </div>
      </header>

      <div className={styles.nameBar}>
        <span>{displayName}</span>{svgRelogio}
      </div>

      <div className={styles.scrollContent}>
        <div className={styles.desktopMain}>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>Dashboard</h2>
            </div>

            <div className={styles.summaryCard}>
              <figure className={styles.ringWrap}>
                <svg viewBox="0 0 90 90">
                  <circle className={styles.ringTrack} cx="45" cy="45" r="38"/>
                  <circle className={styles.ringTrack} cx="45" cy="45" r="28"/>
                  <circle className={styles.ringTrack} cx="45" cy="45" r="18"/>
                  <circle
                    className={styles.ringSleep} cx="45" cy="45" r="38"
                    style={{ strokeDasharray: circunf[0], strokeDashoffset: ringOffset(pctSono, 38) }}
                  />
                  <circle
                    className={styles.ringSteps} cx="45" cy="45" r="28"
                    style={{ strokeDasharray: circunf[1], strokeDashoffset: ringOffset(pctPassos, 28) }}
                  />
                  <circle
                    className={styles.ringExercise} cx="45" cy="45" r="18"
                    style={{ strokeDasharray: circunf[2], strokeDashoffset: ringOffset(pctExerc, 18) }}
                  />
                </svg>
                <div className={styles.ringCenter}></div>
              </figure>

              <ul className={styles.ringLegend}>
                <li className={styles.lSleep}>Sono — {h ? `${pctSono}%` : "--"}</li>
                <li className={styles.lSteps}>Passos — {h ? `${pctPassos}%` : "--"}</li>
                <li className={styles.lExercise}>Exercícios — {h ? `${pctExerc}%` : "--"}</li>
              </ul>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.statGrid}>

              <article className={styles.statCard}>
                <div className={styles.statCardHeader}>
                  <Link to="/resumo/alimentacao" className={styles.linkArrow}><h3>Alimentação</h3>→</Link>
                </div>
                <p className={styles.statLabel}>Hoje</p>
                <p className={styles.statValue}>
                  {h ? h.calorias_consumidas : "--"} <small>kcal</small>
                </p>
                <button className={styles.btnPill}>{svgCamera} Camera</button>
              </article>

              <article className={styles.statCard}>
                <div className={styles.statCardHeader}>
                  <Link to="/resumo/sono" className={styles.linkArrow}><h3>Sono</h3>→</Link>
                </div>
                <p className={styles.statLabel}>Hoje</p>
                <p className={styles.statValue}>
                  {h ? h.sono_horas : "--"} <small>horas</small>
                </p>
                <button className={`${styles.btnPill} ${h && h.sono_horas < 7 ? styles.alert : ""}`}>
                  {sonoMsg}
                </button>
              </article>

              <article className={styles.statCard}>
                <div className={styles.statCardHeader}>
                  <Link to="/resumo/passos" className={styles.linkArrow}><h3>Passos</h3>→</Link>
                </div>
                <p className={styles.statLabel}>Hoje</p>
                <p className={styles.statValue}>{h ? h.passos.toLocaleString("pt-BR") : "--"}</p>
                <p className={styles.statSub}>Distância</p>
                <p className={styles.statValue} style={{ fontSize:"1.25rem" }}>
                  {h ? `${h.distancia_km} km` : "--"}
                </p>
              </article>

              <article className={styles.statCard}>
                <div className={styles.statCardHeader}>
                  <Link to="/resumo/exercicio" className={styles.linkArrow}><h3>Exercícios</h3>→</Link>
                </div>
                <p className={styles.statLabel}>Hoje</p>
                <p className={styles.statSub}>Treino</p>
                <p className={styles.statValue}>
                  {h ? h.calorias_gastas : "--"} <small>cal</small>
                </p>
              </article>

            </div>
          </section>

          <section>
            <div className={styles.banner}>
              <div className={styles.bannerContent}>
                <h2>Care Plus: um conselho para viver melhor</h2>
                <p>Lembre-se que agora é um presente.</p>
                <button className={styles.btnOutlineWhite}>Conheça a campanha</button>
              </div>
              <div className={styles.carouselDots}>
                <span className={styles.active}></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>Dicas</h2>
              <Link to="/resumo/dicas" className={styles.linkArrow}>Ver todas →</Link>
            </div>
            <div className={styles.tipsScroll}>
              <article className={styles.tipCard}>
                <h4>Dicas de Sono</h4>
                <p>Para uma vida plena, dormir bem é fundamental para restaurar sua mente...</p>
              </article>
              <article className={styles.tipCard}>
                <h4>Dicas de Treino</h4>
                <p>Para que seus treinos tenham o máximo de resultado, dormir bem é crucial...</p>
              </article>
              <article className={styles.tipCard}>
                <h4>Dicas de Saúde</h4>
                <p>Pequenos hábitos diários fazem toda a diferença para sua qualidade de vida...</p>
              </article>
            </div>
          </section>

          <p className={styles.tipParagraph}>
            Dormir bem restaura sua energia, praticar exercícios fortalece seu corpo e mente,
            e realizar seu exame é essencial para o monitoramento preventivo.
          </p>

        </div>
      </div>
      <BottomNav />
    </div>
  );
}

export default Resumo;