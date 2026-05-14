import { Link } from "react-router-dom";
import styles from "../styles/index.module.css";
import "../styles/home.css";
import logo from "../assets/LOGO-VETORIZADA.png"

function Home() {
  return (
    <>
      <div className="landing-wrapper">
        <div className="landing-left">
          <div className="landing-logo">
            <img src={logo} alt="Lyra" />
            <span>LYRA</span>
          </div>
          <h1 className="landing-headline">
            Bem-vindo ao <em>Lyra</em>
          </h1>
          <p className="landing-sub">
            Seu companheiro de saúde e bem-estar integrado ao Care Plus. 
            Acompanhe alimentação, sono, exercícios e evolua com seu avatar personalizado.
          </p>
          <div className="landing-features">
            <div className="landing-feature">
              <span className="feature-icon">🥗</span>
              <div>
                <strong>Alimentação</strong>
                <p>Registre refeições e acompanhe calorias com a câmera.</p>
              </div>
            </div>
            <div className="landing-feature">
              <span className="feature-icon">🌙</span>
              <div>
                <strong>Sono</strong>
                <p>Monitore a qualidade do seu sono e receba dicas.</p>
              </div>
            </div>
            <div className="landing-feature">
              <span className="feature-icon">👟</span>
              <div>
                <strong>Exercícios & Passos</strong>
                <p>Veja seus treinos e distância percorrida no dia.</p>
              </div>
            </div>
            <div className="landing-feature">
              <span className="feature-icon">🎮</span>
              <div>
                <strong>Avatar & Loja</strong>
                <p>Personalize seu avatar e desbloqueie recompensas.</p>
              </div>
            </div>
          </div>
          <Link to="/lgpd" className="landing-cta">Acessar o Lyra →</Link>
        </div>

        <div className="landing-right">
          <div className="phone-mockup">
            <div className="phone-notch"></div>
            <div className="phone-screen">
              <div className="preview-header">
                <span className="preview-title">Resumo</span>
                <span className="preview-badge">208 ●</span>
              </div>
              <div className="preview-namebar">Nome</div>
              <div className="preview-cards">
                <div className="preview-card"><span>🥗</span><strong>1245 kcal</strong></div>
                <div className="preview-card"><span>🌙</span><strong>5h sono</strong></div>
                <div className="preview-card"><span>👟</span><strong>156 passos</strong></div>
                <div className="preview-card"><span>🏋️</span><strong>200 CAL</strong></div>
              </div>
              <div className="preview-banner">Care Plus: viva melhor</div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.app} app-menu`}>
        <main className="menu-main">
          <header className="menu-header">
            <h1>Menu</h1>
          </header>
          <section className="menu-grid-section">
            <nav className="menu-grid">
              <div className="menu-card"></div>
              <Link to="/avatar" className="menu-card menu-card-active" aria-label="Avatar" />           
              <div className="menu-card" />
              <div className="menu-card" />
              <div className="menu-card" />
              <div className="menu-card" />
              <div className="menu-card" />
              <div className="menu-card" />
              <div className="menu-card" />
              <div className="menu-card" />
              <div className="menu-card" />
              <div className="menu-card" />
            </nav>
          </section>
          <footer className="menu-footer">
            <Link to="/lgpd" className="brand-pill"><span>LYRA</span></Link>
          </footer>
        </main>
      </div>
    </>
  );
}

export default Home;