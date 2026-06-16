# Lyra - Care Plus
<p>Sprint desenvolvida para as disciplinas de <b>Front-End Design</b> e <b>Web Development</b> da FIAP 2026, como evolução do MVP entregue na sprint anterior. Projeto apresentado ao curso de Engenharia de Software. Desenvolvido por: </p>
André Rosa Ferreira Filho - RM: 567149, <br>
Cainã Sandes Batista - RM: 568571, <br>
Michel Lima Benchimol - RM: 567345, <br>
Yuri Aroste Fukamachi - RM: 567314. <hr>

<h3>Descrição do Caso:</h3>
<p>
A Lyra é um plugin gamificado para ser integrado ao ecossistema <b>Care Plus</b>, que permite ao usuário acompanhar seu progresso na saúde preventiva e personalizar um avatar chamado <b>Buddy</b> com skins, tags e personalidades desbloqueáveis por meio de uma moeda virtual chamada <b>Lyrium</b>. Nessa sprint, o foco foi consolidar o consumo de dados via <b>API local simulada em JSON</b>, expandir os sistemas de gamificação e garantir uma interface responsiva e interativa.
</p>

<h3>Estrutura do projeto:</h3>
<p>
<ul>
  <li>lyra-react (folder)</li>
  <ul>
    <b><li>index.html</b> - Arquivo de entrada da aplicação. Define o ponto de montagem do React (<code>div#root</code>) e importa o <code>main.jsx</code>;</li>
    <b><li>package.json</b> - Configuração do projeto com as dependências (React, React Router DOM, Vite) e scripts de desenvolvimento e build;</li>
    <li>README.md.</li>
    <li>src</li>
    <ul>
      <li>assets</li>
      <ul>
        <li>Imagens de itens, logos e ícones da aplicação;</li>
        <li><b>personalizacao/</b> - Pasta dedicada às imagens do Buddy. Seguem a convenção <code>buddy.png</code>, <code>buddy_neymar.png</code>, <code>buddy_maratonista.png</code> etc. Detectadas automaticamente via <code>import.meta.glob</code> sem necessidade de alterar código.</li>
      </ul>
      <li>components</li>
      <ul>
        <b><li>BottomNav.jsx</b> - Navegação inferior da aplicação, exibida em mobile. Usa <code>NavLink</code> e <code>useLocation</code> para destacar a rota ativa;</li>
        <b><li>Sidebar.jsx</b> - Navegação lateral para telas desktop com badge de pontos Lyrium;</li>
        <b><li>LyriumModal.jsx</b> - Modal reutilizável para confirmação de compra, saldo insuficiente ou item resgatado;</li>
        <b><li>Notificacao.jsx</b> - Modal de notificações reutilizado em todas as páginas internas;</li>
        <li>avatar/ - Componentes da tela de Avatar: <code>AvatarTab</code> (baús, troféus, fala do Buddy), <code>VestiarioTab</code>, <code>ObjetivosTab</code>, <code>ComunidadeTab</code> e os sub-componentes do vestiário (Roupas & Skins, Personalidades, Tags).</li>
      </ul>
      <li>context</li>
      <ul>
        <b><li>LyriumContext.jsx</b> - Context API que gerencia o estado global da moeda Lyrium: pontos, itens comprados, baús (com reset diário), troféus e objetivos. Persiste tudo no <code>localStorage</code>;</li>
        <b><li>AppContext.jsx</b> - Gerencia nome do usuário, app de saúde sincronizado, dados de saúde e preferências de metas. Consome o <code>beneficiarios.json</code> e carrega os dados do beneficiário pelo nome informado no onboarding;</li>
        <b><li>OutfitContext.jsx</b> - Gerencia a skin equipada, tag e personalidade do Buddy. Calcula o bônus de Lyrium aplicado pela tag e resolve o nome da imagem do Buddy a ser exibida.</li>
      </ul>
      <li>data</li>
      <ul>
        <b><li>beneficiarios.json</b> - API local simulada com dados de saúde dos 4 beneficiários (Cainã, André, Yuri, Michel): calorias, sono, passos, exercício, hidratação e histórico da semana. Consumido via <code>import</code> direto no <code>AppContext</code>.</li>
      </ul>
      <li>pages</li>
      <ul>
        <b><li>Home.jsx</b> - Landing page com apresentação do app e menu principal;</li>
        <b><li>Lgpd.jsx</b> - Onboarding: captura o nome do usuário e exibe os Termos de Privacidade (LGPD). O nome é usado para buscar os dados no JSON;</li>
        <b><li>Sincronizacao.jsx</b> - Seleção do app de saúde (Google Fit, Apple Health, Samsung Health);</li>
        <b><li>Resumo.jsx</b> - Dashboard principal com anéis SVG animados de sono, passos e exercício, além de cards individuais de cada métrica com dados reais;</li>
        <b><li>Alimentacao.jsx / Sono.jsx / Passos.jsx / Exercicio.jsx</b> - Subpáginas de detalhamento de cada categoria. Passos exibe gráficos de barras SVG com dados dos 7 dias da semana e linha de meta;</li>
        <b><li>Dicas.jsx</b> - Página de dicas de saúde e bem-estar;</li>
        <b><li>Avatar.jsx</b> - Tela do Buddy com abas de Avatar (baús diários, troféus, fala dinâmica), Vestiário, Objetivos e Comunidade;</li>
        <b><li>Loja.jsx</b> - Loja com seções de Roupas & Skins, Personalidades, Tags e Baú Surpresa;</li>
        <b><li>Roupas.jsx</b> - Sub-página da loja com duas abas: peças de roupa (organizadas por skin composta) e skins de personagem avulsas;</li>
        <b><li>Personalidades.jsx / Tags.jsx</b> - Sub-páginas da loja com personalidades e tags disponíveis para compra.</li>
      </ul>
      <li>styles</li>
      <ul>
        <li>Arquivos <code>.module.css</code> e <code>.css</code> globais para estilização escopada e temática da aplicação.</li>
      </ul>
      <li>utils</li>
      <ul>
        <b><li>buddyImages.js</b> - Usa <code>import.meta.glob</code> para mapear automaticamente todos os PNGs da pasta <code>personalizacao/</code>. A função <code>getBuddyImg(nome)</code> retorna a URL correta ou faz fallback para <code>buddy.png</code>;</b></li>
        <b><li>buddySpeech.js</b> - Sistema de falas dinâmicas do Buddy. Cada uma das 6 personalidades (Padrão, Cowboy, Robô, General, Caipira, Gaúcho) tem frases próprias para 10 situações diferentes (saudação, meta cumprida, sono ruim, compra, etc.).</li>
      </ul>
      <b><li>App.jsx</b> - Define todas as rotas da aplicação usando React Router DOM, envolvidas pelos três providers (<code>LyriumProvider</code>, <code>AppProvider</code>, <code>OutfitProvider</code>);</li>
      <b><li>main.jsx</b> - Entry point que monta a aplicação no DOM dentro do <code>StrictMode</code>.</li>
    </ul>
  </ul>
</ul>
</p>

<h3>Objetivo:</h3>
<p>
Evoluir o MVP React entregue na sprint anterior, incorporando os requisitos de <b>Front-End Design</b> (elementos interativos, responsividade, CSS Grid e layout estruturado) e de <b>Web Development</b> (consumo de API local em JSON, manipulação de eventos e componentes dinâmicos). A aplicação deve apresentar dados reais de saúde de forma transparente e tangível para o usuário, tornando o cuidado preventivo algo visível e recompensador no dia a dia.
</p>

<h3>Desenvolvimento:</h3>
<p>
A aplicação foi desenvolvida seguindo os requisitos das sprints de Front-End Design e Web Development, com expansão significativa da arquitetura da sprint anterior.
Foram aplicados:
</p>

<ul>
  <li><b>Consumo de API Local (JSON)</b></li>
  <ul>
    <li><code>beneficiarios.json</code> - Arquivo com dados de saúde de 4 beneficiários simulando uma API da Care Plus. Contém calorias, sono, passos, exercício, hidratação e histórico semanal de cada um;</li>
    <li>O <code>AppContext</code> importa o JSON diretamente, normaliza o nome digitado (sem distinção de acento ou maiúsculas) e carrega os dados do beneficiário correspondente. Nomes não cadastrados mantêm os dados em branco (<code>--</code>), sem gerar dados fictícios;</li>
    <li>Os dados são injetados em todas as subpáginas do Resumo (Alimentação, Sono, Passos, Exercício) e nos gráficos SVG.</li>
  </ul>

  <li><b>Elementos Interativos</b></li>
  <ul>
    <li>Baús do avatar com modal de confirmação e resultado, reset diário automático à meia-noite;</li>
    <li>Baú Surpresa da Loja com sorteio aleatório entre 3 itens exclusivos e reset diário;</li>
    <li>Sistema de metas com barra de progresso, botão de resgate de Lyrium e feedback do Buddy ao cumprir;</li>
    <li>Modal de edição de metas com seleção de categorias e nível de dificuldade (Leve, Moderado, Intenso);</li>
    <li>Vestiário com skins compostas: bolinhas de progresso por peça, desbloqueio automático ao completar o conjunto e botão de equipar condicional;</li>
    <li>Fala dinâmica do Buddy: muda de acordo com o contexto (hora do dia, metas, sono, compras) e com a personalidade equipada.</li>
  </ul>

  <li><b>Context API + localStorage</b></li>
  <ul>
    <li>Três contextos independentes e encadeados: <code>LyriumContext</code> (economia), <code>AppContext</code> (usuário e saúde) e <code>OutfitContext</code> (personalização do Buddy);</li>
    <li>Persistência automática de todos os estados no <code>localStorage</code>: pontos, itens comprados, baús abertos, outfit equipado, nome, app sincronizado e preferências de metas;</li>
    <li>Hooks customizados <code>useLyrium()</code>, <code>useApp()</code> e <code>useOutfit()</code> para consumo dos contextos em qualquer componente.</li>
  </ul>

  <li><b>Gráficos e Visualização de Dados</b></li>
  <ul>
    <li>Anéis SVG no Resumo com três círculos concêntricos representando % de sono, passos e exercício em relação à meta;</li>
    <li>Gráfico de barras SVG em Passos com dados reais dos 7 dias da semana, rótulos nos eixos e linha tracejada de meta;</li>
    <li>Segundo gráfico de barras em Passos para distância percorrida (km), calculada proporcionalmente aos passos.</li>
  </ul>

  <li><b>Gamificação</b></li>
  <ul>
    <li><b>Lyrium</b> - Moeda virtual ganha abrindo baús e cumprindo metas, gasta na loja;</li>
    <li><b>Troféus</b> - Contador acumulativo que soma +1 a cada baú aberto, meta resgatada ou compra realizada;</li>
    <li><b>Tags</b> - 5 tags de raridades diferentes (Comum, Rara, Épica, Lendária) que aplicam bônus de +10% a +100% nos baús quando equipadas;</li>
    <li><b>Skins compostas</b> - 6 skins (Maratonista, Ficar em Casa, Formal, Inverno, Praia, Pijama) desbloqueadas ao comprar todas as peças que as compõem na loja, incentivando o engajamento progressivo.</li>
  </ul>

  <li><b>Estilização e Responsividade</b></li>
  <ul>
    <li>CSS Modules (<code>.module.css</code>) para estilos escopados por componente, evitando conflitos;</li>
    <li>CSS global para páginas e temas visuais específicos;</li>
    <li>Layout responsivo adaptado para mobile e desktop com <code>BottomNav</code> e <code>Sidebar</code> condicionais;</li>
    <li>CSS Grid utilizado nos cards de status, grade do vestiário e grid de itens da loja.</li>
  </ul>

  <li><b>Conteúdo e Propósito</b></li>
  <ul>
    <li>Onboarding com captura de nome do usuário (simulando integração com a base da Care Plus) e seleção de app de saúde;</li>
    <li>Tela de LGPD com link para política de privacidade real, atendendo à conformidade legal;</li>
    <li>Dados de saúde apresentados de forma transparente e progressiva, tornando o cuidado preventivo tangível e não punitivo.</li>
  </ul>
</ul>

<h3>Sobre o Tailwind CSS:</h3>
<p>
O requisito de <b>Tailwind CSS</b> foi avaliado pela equipe e optamos por não migrar nessa entrega. O Tailwind já estava instalado e configurado no projeto, o <code>index.css</code> importa a biblioteca e o <code>package.json</code> inclui <code>@tailwindcss/vite</code>, mas a migração de toda a estilização existente (22 arquivos CSS e 35 componentes JSX) em cima de um prazo apertado representava um risco real à responsividade e ao acabamento visual da aplicação. Uma migração mal executada comprometeria justamente os critérios de <b>layout estruturado</b> e <b>responsividade completa</b> exigidos pela sprint de Front-End Design. A decisão foi priorizar a integridade do que foi entregue, mantendo a arquitetura de CSS Modules que já garantia escopo, organização e ausência de conflitos. A migração para Tailwind está mapeada como próximo passo técnico do projeto.
</p>

<h3>Como executar:</h3>
<p>
É necessário ter o <a href="https://nodejs.org/">Node.js</a> instalado (versão 18 ou superior).
</p>

```bash
# Clone o repositório
git clone https://github.com/Sednas22/Lyra-React-TailwindCSS.git

# Entre na pasta do projeto
cd lyra-react-tailwindcss

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

<p>Acesse no navegador: <b>http://localhost:5173</b></p>

<h3>Utilização:</h3>
<p>
Com o projeto rodando, acesse a aplicação pelo navegador e siga o fluxo de onboarding: aceite os termos de privacidade, informe seu nome e selecione o app de saúde. A partir daí, o sistema carrega o painel de saúde, o avatar e a loja.
</p>
<p>
O que está disponível para explorar:
</p>
<ul>
  <li>Acompanhamento de <b>Alimentação, Sono, Passos e Exercícios</b> no painel Resumo, com anéis de progresso e gráficos semanais;</li>
  <li><b>Avatar (Buddy)</b> com baús diários para ganhar Lyrium, troféus acumulativos e fala dinâmica que reage ao seu progresso;</li>
  <li><b>Metas diárias</b> configuráveis por categoria e nível de dificuldade, com resgate de Lyrium ao cumpri-las;</li>
  <li><b>Vestiário</b> com skins de personagem (equipáveis assim que compradas) e skins compostas (desbloqueadas ao reunir todas as peças na loja);</li>
  <li><b>Tags</b> que, quando equipadas, aplicam bônus de Lyrium nos baús abertos;</li>
  <li><b>Personalidades</b> que alteram o jeito do Buddy se comunicar com você;</li>
  <li><b>Baú Surpresa</b> na loja, com reset diário e item sorteado aleatoriamente entre os exclusivos.</li>
</ul>

<h4>Beneficiários cadastrados:</h4>
<p>
O sistema possui integração com uma API local (<code>src/data/beneficiarios.json</code>) que simula dados vindos da Care Plus. Ao informar um dos nomes abaixo no onboarding, os dados de saúde correspondentes são carregados automaticamente em todo o sistema:
</p>
<ul>
  <li><b>Cainã</b> - 1850 kcal consumidas · 7,2h de sono (Boa) · 9.340 passos · 420 cal gastas;</li>
  <li><b>André</b> - 2200 kcal consumidas · 6,0h de sono (Regular) · 12.500 passos · 610 cal gastas;</li>
  <li><b>Yuri</b> - 1600 kcal consumidas · 8,5h de sono (Ótima) · 6.800 passos · 280 cal gastas;</li>
  <li><b>Michel</b> - 2500 kcal consumidas · 5,5h de sono (Ruim) · 4.200 passos · 150 cal gastas.</li>
</ul>
<p>
Qualquer outro nome mantém os dados em branco (<code>--</code>) no painel. Para adicionar um novo beneficiário, basta incluir uma nova entrada no <code>beneficiarios.json</code> seguindo a mesma estrutura dos existentes — nome, métricas do dia e histórico semanal. O sistema captura automaticamente ao iniciar com esse nome no onboarding, sem necessidade de alterar nenhum outro arquivo.
</p>

<h3>Implementações futuras:</h3>
<p>Integração real com apps de saúde (Google Fit, Apple Health, Samsung Health) via OAuth, com possibilidade de trocar o app sincronizado; Migração da estilização para Tailwind CSS, trazendo modernidade ao projeto; Sistema de comunidade ou amigos com ranking entre usuários, mantendo a competição não punitiva; Sincronização com dados reais do Care Plus substituindo o JSON local, e permitindo que a validação de usuário seja feita apenas no primeiro acesso; Expansão do catálogo de skins compostas com novas combinações de peças e personalização do Buddy padrão com as peças de roupas adquiridas, sem skins pré-definidas.</p>

<h3>Publicação:</h3>
<p>

🔗 Link repositório: https://github.com/Sednas22/Lyra-React-TailwindCSS

🔗 Link deploy: https://lyra-amber-delta.vercel.app/
</p>
