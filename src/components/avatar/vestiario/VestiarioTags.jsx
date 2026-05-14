import { useState } from "react";
import { Link } from "react-router-dom";
import avatarImg from "../../../assets/buddy.png";
import tag1 from "../../../assets/tag1.png";
import tag2 from "../../../assets/tag2.png";
import tag3 from "../../../assets/tag3.png";
import tag4 from "../../../assets/tag4.png";
import tag5 from "../../../assets/tag5.png";
import s from "../../../styles/vestiario-sub.module.css";

const IconTag = (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
    <path d="M10.6 3H5a2 2 0 0 0-2 2v5.6a2 2 0 0 0 .6 1.4l8.4 8.4a2 2 0 0 0 2.8 0l6.2-6.2a2 2 0 0 0 0-2.8L12 3.6A2 2 0 0 0 10.6 3z" />
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
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="11"
    height="11"
    aria-hidden="true"
  >
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>
);

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

const TAGS = [
  {
    id: "guardiao",
    name: "Guardião do Coração",
    rarity: "Comum",
    rarityKey: "common",
    img: tag5,
    status: "equipped",
    price: null,
  },
  {
    id: "maratonista",
    name: "Maratonista",
    rarity: "Rara",
    rarityKey: "rare",
    img: tag4,
    status: "owned",
    price: null,
  },
  {
    id: "mestre",
    name: "Mestre do Sono",
    rarity: "Épica",
    rarityKey: "epic",
    img: tag3,
    status: "locked",
    price: "3000",
  },
  {
    id: "arquiteto",
    name: "Arquiteto da Vida",
    rarity: "Épica",
    rarityKey: "epic",
    img: tag2,
    status: "locked",
    price: "3000",
  },
  {
    id: "navegador",
    name: "Navegador da Vitalidade",
    rarity: "Lendária",
    rarityKey: "legendary",
    img: tag1,
    status: "locked",
    price: "6000",
  },
];

const WARDROBE_NAV = [
  { id: "roupas", label: "Vestuário" },
  { id: "acessorios", label: "Acessórios" },
  { id: "personalidades", label: "Personalidades" },
  { id: "tags", label: "Tags" },
];

export default function VestiarioTags({ onBack, onNavigate }) {
  const [equipped, setEquipped] = useState("guardiao");

  const equippedTag = TAGS.find((t) => t.id === equipped);

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
          <h1>Tags</h1>
        </div>
      </header>

      <div className={s.wardrobeDesktopGrid}>
        <aside
          className={s.wardrobeAvatarCol}
          aria-label="Avatar com tag equipada"
        >
          <h2>Seu Avatar</h2>

          <div className={s.avatarPreviewWrap}>
            <img src={avatarImg} alt="Avatar" />
          </div>
          <div className={s.avatarShadowSm} />

          {equippedTag && (
            <div className={s.equippedTagInfo}>
              <p className={s.equippedTagLabel}>Tag equipada</p>
              <img
                src={equippedTag.img}
                alt={equippedTag.name}
                className={s.equippedTagImg}
              />
              <span className={s.equippedTagName}>{equippedTag.name}</span>
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
                  item.id === "tags" ? s.wardrobeSubLinkActive : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() =>
                  item.id !== "tags" && onNavigate && onNavigate(item.id)
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
            {equippedTag && (
              <div className={s.equippedBadge}>
                {IconTag}
                {equippedTag.name}
              </div>
            )}
          </div>

          <div className={s.subSection}>
            <p className={s.subSectionTitle}>🏷️ Suas tags</p>

            <div className={s.tagsGrid}>
              {TAGS.map((tag) => (
                <article
                  key={tag.id}
                  className={[
                    s.tagCard,
                    tag.id === equipped ? s.tagEquipped : "",
                    tag.status === "locked" ? s.tagLocked : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {tag.id === equipped && (
                    <span className={s.checkBadge} aria-hidden="true">
                      {IconCheck}
                    </span>
                  )}

                  {tag.status === "locked" && (
                    <span className={s.lockBadge} aria-hidden="true">
                      {IconLock}
                    </span>
                  )}

                  <img src={tag.img} alt={tag.name} className={s.tagImg} />

                  <div className={s.tagInfo}>
                    <p className={s.tagName}>{tag.name}</p>
                    <p
                      className={[
                        s.tagRarity,
                        tag.rarityKey === "rare" ? s.tagRarityRare : "",
                        tag.rarityKey === "epic" ? s.tagRarityEpic : "",
                        tag.rarityKey === "legendary"
                          ? s.tagRarityLegendary
                          : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {tag.rarity}
                      {tag.id === equipped && " • Equipada ✓"}
                    </p>

                    {tag.status === "locked" && tag.price && (
                      <p className={s.tagPrice}>{tag.price} ◎</p>
                    )}

                    {tag.id === equipped && (
                      <button
                        type="button"
                        className={`${s.btnEquip} ${s.btnEquipEquipped}`}
                        disabled
                      >
                        Equipada
                      </button>
                    )}

                    {tag.status === "owned" && tag.id !== equipped && (
                      <button
                        type="button"
                        className={s.btnEquip}
                        onClick={() => setEquipped(tag.id)}
                      >
                        Equipar
                      </button>
                    )}

                    {tag.status === "locked" && (
                      <Link
                        to="/loja/tags"
                        className={`${s.btnEquip} ${s.btnEquipLink}`}
                      >
                        Comprar
                      </Link>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className={s.subSection}>
            <Link to="/loja/tags" className={`${s.btnEquip} ${s.btnEquipFull}`}>
              Ver todas as tags na Loja →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
