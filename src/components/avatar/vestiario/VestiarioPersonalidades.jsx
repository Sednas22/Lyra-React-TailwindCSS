import { useState } from "react";
import { Link } from "react-router-dom";
import avatarImg from "../../../assets/buddy.png";
import cowboy from "../../../assets/cowboy.png";
import robo from "../../../assets/robo.png";
import militar from "../../../assets/militar.png";
import caipira from "../../../assets/caipira.png";
import gaucho from "../../../assets/gaucho.png";
// import homemAranha from "../../../assets/homemAranha.png";
import s from "../../../styles/vestiario-sub.module.css";

const IconBack = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="18"
    height="18"
  >
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const IconCheck = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="11"
    height="11"
  >
    <path d="M5 12l4 4 10-10" />
  </svg>
);

const IconPersona = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="14"
    height="14"
  >
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
);

const MINHAS_PERSONAS = [
  {
    id: "padrao",
    name: "Padrão",
    desc: "Seu avatar original, sempre disponível.",
    img: avatarImg,
    bg: "linear-gradient(160deg, #e8f8ef, #d4f0e0)",
    status: "equipped",
    price: null,
  },
  {
    id: "cowboy",
    name: "Cowboy",
    desc: "Estilo faroeste para aventureiros.",
    img: cowboy,
    bg: "linear-gradient(160deg, #fff4e0, #ffe8b0)",
    status: "owned",
    price: null,
  },
  {
    id: "robo",
    name: "Robô",
    desc: "Visual futurista e tecnológico.",
    img: robo,
    bg: "linear-gradient(160deg, #e8f0ff, #c8d8ff)",
    status: "locked",
    price: "200",
  },
  {
    id: "militar",
    name: "Militar",
    desc: "Força e determinação em cada passo.",
    img: militar,
    bg: "linear-gradient(160deg, #fff0f8, #ffd6f0)",
    status: "locked",
    price: "250",
  },
];

const LOJA_PERSONAS = [
  {
    id: "caipira",
    name: "Caipira",
    desc: "Jeitinho brasileiro do interior.",
    img: caipira,
    bg: "linear-gradient(160deg, #f5ffe0, #dff7a0)",
    price: "150",
  },
  {
    id: "gaucho",
    name: "Gaúcho",
    desc: "Orgulho sulista com estilo.",
    img: gaucho,
    bg: "linear-gradient(160deg, #e8ffe8, #b0f0c0)",
    price: "180",
  },
  // {
  //   id: "heroi",
  //   name: "Herói",
  //   desc: "Super poderes para sua saúde.",
  //   img: homemAranha,
  //   bg: "linear-gradient(160deg, #ffe8f8, #f8c0e8)",
  //   price: "300",
  // },
];

const WARDROBE_NAV = [
  { id: "roupas", label: "Vestuário" },
  { id: "acessorios", label: "Acessórios" },
  { id: "personalidades", label: "Personalidades" },
  { id: "tags", label: "Tags" },
];

export default function VestiarioPersonalidades({ onBack, onNavigate }) {
  const [equipped, setEquipped] = useState("padrao");

  const equippedPersona = MINHAS_PERSONAS.find((p) => p.id === equipped);

  return (
    <>
      <header className={s.subHeader}>
        <div className={s.headerLeft}>
          <button
            type="button"
            className={s.btnBack}
            onClick={onBack}
            aria-label="Voltar para o vestiário"
          >
            {IconBack}
          </button>
          <h1>Personalidades</h1>
        </div>
      </header>

      <div className={s.wardrobeDesktopGrid}>
        <aside
          className={s.wardrobeAvatarCol}
          aria-label="Avatar com personalidade equipada"
        >
          <h2>Seu Avatar</h2>

          <div className={s.avatarPreviewWrap}>
            <img src={equippedPersona?.img ?? avatarImg} alt="Avatar" />
          </div>
          <div className={s.avatarShadowSm} />

          <div className={s.equippedBadge}>
            {IconPersona}
            {equippedPersona?.name ?? "Padrão"} equipado
          </div>

          <nav
            className={s.wardrobeSubNav}
            aria-label="Categorias do vestiário"
          >
            {WARDROBE_NAV.map((item) => (
              <button
                key={item.id}
                type="button"
                className={[
                  s.wardrobeSubLink,
                  item.id === "personalidades" ? s.wardrobeSubLinkActive : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() =>
                  item.id !== "personalidades" &&
                  onNavigate &&
                  onNavigate(item.id)
                }
              >
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        <div className={s.wardrobeItemsCol}>
          <div className={s.wardrobeHero}>
            <div className={s.avatarPreviewWrap}>
              <img src={equippedPersona?.img ?? avatarImg} alt="Avatar" />
            </div>
            <div className={s.avatarShadowSm} />
            <div className={s.equippedBadge}>
              {IconPersona}
              {equippedPersona?.name ?? "Padrão"} equipado
            </div>
          </div>

          <div className={s.subSection}>
            <p className={s.subSectionTitle}>⭐ Suas personalidades</p>

            <div className={s.itemsGrid}>
              {MINHAS_PERSONAS.map((persona) => (
                <article
                  key={persona.id}
                  className={[
                    s.personaCard,
                    persona.id === equipped ? s.personaEquipped : "",
                    persona.status === "locked" ? s.personaLocked : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <div
                    className={s.personaImg}
                    style={{ background: persona.bg }}
                  >
                    <img src={persona.img} alt={persona.name} />
                    {persona.id === equipped && (
                      <span className={s.checkBadge} aria-hidden="true">
                        {IconCheck}
                      </span>
                    )}
                  </div>

                  <div className={s.personaBody}>
                    <p className={s.personaName}>{persona.name}</p>
                    <p className={s.personaDesc}>{persona.desc}</p>

                    <p
                      className={[
                        s.personaPrice,
                        persona.status !== "locked" ? s.personaPriceOwned : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {persona.id === equipped
                        ? "✓ Equipado"
                        : persona.status === "owned"
                        ? "Obtido"
                        : `${persona.price} ◎`}
                    </p>

                    {persona.status === "owned" && persona.id !== equipped && (
                      <button
                        type="button"
                        className={s.btnEquip}
                        onClick={() => setEquipped(persona.id)}
                      >
                        Equipar
                      </button>
                    )}

                    {persona.status === "locked" && (
                      <button
                        type="button"
                        className={`${s.btnEquip} ${s.btnEquipLocked}`}
                        disabled
                      >
                        Bloqueado
                      </button>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className={s.subSection}>
            <p className={s.subSectionTitle}>🏪 Disponível na Loja</p>

            <div className={s.itemsGrid}>
              {LOJA_PERSONAS.map((persona) => (
                <article
                  key={persona.id}
                  className={`${s.personaCard} ${s.personaLocked}`}
                >
                  <div
                    className={s.personaImg}
                    style={{ background: persona.bg }}
                  >
                    <img src={persona.img} alt={persona.name} />
                  </div>

                  <div className={s.personaBody}>
                    <p className={s.personaName}>{persona.name}</p>
                    <p className={s.personaDesc}>{persona.desc}</p>
                    <p className={s.personaPrice}>{persona.price} ◎</p>

                    <Link
                      to="/loja/personalidades"
                      className={`${s.btnEquip} ${s.btnEquipLink}`}
                    >
                      Comprar
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
