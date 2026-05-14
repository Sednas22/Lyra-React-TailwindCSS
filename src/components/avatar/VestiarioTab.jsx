import { useState } from 'react'
import avatarImg from '../../assets/buddy.png'
import VestiarioRoupas from './vestiario/VestiarioRoupas'
import VestiarioAcessorios from './vestiario/VestiarioAcessorios'
import VestiarioPersonalidades from './vestiario/VestiarioPersonalidades'
import VestiarioTags from './vestiario/VestiarioTags'

import s from '../../styles/VestiarioTab.module.css'

const IconVestuario = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"
    strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 4l1.8 2h4.4L16 4l3 2.2-1.5 4.3-1.5-.7V20H8V9.8l-1.5.7L5 6.2 8 4z" />
  </svg>
)

const IconAcessorios = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"
    strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 14l4-4 5 5 7-7" />
    <path d="M15 8h5v5" />
    <path d="M3 15l4 4h10l4-4" />
  </svg>
)

const IconPersonalidades = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"
    strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18c2-4 5.5-6 9-6s7 2 9 6" />
    <circle cx="8" cy="10" r="2" />
    <circle cx="16" cy="10" r="2" />
    <path d="M10 6c.7-1.5 1.7-2 2-2s1.3.5 2 2" />
  </svg>
)

const IconTags = (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M10.6 3H5a2 2 0 0 0-2 2v5.6a2 2 0 0 0 .6 1.4l8.4 8.4a2 2 0 0 0 2.8 0l6.2-6.2a2 2 0 0 0 0-2.8L12 3.6A2 2 0 0 0 10.6 3zm-3.1 5A1.5 1.5 0 1 1 9 6.5 1.5 1.5 0 0 1 7.5 8z" />
  </svg>
)

const CATEGORIES = [
  { id: 'roupas', label: 'Vestiário', icon: IconVestuario, card: s.wardrobeCardGreen },
  { id: 'acessorios', label: 'Acessórios', icon: IconAcessorios, card: s.wardrobeCardLime },
  { id: 'personalidades', label: 'Personalidades', icon: IconPersonalidades, card: s.wardrobeCardLime },
  { id: 'tags', label: 'Tags', icon: IconTags, card: s.wardrobeCardGreen },
]


function VestiarioTab() {
  const [subPage, setSubPage] = useState(null)

  if (subPage === 'roupas') return <VestiarioRoupas onBack={() => setSubPage(null)} />
  if (subPage === 'acessorios') return <VestiarioAcessorios onBack={() => setSubPage(null)} />
  if (subPage === 'personalidades') return <VestiarioPersonalidades onBack={() => setSubPage(null)} />
  if (subPage === 'tags') return <VestiarioTags onBack={() => setSubPage(null)} />

  return (
    <>
      <section className={s.vestiarioHeroSection}>
        <h2 className="sr-only">Avatar no vestiário</h2>

        <div className={s.vestiarioAvatarStage}>
          <figure className={s.avatarFigure}>
            <div className={s.avatarCharacter}>
              <img src={avatarImg} alt="Avatar virtual no vestiário" />
            </div>
          </figure>

          <div className={s.avatarShadow} />
        </div>
      </section>

      <section className={s.wardrobeSection}>
        <h2 className="sr-only">Categorias do vestiário</h2>

        <div className={s.wardrobeGrid}>
          {CATEGORIES.map((cat) => (
            <article
              key={cat.id}
              className={`${s.wardrobeCard} ${cat.card}`}
            >
              <button
                type="button"
                className={s.wardrobeLink}
                onClick={() => setSubPage(cat.id)}
              >
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
  )
}

export default VestiarioTab