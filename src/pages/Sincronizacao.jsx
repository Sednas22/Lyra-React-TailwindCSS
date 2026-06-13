import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/lgpd.css";
import "../styles/sinc.css";
import logo from "../assets/LOGO.png";
import googleFit     from "../assets/01.png";
import appleHealth   from "../assets/02.png";
import samsungHealth from "../assets/03.png";
import { useApp } from "../context/AppContext";

const APPS = [
  { id: "google_fit",     label: "Google Fit",     img: googleFit },
  { id: "apple_health",   label: "Apple Health",   img: appleHealth },
  { id: "samsung_health", label: "Samsung Health", img: samsungHealth },
];

function Sincronizacao() {
  const { setSyncApp, syncApp } = useApp();
  const [selected, setSelected] = useState(syncApp || "");
  const [loading, setLoading]   = useState(false);
  const navigate = useNavigate();

  function handleContinue() {
    if (!selected) return;
    setLoading(true);
    setTimeout(() => {
      setSyncApp(selected);
      navigate("/resumo");
    }, 1400);
  }

  return (
    <div className="lgpd-screen">
      <main className="logo-container">
        <img src={logo} alt="Logo Lyra" className="main-logo" />
      </main>

      <aside className="bottom-sheet" aria-labelledby="sync-title">
        <div className="sheet-indicator"></div>
        <div className="sheet-content">
          <h2 id="sync-title">Sincronize com seus Apps</h2>
          <p>
            Conecte seu app de saúde para personalizar metas, gráficos e dados no Lyra.
            Seus dados serão usados apenas para calcular seu progresso.
          </p>

          <ul className="app-sync-list" style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: ".6rem", margin: "1rem 0" }}>
            {APPS.map(app => (
              <li
                key={app.id}
                className="app-item"
                onClick={() => setSelected(app.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: ".75rem 1rem",
                  borderRadius: "1rem",
                  border: selected === app.id
                    ? "2px solid #22c55e"
                    : "1.5px solid var(--border, #2d3548)",
                  background: selected === app.id
                    ? "rgba(34,197,94,.08)"
                    : "var(--bg-surface, #1a1f2e)",
                  cursor: "pointer",
                  transition: "all .2s",
                }}
                aria-selected={selected === app.id}
              >
                <img src={app.img} alt={app.label} className="app-logo" style={{ width: 40, height: 40, objectFit: "contain" }} />
                <span style={{ fontWeight: 600, flex: 1 }}>{app.label}</span>
                {selected === app.id && (
                  <span style={{ color: "#22c55e", fontWeight: 700, fontSize: "1.1rem" }}>✓</span>
                )}
              </li>
            ))}
          </ul>

          {loading && (
            <p style={{ textAlign: "center", color: "#22c55e", fontWeight: 600, marginBottom: ".75rem" }}>
              Sincronizando dados...⏳
            </p>
          )}

          <div className="action-buttons" style={{ flexDirection: "column" }}>
            <button
              className="btn-approve"
              disabled={!selected || loading}
              onClick={handleContinue}
              style={{ opacity: selected ? 1 : 0.5 }}
            >
              {loading ? "Aguarde..." : "Continuar →"}
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default Sincronizacao;
