# Lyra — Care Plus
<p>Sprint desenvolvida para a disciplina de <b>Web Development</b> da FIAP 2026, como continuação de um protótipo criado em Front-end Design. Projeto apresentado ao curso de Engenharia de Software. Desenvolvido por: </p>
André Rosa Ferreira Filho - RM: 567149, <br>
Cainã Sandes Batista - RM: 568571, <br>
Michel Lima Benchimol - RM: 567345, <br>
Yuri Aroste Fukamachi - RM: 567314. <hr>

<h3>Descrição do Caso:</h3>
<p>
A Lyra é um plugin gamificado para ser integrado ao ecossistema <b>Care Plus</b>, que permite ao usuário acompanhar seu progresso na saúde preventiva, além de personalizar um avatar com itens desbloqueáveis por meio de uma moeda virtual chamada <b>Lyrium</b>.
</p>

<h3>Estrutura do projeto:</h3>
<p>
<ul>
  <li>lyra-react (folder)</li>
  <ul>
    <b><li>index.html</b> – Arquivo de entrada da aplicação. Define o ponto de montagem do React (<code>div#root</code>) e importa o <code>main.jsx</code>;</li>
    <b><li>package.json</b> – Configuração do projeto com as dependências (React, React Router DOM) e scripts de desenvolvimento e build via Vite;</li>
    <li>README.md.</li>
    <li>src</li>
    <ul>
      <li>assets</li>
      <ul>
        <li>Imagens de avatar, roupas, acessórios, personalidades, tags, logos e ícones utilizados na aplicação.</li>
      </ul>
      <li>components</li>
      <ul>
        <b><li>BottomNav.jsx</b> – Navegação inferior da aplicação, exibida em mobile. Usa <code>NavLink</code> e <code>useLocation</code> para destacar a rota ativa;</li>
        <b><li>Sidebar.jsx</b> – Navegação lateral para telas desktop;</li>
        <b><li>LyriumModal.jsx</b> – Modal reutilizável para confirmação de compra, saldo insuficiente ou item já resgatado;</li>
        <b><li>Notificacao.jsx</b> – Ícone de notificações reutilizado em várias páginas;</li>
        <li>avatar/ – Componentes da tela de Avatar: <code>AvatarTab</code>, <code>VestiarioTab</code>, <code>ComunidadeTab</code>, <code>ObjetivosTab</code> e os sub-componentes do vestiário (Roupas, Acessórios, Personalidades, Tags).</li>
      </ul>
      <li>context</li>
      <ul>
        <b><li>LyriumContext.jsx</b> – Context API que gerencia o estado global da moeda Lyrium: pontos, itens comprados, baús e objetivos. Persiste tudo no <code>localStorage</code>.</li>
      </ul>
      <li>pages</li>
      <ul>
        <b><li>Home.jsx</b> – Landing page com apresentação do app e mockup de celular animado, seguida do menu principal;</li>
        <b><li>Lgpd.jsx</b> – Tela de aceite dos Termos de Privacidade (LGPD) com link para a política completa;</li>
        <b><li>Resumo.jsx</b> – Painel principal com cards de Alimentação, Sono, Passos e Exercícios, além de gráfico de anéis e dicas;</li>
        <b><li>Alimentacao.jsx / Sono.jsx / Passos.jsx / Exercicio.jsx</b> – Páginas de detalhamento de cada categoria de saúde;</li>
        <b><li>Dash.jsx</b> – Dashboard com visualização de dados e gráficos;</li>
        <b><li>Dicas.jsx</b> – Página com dicas de saúde e bem-estar;</li>
        <b><li>Avatar.jsx</b> – Página de personalização do avatar com abas de Vestiário, Objetivos e Comunidade;</li>
        <b><li>Loja.jsx</b> – Loja de itens (Roupas, Personalidades, Tags e Baú) com sistema de compra por Lyrium;</li>
        <b><li>Roupas.jsx / Personalidades.jsx / Tags.jsx</b> – Sub-páginas da loja com os itens disponíveis para compra;</li>
        <b><li>Sincronizacao.jsx</b> – Tela de sincronização de dados do usuário.</li>
      </ul>
      <li>styles</li>
      <ul>
        <li>Arquivos <code>.module.css</code> e <code>.css</code> globais para estilização escopada e temática da aplicação.</li>
      </ul>
      <b><li>App.jsx</b> – Define todas as rotas da aplicação usando React Router DOM;</li>
      <b><li>main.jsx</b> – Entry point que monta a aplicação no DOM dentro do <code>StrictMode</code>.</li>
    </ul>
  </ul>
</ul>
</p>

<h3>Objetivo:</h3>
<p>
Migrar o protótipo HTML/CSS existente para uma arquitetura <b>React com Vite</b>, desenvolvendo uma aplicação completa com componentes reutilizáveis, roteamento por páginas, estado global via Context API e persistência de dados com <code>localStorage</code>. A interface deve ser responsiva e fiel ao design do protótipo original, proporcionando uma experiência de usuário fluida e agradável.
</p>

<h3>Desenvolvimento:</h3>
<p>
A aplicação foi desenvolvida seguindo os requisitos da Sprint 3 em Web Development, utilizando React, Vite e React Router DOM, com foco em boas práticas de organização de código e desenvolvimento front-end moderno.
Foram aplicados:
</p>

<ul>
  <li><b>React + Vite</b></li>
  <ul>
    <li><code>App.jsx</code> – Estruturação de todas as rotas com <code>BrowserRouter</code>, <code>Routes</code> e <code>Route</code>, envolvidas pelo <code>LyriumProvider</code> para acesso global ao contexto;</li>
    <li>Componentes funcionais em toda a aplicação, com uso de <code>useState</code>, <code>useCallback</code>, <code>useContext</code> e <code>useLocation</code>;</li>
    <li>Imports modulares de assets, estilos e componentes, seguindo a estrutura de pastas organizada por responsabilidade.</li>
  </ul>

  <li><b>Context API + localStorage</b></li>
  <ul>
    <li><code>LyriumContext.jsx</code> – Gerencia os pontos Lyrium do usuário com as funções <code>addPoints()</code>, <code>spendPoints()</code>, <code>buyItem()</code>, <code>claimGoal()</code> e <code>claimAvatarChest()</code>;</li>
    <li>Persistência automática de todos os dados (pontos, itens, baús, objetivos) no <code>localStorage</code>, garantindo que o estado sobreviva ao recarregamento da página;</li>
    <li>Hook customizado <code>useLyrium()</code> para consumir o contexto de qualquer componente da aplicação.</li>
  </ul>

  <li><b>Componentes Reutilizáveis</b></li>
  <ul>
    <li><code>LyriumModal</code> – Modal polimórfico com três comportamentos distintos: confirmação de compra (<code>chest_confirm</code>), saldo insuficiente (<code>insufficient</code>) e item resgatado (<code>item</code>);</li>
    <li><code>BottomNav</code> e <code>Sidebar</code> – Navegação responsiva para mobile e desktop, reutilizada em todas as páginas internas;</li>
    <li>Comunicação entre componentes via props, como o padrão <code>onBack</code> nas sub-páginas do vestiário.</li>
  </ul>

  <li><b>Estilização</b></li>
  <ul>
    <li>CSS Modules (<code>.module.css</code>) para estilos escopados por componente, evitando conflitos;</li>
    <li>CSS global para páginas e temas visuais específicos;</li>
    <li>Layout responsivo adaptado para mobile e desktop com sidebar e bottom nav condicionais.</li>
  </ul>

  <li><b>Conteúdo e Propósito</b></li>
  <ul>
    <li>Aplicação integrada ao ecossistema Care Plus, com foco em saúde preventiva e gamificação para engajamento do usuário;</li>
    <li>Tela de LGPD com link para política de privacidade real, atendendo à conformidade legal.</li>
  </ul>
</ul>

<h3>Como executar:</h3>
<p>
É necessário ter o <a href="https://nodejs.org/">Node.js</a> instalado (versão 18 ou superior).
</p>

```bash
# Clone o repositório
git clone https://github.com/Sednas22/lyra-react.git

# Entre na pasta do projeto
cd lyra-react

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

<p>Acesse no navegador: <b>http://localhost:porta</b></p>

<h3>Implementações futuras:</h3>
<p>Sincronizaçao com apps de saúdes, manipulação e apresentação de informações e gráficos com base na persistência de dados, implementaçao de itens adquiridos ao vestiário, personalização de Buddy, feedback dinâmico do Buddy.</p>

<h3>Publicação:</h3>
<p>
🔗 Link repositório: https://github.com/Sednas22/lyra-react
</p>
