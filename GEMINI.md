# GEMINI.md — Diretrizes de Engenharia e Design do Projeto
> **Janeiro Advocacia & Consultoria**  
> *Consultório Jurídico Digital de Alta Conversão em Direito Previdenciário*  
> Documento perpétuo para preservação de identidade visual, arquitetura de software e governança de dados.

---

## 🏛️ 1. Identificação Profissional & Titularidade

- **Escritório:** Janeiro Advocacia & Consultoria
- **Sócios Titulares:**
  - **Dr. André Luiz Leonardi Janeiro**
    - **Registro:** OAB/PR nº 84.395
    - **Especialidade:** Especialista em Direito Previdenciário pela Pontifícia Universidade Católica do Paraná (PUC/PR).
  - **Dra. Isis Nunes Dias Janeiro**
    - **Registro:** OAB/PR nº 82.230
    - **Especialidade:** Pós-graduada em Processo Civil pela LFG e Especialista em Prática da Advocacia Previdenciária pela EBRADI.
- **Sede Física:** Rua Guadiana, nº 4061, Umuarama - PR, CEP 87501-020
- **Área de Atuação Territorial:** Presencial em Umuarama/PR e Noroeste do Paraná; 100% Digital e Remoto para segurados de todo o Brasil e residentes no exterior.

---

## 📞 2. Canais Oficiais de Contato & Roteamento de Leads

- **WhatsApp Comercial Principal:** `+55 (44) 98844-2379` (Link formatado: `https://wa.me/5544988442379?text=...`)
- **Telefone Fixo / Escritório:** `(44) 3622-2084`
- **E-mail Institucional:** `contato@janeiroadvocacia.com.br`
- **Redes Sociais Oficiais:**
  - Instagram Dr. André: `https://instagram.com/andreljaneiro` (`@andreljaneiro`)
  - Instagram Dra. Isis: `https://instagram.com/isis.janeiro` (`@isis.janeiro`)
  - YouTube: Canal Oficial Janeiro Advocacia

---

## 🎨 3. Paleta Cromática Institucional

| Aplicação | Cor / Nome | Código Hex | Utilização Recomendada |
| :--- | :--- | :--- | :--- |
| **Primária / Nobre** | Azul Marinho Profundo | `#0D1B2A` | Header, fundos nobres, rodapé, textos de alto contraste |
| **Acento / Ouro** | Dourado Previdenciário | `#D4A359` | Botões de conversão CTA, detalhes em serifas, ícones |
| **Fundo Editorial** | Off-White Nobre | `#FAF9F5` | Background geral do site (nunca usar branco puro `#FFF`) |
| **Superfície Suave** | Bege Areia / Sand | `#EAE5DE` | Fundos de cards de dores, depoimentos e caixas de destaque |
| **Texto de Leitura** | Grafite Profundo / Slate | `#1E293B` | Parágrafos, listas e textos corridos (máxima legibilidade) |
| **Bordas Sutis** | Champanhe Suave | `rgba(212, 163, 89, 0.2)` | Linhas divisórias refinadas e molduras de cards |

---

## ✒️ 4. Tipografia do Sistema

- **Títulos, Cabeçalhos e Citações:** `Cormorant Garamond` (Google Fonts, serifada nobre com pesos 400, 600, 700).
- **Textos de Apoio, Parágrafos, Modais e Botões:** `Plus Jakarta Sans` (Google Fonts, pesos 400, 500, 600, 700).

---

## 🛡️ 5. Regras de Ouro de Design & Comunicação (Anti-Clichê)

1. **Logotipo Oficial Fiel & Header Limpo:**
   - O logotipo é composto pelo monograma original fiel `JA` (com haste diagonal e curva graciosa na base) acompanhado de `Janeiro Advocacia & Consultoria`.
   - **Regra de Ouro do Menu:** O cabeçalho / menu de navegação principal deve permanecer limpo e focado na usabilidade, **sem a inclusão dos números de OAB**. As inscrições da OAB pertencem institucionalmente à seção Sobre os Sócios (Dobra 6) e ao rodapé (Dobra 12).
2. **Proibição Absoluta de Imagens Clichês:**
   - Proibido usar martelos de juiz de plástico, balanças douradas genéricas 3D ou fotos stock de pessoas americanas em tribunais.
   - Todo material visual deve valorizar os retratos reais dos advogados Dr. André e Dra. Isis, a elegância do monograma `JA` original e o acolhimento do segurado.
3. **Lead Tracking Obrigatório no WhatsApp:**
   - Nenhum link para o WhatsApp pode ser aberto em branco. Deve conter o parâmetro `?text=` com a mensagem pré-formatada indicando o ponto de origem exato (Hero, Benefício Incapacidade, Planejamento, Aposentadoria Especial, Quiz Interativo ou Rodapé).
4. **Conformidade Estrita com o Provimento nº 205/2021 do CFOAB:**
   - **Caráter Meramente Informativo (Art. 2º):** Conteúdo focado na educação e esclarecimento de direitos previdenciários, com sobriedade e moderação.
   - **Vedação de Mercantilização (Art. 3º e 4º):** Proibição total de preços, gratuidades, descontos ou formas de pagamento no website voltado aos segurados.
   - **Obrigação de Meio (Sem Promessa de Êxito):** Foco na prestação de serviço técnico de excelência ("buscar o melhor benefício cabível"), sem prometer causa ganha ou resultados pré-determinados.
   - **Ferramentas de Triagem / Quiz (Art. 4º, § 2º):** O Quiz interativo deve conter aviso explícito informando seu caráter de triagem preliminar automatizada, sendo a consulta formal realizada individualmente pelo advogado.
   - **Identificação Profissional (Art. 4º, § 1º):** Identificação clara e digna dos advogados responsáveis (Dr. André OAB/PR 84.395 e Dra. Isis OAB/PR 82.230) nos locais apropriados do site.
5. **Smooth Scrolling Editorial (Lenis):**
   - Implementação de inércia e rolagem amortecida com Lenis (`assets/lenis.min.js`), proporcionando sensação de leveza e navegação fluida de alto padrão, com compensação automática do cabeçalho fixo nos links âncora e pausa inteligente ao abrir modais.

---

## 🏗️ 6. Arquitetura da Planta Baixa (12 Dobras)

1. **Header Glassmorphism:** Monograma JA em SVG dourado, menu responsivo, indicador de status ativo e CTA imediato.
2. **Hero Section:** Retrato editorial dos sócios, promessa de planejamento e segurança jurídica, selos de autoridade.
3. **Identificação de Dores:** 6 cenários cotidianos do segurado diante do INSS (demora, indeferimento, cálculo errado, etc.).
4. **A Abordagem / Solução:** Os 4 pilares da Janeiro Advocacia (Consultoria Ativa, Cálculo Matemático, Segurança Preventiva, Atuação Artesanal).
5. **Áreas de Atuação:** 5 cartões interativos com modais explicativos (Planejamento Previdenciário, Aposentadorias, Benefícios por Incapacidade, Revisões e Regime Próprio/Servidores).
6. **Como Funciona:** Linha do tempo de 4 etapas transparentes (Diagnóstico, Análise de Dados/CNIS, Parecer Estratégico, Concessão).
7. **Sobre os Advogados:** Perfil biográfico completo do Dr. André e da Dra. Isis, com registros de OAB e especializações.
8. **Prova Social & Autoridade:** Destaques dos canais digitais e feedbacks de clientes atendidos com ética.
9. **Diagnóstico Interativo (Quiz):** Ferramenta de 3 perguntas que pré-qualifica a situação do segurado e gera link dinâmico para o WhatsApp.
10. **Artigos Dedicados (E-E-A-T):** 3 artigos com Schema.org `Article` aprofundando regras de transição, planejamento e auxílio-doença negado.
11. **FAQ Estratégico:** 10 perguntas essenciais respondidas, incluindo atendimento online em todo o Brasil e honorários.
12. **Sede Física & Contato Final:** Endereço completo em Umuarama/PR, mapa incorporado, botões de rota e CTA final.

---

## 🚀 7. Protocolo de Deploy e Manutenção

- **Controle de Versão:** Git com repositório local e commits atômicos padronizados.
- **Hospedagem Recomendada:** Vercel ou Netlify (estático, latência ultrabaixa com Edge CDN global e certificado SSL gratuito automático).
- **Procedimento para Deploy via Vercel CLI:**
  ```bash
  npm i -g vercel
  vercel --prod
  ```
- **Procedimento para Atualizações Futuras:**
  - Qualquer novo artigo deve ser adicionado ao diretório `artigos/`, listado no `index.html` e registrado no `sitemap.xml`.
  - Manter sempre os links de imagem no `sitemap.xml` atualizados.

---

## 💻 8. Painel Administrativo (CMS) & Arquitetura de Dados

O escritório conta com um **Painel de Gestão de Conteúdo (CMS)** integrado para que os advogados possam criar, editar e excluir artigos do blog e perguntas do FAQ sem necessidade de programar.

### 🔑 Acesso Administrativo
- **URL do Portal:** `admin/login.html` (ou via link discreto no rodapé do site principal)
- **E-mail Padrão:** `contato@janeiroadvocacia.com.br`
- **Senha Padrão Inicial:** `janeiro@2026` (personalizável via localStorage `ja_admin_password`)
- **Sessão:** Armazenada via `sessionStorage` e `localStorage` com expiração e guarda de rota segura.

### ⚙️ Arquitetura Híbrida (Opção 1)
1. **Local-First Imediato (Zero Fricção & CORS-Free):**
   - O painel funciona imediatamente sem necessidade de configurações de backend.
   - O módulo `data/default-data.js` inicializa os 3 artigos e as 10 perguntas garantindo carregamento imediato sem bloqueio de CORS mesmo ao abrir arquivos diretamente no Windows (`file:///`).
   - Modificações persistem no navegador em `localStorage['ja_artigos']` e `localStorage['ja_faq']`.
2. **Upload de Imagem do Computador (com Compressão Canvas):**
   - Dropzone interativo no formulário de artigos com suporte a clique e *drag & drop* (JPG, PNG, WEBP).
   - Otimização automática no cliente via HTML5 `<canvas>` (redimensionamento máx 1200px, JPEG 0.84, ~120KB-200KB em Base64).
   - Elimina dependência de servidores de upload de mídia e evita estouro de cota de memória local.
   - Suporte simultâneo a links externos da web e biblioteca rápida de fotos jurídicas.
3. **Sincronização em Nuvem (Supabase / PostgreSQL Gratuito):**
   - Na aba **Nuvem & Supabase**, é possível inserir a `Project URL` e a `anon public key`.
   - Script SQL com um clique disponível no próprio painel para criar as tabelas `artigos` e `faq` com Row Level Security (RLS) habilitada para leitura pública.
   - Sincronização bidirecional em segundo plano.
4. **Hidratação do Site Público:**
   - O `index.html` exibe o conteúdo estático inicial para garantir SEO e indexação pelo Google.
   - O `script.js` hidrata dinamicamente as Dobras 9 (Artigos) e 10 (FAQ) caso novos artigos ou perguntas tenham sido publicados no CMS.
   - Acesso rápido garantido pelo link `Painel CMS` com cadeado no rodapé.
5. **Leitor Dinâmico de Artigos (`artigos/artigo.html`):**
   - Artigos novos criados pelo painel são renderizados dinamicamente pelo leitor via parâmetro `?slug=meu-artigo`, mantendo a tipografia editorial nobre, cabeçalho glassmorphism e CTA com lead tracking no WhatsApp.


