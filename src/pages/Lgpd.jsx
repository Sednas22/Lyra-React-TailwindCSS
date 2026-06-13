import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/lgpd.css";
import logo from "../assets/LOGO.png";
import { useApp } from "../context/AppContext";

function Lgpd() {
  const { setUserName, userName } = useApp();
  const [name, setName] = useState(userName || "");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleApprove() {
    if (!name.trim()) {
      setError("Por favor, informe seu nome para continuar.");
      return;
    }
    setUserName(name.trim());
    navigate("/sincronizacao");
  }

  return (
    <div className="lgpd-screen">
      <main className="logo-container">
        <img src={logo} alt="Logo Lyra" className="main-logo" />
      </main>

      <aside className="bottom-sheet" aria-labelledby="lgpd-title">
        <div className="sheet-indicator"></div>
        <div className="sheet-content">
          <h2 id="lgpd-title">Termos de Privacidade (LGPD)</h2>

          <p>
            Para continuarmos a personalizar sua experiência de saúde e bem-estar,
            precisamos do seu consentimento para o tratamento de dados conforme a
            Lei Geral de Proteção de Dados.
          </p>

          <div style={{ margin: "1rem 0" }}>
            <label
              htmlFor="user-name"
              style={{ display: "block", marginBottom: ".4rem", fontWeight: 600, fontSize: ".9rem" }}
            >
              Como você se chama?
            </label>
            <input
              id="user-name"
              type="text"
              autoComplete="off"
              placeholder="Seu nome"
              defaultValue={userName || ""}
              onBlur={e => {
                setName(e.target.value);
                setError("");
              }}
              onChange={e => {
                setName(e.target.value);
                if (error) setError("");
              }}
              style={{
                width: "100%",
                padding: ".7rem 1rem",
                borderRadius: ".75rem",
                border: error ? "1.5px solid #f87171" : "1.5px solid var(--border, #000)",
                background: "var(--bg-surface, #fff)",
                color: "#000",
                fontSize: "1rem",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
            {error && (
              <p style={{ color: "#f87171", fontSize: ".82rem", marginTop: ".3rem" }}>{error}</p>
            )}
            <p style={{ fontSize: ".78rem", color: "var(--text-muted, #8a9bb5)", marginTop: ".3rem" }}>
              ℹ️ Na versão final, esse dado virá automaticamente do Care Plus.
            </p>
          </div>

          <a
            href="https://docs.google.com/document/d/1-Jju_UgpThFC29mTy5Fy8qcJ-eqSx1Ho21eTAl0VbfE/edit?tab=t.0#heading=h.wwzrvxdmfazb"
            target="_blank"
            rel="noreferrer"
            style={{ fontSize: ".85rem" }}
          >
            Ver Política de Privacidade
          </a>

          <div className="action-buttons">
            <Link to="/">
              <button className="btn-decline" aria-label="Não aprovar termos">
                Não Aprovar
              </button>
            </Link>
            <button className="btn-approve" aria-label="Aprovar termos" onClick={handleApprove}>
              Aprovar
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default Lgpd;
