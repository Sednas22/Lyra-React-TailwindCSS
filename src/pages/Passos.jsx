import { Link }   from "react-router-dom";
import { useApp } from "../context/AppContext";
import "../styles/passos.css";
import styles from "../styles/index.module.css";
import Sidebar   from "../components/Sidebar";
import BottomNav from "../components/BottomNav";
import Notificacao from "../components/Notificacao";

const svgRelogio = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);

function BarChart({ dados, valorKey, cor, labelKey, meta }) {
  const W = 320, H = 120, PAD_L = 32, PAD_B = 20, PAD_T = 8, PAD_R = 8;
  const innerW = W - PAD_L - PAD_R;
  const innerH = H - PAD_B - PAD_T;
  const max   = Math.max(...dados.map(d => d[valorKey]), meta ?? 0, 1);
  const barW  = innerW / dados.length;
  const gap   = barW * 0.25;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display:"block", overflow:"visible" }}>
      {meta && (
        <>
          <line
            x1={PAD_L} y1={PAD_T + innerH - (meta / max) * innerH}
            x2={W - PAD_R} y2={PAD_T + innerH - (meta / max) * innerH}
            stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 3"
          />
          <text x={PAD_L - 2} y={PAD_T + innerH - (meta / max) * innerH - 2}
            fontSize="8" fill="#f59e0b" textAnchor="end"
          >meta</text>
        </>
      )}

      {dados.map((d, i) => {
        const val  = d[valorKey];
        const bH   = Math.max((val / max) * innerH, 2);
        const x    = PAD_L + i * barW + gap / 2;
        const y    = PAD_T + innerH - bH;
        const ativo = i === dados.length - 1;
        return (
          <g key={i}>
            <rect
              x={x} y={y} width={barW - gap} height={bH}
              rx="3" fill={cor}
              opacity={ativo ? 1 : 0.45}
            />
            <text
              x={x + (barW - gap) / 2}
              y={H - 4}
              fontSize="8" fill="#8a9bb5" textAnchor="middle"
            >{d[labelKey]}</text>
          </g>
        );
      })}

      <text x={PAD_L - 4} y={PAD_T + 6}    fontSize="8" fill="#8a9bb5" textAnchor="end">{max.toLocaleString("pt-BR")}</text>
      <text x={PAD_L - 4} y={PAD_T + innerH} fontSize="8" fill="#8a9bb5" textAnchor="end">0</text>
    </svg>
  );
}

function Passos() {
  const { userName, healthData } = useApp();
  const displayName = userName || "Você";
  const h = healthData;
  const semana = h?.semana ?? [];

  const semanaComDist = semana.map(d => ({
    ...d,
    distancia: parseFloat((d.passos * 0.0008).toFixed(2)),
  }));

  return (
    <div className="app">
      <Sidebar />

      <header className={styles.desktopHeader}>
        <h1>Passos</h1>
        <div className={styles.headerActions}>
          <div className={styles.desktopUserPill}><span>{displayName}</span>{svgRelogio}</div>
          <Notificacao />
        </div>
      </header>

      <header className="app-header">
        <Link to="/resumo" className="btn-icon btn-back" aria-label="Voltar">←</Link>
        <h1>Passo &amp; Distância</h1>
        <span className="header-spacer" aria-hidden="true"></span>
      </header>

      <main className="scroll-content">
        <section className="section tabs-section">
          <nav className="period-tabs" role="tablist">
            <button className="tab-pill tab-sm active" role="tab" aria-selected="true">Semana</button>
          </nav>
        </section>

        <section className="section chart-section" aria-labelledby="passos-heading">
          <div className="chart-header">
            <h2 className="chart-title" id="passos-heading">Passos</h2>
            <div className="chart-dotted" aria-hidden="true"></div>
            <span className="chart-total">
              {h ? h.passos.toLocaleString("pt-BR") : "--"}
            </span>
          </div>

          <div className="chart-box">
            {semana.length > 0
              ? <BarChart
                  dados={semana}
                  valorKey="passos"
                  labelKey="dia"
                  cor="var(--green-mid, #22c55e)"
                  meta={h?.passos_meta}
                />
              : <p style={{ color:"#8a9bb5", fontSize:".85rem", textAlign:"center", padding:"2rem 0" }}>
                  Sincronize um app para ver seus dados
                </p>
            }
          </div>
        </section>

        <section className="section chart-section" aria-labelledby="distancia-heading">
          <div className="chart-header">
            <h2 className="chart-title" id="distancia-heading">Distância</h2>
            <div className="chart-dotted" aria-hidden="true"></div>
            <span className="chart-total">{h ? `${h.distancia_km} km` : "-- km"}</span>
          </div>

          <div className="chart-box">
            {semanaComDist.length > 0
              ? <BarChart
                  dados={semanaComDist}
                  valorKey="distancia"
                  labelKey="dia"
                  cor="#3b82f6"
                />
              : <p style={{ color:"#8a9bb5", fontSize:".85rem", textAlign:"center", padding:"2rem 0" }}>
                  Sincronize um app para ver seus dados
                </p>
            }
          </div>
        </section>
      </main>
      <BottomNav />
    </div>
  );
}

export default Passos;