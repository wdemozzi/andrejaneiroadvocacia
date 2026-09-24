/**
 * JANEIRO ADVOCACIA & CONSULTORIA PREVIDENCIÁRIA
 * Interatividade: Header Glassmorphism, FAQ, Modais de Áreas e Quiz de Diagnóstico
 */

// ==========================================================================
// SMOOTH SCROLLING EDITORIAL (LENIS) — LEVEZA & INÉRCIA FLUIDA
// ==========================================================================
let lenis = null;

if (typeof Lenis !== 'undefined') {
  lenis = new Lenis({
    duration: 1.25, // Inércia suave e amortecida (estética de luxo editorial)
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Curva exponencial macia
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.92, // Roda do mouse amortecida sem trancos
    touchMultiplier: 1.3,
    infinite: false,
    autoRaf: true,
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Conectar âncoras para rolagem fluida e precisa compensando o header (-80px)
  if (lenis) {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== '#' && targetId.startsWith('#')) {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            lenis.scrollTo(targetEl, {
              offset: -80,
              duration: 1.25,
            });
          }
        }
      });
    });
  }
  // 1. Inicializar Ícones Lucide
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Header Glassmorphism no Scroll
  const mainHeader = document.getElementById('main-header');
  if (mainHeader) {
    const handleScroll = () => {
      const scrollY = lenis ? lenis.scroll : window.scrollY;
      if (scrollY > 40) {
        mainHeader.classList.add('header-scrolled');
      } else {
        mainHeader.classList.remove('header-scrolled');
      }
    };
    if (lenis) {
      lenis.on('scroll', handleScroll);
    } else {
      window.addEventListener('scroll', handleScroll);
    }
  }

  // 3. Menu Mobile Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('hidden');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 4. FAQ Accordion Interativo
  bindFaqAccordionListeners();

  // 4.1. Hidratação Dinâmica do CMS (Artigos & FAQ)
  initCMSHydration();

  // 5. Reveal on Scroll (Animações suaves de entrada)
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-visible'));
  }
});

// ==========================================================================
// 6. DADOS & CONTROLE DOS MODAIS DE ÁREAS DE ATUAÇÃO
// ==========================================================================
const areasData = {
  planejamento: {
    tag: "Serviço Consultivo Preventivo",
    title: "Planejamento Previdenciário Estratégico",
    badge: "Evite Perder Dinheiro",
    description: "O planejamento previdenciário é um estudo aprofundado do histórico contributivo do segurado, projetando diferentes cenários futuros de aposentadoria para indicar exatamente quando e quanto contribuir para obter o benefício mais lucrativo.",
    points: [
      "Simulação matemática detalhada de todas as regras de transição da Reforma da Previdência.",
      "Identificação de inconsistências e períodos não averbados no CNIS que travam pedidos.",
      "Análise de retorno financeiro (ROI): saber exatamente se vale a pena aumentar ou diminuir as contribuições.",
      "Prevenção contra aposentadorias precoces com redução brusca por fator previdenciário ou coeficientes baixos."
    ],
    whatsappMsg: "Olá, vim pelo site e gostaria de saber mais sobre o Planejamento Previdenciário e agendar uma análise consultiva."
  },
  aposentadorias: {
    tag: "Requerimentos INSS & Servidores",
    title: "Aposentadorias do Regime Geral e Próprio (RPPS)",
    badge: "Administrativo & Judicial",
    description: "Atuação completa para concessão de aposentadorias, desde a conferência documental e protocolos administrativos no INSS até ações judiciais contra negativas indevidas.",
    points: [
      "Aposentadoria por Idade Urbana, Híbrida e Rural (sem necessidade de contribuição direta para pequenos produtores).",
      "Aposentadoria Especial para trabalhadores expostos a agentes nocivos (insalubridade e periculosidade) com conversão de tempo comum.",
      "Aposentadorias de Servidores Públicos municipais, estaduais e federais (Regimes Próprios).",
      "Aposentadoria da Pessoa com Deficiência (PcD) com contagem de tempo reduzida."
    ],
    whatsappMsg: "Olá, vim pelo site e gostaria de orientação jurídica para dar entrada no meu pedido de aposentadoria."
  },
  incapacidade: {
    tag: "Benefícios por Incapacidade",
    title: "Auxílio por Incapacidade Temporária & Auxílio-Acidente",
    badge: "Reversão de Negativas",
    description: "Defesa dos direitos do trabalhador que foi impedido de exercer suas funções por motivo de doença ou acidente, revertendo altas médicas programadas e laudos injustos da perícia médica do INSS.",
    points: [
      "Auxílio por Incapacidade Temporária (antigo auxílio-doença comum ou acidentário).",
      "Aposentadoria por Incapacidade Permanente (antiga invalidez) e adicional de 25% para assistência de terceiros.",
      "Auxílio-Acidente: indenização mensal cumulativa com o salário para segurados que ficaram com sequelas redutoras de capacidade.",
      "Preparação técnica e documental para a perícia médica e judicial com quesitos específicos."
    ],
    whatsappMsg: "Olá, vim pelo site e tive meu benefício por incapacidade (auxílio-doença) negado no INSS, preciso de ajuda jurídica."
  },
  bpc: {
    tag: "Assistência Social",
    title: "BPC / LOAS (Idosos e Pessoas com Deficiência)",
    badge: "Benefício Assistencial",
    description: "Garantia de 1 salário mínimo mensal para idosos a partir de 65 anos ou pessoas com impedimento de longo prazo (físico, mental, intelectual ou sensorial) em situação de vulnerabilidade, mesmo sem nunca ter contribuído para o INSS.",
    points: [
      "Avaliação jurídica detalhada dos requisitos de renda per capita familiar e despesas com saúde.",
      "Defesa de pessoas no espectro autista (TEA), doenças crônicas incapacitantes e deficiências invisíveis.",
      "Combate ao corte arbitrário do benefício por averiguações cadastrais do CadÚnico.",
      "Requerimento administrativo e ações judiciais com pedido de tutela de urgência."
    ],
    whatsappMsg: "Olá, vim pelo site e gostaria de saber se minha família tem direito ao benefício BPC/LOAS."
  },
  revisoes: {
    tag: "Recuperação de Valores",
    title: "Revisões de Benefícios & Cálculos de Liquidação",
    badge: "Correção de Erros",
    description: "Análise minuciosa de cartas de concessão e memórias de cálculo do INSS para identificar erros materiais, descartes incorretos de salários ou inclusão de tempos que aumentam o valor da aposentadoria já recebida.",
    points: [
      "Cálculos de liquidação de sentença previdenciária e cobrança de valores atrasados (RPVs e Precatórios).",
      "Revisão da Vida Toda, Revisão do Teto e Revisão de Atividades Concomitantes.",
      "Revisão para inclusão de tempo militar, período rural e tempo trabalhado em regime insalubre sem conversão.",
      "Pareceres técnicos e cálculos periciais para outros advogados e escritórios parceiros."
    ],
    whatsappMsg: "Olá, vim pelo site e já recebo aposentadoria do INSS, gostaria de analisar se meu benefício tem direito a revisão."
  }
};

function openAreaModal(areaKey) {
  const data = areasData[areaKey];
  if (!data) return;

  const modalBackdrop = document.getElementById('area-modal');
  const modalTag = document.getElementById('modal-tag');
  const modalTitle = document.getElementById('modal-title');
  const modalBadge = document.getElementById('modal-badge');
  const modalDesc = document.getElementById('modal-desc');
  const modalPoints = document.getElementById('modal-points');
  const modalCta = document.getElementById('modal-cta');

  if (modalTag) modalTag.textContent = data.tag;
  if (modalTitle) modalTitle.textContent = data.title;
  if (modalBadge) modalBadge.textContent = data.badge;
  if (modalDesc) modalDesc.textContent = data.description;

  if (modalPoints) {
    modalPoints.innerHTML = '';
    data.points.forEach(point => {
      const li = document.createElement('li');
      li.className = 'relative pl-5 text-sm text-slate-600 leading-relaxed';
      li.innerHTML = `<span class="absolute left-0 text-amber-600 font-bold">✓</span>${point}`;
      modalPoints.appendChild(li);
    });
  }

  if (modalCta) {
    const encoded = encodeURIComponent(data.whatsappMsg);
    modalCta.href = `https://wa.me/5544988442379?text=${encoded}`;
  }

  if (modalBackdrop) {
    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (lenis) lenis.stop();
  }
}

function closeAreaModal() {
  const modalBackdrop = document.getElementById('area-modal');
  if (modalBackdrop) {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
    if (lenis) lenis.start();
  }
}

// Fechar com tecla ESC ou clique fora
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeAreaModal();
});

// ==========================================================================
// 7. FERRAMENTA INTERATIVA: DIAGNÓSTICO PREVIDENCIÁRIO EM 3 ETAPAS
// ==========================================================================
let quizStep = 1;
const quizAnswers = {
  objetivo: '',
  situacao: '',
  atendimento: ''
};

function selectQuizOption(step, value, element) {
  // Salvar resposta
  if (step === 1) quizAnswers.objetivo = value;
  if (step === 2) quizAnswers.situacao = value;
  if (step === 3) quizAnswers.atendimento = value;

  // Destacar botão clicado
  const parent = element.parentElement;
  parent.querySelectorAll('.quiz-option').forEach(btn => {
    btn.classList.remove('border-amber-600', 'bg-amber-50', 'text-slate-900', 'font-semibold');
    btn.classList.add('border-slate-200', 'bg-white', 'text-slate-700');
  });
  element.classList.remove('border-slate-200', 'bg-white', 'text-slate-700');
  element.classList.add('border-amber-600', 'bg-amber-50', 'text-slate-900', 'font-semibold');

  // Próximo passo com delay suave
  setTimeout(() => {
    goToNextQuizStep();
  }, 280);
}

function goToNextQuizStep() {
  quizStep++;
  const step1 = document.getElementById('quiz-step-1');
  const step2 = document.getElementById('quiz-step-2');
  const step3 = document.getElementById('quiz-step-3');
  const stepResult = document.getElementById('quiz-step-result');
  const stepProgress = document.getElementById('quiz-progress-bar');
  const stepLabel = document.getElementById('quiz-step-label');

  if (quizStep === 2) {
    if (step1) step1.classList.add('hidden');
    if (step2) step2.classList.remove('hidden');
    if (stepProgress) stepProgress.style.width = '66%';
    if (stepLabel) stepLabel.textContent = 'Etapa 2 de 3';
  } else if (quizStep === 3) {
    if (step2) step2.classList.add('hidden');
    if (step3) step3.classList.remove('hidden');
    if (stepProgress) stepProgress.style.width = '100%';
    if (stepLabel) stepLabel.textContent = 'Etapa 3 de 3';
  } else if (quizStep >= 4) {
    if (step3) step3.classList.add('hidden');
    if (stepResult) stepResult.classList.remove('hidden');
    renderQuizResult();
  }
}

function renderQuizResult() {
  const resultSummary = document.getElementById('quiz-result-summary');
  const whatsappCta = document.getElementById('quiz-whatsapp-cta');

  let recomendacao = "";
  if (quizAnswers.objetivo.includes("Planejamento")) {
    recomendacao = "Seu perfil é ideal para um <strong>Planejamento Previdenciário completo</strong>. Antes de requerer no INSS, é fundamental simular as regras de transição para garantir que você não perca até 40% do valor do seu benefício.";
  } else if (quizAnswers.objetivo.includes("Negado")) {
    recomendacao = "Negativas do INSS frequentemente decorrem de perícias superficiais ou falta de documentos técnicos. Seu caso exige <strong>análise processual urgente</strong> para verificação de prazo recursal ou ação judicial.";
  } else if (quizAnswers.objetivo.includes("Revisar")) {
    recomendacao = "Benefícios concedidos nos últimos 10 anos podem conter descartes indevidos de salários ou falta de averbação de tempo insalubre/rural. Recomendamos a <strong>revisão de cálculos da sua Carta de Concessão</strong>.";
  } else {
    recomendacao = "A entrada no benefício exige análise prévia do seu extrato CNIS para evitar pendências que travam a concessão por meses. Recomendamos a <strong>avaliação prévia da documentação</strong>.";
  }

  if (resultSummary) {
    resultSummary.innerHTML = `
      <div class="p-4 rounded-xl bg-amber-50 border border-amber-200 text-sm text-slate-800 leading-relaxed mb-4">
        <p class="font-semibold text-amber-900 mb-1">Diagnóstico Preliminar Concluído:</p>
        <p>${recomendacao}</p>
      </div>
      <div class="text-xs text-slate-500 space-y-1">
        <div>• <strong>Objetivo:</strong> ${quizAnswers.objetivo}</div>
        <div>• <strong>Histórico:</strong> ${quizAnswers.situacao}</div>
        <div>• <strong>Preferência de Atendimento:</strong> ${quizAnswers.atendimento}</div>
      </div>
    `;
  }

  if (whatsappCta) {
    const msg = `Olá, vim pelo site e fiz o diagnóstico previdenciário!\n\n• Objetivo: ${quizAnswers.objetivo}\n• Situação: ${quizAnswers.situacao}\n• Atendimento: ${quizAnswers.atendimento}\n\nGostaria de agendar uma consulta para avaliar meu caso.`;
    whatsappCta.href = `https://wa.me/5544988442379?text=${encodeURIComponent(msg)}`;
  }
}

function restartQuiz() {
  quizStep = 1;
  quizAnswers.objetivo = '';
  quizAnswers.situacao = '';
  quizAnswers.atendimento = '';

  const step1 = document.getElementById('quiz-step-1');
  const step2 = document.getElementById('quiz-step-2');
  const step3 = document.getElementById('quiz-step-3');
  const stepResult = document.getElementById('quiz-step-result');
  const stepProgress = document.getElementById('quiz-progress-bar');
  const stepLabel = document.getElementById('quiz-step-label');

  if (step1) step1.classList.remove('hidden');
  if (step2) step2.classList.add('hidden');
  if (step3) step3.classList.add('hidden');
  if (stepResult) stepResult.classList.add('hidden');
  if (stepProgress) stepProgress.style.width = '33%';
  if (stepLabel) stepLabel.textContent = 'Etapa 1 de 3';
}

// ==========================================================================
// 8. INTERATIVIDADE DO FAQ ACCORDION (REUTILIZÁVEL)
// ==========================================================================
function bindFaqAccordionListeners() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-button');
    if (btn && !btn._hasClickListener) {
      btn._hasClickListener = true;
      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Fecha outros itens para elegância
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
            const otherBtn = otherItem.querySelector('.faq-button');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });

        // Alterna o item clicado
        if (isActive) {
          item.classList.remove('active');
          btn.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('active');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });
}

// ==========================================================================
// 9. HIDRATAÇÃO DINÂMICA DO CMS (OPÇÃO 1: LOCAL-FIRST + SUPABASE)
// ==========================================================================
async function initCMSHydration() {
  try {
    // 1. Hidratar Artigos (localStorage ou fallback padrão)
    let artigos = null;
    const localArtigos = localStorage.getItem('ja_artigos');
    if (localArtigos) {
      try {
        const parsed = JSON.parse(localArtigos);
        if (Array.isArray(parsed) && parsed.length > 0) {
          artigos = parsed;
        }
      } catch (e) {}
    }

    if (!artigos && typeof window !== 'undefined' && window.DEFAULT_ARTIGOS) {
      artigos = window.DEFAULT_ARTIGOS;
      localStorage.setItem('ja_artigos', JSON.stringify(artigos));
    }

    if (artigos && artigos.length > 0) {
      renderPublicArticles(artigos);
    }

    // 2. Hidratar FAQ (localStorage ou fallback padrão)
    let faqs = null;
    const localFaq = localStorage.getItem('ja_faq');
    if (localFaq) {
      try {
        const parsedFaq = JSON.parse(localFaq);
        if (Array.isArray(parsedFaq) && parsedFaq.length > 0) {
          faqs = parsedFaq;
        }
      } catch (e) {}
    }

    if (!faqs && typeof window !== 'undefined' && window.DEFAULT_FAQ) {
      faqs = window.DEFAULT_FAQ;
      localStorage.setItem('ja_faq', JSON.stringify(faqs));
    }

    if (faqs && faqs.length > 0) {
      renderPublicFaq(faqs);
    }

    // 3. Sincronização em Nuvem (Supabase) em segundo plano, se configurada
    const supabaseConfig = localStorage.getItem('ja_supabase_config');
    if (supabaseConfig) {
      try {
        const config = JSON.parse(supabaseConfig);
        if (config.url && config.key) {
          syncPublicFromSupabase(config);
        }
      } catch (e) {}
    }
  } catch (err) {
    console.error('Falha na inicialização do CMS no site público:', err);
  }
}

function renderPublicArticles(artigos) {
  const container = document.getElementById('artigos-grid');
  if (!container || !artigos || artigos.length === 0) return;

  container.innerHTML = artigos.map(art => {
    const linkUrl = art.urlEstatica ? art.urlEstatica : `artigos/artigo.html?slug=${art.slug}`;
    const readingTime = art.tempoLeitura || '5 min de leitura';
    const category = art.categoria || 'Direito Previdenciário';

    return `
      <article class="card-premium flex flex-col justify-between overflow-hidden group reveal-on-scroll is-visible">
        <div class="p-6">
          <span class="px-2.5 py-1 rounded-full bg-gold-light text-gold-dark text-[10px] uppercase tracking-wider font-bold mb-3 inline-block">
            ${escapeHtmlPublic(category)}
          </span>
          <div class="flex items-center gap-2 text-xs text-warmgray mb-2">
            <i data-lucide="clock" class="w-3.5 h-3.5"></i>
            <span>${escapeHtmlPublic(readingTime)}</span>
          </div>
          <h3 class="font-serif text-xl sm:text-2xl text-navy font-semibold group-hover:text-gold-dark transition-colors mb-2.5 leading-snug">
            ${escapeHtmlPublic(art.titulo)}
          </h3>
          <p class="text-warmgray text-xs sm:text-sm font-light leading-relaxed line-clamp-3 mb-4">
            ${escapeHtmlPublic(art.resumo || '')}
          </p>
        </div>
        <div class="px-6 pb-6 pt-0">
          <a href="${linkUrl}" class="inline-flex items-center gap-2 text-xs uppercase tracking-editorial font-bold text-navy group-hover:text-gold-dark transition-colors">
            <span>Ler Artigo Completo</span>
            <i data-lucide="arrow-right" class="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform text-gold"></i>
          </a>
        </div>
      </article>
    `;
  }).join('');

  if (window.lucide) window.lucide.createIcons();
}

function renderPublicFaq(faqs) {
  const container = document.getElementById('faq-accordion-list');
  if (!container || !faqs || faqs.length === 0) return;

  container.innerHTML = faqs.map((faq, index) => {
    return `
      <div class="faq-item">
        <button class="faq-button" aria-expanded="false">
          <span>${escapeHtmlPublic(faq.pergunta)}</span>
          <i data-lucide="chevron-down" class="faq-icon w-5 h-5 text-gold-dark transition-transform flex-shrink-0 ml-4"></i>
        </button>
        <div class="faq-answer">
          <p class="text-sm text-warmgray leading-relaxed font-light">
            ${escapeHtmlPublic(faq.resposta)}
          </p>
        </div>
      </div>
    `;
  }).join('');

  if (window.lucide) window.lucide.createIcons();
  bindFaqAccordionListeners();
}

async function syncPublicFromSupabase(config) {
  let { url, key } = config;
  if (!url || !key) return;
  url = url.trim().replace(/\/+$/, '').replace(/\/rest\/v1\/?$/i, '').replace(/\/+$/, '');
  try {
    // Sincronizar Artigos
    const resArt = await fetch(`${url}/rest/v1/artigos?select=*&order=data_publicacao.desc`, {
      headers: { 'apikey': key, 'Authorization': `Bearer ${key}` }
    });
    if (resArt.ok) {
      const remoteArtigos = await resArt.json();
      if (remoteArtigos && remoteArtigos.length > 0) {
        const mapped = remoteArtigos.map(r => ({
          id: r.id,
          slug: r.slug,
          titulo: r.titulo,
          categoria: r.categoria,
          resumo: r.resumo,
          imagem: r.imagem,
          autor: r.autor,
          autorOab: r.autor_oab,
          dataPublicacao: r.data_publicacao,
          tempoLeitura: r.tempo_leitura,
          conteudoHtml: r.conteudo_html,
          urlEstatica: r.url_estatica || ''
        }));
        localStorage.setItem('ja_artigos', JSON.stringify(mapped));
        renderPublicArticles(mapped);
      }
    }

    // Sincronizar FAQ
    const resFaq = await fetch(`${url}/rest/v1/faq?select=*`, {
      headers: { 'apikey': key, 'Authorization': `Bearer ${key}` }
    });
    if (resFaq.ok) {
      const remoteFaq = await resFaq.json();
      if (remoteFaq && remoteFaq.length > 0) {
        const mappedFaq = remoteFaq.map(f => ({
          id: f.id,
          pergunta: f.pergunta,
          resposta: f.resposta
        }));
        localStorage.setItem('ja_faq', JSON.stringify(mappedFaq));
        renderPublicFaq(mappedFaq);
      }
    }
  } catch (err) {
    console.warn('Sync público silencioso Supabase:', err);
  }
}

function escapeHtmlPublic(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

