import { useState } from "react";
import "../../styles/objetivos.css";

const IconTarget = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
    <path d="M15 9l5-5" />
  </svg>
);

const IconAlimentacao = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.1"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="6" />
    <path d="M3 3v18" />
    <path d="M21 3v18" />
    <path d="M8 12h8" />
  </svg>
);

const IconSono = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.1"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 4h10" />
    <path d="M9 2v3" />
    <path d="M15 2v3" />
    <rect x="5" y="8" width="14" height="11" rx="5" />
    <path d="M12 11v3" />
    <path d="M10 14h4" />
  </svg>
);

const IconExercicio = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.1"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 11a5 5 0 0 1 10 0v4" />
    <rect x="5" y="15" width="14" height="5" rx="2.5" />
  </svg>
);

const IconPassos = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.1"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 17l4-4" />
    <path d="M13 11l4-4" />
    <path d="M5 19l2-2" />
    <path d="M11 13l2-2" />
    <path d="M15 15l4 4" />
  </svg>
);

const IconHidratacao = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.1"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M8 4c0 3-3 4-3 8a5 5 0 0 0 10 0c0-4-3-5-3-8" />
    <path d="M16 8c0 2-2 3-2 6a4 4 0 0 0 8 0c0-3-2-4-2-6" />
  </svg>
);

const IconCalorias = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.1"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="7" />
    <path d="M9 12h6" />
    <path d="M12 9v6" />
    <path d="M7.5 7.5c1.2.5 2.5.8 4.5.8s3.3-.3 4.5-.8" />
  </svg>
);

const IconSaude = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.1"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 14a4 4 0 0 1 4-4 5 5 0 0 1 9.7-1.6A4 4 0 1 1 19 18H9" />
    <circle cx="9" cy="18" r="3" />
    <path d="M9 16.5v3" />
    <path d="M7.5 18h3" />
  </svg>
);

const IconAlterar = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 4v6h-6" />
    <path d="M3 20v-6h6" />
    <path d="M20 10a8 8 0 0 0-14-3l-3 3" />
    <path d="M4 14a8 8 0 0 0 14 3l3-3" />
  </svg>
);

const GOALS = [
  {
    id: "alimentacao",
    icon: IconAlimentacao,
    label: "Alimentação",
    soft: false,
  },
  { id: "sono", icon: IconSono, label: "Sono", soft: false },
  { id: "exercicio", icon: IconExercicio, label: "Exercícios", soft: true },
  { id: "passos", icon: IconPassos, label: "Passos", soft: true },
  { id: "hidratacao", icon: IconHidratacao, label: "Hidratação", soft: true },
  { id: "calorias", icon: IconCalorias, label: "Calorias", soft: true },
  { id: "saude", icon: IconSaude, label: "Saúde", soft: true },
];

function ObjetivosTab() {
  const [alterarModal, setAlterarModal] = useState(false);

  const userName = "Nome";

  return (
    <div className="page-meta">
      <section className="profile-progress-section">
        <article className="profile-progress-card">
          <h3>{userName}</h3>

          <div className="profile-progress-content">
            <div className="goal-track-large goal-track">
              <span
                className="goal-fill goal-fill-main"
                style={{ width: "0%" }}
              />
            </div>

            <span className="goal-side-icon">{IconTarget}</span>
          </div>
        </article>
      </section>

      <section>
        <div className="goals-panel">
          <div className="goals-panel-header">
            <h2>Meus Objetivos</h2>
            <span className="panel-line" />
          </div>

          <ul className="goals-list">
            {GOALS.map((goal) => (
              <li key={goal.id} className="goal-item">
                <article className="goal-row">
                  <div className="goal-icon">{goal.icon}</div>

                  <div className="goal-bar-wrap">
                    <div className="goal-track">
                      <span className="goal-fill" style={{ width: "0%" }}>
                        <strong>--</strong>
                      </span>
                    </div>
                  </div>

                  <span
                    className={`goal-target ${
                      goal.soft ? "goal-target-soft" : ""
                    }`}
                  >
                    {IconTarget}
                  </span>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="action-section">
        <button
          className="primary-action"
          onClick={() => setAlterarModal(true)}
        >
          <span>Alterar Metas</span>
          {IconAlterar}
        </button>
      </section>

      {alterarModal && (
        <div className="modalOverlay" onClick={() => setAlterarModal(false)}>
          <div className="modalSheet" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <h2>Alterar Metas</h2>
              <button
                className="modalClose"
                onClick={() => setAlterarModal(false)}
              >
                ✕
              </button>
            </div>

            <p className="modalEmpty">
              A edição de metas estará disponível ao integrar com o backend.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ObjetivosTab;
