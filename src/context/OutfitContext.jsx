import { createContext, useContext, useState, useCallback } from "react";

function load(key, fb) {
  try { const r = localStorage.getItem(key); return r !== null ? JSON.parse(r) : fb; }
  catch { return fb; }
}
function save(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} }


export const TAG_BONUS = { common:1.10, rare:1.25, epic:1.50, legendary:2.00 };

export const TAGS_INFO = {
  guardiao:    { rarityKey:"common",    bonus:TAG_BONUS.common    },
  maratonista: { rarityKey:"rare",      bonus:TAG_BONUS.rare      },
  mestre:      { rarityKey:"epic",      bonus:TAG_BONUS.epic      },
  arquiteto:   { rarityKey:"epic",      bonus:TAG_BONUS.epic      },
  navegador:   { rarityKey:"legendary", bonus:TAG_BONUS.legendary },
};



export const SKINS_COMPOSTAS = {
  maratonista: {
    nome: "Maratonista",
    pecas: [
      { id:"aces_testeira", nome:"Testeira",   img:"testeira.png"   },
      { id:"bau_faixaroxa", nome:"Faixa Roxa", img:"Faixa-roxa.png" },
      { id:"roupa_regata",  nome:"Regata",     img:"regata.png"     },
      { id:"aces_garrafa",  nome:"Garrafa",    img:"garrafa.png"    },
      { id:"roupa_tenis",   nome:"Tênis",      img:"tenis.png"      },
    ],
  },
  casa: {
    nome: "Ficar em Casa",
    pecas: [
      { id:"roupa_camisa",  nome:"Camisa",   img:"camisa.png"  },
      { id:"roupa_shorts",  nome:"Shorts",   img:"shorts.png"  },
      { id:"roupa_chinelo", nome:"Chinelo",  img:"chinelo.png" },
    ],
  },
  formal: {
    nome: "Formal",
    pecas: [
      { id:"roupa_social",  nome:"Social",  img:"social.png"  },
      { id:"aces_gravata",  nome:"Gravata", img:"gravata.png" },
      { id:"roupa_paleto",  nome:"Paletó",  img:"paleto.png"  },
      { id:"roupa_calca",   nome:"Calça",   img:"calca.png"   },
      { id:"roupa_sapato",  nome:"Sapato",  img:"sapato.png"  },
      { id:"aces_relogio",  nome:"Relógio", img:"relogio.png" },
    ],
  },
  inverno: {
    nome: "Inverno",
    pecas: [
      { id:"aces_touca",     nome:"Touca",      img:"touca.png"     },
      { id:"roupa_casaco",   nome:"Casaco",     img:"casaco.png"    },
      { id:"aces_cachecol",  nome:"Cachecol",   img:"cachecol.png"  },
      { id:"aces_luva",      nome:"Luva",       img:"luva.png"      },
      { id:"roupa_tenisfrio",nome:"Tênis Frio", img:"tenis-frio.png"},
    ],
  },
  praia: {
    nome: "Praia",
    pecas: [
      { id:"aces_oculos",   nome:"Óculos",   img:"oculos.png"  },
      { id:"aces_refresco", nome:"Refresco", img:"refresco.png"},
      { id:"aces_colar",    nome:"Colar",    img:"colar.png"   },
      { id:"roupa_calcao",  nome:"Calção",   img:"calcao.png"  },
    ],
  },
  pijama: {
    nome: "Pijama",
    pecas: [
      { id:"aces_gorro",  nome:"Gorro",  img:"gorro.png"  },
      { id:"roupa_pijama",nome:"Pijama", img:"pijama.png" },
    ],
  },
};


export const SKINS_PERSONAGEM = [
  { id:"neymar",     nome:"Neymar Jr.",   itemId:"skin_neymar"      },
  { id:"homemaranha",nome:"Homem-Aranha", itemId:"skin_homemaranha" },
  { id:"cowboy",     nome:"Cowboy",       itemId:"skin_cowboy"      },
  { id:"robo",       nome:"Robô",         itemId:"skin_robo"        },
  { id:"militar",    nome:"Militar",      itemId:"skin_militar"     },
  { id:"caipira",    nome:"Caipira",      itemId:"skin_caipira"     },
  { id:"gaucho",     nome:"Gaúcho",       itemId:"skin_gaucho"      },
  { id:"chef",       nome:"Chef",         itemId:"skin_chef"        },
];


const DEFAULT_OUTFIT = {
  skin:          null,      
  personalidade: "padrao",  
  tag:           null,      
};



export function getBuddyImageName(outfit) {
  return outfit.skin ? `buddy_${outfit.skin}` : "buddy";
}

const OutfitContext = createContext(null);

export function OutfitProvider({ children }) {
  const [outfit, setOutfit] = useState(() => load("lyra_outfit", DEFAULT_OUTFIT));

  const equipItem = useCallback((slot, value) => {
    setOutfit(prev => { const n = { ...prev, [slot]: value }; save("lyra_outfit", n); return n; });
  }, []);

  const equipSkin = useCallback((skinId) => {
    setOutfit(prev => {
      const n = { ...prev, skin: skinId };
      save("lyra_outfit", n);
      return n;
    });
  }, []);

  const unequipSkin = useCallback(() => {
    setOutfit(prev => { const n = { ...prev, skin: null }; save("lyra_outfit", n); return n; });
  }, []);

  const getLyriumBonus = useCallback(() => {
    if (!outfit.tag) return 1;
    return TAGS_INFO[outfit.tag]?.bonus ?? 1;
  }, [outfit.tag]);

  
  const isSkinCompostaUnlocked = useCallback((skinId, hasBought) => {
    const skin = SKINS_COMPOSTAS[skinId];
    if (!skin) return false;
    return skin.pecas.every(p => hasBought(p.id));
  }, []);

  const buddyImageName = getBuddyImageName(outfit);

  return (
    <OutfitContext.Provider value={{
      outfit, equipItem, equipSkin, unequipSkin,
      buddyImageName, getLyriumBonus, isSkinCompostaUnlocked,
    }}>
      {children}
    </OutfitContext.Provider>
  );
}

export function useOutfit() {
  const ctx = useContext(OutfitContext);
  if (!ctx) throw new Error("useOutfit deve estar dentro de OutfitProvider");
  return ctx;
}
