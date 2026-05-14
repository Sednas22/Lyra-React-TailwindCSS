const overlayStyle = {
  position: "fixed", inset: 0,
  background: "rgba(0,0,0,.55)",
  display: "flex", alignItems: "flex-end", justifyContent: "center",
  zIndex: 9999,
};

const sheetStyle = {
  background: "var(--bg-card, #1a1f2e)",
  borderRadius: "1.2rem 1.2rem 0 0",
  padding: "1.5rem",
  width: "100%",
  maxWidth: "480px",
  boxShadow: "0 -4px 32px rgba(0,0,0,.4)",
};

const headerStyle = {
  display: "flex", alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "1rem",
};

const closeBtnStyle = {
  background: "none", border: "none",
  fontSize: "1.2rem", cursor: "pointer",
  color: "var(--text-secondary, #8a9bb5)",
  lineHeight: 1, padding: "4px",
};

const bodyStyle = {
  marginBottom: "1.25rem",
  color: "var(--text-secondary, #8a9bb5)",
  lineHeight: 1.5,
  fontSize: "0.95rem",
};

const actionsStyle = {
  display: "flex", gap: ".75rem",
};

const btnPrimaryStyle = {
  flex: 1, padding: ".75rem",
  background: "var(--green-mid, #22c55e)",
  color: "#fff", border: "none",
  borderRadius: ".75rem", fontWeight: 700,
  fontSize: "1rem", cursor: "pointer",
};

const btnSecondaryStyle = {
  flex: 1, padding: ".75rem",
  background: "var(--bg-surface, #252b3b)",
  color: "var(--text-primary, #e2e8f0)",
  border: "1px solid var(--border, #2d3548)",
  borderRadius: ".75rem", fontWeight: 600,
  fontSize: "1rem", cursor: "pointer",
};

const btnOkStyle = {
  width: "100%", padding: ".75rem",
  background: "var(--green-mid, #22c55e)",
  color: "#fff", border: "none",
  borderRadius: ".75rem", fontWeight: 700,
  fontSize: "1rem", cursor: "pointer",
};

export default function LyriumModal({ type, itemName, price, onConfirm, onCancel }) {
  if (type === "confirm") {
    return (
      <div style={overlayStyle} onClick={onCancel}>
        <div style={sheetStyle} onClick={e => e.stopPropagation()}>
          <div style={headerStyle}>
            <h2 style={{ margin: 0, fontSize: "1.1rem" }}>Confirmar compra</h2>
            <button style={closeBtnStyle} onClick={onCancel}>✕</button>
          </div>
          <p style={bodyStyle}>
            Deseja comprar <strong>{itemName}</strong> por{" "}
            <strong>{price} ◎</strong>?
          </p>
          <div style={actionsStyle}>
            <button style={btnSecondaryStyle} onClick={onCancel}>Cancelar</button>
            <button style={btnPrimaryStyle}   onClick={onConfirm}>Confirmar</button>
          </div>
        </div>
      </div>
    );
  }

  if (type === "insufficient") {
    return (
      <div style={overlayStyle} onClick={onCancel}>
        <div style={sheetStyle} onClick={e => e.stopPropagation()}>
          <div style={headerStyle}>
            <h2 style={{ margin: 0, fontSize: "1.1rem" }}>Lyrium insuficiente</h2>
            <button style={closeBtnStyle} onClick={onCancel}>✕</button>
          </div>
          <p style={bodyStyle}>
            Você não tem Lyrium suficiente para comprar <strong>{itemName}</strong>.
            Continue completando metas para ganhar mais!
          </p>
          <button style={btnOkStyle} onClick={onCancel}>OK</button>
        </div>
      </div>
    );
  }

  if (type === "item") {
    return (
      <div style={overlayStyle} onClick={onCancel}>
        <div style={sheetStyle} onClick={e => e.stopPropagation()}>
          <div style={headerStyle}>
            <h2 style={{ margin: 0, fontSize: "1.1rem" }}>Item recebido!</h2>
            <button style={closeBtnStyle} onClick={onCancel}>✕</button>
          </div>
          <p style={bodyStyle}>
            Você recebeu: <strong>{itemName}</strong>
          </p>
          <button style={btnOkStyle} onClick={onCancel}>Ótimo!</button>
        </div>
      </div>
    );
  }

  if (type === "chest_confirm") {
    return (
      <div style={overlayStyle} onClick={onCancel}>
        <div style={sheetStyle} onClick={e => e.stopPropagation()}>
          <div style={headerStyle}>
            <h2 style={{ margin: 0, fontSize: "1.1rem" }}>Abrir Baú?</h2>
            <button style={closeBtnStyle} onClick={onCancel}>✕</button>
          </div>
          <p style={bodyStyle}>
            Deseja abrir o <strong>Baú</strong> por{" "}
            <strong>{price} ◎</strong>? Você receberá um item exclusivo!
          </p>
          <div style={actionsStyle}>
            <button style={btnSecondaryStyle} onClick={onCancel}>Cancelar</button>
            <button style={btnPrimaryStyle}   onClick={onConfirm}>Abrir!</button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
