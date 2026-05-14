import { Link } from "react-router-dom";
import "../styles/lgpd.css";
import logo from "../assets/LOGO.png";

function Lgpd() {
  return (
    <body className="lgpd-screen">
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

          <a
            href="https://docs.google.com/document/d/1-Jju_UgpThFC29mTy5Fy8qcJ-eqSx1Ho21eTAl0VbfE/edit?tab=t.0#heading=h.wwzrvxdmfazb"
            target="_blank"
            rel="noreferrer"
            aria-label="Ver política de privacidade"
            id="lgpd-title"
          >
            Ver Política de Privacidade
          </a>

          <div className="action-buttons">
            <Link to="/">
              <button className="btn-decline" aria-label="Não aprovar termos">
                Não Aprovar
              </button>
            </Link>

            <Link to="/sincronizacao">
              <button className="btn-approve" aria-label="Aprovar termos">
                Aprovar
              </button>
            </Link>
          </div>
        </div>
      </aside>
    </body>
  );
}

export default Lgpd;