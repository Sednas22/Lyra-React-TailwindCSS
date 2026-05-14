import { useState } from "react";
import s from "../../styles/ComunidadeTab.module.css";

const IconCarePlus = (
  <svg
    viewBox="0 0 72 28"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 16h10l4-8 6 16 6-12 5 4h8" />
    <path d="M49 16h9" />
  </svg>
);

const IconChevronRight = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 18l6-6-6-6" />
  </svg>
);

const IconPlus = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </svg>
);

const GRUPOS = [
  { id: "rh", nome: "Care Plus RH", pessoas: "--" },
  { id: "geral", nome: "Care Plus Geral", pessoas: "--" },
  { id: "dev", nome: "Care Plus Dev", pessoas: "--" },
];

function ComunidadeTab() {
  const [adicionarModal, setAdicionarModal] = useState(false);
  const [grupoModal, setGrupoModal] = useState(null);

  return (
    <div className={s["page-meta"]}>
      <section className={s["featured-community-section"]}>
        <article className={s["featured-community-card"]}>
          <button
            type="button"
            className={s["featured-community-link"]}
            aria-label="Abrir comunidade Care Plus Saúde"
          >
            <div className={s["featured-community-logo"]} aria-hidden="true">
              <span>Care</span>
              <span>Plus</span>
              {IconCarePlus}
            </div>
            <div className={s["featured-community-content"]}>
              <h3>Care Plus</h3>
              <p>Saúde</p>
            </div>
            <span className={s["featured-community-arrow"]} aria-hidden="true">
              {IconChevronRight}
            </span>
          </button>
        </article>
      </section>

      <section className={s["groups-section"]}>
        <div className={s["groups-panel"]}>
          <div className={s["groups-panel-header"]}>
            <h2>Meus Grupos</h2>
            <button
              className={s["add-group-button"]}
              type="button"
              aria-label="Adicionar grupo"
              onClick={() => setAdicionarModal(true)}
            >
              {IconPlus}
            </button>
          </div>

          <ul className={s["groups-list"]}>
            {GRUPOS.map((grupo) => (
              <li key={grupo.id}>
                <article className={s["group-card"]}>
                  <button
                    type="button"
                    className={s["group-link"]}
                    aria-label={`Abrir grupo ${grupo.nome} com ${grupo.pessoas} pessoas`}
                    onClick={() => setGrupoModal(grupo)}
                  >
                    <span className={s["group-avatar"]} aria-hidden="true" />
                    <div className={s["group-content"]}>
                      <h3>{grupo.nome}</h3>
                    </div>
                    <p className={s["group-meta"]}>{grupo.pessoas} Pessoas</p>
                  </button>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {adicionarModal && (
        <div
          className={s["modalOverlay"]}
          role="dialog"
          aria-modal="true"
          onClick={() => setAdicionarModal(false)}
        >
          <div className={s["modalSheet"]} onClick={(e) => e.stopPropagation()}>
            <div className={s["modalHeader"]}>
              <h2>Adicionar Grupo</h2>
              <button
                className={s["modalClose"]}
                type="button"
                onClick={() => setAdicionarModal(false)}
                aria-label="Fechar"
              >
                ✕
              </button>
            </div>
            <p className={s["modalEmpty"]}>
              A busca e adição de grupos estará disponível ao integrar com o
              backend.
            </p>
          </div>
        </div>
      )}

      {grupoModal && (
        <div
          className={s["modalOverlay"]}
          role="dialog"
          aria-modal="true"
          onClick={() => setGrupoModal(null)}
        >
          <div className={s["modalSheet"]} onClick={(e) => e.stopPropagation()}>
            <div className={s["modalHeader"]}>
              <h2>{grupoModal.nome}</h2>
              <button
                className={s["modalClose"]}
                type="button"
                onClick={() => setGrupoModal(null)}
                aria-label="Fechar"
              >
                ✕
              </button>
            </div>
            <p className={s["modalEmpty"]}>
              As informações do grupo estarão disponíveis ao integrar com o
              backend.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ComunidadeTab;
