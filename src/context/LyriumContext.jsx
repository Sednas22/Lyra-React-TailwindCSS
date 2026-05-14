import { createContext, useContext, useState, useCallback } from "react";

const LS_POINTS   = "lyrium_points";
const LS_ITEMS    = "lyrium_items"; 
const LS_CHESTS   = "lyrium_chests";  
const LS_GOALS    = "lyrium_goals"; 

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw !== null ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
function save(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

const BAU_PRIZE = {
  image: null, 
  name: "Faixa Roxa",
  description: "Exclusiva do Baú! Equipe no seu avatar.",
};

const BAU_PRICE = 400;

const LyriumContext = createContext(null);

export function LyriumProvider({ children }) {
  const [points,    setPointsState]  = useState(() => load(LS_POINTS,  0));
  const [boughtItems, setBoughtItems] = useState(() => load(LS_ITEMS,  {}));
  const [claimedChests, setClaimedChests] = useState(() => load(LS_CHESTS, {}));
  const [claimedGoals, setClaimedGoals]   = useState(() => load(LS_GOALS,  {}));

  const addPoints = useCallback((amount) => {
    setPointsState(prev => {
      const next = prev + amount;
      save(LS_POINTS, next);
      return next;
    });
  }, []);

  const spendPoints = useCallback((amount) => {
    setPointsState(prev => {
      const next = prev - amount;
      save(LS_POINTS, next);
      return next;
    });
  }, []);

  const buyItem = useCallback((itemId) => {
    setBoughtItems(prev => {
      const next = { ...prev, [itemId]: true };
      save(LS_ITEMS, next);
      return next;
    });
  }, []);

  const hasBought = useCallback((itemId) => !!boughtItems[itemId], [boughtItems]);

  const claimShopChest = useCallback(() => {
    setBoughtItems(prev => {
      const next = { ...prev, "shop_bau": true };
      save(LS_ITEMS, next);
      return next;
    });
  }, []);

  const hasShopChest = !!boughtItems["shop_bau"];

  const claimAvatarChest = useCallback((chestId) => {
    setClaimedChests(prev => {
      const next = { ...prev, [chestId]: true };
      save(LS_CHESTS, next);
      return next;
    });
  }, []);

  const hasAvatarChest = useCallback((chestId) => !!claimedChests[chestId], [claimedChests]);

  const claimGoal = useCallback((goalId, amount) => {
    setClaimedGoals(prev => {
      const next = { ...prev, [goalId]: true };
      save(LS_GOALS, next);
      return next;
    });
    addPoints(amount);
  }, [addPoints]);

  const hasGoal = useCallback((goalId) => !!claimedGoals[goalId], [claimedGoals]);

  return (
    <LyriumContext.Provider value={{
      points,
      addPoints,
      spendPoints,
      buyItem,
      hasBought,
      claimShopChest,
      hasShopChest,
      BAU_PRIZE,
      BAU_PRICE,
      claimAvatarChest,
      hasAvatarChest,
      claimGoal,
      hasGoal,
    }}>
      {children}
    </LyriumContext.Provider>
  );
}

export function useLyrium() {
  const ctx = useContext(LyriumContext);
  if (!ctx) throw new Error("useLyrium deve estar dentro de LyriumProvider");
  return ctx;
}
