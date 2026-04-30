// =============================================
// KONFIGURATSIYA — Groq API
// =============================================

let lang = localStorage.getItem('lang') || 'uz';
let allPosts = [];
let currentSub = 'all';
let draggedCard = null;

// =============================================
// TARJIMALAR (TR) — UZ / RU / EN
// =============================================
const TR = {
  uz: {
    home: "Bosh",
    blog: "Blog",
    kanban: "Kanban",
    hero_badge: "KKO website",
    hero_title1: "Salom,",
    hero_title2: "kelajak",
    hero_title3: "bugun boshlanadi",
    hero_desc: "Tech blog va kanban board — ikkalasi bitta saytda.<br>Sun'iy intellekt bilan ishlaydi.",
    blog_card_title: "Tech Blog",
    blog_card_desc: "HackerNews va DEV.to dan real vaqtdagi texnologiya yangiliklari. AI TL;DR bilan qisqacha o'qing.",
    blog_card_btn: "BLOGGA O'TISH →",
    kanban_card_title: "AI Kanban",
    kanban_card_desc: "Vazifalaringizni boshqaring. AI sizga sub-vazifalar yaratishda yordam beradi.",
    kanban_card_btn: "BOARDGA O'TISH →",
    blog_title: "Tech Blog",
    blog_desc: "HackerNews va DEV.to dan real vaqtdagi texnologiya yangiliklari • AI TL;DR bilan",
    all: "⭐ Barchasi",
    loading: "Yuklanmoqda...",
    found: "ta maqola topildi",
    net_err: "Internet ulanishida xatolik. Sahifani yangilang.",
    tldr_btn: "⚡ TL;DR",
    tldr_done: "✓ TL;DR ko'rsatildi",
    tldr_wait: "AI tahlil qilmoqda...",
    tldr_err: "Xatolik yuz berdi. Qaytadan urinib ko'ring.",
    source: "📎 Manba",
    search_placeholder: "Qidiring...",
    kanban_title: "Kanban Board",
    kanban_desc: "Vazifa kiriting — AI avtomatik subtask taklif qiladi",
    task_placeholder: "Masalan: Veb-sayt yaratish...",
    add_btn: "+ Qo'shish",
    col_todo: "Bajarilmagan",
    col_doing: "Jarayonda",
    col_done: "Bajarildi",
    modal_title: "🤖 AI Subtask Taklifi",
    modal_confirm: "✅ Qabul qilish",
    modal_cancel: "Bekor",
    drag_hint: "Kartani sudrab ko'chiring",
    all_done: "✓ Hammasi bajarildi!",
    tldr_prompt: (title, text) =>
      `Quyidagi texnologiya yangiligini O'ZBEK tilida AYNAN 3 ta qisqa jumlada xulosala. Faqat xulosani ber, boshqa hech narsa yozma.\n\nSarlavha: ${title}\n\nMatn: ${text || title}`,
    subtask_prompt: (name) =>
      `"${name}" vazifasi uchun O'ZBEK tilida 5 ta aniq, amaliy qadam/subtask taklif qil. Faqat raqamlangan ro'yxat ber, boshqa hech narsa yozma. Misol:\n1. Birinchi qadam\n2. Ikkinchi qadam`,
    translate_prompt: (titles) =>
      `Quyidagi xabar sarlavhalarini O'ZBEK tiliga tarjima qil. Raqamlashni saqlagan holda faqat tarjimani ber:\n${titles}`
  },
  ru: {
    home: "Главная",
    blog: "Блог",
    kanban: "Канбан",
    hero_badge: "KKO сайт",
    hero_title1: "Привет,",
    hero_title2: "будущее",
    hero_title3: "начинается сегодня",
    hero_desc: "Тех блог и канбан — всё на одном сайте.<br>Работает с искусственным интеллектом.",
    blog_card_title: "Tech Блог",
    blog_card_desc: "Реальные технологические новости с HackerNews и DEV.to. Читайте кратко с AI TL;DR.",
    blog_card_btn: "ПЕРЕЙТИ В БЛОГ →",
    kanban_card_title: "AI Канбан",
    kanban_card_desc: "Управляйте задачами. AI поможет создать подзадачи автоматически.",
    kanban_card_btn: "ПЕРЕЙТИ В ДОСКУ →",
    blog_title: "Tech Блог",
    blog_desc: "Технологические новости с HackerNews и DEV.to в реальном времени • AI TL;DR",
    all: "⭐ Все",
    loading: "Загрузка...",
    found: "статей найдено",
    net_err: "Ошибка подключения к интернету. Обновите страницу.",
    tldr_btn: "⚡ TL;DR",
    tldr_done: "✓ TL;DR показан",
    tldr_wait: "AI анализирует...",
    tldr_err: "Произошла ошибка. Попробуйте снова.",
    source: "📎 Источник",
    search_placeholder: "Поиск...",
    kanban_title: "Канбан Доска",
    kanban_desc: "Введите задачу — AI автоматически предложит подзадачи",
    task_placeholder: "Например: Создать сайт...",
    add_btn: "+ Добавить",
    col_todo: "Не начато",
    col_doing: "В процессе",
    col_done: "Готово",
    modal_title: "🤖 Предложение AI",
    modal_confirm: "✅ Принять",
    modal_cancel: "Отмена",
    drag_hint: "Перетащите карточку",
    all_done: "✓ Всё выполнено!",
    tldr_prompt: (title, text) =>
      `Суммируй эту технологическую новость ТОЧНО в 3 коротких предложениях НА РУССКОМ ЯЗЫКЕ. Дай только краткое изложение, ничего больше.\n\nЗаголовок: ${title}\n\nТекст: ${text || title}`,
    subtask_prompt: (name) =>
      `Предложи 5 конкретных шагов/подзадач для задачи "${name}" НА РУССКОМ ЯЗЫКЕ. Дай только нумерованный список, ничего больше. Пример:\n1. Первый шаг\n2. Второй шаг`,
    translate_prompt: (titles) =>
      `Переведи следующие заголовки новостей на РУССКИЙ язык. Сохраняй нумерацию и давай только переводы:\n${titles}`
  },
  en: {
    home: "Home",
    blog: "Blog",
    kanban: "Kanban",
    hero_badge: "KKO website",
    hero_title1: "Hello,",
    hero_title2: "the future",
    hero_title3: "starts today",
    hero_desc: "Tech blog and kanban board — both on one site.<br>Powered by artificial intelligence.",
    blog_card_title: "Tech Blog",
    blog_card_desc: "Real-time tech news from HackerNews & DEV.to. Read quickly with AI TL;DR.",
    blog_card_btn: "GO TO BLOG →",
    kanban_card_title: "AI Kanban",
    kanban_card_desc: "Manage your tasks. AI helps you create subtasks automatically.",
    kanban_card_btn: "GO TO BOARD →",
    blog_title: "Tech Blog",
    blog_desc: "Real-time tech news from HackerNews & DEV.to • With AI TL;DR",
    all: "⭐ All",
    loading: "Loading...",
    found: "articles found",
    net_err: "Connection error. Please refresh the page.",
    tldr_btn: "⚡ TL;DR",
    tldr_done: "✓ TL;DR shown",
    tldr_wait: "AI analyzing...",
    tldr_err: "An error occurred. Please try again.",
    source: "📎 Source",
    search_placeholder: "Search...",
    kanban_title: "Kanban Board",
    kanban_desc: "Enter a task — AI will automatically suggest subtasks",
    task_placeholder: "E.g: Create a website...",
    add_btn: "+ Add",
    col_todo: "To Do",
    col_doing: "In Progress",
    col_done: "Done",
    modal_title: "🤖 AI Subtask Suggestion",
    modal_confirm: "✅ Confirm",
    modal_cancel: "Cancel",
    drag_hint: "Drag card to move",
    all_done: "✓ All done!",
    tldr_prompt: (title, text) =>
      `Summarize this tech news in EXACTLY 3 short sentences IN ENGLISH. Provide only the summary, nothing else.\n\nTitle: ${title}\n\nText: ${text || title}`,
    subtask_prompt: (name) =>
      `Suggest 5 concrete steps/subtasks for the task "${name}" IN ENGLISH. Give only a numbered list, nothing else. Example:\n1. First step\n2. Second step`,
    translate_prompt: (titles) => titles // English — tarjima shart emas
  }
};

// =============================================
// GROQ API (bepul, tez)
// =============================================
const GROQ_API_KEY = "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";
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
// Modellar: llama-3.1-8b-instant, llama3-8b-8192, mixtral-8x7b-32768

async function apiCall(prompt) {
  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + GROQ_API_KEY,
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: "You are a helpful assistant. Be concise and direct." },
          { role: "user", content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 800,
        stream: false
      })
    });
    if (!response.ok) {
      const errText = await response.text();
      console.error("Groq API error:", response.status, errText);
      // Model fallback
      if (response.status === 404 || response.status === 400) {
        return await apiCallFallback(prompt);
      }
      return null;
    }
    const data = await response.json();
    return data.choices?.[0]?.message?.content?.trim() || null;
  } catch (err) {
    console.error("Groq AI Error:", err);
    return null;
  }
}

async function apiCallFallback(prompt) {
  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + GROQ_API_KEY
      },
      body: JSON.stringify({
        model: "mixtral-8x7b-32768",
        messages: [
          { role: "system", content: "Be concise and direct." },
          { role: "user", content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 800
      })
    });
    if (!response.ok) return null;
    const data = await response.json();
    return data.choices?.[0]?.message?.content?.trim() || null;
  } catch (err) {
    return null;
  }
}

// =============================================
// TIL BOSHQARUVI
// =============================================
function setLang(newLang, rerender = true) {
  lang = newLang;
  localStorage.setItem('lang', lang);

  // Aktiv tugmani belgilash
  document.querySelectorAll('.lang-btn').forEach(btn => {
    const onclickVal = btn.getAttribute('onclick') || '';
    btn.classList.toggle('active', onclickVal.includes(`'${lang}'`));
  });

  // data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (TR[lang][key] !== undefined) el.textContent = TR[lang][key];
  });

  // data-i18n-html
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.dataset.i18nHtml;
    if (TR[lang][key] !== undefined) el.innerHTML = TR[lang][key];
  });

  // data-i18n-placeholder (ham eski ham yangi atribut nomini qo'llab-quvvatlash)
  document.querySelectorAll('[data-i18n-placeholder], [data-i18n-ph]').forEach(el => {
    const key = el.dataset.i18nPlaceholder || el.dataset.i18nPh;
    if (key && TR[lang][key] !== undefined) el.placeholder = TR[lang][key];
  });

  // html lang atributini yangilash
  document.documentElement.lang = lang;

  if (rerender && allPosts.length > 0) renderPosts([...allPosts]);
}

// =============================================
// HackerNews + DEV.to — MA'LUMOT OLISH
// =============================================

// HackerNews: top/new/best story ID list olish
async function fetchHNStories(sort = 'hot', limit = 15) {
  const typeMap = { hot: 'topstories', new: 'newstories', top: 'beststories' };
  const hnType = typeMap[sort] || 'topstories';
  const idsRes = await fetch(`https://hacker-news.firebaseio.com/v0/${hnType}.json`);
  const ids = await idsRes.json();
  const topIds = ids.slice(0, limit * 2); // ko'proq olib keyin filter qilamiz
  const items = await Promise.all(
    topIds.map(id =>
      fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(r => r.json())
    )
  );
  return items
    .filter(item => item && item.title && item.url)
    .slice(0, limit)
    .map(item => ({
      id: 'hn-' + item.id,
      title: item.title,
      text: item.text || '',
      score: item.score || 0,
      author: item.by || 'anonymous',
      num_comments: item.descendants || 0,
      url: item.url || `https://news.ycombinator.com/item?id=${item.id}`,
      created: item.time || Math.floor(Date.now() / 1000),
      category: guessHNCategory(item.title),
      displayTitle: null,
      source: 'HackerNews'
    }));
}

// DEV.to: bepul public API
async function fetchDevToPosts(tag = '', sort = 'hot', limit = 15) {
  const tagMap = {
    programming: 'programming',
    webdev: 'webdev',
    artificial: 'ai',
    technology: 'technology',
    all: ''
  };
  const devTag = tagMap[tag] || '';
  const perPage = limit;
  let url = `https://dev.to/api/articles?per_page=${perPage}&top=7`;
  if (devTag) url += `&tag=${devTag}`;
  if (sort === 'new') url = `https://dev.to/api/articles?per_page=${perPage}&tag=${devTag}`;

  const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
  if (!res.ok) throw new Error('DEV.to API error');
  const articles = await res.json();
  return articles.map(a => ({
    id: 'dev-' + a.id,
    title: a.title,
    text: a.description || '',
    score: a.public_reactions_count || 0,
    author: a.user?.name || a.user?.username || 'anonymous',
    num_comments: a.comments_count || 0,
    url: a.url,
    created: Math.floor(new Date(a.published_at).getTime() / 1000),
    category: (a.tag_list?.[0] || 'technology').toUpperCase(),
    displayTitle: null,
    source: 'DEV.to'
  }));
}

function guessHNCategory(title) {
  const t = title.toLowerCase();
  if (t.includes('ai') || t.includes('llm') || t.includes('gpt') || t.includes('machine learning') || t.includes('neural')) return 'artificial';
  if (t.includes('web') || t.includes('css') || t.includes('html') || t.includes('react') || t.includes('frontend')) return 'webdev';
  if (t.includes('python') || t.includes('javascript') || t.includes('rust') || t.includes('golang') || t.includes('code')) return 'programming';
  return 'technology';
}

async function loadPosts(sub) {
  currentSub = sub;
  const box = document.getElementById('postsContainer');
  const resCount = document.getElementById('resultsCount');
  const sortEl = document.getElementById('sortSelect');
  const sort = sortEl ? sortEl.value : 'hot';

  if (!box) return;

  // Skeleton loader
  box.innerHTML = Array(4).fill(0).map(() => `
    <div class="skeleton-post">
      <div class="skeleton-line" style="width:30%; height:12px; margin-bottom:14px;"></div>
      <div class="skeleton-line" style="width:85%; height:16px; margin-bottom:10px;"></div>
      <div class="skeleton-line" style="width:60%; height:16px; margin-bottom:20px;"></div>
      <div class="skeleton-line" style="width:40%; height:12px;"></div>
    </div>
  `).join('');

  if (resCount) resCount.textContent = TR[lang].loading;

  try {
    let posts = [];

    if (sub === 'all') {
      // HackerNews + DEV.to aralash
      const [hnPosts, devPosts] = await Promise.allSettled([
        fetchHNStories(sort, 10),
        fetchDevToPosts('', sort, 10)
      ]);
      const hn = hnPosts.status === 'fulfilled' ? hnPosts.value : [];
      const dev = devPosts.status === 'fulfilled' ? devPosts.value : [];
      // Aralashtirib tartiblash
      posts = [...hn, ...dev].sort((a, b) => b.score - a.score).slice(0, 18);
    } else if (sub === 'programming' || sub === 'webdev' || sub === 'technology') {
      // DEV.to tag bo'yicha
      const [devPosts, hnPosts] = await Promise.allSettled([
        fetchDevToPosts(sub, sort, 10),
        fetchHNStories(sort, 15)
      ]);
      const dev = devPosts.status === 'fulfilled' ? devPosts.value : [];
      const hn = (hnPosts.status === 'fulfilled' ? hnPosts.value : [])
        .filter(p => p.category === sub);
      posts = [...dev, ...hn].slice(0, 15);
    } else if (sub === 'artificial') {
      // AI maqolalari
      const [devPosts, hnPosts] = await Promise.allSettled([
        fetchDevToPosts('artificial', sort, 10),
        fetchHNStories(sort, 20)
      ]);
      const dev = devPosts.status === 'fulfilled' ? devPosts.value : [];
      const hn = (hnPosts.status === 'fulfilled' ? hnPosts.value : [])
        .filter(p => p.category === 'artificial');
      posts = [...dev, ...hn].slice(0, 15);
    }

    allPosts = posts;
    await renderPosts([...allPosts]);
  } catch (err) {
    console.error(err);
    box.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🌐</div>
        <h3>${TR[lang].net_err}</h3>
      </div>`;
    if (resCount) resCount.textContent = '0 ' + TR[lang].found;
  }
}

// =============================================
// POSTLARNI KO'RSATISH
// =============================================
async function renderPosts(posts) {
  const box = document.getElementById('postsContainer');
  const resCount = document.getElementById('resultsCount');
  if (!box) return;

  if (posts.length === 0) {
    box.innerHTML = `<div class="empty-state"><div class="empty-icon">🔍</div><h3>Hech narsa topilmadi</h3></div>`;
    if (resCount) resCount.textContent = '0 ' + TR[lang].found;
    return;
  }

  // Inglizcha bo'lmasa, sarlavhalarni AI bilan tarjima qil
  if (lang !== 'en') {
    if (resCount) resCount.textContent = "🤖 AI tarjima qilmoqda...";

    const untranslated = posts.filter(p => !p.displayTitle);
    if (untranslated.length > 0) {
      const titles = untranslated.map((p, i) => `${i + 1}. ${p.title}`).join('\n');
      const translated = await apiCall(TR[lang].translate_prompt(titles));

      if (translated) {
        const lines = translated.split('\n').filter(l => l.trim());
        untranslated.forEach((p, i) => {
          const raw = lines[i] || '';
          const cleaned = raw.replace(/^\d+[\.\)]\s*/, '').trim();
          if (cleaned) p.displayTitle = cleaned;
        });
      }
    }
  }

  if (resCount) resCount.textContent = `${posts.length} ${TR[lang].found}`;

  box.innerHTML = posts.map(post => {
    const tagClass = getTagClass(post.category);
    const sourceBadge = post.source === 'HackerNews'
      ? `<span class="post-tag" style="background:#ff6600;color:#fff;font-size:.7rem">HN</span>`
      : `<span class="post-tag" style="background:#3b49df;color:#fff;font-size:.7rem">DEV</span>`;
    return `
      <article class="post" style="animation-delay:${Math.random() * 0.2}s">
        <div class="post-meta">
          ${sourceBadge}
          <span class="post-tag ${tagClass}">${post.category.toUpperCase()}</span>
          <span class="post-date">${formatDate(post.created)}</span>
          <span class="post-score">▲ ${formatNum(post.score)}</span>
        </div>
        <h3><a href="${post.url}" target="_blank" rel="noopener">${escHtml(post.displayTitle || post.title)}</a></h3>
        <div class="post-actions">
          <button class="tldr-btn" onclick="doTLDR(this,'${post.id}')">${TR[lang].tldr_btn}</button>
          <a class="source-btn" href="${post.url}" target="_blank" rel="noopener">${TR[lang].source}</a>
          <span class="comments-badge">💬 ${formatNum(post.num_comments)}</span>
        </div>
        <div class="tldr-result" id="tldr-${post.id}" style="display:none;"></div>
      </article>
    `;
  }).join('');
}

// =============================================
// QIDIRUV VA FILTR
// =============================================
function filterPosts() {
  const query = (document.getElementById('searchInput')?.value || '').toLowerCase().trim();
  if (!query) {
    renderPosts([...allPosts]);
    return;
  }
  const filtered = allPosts.filter(p => {
    const haystack = ((p.displayTitle || p.title) + ' ' + p.category).toLowerCase();
    return haystack.includes(query);
  });
  renderPosts(filtered);
}

function setFilter(btn, sub) {
  document.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  // Qidiruvni tozalash
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = '';
  loadPosts(sub);
}

// =============================================
// AI — TL;DR
// =============================================
async function doTLDR(btn, id) {
  const post = allPosts.find(p => p.id === id);
  if (!post) return;
  const resultBox = document.getElementById(`tldr-${id}`);
  if (!resultBox) return;

  // Agar allaqachon ko'rsatilgan bo'lsa — toggle
  if (resultBox.style.display === 'block') {
    resultBox.style.display = 'none';
    btn.textContent = TR[lang].tldr_btn;
    btn.disabled = false;
    return;
  }

  btn.disabled = true;
  btn.innerHTML = `<span class="spinner" style="display:inline-block;width:12px;height:12px;border:2px solid rgba(255,255,255,0.3);border-top-color:#fff;border-radius:50%;animation:spin .6s linear infinite;vertical-align:middle;margin-right:6px;"></span>`;
  resultBox.style.display = 'block';
  resultBox.innerHTML = `<div class="ai-loading"><div class="spinner"></div> ${TR[lang].tldr_wait}</div>`;

  const summary = await apiCall(TR[lang].tldr_prompt(post.title, post.text));

  if (summary) {
    const lines = summary.split('\n').filter(l => l.trim()).slice(0, 3);
    resultBox.innerHTML = `
      <span class="tldr-label">// TL;DR — AI</span>
      ${lines.map(l => `<p style="margin:4px 0">• ${l.replace(/^[•\-\*\d\.]+\s*/, '')}</p>`).join('')}
    `;
    btn.textContent = TR[lang].tldr_done;
    btn.disabled = false;
  } else {
    resultBox.innerHTML = `<span style="color:#fc5c7d">⚠️ ${TR[lang].tldr_err}</span>`;
    btn.textContent = TR[lang].tldr_btn;
    btn.disabled = false;
  }
}

// =============================================
// KANBAN — VAZIFA QO'SHISH
// =============================================
async function addTask() {
  const input = document.getElementById('taskInput');
  if (!input) return;
  const name = input.value.trim();
  if (!name) { input.focus(); return; }

  input.value = '';
  const overlay = document.getElementById('modalOverlay');
  const subtasksContainer = document.getElementById('subtasksContainer');
  const modalLabel = document.getElementById('modalTaskLabel');
  if (!overlay || !subtasksContainer) return;

  if (modalLabel) modalLabel.textContent = '📌 ' + name;
  overlay.style.display = 'flex';
  subtasksContainer.innerHTML = `<div class="ai-loading"><div class="spinner"></div> ${TR[lang].tldr_wait}</div>`;

  const result = await apiCall(TR[lang].subtask_prompt(name));

  if (result) {
    const items = result.split('\n')
      .map(l => l.replace(/^\d+[\.\)]\s*/, '').replace(/^[-•*]\s*/, '').trim())
      .filter(l => l.length > 2)
      .slice(0, 7);

    subtasksContainer.innerHTML = items.map((item, i) => `
      <div class="subtask-item">
        <input type="checkbox" id="st-${i}" checked>
        <label for="st-${i}">${escHtml(item)}</label>
      </div>
    `).join('');

    window.tempTask = { name, tasks: items };
  } else {
    subtasksContainer.innerHTML = `<p style="color:var(--muted);font-size:.9rem">${TR[lang].tldr_err}</p>`;
    window.tempTask = { name, tasks: [] };
  }
}

function confirmTask() {
  if (!window.tempTask) return;
  const selected = [...document.querySelectorAll('#subtasksContainer input[type=checkbox]:checked')]
    .map(el => el.nextElementSibling?.textContent || '');
  createCard(window.tempTask.name, selected, 'todo');
  closeModal();
}

function createCard(name, subtasks, colId) {
  const col = document.getElementById('col-' + colId);
  if (!col) return;

  const card = document.createElement('div');
  card.className = 'task-card';
  card.id = 'card-' + Date.now();
  card.draggable = true;

  const listItems = subtasks.map((s, i) => `
    <li id="li-${card.id}-${i}" onclick="toggleSubtask(this)">
      <input type="checkbox" onclick="event.stopPropagation(); toggleSubtask(this.parentElement)">
      <span>${escHtml(s)}</span>
    </li>
  `).join('');

  const total = subtasks.length;
  card.innerHTML = `
    <div class="card-top">
      <h4>${escHtml(name)}</h4>
      <button class="delete-btn" onclick="deleteCard('${card.id}')" title="O'chirish">🗑</button>
    </div>
    ${total > 0 ? `
    <div class="card-progress">
      <div class="progress-bar"><div class="progress-fill" id="pf-${card.id}" style="width:0%"></div></div>
      <span class="progress-text" id="pt-${card.id}">0/${total}</span>
    </div>` : ''}
    <ul>${listItems}</ul>
  `;

  // Drag & drop events
  card.addEventListener('dragstart', e => {
    draggedCard = card;
    setTimeout(() => card.style.opacity = '0.4', 0);
    e.dataTransfer.effectAllowed = 'move';
  });
  card.addEventListener('dragend', () => {
    card.style.opacity = '1';
    draggedCard = null;
    updateCounts();
  });

  col.appendChild(card);
  updateCounts();
}

function toggleSubtask(li) {
  const cb = li.querySelector('input[type=checkbox]');
  if (cb) cb.checked = !cb.checked;
  li.classList.toggle('checked', cb?.checked);
  updateProgress(li.closest('.task-card'));
}

function updateProgress(card) {
  if (!card) return;
  const items = card.querySelectorAll('li');
  const checked = card.querySelectorAll('li input:checked').length;
  const total = items.length;
  if (total === 0) return;

  const pct = Math.round(checked / total * 100);
  const pf = card.querySelector('[id^="pf-"]');
  const pt = card.querySelector('[id^="pt-"]');
  if (pf) pf.style.width = pct + '%';
  if (pt) pt.textContent = `${checked}/${total}`;

  // Hammasi bajarildi badge
  const existingBadge = card.querySelector('.done-badge');
  if (checked === total && total > 0) {
    if (!existingBadge) {
      const badge = document.createElement('div');
      badge.className = 'done-badge';
      badge.textContent = TR[lang].all_done;
      card.querySelector('.card-top').after(badge);
    }
  } else if (existingBadge) {
    existingBadge.remove();
  }
}

function deleteCard(id) {
  const card = document.getElementById(id);
  if (card) {
    card.style.transform = 'scale(0.9)';
    card.style.opacity = '0';
    card.style.transition = 'all 0.2s';
    setTimeout(() => { card.remove(); updateCounts(); }, 200);
  }
}

function closeModal() {
  const overlay = document.getElementById('modalOverlay');
  if (overlay) overlay.style.display = 'none';
  window.tempTask = null;
}

function updateCounts() {
  ['todo', 'doing', 'done'].forEach(id => {
    const col = document.getElementById('col-' + id);
    const cnt = document.getElementById('count-' + id);
    if (col && cnt) cnt.textContent = col.querySelectorAll('.task-card').length;
  });
}

// =============================================
// DRAG & DROP
// =============================================
function onDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  e.currentTarget.classList.add('drag-over');
}

function onDragLeave(e) {
  e.currentTarget.classList.remove('drag-over');
}

function onDrop(e, colId) {
  e.preventDefault();
  e.currentTarget.classList.remove('drag-over');
  if (draggedCard) {
    const target = document.getElementById('col-' + colId);
    if (target) target.appendChild(draggedCard);
    updateCounts();
  }
}

// =============================================
// YORDAMCHI FUNKSIYALAR
// =============================================
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatDate(utc) {
  return new Date(utc * 1000).toLocaleDateString(
    lang === 'uz' ? 'uz-UZ' : lang === 'ru' ? 'ru-RU' : 'en-US',
    { day: 'numeric', month: 'short', year: 'numeric' }
  );
}

function formatNum(n) {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
  return n;
}

function getTagClass(sub) {
  const s = (sub || '').toLowerCase();
  if (s.includes('web') || s.includes('frontend') || s.includes('css') || s.includes('html')) return 'green';
  if (s.includes('artificial') || s.includes('machine') || s.includes('ai') || s.includes('ml')) return 'yellow';
  if (s.includes('security') || s.includes('netsec') || s.includes('hack')) return 'red';
  return '';
}

// =============================================
// MODAL — TASHQARINI BOSISH YOPADI
// =============================================
document.addEventListener('click', e => {
  const overlay = document.getElementById('modalOverlay');
  if (overlay && e.target === overlay) closeModal();
});

// ESC tugmasi modal yopadi
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// =============================================
// ISHGA TUSHIRISH
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('lang') || 'uz';
  setLang(saved, false);
  if (document.getElementById('postsContainer')) {
    loadPosts('all');
  }
});