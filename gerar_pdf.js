const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 1. Obter Base64 das Imagens Oficiais
const assetsDir = path.join(__dirname, 'assets');
const drAndreBase64 = 'data:image/jpeg;base64,' + fs.readFileSync(path.join(assetsDir, 'dr-andre.jpg')).toString('base64');
const draIsisBase64 = 'data:image/png;base64,' + fs.readFileSync(path.join(assetsDir, 'dra-isis.png')).toString('base64');
const logoBase64 = 'data:image/png;base64,' + fs.readFileSync(path.join(assetsDir, 'logo-transparent.png')).toString('base64');

// 2. Construir o HTML Completo com Design Editorial Jurídico de Luxo para PDF A4 Paisagem (297mm x 210mm)
const htmlContent = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Apresentação Executiva & Planta Baixa | Janeiro Advocacia & Consultoria</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    @page {
      size: 297mm 210mm;
      margin: 0;
    }
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    body {
      background-color: #FAF9F5;
      color: #1E293B;
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
      font-size: 12.5px;
      line-height: 1.5;
    }
    .slide {
      width: 297mm;
      height: 210mm;
      page-break-after: always;
      page-break-inside: avoid;
      overflow: hidden;
      position: relative;
      padding: 13mm 18mm 11mm 18mm;
      background-color: #FAF9F5;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .slide:last-child {
      page-break-after: auto;
    }
    
    /* Header & Footer dos Slides */
    .slide-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 3.5mm;
      border-bottom: 1px solid rgba(212, 163, 89, 0.35);
      margin-bottom: 3.5mm;
    }
    .slide-logo {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .slide-logo-badge {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #0D1B2A;
      border: 1px solid #D4A359;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-weight: 700;
      font-size: 15px;
      color: #D4A359;
    }
    .slide-logo-text {
      display: flex;
      flex-direction: column;
    }
    .slide-logo-text strong {
      font-size: 11px;
      letter-spacing: 0.08em;
      color: #0D1B2A;
      text-transform: uppercase;
    }
    .slide-logo-text span {
      font-size: 8.5px;
      letter-spacing: 0.12em;
      color: #8A6729;
      text-transform: uppercase;
      font-weight: 600;
    }
    .slide-title-tag {
      font-size: 9px;
      text-transform: uppercase;
      letter-spacing: 0.14em;
      color: #8A6729;
      font-weight: 700;
      background: #F4EFE6;
      padding: 3px 10px;
      border-radius: 9999px;
      border: 1px solid rgba(212, 163, 89, 0.4);
    }
    .slide-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 3.5mm;
      border-top: 1px solid rgba(212, 163, 89, 0.3);
      font-size: 9.5px;
      color: #64748B;
    }

    /* Tipografia Nobre */
    h1, h2, h3, .serif {
      font-family: 'Cormorant Garamond', Georgia, serif;
    }
    .slide-heading {
      font-size: 26px;
      font-weight: 600;
      color: #0D1B2A;
      line-height: 1.18;
      margin-bottom: 2mm;
    }
    .slide-subtitle {
      font-size: 12px;
      color: #475569;
      margin-bottom: 3.5mm;
      line-height: 1.45;
    }

    /* Badges & Pills */
    .pill-badge {
      display: inline-block;
      font-size: 8.5px;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      font-weight: 700;
      padding: 2.5px 8px;
      border-radius: 9999px;
      background: #0D1B2A;
      color: #D4A359;
      margin-bottom: 4px;
    }
    .pill-gold {
      background: #D4A359;
      color: #0D1B2A;
    }

    /* Cards e Grids */
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      height: 100%;
    }
    .grid-3 {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      height: 100%;
    }
    .grid-4 {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      height: 100%;
    }
    .card-box {
      background: #FFFFFF;
      border: 1px solid #EAE5DE;
      border-radius: 8px;
      padding: 11px 13px;
      box-shadow: 0 2px 6px rgba(13, 27, 42, 0.03);
      position: relative;
    }
    .card-box.dark {
      background: #0D1B2A;
      color: #FAF9F5;
      border-color: #1E2D42;
    }
    .card-box.gold-border {
      border-top: 3px solid #D4A359;
    }

    /* Tabela Arquitetura */
    .arch-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 9.5px;
    }
    .arch-table th {
      background: #0D1B2A;
      color: #D4A359;
      font-weight: 600;
      text-align: left;
      padding: 5px 8px;
      font-size: 9.5px;
      letter-spacing: 0.05em;
    }
    .arch-table td {
      padding: 4.5px 8px;
      border-bottom: 1px solid #EAE5DE;
      color: #334155;
      line-height: 1.35;
    }
    .arch-table tr:nth-child(even) td {
      background: rgba(244, 239, 230, 0.45);
    }
    .arch-table td strong {
      color: #0D1B2A;
    }

    /* Cores */
    .color-swatch {
      height: 48px;
      border-radius: 6px;
      margin-bottom: 6px;
      border: 1px solid rgba(0,0,0,0.08);
      display: flex;
      align-items: flex-end;
      padding: 4px 6px;
      font-size: 9px;
      font-weight: 700;
      color: #FFF;
    }
  </style>
</head>
<body>

  <!-- ==========================================
       SLIDE 1: CAPA EXECUTIVA
       ========================================== -->
  <div class="slide" style="background: radial-gradient(circle at top right, #1E2E42 0%, #0D1B2A 70%, #08111B 100%); color: #FAF9F5; padding: 22mm 24mm 16mm 24mm;">
    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
      <div>
        <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(212, 163, 89, 0.15); border: 1px solid #D4A359; padding: 5px 14px; border-radius: 9999px; margin-bottom: 18px;">
          <span style="width: 7px; height: 7px; background: #D4A359; border-radius: 50%;"></span>
          <span style="font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #E7C27D;">Consultório Jurídico Digital • Engenharia de Conversão</span>
        </div>
        <h1 style="font-size: 46px; font-weight: 600; line-height: 1.1; color: #FAF9F5; margin-bottom: 12px; max-width: 620px;">
          Janeiro Advocacia <br><span style="color: #D4A359; font-style: italic; font-weight: 400;">& Consultoria</span>
        </h1>
        <p style="font-size: 14px; color: #CBD5E1; max-width: 580px; font-weight: 300; line-height: 1.6; margin-bottom: 24px;">
          Apresentação Executiva da Arquitetura Digital em 12 Dobras, Matriz de Posicionamento Editorial Anti-Clichê e Estratégia de Roteamento Inteligente de Leads em Direito Previdenciário.
        </p>
      </div>

      <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(212, 163, 89, 0.35); border-radius: 12px; padding: 18px 22px; width: 260px; text-align: right; backdrop-filter: blur(8px);">
        <img src="${logoBase64}" alt="Logo" style="height: 52px; margin-bottom: 12px; filter: drop-shadow(0 2px 8px rgba(0,0,0,0.4));">
        <div style="font-size: 11px; font-weight: 700; color: #FAF9F5; letter-spacing: 0.05em;">ESPECIALIZAÇÃO PREVIDENCIÁRIA</div>
        <div style="font-size: 9.5px; color: #D4A359; margin-top: 4px;">Dr. André Janeiro • OAB/PR 84.395</div>
        <div style="font-size: 9.5px; color: #D4A359;">Dra. Isis Janeiro • OAB/PR 82.230</div>
        <div style="font-size: 8.5px; color: #94A3B8; margin-top: 6px;">Umuarama - PR • Atendimento Nacional</div>
      </div>
    </div>

    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-top: 10px; border-top: 1px solid rgba(212, 163, 89, 0.25); padding-top: 14px;">
      <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 10px 12px;">
        <div style="color: #D4A359; font-size: 18px; font-weight: 700; font-family: 'Cormorant Garamond';">12 Dobras</div>
        <div style="font-size: 9px; color: #94A3B8; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 2px;">Jornada Completa</div>
      </div>
      <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 10px 12px;">
        <div style="color: #D4A359; font-size: 18px; font-weight: 700; font-family: 'Cormorant Garamond';">E-E-A-T & SEO</div>
        <div style="font-size: 9px; color: #94A3B8; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 2px;">3 Artigos Estruturados</div>
      </div>
      <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 10px 12px;">
        <div style="color: #D4A359; font-size: 18px; font-weight: 700; font-family: 'Cormorant Garamond';">Lead Tracking</div>
        <div style="font-size: 9px; color: #94A3B8; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 2px;">WhatsApp Roteado</div>
      </div>
      <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 10px 12px;">
        <div style="color: #D4A359; font-size: 18px; font-weight: 700; font-family: 'Cormorant Garamond';">100% Ética OAB</div>
        <div style="font-size: 9px; color: #94A3B8; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 2px;">Provimento 205/2021</div>
      </div>
    </div>

    <div class="slide-footer" style="border-top-color: rgba(212,163,89,0.25); color: #94A3B8;">
      <div>Janeiro Advocacia & Consultoria • Projeto Consultório Digital</div>
      <div>Setembro de 2026</div>
      <div>Página 01 de 12</div>
    </div>
  </div>

  <!-- ==========================================
       SLIDE 2: DIAGNÓSTICO E DIREÇÃO DE ARTE ANTI-CLICHÊ
       ========================================== -->
  <div class="slide">
    <div class="slide-header">
      <div class="slide-logo">
        <div class="slide-logo-badge">JA</div>
        <div class="slide-logo-text">
          <strong>Janeiro Advocacia</strong>
          <span>Direito Previdenciário</span>
        </div>
      </div>
      <div class="slide-title-tag">Fase 1: Diagnóstico de Posicionamento</div>
    </div>

    <div>
      <div class="pill-badge">Direção de Arte Editorial</div>
      <h2 class="slide-heading">A Sobriedade da Tradição com a Sofisticação Digital</h2>
      <p class="slide-subtitle">
        Eliminação total de clichês visuais jurídicos desgastados e construção de uma identidade visual que traduz acolhimento ao segurado, rigor nos cálculos e autoridade inquestionável perante o INSS e a Justiça Federal.
      </p>
    </div>

    <div class="grid-3" style="flex: 1; align-items: stretch; margin-bottom: 2mm;">
      <!-- Coluna 1: O Que Eliminamos -->
      <div class="card-box" style="border-left: 3px solid #E11D48;">
        <div style="color: #E11D48; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 6px;">❌ O Que Foi Banido (Clichês)</div>
        <ul style="list-style: none; font-size: 10.5px; line-height: 1.5; color: #475569;">
          <li style="margin-bottom: 5px;">• <strong>Martelos de Juiz & Balanças de Plástico:</strong> Imagens 3D artificiais que infantilizam a advocacia e geram frieza.</li>
          <li style="margin-bottom: 5px;">• <strong>Fotos Stock Americanas:</strong> Pessoas engravatadas em tribunais estrangeiros sem conexão com a realidade do trabalhador brasileiro.</li>
          <li style="margin-bottom: 5px;">• <strong>Linguagem Hermética / Arcaica:</strong> Jargões jurídicos inacessíveis que afastam o cliente e geram insegurança.</li>
          <li>• <strong>Promessas de Ganhos Rápidos:</strong> Vedado pelo Provimento 205/2021 da OAB e prejudicial à credibilidade.</li>
        </ul>
      </div>

      <!-- Coluna 2: Paleta Cromática Nobre -->
      <div class="card-box gold-border">
        <div style="color: #8A6729; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 6px;">🎨 Paleta Cromática Institucional</div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
          <div>
            <div class="color-swatch" style="background: #0D1B2A;">#0D1B2A</div>
            <div style="font-size: 9px; font-weight: 600; color: #0D1B2A;">Azul Marinho Nobre</div>
            <div style="font-size: 8px; color: #64748B;">Autoridade, solidez e prestígio</div>
          </div>
          <div>
            <div class="color-swatch" style="background: #D4A359; color: #0D1B2A;">#D4A359</div>
            <div style="font-size: 9px; font-weight: 600; color: #0D1B2A;">Ouro Previdenciário</div>
            <div style="font-size: 8px; color: #64748B;">Valor percebido e destaque de CTA</div>
          </div>
          <div>
            <div class="color-swatch" style="background: #FAF9F5; color: #334155; border: 1px solid #CBD5E1;">#FAF9F5</div>
            <div style="font-size: 9px; font-weight: 600; color: #0D1B2A;">Off-White Editorial</div>
            <div style="font-size: 8px; color: #64748B;">Leitura suave anti-fadiga</div>
          </div>
          <div>
            <div class="color-swatch" style="background: #EAE5DE; color: #334155;">#EAE5DE</div>
            <div style="font-size: 9px; font-weight: 600; color: #0D1B2A;">Bege Areia Nobre</div>
            <div style="font-size: 8px; color: #64748B;">Superfícies de acolhimento</div>
          </div>
        </div>
      </div>

      <!-- Coluna 3: Tipografia & Tom de Voz -->
      <div class="card-box" style="border-left: 3px solid #0D1B2A;">
        <div style="color: #0D1B2A; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 6px;">✒️ Tipografia & Humanização</div>
        <div style="margin-bottom: 8px;">
          <div style="font-family: 'Cormorant Garamond'; font-size: 16px; font-weight: 700; color: #0D1B2A; line-height: 1.2;">Cormorant Garamond</div>
          <div style="font-size: 9px; color: #64748B;">Serifada nobre inspirada em publicações de prestígio clássico. Aplicada em todos os títulos principais e citações.</div>
        </div>
        <div style="margin-bottom: 8px;">
          <div style="font-family: 'Plus Jakarta Sans'; font-size: 13px; font-weight: 700; color: #0D1B2A;">Plus Jakarta Sans</div>
          <div style="font-size: 9px; color: #64748B;">Geométrica moderna de alta legibilidade em telas de celulares e monitores, com espaçamento respirado.</div>
        </div>
        <div style="background: #F4EFE6; border-radius: 6px; padding: 6px 8px; font-size: 8.5px; color: #8A6729; font-weight: 600;">
          💡 Regra de Ouro: Tom consultivo e empático que orienta o segurado sem criar falsas ilusões.
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <div>Janeiro Advocacia & Consultoria • Manual de Identidade Visual</div>
      <div>Fase 1: Posicionamento & Arte</div>
      <div>Página 02 de 12</div>
    </div>
  </div>

  <!-- ==========================================
       SLIDE 3: PLANTA BAIXA EM 12 DOBRAS (MATRIZ)
       ========================================== -->
  <div class="slide">
    <div class="slide-header">
      <div class="slide-logo">
        <div class="slide-logo-badge">JA</div>
        <div class="slide-logo-text">
          <strong>Janeiro Advocacia</strong>
          <span>Direito Previdenciário</span>
        </div>
      </div>
      <div class="slide-title-tag">Fase 2: Arquitetura Estratégica</div>
    </div>

    <div>
      <div class="pill-badge">A Jornada do Segurado</div>
      <h2 class="slide-heading">A Planta Baixa do Consultório Digital em 12 Dobras</h2>
      <p class="slide-subtitle">
        Cada seção cumpre um papel psicológico e estratégico milimetricamente desenhado para guiar o cliente da incerteza à segurança jurídica.
      </p>
    </div>

    <div style="flex: 1; margin-bottom: 2mm;">
      <table class="arch-table">
        <thead>
          <tr>
            <th style="width: 50px; text-align: center;">Dobra</th>
            <th style="width: 140px;">Seção</th>
            <th style="width: 190px;">Função Psicológica & Conversão</th>
            <th>Conteúdo & Recursos Interativos Implementados</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="text-align: center;"><strong>Dobra 0</strong></td>
            <td><strong>Header Glassmorphism</strong></td>
            <td>Autoridade imediata e acessibilidade</td>
            <td>Monograma JA original, menu limpo e dinâmico, badge de status ("Atendimento Disponível") e CTA WhatsApp.</td>
          </tr>
          <tr>
            <td style="text-align: center;"><strong>Dobra 1</strong></td>
            <td><strong>Hero Section</strong></td>
            <td>Impacto, conexão humana e credibilidade</td>
            <td>Retrato dos sócios, citação de combate à passividade, 4 selos de credibilidade e duplo botão de ação.</td>
          </tr>
          <tr>
            <td style="text-align: center;"><strong>Dobra 2</strong></td>
            <td><strong>Identificação de Dores</strong></td>
            <td>Empatia e sensação de acolhimento</td>
            <td>6 cenários reais de aflição diante do INSS (demora, indeferimento, cálculo injusto, reforma, servidores).</td>
          </tr>
          <tr>
            <td style="text-align: center;"><strong>Dobra 3</strong></td>
            <td><strong>A Abordagem / Pilares</strong></td>
            <td>Diferenciação técnica no mercado</td>
            <td>Os 4 pilares: Atuação Consultiva, Rigor Matemático, Segurança Preventiva e Advocacia Artesanal.</td>
          </tr>
          <tr>
            <td style="text-align: center;"><strong>Dobra 4</strong></td>
            <td><strong>Áreas de Atuação</strong></td>
            <td>Clareza de serviços e aprofundamento</td>
            <td>5 especialidades com botões que abrem modais informativos completos e formulários de agendamento.</td>
          </tr>
          <tr>
            <td style="text-align: center;"><strong>Dobra 5</strong></td>
            <td><strong>Como Funciona</strong></td>
            <td>Desmistificação do processo jurídico</td>
            <td>Linha do tempo em 4 passos transparentes: do diagnóstico do CNIS até a concessão do benefício.</td>
          </tr>
          <tr>
            <td style="text-align: center;"><strong>Dobra 6</strong></td>
            <td><strong>Sobre os Titulares</strong></td>
            <td>Humanização e comprovação técnica</td>
            <td>Biografias do Dr. André e Dra. Isis, especializações PUC/PR, LFG e EBRADI, foto de estúdio proporção 3:4.</td>
          </tr>
          <tr>
            <td style="text-align: center;"><strong>Dobra 7</strong></td>
            <td><strong>Prova Social & Mídias</strong></td>
            <td>Validação de pares e transparência</td>
            <td>Conexão com os canais do YouTube e perfis do Instagram dos advogados para atestar presença pública.</td>
          </tr>
          <tr>
            <td style="text-align: center;"><strong>Dobra 8</strong></td>
            <td><strong>Diagnóstico Rápido</strong></td>
            <td>Engajamento ativo e qualificação de lead</td>
            <td>Quiz interativo em 3 etapas com envio automático de respostas consolidadas para o WhatsApp.</td>
          </tr>
          <tr>
            <td style="text-align: center;"><strong>Dobra 9</strong></td>
            <td><strong>Artigos Clínicos (SEO)</strong></td>
            <td>Atração orgânica E-E-A-T no Google</td>
            <td>3 artigos aprofundados com dados estruturados Schema.org Article + Painel Administrativo CMS para gestão e upload de fotos.</td>
          </tr>
          <tr>
            <td style="text-align: center;"><strong>Dobra 10</strong></td>
            <td><strong>FAQ Estratégico</strong></td>
            <td>Quebra de objeções pré-atendimento</td>
            <td>10 perguntas frequentes abordando atendimento 100% online em todo o país, prazos, perícias e honorários.</td>
          </tr>
          <tr>
            <td style="text-align: center;"><strong>Dobra 11 & 12</strong></td>
            <td><strong>CTA Final & Sede Física</strong></td>
            <td>Conversão definitiva e presença física</td>
            <td>Fechamento acolhedor, endereço em Umuarama/PR, mapa dinâmico, rotas Waze/Maps e botão flutuante.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="slide-footer">
      <div>Janeiro Advocacia & Consultoria • Arquitetura de Informação</div>
      <div>Fase 2: As 12 Dobras Estratégicas</div>
      <div>Página 03 de 12</div>
    </div>
  </div>

  <!-- ==========================================
       SLIDE 4: DETALHAMENTO DOBRAS 0, 1 E 2
       ========================================== -->
  <div class="slide">
    <div class="slide-header">
      <div class="slide-logo">
        <div class="slide-logo-badge">JA</div>
        <div class="slide-logo-text">
          <strong>Janeiro Advocacia</strong>
          <span>Direito Previdenciário</span>
        </div>
      </div>
      <div class="slide-title-tag">Detalhamento: Dobras 0, 1 e 2</div>
    </div>

    <div>
      <div class="pill-badge">Primeiro Impacto & Conexão</div>
      <h2 class="slide-heading">Acolhimento Imediato & Quebra da Insegurança</h2>
      <p class="slide-subtitle">
        O segurado chega ao site sob tensão (medo da aposentadoria tardia ou benefício indeferido). As primeiras 3 dobras constroem alívio imediato e seriedade.
      </p>
    </div>

    <div class="grid-3" style="flex: 1; align-items: stretch; margin-bottom: 2mm;">
      <!-- Dobra 0: Header -->
      <div class="card-box">
        <div class="pill-badge pill-gold">Dobra 0</div>
        <h3 style="font-size: 14px; font-weight: 700; color: #0D1B2A; margin: 4px 0;">Header Glassmorphism</h3>
        <p style="font-size: 10px; color: #64748B; margin-bottom: 8px;">Fixado no topo com efeito vidro fosco sofisticado.</p>
        <div style="background: #FAF9F5; border: 1px solid #EAE5DE; border-radius: 6px; padding: 8px; font-size: 9.5px; color: #334155;">
          <div style="margin-bottom: 4px;">• <strong>Logotipo Fiel Original:</strong> Monograma JA em harmonia diagonal e tipografia original, mantendo o menu leve e limpo (sem números de OAB no topo).</div>
          <div style="margin-bottom: 4px;">• <strong>Rolagem Fluida (Lenis):</strong> Inércia e amortecimento editorial em toda a navegação.</div>
          <div style="margin-bottom: 4px;">• <strong>Indicador Ativo:</strong> Ponto verde pulsante informando plantão de atendimento.</div>
          <div>• <strong>Botão de Ação:</strong> WhatsApp direto para triagem rápida.</div>
        </div>
      </div>

      <!-- Dobra 1: Hero -->
      <div class="card-box gold-border">
        <div class="pill-badge pill-gold">Dobra 1</div>
        <h3 style="font-size: 14px; font-weight: 700; color: #0D1B2A; margin: 4px 0;">Hero Section de Autoridade</h3>
        <p style="font-size: 10px; color: #64748B; margin-bottom: 8px;">Combinação de fotografia editorial e posicionamento assertivo.</p>
        <div style="background: #FAF9F5; border: 1px solid #EAE5DE; border-radius: 6px; padding: 8px; font-size: 9.5px; color: #334155;">
          <div style="margin-bottom: 4px;">• <strong>Headline Transformadora:</strong> <em>"O seu futuro e a sua tranquilidade merecem mais do que esperar pela decisão de alguém."</em></div>
          <div style="margin-bottom: 4px;">• <strong>Citação dos Sócios:</strong> O propósito do escritório de abandonar a passividade jurídica.</div>
          <div style="margin-bottom: 4px;">• <strong>4 Selos de Credibilidade:</strong> OAB/PR, Pós PUC/PR, Atendimento Brasil e Sigilo Absoluto.</div>
          <div>• <strong>Duplo CTA:</strong> Consulta Direta e Atalho para o Diagnóstico Interativo.</div>
        </div>
      </div>

      <!-- Dobra 2: Dores -->
      <div class="card-box">
        <div class="pill-badge pill-gold">Dobra 2</div>
        <h3 style="font-size: 14px; font-weight: 700; color: #0D1B2A; margin: 4px 0;">6 Cenários de Dores Reais</h3>
        <p style="font-size: 10px; color: #64748B; margin-bottom: 8px;">Sem julgamento moral, traduzindo aflições em soluções jurídicas.</p>
        <div style="background: #FAF9F5; border: 1px solid #EAE5DE; border-radius: 6px; padding: 8px; font-size: 9.5px; color: #334155;">
          <div style="margin-bottom: 3px;">1. <strong>Regras Confusas da Reforma:</strong> Medo de cair na pior regra de transição.</div>
          <div style="margin-bottom: 3px;">2. <strong>Incapacidade / Auxílio Negado:</strong> A injustiça da perícia superficial do INSS.</div>
          <div style="margin-bottom: 3px;">3. <strong>Vínculos Faltantes no CNIS:</strong> Erros de cadastro que atrasam anos.</div>
          <div style="margin-bottom: 3px;">4. <strong>Aposentadoria com Valor Baixo:</strong> Revisões da vida toda e cálculos equivocados.</div>
          <div style="margin-bottom: 3px;">5. <strong>Autônomo & Empresário:</strong> Dúvida de quanto recolher todo mês.</div>
          <div>6. <strong>Servidor Público:</strong> Incerteza entre RPPS e regras do regime geral.</div>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <div>Janeiro Advocacia & Consultoria • Detalhamento de Interface</div>
      <div>Dobras 0, 1 e 2</div>
      <div>Página 04 de 12</div>
    </div>
  </div>

  <!-- ==========================================
       SLIDE 5: DETALHAMENTO DOBRAS 3 E 4 (ABORDAGEM E ÁREAS)
       ========================================== -->
  <div class="slide">
    <div class="slide-header">
      <div class="slide-logo">
        <div class="slide-logo-badge">JA</div>
        <div class="slide-logo-text">
          <strong>Janeiro Advocacia</strong>
          <span>Direito Previdenciário</span>
        </div>
      </div>
      <div class="slide-title-tag">Detalhamento: Dobras 3 e 4</div>
    </div>

    <div>
      <div class="pill-badge">Segurança & Especialidade</div>
      <h2 class="slide-heading">Os 4 Pilares da Advocacia & 5 Áreas de Excelência</h2>
      <p class="slide-subtitle">
        Como o escritório se posiciona perante o mercado e quais especialidades previdenciárias são apresentadas com gavetas modais detalhadas.
      </p>
    </div>

    <div class="grid-2" style="flex: 1; align-items: stretch; margin-bottom: 2mm;">
      <!-- Pilares -->
      <div class="card-box" style="border-top: 3px solid #0D1B2A;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <h3 style="font-size: 15px; font-weight: 700; color: #0D1B2A;">Dobra 3: Os 4 Pilares do Método</h3>
          <span class="pill-badge">Diferenciação</span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
          <div style="background: #F8F7F2; padding: 7px 10px; border-radius: 6px; border-left: 2px solid #D4A359;">
            <div style="font-weight: 700; font-size: 10px; color: #0D1B2A;">1. Atuação Consultiva Ativa</div>
            <div style="font-size: 8.5px; color: #475569; margin-top: 2px;">Não esperar o INSS indeferir. Antecipar falhas de documentos e planejar o melhor momento financeiro.</div>
          </div>
          <div style="background: #F8F7F2; padding: 7px 10px; border-radius: 6px; border-left: 2px solid #D4A359;">
            <div style="font-weight: 700; font-size: 10px; color: #0D1B2A;">2. Rigor Matemático Exato</div>
            <div style="font-size: 8.5px; color: #475569; margin-top: 2px;">Cálculos atuariais e simulação de cenários de transição para garantir o maior teto de benefício viável.</div>
          </div>
          <div style="background: #F8F7F2; padding: 7px 10px; border-radius: 6px; border-left: 2px solid #D4A359;">
            <div style="font-weight: 700; font-size: 10px; color: #0D1B2A;">3. Atendimento Humanizado</div>
            <div style="font-size: 8.5px; color: #475569; margin-top: 2px;">Comunicação clara, sem termos difíceis. O cliente compreende cada centavo e cada decisão do processo.</div>
          </div>
          <div style="background: #F8F7F2; padding: 7px 10px; border-radius: 6px; border-left: 2px solid #D4A359;">
            <div style="font-weight: 700; font-size: 10px; color: #0D1B2A;">4. Advocacia Artesanal</div>
            <div style="font-size: 8.5px; color: #475569; margin-top: 2px;">Trabalho sob medida, sem produção em massa ou petições genéricas. Cada história de vida é única.</div>
          </div>
        </div>
      </div>

      <!-- Áreas de Atuação com Modais -->
      <div class="card-box gold-border">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <h3 style="font-size: 15px; font-weight: 700; color: #0D1B2A;">Dobra 4: 5 Áreas de Especialização</h3>
          <span class="pill-badge pill-gold">Modais Interativos</span>
        </div>
        <div style="font-size: 9.5px; color: #334155; line-height: 1.45;">
          <div style="padding: 4px 6px; background: #FAF9F5; border-radius: 4px; margin-bottom: 4px; border: 1px solid #EAE5DE;">
            <strong>1. Planejamento Previdenciário:</strong> Estudo técnico completo de carteira de trabalho, CNIS e cenários futuros para maximizar a renda da aposentadoria.
          </div>
          <div style="padding: 4px 6px; background: #FAF9F5; border-radius: 4px; margin-bottom: 4px; border: 1px solid #EAE5DE;">
            <strong>2. Aposentadorias do INSS:</strong> Idade, tempo de contribuição, pontos, pedágios, aposentadoria especial de insalubridade e rural.
          </div>
          <div style="padding: 4px 6px; background: #FAF9F5; border-radius: 4px; margin-bottom: 4px; border: 1px solid #EAE5DE;">
            <strong>3. Benefícios por Incapacidade:</strong> Auxílio por incapacidade temporária (auxílio-doença) e aposentadoria por invalidez revertidos judicialmente.
          </div>
          <div style="padding: 4px 6px; background: #FAF9F5; border-radius: 4px; margin-bottom: 4px; border: 1px solid #EAE5DE;">
            <strong>4. Revisões Previdenciárias:</strong> Identificação de períodos não contabilizados, cálculo incorreto de média e revisões de direito.
          </div>
          <div style="padding: 4px 6px; background: #FAF9F5; border-radius: 4px; border: 1px solid #EAE5DE;">
            <strong>5. Servidores Públicos (RPPS):</strong> Transição entre regimes, averbação de tempo de serviço e análise de paridade e integralidade.
          </div>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <div>Janeiro Advocacia & Consultoria • Detalhamento de Interface</div>
      <div>Dobras 3 e 4</div>
      <div>Página 05 de 12</div>
    </div>
  </div>

  <!-- ==========================================
       SLIDE 6: DETALHAMENTO DOBRAS 5 E 6 (PROCESSO E ADVOGADOS)
       ========================================== -->
  <div class="slide">
    <div class="slide-header">
      <div class="slide-logo">
        <div class="slide-logo-badge">JA</div>
        <div class="slide-logo-text">
          <strong>Janeiro Advocacia</strong>
          <span>Direito Previdenciário</span>
        </div>
      </div>
      <div class="slide-title-tag">Detalhamento: Dobras 5 e 6</div>
    </div>

    <div>
      <div class="pill-badge">Método & Autoridade</div>
      <h2 class="slide-heading">Como Funciona a Jornada & Os Advogados Sócios</h2>
      <p class="slide-subtitle">
        Transparência nas 4 etapas de atendimento e apresentação humana do Dr. André e da Dra. Isis com credenciais e propósitos declarados.
      </p>
    </div>

    <div class="grid-2" style="flex: 1; align-items: stretch; margin-bottom: 2mm;">
      <!-- Dobra 5: Linha do Tempo -->
      <div class="card-box" style="border-left: 3px solid #D4A359;">
        <div class="pill-badge pill-gold" style="margin-bottom: 6px;">Dobra 5: Linha do Tempo em 4 Passos</div>
        <div style="display: flex; flex-direction: column; gap: 7px; font-size: 9.5px;">
          <div style="background: #FDFCF9; border: 1px solid #EAE5DE; padding: 7px 9px; border-radius: 6px;">
            <strong style="color: #0D1B2A;">Passo 1: Diagnóstico Inicial & Triagem</strong>
            <p style="color: #64748B; margin-top: 1px;">Conversa detalhada via WhatsApp ou presencialmente em Umuarama para entender seu histórico profissional e objetivo.</p>
          </div>
          <div style="background: #FDFCF9; border: 1px solid #EAE5DE; padding: 7px 9px; border-radius: 6px;">
            <strong style="color: #0D1B2A;">Passo 2: Varredura de CNIS & Documentos</strong>
            <p style="color: #64748B; margin-top: 1px;">Auditoria minuciosa de cada contrato de trabalho, carnês e laudos médicos (PPP/LTCAT) para sanar falhas cadastrais.</p>
          </div>
          <div style="background: #FDFCF9; border: 1px solid #EAE5DE; padding: 7px 9px; border-radius: 6px;">
            <strong style="color: #0D1B2A;">Passo 3: Parecer Estratégico & Cálculo</strong>
            <p style="color: #64748B; margin-top: 1px;">Apresentação do mapa de cenários: a data exata para requerer e o valor previsto para cada modalidade de aposentadoria.</p>
          </div>
          <div style="background: #FDFCF9; border: 1px solid #EAE5DE; padding: 7px 9px; border-radius: 6px;">
            <strong style="color: #0D1B2A;">Passo 4: Protocolo & Concessão Segura</strong>
            <p style="color: #64748B; margin-top: 1px;">Acompanhamento até a implantação do benefício no INSS ou atuação técnica imediata perante a Justiça Federal.</p>
          </div>
        </div>
      </div>

      <!-- Dobra 6: Os Advogados com Fotos -->
      <div class="card-box" style="border-top: 3px solid #0D1B2A;">
        <div class="pill-badge" style="margin-bottom: 6px;">Dobra 6: Sobre os Sócios Titulares</div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
          <!-- Dr. André -->
          <div style="background: #FDFCF9; border: 1px solid #EAE5DE; padding: 8px; border-radius: 6px; text-align: center;">
            <img src="${drAndreBase64}" alt="Dr. André" style="width: 65px; height: 75px; object-fit: cover; border-radius: 6px; border: 1px solid #D4A359; margin-bottom: 4px;">
            <div style="font-weight: 700; font-size: 10px; color: #0D1B2A;">Dr. André L. L. Janeiro</div>
            <div style="font-size: 8px; color: #D4A359; font-weight: 600;">OAB/PR nº 84.395</div>
            <div style="font-size: 8px; color: #64748B; margin-top: 3px; line-height: 1.3;">Especialista em Direito Previdenciário pela Pontifícia Universidade Católica do Paraná (PUC/PR). Foco em cálculos e planejamento.</div>
          </div>
          <!-- Dra. Isis -->
          <div style="background: #FDFCF9; border: 1px solid #EAE5DE; padding: 8px; border-radius: 6px; text-align: center;">
            <img src="${draIsisBase64}" alt="Dra. Isis" style="width: 65px; height: 75px; object-fit: cover; border-radius: 6px; border: 1px solid #D4A359; margin-bottom: 4px;">
            <div style="font-weight: 700; font-size: 10px; color: #0D1B2A;">Dra. Isis N. D. Janeiro</div>
            <div style="font-size: 8px; color: #D4A359; font-weight: 600;">OAB/PR nº 82.230</div>
            <div style="font-size: 8px; color: #64748B; margin-top: 3px; line-height: 1.3;">Pós-graduada em Processo Civil (LFG) e Especialista em Prática da Advocacia Previdenciária (EBRADI). Foco contencioso e humano.</div>
          </div>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <div>Janeiro Advocacia & Consultoria • Detalhamento de Interface</div>
      <div>Dobras 5 e 6</div>
      <div>Página 06 de 12</div>
    </div>
  </div>

  <!-- ==========================================
       SLIDE 7: DETALHAMENTO DOBRAS 7 E 8 (AUTORIDADE E QUIZ)
       ========================================== -->
  <div class="slide">
    <div class="slide-header">
      <div class="slide-logo">
        <div class="slide-logo-badge">JA</div>
        <div class="slide-logo-text">
          <strong>Janeiro Advocacia</strong>
          <span>Direito Previdenciário</span>
        </div>
      </div>
      <div class="slide-title-tag">Detalhamento: Dobras 7 e 8</div>
    </div>

    <div>
      <div class="pill-badge">Engajamento & Interatividade</div>
      <h2 class="slide-heading">Prova Social Multicanal & Quiz de Diagnóstico</h2>
      <p class="slide-subtitle">
        A união de canais com conteúdo educativo no YouTube/Instagram e uma ferramenta interativa de autoavaliação que já entrega o lead pronto no WhatsApp.
      </p>
    </div>

    <div class="grid-2" style="flex: 1; align-items: stretch; margin-bottom: 2mm;">
      <!-- Dobra 7: Prova Social -->
      <div class="card-box" style="border-left: 3px solid #0D1B2A;">
        <div class="pill-badge" style="margin-bottom: 6px;">Dobra 7: Prova Social & Canais Digitais</div>
        <h3 style="font-size: 14px; font-weight: 700; color: #0D1B2A; margin-bottom: 6px;">Autoridade Pública Comprovada</h3>
        <p style="font-size: 9.5px; color: #475569; margin-bottom: 8px; line-height: 1.45;">
          A presença digital do escritório é pautada na transparência e no esclarecimento da população sobre a complexidade da legislação previdenciária.
        </p>
        <div style="display: flex; flex-direction: column; gap: 6px; font-size: 9px;">
          <div style="background: #F8F7F2; padding: 6px 10px; border-radius: 6px; border: 1px solid #EAE5DE;">
            <strong style="color: #0D1B2A;">🎥 YouTube Oficial:</strong> Vídeos educativos detalhando regras de transição, laudos periciais e direitos dos aposentados.
          </div>
          <div style="background: #F8F7F2; padding: 6px 10px; border-radius: 6px; border: 1px solid #EAE5DE;">
            <strong style="color: #0D1B2A;">📱 Instagram Dr. André (@andreljaneiro):</strong> Dicas diárias sobre planejamento previdenciário e cálculos do INSS.
          </div>
          <div style="background: #F8F7F2; padding: 6px 10px; border-radius: 6px; border: 1px solid #EAE5DE;">
            <strong style="color: #0D1B2A;">⚖️ Instagram Dra. Isis (@isis.janeiro):</strong> Orientações sobre benefícios por incapacidade, prazos judiciais e perícias.
          </div>
        </div>
      </div>

      <!-- Dobra 8: Quiz Interativo -->
      <div class="card-box gold-border">
        <div class="pill-badge pill-gold" style="margin-bottom: 6px;">Dobra 8: Diagnóstico Previdenciário Rápido</div>
        <h3 style="font-size: 14px; font-weight: 700; color: #0D1B2A; margin-bottom: 6px;">Quiz em 3 Etapas Dinâmicas</h3>
        <p style="font-size: 9.5px; color: #475569; margin-bottom: 8px; line-height: 1.45;">
          Substitui formulários frios por uma experiência agradável que qualifica o perfil do trabalhador e o encaminha para o WhatsApp com uma mensagem estruturada.
        </p>
        <div style="background: #FAF9F5; border: 1px solid #EAE5DE; border-radius: 6px; padding: 8px; font-size: 9px; line-height: 1.45;">
          <div style="margin-bottom: 4px;"><strong>Etapa 1: Qual o seu vínculo principal?</strong> (CLT / Carteira Assinada, Autônomo / MEI, Servidor Público, Empresário).</div>
          <div style="margin-bottom: 4px;"><strong>Etapa 2: Qual a sua principal urgência hoje?</strong> (Fazer planejamento, Benefício/Auxílio Negado, Aposentadoria Especial, Revisão).</div>
          <div style="margin-bottom: 4px;"><strong>Etapa 3: Há quanto tempo você contribui?</strong> (Menos de 15 anos, Entre 15 e 25 anos, Mais de 30 anos).</div>
          <div style="background: #0D1B2A; color: #D4A359; padding: 5px 8px; border-radius: 4px; margin-top: 6px; font-weight: 600;">
            📲 Envio Imediato: Gera link de WhatsApp customizado com as 3 respostas já montadas!
          </div>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <div>Janeiro Advocacia & Consultoria • Detalhamento de Interface</div>
      <div>Dobras 7 e 8</div>
      <div>Página 07 de 12</div>
    </div>
  </div>

  <!-- ==========================================
       SLIDE 8: DETALHAMENTO DOBRA 9 (NÚCLEO EDITORIAL E-E-A-T)
       ========================================== -->
  <div class="slide">
    <div class="slide-header">
      <div class="slide-logo">
        <div class="slide-logo-badge">JA</div>
        <div class="slide-logo-text">
          <strong>Janeiro Advocacia</strong>
          <span>Direito Previdenciário</span>
        </div>
      </div>
      <div class="slide-title-tag">Detalhamento: Dobra 9 (SEO E-E-A-T)</div>
    </div>

    <div>
      <div class="pill-badge">Autoridade Orgânica no Google & Autonomia Editorial</div>
      <h2 class="slide-heading">Núcleo de Artigos E-E-A-T & Painel CMS Integrado</h2>
      <p class="slide-subtitle">
        Páginas internas com Schema.org Article, aliadas ao Painel Administrativo com editor visual e upload de fotos do computador.
      </p>
    </div>

    <div class="grid-3" style="flex: 1; align-items: stretch; margin-bottom: 2mm;">
      <!-- Artigo 1 -->
      <div class="card-box" style="border-top: 3px solid #D4A359;">
        <span class="pill-badge">Artigo 01 • Transição</span>
        <h3 style="font-size: 13px; font-weight: 700; color: #0D1B2A; margin: 5px 0 4px 0; line-height: 1.25;">Regras de Transição da Aposentadoria</h3>
        <p style="font-size: 8.5px; color: #64748B; margin-bottom: 6px;">Guia Completo Pós-Reforma da Previdência (EC 103/2019)</p>
        <div style="background: #FDFCF9; border: 1px solid #EAE5DE; border-radius: 6px; padding: 6px 8px; font-size: 8.5px; color: #334155; line-height: 1.4;">
          <div style="margin-bottom: 3px;">• Explicação detalhada dos pedágios de 50% e 100%.</div>
          <div style="margin-bottom: 3px;">• Sistema de pontos (idade + tempo) e transição de idade mínima.</div>
          <div style="margin-bottom: 3px;">• Tabela comparativa e simulação prática de impacto no bolso.</div>
          <div>• <strong>CTA Contextual:</strong> Análise personalizada do caso pelo WhatsApp.</div>
        </div>
      </div>

      <!-- Artigo 2 -->
      <div class="card-box" style="border-top: 3px solid #0D1B2A;">
        <span class="pill-badge">Artigo 02 • Prevenção</span>
        <h3 style="font-size: 13px; font-weight: 700; color: #0D1B2A; margin: 5px 0 4px 0; line-height: 1.25;">Planejamento Previdenciário</h3>
        <p style="font-size: 8.5px; color: #64748B; margin-bottom: 6px;">Como Funciona e Por Que Evita Prejuízos Irreversíveis</p>
        <div style="background: #FDFCF9; border: 1px solid #EAE5DE; border-radius: 6px; padding: 6px 8px; font-size: 8.5px; color: #334155; line-height: 1.4;">
          <div style="margin-bottom: 3px;">• Demonstração de perdas de até centenas de milhares ao aposentar cedo demais.</div>
          <div style="margin-bottom: 3px;">• Como calcular o Retorno sobre Investimento (ROI) de recolhimentos futuros.</div>
          <div style="margin-bottom: 3px;">• Regularização de pendências, vínculos no CNIS e carnês extemporâneos.</div>
          <div>• <strong>CTA Contextual:</strong> Agendamento de diagnóstico de carteira.</div>
        </div>
      </div>

      <!-- Artigo 3 -->
      <div class="card-box" style="border-top: 3px solid #D4A359;">
        <span class="pill-badge">Artigo 03 • Contencioso</span>
        <h3 style="font-size: 13px; font-weight: 700; color: #0D1B2A; margin: 5px 0 4px 0; line-height: 1.25;">Benefício por Incapacidade Negado</h3>
        <p style="font-size: 8.5px; color: #64748B; margin-bottom: 6px;">Passo a Passo Para Reverter o Indeferimento do INSS</p>
        <div style="background: #FDFCF9; border: 1px solid #EAE5DE; border-radius: 6px; padding: 6px 8px; font-size: 8.5px; color: #334155; line-height: 1.4;">
          <div style="margin-bottom: 3px;">• O que fazer quando a perícia médica administrativa indeferir o pedido.</div>
          <div style="margin-bottom: 3px;">• Diferença técnica entre recurso administrativo e ação na Justiça Federal.</div>
          <div style="margin-bottom: 3px;">• Importância da prova pericial com médico perito especialista judicial.</div>
          <div>• <strong>CTA Contextual:</strong> Orientação urgente sobre laudos e prazos.</div>
        </div>
      </div>
    </div>

    <!-- Banner CMS -->
    <div style="background: #0D1B2A; color: #FAF9F5; border: 1px solid rgba(212, 163, 89, 0.45); border-radius: 8px; padding: 7px 12px; margin-top: 1.5mm; display: flex; align-items: center; justify-content: space-between; gap: 12px;">
      <div>
        <div style="color: #D4A359; font-size: 8.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; display: flex; align-items: center; gap: 6px;">
          <span>💻 Painel Administrativo CMS Integrado (/admin)</span>
          <span style="background: rgba(212,163,89,0.2); color: #FAF9F5; padding: 1px 6px; border-radius: 9999px; font-size: 7.5px;">Local-First + Nuvem</span>
        </div>
        <div style="font-size: 8.5px; color: #CBD5E1; margin-top: 2px; line-height: 1.35;">
          Autonomia completa para os advogados: editor visual com ferramentas de formatação, contador de SEO, gestão de FAQ e <strong>upload de fotos do computador</strong> com compressão inteligente.
        </div>
      </div>
      <div style="background: #D4A359; color: #0D1B2A; font-weight: 700; font-size: 8.5px; padding: 4px 10px; border-radius: 6px; white-space: nowrap;">
        Zero Dependência Técnica
      </div>
    </div>

    <div class="slide-footer">
      <div>Janeiro Advocacia & Consultoria • Detalhamento de Interface</div>
      <div>Dobra 9: Núcleo Editorial E-E-A-T</div>
      <div>Página 08 de 12</div>
    </div>
  </div>

  <!-- ==========================================
       SLIDE 9: DETALHAMENTO DOBRAS 10, 11 E 12 (FAQ E SEDE)
       ========================================== -->
  <div class="slide">
    <div class="slide-header">
      <div class="slide-logo">
        <div class="slide-logo-badge">JA</div>
        <div class="slide-logo-text">
          <strong>Janeiro Advocacia</strong>
          <span>Direito Previdenciário</span>
        </div>
      </div>
      <div class="slide-title-tag">Detalhamento: Dobras 10, 11 e 12</div>
    </div>

    <div>
      <div class="pill-badge">Conversão Final & Acessibilidade</div>
      <h2 class="slide-heading">FAQ Estratégico, Fechamento Ético e Sede Física</h2>
      <p class="slide-subtitle">
        Eliminação de atritos finais de contratação, consolidação da presença física em Umuarama e capacidade de atendimento 100% online em todo o território nacional.
      </p>
    </div>

    <div class="grid-3" style="flex: 1; align-items: stretch; margin-bottom: 2mm;">
      <!-- Dobra 10: FAQ -->
      <div class="card-box" style="border-top: 3px solid #0D1B2A;">
        <div class="pill-badge" style="margin-bottom: 6px;">Dobra 10: FAQ (10 Dúvidas)</div>
        <h3 style="font-size: 13px; font-weight: 700; color: #0D1B2A; margin-bottom: 6px;">Quebra de Objeções</h3>
        <div style="font-size: 8.5px; color: #334155; line-height: 1.4;">
          <div style="margin-bottom: 4px;">• <strong>Atendimento Online:</strong> Como funciona a assinatura digital e envio de documentos para clientes fora de Umuarama.</div>
          <div style="margin-bottom: 4px;">• <strong>Prazos do INSS:</strong> Explicação sobre mandado de segurança em caso de demora abusiva.</div>
          <div style="margin-bottom: 4px;">• <strong>Honorários Advocatícios:</strong> Política clara baseada nos parâmetros éticos da Tabela da OAB/PR.</div>
          <div>• <strong>Aposentadoria Já Concedida:</strong> Possibilidade de revisão dos últimos 10 anos.</div>
        </div>
      </div>

      <!-- Dobra 11: Chamada Final -->
      <div class="card-box gold-border">
        <div class="pill-badge pill-gold" style="margin-bottom: 6px;">Dobra 11: Fechamento Ético</div>
        <h3 style="font-size: 13px; font-weight: 700; color: #0D1B2A; margin-bottom: 6px;">Convite Acolhedor</h3>
        <p style="font-size: 9px; color: #475569; margin-bottom: 8px; line-height: 1.45;">
          Um bloco visualmente nobre que reforça que consultar um advogado previdenciário não é uma despesa, mas a proteção de décadas de suor e esforço.
        </p>
        <div style="background: #0D1B2A; color: #FAF9F5; border-radius: 6px; padding: 8px; font-size: 8.5px;">
          <div style="color: #D4A359; font-weight: 700; margin-bottom: 2px;">"Não deixe seu futuro nas mãos da burocracia."</div>
          <div>Botão destacado com WhatsApp direto e mensagem rastreada de encerramento de página.</div>
        </div>
      </div>

      <!-- Dobra 12: Sede Física -->
      <div class="card-box" style="border-top: 3px solid #0D1B2A;">
        <div class="pill-badge" style="margin-bottom: 6px;">Dobra 12: Sede Física & Mapa</div>
        <h3 style="font-size: 13px; font-weight: 700; color: #0D1B2A; margin-bottom: 6px;">Umuarama - PR</h3>
        <div style="font-size: 8.5px; color: #334155; line-height: 1.4;">
          <div style="margin-bottom: 4px;"><strong>Endereço:</strong> Rua Guadiana, nº 4061, Umuarama - PR, CEP 87501-020.</div>
          <div style="margin-bottom: 4px;"><strong>Telefones:</strong> (44) 98844-2379 | (44) 3622-2084.</div>
          <div style="margin-bottom: 4px;"><strong>Recursos:</strong> Mapa do Google incorporado, botões de rota direta no Waze e Google Maps para navegação veicular.</div>
          <div><strong>WhatsApp Flutuante:</strong> Ícone permanente no canto inferior direito para socorro rápido.</div>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <div>Janeiro Advocacia & Consultoria • Detalhamento de Interface</div>
      <div>Dobras 10, 11 e 12</div>
      <div>Página 09 de 12</div>
    </div>
  </div>

  <!-- ==========================================
       SLIDE 10: LEAD TRACKING NO WHATSAPP
       ========================================== -->
  <div class="slide">
    <div class="slide-header">
      <div class="slide-logo">
        <div class="slide-logo-badge">JA</div>
        <div class="slide-logo-text">
          <strong>Janeiro Advocacia</strong>
          <span>Direito Previdenciário</span>
        </div>
      </div>
      <div class="slide-title-tag">Fase 3: Inteligência de Leads</div>
    </div>

    <div>
      <div class="pill-badge">Rastreamento de Origem</div>
      <h2 class="slide-heading">Lead Tracking: Nenhum Contato Chega Sem Contexto</h2>
      <p class="slide-subtitle">
        Todos os botões do site e dos artigos contêm parâmetros codificados na URL do WhatsApp. A equipe da Janeiro Advocacia sabe exatamente onde o cliente estava navegando antes de dizer o primeiro "olá".
      </p>
    </div>

    <div style="flex: 1; margin-bottom: 2mm;">
      <table class="arch-table">
        <thead>
          <tr>
            <th style="width: 140px;">Ponto de Contato</th>
            <th style="width: 120px;">Elemento Visual</th>
            <th>Mensagem Pré-Formatada Enviada ao WhatsApp (44 98844-2379)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Hero Section</strong></td>
            <td>Botão Principal Topo</td>
            <td><em>"Olá, vim pelo site e gostaria de agendar uma análise."</em></td>
          </tr>
          <tr>
            <td><strong>Header & Menu</strong></td>
            <td>Botões de Topo / Menu</td>
            <td><em>"Olá, vim pelo site e gostaria de informações sobre atendimento previdenciário."</em></td>
          </tr>
          <tr>
            <td><strong>Áreas de Atuação</strong></td>
            <td>Modal Planejamento</td>
            <td><em>"Olá, vim pelo site e gostaria de saber mais sobre o Planejamento Previdenciário e agendar uma análise consultiva."</em></td>
          </tr>
          <tr>
            <td><strong>Áreas de Atuação</strong></td>
            <td>Modal Incapacidade</td>
            <td><em>"Olá, vim pelo site e tive meu benefício por incapacidade (auxílio-doença) negado no INSS, preciso de ajuda jurídica."</em></td>
          </tr>
          <tr>
            <td><strong>Quiz Interativo</strong></td>
            <td>Resultado da Etapa 3</td>
            <td><em>"Olá, vim pelo site e fiz o diagnóstico previdenciário! [Objetivo, Situação, Atendimento]..."</em></td>
          </tr>
          <tr>
            <td><strong>Artigos Clínicos/E-E-A-T</strong></td>
            <td>Banners dos Artigos</td>
            <td><em>"Olá, vim pelo site e li o artigo sobre [Tema], gostaria de tirar uma dúvida sobre o meu caso."</em></td>
          </tr>
          <tr>
            <td><strong>Botão Flutuante</strong></td>
            <td>Ícone Canto Inferior</td>
            <td><em>"Olá, vim pelo site e gostaria de tirar uma dúvida sobre meu benefício."</em></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="slide-footer">
      <div>Janeiro Advocacia & Consultoria • Inteligência Comercial</div>
      <div>Fase 3: Lead Tracking</div>
      <div>Página 10 de 12</div>
    </div>
  </div>

  <!-- ==========================================
       SLIDE 11: PROPOSTA COMERCIAL & JUSTIFICATIVA DE ROI
       ========================================== -->
  <div class="slide">
    <div class="slide-header">
      <div class="slide-logo">
        <div class="slide-logo-badge">JA</div>
        <div class="slide-logo-text">
          <strong>Janeiro Advocacia</strong>
          <span>Direito Previdenciário</span>
        </div>
      </div>
      <div class="slide-title-tag">Fase 6: Proposta Comercial & Retorno (ROI)</div>
    </div>

    <div>
      <div class="pill-badge pill-gold">Investimento & Viabilidade</div>
      <h2 class="slide-heading">Como o Consultório Digital se Paga no 1º Contrato</h2>
      <p class="slide-subtitle">
        Diferente de um gasto comum de marketing, o site de alta conversão é um ativo patrimonial do escritório que gera atração qualificada e se paga integralmente com um único cliente previdenciário.
      </p>
    </div>

    <div class="grid-2" style="flex: 1; align-items: stretch; margin-bottom: 2mm;">
      <!-- Estrutura da Proposta -->
      <div class="card-box" style="border-left: 3px solid #0D1B2A;">
        <span class="pill-badge" style="margin-bottom: 6px;">Estrutura do Investimento</span>
        <h3 style="font-size: 16px; font-weight: 700; color: #0D1B2A; margin-bottom: 4px;">Valor Total do Projeto: R$ 2.700,00</h3>
        <p style="font-size: 9.5px; color: #64748B; margin-bottom: 8px;">Condição facilitada de implantação e governança contínua:</p>

        <div style="background: #FDFCF9; border: 1px solid #EAE5DE; border-radius: 6px; padding: 8px 10px; margin-bottom: 6px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <strong style="font-size: 11px; color: #0D1B2A;">Entrada de Implantação:</strong>
            <span style="font-size: 13px; font-weight: 700; color: #D4A359;">R$ 700,00</span>
          </div>
          <div style="font-size: 8.5px; color: #64748B; margin-top: 2px;">Cobre desenvolvimento, direção de arte, 12 dobras, Painel Administrativo CMS (artigos, FAQ e upload de fotos), 3 artigos E-E-A-T, SEO e configuração Git.</div>
        </div>

        <div style="background: #FDFCF9; border: 1px solid #EAE5DE; border-radius: 6px; padding: 8px 10px; margin-bottom: 6px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <strong style="font-size: 11px; color: #0D1B2A;">Manutenção & Hospedagem:</strong>
            <span style="font-size: 13px; font-weight: 700; color: #0D1B2A;">12x de R$ 166,67</span>
          </div>
          <div style="font-size: 8.5px; color: #64748B; margin-top: 2px;">Hospedagem global ultrarrápida Edge CDN, certificado SSL, suporte técnico mensal e governança do GEMINI.md.</div>
        </div>

        <div style="font-size: 8.5px; color: #64748B; line-height: 1.35;">
          * Valor acessível que dilui o custo ao longo de 1 ano enquanto o escritório usufrui de uma máquina de autoridade digital permanente.
        </div>
      </div>

      <!-- Demonstração de ROI -->
      <div class="card-box gold-border">
        <span class="pill-badge pill-gold" style="margin-bottom: 6px;">Matemática do Retorno (ROI)</span>
        <h3 style="font-size: 16px; font-weight: 700; color: #0D1B2A; margin-bottom: 4px;">A Lógica Financeira Imbatível</h3>
        <p style="font-size: 9.5px; color: #64748B; margin-bottom: 8px;">Comparativo de honorários médios da advocacia previdenciária:</p>

        <div style="display: flex; flex-direction: column; gap: 6px; font-size: 9px;">
          <div style="background: #FAF9F5; padding: 6px 8px; border-radius: 4px; border: 1px solid #EAE5DE;">
            <div style="display: flex; justify-content: space-between;">
              <strong>1 Planejamento Previdenciário:</strong>
              <span style="color: #0D1B2A; font-weight: 700;">R$ 2.000 a R$ 4.500</span>
            </div>
            <div style="color: #64748B; font-size: 8px;">Um único cliente de planejamento contratado pelo site cobre 100% do projeto.</div>
          </div>

          <div style="background: #FAF9F5; padding: 6px 8px; border-radius: 4px; border: 1px solid #EAE5DE;">
            <div style="display: flex; justify-content: space-between;">
              <strong>1 Ação Judicial de Concessão:</strong>
              <span style="color: #0D1B2A; font-weight: 700;">R$ 4.000 a R$ 15.000+</span>
            </div>
            <div style="color: #64748B; font-size: 8px;">Honorários sobre parcelas vencidas (atrasados) geram retorno de 200% a 500% sobre o investimento.</div>
          </div>

          <div style="background: #0D1B2A; color: #FAF9F5; padding: 8px; border-radius: 6px; margin-top: 2px;">
            <div style="color: #D4A359; font-weight: 700; font-size: 10px;">Veredito Financeiro:</div>
            <div style="font-size: 8.5px; line-height: 1.35; margin-top: 2px;">
              Com apenas <strong>1 novo cliente a cada trimestre</strong>, o site já proporciona um retorno sobre investimento (ROI) astronômico, operando no lucro a partir do primeiro mês.
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <div>Investimento Total: R$ 2.700,00 (R$ 700 entrada + 12x R$ 166,67)</div>
      <div>Janeiro Advocacia & Consultoria • Direito Previdenciário</div>
      <div>Página 11 de 12</div>
    </div>
  </div>

  <!-- ==========================================
       SLIDE 12: CONTRACAPA & PRÓXIMOS PASSOS
       ========================================== -->
  <div class="slide" style="background: radial-gradient(circle at center, #1E2E42 0%, #0D1B2A 70%, #08111B 100%); color: #FAF9F5; text-align: center; justify-content: center; align-items: center; padding: 24mm 24mm 16mm 24mm;">
    <div style="max-width: 650px; margin: auto;">
      <div class="slide-logo-badge" style="width: 58px; height: 58px; font-size: 26px; margin: 0 auto 16px auto; border-color: #D4A359;">JA</div>
      
      <span class="pill-badge pill-gold" style="margin-bottom: 10px; font-size: 9.5px; padding: 4px 12px;">Conclusão & Prontidão para Publicação</span>
      <h2 style="font-size: 40px; font-weight: 500; color: #FAF9F5; line-height: 1.15; margin: 10px 0 16px 0;">
        A Autoridade e a Tradição da Janeiro Advocacia no Padrão Digital Supremo.
      </h2>
      
      <p style="font-size: 13.5px; color: #CBD5E1; font-weight: 300; line-height: 1.6; margin-bottom: 24px;">
        Um consultório digital pronto para proteger os direitos do segurado, gerar agendamentos qualificados e consolidar o escritório como a grande referência previdenciária de Umuarama e do Brasil.
      </p>

      <div style="display: inline-flex; align-items: center; gap: 14px; padding: 10px 22px; background: rgba(255,255,255,0.06); border: 1px solid rgba(212, 163, 89, 0.4); border-radius: 9999px; font-size: 11px; color: #FAF9F5;">
        <span><strong>Dr. André Janeiro</strong> (OAB/PR 84.395)</span>
        <span style="color: #D4A359;">•</span>
        <span><strong>Dra. Isis Janeiro</strong> (OAB/PR 82.230)</span>
        <span style="color: #D4A359;">•</span>
        <span>Umuarama - PR</span>
      </div>
    </div>

    <div class="slide-footer" style="width: 100%; border-top-color: rgba(212, 163, 89, 0.25); color: #94A3B8;">
      <div>Janeiro Advocacia & Consultoria • Projeto Consultório Digital de Alta Conversão</div>
      <div>Setembro de 2026</div>
      <div>Página 12 de 12</div>
    </div>
  </div>

</body>
</html>
`;

// 3. Salvar o HTML
const htmlPath = path.join(__dirname, 'apresentacao_deck_print.html');
fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
console.log('HTML gerado com sucesso em: ' + htmlPath);

// Salvar também a versão interativa web (apresentacao.html)
const webHtml = htmlContent.replace(/@page\s*\{[^}]+\}/g, '').replace(/page-break-after:\s*always;/g, 'margin-bottom: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); border-radius: 12px;');
fs.writeFileSync(path.join(__dirname, 'apresentacao.html'), webHtml, 'utf-8');
console.log('apresentacao.html gerado com sucesso.');

// 4. Disparar o Microsoft Edge Headless para gerar o PDF
const tempPdfPath = path.join(__dirname, 'temp_deck_render.pdf');
const finalPdfPath = path.join(__dirname, 'Apresentacao_Janeiro_Advocacia.pdf');
const altPdfPath = path.join(__dirname, 'Apresentacao_Janeiro_Advocacia_Atualizada.pdf');
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

console.log('Iniciando renderização de alta qualidade do PDF via Microsoft Edge...');
const cmd = `"${edgePath}" --headless --disable-gpu --print-to-pdf="${tempPdfPath}" --no-pdf-header-footer "file:///${htmlPath.replace(/\\\\/g, '/')}"`;

try {
  execSync(cmd);
  if (!fs.existsSync(tempPdfPath)) {
    throw new Error('Arquivo temp_deck_render.pdf não foi criado pelo Edge.');
  }
  const stats = fs.statSync(tempPdfPath);
  console.log('PDF gerado no arquivo temporário: ' + stats.size + ' bytes');
  
  // Tentar atualizar Apresentacao_Janeiro_Advocacia.pdf no scratch
  let savedPath = finalPdfPath;
  try {
    fs.copyFileSync(tempPdfPath, finalPdfPath);
    console.log('Apresentacao_Janeiro_Advocacia.pdf atualizado com sucesso no scratch.');
  } catch (errCopy) {
    console.warn('Aviso: Apresentacao_Janeiro_Advocacia.pdf está aberto em outro programa. Salvando como Apresentacao_Janeiro_Advocacia_Atualizada.pdf');
    fs.copyFileSync(tempPdfPath, altPdfPath);
    savedPath = altPdfPath;
  }

  // Copiar para o diretório de artifacts do brain
  const brainDir = 'C:\\Users\\Usuário\\.gemini\\antigravity\\brain\\8cc9253e-f1bc-404e-a07c-96fa1d05c8b2';
  const brainPdf = path.join(brainDir, 'Apresentacao_Janeiro_Advocacia.pdf');
  const brainPdfAlt = path.join(brainDir, 'Apresentacao_Janeiro_Advocacia_Atualizada.pdf');
  try {
    fs.copyFileSync(tempPdfPath, brainPdf);
    console.log('Cópia sincronizada no brain: ' + brainPdf);
  } catch (e) {
    console.warn('Brain PDF padrão ocupado, salvando alternativo...');
  }
  fs.copyFileSync(tempPdfPath, brainPdfAlt);

  // Remover arquivo temporário
  fs.unlinkSync(tempPdfPath);
  console.log('Processo de geração concluído com sucesso!');
} catch (err) {
  console.error('Erro ao gerar o PDF:', err);
  process.exit(1);
}
