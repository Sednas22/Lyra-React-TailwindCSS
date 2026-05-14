import { useState } from "react";
import { Link } from "react-router-dom";
import avatarImg from "../../../assets/buddy.png";
import garrafa from "../../../assets/garrafa.png";
import testeira from "../../../assets/Faixa-roxa.png";
import pochete from "../../../assets/pochete.png";
import bone from "../../../assets/bone.png";
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

const IconLock = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="11"
    height="11"
    aria-hidden="true"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const IconEquipped = (
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
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
  </svg>
);

const EQUIPAMENTOS = [
  {
    id: "garrafa",
    name: "Garrafa",
    img: garrafa,
    status: "equipped",
    price: null,
  },
  {
    id: "testeira",
    name: "Testeira",
    img: testeira,
    status: "owned",
    price: null,
  },
  {
    id: "pochete",
    name: "Pochete",
    img: pochete,
    status: "locked",
    price: "60",
  },
  { id: "bone", name: "Boné", img: bone, status: "locked", price: "40" },
];

const LOJA_ITEMS = [
  {
    id: "bone-pro",
    name: "Boné Pro",
    img: bone,
    price: "120",
    bgColor: "#fff8e8",
  },
  {
    id: "pochete-sport",
    name: "Pochete Sport",
    img: pochete,
    price: "90",
    bgColor: "#f0f4ff",
  },
];

const WARDROBE_NAV = [
  { id: "roupas", label: "Vestuário" },
  { id: "acessorios", label: "Acessórios" },
  { id: "personalidades", label: "Personalidades" },
  { id: "tags", label: "Tags" },
];

export default function VestiarioAcessorios({ onBack, onNavigate }) {
  const [equipped, setEquipped] = useState("garrafa");

  const equippedItem = EQUIPAMENTOS.find((i) => i.id === equipped);

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
          <h1>Acessórios</h1>
        </div>
      </header>

      <div className={s.wardrobeDesktopGrid}>
        <aside
          className={s.wardrobeAvatarCol}
          aria-label="Avatar com acessório equipado"
        >
          <h2>Seu Avatar</h2>

          <div className={s.avatarPreviewWrap}>
            <img src={avatarImg} alt="Avatar" />
          </div>
          <div className={s.avatarShadowSm} />

          {equippedItem && (
            <div className={s.equippedBadge}>
              {IconEquipped}
              {equippedItem.name} equipada
            </div>
          )}

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
                  item.id === "acessorios" ? s.wardrobeSubLinkActive : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() =>
                  item.id !== "acessorios" && onNavigate && onNavigate(item.id)
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
              <img src={avatarImg} alt="Avatar" />
            </div>
            <div className={s.avatarShadowSm} />
            {equippedItem && (
              <div className={s.equippedBadge}>
                {IconEquipped}
                {equippedItem.name} equipada
              </div>
            )}
          </div>

          <div className={s.subSection}>
            <p className={s.subSectionTitle}>💧 Equipamentos</p>

            <div className={s.itemsGrid}>
              {EQUIPAMENTOS.map((item) => (
                <article
                  key={item.id}
                  className={[
                    s.itemCard,
                    item.id === equipped ? s.itemEquipped : "",
                    item.status === "locked" ? s.itemLocked : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() =>
                    item.status !== "locked" && setEquipped(item.id)
                  }
                  role="button"
                  tabIndex={item.status === "locked" ? -1 : 0}
                  aria-label={
                    item.id === equipped
                      ? `${item.name} — equipada`
                      : item.status === "locked"
                      ? `${item.name} — bloqueada, ${item.price} pontos`
                      : `Equipar ${item.name}`
                  }
                >
                  <div className={s.itemImg}>
                    <img src={item.img} alt={item.name} />
                  </div>
                  <div className={s.itemFooter}>
                    <span className={s.itemName}>{item.name}</span>
                    <span
                      className={[
                        s.itemPrice,
                        item.status === "equipped" || item.id === equipped
                          ? s.itemPriceOwned
                          : "",
                        item.status === "owned" ? s.itemPriceOwned : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {item.id === equipped
                        ? "Equipada"
                        : item.status === "owned"
                        ? "Obtida"
                        : `${item.price} ◎`}
                    </span>
                  </div>

                  {item.id === equipped && (
                    <span className={s.checkBadge} aria-hidden="true">
                      {IconCheck}
                    </span>
                  )}

                  {item.status === "locked" && item.id !== equipped && (
                    <span className={s.lockBadge} aria-hidden="true">
                      {IconLock}
                    </span>
                  )}
                </article>
              ))}
            </div>
          </div>

          <div className={s.subSection}>
            <p className={s.subSectionTitle}>🏪 Disponível na Loja</p>

            <div className={s.itemsGrid}>
              {LOJA_ITEMS.map((item) => (
                <article
                  key={item.id}
                  className={`${s.itemCard} ${s.itemLocked}`}
                  aria-label={`${item.name} — ${item.price} pontos`}
                >
                  <div
                    className={s.itemImg}
                    style={{ background: item.bgColor }}
                  >
                    <img src={item.img} alt={item.name} />
                  </div>
                  <div className={s.itemFooter}>
                    <span className={s.itemName}>{item.name}</span>
                    <span className={s.itemPrice}>{item.price} ◎</span>
                  </div>
                  <span className={s.lockBadge} aria-hidden="true">
                    {IconLock}
                  </span>
                </article>
              ))}
            </div>

            <Link
              to="/loja"
              className={`${s.btnEquip} ${s.btnEquipFull}`}
              style={{ marginTop: "14px" }}
            >
              Comprar na Loja →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
