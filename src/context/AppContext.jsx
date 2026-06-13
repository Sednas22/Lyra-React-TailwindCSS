import { createContext, useContext, useState, useCallback } from "react";


function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw !== null ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}
function save(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}



function generateHealthData(appId) {
  const seeds = {
    google_fit:     { calMult: 1.1, sleepBase: 6.5, stepsBase: 7200 },
    apple_health:   { calMult: 1.0, sleepBase: 7.2, stepsBase: 8500 },
    samsung_health: { calMult: 0.95, sleepBase: 6.8, stepsBase: 6900 },
  };
  const s = seeds[appId] || seeds.google_fit;
  
  const rand = (min, max) => Math.round(min + (max - min) * 0.6);
  return {
    
    calorias_consumidas: rand(1100, 2100),
    calorias_meta: Math.round(2000 * s.calMult),
    
    sono_horas: parseFloat((s.sleepBase + (Math.random() * 1.5 - 0.75)).toFixed(1)),
    sono_meta: 8,
    sono_qualidade: ["Ruim", "Regular", "Boa", "Ótima"][rand(0, 3)],
    
    passos: Math.round(s.stepsBase * (0.8 + Math.random() * 0.4)),
    passos_meta: 10000,
    distancia_km: parseFloat((s.stepsBase * 0.0008).toFixed(2)),
    
    calorias_gastas: rand(180, 500),
    calorias_exercicio_meta: 350,
    minutos_exercicio: rand(20, 90),
    
    agua_ml: rand(1200, 2800),
    agua_meta: 2500,
    
    semana: Array.from({ length: 7 }, (_, i) => ({
      dia: ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"][(new Date().getDay() - 6 + i + 7) % 7],
      passos: Math.round(s.stepsBase * (0.5 + Math.random() * 0.8)),
      sono: parseFloat((s.sleepBase + (Math.random() * 2 - 1)).toFixed(1)),
      calorias: rand(1200, 2200),
    })),
  };
}


const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [userName,   setUserNameState]   = useState(() => load("lyra_user_name", ""));
  const [syncApp,    setSyncAppState]    = useState(() => load("lyra_sync_app",  ""));
  const [healthData, setHealthDataState] = useState(() => load("lyra_health",   null));
  
  const [goalPrefs, setGoalPrefsState] = useState(() => load("lyra_goal_prefs", {
    alimentacao: { active: true,  nivel: "moderado" },
    sono:        { active: true,  nivel: "moderado" },
    passos:      { active: true,  nivel: "moderado" },
    exercicio:   { active: false, nivel: "leve"     },
    hidratacao:  { active: false, nivel: "leve"     },
  }));

  const setUserName = useCallback((name) => {
    save("lyra_user_name", name);
    setUserNameState(name);
  }, []);

  const setSyncApp = useCallback((appId) => {
    const data = generateHealthData(appId);
    save("lyra_sync_app",  appId);
    save("lyra_health",    data);
    setSyncAppState(appId);
    setHealthDataState(data);
  }, []);

  const setGoalPrefs = useCallback((prefs) => {
    save("lyra_goal_prefs", prefs);
    setGoalPrefsState(prefs);
  }, []);

  
  const getGoalProgress = useCallback((goalId) => {
    if (!healthData) return { valor: 0, meta: 100, pct: 0 };
    const nivelMult = { leve: 0.7, moderado: 1.0, intenso: 1.3 };
    const n = goalPrefs[goalId]?.nivel || "moderado";
    const m = nivelMult[n];

    const map = {
      alimentacao: {
        valor: healthData.calorias_consumidas,
        meta: Math.round(healthData.calorias_meta * m),
        unidade: "kcal",
        invertido: true, 
      },
      sono: {
        valor: healthData.sono_horas,
        meta: parseFloat((healthData.sono_meta * (m < 1 ? 0.85 : m > 1 ? 1.1 : 1)).toFixed(1)),
        unidade: "h",
      },
      passos: {
        valor: healthData.passos,
        meta: Math.round(healthData.passos_meta * m),
        unidade: "passos",
      },
      exercicio: {
        valor: healthData.calorias_gastas,
        meta: Math.round(healthData.calorias_exercicio_meta * m),
        unidade: "cal",
      },
      hidratacao: {
        valor: healthData.agua_ml,
        meta: Math.round(healthData.agua_meta * m),
        unidade: "ml",
      },
    };

    const g = map[goalId];
    if (!g) return { valor: 0, meta: 100, pct: 0 };
    const pct = Math.min(100, Math.round((g.valor / g.meta) * 100));
    return { ...g, pct, cumprida: pct >= 100 };
  }, [healthData, goalPrefs]);

  return (
    <AppContext.Provider value={{
      userName, setUserName,
      syncApp,  setSyncApp,
      healthData,
      goalPrefs, setGoalPrefs,
      getGoalProgress,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp deve estar dentro de AppProvider");
  return ctx;
}
