import { useState } from 'react';
import { getBuddyImg }         from "../../utils/buddyImages";
import VestiarioRoupas         from './vestiario/VestiarioRoupas';
import VestiarioPersonalidades from './vestiario/VestiarioPersonalidades';
import VestiarioTags           from './vestiario/VestiarioTags';
import { useOutfit }           from '../../context/OutfitContext';
import s from '../../styles/VestiarioTab.module.css';

const IconVestuario     = (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M8 4l1.8 2h4.4L16 4l3 2.2-1.5 4.3-1.5-.7V20H8V9.8l-1.5.7L5 6.2 8 4z" /></svg>);
const IconPersonalidades= (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></svg>);
const IconTags          = (<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10.6 3H5a2 2 0 0 0-2 2v5.6a2 2 0 0 0 .6 1.4l8.4 8.4a2 2 0 0 0 2.8 0l6.2-6.2a2 2 0 0 0 0-2.8L12 3.6A2 2 0 0 0 10.6 3zm-3.1 5A1.5 1.5 0 1 1 9 6.5 1.5 1.5 0 0 1 7.5 8z" /></svg>);

const CATEGORIES = [
  { id:'roupas',         label:'Vestuário',      icon:IconVestuario,      card:s.wardrobeCardGreen },
  { id:'personalidades', label:'Personalidades',  icon:IconPersonalidades,  card:s.wardrobeCardLime  },
  { id:'tags',           label:'Tags',            icon:IconTags,            card:s.wardrobeCardGreen },
];

function VestiarioTab() {
  const [subPage, setSubPage] = useState(null);
  const { outfit, buddyImageName } = useOutfit();

  if (subPage === 'roupas')         return <VestiarioRoupas         onBack={() => setSubPage(null)} onNavigate={setSubPage} />;
  if (subPage === 'personalidades') return <VestiarioPersonalidades onBack={() => setSubPage(null)} onNavigate={setSubPage} />;
  if (subPage === 'tags')           return <VestiarioTags           onBack={() => setSubPage(null)} onNavigate={setSubPage} />;

  const skinLabel = outfit.skin ?? "padrão";

  return (
    <>
      <section className={s.vestiarioHeroSection}>
        <div className={s.vestiarioAvatarStage}>
          <figure className={s.avatarFigure}>
            <div className={s.avatarCharacter}>
              <img src={getBuddyImg(buddyImageName)} alt="Avatar no vestiário" />
            </div>
          </figure>
          <div className={s.avatarShadow} />
        </div>
        <p style={{ textAlign:"center", fontSize:".75rem", color:"var(--text-muted,#8a9bb5)", marginTop:".3rem" }}>
          Skin ativa: <strong>{skinLabel}</strong>
          {outfit.tag && ` • Tag: ${outfit.tag}`}
        </p>
      </section>

      <section className={s.wardrobeSection}>
        <div className={s.wardrobeGrid}>
          {CATEGORIES.map(cat => (
            <article key={cat.id} className={`${s.wardrobeCard} ${cat.card}`}>
              <button type="button" className={s.wardrobeLink} onClick={() => setSubPage(cat.id)}>
                <div className={s.wardrobeIcon}>{cat.icon}</div>
                <div className={s.wardrobeContent}>
                  <h3>{cat.label}</h3>
                  <span className={s.wardrobeArrow}>→</span>
                </div>
              </button>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export default VestiarioTab;
