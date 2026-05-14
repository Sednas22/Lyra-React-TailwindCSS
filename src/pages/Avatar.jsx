import { useState } from "react";
import Sidebar from "../components/Sidebar";
import BottomNav from "../components/BottomNav";
import indexStyles from "../styles/index.module.css";
import s from "../styles/avatar.module.css";
import AvatarTab from '../components/avatar/AvatarTab';
import VestiarioTab from '../components/avatar/VestiarioTab';
import ObjetivosTab from '../components/avatar/ObjetivosTab';
import ComunidadeTab from '../components/avatar/ComunidadeTab';
import { useLyrium } from "../context/LyriumContext";
import Notificacao from "../components/Notificacao";

const svg = {
  notificacao: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>),
  relogio: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>),
  lyrium: (<svg width="16" height="16" viewBox="0 0 24 24" fill="#ffd700"><circle cx="12" cy="12" r="10" /><text x="12" y="15" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">◎</text></svg>),
}

const TABS = ["Avatar", "Vestiário", "Objetivos", "Comunidade"];

function Avatar() {
  const [activeTab, setActiveTab] = useState("Avatar");
  const { points } = useLyrium();
  const userName = "Nome";

  return (
    <div className={indexStyles.app}>
      <Sidebar />

      <div className={indexStyles.desktopHeader}>
        <h1>{activeTab}</h1>
        <div className={indexStyles.desktopHeaderRight}>
          <div className={indexStyles.desktopUserPill}>
            <span>{userName}</span>
            {svg.relogio}
          </div>
          <Notificacao/>
        </div>
      </div>

      <header className={indexStyles.appHeader}>
        <h1>Avatar</h1>
        <div className={indexStyles.headerActions}>
          <div className={indexStyles.badgePoints} aria-label={`${points} pontos acumulados`}>
            <span>{points}</span>
            {svg.lyrium}
          </div>
          <Notificacao/>
        </div>
      </header>

      <div className={indexStyles.scrollContent}>
        <main>
          <section className={s.avatarTabsSection} aria-labelledby="avatar-secoes-titulo">
            <h2 id="avatar-secoes-titulo" className={indexStyles.srOnly}>Seções do avatar</h2>
            <nav className={s.avatarTabs} aria-label="Navegação interna do avatar">
              {TABS.map((tab) => (
                <button
                  key={tab} type="button"
                  className={`${s.tabPill}${activeTab === tab ? ` ${s.active}` : ""}`}
                  aria-current={activeTab === tab ? "page" : undefined}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </section>

          {activeTab === 'Avatar'     && <AvatarTab     styles={s} indexStyles={indexStyles} />}
          {activeTab === 'Vestiário'  && <VestiarioTab  styles={s} indexStyles={indexStyles} />}
          {activeTab === 'Objetivos'  && <ObjetivosTab  styles={s} />}
          {activeTab === 'Comunidade' && <ComunidadeTab styles={s} />}
        </main>
      </div>

      <BottomNav />
    </div>
  );
}

export default Avatar;
