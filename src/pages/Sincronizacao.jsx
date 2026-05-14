import { Link } from "react-router-dom";
import "../styles/lgpd.css";
import "../styles/sinc.css";
import logo from "../assets/LOGO.png";
import googleFit from "../assets/01.png";
import appleHealth from "../assets/02.png";
import samsungHealth from "../assets/03.png";

function Sincronizacao() {
  return (
    <body className="lgpd-screen">
      <main className="logo-container">
        <img src={logo} alt="Logo Lyra" className="main-logo" />
      </main>

      <aside className="bottom-sheet" aria-labelledby="sync-title">
        <div className="sheet-indicator"></div>

        <div className="sheet-content">
          <h2 id="sync-title">Sincronize com seus Apps</h2>

          <p>
            Conecte seus apps de saúde favoritos para personalizar sua experiência no Lyra.
          </p>

          <ul className="app-sync-list">
            <li className="app-item">
              <img src={googleFit} alt="Google Fit" className="app-logo" />
            </li>

            <li className="app-item">
              <img src={appleHealth} alt="Apple Health" className="app-logo" />
            </li>

            <li className="app-item">
              <img src={samsungHealth} alt="Samsung Health" className="app-logo" />
            </li>
          </ul>

          <div className="action-buttons">
            <Link to="/avatar">
              <button className="btn-approve" aria-label="Continuar para o app">
                Continuar
                <span className="icon-arrow">→</span>
              </button>
            </Link>
          </div>
        </div>
      </aside>
    </body>
  );
}

export default Sincronizacao;