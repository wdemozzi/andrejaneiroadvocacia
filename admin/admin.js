/**
 * JANEIRO ADVOCACIA & CONSULTORIA PREVIDENCIÁRIA
 * Painel Administrativo CMS (admin.js)
 * Arquitetura Híbrida: Local-first (localStorage) + Sincronização em Nuvem (Supabase)
 */

// ============================================================================
// 1. AUTENTICAÇÃO E GUARDA DE SESSÃO
// ============================================================================
(function checkAuth() {
  const session = sessionStorage.getItem('ja_admin_session') || localStorage.getItem('ja_admin_session');
  if (!session) {
    window.location.href = 'login.html';
    return;
  }
  try {
    const data = JSON.parse(session);
    if (!data || !data.token) {
      window.location.href = 'login.html';
      return;
    }
  } catch (err) {
    window.location.href = 'login.html';
  }
})();

function handleLogout() {
  if (confirm('Deseja realmente sair do painel administrativo?')) {
    sessionStorage.removeItem('ja_admin_session');
    localStorage.removeItem('ja_admin_session');
    window.location.href = 'login.html';
  }
}

// ============================================================================
// 2. ESTADO GLOBAL E CONSTANTES
// ============================================================================
let state = {
  artigos: [],
  faq: [],
  activeTab: 'tab-artigos',
  supabaseConfig: {
    url: '',
    key: ''
  }
};

const STORAGE_KEYS = {
  ARTIGOS: 'ja_artigos',
  FAQ: 'ja_faq',
  SUPABASE: 'ja_supabase_config'
};

// ============================================================================
// 3. INICIALIZAÇÃO DA APLICAÇÃO
// ============================================================================
document.addEventListener('DOMContentLoaded', async () => {
  // Inicializa ícones
  if (window.lucide) window.lucide.createIcons();

  // Carrega configurações do Supabase se existirem
  loadSupabaseConfig();

  // Carrega dados (localStorage -> fallback data/*.json -> fallback Supabase)
  await loadInitialData();

  // Renderiza tabelas e listas
  renderArticlesTable(state.artigos);
  renderFaqList(state.faq);
  updateCounters();

  // Verifica status do Supabase
  checkCloudStatus();
});

// ============================================================================
// 4. CARREGAMENTO DE DADOS (HÍBRIDO & LOCAL-FIRST ROBUSTO)
// ============================================================================
async function loadInitialData() {
  try {
    // 1. Carregar Artigos
    const localArtigos = localStorage.getItem(STORAGE_KEYS.ARTIGOS);
    if (localArtigos) {
      try {
        state.artigos = JSON.parse(localArtigos);
      } catch (e) {
        state.artigos = [];
      }
    }

    // Se não tiver artigos no localStorage (ou array vazio), inicializa com os artigos do site
    if (!state.artigos || state.artigos.length === 0) {
      if (typeof window !== 'undefined' && window.DEFAULT_ARTIGOS && window.DEFAULT_ARTIGOS.length > 0) {
        state.artigos = JSON.parse(JSON.stringify(window.DEFAULT_ARTIGOS));
        saveLocalArtigos();
      } else {
        try {
          const res = await fetch('../data/artigos.json');
          if (res.ok) {
            state.artigos = await res.json();
            saveLocalArtigos();
          }
        } catch (err) {
          console.warn('Fallback fetch artigos:', err);
        }
      }
    }

    // 2. Carregar FAQ
    const localFaq = localStorage.getItem(STORAGE_KEYS.FAQ);
    if (localFaq) {
      try {
        state.faq = JSON.parse(localFaq);
      } catch (e) {
        state.faq = [];
      }
    }

    // Se não tiver FAQ no localStorage (ou array vazio), inicializa com o FAQ do site
    if (!state.faq || state.faq.length === 0) {
      if (typeof window !== 'undefined' && window.DEFAULT_FAQ && window.DEFAULT_FAQ.length > 0) {
        state.faq = JSON.parse(JSON.stringify(window.DEFAULT_FAQ));
        saveLocalFaq();
      } else {
        try {
          const res = await fetch('../data/faq.json');
          if (res.ok) {
            state.faq = await res.json();
            saveLocalFaq();
          }
        } catch (err) {
          console.warn('Fallback fetch FAQ:', err);
        }
      }
    }

    // 3. Tentar sync de nuvem se Supabase estiver configurado
    if (state.supabaseConfig.url && state.supabaseConfig.key) {
      syncWithSupabaseInBackground();
    }
  } catch (error) {
    console.error('Erro ao inicializar dados do CMS:', error);
  }
}

function saveLocalArtigos() {
  localStorage.setItem(STORAGE_KEYS.ARTIGOS, JSON.stringify(state.artigos));
}

function saveLocalFaq() {
  localStorage.setItem(STORAGE_KEYS.FAQ, JSON.stringify(state.faq));
}

function updateCounters() {
  const countArtigos = document.getElementById('count-artigos');
  const countFaq = document.getElementById('count-faq');
  if (countArtigos) countArtigos.textContent = state.artigos.length;
  if (countFaq) countFaq.textContent = state.faq.length;
}

// ============================================================================
// 5. NAVEGAÇÃO ENTRE ABAS
// ============================================================================
function switchTab(tabId) {
  state.activeTab = tabId;

  // Atualizar botões de navegação
  const navBtns = {
    'tab-artigos': document.getElementById('nav-artigos'),
    'tab-editor': document.getElementById('nav-editor'),
    'tab-faq': document.getElementById('nav-faq'),
    'tab-cloud': document.getElementById('nav-cloud'),
  };

  Object.entries(navBtns).forEach(([key, btn]) => {
    if (btn) {
      if (key === tabId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    }
  });

  // Alternar seções de conteúdo
  const sections = ['tab-artigos', 'tab-editor', 'tab-faq', 'tab-cloud'];
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      if (id === tabId) {
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    }
  });

  // Atualizar título da topbar e botão de ação
  const pageTitle = document.getElementById('page-title');
  const topActionBtn = document.getElementById('top-action-btn');

  if (tabId === 'tab-artigos') {
    if (pageTitle) pageTitle.textContent = 'Artigos Publicados';
    if (topActionBtn) {
      topActionBtn.style.display = 'inline-flex';
      topActionBtn.onclick = () => openNewArticleEditor();
      topActionBtn.innerHTML = '<i data-lucide="plus" class="w-4 h-4"></i><span>Novo Artigo</span>';
    }
  } else if (tabId === 'tab-editor') {
    if (pageTitle) pageTitle.textContent = 'Editor de Conteúdo';
    if (topActionBtn) topActionBtn.style.display = 'none';
  } else if (tabId === 'tab-faq') {
    if (pageTitle) pageTitle.textContent = 'Perguntas Frequentes (FAQ)';
    if (topActionBtn) {
      topActionBtn.style.display = 'inline-flex';
      topActionBtn.onclick = () => openNewFaqModal();
      topActionBtn.innerHTML = '<i data-lucide="plus" class="w-4 h-4"></i><span>Nova Pergunta</span>';
    }
  } else if (tabId === 'tab-cloud') {
    if (pageTitle) pageTitle.textContent = 'Sincronização & Backup';
    if (topActionBtn) topActionBtn.style.display = 'none';
  }

  if (window.lucide) window.lucide.createIcons();
}

// ============================================================================
// 6. GESTÃO DE ARTIGOS (TABELA & FILTROS)
// ============================================================================
function renderArticlesTable(articles) {
  const tbody = document.getElementById('artigos-table-body');
  if (!tbody) return;

  if (!articles || articles.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="text-center py-12 text-slate-400">
          <i data-lucide="inbox" class="w-10 h-10 mx-auto mb-2 text-slate-300"></i>
          <p class="text-sm font-medium">Nenhum artigo encontrado.</p>
          <button onclick="openNewArticleEditor()" class="mt-3 text-xs text-gold hover:underline font-semibold">
            Clique aqui para redigir o primeiro artigo
          </button>
        </td>
      </tr>
    `;
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  tbody.innerHTML = articles.map(article => {
    const imgUrl = article.imagem || '../assets/logo-icon.png';
    const linkUrl = article.urlEstatica ? `../${article.urlEstatica}` : `../artigos/artigo.html?slug=${article.slug}`;
    const authorName = (article.autor || 'Janeiro Advocacia').split('|')[0];
    const dataFormatada = article.dataPublicacao ? formatDateBR(article.dataPublicacao) : 'Recente';

    return `
      <tr class="hover:bg-slate-50/70 transition-colors">
        <td>
          <img src="${imgUrl}" alt="${escapeHtml(article.titulo)}"
               onerror="this.src='../assets/logo-icon.png'"
               class="w-12 h-12 object-cover rounded-lg border border-slate-200">
        </td>
        <td>
          <a href="${linkUrl}" target="_blank" class="font-serif text-sm font-bold text-navy hover:text-gold transition-colors block line-clamp-1">
            ${escapeHtml(article.titulo)}
          </a>
          <p class="text-xs text-slate-500 line-clamp-1 mt-0.5">${escapeHtml(article.resumo || '')}</p>
        </td>
        <td>
          <span class="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-gold-light text-gold-dark border border-gold/30">
            ${escapeHtml(article.categoria || 'Geral')}
          </span>
        </td>
        <td class="text-xs text-slate-700 whitespace-nowrap">
          <span class="font-medium">${escapeHtml(authorName)}</span>
          <span class="block text-[10px] text-slate-400">${escapeHtml(article.autorOab || '')}</span>
        </td>
        <td class="text-xs text-slate-500 whitespace-nowrap">
          ${dataFormatada}
        </td>
        <td style="text-align: right;">
          <div class="flex items-center justify-end gap-1.5">
            <a href="${linkUrl}" target="_blank" title="Ver Artigo" class="btn-action">
              <i data-lucide="external-link" class="w-4 h-4 text-slate-500"></i>
            </a>
            <button onclick="editArticle('${article.id}')" title="Editar" class="btn-action">
              <i data-lucide="edit-3" class="w-4 h-4 text-blue-600"></i>
            </button>
            <button onclick="deleteArticle('${article.id}')" title="Excluir" class="btn-action hover:bg-rose-50">
              <i data-lucide="trash-2" class="w-4 h-4 text-rose-500"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  if (window.lucide) window.lucide.createIcons();
}

function filterArticles() {
  const searchTerm = (document.getElementById('search-artigo')?.value || '').toLowerCase().trim();
  const categoryFilter = document.getElementById('filter-category')?.value || '';

  const filtered = state.artigos.filter(art => {
    const matchesSearch = !searchTerm ||
      art.titulo.toLowerCase().includes(searchTerm) ||
      (art.resumo && art.resumo.toLowerCase().includes(searchTerm)) ||
      (art.categoria && art.categoria.toLowerCase().includes(searchTerm));

    const matchesCategory = !categoryFilter || art.categoria === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  renderArticlesTable(filtered);
}

// ============================================================================
// 7. FORMULÁRIO DO EDITOR DE ARTIGOS
// ============================================================================
function openNewArticleEditor() {
  document.getElementById('article-id').value = '';
  document.getElementById('article-title').value = '';
  document.getElementById('article-slug').value = '';
  document.getElementById('article-excerpt').value = '';
  document.getElementById('article-content').value = '';
  document.getElementById('article-image').value = '';
  document.getElementById('article-date').value = new Date().toISOString().split('T')[0];
  document.getElementById('article-time').value = '5 min de leitura';
  document.getElementById('article-category').value = 'Regras de Transição';
  document.getElementById('article-author').value = 'Dr. André Luiz Leonardi Janeiro|OAB/PR 84.395';

  document.getElementById('editor-heading').textContent = 'Redigir Artigo Previdenciário';
  document.getElementById('btn-save-label').textContent = 'Salvar & Publicar';

  updateCharCount();
  updateImagePreview();
  switchTab('tab-editor');
}

function editArticle(id) {
  const article = state.artigos.find(a => a.id === id);
  if (!article) return;

  document.getElementById('article-id').value = article.id;
  document.getElementById('article-title').value = article.titulo || '';
  document.getElementById('article-slug').value = article.slug || '';
  document.getElementById('article-excerpt').value = article.resumo || '';
  document.getElementById('article-content').value = article.conteudoHtml || '';
  document.getElementById('article-image').value = article.imagem || '';
  document.getElementById('article-date').value = article.dataPublicacao || new Date().toISOString().split('T')[0];
  document.getElementById('article-time').value = article.tempoLeitura || '5 min de leitura';
  document.getElementById('article-category').value = article.categoria || 'Regras de Transição';

  const authorSelect = document.getElementById('article-author');
  const combinedAuthor = `${article.autor}|${article.autorOab}`;
  if (authorSelect) {
    if ([...authorSelect.options].some(o => o.value === combinedAuthor)) {
      authorSelect.value = combinedAuthor;
    } else {
      authorSelect.selectedIndex = 0;
    }
  }

  document.getElementById('editor-heading').textContent = 'Editar Artigo Previdenciário';
  document.getElementById('btn-save-label').textContent = 'Atualizar Artigo';

  updateCharCount();
  updateImagePreview();
  switchTab('tab-editor');
}

function cancelEdit() {
  if (confirm('Deseja cancelar a edição? As alterações não salvas serão perdidas.')) {
    switchTab('tab-artigos');
  }
}

async function handleSaveArticle(event) {
  event.preventDefault();

  const idInput = document.getElementById('article-id').value;
  const titulo = document.getElementById('article-title').value.trim();
  const slug = slugify(document.getElementById('article-slug').value.trim() || titulo);
  const resumo = document.getElementById('article-excerpt').value.trim();
  const conteudoHtml = document.getElementById('article-content').value.trim();
  const dataPublicacao = document.getElementById('article-date').value;
  const tempoLeitura = document.getElementById('article-time').value.trim();
  const categoria = document.getElementById('article-category').value;
  const authorVal = document.getElementById('article-author').value;
  const [autor, autorOab] = authorVal.split('|');
  const imagem = document.getElementById('article-image').value.trim();

  if (!titulo || !resumo || !conteudoHtml) {
    showToast('Preencha todos os campos obrigatórios (*)', 'error');
    return;
  }

  // Verifica duplicação de slug em outro artigo
  const slugExists = state.artigos.some(a => a.slug === slug && a.id !== idInput);
  if (slugExists) {
    showToast('Este link amigável (slug) já está sendo usado por outro artigo!', 'error');
    return;
  }

  const isEditing = Boolean(idInput);
  const articleId = isEditing ? idInput : 'art-' + Date.now();

  const articleObj = {
    id: articleId,
    slug: slug,
    titulo: titulo,
    categoria: categoria,
    resumo: resumo,
    imagem: imagem || 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
    autor: autor,
    autorOab: autorOab || '',
    dataPublicacao: dataPublicacao,
    tempoLeitura: tempoLeitura,
    conteudoHtml: conteudoHtml,
    urlEstatica: isEditing ? (state.artigos.find(a => a.id === idInput)?.urlEstatica || '') : ''
  };

  if (isEditing) {
    const idx = state.artigos.findIndex(a => a.id === idInput);
    if (idx !== -1) {
      state.artigos[idx] = articleObj;
    }
  } else {
    state.artigos.unshift(articleObj);
  }

  // Salvar no localStorage
  saveLocalArtigos();
  updateCounters();
  filterArticles();

  // Se Supabase estiver configurado, envia em nuvem
  if (state.supabaseConfig.url && state.supabaseConfig.key) {
    await upsertArticleSupabase(articleObj);
  }

  showToast(isEditing ? 'Artigo atualizado com sucesso!' : 'Novo artigo publicado com sucesso!');
  switchTab('tab-artigos');
}

async function deleteArticle(id) {
  const article = state.artigos.find(a => a.id === id);
  if (!article) return;

  if (confirm(`Tem certeza que deseja excluir o artigo "${article.titulo}"? Esta ação não pode ser desfeita.`)) {
    state.artigos = state.artigos.filter(a => a.id !== id);
    saveLocalArtigos();
    updateCounters();
    filterArticles();

    if (state.supabaseConfig.url && state.supabaseConfig.key) {
      await deleteArticleSupabase(id);
    }

    showToast('Artigo excluído com sucesso.');
  }
}

// Helpers do Editor
function generateSlugFromTitle(force = false) {
  const title = document.getElementById('article-title').value;
  const slugInput = document.getElementById('article-slug');
  if (force || !slugInput.value) {
    slugInput.value = slugify(title);
  }
}

function slugify(text) {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function updateCharCount() {
  const excerpt = document.getElementById('article-excerpt').value;
  const countSpan = document.getElementById('char-count');
  if (countSpan) {
    countSpan.textContent = `${excerpt.length} / 160 caracteres`;
    if (excerpt.length > 160) {
      countSpan.classList.add('text-rose-500');
    } else {
      countSpan.classList.remove('text-rose-500');
    }
  }
}

function updateImagePreview() {
  const url = document.getElementById('article-image').value.trim();
  const preview = document.getElementById('image-preview');
  const placeholder = document.getElementById('image-placeholder');

  if (url) {
    preview.src = url;
    preview.onload = () => {
      preview.classList.remove('hidden');
      placeholder.classList.add('hidden');
    };
    preview.onerror = () => {
      preview.classList.add('hidden');
      placeholder.classList.remove('hidden');
    };
  } else {
    preview.classList.add('hidden');
    placeholder.classList.remove('hidden');
  }
}

function setSampleImage(url) {
  document.getElementById('article-image').value = url;
  updateImagePreview();
}

function insertTag(openTag, closeTag) {
  const textarea = document.getElementById('article-content');
  if (!textarea) return;

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const text = textarea.value;
  const selectedText = text.substring(start, end) || 'Texto aqui';

  const replacement = openTag + selectedText + closeTag;
  textarea.value = text.substring(0, start) + replacement + text.substring(end);

  textarea.focus();
  textarea.setSelectionRange(start + openTag.length, start + openTag.length + selectedText.length);
}

// ============================================================================
// 8. GESTÃO DE FAQ (PERGUNTAS FREQUENTES)
// ============================================================================
function renderFaqList(faqs) {
  const container = document.getElementById('faq-list-container');
  if (!container) return;

  if (!faqs || faqs.length === 0) {
    container.innerHTML = `
      <div class="cms-card p-12 text-center text-slate-400">
        <i data-lucide="help-circle" class="w-10 h-10 mx-auto mb-2 text-slate-300"></i>
        <p class="text-sm font-medium">Nenhuma pergunta cadastrada.</p>
        <button onclick="openNewFaqModal()" class="mt-3 text-xs text-gold hover:underline font-semibold">
          Clique aqui para adicionar uma pergunta
        </button>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  container.innerHTML = faqs.map((faq, index) => {
    return `
      <div class="cms-card p-5 hover:border-gold/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-1.5">
            <span class="w-6 h-6 rounded-full bg-gold/15 text-gold-dark font-serif font-bold text-xs flex items-center justify-center flex-shrink-0">
              ${index + 1}
            </span>
            <h4 class="font-serif text-base font-bold text-navy truncate">
              ${escapeHtml(faq.pergunta)}
            </h4>
          </div>
          <p class="text-xs text-slate-600 line-clamp-2 pl-8 leading-relaxed font-light">
            ${escapeHtml(faq.resposta)}
          </p>
        </div>

        <div class="flex items-center gap-1.5 flex-shrink-0 self-end sm:self-center pl-8 sm:pl-0">
          <button onclick="editFaq('${faq.id}')" title="Editar Dúvida" class="btn-action">
            <i data-lucide="edit-3" class="w-4 h-4 text-blue-600"></i>
          </button>
          <button onclick="deleteFaq('${faq.id}')" title="Excluir Dúvida" class="btn-action hover:bg-rose-50">
            <i data-lucide="trash-2" class="w-4 h-4 text-rose-500"></i>
          </button>
        </div>
      </div>
    `;
  }).join('');

  if (window.lucide) window.lucide.createIcons();
}

function openNewFaqModal() {
  document.getElementById('faq-id').value = '';
  document.getElementById('faq-question').value = '';
  document.getElementById('faq-answer').value = '';
  document.getElementById('faq-modal-title').textContent = 'Nova Pergunta Frequente';
  document.getElementById('faq-modal').classList.remove('hidden');
}

function editFaq(id) {
  const faq = state.faq.find(f => f.id === id);
  if (!faq) return;

  document.getElementById('faq-id').value = faq.id;
  document.getElementById('faq-question').value = faq.pergunta || '';
  document.getElementById('faq-answer').value = faq.resposta || '';
  document.getElementById('faq-modal-title').textContent = 'Editar Pergunta Frequente';
  document.getElementById('faq-modal').classList.remove('hidden');
}

function closeFaqModal() {
  document.getElementById('faq-modal').classList.add('hidden');
}

async function handleSaveFaq(event) {
  event.preventDefault();
  const idInput = document.getElementById('faq-id').value;
  const pergunta = document.getElementById('faq-question').value.trim();
  const resposta = document.getElementById('faq-answer').value.trim();

  if (!pergunta || !resposta) {
    showToast('Preencha a pergunta e a resposta.', 'error');
    return;
  }

  const isEditing = Boolean(idInput);
  const faqId = isEditing ? idInput : 'faq-' + Date.now();

  const faqObj = {
    id: faqId,
    pergunta: pergunta,
    resposta: resposta
  };

  if (isEditing) {
    const idx = state.faq.findIndex(f => f.id === idInput);
    if (idx !== -1) {
      state.faq[idx] = faqObj;
    }
  } else {
    state.faq.push(faqObj);
  }

  saveLocalFaq();
  updateCounters();
  renderFaqList(state.faq);
  closeFaqModal();

  if (state.supabaseConfig.url && state.supabaseConfig.key) {
    await upsertFaqSupabase(faqObj);
  }

  showToast(isEditing ? 'Dúvida atualizada com sucesso!' : 'Nova dúvida adicionada ao FAQ!');
}

async function deleteFaq(id) {
  const faq = state.faq.find(f => f.id === id);
  if (!faq) return;

  if (confirm(`Tem certeza que deseja excluir esta pergunta do FAQ?`)) {
    state.faq = state.faq.filter(f => f.id !== id);
    saveLocalFaq();
    updateCounters();
    renderFaqList(state.faq);

    if (state.supabaseConfig.url && state.supabaseConfig.key) {
      await deleteFaqSupabase(id);
    }

    showToast('Pergunta removida do FAQ.');
  }
}

// ============================================================================
// 9. SINCRONIZAÇÃO EM NUVEM (SUPABASE) & BACKUP
// ============================================================================
function loadSupabaseConfig() {
  const stored = localStorage.getItem(STORAGE_KEYS.SUPABASE);
  if (stored) {
    try {
      state.supabaseConfig = JSON.parse(stored);
      const urlInput = document.getElementById('supabase-url');
      const keyInput = document.getElementById('supabase-key');
      if (urlInput) urlInput.value = state.supabaseConfig.url || '';
      if (keyInput) keyInput.value = state.supabaseConfig.key || '';
    } catch (e) {}
  }
}

function saveSupabaseConfig() {
  const url = document.getElementById('supabase-url').value.trim().replace(/\/$/, '');
  const key = document.getElementById('supabase-key').value.trim();

  state.supabaseConfig = { url, key };
  localStorage.setItem(STORAGE_KEYS.SUPABASE, JSON.stringify(state.supabaseConfig));

  checkCloudStatus();
  showToast('Configurações salvas. Testando conexão...');
  testSupabaseConnection();
}

async function testSupabaseConnection() {
  const { url, key } = state.supabaseConfig;
  if (!url || !key) {
    showToast('Informe a URL e a Anon Key do Supabase.', 'error');
    return;
  }

  try {
    const res = await fetch(`${url}/rest/v1/artigos?select=id&limit=1`, {
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`
      }
    });

    if (res.ok) {
      showToast('Conexão com o Supabase bem-sucedida! Nuvem ativa.', 'success');
      checkCloudStatus(true);
      syncWithSupabaseInBackground();
    } else {
      const errText = await res.text();
      console.warn('Erro Supabase:', errText);
      showToast(`Erro na resposta do Supabase (${res.status}). Verifique as tabelas.`, 'error');
      checkCloudStatus(false);
    }
  } catch (err) {
    console.error('Falha de conexão com Supabase:', err);
    showToast('Não foi possível conectar ao Supabase. Verifique a URL e conexão de rede.', 'error');
    checkCloudStatus(false);
  }
}

function checkCloudStatus(isOnline = null) {
  const indicator = document.getElementById('cloud-indicator');
  const text = document.getElementById('cloud-status-text');
  if (!indicator || !text) return;

  const hasConfig = Boolean(state.supabaseConfig.url && state.supabaseConfig.key);

  if (hasConfig && isOnline !== false) {
    indicator.className = 'flex items-center gap-1.5 text-[10px] text-emerald-400 font-medium';
    indicator.title = 'Sincronizado na Nuvem (Supabase)';
    indicator.innerHTML = '<span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span><span>Nuvem Ativa</span>';
  } else {
    indicator.className = 'flex items-center gap-1.5 text-[10px] text-amber-400 font-medium';
    indicator.title = 'Modo Local-first ativo (localStorage). Conecte ao Supabase na aba Nuvem.';
    indicator.innerHTML = '<span class="w-2 h-2 rounded-full bg-amber-400"></span><span>Modo Local</span>';
  }
}

async function syncWithSupabaseInBackground() {
  const { url, key } = state.supabaseConfig;
  if (!url || !key) return;

  try {
    // 1. Sincronizar Artigos da Nuvem
    const resArtigos = await fetch(`${url}/rest/v1/artigos?select=*&order=data_publicacao.desc`, {
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`
      }
    });

    if (resArtigos.ok) {
      const remoteArtigos = await resArtigos.json();
      if (remoteArtigos && remoteArtigos.length > 0) {
        state.artigos = remoteArtigos.map(r => ({
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
        saveLocalArtigos();
        renderArticlesTable(state.artigos);
      }
    }

    // 2. Sincronizar FAQ da Nuvem
    const resFaq = await fetch(`${url}/rest/v1/faq?select=*`, {
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`
      }
    });

    if (resFaq.ok) {
      const remoteFaq = await resFaq.json();
      if (remoteFaq && remoteFaq.length > 0) {
        state.faq = remoteFaq.map(f => ({
          id: f.id,
          pergunta: f.pergunta,
          resposta: f.resposta
        }));
        saveLocalFaq();
        renderFaqList(state.faq);
      }
    }

    updateCounters();
  } catch (err) {
    console.warn('Sync em background com Supabase falhou:', err);
  }
}

async function upsertArticleSupabase(art) {
  const { url, key } = state.supabaseConfig;
  if (!url || !key) return;

  const payload = {
    id: art.id,
    slug: art.slug,
    titulo: art.titulo,
    categoria: art.categoria,
    resumo: art.resumo,
    imagem: art.imagem,
    autor: art.autor,
    autor_oab: art.autorOab,
    data_publicacao: art.dataPublicacao,
    tempo_leitura: art.tempoLeitura,
    conteudo_html: art.conteudoHtml,
    url_estatica: art.urlEstatica || null
  };

  try {
    await fetch(`${url}/rest/v1/artigos`, {
      method: 'POST',
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates'
      },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    console.error('Falha ao enviar artigo para o Supabase:', err);
  }
}

async function deleteArticleSupabase(id) {
  const { url, key } = state.supabaseConfig;
  if (!url || !key) return;

  try {
    await fetch(`${url}/rest/v1/artigos?id=eq.${id}`, {
      method: 'DELETE',
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`
      }
    });
  } catch (err) {
    console.error('Falha ao deletar artigo no Supabase:', err);
  }
}

async function upsertFaqSupabase(faq) {
  const { url, key } = state.supabaseConfig;
  if (!url || !key) return;

  const payload = {
    id: faq.id,
    pergunta: faq.pergunta,
    resposta: faq.resposta
  };

  try {
    await fetch(`${url}/rest/v1/faq`, {
      method: 'POST',
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates'
      },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    console.error('Falha ao enviar FAQ para o Supabase:', err);
  }
}

async function deleteFaqSupabase(id) {
  const { url, key } = state.supabaseConfig;
  if (!url || !key) return;

  try {
    await fetch(`${url}/rest/v1/faq?id=eq.${id}`, {
      method: 'DELETE',
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`
      }
    });
  } catch (err) {
    console.error('Falha ao deletar FAQ no Supabase:', err);
  }
}

// ============================================================================
// 10. BACKUP E RESTAURAÇÃO
// ============================================================================
function exportDataBackup() {
  const backup = {
    exportDate: new Date().toISOString(),
    escritorio: 'Janeiro Advocacia & Consultoria',
    artigos: state.artigos,
    faq: state.faq
  };

  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backup, null, 2));
  const dlAnchor = document.createElement('a');
  dlAnchor.setAttribute('href', dataStr);
  dlAnchor.setAttribute('download', `janeiro_advocacia_backup_${new Date().toISOString().split('T')[0]}.json`);
  document.body.appendChild(dlAnchor);
  dlAnchor.click();
  dlAnchor.remove();

  showToast('Backup exportado com sucesso!');
}

async function resetToDefaultData() {
  if (confirm('Atenção: isto restaurará os artigos e perguntas para a configuração original de fábrica. Continuar?')) {
    if (typeof window !== 'undefined' && window.DEFAULT_ARTIGOS && window.DEFAULT_FAQ) {
      state.artigos = JSON.parse(JSON.stringify(window.DEFAULT_ARTIGOS));
      state.faq = JSON.parse(JSON.stringify(window.DEFAULT_FAQ));
      saveLocalArtigos();
      saveLocalFaq();
      renderArticlesTable(state.artigos);
      renderFaqList(state.faq);
      updateCounters();
      showToast('Dados restaurados com sucesso para o padrão de fábrica.');
      return;
    }

    try {
      const resArt = await fetch('../data/artigos.json');
      const resFaq = await fetch('../data/faq.json');
      if (resArt.ok && resFaq.ok) {
        state.artigos = await resArt.json();
        state.faq = await resFaq.json();
        saveLocalArtigos();
        saveLocalFaq();
        renderArticlesTable(state.artigos);
        renderFaqList(state.faq);
        updateCounters();
        showToast('Dados restaurados com sucesso.');
      }
    } catch (err) {
      showToast('Erro ao restaurar dados padrão.', 'error');
    }
  }
}

function copySqlScript() {
  const sql = `-- Criar Tabela de Artigos
create table artigos (
  id text primary key,
  slug text unique not null,
  titulo text not null,
  categoria text not null,
  resumo text not null,
  imagem text,
  autor text not null,
  autor_oab text,
  data_publicacao date not null,
  tempo_leitura text,
  conteudo_html text not null,
  url_estatica text
);

-- Criar Tabela de FAQ
create table faq (
  id text primary key,
  pergunta text not null,
  resposta text not null
);

-- Habilitar Leitura Pública
alter table artigos enable row level security;
alter table faq enable row level security;
create policy "Leitura pública artigos" on artigos for select using (true);
create policy "Leitura pública faq" on faq for select using (true);`;

  navigator.clipboard.writeText(sql).then(() => {
    showToast('Script SQL copiado para a área de transferência!');
  });
}

// ============================================================================
// 11. UTILITÁRIOS GERAIS & NOTIFICAÇÕES (TOAST)
// ============================================================================
let toastTimeout = null;

function showToast(message, type = 'success') {
  const toast = document.getElementById('cms-toast');
  const toastMsg = document.getElementById('toast-message');
  const toastIcon = document.getElementById('toast-icon');

  if (!toast) return;

  toast.className = `show ${type}`;
  if (toastMsg) toastMsg.textContent = message;

  if (toastIcon) {
    if (type === 'success') {
      toastIcon.setAttribute('data-lucide', 'check-circle');
    } else if (type === 'error') {
      toastIcon.setAttribute('data-lucide', 'alert-circle');
    } else {
      toastIcon.setAttribute('data-lucide', 'info');
    }
    if (window.lucide) window.lucide.createIcons();
  }

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.className = '';
  }, 3500);
}

function formatDateBR(dateString) {
  if (!dateString) return '';
  const parts = dateString.split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dateString;
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
