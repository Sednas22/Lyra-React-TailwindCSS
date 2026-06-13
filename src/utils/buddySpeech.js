const FALAS = {
  padrao: {
    saudacao:       ["E aí, {nome}! Tô de olho nos seus dados!", "Bom dia, {nome}! Bora arrasar hoje?", "Oi {nome}! Tô aqui pra te ajudar a bombar!"],
    meta_cumprida:  ["ISSO! {nome} tá brabo demais hoje! 🔥", "Missão cumprida! Você tá no caminho certo, fi!", "Chapéu! Meta batida! Continue assim!"],
    meta_quase:     ["Quase lá, {nome}! Não para agora!", "Tá faltando pouco! Vai com tudo!", "Só um pouquinho mais, você consegue!"],
    meta_longe:     ["Bora {nome}, ainda dá tempo de virar o jogo!", "Não desiste não! O dia ainda não acabou!", "Vai lá, {nome}! Eu acredito em você!"],
    compra:         ["Boa compra, {nome}! Ficou estiloso!", "Olha o {nome} se arrumando! 😎", "Me veste bem, né? Valeu a pena!"],
    streak:         ["Sequência de {streak} dias! Você tá on fire! 🔥", "{streak} dias seguidos! Isso é dedicação de verdade!", "Olha o {nome}! {streak} dias sem parar!"],
    sono_ruim:      ["Ei, dorme mais não, fi! Isso não tá legal...", "{nome}, seu sono tá horrível! Bora dormir mais cedo?", "Dormiu quanto? Precisa melhorar isso!"],
    sem_agua:       ["Ei {nome}, bebeu água hoje? Tô vendo que não!", "Hidratação em dia é saúde, fi! Bebe água!", "A garrafa tá aqui e você não usa... Vai beber água!"],
    incentivo:      ["Confia no processo, {nome}!", "Um passo de cada vez! Você chega lá!", "Hoje é um bom dia pra evoluir!"],
    puxao_de_orelha:["Ei, {nome}! Você prometeu mais que isso...", "Ô preguiçoso, bora agir!", "Tô te de olho, {nome}! Vai lá!"],
  },

  cowboy: {
    saudacao:       ["Yee-haw, {nome}! O xerife da saúde tá de volta!", "Salve, parceiro {nome}! O oeste te chama!", "Howdy, {nome}! Saddle up e bora!"],
    meta_cumprida:  ["Missão cumprida, xerife {nome}! 🤠", "Yee-haw! Esse bandido chamado preguiça foi derrotado!", "O lasso da vitória é seu, parceiro!"],
    meta_quase:     ["O ouro tá quase ali, {nome}! Não para!", "Arreia o cavalo e vai com tudo, pardner!", "Falta pouco pra cruzar o rio!"],
    meta_longe:     ["O horizonte ainda tá longe, {nome}. Cavalga mais!", "Ei cowboy, o rancho não vai se cuidar sozinho!", "Bota a bota no estribo e vai!"],
    compra:         ["Boa compra, xerife! Agora sim você tá caracterizado! 🤠", "Tô impressionado com o estilo do {nome}!", "Compra certeira! O oeste aprova!"],
    streak:         ["{streak} dias de jornada, {nome}! Você é imparável!", "O sheriff mais consistente do oeste — {streak} dias!", "Nenhum bandido para esse cowboy por {streak} dias!"],
    sono_ruim:      ["Cowboy cansado não pega bandido, {nome}. Dorme mais!", "O rancho te espera descansado, não exausto!", "Até o cavalo precisa descansar, {nome}!"],
    sem_agua:       ["O deserto resseca, mas aqui tem água, {nome}! Bebe!", "Um cowboy sem água é homem morto, fi!", "Pelo cangote, bebe água {nome}!"],
    incentivo:      ["O horizonte é pra quem não desiste, {nome}!", "O vento do oeste sopra a seu favor hoje!", "Sela o cavalo e vai, o dia é longo!"],
    puxao_de_orelha:["Ei cowboy, o gado não se cuida sozinho!", "No oeste não tem espaço pra preguiçoso, {nome}!", "O xerife não aceita desleixo!"],
  },

  robo: {
    saudacao:       ["SISTEMA ATIVO. Usuário {nome} detectado. Pronto para otimizar!", "BOOT COMPLETO. Olá, {nome}. Iniciando monitoramento.", "CONEXÃO ESTABELECIDA. {nome}, todos os sensores online!"],
    meta_cumprida:  ["OBJETIVO ALCANÇADO. Eficiência: 100%. Parabéns, {nome}!", "MISSÃO COMPLETA. Processando conquista de {nome}...", "ANÁLISE: meta atingida. {nome} perfomance = EXCELENTE!"],
    meta_quase:     ["ALERTA: 85% do objetivo atingido. Continuar operação!", "DADOS INDICAM: {nome} quase no target. Não interrompa!", "PROGRESSO CALCULADO: falta pouco para otimização total!"],
    meta_longe:     ["AVISO: métricas abaixo do esperado. Recomendo ação imediata.", "ERRO 404: motivação não encontrada em {nome}. Recalculando...", "SISTEMA REQUER: mais esforço de {nome} para atingir metas!"],
    compra:         ["TRANSAÇÃO PROCESSADA. Item adquirido. Banco de dados atualizado!", "COMPRA REGISTRADA. {nome} otimizou o visual!", "NOVO ITEM CATALOGADO. Status: equipável!"],
    streak:         ["SEQUÊNCIA DE {streak} DIAS DETECTADA. Probabilidade de sucesso: alta!", "STREAK: {streak}. Algoritmo de {nome} em modo TURBO!", "{streak} dias de dados consistentes. {nome} = confiável!"],
    sono_ruim:      ["AVISO CRÍTICO: sono de {nome} abaixo do mínimo. Risco de falha detectado!", "ALERTA: bateria humana não recarregada corretamente. Dormir mais!", "ANÁLISE: sono insuficiente prejudica performance. Recalibrar rotina!"],
    sem_agua:       ["SENSOR DE HIDRATAÇÃO: nível crítico. Consumir H2O imediatamente!", "ALERTA: {nome} não hidratado. Sistema pode superaquecer!", "DADOS: 2,5L de água necessários. {nome} está em débito!"],
    incentivo:      ["PROCESSANDO POTENCIAL DE {nome}... resultado = ilimitado!", "ALGORITMO INDICA: hoje é um bom dia para evoluir!", "CÁLCULO CONCLUÍDO: cada passo conta para o resultado final!"],
    puxao_de_orelha:["ERRO DETECTADO: {nome} não seguiu protocolo de metas!", "AVISO DO SISTEMA: desempenho abaixo do esperado. Corrigir!", "FALHA: {nome} precisa atualizar rotina. Intervenção necessária!"],
  },

  militar: {
    saudacao:       ["Atenção, soldado {nome}! Em posição para o dia!", "Bom dia, recruta {nome}! O regime começa agora!", "De pé, {nome}! A missão de hoje não espera!"],
    meta_cumprida:  ["Missão concluída, soldado {nome}! Honra e glória!", "Excelente execução! O general está satisfeito!", "Isso é o que eu chamo de disciplina, {nome}!"],
    meta_quase:     ["Quase lá, soldado! Não recue agora!", "O inimigo está fraco, {nome}! Avança!", "A linha de chegada está próxima! AVANÇA!"],
    meta_longe:     ["Soldado {nome}, o campo de batalha não te espera!", "ATENÇÃO RECRUTA! Isso está aquém do esperado!", "Sem disciplina não há vitória, {nome}!"],
    compra:         ["Novo equipamento adquirido! O arsenal de {nome} cresceu!", "Compra aprovada pelo comando, soldado!", "Equipamento em ordem! Continue assim, recruta!"],
    streak:         ["{streak} dias de missão contínua! Você é um veterano, {nome}!", "Sequência de {streak}! Dignidade de soldado de elite!", "{streak} dias no campo! O general reconhece sua dedicação!"],
    sono_ruim:      ["Soldado sem descanso é soldado derrotado, {nome}!", "ORDEM: dormir mais! O exército precisa de você descansado!", "Repouso é parte da estratégia, recruta!"],
    sem_agua:       ["Cantil vazio é risco no campo, {nome}! HIDRATE-SE!", "Ordem direta: beba água, soldado! Agora!", "Um guerreiro desidratado é um guerreiro inútil!"],
    incentivo:      ["A disciplina de hoje é a vitória de amanhã, {nome}!", "A missão não é fácil, mas você foi treinado para isso!", "Cada passo é um avanço na batalha, recruta!"],
    puxao_de_orelha:["RECRUTA {nome}! Isso é inadmissível! De volta ao trabalho!", "Desempenho insatisfatório, soldado. Corrija agora!", "O exército não aceita preguiça, {nome}!"],
  },

  caipira: {
    saudacao:       ["Uai sô, {nome}! Bão demais ter você por aqui!", "Ô {nome}, que saudade! Bora fazer tudo certinho hoje, hein!", "Olha o {nome}! Tô mais feliz que pinto no milharal!"],
    meta_cumprida:  ["Ave Maria, {nome}! Que orgulho de você, sô!", "Uai, conseguiu! Mais feliz que passarinho na goiabeira!", "Isso sô! O patrão lá de cima tá satisfeito com o {nome}!"],
    meta_quase:     ["Uai, tá quase! Vai lá {nome}, falta um tantinho só!", "Só um pouquim mais, sô! Você sabe que consegue!", "Tá chegando lá! Não para não, que seria uma injustiça!"],
    meta_longe:     ["Uai, {nome}... tá difícil hein sô. Mas não desiste não!", "Ô preguicinho, bora que a lavoura não espera!", "Que trem é esse, {nome}? Vai lá mexer os paio!"],
    compra:         ["Uai, que luxo esse {nome}! Comprando trem bonito!", "Ave Maria, ficou bonito demais, sô!", "Isso sô! Dinheiro bem gastado!"],
    streak:         ["{streak} dias, meu Deus do céu! {nome} é brabo demais!", "Ave Maria, {streak} dias seguidos! Que persistência, sô!", "Olha o {nome}! {streak} dias! Mais caprichoso que bordado de festa!"],
    sono_ruim:      ["Uai {nome}, dormiu quanto? Isso não tá certo não, sô!", "Ave Maria, que sono ruim! Bora dormir mais, meu filho!", "Galinha não dorme assim, {nome}! Precisa descansar!"],
    sem_agua:       ["Uai sô, nem água {nome} tá bebendo? Isso é pecado!", "Tem muita água no poço e você não bebe, hein, {nome}?", "Bebe água, sô! Caipira sem água murcha feito planta no sol!"],
    incentivo:      ["Confio em você mais que na previsão do tempo, {nome}!", "Devagarzinho vai longe, sô! Bora!", "O roçado de saúde de {nome} vai florescer, sim sô!"],
    puxao_de_orelha:["Uai {nome}, que moleza é essa, sô! Vai trabalhar!", "Ave Maria, isso não tá certo não! Mete a mão na massa!", "Tô com a vassoura na mão, hein {nome}! Bora agir!"],
  },

  gaucho: {
    saudacao:       ["Tchê, {nome}! Que barbaridade boa de te ver aqui!", "Sô guri, {nome}! O chimarrão tá quente, bora nessa!", "Barbaridade {nome}! O Pampa te chama pra evoluir hoje!"],
    meta_cumprida:  ["Barbaridade, {nome}! Isso é coisa de gaúcho de verdade!", "Tchê, arrasou! Tô mais orgulhoso que peão em rodeio!", "Que coisa boa, {nome}! Missão cumprida com honra!"],
    meta_quase:     ["Tá quase, tchê! Gaúcho não para no meio do caminho!", "Um pouquinho mais, {nome}! O mate ainda não acabou!", "Vai lá, guri! A galpão da vitória está próximo!"],
    meta_longe:     ["Tchê, {nome}! O pampa não aceita essa moleza!", "Barbaridade que situação, guri. Bora virar esse jogo!", "Gaúcho que é gaúcho não desiste, {nome}! Vai!"],
    compra:         ["Tchê, que estilo, {nome}! O pampa aprova essa compra!", "Barbaridade! Ficou lindo, guri!", "Isso é coisa de peão rico! Parabéns, {nome}!"],
    streak:         ["Barbaridade! {streak} dias, {nome}! Isso é coisa de gaúcho bravo!", "Tchê, {streak} dias de sequência! O pampa te respeita!", "{streak} dias, guri! Mais firme que cerca de arame farpado!"],
    sono_ruim:      ["Tchê {nome}, dormiu de peão? Precisa descansar mais!", "Barbaridade, que sono ruim! O chimarrão não resolve isso!", "Guri, sem sono bom não tem energia pra o campo!"],
    sem_agua:       ["Tchê, o mate não conta como água, {nome}! Bebe mais!", "Barbaridade! Desidratado no pampa? Bebe água, guri!", "{nome}, hidratação é básico! O gaucho sabe disso!"],
    incentivo:      ["O pampa é de quem não desiste, tchê!", "Cada tropeço é aprendizado, {nome}! Cavalga de novo!", "A galpão do sucesso te espera, guri!"],
    puxao_de_orelha:["Tchê, isso não é jeito de gaúcho, {nome}! Bora agir!", "Barbaridade que preguiça! O pampa cobra resultado!", "Guri, sem esforço não tem conquista! Vai trabalhar!"],
  },
};


export function getBuddySpeech(situacao, personalidade = "padrao", nome = "", streak = 0) {
  const personaFalas = FALAS[personalidade] || FALAS.padrao;
  const opcoes = personaFalas[situacao] || FALAS.padrao[situacao] || ["..."];
  const base = opcoes[Math.floor(Math.random() * opcoes.length)];
  return base
    .replace(/{nome}/g, nome || "você")
    .replace(/{streak}/g, streak);
}


export function getSituacaoAutomatica(healthData, goalPrefs, getGoalProgress, ultimaCompra, streak) {
  if (!healthData) return "saudacao";

  const hora = new Date().getHours();
  if (hora < 10) return "saudacao";

  
  const metasAtivas = Object.entries(goalPrefs)
    .filter(([, v]) => v.active)
    .map(([id]) => ({ id, prog: getGoalProgress(id) }));

  const todasCumpridas = metasAtivas.length > 0 && metasAtivas.every(m => m.prog.cumprida);
  if (todasCumpridas) return "meta_cumprida";

  const algumQuase = metasAtivas.some(m => m.prog.pct >= 75 && !m.prog.cumprida);
  if (algumQuase) return "meta_quase";

  
  if (healthData.sono_horas < 5) return "sono_ruim";
  if (healthData.agua_ml < 1000) return "sem_agua";

  
  if (ultimaCompra && Date.now() - ultimaCompra < 5 * 60 * 1000) return "compra";

  
  if (streak >= 3) return "streak";

  const algumLonge = metasAtivas.some(m => m.prog.pct < 40);
  if (algumLonge) return "puxao_de_orelha";

  return "incentivo";
}
