import { createContext, useContext, useState, useCallback } from "react";

const LS_POINTS   = "lyrium_points";
const LS_ITEMS    = "lyrium_items";
const LS_CHESTS   = "lyrium_chests";
const LS_SHOP_BAU = "lyrium_shop_bau";
const LS_GOALS    = "lyrium_goals";
const LS_TROFEUS  = "lyrium_trofeus";
const LS_LAST_BUY = "lyrium_last_buy";

function load(key, fb) {
  try { const r = localStorage.getItem(key); return r !== null ? JSON.parse(r) : fb; }
  catch { return fb; }
}
function save(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} }
function todayStr() { return new Date().toISOString().slice(0, 10); }

const SHOP_BAU_PRIZES = ["bau_faixaroxa", "skin_gaucho", "skin_militar"];
const BAU_PRICE = 400;

const CHESTS_CONFIG = [
  { id:"avatar_bau_1", prizePoints:100, label:"Baú 1" },
  { id:"avatar_bau_2", prizePoints:150, label:"Baú 2" },
  { id:"avatar_bau_3", prizePoints:200, label:"Baú 3" },
  { id:"avatar_bau_4", prizePoints: 75, label:"Baú 4" },
];

const LyriumContext = createContext(null);

export function LyriumProvider({ children }) {
  const [points,        setPointsState]   = useState(() => load(LS_POINTS,   0));
  const [boughtItems,   setBoughtItems]   = useState(() => load(LS_ITEMS,    {}));
  const [claimedChests, setClaimedChests] = useState(() => load(LS_CHESTS,   {}));
  const [shopBau,       setShopBau]       = useState(() => load(LS_SHOP_BAU, null));
  const [claimedGoals,  setClaimedGoals]  = useState(() => load(LS_GOALS,    {}));
  const [trofeus,       setTrofeusState]  = useState(() => load(LS_TROFEUS,  0));
  const [lastBuyTs,     setLastBuyTs]     = useState(() => load(LS_LAST_BUY, null));

  const addPoints = useCallback((amount) => {
    setPointsState(prev => { const n = Math.round(prev + amount); save(LS_POINTS, n); return n; });
  }, []);

  const spendPoints = useCallback((amount) => {
    setPointsState(prev => { const n = Math.max(0, prev - amount); save(LS_POINTS, n); return n; });
  }, []);

  const addTrofeu = useCallback(() => {
    setTrofeusState(prev => { const n = prev + 1; save(LS_TROFEUS, n); return n; });
  }, []);

  
  const buyItem = useCallback((itemId) => {
    const ts = Date.now();
    setBoughtItems(prev => { const n = { ...prev, [itemId]: true }; save(LS_ITEMS, n); return n; });
    save(LS_LAST_BUY, ts);
    setLastBuyTs(ts);
    addTrofeu(); 
  }, [addTrofeu]);

  const hasBought = useCallback((itemId) => !!boughtItems[itemId], [boughtItems]);

  
  const hasShopChest  = shopBau?.date === todayStr();
  const lastShopPrize = shopBau?.prize ?? null;

  const claimShopChest = useCallback(() => {
    const prize = SHOP_BAU_PRIZES[Math.floor(Math.random() * SHOP_BAU_PRIZES.length)];
    const entry = { date: todayStr(), prize };
    save(LS_SHOP_BAU, entry);
    setShopBau(entry);
    setBoughtItems(prev => { const n = { ...prev, [prize]: true }; save(LS_ITEMS, n); return n; });
    addTrofeu(); 
    return prize;
  }, [addTrofeu]);

  
  const hasAvatarChest = useCallback((chestId) =>
    claimedChests[chestId] === todayStr(), [claimedChests]);

  const claimAvatarChest = useCallback((chestId, basePoints, lyriumBonus = 1) => {
    setClaimedChests(prev => { const n = { ...prev, [chestId]: todayStr() }; save(LS_CHESTS, n); return n; });
    const total = Math.round(basePoints * lyriumBonus);
    addPoints(total);
    addTrofeu(); 
    return total;
  }, [addPoints, addTrofeu]);

  
  const claimGoal = useCallback((goalId, amount) => {
    setClaimedGoals(prev => { const n = { ...prev, [goalId]: todayStr() }; save(LS_GOALS, n); return n; });
    addPoints(amount);
    addTrofeu(); 
  }, [addPoints, addTrofeu]);

  const hasGoal = useCallback((goalId) =>
    claimedGoals[goalId] === todayStr(), [claimedGoals]);

  return (
    <LyriumContext.Provider value={{
      points, addPoints, spendPoints,
      buyItem, hasBought, lastBuyTs,
      claimShopChest, hasShopChest, lastShopPrize, BAU_PRICE,
      claimAvatarChest, hasAvatarChest, CHESTS_CONFIG,
      trofeus,
      claimGoal, hasGoal,
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