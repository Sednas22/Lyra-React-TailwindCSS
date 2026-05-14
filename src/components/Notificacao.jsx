import { useState } from "react";
import indexStyles from "../styles/index.module.css";
import s from "../styles/avatar.module.css";

const svg = {
  notificacao: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>),
}

function Notificacao(){
    const [notifOpen, setNotifOpen] = useState(false);
    return(
        <div>
        <button className={indexStyles.btnIcon} type="button" aria-label="Ver notificações" onClick={() => setNotifOpen(true)}>
            {svg.notificacao}
        </button>
        {notifOpen && (
        <div className={s.modalOverlay} role="dialog" aria-modal="true" aria-label="Notificações" onClick={() => setNotifOpen(false)}>
          <div className={s.modalSheet} onClick={(e) => e.stopPropagation()}>
            <div className={s.modalHeader}>
              <h2>Notificações</h2>
              <button className={s.modalClose} type="button" aria-label="Fechar" onClick={() => setNotifOpen(false)}>✕</button>
            </div>
            <p className={s.modalEmpty}>Nenhuma notificação no momento.</p>
          </div>
        </div>
      )}
        </div>
        
    );
}

export default Notificacao;