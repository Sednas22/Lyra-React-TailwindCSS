import { useState } from "react";
import { Link } from "react-router-dom";
import avatarImg from "../../../assets/buddy.png";
import camisaImg from "../../../assets/camisa.png";
import regataImg from "../../../assets/regata.png";
import shortsImg from "../../../assets/shorts.png";
import tenisImg from "../../../assets/tenis.png";
import garrafaImg from "../../../assets/garrafa.png";
import testeiraImg from "../../../assets/Faixa-roxa.png";
import pocheteImg from "../../../assets/pochete.png";
import boneImg from "../../../assets/bone.png";
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

const IconShirt = (
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
    <path d="M8 4l1.8 2h4.4L16 4l3 2.2-1.5 4.3-1.5-.7V20H8V9.8l-1.5.7L5 6.2 8 4z" />
  </svg>
);

const ROUPAS = [
  {
    id: "regata",
    name: "Regata",
    img: regataImg,
    status: "equipped",
    price: null,
  },
  {
    id: "camisa",
    name: "Camisa",
    img: camisaImg,
    status: "owned",
    price: null,
  },
  {
    id: "shorts",
    name: "Shorts",
    img: shortsImg,
    status: "locked",
    price: "50",
  },
  { id: "tenis", name: "Tênis", img: tenisImg, status: "locked", price: "80" },
];

const ACESSORIOS = [
  {
    id: "garrafa",
    name: "Garrafa",
    img: garrafaImg,
    status: "equipped",
    price: null,
  },
  {
    id: "testeira",
    name: "Testeira",
    img: testeiraImg,
    status: "owned",
    price: null,
  },
  {
    id: "pochete",
    name: "Pochete",
    img: pocheteImg,
    status: "locked",
    price: "60",
  },
  { id: "bone", name: "Boné", img: boneImg, status: "locked", price: "40" },
];

const WARDROBE_NAV = [
  { id: "roupas", label: "Vestuário" },
  { id: "acessorios", label: "Acessórios" },
  { id: "personalidades", label: "Personalidades" },
  { id: "tags", label: "Tags" },
];

function ItemCard({ item, equipped, onEquip }) {
  const isEquipped = item.id === equipped;

  return (
    <article
      className={[
        s.itemCard,
        isEquipped ? s.itemEquipped : "",
        item.status === "locked" ? s.itemLocked : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={() => item.status !== "locked" && onEquip(item.id)}
      role="button"
      tabIndex={item.status === "locked" ? -1 : 0}
      aria-label={
        isEquipped
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
            item.status !== "locked" ? s.itemPriceOwned : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {isEquipped
            ? "Equipada"
            : item.status === "owned"
            ? "Obtida"
            : `${item.price} ◎`}
        </span>
      </div>

      {isEquipped && (
        <span className={s.checkBadge} aria-hidden="true">
          {IconCheck}
        </span>
      )}
      {item.status === "locked" && !isEquipped && (
        <span className={s.lockBadge} aria-hidden="true">
          {IconLock}
        </span>
      )}
    </article>
  );
}

export default function VestiarioRoupas({ onBack, onNavigate }) {
  const [equippedRoupa, setEquippedRoupa] = useState("regata");
  const [equippedAcessorio, setEquippedAcessorio] = useState("garrafa");

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
          <h1>Vestuário</h1>
        </div>
      </header>

      <div className={s.wardrobeDesktopGrid}>
        <aside
          className={s.wardrobeAvatarCol}
          aria-label="Avatar com roupa equipada"
        >
          <h2>Seu Avatar</h2>

          <div className={s.avatarPreviewWrap}>
            <img src={avatarImg} alt="Avatar" />
          </div>
          <div className={s.avatarShadowSm} />

          <div className={s.equippedBadge}>
            {IconShirt}
            {ROUPAS.find((i) => i.id === equippedRoupa)?.name ?? "Regata"}{" "}
            equipada
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
                  item.id === "roupas" ? s.wardrobeSubLinkActive : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() =>
                  item.id !== "roupas" && onNavigate && onNavigate(item.id)
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
            <div className={s.equippedBadge}>
              {IconShirt}
              {ROUPAS.find((i) => i.id === equippedRoupa)?.name ??
                "Regata"}{" "}
              equipada
            </div>
          </div>

          <div className={s.subSection}>
            <p className={s.subSectionTitle}>👕 Roupas</p>
            <div className={s.itemsGrid}>
              {ROUPAS.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  equipped={equippedRoupa}
                  onEquip={setEquippedRoupa}
                />
              ))}
            </div>
          </div>

          <div className={s.subSection}>
            <p className={s.subSectionTitle}>💧 Acessórios</p>
            <div className={s.itemsGrid}>
              {ACESSORIOS.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  equipped={equippedAcessorio}
                  onEquip={setEquippedAcessorio}
                />
              ))}
            </div>
          </div>

          <div className={s.subSection}>
            <Link
              to="/loja/roupas"
              className={`${s.btnEquip} ${s.btnEquipFull}`}
            >
              Ver todas as roupas na Loja →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
