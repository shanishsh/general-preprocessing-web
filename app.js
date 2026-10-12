// ==========================================================================
// ML PIPELINE OS — JAVASCRIPT APPLICATION CONTROLLER
// PURE BLACK MINIMALIST UI (MATCHING SCREENSHOT)
// ==========================================================================

// Mapping checklist items to relevant code recipes from the PDF
const ITEM_TO_RECIPES = {
  // Master tracker items
  "mt-4": ["recipe-normal-lib", "recipe-pandas-profiling", "recipe-basic-eda-plots"],
  "mt-5": ["recipe-multicollinearity-drop"],
  "mt-6": ["recipe-basic-eda-plots", "recipe-residual-plots", "recipe-kmeans-elbow"],
  "mt-7": ["recipe-basic-eda-plots", "recipe-corr-target", "recipe-mutual-info", "recipe-chi2-test", "recipe-cramers-v", "recipe-anova-test"],
  "mt-8": ["recipe-basic-eda-plots"],
  "mt-12": ["recipe-normal-lib"],
  "mt-13": ["recipe-col-transformer"],
  "mt-14": ["recipe-label-encoder", "recipe-one-hot-encoding"],
  "mt-15": ["recipe-standard-scaler", "recipe-minmax-scaler"],
  "mt-17": ["recipe-binning-cut"],
  "mt-18": ["recipe-multicollinearity-drop", "recipe-pca"],
  "mt-19": ["recipe-col-transformer"],
  "mt-20": ["recipe-baseline-dummy"],
  "mt-21": ["recipe-candidate-imports", "recipe-linear-regression-train", "recipe-stacking-classifier", "recipe-advanced-stacked-ensemble"],
  "mt-22": ["recipe-random-forest-grid", "recipe-knn-grid", "recipe-learning-curve"],
  "mt-23": ["recipe-regression-metrics", "recipe-classification-eval", "recipe-roc-curve-plot"],
  "mt-24": ["recipe-residual-plots", "recipe-actual-vs-predicted-graph", "recipe-logistic-coefficients"],
  "mt-30": ["recipe-production-logging"],

  // EDA 31 checklist mappings
  "eda-1": ["recipe-normal-lib"],
  "eda-5": ["recipe-pandas-profiling"],
  "eda-9": ["recipe-binning-cut"],
  "eda-10": ["recipe-multicollinearity-drop"],
  "eda-12": ["recipe-basic-eda-plots"],
  "eda-13": ["recipe-basic-eda-plots"],
  "eda-14": ["recipe-basic-eda-plots", "recipe-residual-plots"],
  "eda-15": ["recipe-basic-eda-plots"],
  "eda-19": ["recipe-basic-eda-plots", "recipe-corr-target", "recipe-mutual-info"],
  "eda-20": ["recipe-basic-eda-plots", "recipe-multicollinearity-drop"],
  "eda-21": ["recipe-chi2-test", "recipe-cramers-v", "recipe-anova-test"],
  "eda-23": ["recipe-multicollinearity-drop"],

  // Preprocessing 24 sign-off mappings
  "prep-1": ["recipe-normal-lib"],
  "prep-2": ["recipe-schema-validation"],
  "prep-3": ["recipe-missing-report"],
  "prep-4": ["recipe-invalid-bounds-check"],
  "prep-5": ["recipe-multicollinearity-drop"],
  "prep-6": ["recipe-col-transformer", "recipe-pipeline-production-mixed"],
  "prep-7": ["recipe-duplicate-check"],
  "prep-8": ["recipe-basic-eda-plots"],
  "prep-9": ["recipe-standard-scaler", "recipe-minmax-scaler"],
  "prep-10": ["recipe-one-hot-encoding", "recipe-label-encoder", "recipe-col-transformer"],
  "prep-11": ["recipe-type-coercion"],
  "prep-12": ["recipe-one-hot-encoding"],
  "prep-13": ["recipe-pipeline-production-mixed"],
  "prep-14": ["recipe-pipeline-production-mixed"],
  "prep-15": ["recipe-col-transformer", "recipe-pipeline-production-mixed"],
  "prep-16": ["recipe-invalid-bounds-check"],
  "prep-17": ["recipe-col-transformer", "recipe-pipeline-production-mixed"],
  "prep-18": ["recipe-multicollinearity-drop"],
  "prep-19": ["recipe-pipeline-production-mixed"],
  "prep-20": ["recipe-schema-validation"],
  "prep-21": ["recipe-save-joblib-pipeline"],
  "prep-22": ["recipe-production-logging"],
  "prep-23": ["recipe-missing-report", "recipe-schema-validation"],
  "prep-24": ["recipe-save-joblib-pipeline", "recipe-production-logging"],

  // Leakage 18 audit mappings
  "leak-1": ["recipe-linear-regression-train"],
  "leak-2": ["recipe-group-overlap-audit"],
  "leak-3": ["recipe-duplicate-check"],
  "leak-4": ["recipe-time-series-leakage-shift"],
  "leak-5": ["recipe-standard-scaler", "recipe-pipeline-production-mixed"],
  "leak-6": ["recipe-one-hot-encoding", "recipe-col-transformer"],
  "leak-7": ["recipe-invalid-bounds-check"],
  "leak-8": ["recipe-pipeline-production-mixed"],
  "leak-9": ["recipe-time-series-leakage-shift"],
  "leak-10": ["recipe-schema-validation"],
  "leak-11": ["recipe-corr-target", "recipe-multicollinearity-drop"],
  "leak-12": ["recipe-time-series-leakage-shift"],
  "leak-13": ["recipe-multicollinearity-drop"],
  "leak-14": ["recipe-pipeline-production-mixed"],
  "leak-15": ["recipe-linear-regression-train"],
  "leak-16": ["recipe-target-permutation-test", "recipe-classification-eval"],
  "leak-17": ["recipe-target-permutation-test"],
  "leak-18": ["recipe-save-joblib-pipeline"]
};

class MLChecklistApp {
  constructor() {
    this.projects = [];
    this.currentProjectId = null;
    this.activeTab = "master"; // 'master', 'eda', 'plots', 'recipes', 'phases', 'tools'
    this.recipeCategory = "All";
    this.recipeSearchQuery = "";
    this.plotCategory = "All";
    this.plotSearchQuery = "";
    this.showPlotImages = true;
    this.init();
  }

  init() {
    this.loadState();
    this.renderDatasetDropdown();
    this.renderActiveTab();
  }

  // --- LOCALSTORAGE PERSISTENCE ---
  loadState() {
    const saved = localStorage.getItem("ml_checklist_projects");
    if (saved) {
      try {
        this.projects = JSON.parse(saved);
      } catch (e) {
        console.error("Error reading saved projects", e);
        this.projects = JSON.parse(JSON.stringify(DEFAULT_PROJECTS));
      }
    } else {
      this.projects = JSON.parse(JSON.stringify(DEFAULT_PROJECTS));
      this.saveState();
    }

    const savedId = localStorage.getItem("ml_checklist_active_project");
    if (savedId && this.projects.some(p => p.id === savedId)) {
      this.currentProjectId = savedId;
    } else if (this.projects.length > 0) {
      this.currentProjectId = this.projects[0].id;
    }
  }

  saveState() {
    localStorage.setItem("ml_checklist_projects", JSON.stringify(this.projects));
    if (this.currentProjectId) {
      localStorage.setItem("ml_checklist_active_project", this.currentProjectId);
    }
  }

  getActiveProject() {
    return this.projects.find(p => p.id === this.currentProjectId) || this.projects[0];
  }

  // --- ITEM STATUS & NOTES ---
  isItemChecked(itemId) {
    const p = this.getActiveProject();
    if (!p || !p.checkedItems || !p.checkedItems[itemId]) return false;
    return p.checkedItems[itemId].status === "done";
  }

  toggleItem(itemId) {
    const p = this.getActiveProject();
    if (!p) return;
    if (!p.checkedItems) p.checkedItems = {};

    const currentlyDone = p.checkedItems[itemId]?.status === "done";
    const nextStatus = currentlyDone ? "pending" : "done";

    if (!p.checkedItems[itemId]) {
      p.checkedItems[itemId] = { status: nextStatus, note: "" };
    } else {
      p.checkedItems[itemId].status = nextStatus;
    }

    this.saveState();
    this.updateItemDOM(itemId, nextStatus === "done");
    this.updateProgressDisplays();
  }

  getItemNote(itemId) {
    const p = this.getActiveProject();
    return p?.checkedItems?.[itemId]?.note || "";
  }

  saveItemNote(itemId, noteText) {
    const p = this.getActiveProject();
    if (!p) return;
    if (!p.checkedItems) p.checkedItems = {};
    if (!p.checkedItems[itemId]) {
      p.checkedItems[itemId] = { status: "pending", note: noteText.trim() };
    } else {
      p.checkedItems[itemId].note = noteText.trim();
    }
    this.saveState();
    this.showToast("Note saved");
  }

  toggleNoteDrawer(itemId) {
    const drawer = document.getElementById(`note-drawer-${itemId}`);
    if (drawer) {
      drawer.classList.toggle("open");
      if (drawer.classList.contains("open")) {
        const input = drawer.querySelector("input");
        if (input) input.focus();
      }
    }
  }

  // --- STATS COMPUTATION ---
  getStats() {
    const p = this.getActiveProject();
    if (!p || !p.checkedItems) return { masterDone: 0, masterTotal: 32, percent: 0, edaDone: 0, edaTotal: 31, prepDone: 0, prepTotal: 24 };

    let masterDone = 0;
    ML_WORKFLOW_DATA.masterTracker.forEach(item => {
      if (p.checkedItems[item.id]?.status === "done") masterDone++;
    });

    let edaDone = 0;
    ML_WORKFLOW_DATA.edaTracker.forEach(item => {
      if (p.checkedItems[item.id]?.status === "done") edaDone++;
    });

    let prepDone = 0;
    if (ML_WORKFLOW_DATA.preprocessingTracker) {
      ML_WORKFLOW_DATA.preprocessingTracker.forEach(item => {
        if (p.checkedItems[item.id]?.status === "done") prepDone++;
      });
    }

    let leakDone = 0;
    if (ML_WORKFLOW_DATA.leakageTracker) {
      ML_WORKFLOW_DATA.leakageTracker.forEach(item => {
        if (p.checkedItems[item.id]?.status === "done") leakDone++;
      });
    }

    const masterTotal = ML_WORKFLOW_DATA.masterTracker.length;
    const edaTotal = ML_WORKFLOW_DATA.edaTracker.length;
    const prepTotal = ML_WORKFLOW_DATA.preprocessingTracker ? ML_WORKFLOW_DATA.preprocessingTracker.length : 24;
    const leakTotal = ML_WORKFLOW_DATA.leakageTracker ? ML_WORKFLOW_DATA.leakageTracker.length : 18;
    const percent = Math.round((masterDone / masterTotal) * 100);

    return { masterDone, masterTotal, percent, edaDone, edaTotal, prepDone, prepTotal, leakDone, leakTotal };
  }

  updateProgressDisplays() {
    const stats = this.getStats();

    // Update master progress
    const pctDisplay = document.getElementById("progress-percent-display");
    if (pctDisplay) pctDisplay.textContent = `${stats.percent}%`;

    const fillBar = document.getElementById("progress-line-fill");
    if (fillBar) fillBar.style.width = `${stats.percent}%`;

    // Update eda progress if on eda tab
    const edaPctDisplay = document.getElementById("eda-percent-display");
    if (edaPctDisplay) edaPctDisplay.textContent = `${stats.edaDone}/${stats.edaTotal}`;

    const edaFillBar = document.getElementById("eda-line-fill");
    if (edaFillBar) edaFillBar.style.width = `${Math.round((stats.edaDone / stats.edaTotal) * 100)}%`;

    // Update prep progress if on preprocessing tab
    const prepPctDisplay = document.getElementById("prep-percent-display");
    if (prepPctDisplay) prepPctDisplay.textContent = `${stats.prepDone}/${stats.prepTotal}`;

    const prepFillBar = document.getElementById("prep-line-fill");
    if (prepFillBar) prepFillBar.style.width = `${Math.round((stats.prepDone / stats.prepTotal) * 100)}%`;

    // Update leak progress if on leakage tab
    const leakPctDisplay = document.getElementById("leak-percent-display");
    if (leakPctDisplay) leakPctDisplay.textContent = `${stats.leakDone}/${stats.leakTotal}`;

    const leakFillBar = document.getElementById("leak-line-fill");
    if (leakFillBar) leakFillBar.style.width = `${Math.round((stats.leakDone / stats.leakTotal) * 100)}%`;
  }

  updateItemDOM(itemId, isChecked) {
    const row = document.getElementById(`row-${itemId}`);
    if (row) {
      row.classList.toggle("checked", isChecked);
    }
  }

  // --- NAVIGATION TABS ---
  switchTab(tabId) {
    this.activeTab = tabId;
    document.querySelectorAll(".nav-tab-btn").forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-tab") === tabId);
    });
    this.renderActiveTab();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  renderActiveTab() {
    const container = document.getElementById("main-content");
    if (!container) return;

    switch (this.activeTab) {
      case "master":
        this.renderMasterView(container);
        break;
      case "eda":
        this.renderEdaView(container);
        break;
      case "preprocessing":
        this.renderPreprocessingView(container);
        break;
      case "leakage":
        this.renderLeakageView(container);
        break;
      case "plots":
        this.renderPlotGuideView(container);
        break;
      case "recipes":
        this.renderRecipesView(container);
        break;
      case "phases":
        this.renderPhasesView(container);
        break;
      case "tools":
        this.renderToolsView(container);
        break;
      default:
        this.renderMasterView(container);
    }
  }

  // ==========================================================================
  // 1. MASTER CHECKLIST VIEW (EXACT MATCH OF USER SCREENSHOT)
  // ==========================================================================
  renderMasterView(container) {
    const stats = this.getStats();

    // Group items into: Problem and data, EDA, Data preparation, Training and evaluation, Production
    const groups = {};
    ML_WORKFLOW_DATA.masterTracker.forEach(item => {
      if (!groups[item.group]) groups[item.group] = [];
      groups[item.group].push(item);
    });

    container.innerHTML = `
      <h1 class="page-title">Your complete ML project checklist</h1>
      <p class="page-subtitle">Use this condensed checklist for every project. The detailed sections above explain when each operation is appropriate.</p>

      <div class="checklist-card">
        <div class="card-header-row">
          <div>
            <div class="card-title-text">Project progress</div>
            <div class="card-instructions">Mark a task complete as it is implemented and verified.</div>
          </div>
          <div class="progress-percent-text" id="progress-percent-display">${stats.percent}%</div>
        </div>

        <div class="progress-line-track">
          <div class="progress-line-fill" id="progress-line-fill" style="width: ${stats.percent}%;"></div>
        </div>

        ${Object.keys(groups).map(grp => `
          <div class="section-group">
            <div class="group-heading">${grp}</div>
            <div class="group-items">
              ${groups[grp].map(item => this.renderCheckRowHTML(item.id, item.title)).join("")}
            </div>
          </div>
        `).join("")}

        <div class="card-bottom-actions">
          <button class="text-action-btn" onclick="app.resetActiveChecklist()">Reset</button>
          <button class="text-action-btn" onclick="app.copyMarkdownChecklist()">Copy checklist</button>
        </div>
      </div>
    `;
  }

  renderCheckRowHTML(id, title, desc = null) {
    const checked = this.isItemChecked(id);
    const note = this.getItemNote(id);
    const recipeIds = ITEM_TO_RECIPES[id] || [];

    let codeDrawerHTML = "";
    if (recipeIds.length > 0) {
      const recipes = ML_WORKFLOW_DATA.codeRecipes.filter(r => recipeIds.includes(r.id));
      if (recipes.length > 0) {
        codeDrawerHTML = `
          <div class="item-code-drawer" id="code-drawer-${id}">
            ${recipes.map(r => `
              <div class="code-box" style="margin: 8px 0;">
                <div class="code-box-header">
                  <span>${escapeHtml(r.title)}</span>
                  <button class="code-copy-btn" onclick="app.copyCodeSnippet(this)">Copy code</button>
                </div>
                <pre><code>${escapeHtml(r.code)}</code></pre>
              </div>
            `).join("")}
          </div>
        `;
      }
    }

    return `
      <div class="check-row ${checked ? 'checked' : ''}" id="row-${id}">
        <div class="circle-checkbox" onclick="app.toggleItem('${id}')">
          <svg class="circle-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <div class="check-row-content">
          <div style="display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap;">
            <span class="check-item-title" onclick="app.toggleItem('${id}')">${escapeHtml(title)}</span>
            ${recipeIds.length > 0 ? `<button class="code-pill-btn" onclick="app.toggleCodeDrawer('${id}')" title="View python code snippet">&lt;/&gt; code</button>` : ''}
            <button class="note-toggle-btn" onclick="app.toggleNoteDrawer('${id}')" title="Add dataset note">${note ? '✎ note' : '+ note'}</button>
          </div>
          ${desc ? `<div class="check-item-desc" style="font-size: 0.81rem; color: var(--text-muted); margin-top: 3px; line-height: 1.4;">${escapeHtml(desc)}</div>` : ''}
          
          <div class="item-note-row ${note ? 'open' : ''}" id="note-drawer-${id}">
            <input type="text" class="item-note-input" placeholder="Dataset finding or decision..." value="${escapeHtml(note)}" onblur="app.saveItemNote('${id}', this.value)">
          </div>

          ${codeDrawerHTML}
        </div>
      </div>
    `;
  }

  toggleCodeDrawer(id) {
    const el = document.getElementById(`code-drawer-${id}`);
    if (el) {
      el.classList.toggle("open");
    }
  }

  // ==========================================================================
  // CODE RECIPES VIEW (ALL RECIPES FROM USER PDF)
  // ==========================================================================
  renderRecipesView(container) {
    const categories = [
      "All",
      "EDA & Profiling",
      "Data Preprocessing",
      "Unsupervised & Clustering",
      "Training & Modeling",
      "Model Evaluation",
      "Production & Deployment"
    ];

    let recipes = ML_WORKFLOW_DATA.codeRecipes || [];
    if (this.recipeCategory !== "All") {
      recipes = recipes.filter(r => r.category === this.recipeCategory);
    }
    if (this.recipeSearchQuery) {
      const q = this.recipeSearchQuery.toLowerCase();
      recipes = recipes.filter(r => 
        r.title.toLowerCase().includes(q) || 
        r.desc.toLowerCase().includes(q) || 
        r.code.toLowerCase().includes(q)
      );
    }

    container.innerHTML = `
      <h1 class="page-title">ML Code Recipes & Cookbooks</h1>
      <p class="page-subtitle">Production-tested python, pandas, and scikit-learn recipes for your modeling workflow.</p>

      <input type="text" class="recipe-search-box" placeholder="Search recipes (e.g. cramers, anova, stacking, residuals, gridsearch, elbow, pca, scaler, roc)..." value="${escapeHtml(this.recipeSearchQuery)}" oninput="app.handleRecipeSearch(this.value)">

      <div class="recipe-filter-bar">
        ${categories.map(c => `
          <button class="recipe-filter-btn ${this.recipeCategory === c ? 'active' : ''}" onclick="app.setRecipeCategory('${c}')">${c}</button>
        `).join("")}
      </div>

      <div class="recipes-list">
        ${recipes.length === 0 ? `<div style="color: var(--text-muted); padding: 20px 0;">No recipes found matching your query.</div>` : ''}
        ${recipes.map(r => `
          <div class="recipe-card">
            <div class="recipe-card-header">
              <div class="recipe-title">${escapeHtml(r.title)}</div>
              <span class="recipe-badge">${escapeHtml(r.category)}</span>
            </div>
            <div class="recipe-desc">${escapeHtml(r.desc)}</div>
            <div class="code-box">
              <div class="code-box-header">
                <span>python</span>
                <button class="code-copy-btn" onclick="app.copyCodeSnippet(this)">Copy code</button>
              </div>
              <pre><code>${escapeHtml(r.code)}</code></pre>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  setRecipeCategory(cat) {
    this.recipeCategory = cat;
    this.renderActiveTab();
  }

  handleRecipeSearch(query) {
    this.recipeSearchQuery = query.trim();
    this.renderActiveTab();
  }

  // ==========================================================================
  // 2. EDA 31-STEP TRACKER VIEW (MATCHING BLACK MINIMALIST STYLE)
  // ==========================================================================
  renderEdaView(container) {
    const stats = this.getStats();

    // Group EDA items by category
    const categories = {};
    ML_WORKFLOW_DATA.edaTracker.forEach(item => {
      if (!categories[item.category]) categories[item.category] = [];
      categories[item.category].push(item);
    });

    const plotGuide = ML_WORKFLOW_DATA.edaPlotGuide;

    container.innerHTML = `
      <h1 class="page-title">Exploratory Data Analysis (EDA)</h1>
      <p class="page-subtitle">EDA is the investigation phase. Its purpose is to understand the data before deciding how to clean, transform, and model it.</p>

      <!-- Plot Guide Quick Link Banner -->
      <div style="margin-bottom: 20px; padding: 14px 18px; background: #080808; border: 1px solid var(--border-card); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: space-between; gap: 14px; flex-wrap: wrap;">
        <div>
          <div style="color: #fff; font-weight: 600; font-size: 0.92rem;">Visual EDA Plot Interpretation Guide</div>
          <div style="font-size: 0.82rem; color: var(--text-secondary); margin-top: 2px;">
            Learn what insights to look for across histograms, box plots, scatter relationships, heatmaps, and residual plots.
          </div>
        </div>
        <button class="btn-minimal" onclick="app.switchTab('plots')" style="white-space: nowrap; color: #fff; border-color: #444;">
          Open Plot Guide →
        </button>
      </div>

      <div class="checklist-card">
        <div class="card-header-row">
          <div>
            <div class="card-title-text">EDA completion tracker</div>
            <div class="card-instructions">Mark each inspection step as it is verified on your dataset.</div>
          </div>
          <div class="progress-percent-text" id="eda-percent-display">${stats.edaDone}/${stats.edaTotal}</div>
        </div>

        <div class="progress-line-track">
          <div class="progress-line-fill" id="eda-line-fill" style="width: ${Math.round((stats.edaDone / stats.edaTotal) * 100)}%;"></div>
        </div>

        ${Object.keys(categories).map(cat => `
          <div class="section-group">
            <div class="group-heading">${cat}</div>
            <div class="group-items">
              ${categories[cat].map(item => this.renderCheckRowHTML(item.id, item.name)).join("")}
            </div>
          </div>
        `).join("")}

        <div class="card-bottom-actions">
          <button class="text-action-btn" onclick="app.resetEdaChecklist()">Reset</button>
          <button class="text-action-btn" onclick="app.copyMarkdownChecklist()">Copy checklist</button>
        </div>
      </div>

      <!-- Section 2.2 Table -->
      <div class="checklist-card" style="margin-top: 24px;">
        <div class="card-title-text" style="margin-bottom: 12px;">2.2 Which EDA analyses should be used?</div>
        <div class="minimal-table-container">
          <table class="minimal-table">
            <thead>
              <tr>
                <th>Analysis</th>
                <th>When to use it</th>
                <th>Typical tools</th>
              </tr>
            </thead>
            <tbody>
              ${ML_WORKFLOW_DATA.phases[1].tableData.rows.map(r => `
                <tr>
                  <td><strong>${r[0]}</strong></td>
                  <td>${r[1]}</td>
                  <td><code>${r[2]}</code></td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
        <div style="font-size: 0.82rem; color: var(--text-secondary); margin-top: 10px; line-height: 1.5;">
          ${ML_WORKFLOW_DATA.phases[1].tableData.cautionNote}
        </div>
      </div>

      <!-- Action Decision Matrix from Plot Guide -->
      ${plotGuide ? `
        <div class="checklist-card" style="margin-top: 24px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
            <div>
              <div class="card-title-text">What should you do after seeing an insight?</div>
              <div class="card-instructions">Connect visual and statistical observations directly to preprocessing and modeling actions.</div>
            </div>
            <button class="btn-minimal" onclick="app.switchTab('plots')">Visual Plot Gallery (15 Plots) →</button>
          </div>

          <div class="minimal-table-container">
            <table class="minimal-table">
              <thead>
                <tr>
                  <th style="width: 32%;">Observation</th>
                  <th style="width: 34%;">Possible Action</th>
                  <th style="width: 34%;">Important Caution</th>
                </tr>
              </thead>
              <tbody>
                ${plotGuide.decisionMatrix.map(row => `
                  <tr>
                    <td><strong style="color: #fff;">${escapeHtml(row.observation)}</strong></td>
                    <td style="color: #ddd;">${escapeHtml(row.action)}</td>
                    <td style="color: var(--text-muted); font-size: 0.8rem;">${escapeHtml(row.caution)}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      ` : ''}
    `;
  }

  // ==========================================================================
  // PREPROCESSING VIEW: 24-STEP SIGN-OFF & 14-STAGE WORKFLOW ROADMAP
  // ==========================================================================
  renderPreprocessingView(container) {
    const stats = this.getStats();

    // Group Preprocessing items by category (4 sign-off categories)
    const categories = {};
    (ML_WORKFLOW_DATA.preprocessingTracker || []).forEach(item => {
      if (!categories[item.category]) categories[item.category] = [];
      categories[item.category].push(item);
    });

    container.innerHTML = `
      <h1 class="page-title">Complete Data Preprocessing for Production ML</h1>
      <p class="page-subtitle">Convert raw data into clean, consistent, valid, and model-ready features. Ensure reproducibility, strict leakage prevention, testability, and train-serving parity.</p>

      <!-- Quick Jump / Action Bar -->
      <div style="margin-bottom: 22px; display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
        <a href="#prep-signoff-card" class="btn-minimal" style="color: #fff; border-color: #333;">Sign-Off Tracker (0/24)</a>
        <a href="#prep-workflow-14" class="btn-minimal">14-Stage Roadmap</a>
        <a href="#prep-leakage-rules" class="btn-minimal">Leakage Boundaries</a>
        <a href="#prep-implementation-order" class="btn-minimal">10-Step Sequence</a>
        <button class="btn-minimal" onclick="app.switchTab('recipes')">Python Recipes →</button>
        <button class="btn-minimal" onclick="app.switchTab('phases')">Phase 4 Deep Dive →</button>
      </div>

      <!-- Leakage Alert Banner -->
      <div style="margin-bottom: 24px; padding: 14px 18px; background: #0a0a0a; border: 1px solid #222; border-left: 3px solid #fff; border-radius: var(--radius-md);">
        <div style="font-size: 0.88rem; font-weight: 600; color: #fff;">Strict Leakage Prevention Protocol</div>
        <div style="font-size: 0.82rem; color: var(--text-secondary); margin-top: 4px; line-height: 1.5;">
          <strong>Before splitting:</strong> Only deterministic schema checks, file load validation, and known format normalization.
          <br>
          <strong>After splitting (strictly on training data):</strong> Imputer statistics (mean/median/mode), scalers (min/max/mean/std/IQR), categorical encodings, outlier thresholds, and feature selection must never see validation or test sets.
        </div>
      </div>

      <!-- 24-Step Sign-Off Tracker Card -->
      <div class="checklist-card" id="prep-signoff-card">
        <div class="card-header-row">
          <div>
            <div class="card-title-text">Preprocessing sign-off tracker</div>
            <div class="card-instructions">Sign off on every production requirement before initiating model training.</div>
          </div>
          <div class="progress-percent-text" id="prep-percent-display">${stats.prepDone}/${stats.prepTotal}</div>
        </div>

        <div class="progress-line-track">
          <div class="progress-line-fill" id="prep-line-fill" style="width: ${Math.round((stats.prepDone / stats.prepTotal) * 100)}%;"></div>
        </div>

        ${Object.keys(categories).map(cat => `
          <div class="section-group">
            <div class="group-heading">${cat}</div>
            <div class="group-items">
              ${categories[cat].map(item => this.renderCheckRowHTML(item.id, item.name, item.desc)).join("")}
            </div>
          </div>
        `).join("")}

        <div class="card-bottom-actions">
          <button class="text-action-btn" onclick="app.resetPrepChecklist()">Reset</button>
          <button class="text-action-btn" onclick="app.copyPrepMarkdown()">Copy sign-off checklist</button>
        </div>
      </div>

      <!-- 14-Stage Workflow Roadmap -->
      <div class="checklist-card" id="prep-workflow-14" style="margin-top: 24px;">
        <div class="card-title-text" style="margin-bottom: 6px;">The Complete Preprocessing Workflow (14 Stages)</div>
        <p style="font-size: 0.84rem; color: var(--text-secondary); margin-bottom: 16px;">
          A generalized pipeline architecture for production machine learning systems. Apply transformations justified by data properties.
        </p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 12px; margin-top: 12px;">
          ${[
            { num: "01", name: "Data ingestion & validation", desc: "Load data safely, preserve raw immutable copy, verify column presence and types." },
            { num: "02", name: "Data quality checks", desc: "Inspect missing values, duplicates, and domain constraint violations." },
            { num: "03", name: "Data type conversion", desc: "Convert numeric strings, parse ISO dates, and coerce types with errors='coerce'." },
            { num: "04", name: "Data cleaning", desc: "Strip whitespace, normalize casing, resolve synonyms, and quarantine invalid rows." },
            { num: "05", name: "Train / test splitting", desc: "Split data before any statistical calculation to prevent data leakage." },
            { num: "06", name: "Missing-value treatment", desc: "Select imputation (mean, median, mode, constant, indicators); fit on train only." },
            { num: "07", name: "Outlier treatment", desc: "Investigate unusual points; clip or use robust estimators only when justified." },
            { num: "08", name: "Numerical transformation", desc: "Scale (Standard, Robust, MinMax) or transform (log1p) scale-sensitive features." },
            { num: "09", name: "Categorical encoding", desc: "OneHotEncoder(handle_unknown='ignore') or target encoding with CV smoothing." },
            { num: "10", name: "Date, text & special data", desc: "Parse UTC dates, engineer lags and rolling aggregations without peeking into future." },
            { num: "11", name: "Class imbalance & target", desc: "Audit target labels, use class weights or cost-sensitive metrics; resample on train only." },
            { num: "12", name: "Feature selection", desc: "Prune zero-variance and multicollinear features inside cross-validation folds." },
            { num: "13", name: "Pipeline validation", desc: "Assert train-serving parity on mock test payloads and verify graceful error handling." },
            { num: "14", name: "Save artifacts & monitor", desc: "Serialize pipeline using joblib, pin versions, and monitor serving distribution drift." }
          ].map(stage => `
            <div style="background: #080808; border: 1px solid var(--border-card); border-radius: var(--radius-sm); padding: 12px 14px;">
              <div style="display: flex; align-items: baseline; gap: 8px;">
                <span style="font-family: var(--font-mono); font-size: 0.8rem; font-weight: 700; color: #fff;">${stage.num}</span>
                <span style="font-weight: 600; font-size: 0.88rem; color: #fff;">${stage.name}</span>
              </div>
              <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 6px; line-height: 1.4;">${stage.desc}</div>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- Preprocessing Decisions Reference Tables -->
      <div class="checklist-card" id="prep-leakage-rules" style="margin-top: 24px;">
        <div class="card-title-text" style="margin-bottom: 12px;">Preprocessing Strategy Selection Guides</div>

        <!-- Missingness table -->
        <div style="margin-bottom: 20px;">
          <div style="font-size: 0.88rem; font-weight: 600; color: #fff; margin-bottom: 8px;">Missing-Value Strategy Matrix</div>
          <div class="minimal-table-container">
            <table class="minimal-table">
              <thead>
                <tr>
                  <th>Method</th>
                  <th>When to Use It</th>
                  <th>Production Example</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><strong>Median imputation</strong></td><td>Skewed or outlier-prone numerical features</td><td><code>SimpleImputer(strategy='median')</code> for income, house price</td></tr>
                <tr><td><strong>Mean imputation</strong></td><td>Approximately Gaussian continuous features</td><td><code>SimpleImputer(strategy='mean')</code> for sensor readings</td></tr>
                <tr><td><strong>Most frequent</strong></td><td>Categorical features with a clear dominant mode</td><td><code>SimpleImputer(strategy='most_frequent')</code> for device type</td></tr>
                <tr><td><strong>Constant category</strong></td><td>Missingness has business meaning or unknown fallback</td><td><code>SimpleImputer(strategy='constant', fill_value='missing')</code></td></tr>
                <tr><td><strong>Missing indicator</strong></td><td>Missingness carries independent predictive signal</td><td><code>MissingIndicator()</code> alongside primary imputer</td></tr>
                <tr><td><strong>Drop rows</strong></td><td>Tiny fraction (&lt;1%) of missing records safely removable</td><td>Non-essential records before splitting</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Scaling table -->
        <div style="margin-bottom: 20px;">
          <div style="font-size: 0.88rem; font-weight: 600; color: #fff; margin-bottom: 8px;">Feature Scaling Decision Guide</div>
          <div class="minimal-table-container">
            <table class="minimal-table">
              <thead>
                <tr>
                  <th>Scaler</th>
                  <th>Properties & Behavior</th>
                  <th>Target Algorithm</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><strong>StandardScaler</strong></td><td>Centers mean to 0, variance to 1. Sensitive to extreme outliers.</td><td>Linear regression, Logistic, Ridge/Lasso, PCA, SVM</td></tr>
                <tr><td><strong>RobustScaler</strong></td><td>Subtracts median, divides by IQR. Resists extreme outlier distortion.</td><td>Outlier-prone tabular features in linear/distance models</td></tr>
                <tr><td><strong>MinMaxScaler</strong></td><td>Compresses features into fixed [0, 1] range. Outliers compress normal values.</td><td>Neural networks, image inputs, bounded optimizers</td></tr>
                <tr><td><strong>No Scaling</strong></td><td>Scale invariant. Tree splits only rely on feature order, not magnitude.</td><td>Random Forests, XGBoost, LightGBM, CatBoost</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Categorical table -->
        <div>
          <div style="font-size: 0.88rem; font-weight: 600; color: #fff; margin-bottom: 8px;">Categorical Encoding Decision Guide</div>
          <div class="minimal-table-container">
            <table class="minimal-table">
              <thead>
                <tr>
                  <th>Encoding</th>
                  <th>When Appropriate</th>
                  <th>Leakage & Production Caution</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><strong>One-Hot Encoding</strong></td><td>Nominal categories with low-to-moderate cardinality (&lt;50)</td><td>Always configure <code>handle_unknown='ignore'</code></td></tr>
                <tr><td><strong>Ordinal Encoding</strong></td><td>Categories with true natural order (Low &lt; Med &lt; High)</td><td>Never apply arbitrary integers to nominal categories</td></tr>
                <tr><td><strong>Target Encoding</strong></td><td>High-cardinality nominals (ZIP codes, cities, merchants)</td><td>Must use out-of-fold calculation with smoothing to prevent leakage</td></tr>
                <tr><td><strong>Rare Grouping</strong></td><td>Categories with long tails appearing only 1-2 times</td><td>Group into 'other' bin via <code>min_frequency</code> parameter</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Practical 10-Step Implementation Order -->
      <div class="checklist-card" id="prep-implementation-order" style="margin-top: 24px;">
        <div class="card-title-text" style="margin-bottom: 6px;">Practical 10-Step Preprocessing Implementation Sequence</div>
        <p style="font-size: 0.84rem; color: var(--text-secondary); margin-bottom: 16px;">
          Execute these steps in this exact chronological order to guarantee a leak-free production pipeline.
        </p>

        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${[
            "1. Ingest raw data and assert column presence and schema types.",
            "2. Remove accidental exact duplicate rows and normalize text whitespace/casing.",
            "3. Split into Train, Validation, and Test sets (holdout test set untouched).",
            "4. Fit missing-value imputers strictly on training data.",
            "5. Investigate outliers using training data distributions; apply domain clipping if justified.",
            "6. Fit numerical scalers (StandardScaler/RobustScaler) on training data only.",
            "7. Fit categorical encoders with handle_unknown='ignore' on training data only.",
            "8. Extract calendar features, lags, and aggregations using strictly historical timestamps.",
            "9. Assemble ColumnTransformer and Pipeline linking preprocessing and model estimator.",
            "10. Evaluate pipeline on untouched test set and serialize with joblib for production deployment."
          ].map((st, i) => `
            <div style="display: flex; gap: 12px; align-items: baseline; padding: 8px 12px; background: #080808; border: 1px solid var(--border-card); border-radius: var(--radius-sm); font-size: 0.84rem;">
              <span style="font-family: var(--font-mono); font-weight: 700; color: #fff;">0${i+1}</span>
              <span style="color: #ddd;">${escapeHtml(st.substring(3))}</span>
            </div>
          `).join("")}
        </div>

        <div style="margin-top: 18px; display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
          <button class="btn-minimal" onclick="app.switchTab('recipes')" style="color: #fff; border-color: #555;">View All Preprocessing Code Recipes →</button>
          <button class="btn-minimal" onclick="app.switchTab('tools')">Open Interactive Pipeline Generator →</button>
        </div>
      </div>
    `;
  }

  // ==========================================================================
  // LEAKAGE AUDIT VIEW: 18-STEP AUDIT & LEAKAGE DETECTION GUIDE
  // ==========================================================================
  renderLeakageView(container) {
    const stats = this.getStats();
    const guide = ML_WORKFLOW_DATA.leakageGuide || {};

    // Group Leakage items by category (4 audit categories)
    const categories = {};
    (ML_WORKFLOW_DATA.leakageTracker || []).forEach(item => {
      if (!categories[item.category]) categories[item.category] = [];
      categories[item.category].push(item);
    });

    container.innerHTML = `
      <h1 class="page-title">Data Leakage in Preprocessing: Detection & Audit Guide</h1>
      <p class="page-subtitle">How data leakage happens, how to detect it, and an 18-step pre-deployment audit checklist to guarantee reproducible model generalization in production.</p>

      <!-- Quick Jump / Action Bar -->
      <div style="margin-bottom: 22px; display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
        <a href="#leak-audit-card" class="btn-minimal" style="color: #fff; border-color: #333;">Audit Checklist (0/18)</a>
        <a href="#leak-scaling-card" class="btn-minimal">Wrong vs Right Scaling</a>
        <a href="#leak-sources-card" class="btn-minimal">12 Leakage Sources</a>
        <a href="#leak-target-card" class="btn-minimal">Target Leakage</a>
        <a href="#leak-timeseries-card" class="btn-minimal">Time-Series & Groups</a>
        <a href="#leak-tests-card" class="btn-minimal">3 Diagnostic Tests</a>
        <a href="#leak-warnings-card" class="btn-minimal">Warning Signs</a>
      </div>

      <!-- Core Principle Alert -->
      <div style="margin-bottom: 24px; padding: 14px 18px; background: #0a0a0a; border: 1px solid #222; border-left: 3px solid #fff; border-radius: var(--radius-md);">
        <div style="font-size: 0.88rem; font-weight: 600; color: #fff;">What is Data Leakage?</div>
        <div style="font-size: 0.82rem; color: var(--text-secondary); margin-top: 4px; line-height: 1.5;">
          Data leakage happens when an ML model gets access to information during training that would not legitimately be available when making a real prediction. It makes a model appear highly accurate during testing (e.g. 99% test score) but fail catastrophically after deployment.
        </div>
      </div>

      <!-- 18-Step Leakage Audit Tracker Card -->
      <div class="checklist-card" id="leak-audit-card">
        <div class="card-header-row">
          <div>
            <div class="card-title-text">Leakage audit checklist</div>
            <div class="card-instructions">Execute this pre-deployment audit after training your model but before releasing it.</div>
          </div>
          <div class="progress-percent-text" id="leak-percent-display">${stats.leakDone}/${stats.leakTotal}</div>
        </div>

        <div class="progress-line-track">
          <div class="progress-line-fill" id="leak-line-fill" style="width: ${Math.round((stats.leakDone / stats.leakTotal) * 100)}%;"></div>
        </div>

        ${Object.keys(categories).map(cat => `
          <div class="section-group">
            <div class="group-heading">${cat}</div>
            <div class="group-items">
              ${categories[cat].map(item => this.renderCheckRowHTML(item.id, item.name, item.desc)).join("")}
            </div>
          </div>
        `).join("")}

        <div class="card-bottom-actions">
          <button class="text-action-btn" onclick="app.resetLeakageChecklist()">Reset</button>
          <button class="text-action-btn" onclick="app.copyLeakageMarkdown()">Copy audit checklist</button>
        </div>
      </div>

      <!-- Section 1: How Preprocessing Causes Leakage (Scaling Example) -->
      <div class="checklist-card" id="leak-scaling-card" style="margin-top: 24px;">
        <div class="card-title-text" style="margin-bottom: 8px;">1. How Preprocessing Causes Data Leakage: The Scaling Example</div>
        <p style="font-size: 0.84rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 14px;">
          Suppose a dataset contains <code>[10, 20, 30, 40, 1000]</code>, and <code>1000</code> belongs to the test set. If you calculate mean and std on all five values before splitting, training data's scaled values depend on test data.
        </p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px; margin-bottom: 16px;">
          <div style="background: #080808; border: 1px solid #222; border-radius: 6px; padding: 14px;">
            <div style="color: #ff5555; font-size: 0.85rem; font-weight: 700; margin-bottom: 6px;">✕ INCORRECT (Data Leakage)</div>
            <div style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.4; margin-bottom: 8px;">
              Fit scaler on complete dataset → Split into train & test.<br>
              <em>The scaler has already learned test set distribution statistics.</em>
            </div>
            <div class="code-box">
              <pre><code># LEAKAGE: Learns statistics from all data
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)
X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y, test_size=0.2, random_state=42
)</code></pre>
            </div>
          </div>

          <div style="background: #080808; border: 1px solid #222; border-radius: 6px; padding: 14px;">
            <div style="color: #55ff55; font-size: 0.85rem; font-weight: 700; margin-bottom: 6px;">✓ CORRECT (Leakage-Free)</div>
            <div style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.4; margin-bottom: 8px;">
              Split into train & test → Fit scaler on train only → Transform test without refitting.<br>
              <em>Test set is transformed without influencing training statistics.</em>
            </div>
            <div class="code-box">
              <pre><code># LEAK-FREE: Fit only on training fold
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)</code></pre>
            </div>
          </div>
        </div>
        <div style="font-size: 0.81rem; color: var(--text-secondary); line-height: 1.4;">
          <strong>Notice the rule:</strong> <code>fit_transform()</code> is used on training data, while <code>transform()</code> is used on test/validation data. The exact same rule applies to imputers, encoders, feature selectors, outlier bounds, and PCA components.
        </div>
      </div>

      <!-- Section 2: 12 Common Leakage Sources Audit Table -->
      <div class="checklist-card" id="leak-sources-card" style="margin-top: 24px;">
        <div class="card-title-text" style="margin-bottom: 6px;">2. Common Leakage Sources in Preprocessing (Audit Table)</div>
        <p style="font-size: 0.84rem; color: var(--text-secondary); margin-bottom: 14px;">
          Use this table as a pre-release audit checklist when reviewing your pipeline code.
        </p>

        <div class="minimal-table-container">
          <table class="minimal-table">
            <thead>
              <tr>
                <th style="width: 25%;">Leakage Source</th>
                <th style="width: 45%;">How It Happens</th>
                <th style="width: 30%;">How to Prevent It</th>
              </tr>
            </thead>
            <tbody>
              ${(guide.sourcesTable || []).map(row => `
                <tr>
                  <td><strong style="color: #fff;">${escapeHtml(row.source)}</strong></td>
                  <td style="color: #ddd;">${escapeHtml(row.how)}</td>
                  <td style="color: #aaa; font-size: 0.8rem;">${escapeHtml(row.prevent)}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Section 3: Target Leakage (The More Dangerous Case) -->
      <div class="checklist-card" id="leak-target-card" style="margin-top: 24px;">
        <div class="card-title-text" style="margin-bottom: 6px;">3. Target Leakage: The More Dangerous Case</div>
        <p style="font-size: 0.84rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 12px;">
          Target leakage occurs when a feature contains information about the answer that would not be available at prediction time. For example, in customer churn prediction:
        </p>
        <div style="background: #080808; border: 1px solid var(--border-card); padding: 12px 14px; border-radius: var(--radius-sm); font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 14px; line-height: 1.5;">
          • Legitimate predictors: <code>tenure</code>, <code>plan_type</code>, <code>monthly_charge</code>, <code>prior_support_calls</code>.<br>
          • <strong>Target leakage columns:</strong> <code>cancellation_date</code>, <code>account_closed_status</code>, <code>refund_amount</code> (recorded downstream after customer cancels).<br>
          The model scores 99% in evaluation because it reads the answer directly, but fails completely on active customers.
        </div>

        <div style="font-size: 0.86rem; font-weight: 600; color: #fff; margin-bottom: 8px;">5 Questions to Ask for Every Feature:</div>
        <div style="display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px;">
          ${(guide.targetQuestions || []).map((q, i) => `
            <div style="font-size: 0.82rem; color: #ddd; padding: 6px 10px; background: #080808; border: 1px solid #1a1a1a; border-radius: 4px;">
              <span style="font-family: var(--font-mono); color: #fff; font-weight: 700;">Q${i+1}.</span> ${escapeHtml(q)}
            </div>
          `).join("")}
        </div>
        <div style="font-size: 0.82rem; color: var(--text-muted);">
          <strong>Production Rule:</strong> Define an explicit prediction cutoff timestamp and assert that every feature uses only information recorded before that cutoff.
        </div>
      </div>

      <!-- Section 4: Time-Series & Group Leakage Guard -->
      <div class="checklist-card" id="leak-timeseries-card" style="margin-top: 24px;">
        <div class="card-title-text" style="margin-bottom: 6px;">4. Time-Series & Grouped Entity Leakage</div>
        
        <strong style="color: #fff; display: block; margin-top: 10px;">Time-Series Rolling Window Leakage</strong>
        <p style="color: var(--text-secondary); font-size: 0.82rem; margin: 4px 0 8px 0;">
          A rolling window without <code>.shift(1)</code> includes the current row's target value in the predictor:
        </p>
        ${this.getRecipeBoxHTML("recipe-time-series-leakage-shift")}

        <strong style="color: #fff; display: block; margin-top: 18px;">Duplicate Records & Group Overlap Audit</strong>
        <p style="color: var(--text-secondary); font-size: 0.82rem; margin: 4px 0 8px 0;">
          Verify that records from the same customer, patient, or device never appear in both train and test partitions:
        </p>
        ${this.getRecipeBoxHTML("recipe-group-overlap-audit")}
      </div>

      <!-- Section 5: 3 Pre-Deployment Diagnostic Tests -->
      <div class="checklist-card" id="leak-tests-card" style="margin-top: 24px;">
        <div class="card-title-text" style="margin-bottom: 6px;">5. Pre-Deployment Leakage Diagnostic Tests</div>
        <p style="font-size: 0.84rem; color: var(--text-secondary); margin-bottom: 14px;">
          Execute these 3 diagnostic tests to catch silent leakage before production release:
        </p>

        <!-- Test 1 -->
        <div style="background: #080808; border: 1px solid var(--border-card); border-radius: var(--radius-sm); padding: 12px 14px; margin-bottom: 12px;">
          <div style="font-size: 0.88rem; font-weight: 600; color: #fff;">Test 1 — Check for Suspiciously Powerful Individual Features</div>
          <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 4px; line-height: 1.4;">
            Inspect correlations and Mutual Information between individual predictors and the target. A single feature that predicts the target almost perfectly (>0.95 AUC on its own) is almost always a target proxy, post-event artifact, or leaked ID.
          </div>
        </div>

        <!-- Test 2 -->
        <div style="background: #080808; border: 1px solid var(--border-card); border-radius: var(--radius-sm); padding: 12px 14px; margin-bottom: 12px;">
          <div style="font-size: 0.88rem; font-weight: 600; color: #fff;">Test 2 — Target Permutation Sanity Check (Shuffle Test)</div>
          <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 4px; line-height: 1.4;">
            Train the exact pipeline on randomly permuted target labels. If test accuracy remains high instead of dropping to chance (e.g. 50%), your feature engineering or splitting has severe leakage.
          </div>
          ${this.getRecipeBoxHTML("recipe-target-permutation-test")}
        </div>

        <!-- Test 3 -->
        <div style="background: #080808; border: 1px solid var(--border-card); border-radius: var(--radius-sm); padding: 12px 14px;">
          <div style="font-size: 0.88rem; font-weight: 600; color: #fff;">Test 3 — Reproduce the Real Prediction Process</div>
          <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 4px; line-height: 1.4;">
            Take a mock production payload containing only permitted input fields (no target, no future timestamps). Pass it through the serialized pipeline to confirm it generates expected predictions cleanly.
          </div>
        </div>
      </div>

      <!-- Section 6: Warning Signs Table -->
      <div class="checklist-card" id="leak-warnings-card" style="margin-top: 24px;">
        <div class="card-title-text" style="margin-bottom: 6px;">6. What Are the Warning Signs? (6 Red Flags)</div>
        <p style="font-size: 0.84rem; color: var(--text-secondary); margin-bottom: 14px;">
          None of these signals automatically proves leakage; they tell you exactly where to investigate.
        </p>

        <div class="minimal-table-container">
          <table class="minimal-table">
            <thead>
              <tr>
                <th style="width: 45%;">Warning Sign</th>
                <th style="width: 55%;">What to Investigate</th>
              </tr>
            </thead>
            <tbody>
              ${(guide.warningSigns || []).map(row => `
                <tr>
                  <td><strong style="color: #ff6b6b;">${escapeHtml(row.sign)}</strong></td>
                  <td style="color: #ddd;">${escapeHtml(row.investigate)}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Section 7: The Golden Rule to Remember -->
      <div class="checklist-card" style="margin-top: 24px; border-color: #333;">
        <div class="card-title-text" style="margin-bottom: 8px;">The Rule to Remember</div>
        <div style="font-size: 1rem; font-weight: 700; color: #fff; font-family: var(--font-mono); line-height: 1.5; margin-bottom: 10px;">
          ${escapeHtml(guide.goldenRule || "Split correctly → fit transformations on training data only → evaluate complete pipeline on held-out data → audit every feature's availability time → reproduce inference before deployment.")}
        </div>
        <p style="font-size: 0.84rem; color: var(--text-secondary); line-height: 1.5;">
          Using a fitted scikit-learn <code>ColumnTransformer</code> and <code>Pipeline</code> is the best structural defense. Combine it with rigorous tests for duplicate entities, chronological cutoffs, and group independence.
        </p>
      </div>
    `;
  }

  // ==========================================================================
  // PLOT INTERPRETATION GUIDE VIEW (HOW TO INTERPRET PLOTS DURING EDA)
  // ==========================================================================
  renderPlotGuideView(container) {
    const guide = ML_WORKFLOW_DATA.edaPlotGuide;
    if (!guide) {
      container.innerHTML = `<div style="padding: 20px;">Plot guide data not loaded.</div>`;
      return;
    }

    const categories = [
      "All",
      "1. Numerical Distributions",
      "2. Relationships",
      "3. Categorical Data",
      "4. Quality & Outliers",
      "5. Time-Series & Production"
    ];

    let currentCats = guide.categories;
    if (this.plotCategory !== "All") {
      const idx = categories.indexOf(this.plotCategory) - 1;
      if (idx >= 0 && idx < guide.categories.length) {
        currentCats = [guide.categories[idx]];
      }
    }

    let allFilteredPlots = [];
    currentCats.forEach(cat => {
      cat.plots.forEach(p => {
        let matches = true;
        if (this.plotSearchQuery) {
          const q = this.plotSearchQuery.toLowerCase();
          matches = p.name.toLowerCase().includes(q) ||
                    p.question.toLowerCase().includes(q) ||
                    p.insight.toLowerCase().includes(q) ||
                    p.lookFor.some(lf => lf.toLowerCase().includes(q));
        }
        if (matches) {
          allFilteredPlots.push({ ...p, catName: cat.name });
        }
      });
    });

    container.innerHTML = `
      <h1 class="page-title">${escapeHtml(guide.title)}</h1>
      <p class="page-subtitle">${escapeHtml(guide.subtitle)}</p>

      <!-- Five Core Questions -->
      <div class="checklist-card" style="margin-bottom: 24px;">
        <div class="card-title-text" style="margin-bottom: 6px;">For every plot, ask five core questions:</div>
        <div class="card-instructions">Connect visual patterns directly to engineering and modeling actions.</div>
        
        <div class="five-questions-grid">
          ${guide.fiveQuestions.map((q, i) => `
            <div class="question-box">
              <div class="question-box-num">Question ${i + 1}</div>
              <div class="question-box-title">${escapeHtml(q.title)}</div>
              <div class="question-box-text">${escapeHtml(q.question)}</div>
            </div>
          `).join("")}
        </div>

        <div style="background: #080808; border: 1px solid var(--border-card); border-radius: var(--radius-sm); padding: 12px 14px; font-size: 0.84rem; color: #bbb; line-height: 1.5; margin-top: 12px;">
          <strong style="color: #fff;">Example:</strong> ${escapeHtml(guide.example)}
        </div>
      </div>

      <!-- Controls: Search, Filter, Image Toggle -->
      <div style="display: flex; gap: 10px; flex-wrap: wrap; align-items: center; justify-content: space-between; margin-bottom: 16px;">
        <div class="plot-filter-bar" style="margin-bottom: 0;">
          ${categories.map(c => `
            <button class="plot-filter-btn ${this.plotCategory === c ? 'active' : ''}" onclick="app.setPlotCategory('${c}')">${c}</button>
          `).join("")}
        </div>
        <button class="btn-minimal" onclick="app.togglePlotImages()">
          ${this.showPlotImages ? "Hide Plot Illustrations" : "Show Plot Illustrations"}
        </button>
      </div>

      <input type="text" class="recipe-search-box" placeholder="Search plot interpretation guides (e.g. histogram, multicollinearity, violin, drift, residual, outliers)..." value="${escapeHtml(this.plotSearchQuery)}" oninput="app.handlePlotSearch(this.value)">

      <!-- Plot Cards Gallery -->
      <div class="checklist-card" style="margin-bottom: 24px;">
        <div class="card-title-text">Visual Plot Interpretation Gallery (Plots A through O)</div>
        <div class="card-instructions">Detailed checklists of what to look for and exact ML implications.</div>

        ${allFilteredPlots.length === 0 ? `<div style="color: var(--text-muted); padding: 20px 0;">No plots found matching '${escapeHtml(this.plotSearchQuery)}'.</div>` : ''}

        <div class="plot-gallery-grid">
          ${allFilteredPlots.map(p => `
            <div class="plot-item-card" id="${p.id}">
              <div class="plot-item-header">
                <div class="plot-letter-badge">${p.letter}</div>
                <div>
                  <div class="plot-item-title">${escapeHtml(p.name)}</div>
                  <div style="font-size: 0.72rem; color: var(--text-muted); font-family: var(--font-mono);">${escapeHtml(p.catName)}</div>
                </div>
              </div>

              <div class="plot-item-question"><strong>Question:</strong> ${escapeHtml(p.question)}</div>

              ${this.showPlotImages && p.image ? `
                <div class="plot-img-container">
                  <img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.name)}" class="plot-img" loading="lazy" onerror="this.parentElement.style.display='none'">
                  <div class="plot-img-caption">${escapeHtml(p.sourceTitle || p.name)}</div>
                </div>
              ` : ''}

              <div style="font-size: 0.78rem; font-weight: 600; color: #fff; margin-top: 8px;">Look for:</div>
              <ul class="plot-look-list">
                ${p.lookFor.map(item => `<li>${escapeHtml(item)}</li>`).join("")}
              </ul>

              <div class="plot-insight-box">
                <span class="plot-insight-label">Insight:</span> ${escapeHtml(p.insight)}
              </div>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- Section 6: What should you do after seeing an insight? -->
      <div class="checklist-card" style="margin-bottom: 24px;">
        <div class="card-title-text" style="margin-bottom: 6px;">6. What should you do after seeing an insight?</div>
        <p style="font-size: 0.86rem; color: var(--text-secondary); margin-bottom: 14px;">
          This is the most important part of EDA: <strong>connect each visual observation to a concrete engineering action.</strong>
        </p>

        <div class="minimal-table-container">
          <table class="minimal-table">
            <thead>
              <tr>
                <th style="width: 32%;">Observation</th>
                <th style="width: 34%;">Possible Action</th>
                <th style="width: 34%;">Important Caution</th>
              </tr>
            </thead>
            <tbody>
              ${guide.decisionMatrix.map(row => `
                <tr>
                  <td><strong style="color: #fff;">${escapeHtml(row.observation)}</strong></td>
                  <td style="color: #eee;">${escapeHtml(row.action)}</td>
                  <td style="color: var(--text-muted); font-size: 0.8rem;">${escapeHtml(row.caution)}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Section 7: Reusable EDA Analysis Template -->
      <div class="checklist-card" style="margin-bottom: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
          <div>
            <div class="card-title-text">7. Reusable EDA Analysis Template</div>
            <div class="card-instructions">Document these six items for every plot you inspect.</div>
          </div>
          <button class="btn-minimal" onclick="app.copyEdaTemplate()">Copy Template</button>
        </div>

        <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 14px;">
          ${guide.template.map(t => `
            <div style="background: #080808; border: 1px solid var(--border-card); border-radius: var(--radius-sm); padding: 12px 14px;">
              <div style="font-size: 0.84rem; font-weight: 600; color: #fff;">${escapeHtml(t.step)}</div>
              <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 4px;">
                <span style="color: var(--text-muted); font-family: var(--font-mono);">Example:</span> ${escapeHtml(t.example)}
              </div>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- Section 8: Python Plotting Workflow Code -->
      <div class="checklist-card" style="margin-bottom: 24px;">
        <div class="card-title-text" style="margin-bottom: 6px;">8. Python Code: Basic EDA Plotting Workflow</div>
        <p style="font-size: 0.84rem; color: var(--text-secondary); margin-bottom: 12px;">
          Fast exploratory visualization using matplotlib and seaborn. Replace column names with actual dataset features:
        </p>
        <div class="code-box">
          <div class="code-box-header">
            <span>basic_eda_workflow.py</span>
            <button class="code-copy-btn" onclick="app.copyCodeSnippet(this)">Copy code</button>
          </div>
          <pre><code>${escapeHtml(guide.pythonCode)}</code></pre>
        </div>
      </div>

      <!-- Section 9: Final Rule -->
      <div class="checklist-card" style="border-color: #333;">
        <div class="card-title-text" style="margin-bottom: 8px;">Final Rule to Remember</div>
        <div style="font-size: 1.05rem; font-weight: 700; color: #fff; font-family: var(--font-mono); letter-spacing: -0.01em; margin-bottom: 10px;">
          ${escapeHtml(guide.finalRule)}
        </div>
        <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6;">
          Never write only “there are outliers” or “the data is skewed.” Record what the plot demonstrates, what it might mean for the ML task, which action is justified, and how that action will be validated without leakage.
        </p>
        <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.6; margin-top: 6px;">
          A production EDA report should help another engineer understand not just what the data looks like, but also why particular preprocessing and modeling decisions were made.
        </p>
      </div>
    `;
  }

  setPlotCategory(cat) {
    this.plotCategory = cat;
    this.renderActiveTab();
  }

  handlePlotSearch(q) {
    this.plotSearchQuery = q.trim();
    this.renderActiveTab();
  }

  togglePlotImages() {
    this.showPlotImages = !this.showPlotImages;
    this.renderActiveTab();
  }

  copyEdaTemplate() {
    const text = `## EDA Plot Analysis Record
1. Plot name and purpose: 
2. Observation: 
3. Statistical or data-quality implication: 
4. Possible ML impact: 
5. Action to test: 
6. Evidence and decision: `;
    navigator.clipboard.writeText(text).then(() => {
      this.showToast("EDA Template copied!");
    });
  }

  getRecipeBoxHTML(recipeId) {
    const r = (ML_WORKFLOW_DATA.codeRecipes || []).find(x => x.id === recipeId);
    if (!r) return "";
    return `
      <div class="code-box" style="margin: 10px 0 16px 0;">
        <div class="code-box-header">
          <span>${escapeHtml(r.title)}</span>
          <button class="code-copy-btn" onclick="app.copyCodeSnippet(this)">Copy</button>
        </div>
        <pre><code>${escapeHtml(r.code)}</code></pre>
      </div>
    `;
  }

  // ==========================================================================
  // 3. PHASE GUIDES (1 THROUGH 9) VIEW (MATCHING BLACK MINIMALIST STYLE)
  // ==========================================================================
  renderPhasesView(container) {
    container.innerHTML = `
      <h1 class="page-title">Production ML Workflow: Complete Guide</h1>
      <p class="page-subtitle">Comprehensive phase-by-phase operational guidance, methodology rules, statistical validation tests, and production code recipes.</p>

      <!-- Quick Jump Bar -->
      <div class="phase-jump-bar">
        <a href="#guide-phase-1" class="phase-jump-btn">Phase 1: Problem & Data</a>
        <a href="#guide-phase-2" class="phase-jump-btn">Phase 2: EDA & Tests</a>
        <a href="#guide-phase-3" class="phase-jump-btn">Phase 3: Splitting</a>
        <a href="#guide-phase-4" class="phase-jump-btn">Phase 4: Preprocessing</a>
        <a href="#guide-phase-5" class="phase-jump-btn">Phase 5: Feature Eng</a>
        <a href="#guide-phase-6" class="phase-jump-btn">Phase 6: Modeling</a>
        <a href="#guide-phase-7" class="phase-jump-btn">Phase 7: Evaluation</a>
        <a href="#guide-phase-8" class="phase-jump-btn">Phase 8: Deployment</a>
        <a href="#guide-phase-9" class="phase-jump-btn">Phase 9: Monitoring</a>
        <a href="#guide-order" class="phase-jump-btn">Implementation Order</a>
      </div>

      <!-- Phase 1 -->
      <div class="checklist-card" id="guide-phase-1">
        <div class="card-title-text" style="margin-bottom: 14px;">Phase 1 — Problem Definition & Data Understanding</div>
        <div style="font-size: 0.88rem; color: var(--text-primary); line-height: 1.6;">
          <strong style="color: #fff; display: block; margin-top: 10px;">1. Define the ML problem</strong>
          <ul style="padding-left: 20px; color: var(--text-secondary); margin-top: 6px;">
            <li>Identify the business problem.</li>
            <li>Decide whether it is regression, classification, clustering, forecasting, ranking, or another task.</li>
            <li>Define the target variable and prediction time.</li>
            <li>Define success criteria and acceptable prediction errors.</li>
            <li>Choose primary and secondary evaluation metrics.</li>
            <li>Establish a simple baseline for comparison.</li>
          </ul>

          <strong style="color: #fff; display: block; margin-top: 14px;">2. Understand the data source</strong>
          <ul style="padding-left: 20px; color: var(--text-secondary); margin-top: 6px;">
            <li>Identify the source: CSV, database, API, event stream, or data warehouse.</li>
            <li>Record the schema, column definitions, units, and data types.</li>
            <li>Identify the primary key and entity represented by each row.</li>
            <li>Determine the observation period and data freshness.</li>
            <li>Check licensing, access permissions, privacy, and retention requirements.</li>
            <li>Identify how often data will be refreshed in production.</li>
          </ul>

          <strong style="color: #fff; display: block; margin-top: 14px;">3. Define data quality rules</strong>
          <ul style="padding-left: 20px; color: var(--text-secondary); margin-top: 6px;">
            <li>Required columns must exist; IDs must follow the expected format.</li>
            <li>Values must have valid types and units; Dates must follow expected ISO formats.</li>
            <li>Numeric values must satisfy domain constraints (e.g. non-negative age, price &gt; 0).</li>
            <li>Define how invalid records will be rejected, quarantined, or corrected.</li>
          </ul>

          <strong style="color: #fff; display: block; margin-top: 16px;">Core Libraries & Setup</strong>
          <p style="color: var(--text-secondary); font-size: 0.82rem; margin: 4px 0 8px 0;">Standard imports, warnings suppression, and seed management:</p>
          ${this.getRecipeBoxHTML("recipe-normal-lib")}
        </div>
      </div>

      <!-- Phase 2 -->
      <div class="checklist-card" id="guide-phase-2" style="margin-top: 24px;">
        <div class="card-title-text" style="margin-bottom: 12px;">Phase 2 — Exploratory Data Analysis (EDA) & Statistical Tests</div>
        <p style="font-size: 0.86rem; color: var(--text-secondary); margin-bottom: 14px;">
          EDA is the investigation phase. Inspect distributions, missingness, correlation, class imbalance, and potential leakage before making any modeling or transformation decisions.
        </p>

        <div class="minimal-table-container">
          <table class="minimal-table">
            <thead>
              <tr>
                <th>Analysis</th>
                <th>When to use it</th>
                <th>Typical tools</th>
              </tr>
            </thead>
            <tbody>
              ${ML_WORKFLOW_DATA.phases[1].tableData.rows.map(r => `
                <tr>
                  <td><strong>${r[0]}</strong></td>
                  <td>${r[1]}</td>
                  <td><code>${r[2]}</code></td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>

        <div style="background: #0a0a0a; border: 1px solid #1f1f1f; padding: 12px 14px; border-radius: 6px; font-size: 0.84rem; color: #bbb; margin: 16px 0;">
          <strong>Important principle:</strong> Do not automatically remove a column just because it is highly correlated with another feature. Do not automatically remove outliers or impute every missing value. Investigate why the issue exists and whether it affects the intended prediction.
        </div>

        <strong style="color: #fff; display: block; margin-top: 16px;">Automated Profiling</strong>
        ${this.getRecipeBoxHTML("recipe-pandas-profiling")}

        <strong style="color: #fff; display: block; margin-top: 16px;">Target Correlation & Multicollinearity Filtering</strong>
        ${this.getRecipeBoxHTML("recipe-corr-target")}
        ${this.getRecipeBoxHTML("recipe-multicollinearity-drop")}

        <strong style="color: #fff; display: block; margin-top: 16px;">Hypothesis & Association Tests (Categorical & Non-Linear)</strong>
        <p style="color: var(--text-secondary); font-size: 0.82rem; margin: 4px 0 8px 0;">Statistical tests from the production workflow for measuring feature significance:</p>
        ${this.getRecipeBoxHTML("recipe-mutual-info")}
        ${this.getRecipeBoxHTML("recipe-chi2-test")}
        ${this.getRecipeBoxHTML("recipe-cramers-v")}
        ${this.getRecipeBoxHTML("recipe-anova-test")}

        <strong style="color: #fff; display: block; margin-top: 20px;">Visual EDA: How to Interpret Plots & What Insights to Look For</strong>
        <p style="color: var(--text-secondary); font-size: 0.82rem; margin: 4px 0 8px 0;">
          For every chart, ask five questions: (1) Distribution, (2) Relationship, (3) Data quality, (4) ML impact, (5) Action.
        </p>
        <div style="margin: 10px 0 14px 0; display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
          <button class="btn-minimal" onclick="app.switchTab('plots')" style="color: #fff; border-color: #555;">Open Visual Plot Gallery (15 Charts & Action Matrix) →</button>
        </div>
        ${this.getRecipeBoxHTML("recipe-basic-eda-plots")}
      </div>

      <!-- Phase 3 -->
      <div class="checklist-card" id="guide-phase-3" style="margin-top: 24px;">
        <div class="card-title-text" style="margin-bottom: 12px;">Phase 3 — Data Splitting & Leakage Prevention</div>
        <p style="font-size: 0.86rem; color: var(--text-secondary); margin-bottom: 14px;">
          Splitting strategy must be decided before fitting any transformation. Learned transformations must be fitted strictly on training data folds.
        </p>

        <div class="minimal-table-container">
          <table class="minimal-table">
            <thead>
              <tr>
                <th>Data / Problem Type</th>
                <th>Recommended Approach</th>
              </tr>
            </thead>
            <tbody>
              ${ML_WORKFLOW_DATA.phases[2].tableData.rows.map(r => `
                <tr>
                  <td><strong>${r[0]}</strong></td>
                  <td>${r[1]}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>

        <div style="background: #0a0a0a; border: 1px solid #1f1f1f; padding: 12px 14px; border-radius: 6px; font-size: 0.84rem; color: #ddd; margin: 16px 0;">
          <strong>Leakage rule:</strong> Imputers, scalers, encoders, feature selectors, and other learned transformations must be fitted only on training data within each training fold. Validation and test data receive transformations from the fitted training pipeline.
        </div>

        <div style="margin: 10px 0 14px 0; display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
          <button class="btn-minimal" onclick="app.switchTab('leakage')" style="color: #fff; border-color: #555;">Open Leakage Audit (0/18 Tracker & Guide) →</button>
        </div>

        <strong style="color: #fff; display: block; margin-top: 16px;">Train/Test Splitting Code</strong>
        ${this.getRecipeBoxHTML("recipe-linear-regression-train")}

        <strong style="color: #fff; display: block; margin-top: 16px;">Entity Group Overlap Audit</strong>
        ${this.getRecipeBoxHTML("recipe-group-overlap-audit")}

        <strong style="color: #fff; display: block; margin-top: 16px;">Leakage-Safe Time Series Lag & Shift</strong>
        ${this.getRecipeBoxHTML("recipe-time-series-leakage-shift")}
      </div>

      <!-- Phase 4 -->
      <div class="checklist-card" id="guide-phase-4" style="margin-top: 24px;">
        <div class="card-title-text" style="margin-bottom: 8px;">Phase 4 — Complete Data Preprocessing for Production ML (21 Steps)</div>
        <p style="font-size: 0.86rem; color: var(--text-secondary); margin-bottom: 14px;">
          Convert raw data into clean, consistent, valid, and model-ready features. In production ML, preprocessing must be reproducible, leakage-free, testable, and identical between training and serving.
        </p>

        <!-- Preprocessing Tab Shortcut -->
        <div style="margin: 10px 0 16px 0; display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
          <button class="btn-minimal" onclick="app.switchTab('preprocessing')" style="color: #fff; border-color: #555;">Open Preprocessing 24-Step Sign-Off Tracker →</button>
          <button class="btn-minimal" onclick="app.switchTab('tools')">Interactive Pipeline Generator →</button>
        </div>

        <!-- Strict Leakage Boundary Card -->
        <div style="background: #0a0a0a; border: 1px solid #222; border-left: 3px solid #fff; padding: 12px 16px; border-radius: var(--radius-sm); margin: 16px 0; font-size: 0.84rem; line-height: 1.5;">
          <strong style="color: #fff; display: block; margin-bottom: 4px;">The Cardinal Leakage Prevention Boundary:</strong>
          <span style="color: var(--text-secondary);">
            • <strong>Pre-split safe operations:</strong> Immutable raw file ingestion, deterministic column existence checks, and parsing known string representations.<br>
            • <strong>Strictly post-split operations (fitted on training folds only):</strong> Imputer statistics (mean, median, mode), scalers (mean, std, min, max, IQR), categorical encodings (one-hot categories, target encodings), outlier thresholds (quantile clipping), and feature selection must never see validation or test data prior to transformation.
          </span>
        </div>

        <!-- 1. Schema Validation & Data Ingestion -->
        <strong style="color: #fff; display: block; margin-top: 18px;">1. Ingestion & Schema Validation (Steps 1–2)</strong>
        <p style="color: var(--text-secondary); font-size: 0.83rem; margin: 4px 0 8px 0;">
          Verify required columns, unique column names, expected data types, and record volume. Reject or quarantine incompatible input before pipeline execution:
        </p>
        ${this.getRecipeBoxHTML("recipe-schema-validation")}

        <!-- 2. Data Quality, Duplicates & Domain Bounds -->
        <strong style="color: #fff; display: block; margin-top: 18px;">2. Data Quality Checks & Duplicate Verification (Steps 3–5)</strong>
        <p style="color: var(--text-secondary); font-size: 0.83rem; margin: 4px 0 8px 0;">
          Inspect missingness percentages, differentiate accidental row duplicates from valid repeat events, and assert domain constraints:
        </p>
        ${this.getRecipeBoxHTML("recipe-missing-report")}
        ${this.getRecipeBoxHTML("recipe-duplicate-check")}
        ${this.getRecipeBoxHTML("recipe-invalid-bounds-check")}

        <!-- 3. Safe Type Coercion & String Cleaning -->
        <strong style="color: #fff; display: block; margin-top: 18px;">3. Data Type Coercion & String Cleaning (Steps 3–4)</strong>
        <p style="color: var(--text-secondary); font-size: 0.83rem; margin: 4px 0 8px 0;">
          Safely coerce numeric and timestamp columns using <code>errors='coerce'</code> to catch malformed strings, and standardize category whitespace and synonyms:
        </p>
        ${this.getRecipeBoxHTML("recipe-type-coercion")}
        ${this.getRecipeBoxHTML("recipe-string-cleaning")}

        <!-- 4. Missing-Value Treatment Table -->
        <strong style="color: #fff; display: block; margin-top: 20px;">4. Missing-Value Treatment Decision Matrix (Step 9)</strong>
        <p style="color: var(--text-secondary); font-size: 0.83rem; margin: 4px 0 8px 0;">
          Determine whether missingness is random (MCAR/MAR) or systematic (MNAR), and apply the simplest defensible strategy:
        </p>
        <div class="minimal-table-container">
          <table class="minimal-table">
            <thead>
              <tr>
                <th>Method</th>
                <th>When to Use It</th>
                <th>Production Example</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><strong>Drop rows</strong></td><td>Very few records (&lt;1%) are incomplete and removal is safe</td><td>Incomplete non-essential observations</td></tr>
              <tr><td><strong>Drop columns</strong></td><td>Feature unusable or mostly missing (&gt;70%) with no recovery</td><td>Unreliable optional metadata field</td></tr>
              <tr><td><strong>Median imputation</strong></td><td>Numerical feature with skew or extreme outliers</td><td><code>SimpleImputer(strategy='median')</code> for income, prices</td></tr>
              <tr><td><strong>Mean imputation</strong></td><td>Approximately Gaussian continuous features without heavy tails</td><td><code>SimpleImputer(strategy='mean')</code> for sensor metrics</td></tr>
              <tr><td><strong>Most-frequent</strong></td><td>Categorical feature with a clear dominant category</td><td><code>SimpleImputer(strategy='most_frequent')</code> for device type</td></tr>
              <tr><td><strong>Constant category</strong></td><td>Missingness has domain meaning or unknown placeholder</td><td><code>SimpleImputer(strategy='constant', fill_value='missing')</code></td></tr>
              <tr><td><strong>Missingness indicator</strong></td><td>The fact that a value is missing may be predictive</td><td><code>MissingIndicator()</code> alongside primary imputer</td></tr>
              <tr><td><strong>Group-based / MICE</strong></td><td>Complex relationships justify extra model complexity</td><td><code>IterativeImputer()</code> or <code>KNNImputer()</code></td></tr>
            </tbody>
          </table>
        </div>

        <!-- 5. Outlier Treatment Protocol -->
        <strong style="color: #fff; display: block; margin-top: 20px;">5. Outlier Investigation & Treatment Protocol (Step 10)</strong>
        <div style="font-size: 0.83rem; color: var(--text-secondary); line-height: 1.5; margin-top: 6px;">
          1. <em>Identify suspicious observations:</em> Screen with box plots, IQR boundaries, and known domain constraints.<br>
          2. <em>Distinguish cause:</em> Determine whether extreme values are data collection errors or legitimate rare events.<br>
          3. <em>Correct errors:</em> Correct from a verified upstream source or quarantine invalid records.<br>
          4. <em>Clip or use robust scalers:</em> Winsorize/clip extreme tails to 1st and 99th training percentiles only when algorithm is sensitive.<br>
          5. <em>Validate on CV:</em> Compare holdout validation metrics with and without treatment.<br>
          6. <em>Freeze thresholds:</em> Apply exact learned training thresholds during inference; never recompute quantiles on test sets.
        </div>

        <!-- 6. Numerical Feature Scaling -->
        <strong style="color: #fff; display: block; margin-top: 20px;">6. Numerical Feature Scaling Decision Guide (Step 11)</strong>
        <div class="minimal-table-container" style="margin-top: 6px;">
          <table class="minimal-table">
            <thead>
              <tr>
                <th>Scaler / Transform</th>
                <th>When Appropriate</th>
                <th>Algorithmic Sensitivity</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><strong>StandardScaler</strong></td><td>Normal or near-normal distribution; distance/gradient models</td><td>Essential for Ridge, Lasso, Logistic, SVM, PCA, KNN</td></tr>
              <tr><td><strong>RobustScaler</strong></td><td>Heavy tails or extreme outliers present; scales by median & IQR</td><td>Linear & distance models on skewed financial/transaction data</td></tr>
              <tr><td><strong>MinMaxScaler</strong></td><td>Strictly bounded range required [0, 1]</td><td>Neural network activations, image inputs</td></tr>
              <tr><td><strong>Log1p Transform</strong></td><td>Strictly positive values with strong right skew</td><td>Reduces skewness; linear models & neural nets</td></tr>
              <tr><td><strong>No Scaling</strong></td><td>Tree models split based on value ranking, not magnitude</td><td>Decision Trees, Random Forests, XGBoost, LightGBM, CatBoost</td></tr>
            </tbody>
          </table>
        </div>
        ${this.getRecipeBoxHTML("recipe-standard-scaler")}
        ${this.getRecipeBoxHTML("recipe-minmax-scaler")}

        <!-- 7. Categorical Encoding & High Cardinality -->
        <strong style="color: #fff; display: block; margin-top: 20px;">7. Categorical Encoding & High-Cardinality Features (Steps 12–13)</strong>
        <div class="minimal-table-container" style="margin-top: 6px;">
          <table class="minimal-table">
            <thead>
              <tr>
                <th>Encoding Method</th>
                <th>When Appropriate</th>
                <th>Production Rule</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><strong>One-Hot Encoding</strong></td><td>Nominal categories with low-to-medium cardinality (&lt;50)</td><td>Always specify <code>handle_unknown='ignore'</code></td></tr>
              <tr><td><strong>Ordinal Encoding</strong></td><td>Categories possess natural inherent ordering</td><td>Map explicit ordered list; never use arbitrary integer mappings</td></tr>
              <tr><td><strong>Target Encoding</strong></td><td>High-cardinality nominals (cities, merchant IDs)</td><td>Must use out-of-fold calculation with smoothing to prevent leakage</td></tr>
              <tr><td><strong>Rare Category Grouping</strong></td><td>Categories with long tail of infrequent observations</td><td>Group into 'Other' using <code>min_frequency</code> parameter</td></tr>
              <tr><td><strong>Binning (Discretization)</strong></td><td>Continuous variables where threshold bands carry domain signal</td><td>Use <code>pd.cut()</code> or <code>KBinsDiscretizer</code></td></tr>
            </tbody>
          </table>
        </div>
        ${this.getRecipeBoxHTML("recipe-label-encoder")}
        ${this.getRecipeBoxHTML("recipe-one-hot-encoding")}
        ${this.getRecipeBoxHTML("recipe-binning-cut")}

        <!-- 8. Specialized Data Types -->
        <strong style="color: #fff; display: block; margin-top: 20px;">8. Dates, Text & Specialized Features (Steps 14–16)</strong>
        <ul style="padding-left: 20px; color: var(--text-secondary); font-size: 0.83rem; margin-top: 6px; line-height: 1.5;">
          <li><strong>Timestamps:</strong> Parse into UTC; extract calendar components (day of week, hour, is_weekend, elapsed days from reference).</li>
          <li><strong>Time Series & Lags:</strong> Engineer lag features (t-1, t-7) and rolling aggregations (7d mean, 30d std) using strictly past observations.</li>
          <li><strong>Free Text:</strong> Strip HTML, lowercase, tokenize, apply TF-IDF (fitted on train only) or pre-trained sentence transformer embeddings.</li>
          <li><strong>Geospatial:</strong> Assert latitude [-90, 90] and longitude [-180, 180] boundaries; calculate Haversine distances to key points of interest.</li>
        </ul>

        <!-- 9. Imbalance & Target Preparation -->
        <strong style="color: #fff; display: block; margin-top: 18px;">9. Class Imbalance & Target Preparation (Step 17)</strong>
        <p style="color: var(--text-secondary); font-size: 0.83rem; margin: 4px 0 8px 0;">
          Prioritize class weighting (<code>class_weight='balanced'</code>) and threshold tuning over synthetic resampling. If using SMOTE or random under-sampling, execute it strictly on training folds inside cross-validation.
        </p>

        <!-- 10. Unified Production Pipeline -->
        <strong style="color: #fff; display: block; margin-top: 20px;">10. Production Mixed-Type ColumnTransformer + Pipeline (Step 20)</strong>
        <p style="color: var(--text-secondary); font-size: 0.83rem; margin: 4px 0 8px 0;">
          Bundle numerical scaling, categorical encoding, and model estimator into a single unified scikit-learn pipeline:
        </p>
        ${this.getRecipeBoxHTML("recipe-pipeline-production-mixed")}

        <!-- 11. Serialization & Monitoring -->
        <strong style="color: #fff; display: block; margin-top: 20px;">11. Pipeline Serialization, Testing & Monitoring (Step 21)</strong>
        <p style="color: var(--text-secondary); font-size: 0.83rem; margin: 4px 0 8px 0;">
          Persist the entire fitted pipeline artifact using joblib, pin python dependencies, and monitor serving input drift:
        </p>
        ${this.getRecipeBoxHTML("recipe-save-joblib-pipeline")}
      </div>

      <!-- Phase 5 -->
      <div class="checklist-card" id="guide-phase-5" style="margin-top: 24px;">
        <div class="card-title-text" style="margin-bottom: 12px;">Phase 5 — Feature Engineering & Dimensionality Reduction</div>
        <p style="font-size: 0.86rem; color: var(--text-secondary); margin-bottom: 14px;">
          Feature engineering converts domain knowledge into predictive signal. Dimensionality reduction and unsupervised clustering can compress representations or uncover hidden customer cohorts.
        </p>

        <div style="font-size: 0.86rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 16px;">
          <strong style="color: #fff; display: block; margin-top: 8px;">Engineering Best Practices:</strong>
          <ul style="padding-left: 20px; margin-top: 6px;">
            <li><strong style="color: #ddd;">Leakage Safety:</strong> Features must be computeable at prediction time using strictly available input.</li>
            <li><strong style="color: #ddd;">Ratios & Interactions:</strong> Combine features with domain logic (e.g. debt-to-income, usage-per-day, spend-to-limit).</li>
            <li><strong style="color: #ddd;">Dimensionality Reduction:</strong> Use PCA to reduce collinearity or project high-dimensional data into orthogonal components.</li>
            <li><strong style="color: #ddd;">Cluster Features:</strong> Use K-Means or DBSCAN cluster IDs or distance-to-centroids as engineered features.</li>
          </ul>
        </div>

        <strong style="color: #fff; display: block; margin-top: 16px;">Dimensionality Reduction: PCA 2D Visualization</strong>
        ${this.getRecipeBoxHTML("recipe-pca")}

        <strong style="color: #fff; display: block; margin-top: 16px;">Clustering: K-Means Elbow Method & Execution</strong>
        ${this.getRecipeBoxHTML("recipe-kmeans-elbow")}
        ${this.getRecipeBoxHTML("recipe-kmeans-clustering")}

        <strong style="color: #fff; display: block; margin-top: 16px;">Density-Based Clustering: DBSCAN</strong>
        ${this.getRecipeBoxHTML("recipe-dbscan")}
      </div>

      <!-- Phase 6 -->
      <div class="checklist-card" id="guide-phase-6" style="margin-top: 24px;">
        <div class="card-title-text" style="margin-bottom: 12px;">Phase 6 — Model Training, Tuning & Ensembling</div>
        <p style="font-size: 0.86rem; color: var(--text-secondary); margin-bottom: 14px;">
          Start with a naive heuristic baseline. Then fit candidate models through the pipeline, tune hyperparameters via cross-validation, and optionally ensemble complementary learners.
        </p>

        <strong style="color: #fff; display: block; margin-top: 16px;">1. Baseline Heuristic Benchmark</strong>
        <p style="color: var(--text-secondary); font-size: 0.82rem; margin: 4px 0 8px 0;">Never claim success without beating a dummy/heuristic baseline:</p>
        ${this.getRecipeBoxHTML("recipe-baseline-dummy")}

        <strong style="color: #fff; display: block; margin-top: 16px;">2. Candidate Model Imports Suite</strong>
        <p style="color: var(--text-secondary); font-size: 0.82rem; margin: 4px 0 8px 0;">Standard algorithm suite covering linear, tree, bagging, and boosting architectures:</p>
        ${this.getRecipeBoxHTML("recipe-candidate-imports")}

        <strong style="color: #fff; display: block; margin-top: 16px;">3. Hyperparameter Tuning with GridSearchCV</strong>
        ${this.getRecipeBoxHTML("recipe-random-forest-grid")}
        ${this.getRecipeBoxHTML("recipe-knn-grid")}

        <strong style="color: #fff; display: block; margin-top: 16px;">4. Learning Curve Diagnostics</strong>
        <p style="color: var(--text-secondary); font-size: 0.82rem; margin: 4px 0 8px 0;">Diagnose bias (underfitting) vs variance (overfitting) across training set sizes:</p>
        ${this.getRecipeBoxHTML("recipe-learning-curve")}

        <strong style="color: #fff; display: block; margin-top: 16px;">5. Model Stacking & Ensembling</strong>
        <p style="color: var(--text-secondary); font-size: 0.82rem; margin: 4px 0 8px 0;">Combine complementary learners with a meta-classifier:</p>
        ${this.getRecipeBoxHTML("recipe-stacking-classifier")}
        ${this.getRecipeBoxHTML("recipe-advanced-stacked-ensemble")}
      </div>

      <!-- Phase 7 -->
      <div class="checklist-card" id="guide-phase-7" style="margin-top: 24px;">
        <div class="card-title-text" style="margin-bottom: 12px;">Phase 7 — Model Evaluation & Diagnostic Analysis</div>
        <p style="font-size: 0.86rem; color: var(--text-secondary); margin-bottom: 14px;">
          Evaluate the final frozen pipeline once on untouched holdout test data. Never tune hyperparameters based on test set scores.
        </p>

        <div class="minimal-table-container">
          <table class="minimal-table">
            <thead>
              <tr>
                <th>Task Type</th>
                <th>Primary & Secondary Metrics</th>
                <th>Diagnostic Checks</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Regression</strong></td>
                <td>RMSE, MAE, R², Adjusted R², MAPE</td>
                <td>Residual error distribution, Residuals vs Predicted, Actual vs Predicted line plot</td>
              </tr>
              <tr>
                <td><strong>Balanced Classification</strong></td>
                <td>ROC-AUC, Accuracy, F1-Score</td>
                <td>Confusion matrix, ROC curve, Calibration curves</td>
              </tr>
              <tr>
                <td><strong>Imbalanced Classification</strong></td>
                <td>PR-AUC (Average Precision), F-beta, Precision@k, Recall@k</td>
                <td>Minority class recall, Cost-matrix thresholding, False positive analysis</td>
              </tr>
            </tbody>
          </table>
        </div>

        <strong style="color: #fff; display: block; margin-top: 16px;">Regression Evaluation & Residual Diagnostics</strong>
        ${this.getRecipeBoxHTML("recipe-regression-metrics")}
        ${this.getRecipeBoxHTML("recipe-residual-plots")}
        ${this.getRecipeBoxHTML("recipe-actual-vs-predicted-graph")}

        <strong style="color: #fff; display: block; margin-top: 16px;">Classification Evaluation & ROC Curves</strong>
        ${this.getRecipeBoxHTML("recipe-classification-eval")}
        ${this.getRecipeBoxHTML("recipe-logistic-coefficients")}
        ${this.getRecipeBoxHTML("recipe-roc-curve-plot")}
      </div>

      <!-- Phase 8 -->
      <div class="checklist-card" id="guide-phase-8" style="margin-top: 24px;">
        <div class="card-title-text" style="margin-bottom: 12px;">Phase 8 — Packaging, Logging & Production Deployment</div>
        <p style="font-size: 0.86rem; color: var(--text-secondary); margin-bottom: 14px;">
          Deploy a reliable service, not just a model. Serialize the entire pipeline (preprocessors + model), enforce strict Pydantic schema validation, and instrument structured logging.
        </p>

        <div style="font-size: 0.86rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 16px;">
          <strong style="color: #fff; display: block; margin-top: 8px;">Production Deployment Checklist:</strong>
          <ul style="padding-left: 20px; margin-top: 6px;">
            <li><strong style="color: #ddd;">Serialization:</strong> Save full pipeline using <code>joblib.dump(pipeline, "model.joblib")</code> or export to ONNX for cross-platform inference.</li>
            <li><strong style="color: #ddd;">Input Validation:</strong> Reject invalid payloads before inference using Pydantic schemas (HTTP 422).</li>
            <li><strong style="color: #ddd;">Automated Tests:</strong> Test for deterministic output, null handling, type conversion, and edge cases.</li>
            <li><strong style="color: #ddd;">Serving Architecture:</strong> Deploy with FastAPI, Docker, and health checks (<code>/health</code>, <code>/predict</code>).</li>
          </ul>
        </div>

        <strong style="color: #fff; display: block; margin-top: 16px;">Pipeline Logging Configuration</strong>
        <p style="color: var(--text-secondary); font-size: 0.82rem; margin: 4px 0 8px 0;">Production logging setup with timestamps and severity levels:</p>
        ${this.getRecipeBoxHTML("recipe-production-logging")}
      </div>

      <!-- Phase 9 -->
      <div class="checklist-card" id="guide-phase-9" style="margin-top: 24px;">
        <div class="card-title-text" style="margin-bottom: 12px;">Phase 9 — Monitoring, Drift Detection & Maintenance</div>
        <p style="font-size: 0.86rem; color: var(--text-secondary); margin-bottom: 14px;">
          A model begins degrading the moment it is deployed. Monitor data quality, feature drift, prediction drift, and concept drift over time.
        </p>

        <div style="font-size: 0.86rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 16px;">
          <strong style="color: #fff; display: block; margin-top: 8px;">Operational Monitoring Strategy:</strong>
          <ul style="padding-left: 20px; margin-top: 6px;">
            <li><strong style="color: #ddd;">Data Quality Drift:</strong> Monitor missing value spikes, unexpected categories, out-of-range numerical values.</li>
            <li><strong style="color: #ddd;">Feature Drift:</strong> Track distribution changes between training data and live traffic using Kolmogorov-Smirnov (KS) tests or Population Stability Index (PSI).</li>
            <li><strong style="color: #ddd;">Prediction Drift:</strong> Track changes in output distribution (e.g. churn rate moving from 6% to 18% without business justification).</li>
            <li><strong style="color: #ddd;">Retraining Cadence:</strong> Automate retraining on fresh data while validating candidates against production models on shadow traffic before promotion.</li>
            <li><strong style="color: #ddd;">Rollback Plan:</strong> Maintain one-click rollback to the previous model artifact in case of anomalies.</li>
          </ul>
        </div>
      </div>

      <!-- Implementation Order & Golden Habit -->
      <div class="checklist-card" id="guide-order" style="margin-top: 24px;">
        <div class="card-title-text" style="margin-bottom: 12px;">Recommended Implementation Order</div>
        <ol style="padding-left: 20px; font-size: 0.86rem; color: var(--text-secondary); line-height: 1.7;">
          ${ML_WORKFLOW_DATA.implementationOrder.map(s => `
            <li><strong style="color: #fff;">${s.title}:</strong> ${s.desc}</li>
          `).join("")}
        </ol>

        <div style="background: #0a0a0a; border: 1px solid #1f1f1f; padding: 14px; border-radius: 6px; font-size: 0.84rem; color: #ddd; margin-top: 18px;">
          <strong style="color: #fff;">The Golden Habit of Production ML:</strong>
          <p style="color: var(--text-secondary); margin-top: 6px;">
            Document every decision. An ML pipeline is not just code; it is a series of documented justifications. Record why outliers were kept or clipped, why a specific imputer was chosen, and which hypothesis tests justified feature inclusion.
          </p>
        </div>
      </div>
    `;
  }

  // ==========================================================================
  // 4. INTERACTIVE TOOLS VIEW (MATCHING BLACK MINIMALIST STYLE)
  // ==========================================================================
  renderToolsView(container) {
    container.innerHTML = `
      <h1 class="page-title">Interactive ML Assistants</h1>
      <p class="page-subtitle">Generate leakage-free splitting strategies, scikit-learn pipeline code, and FastAPI serving endpoints.</p>

      <!-- Splitting Advisor -->
      <div class="checklist-card">
        <div class="card-title-text" style="margin-bottom: 6px;">1. Splitting Strategy Advisor</div>
        <div class="card-instructions">Select dataset properties to get the recommended split strategy and code.</div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin: 16px 0;">
          <div class="form-field">
            <label>Temporal / Structure</label>
            <select id="tool-split-time">
              <option value="none">Independent Records</option>
              <option value="time">Time-dependent / Forecasting</option>
              <option value="groups">Multiple records per customer/entity</option>
            </select>
          </div>
          <div class="form-field">
            <label>Class Balance</label>
            <select id="tool-split-imb">
              <option value="balanced">Balanced / Moderate</option>
              <option value="imbalanced">Severe Class Imbalance</option>
            </select>
          </div>
          <div class="form-field">
            <label>Data Volume</label>
            <select id="tool-split-size">
              <option value="normal">Standard / Large (>= 5,000)</option>
              <option value="small">Small (< 1,000)</option>
            </select>
          </div>
        </div>

        <button class="btn-minimal" style="color: #fff; border-color: #555;" onclick="app.runSplittingAdvisor()">Recommend Strategy</button>
        <div id="split-advisor-result" style="margin-top: 16px; display: none;"></div>
      </div>

      <!-- Preprocessing Pipeline Builder -->
      <div class="checklist-card">
        <div class="card-title-text" style="margin-bottom: 6px;">2. ColumnTransformer Pipeline Generator</div>
        <div class="card-instructions">Generate production-ready scikit-learn preprocessing code for your features.</div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 16px 0;">
          <div class="form-field">
            <label>Numerical Columns (comma-separated)</label>
            <input type="text" id="tool-num-cols" value="age, income, credit_score, balance">
          </div>
          <div class="form-field">
            <label>Categorical Columns (comma-separated)</label>
            <input type="text" id="tool-cat-cols" value="gender, education, occupation, city">
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin-bottom: 16px;">
          <div class="form-field">
            <label>Numerical Scaler</label>
            <select id="tool-num-scaler">
              <option value="standard">StandardScaler</option>
              <option value="robust">RobustScaler (Outlier-safe)</option>
              <option value="minmax">MinMaxScaler</option>
              <option value="none">None (Tree Models)</option>
            </select>
          </div>
          <div class="form-field">
            <label>Categorical Encoder</label>
            <select id="tool-cat-encoder">
              <option value="onehot">OneHotEncoder(handle_unknown='ignore')</option>
              <option value="ordinal">OrdinalEncoder</option>
            </select>
          </div>
        </div>

        <button class="btn-minimal" style="color: #fff; border-color: #555;" onclick="app.runPipelineGenerator()">Generate Pipeline Code</button>
        <div id="pipeline-gen-result" style="margin-top: 16px; display: none;"></div>
      </div>

      <!-- Tool 3: EDA Plot Insight Logger & Action Template -->
      <div class="checklist-card" style="margin-top: 24px;">
        <div class="card-title-text" style="margin-bottom: 6px;">3. EDA Plot Insight Logger & Action Template</div>
        <div class="card-instructions">Connect visual plot findings to concrete actions and log directly to active dataset notes.</div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 16px 0;">
          <div class="form-field">
            <label>Plot Type</label>
            <select id="tool-plot-type">
              <option value="Histogram">Histogram (Numerical Distribution)</option>
              <option value="Box Plot">Box Plot (Spread & Outliers)</option>
              <option value="Violin / KDE Plot">Violin / KDE Plot (Multimodality)</option>
              <option value="Scatter Plot">Scatter Plot (Bivariate Relationship)</option>
              <option value="Correlation Heatmap">Correlation Heatmap (Linear Multicollinearity)</option>
              <option value="Grouped Bar Plot">Grouped Bar Plot (Outcome vs Categories)</option>
              <option value="Count Plot">Count Plot (Class Imbalance)</option>
              <option value="Stacked Bar Chart">Stacked Bar Chart (Proportions)</option>
              <option value="Mosaic Plot">Mosaic Plot (Contingency Independence)</option>
              <option value="Missing-Value Heatmap">Missing-Value Heatmap (Missingness Patterns)</option>
              <option value="Outlier Scatter">Outlier Scatter (Multivariate Anomalies)</option>
              <option value="Pair Plot">Pair Plot (Pairwise Grid)</option>
              <option value="Time-Series Plot">Time-Series Plot (Seasonality & Trend)</option>
              <option value="Distribution Comparison">Distribution Comparison (Data Drift)</option>
              <option value="Residual Plot">Residual Plot (Error Misspecification)</option>
            </select>
          </div>
          <div class="form-field">
            <label>Target Feature / Column Name</label>
            <input type="text" id="tool-plot-col" placeholder="e.g. house_price, monthly_spend, churn">
          </div>
        </div>

        <div class="form-field">
          <label>Visual Observation (What did you see?)</label>
          <input type="text" id="tool-plot-obs" placeholder="e.g. Strong right skew with long tail above $800k; multiple peaks at $200k and $450k">
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <div class="form-field">
            <label>Statistical or Data Quality Implication</label>
            <input type="text" id="tool-plot-imp" placeholder="e.g. Mean pulled by upper tail; distinct sub-populations present">
          </div>
          <div class="form-field">
            <label>Recommended Action (from Section 6 Decision Matrix)</label>
            <select id="tool-plot-action">
              <option value="Investigate log or power transformation">Investigate log or power transformation</option>
              <option value="Investigate missingness and compare strategies (MCAR/MAR/MNAR)">Investigate missingness and compare strategies</option>
              <option value="Validate records; consider robust methods or clipping">Validate records; consider robust methods or clipping</option>
              <option value="Investigate redundancy and multicollinearity; check drop threshold">Investigate redundancy and multicollinearity</option>
              <option value="Group rare categories if appropriate">Group rare categories if appropriate</option>
              <option value="Use suitable metrics (PR-AUC, F-beta) and class weights">Use suitable metrics and class weights</option>
              <option value="Try nonlinear models or feature transformations">Try nonlinear models or feature transformations</option>
              <option value="Investigate segment differences; check confounding variables">Investigate segment differences</option>
              <option value="Investigate source changes and monitor performance drift">Investigate source changes and monitor drift</option>
              <option value="Reconsider features, model assumptions, or model class">Reconsider features, model assumptions, or model class</option>
            </select>
          </div>
        </div>

        <div class="form-field" style="margin-top: 12px;">
          <label>Action to Test & Evidence Validation Rule</label>
          <input type="text" id="tool-plot-test" placeholder="e.g. Compare raw target vs log1p(target) across 5-fold CV using RMSE; retain only if CV improves">
        </div>

        <div style="display: flex; gap: 10px; margin-top: 14px; flex-wrap: wrap;">
          <button class="btn-minimal" style="color: #fff; border-color: #555;" onclick="app.logPlotInsightToNotes()">Save to Dataset Notes</button>
          <button class="btn-minimal" onclick="app.copyPlotInsightMarkdown()">Copy Markdown Analysis</button>
        </div>
        <div id="plot-insight-result" style="margin-top: 16px; display: none;"></div>
      </div>
    `;
  }

  runSplittingAdvisor() {
    const timeVal = document.getElementById("tool-split-time").value;
    const imbVal = document.getElementById("tool-split-imb").value;
    const sizeVal = document.getElementById("tool-split-size").value;
    const res = document.getElementById("split-advisor-result");

    let strategy = "";
    let reason = "";
    let code = "";

    if (timeVal === "time") {
      strategy = "Chronological Split (TimeSeriesSplit)";
      reason = "Prevents temporal data leakage. Future observations must never be used to train predictions for past events.";
      code = `from sklearn.model_selection import TimeSeriesSplit

df = df.sort_values(by="timestamp")
split_idx = int(len(df) * 0.80)
X_train, X_test = X.iloc[:split_idx], X.iloc[split_idx:]
y_train, y_test = y.iloc[:split_idx], y.iloc[split_idx:]`;
    } else if (timeVal === "groups") {
      strategy = "Group-based Split (GroupKFold)";
      reason = "Prevents entity leakage. All records belonging to the same entity/customer must stay together in the same partition.";
      code = `from sklearn.model_selection import GroupKFold

groups = df["customer_id"]
gkf = GroupKFold(n_splits=5)
# Use in cross_val_score(..., groups=groups)`;
    } else if (imbVal === "imbalanced") {
      strategy = "Stratified Split (StratifiedKFold)";
      reason = "Preserves class balance proportions across training and test subsets.";
      code = `from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.20, random_state=42, stratify=y
)`;
    } else if (sizeVal === "small") {
      strategy = "Nested Cross-Validation";
      reason = "Dataset has small sample size (<1,000 rows). Holdout evaluation suffers from high variance.";
      code = `from sklearn.model_selection import KFold, cross_val_score

cv = KFold(n_splits=5, shuffle=True, random_state=42)
scores = cross_val_score(pipeline, X, y, cv=cv)`;
    } else {
      strategy = "Random Train/Test Split (80/20)";
      reason = "Standard I.I.D. observations with sufficient volume.";
      code = `from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.20, random_state=42
)`;
    }

    res.style.display = "block";
    res.innerHTML = `
      <div style="background: #0a0a0a; border: 1px solid #1f1f1f; padding: 12px 14px; border-radius: 6px; font-size: 0.84rem; color: #fff; margin-bottom: 12px;">
        <strong>Recommended Approach: ${strategy}</strong><br>
        <span style="color: #999;">${reason}</span>
      </div>
      <div class="code-box">
        <div class="code-box-header">
          <span>split_code.py</span>
          <button class="code-copy-btn" onclick="app.copyCodeSnippet(this)">Copy</button>
        </div>
        <pre><code>${escapeHtml(code)}</code></pre>
      </div>
    `;
  }

  runPipelineGenerator() {
    const numCols = document.getElementById("tool-num-cols").value.split(",").map(c => `"${c.trim()}"`).join(", ");
    const catCols = document.getElementById("tool-cat-cols").value.split(",").map(c => `"${c.trim()}"`).join(", ");
    const scaler = document.getElementById("tool-num-scaler").value;
    const encoder = document.getElementById("tool-cat-encoder").value;

    let scaleCode = "";
    if (scaler === "standard") scaleCode = `("scaler", StandardScaler())`;
    else if (scaler === "robust") scaleCode = `("scaler", RobustScaler())`;
    else if (scaler === "minmax") scaleCode = `("scaler", MinMaxScaler())`;

    let encCode = encoder === "onehot" 
      ? `("encoder", OneHotEncoder(handle_unknown="ignore", sparse_output=False))` 
      : `("encoder", OrdinalEncoder(handle_unknown="use_encoded_value", unknown_value=-1))`;

    const code = `from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, RobustScaler, MinMaxScaler, OneHotEncoder, OrdinalEncoder
from sklearn.ensemble import RandomForestClassifier

numeric_columns = [${numCols}]
categorical_columns = [${catCols}]

numeric_pipeline = Pipeline([
    ("imputer", SimpleImputer(strategy="median")),
    ${scaleCode ? scaleCode : ""}
])

categorical_pipeline = Pipeline([
    ("imputer", SimpleImputer(strategy="most_frequent")),
    ${encCode}
])

preprocessor = ColumnTransformer([
    ("num", numeric_pipeline, numeric_columns),
    ("cat", categorical_pipeline, categorical_columns)
], remainder="drop")

model_pipeline = Pipeline([
    ("preprocessor", preprocessor),
    ("model", RandomForestClassifier(random_state=42))
])

# Fit ONLY on training data:
model_pipeline.fit(X_train, y_train)`;

    const res = document.getElementById("pipeline-gen-result");
    res.style.display = "block";
    res.innerHTML = `
      <div class="code-box">
        <div class="code-box-header">
          <span>generated_pipeline.py</span>
          <button class="code-copy-btn" onclick="app.copyCodeSnippet(this)">Copy</button>
        </div>
        <pre><code>${escapeHtml(code)}</code></pre>
      </div>
    `;
  }

  logPlotInsightToNotes() {
    const plotType = document.getElementById("tool-plot-type").value;
    const col = document.getElementById("tool-plot-col").value.trim() || "Target/Feature";
    const obs = document.getElementById("tool-plot-obs").value.trim() || "Unspecified observation";
    const imp = document.getElementById("tool-plot-imp").value.trim() || "Requires validation";
    const act = document.getElementById("tool-plot-action").value;
    const test = document.getElementById("tool-plot-test").value.trim() || "Validate on training folds";

    const p = this.getActiveProject();
    if (!p) return;

    const finding = `[${plotType}: ${col}] Obs: ${obs}. Action: ${act}. Validation: ${test}`;
    p.description = p.description ? `${p.description}\n- ${finding}` : `- ${finding}`;

    this.saveState();

    const res = document.getElementById("plot-insight-result");
    res.style.display = "block";
    res.innerHTML = `
      <div style="background: #0a0a0a; border: 1px solid var(--border-card); padding: 12px 14px; border-radius: 6px; font-size: 0.82rem; color: #eee;">
        <strong style="color: #fff;">Saved to dataset "${escapeHtml(p.name)}" profile findings:</strong><br>
        <code style="display: block; margin-top: 6px; color: #ccc;">${escapeHtml(finding)}</code>
      </div>
    `;
    this.showToast("Logged finding to dataset profile!");
  }

  copyPlotInsightMarkdown() {
    const plotType = document.getElementById("tool-plot-type").value;
    const col = document.getElementById("tool-plot-col").value.trim() || "Target/Feature";
    const obs = document.getElementById("tool-plot-obs").value.trim() || "Unspecified observation";
    const imp = document.getElementById("tool-plot-imp").value.trim() || "Requires validation";
    const act = document.getElementById("tool-plot-action").value;
    const test = document.getElementById("tool-plot-test").value.trim() || "Validate on training folds";

    const md = `### EDA Plot Analysis Record: ${plotType} (${col})
1. **Plot name and purpose:** ${plotType} of \`${col}\` to evaluate distribution and signal.
2. **Observation:** ${obs}
3. **Statistical implication:** ${imp}
4. **Possible ML impact:** Affects scale sensitivity, loss optimization, and feature stability.
5. **Action to test:** ${act} (${test})
6. **Evidence and decision:** Validate with cross-validation without data leakage; retain if metric improves.`;

    navigator.clipboard.writeText(md).then(() => {
      this.showToast("Markdown analysis copied!");
    });
  }

  // ==========================================================================
  // 5. DATASET MANAGEMENT & REPORT EXPORT
  // ==========================================================================
  renderDatasetDropdown() {
    const sel = document.getElementById("dataset-select");
    if (!sel) return;
    sel.innerHTML = "";
    this.projects.forEach(p => {
      const opt = document.createElement("option");
      opt.value = p.id;
      opt.textContent = `${p.name} (${p.taskType || "General"})`;
      if (p.id === this.currentProjectId) opt.selected = true;
      sel.appendChild(opt);
    });
  }

  handleDatasetChange(newId) {
    this.currentProjectId = newId;
    this.saveState();
    this.renderActiveTab();
    this.showToast(`Switched to: ${this.getActiveProject().name}`);
  }

  openNewDatasetModal() {
    document.getElementById("dataset-modal-title").textContent = "New Dataset Profile";
    document.getElementById("ds-modal-id").value = "";
    document.getElementById("ds-modal-name").value = "";
    document.getElementById("ds-modal-type").value = "Binary Classification";
    document.getElementById("ds-modal-target").value = "";
    document.getElementById("ds-modal-rows").value = "";
    document.getElementById("ds-modal-cols").value = "";
    document.getElementById("ds-modal-desc").value = "";
    document.getElementById("dataset-modal")?.classList.add("open");
  }

  saveDatasetModal() {
    const name = document.getElementById("ds-modal-name").value.trim() || "Untitled Dataset";
    const taskType = document.getElementById("ds-modal-type").value;
    const targetCol = document.getElementById("ds-modal-target").value.trim();
    const rowCount = document.getElementById("ds-modal-rows").value.trim();
    const colCount = document.getElementById("ds-modal-cols").value.trim();
    const description = document.getElementById("ds-modal-desc").value.trim();

    const newId = `proj_${Date.now()}`;
    const newProj = {
      id: newId,
      name,
      taskType,
      targetCol,
      rowCount,
      colCount,
      description,
      createdAt: new Date().toISOString(),
      checkedItems: {}
    };

    this.projects.push(newProj);
    this.currentProjectId = newId;
    this.saveState();
    this.renderDatasetDropdown();
    this.renderActiveTab();
    this.closeModal("dataset-modal");
    this.showToast("Dataset profile created!");
  }

  closeModal(modalId) {
    document.getElementById(modalId)?.classList.remove("open");
  }

  resetActiveChecklist() {
    if (!confirm("Reset all checked items for the current dataset?")) return;
    const p = this.getActiveProject();
    if (p) {
      p.checkedItems = {};
      this.saveState();
      this.renderActiveTab();
      this.showToast("Checklist reset");
    }
  }

  resetEdaChecklist() {
    if (!confirm("Reset EDA checklist items?")) return;
    const p = this.getActiveProject();
    if (p && p.checkedItems) {
      ML_WORKFLOW_DATA.edaTracker.forEach(item => {
        delete p.checkedItems[item.id];
      });
      this.saveState();
      this.renderActiveTab();
      this.showToast("EDA checklist reset");
    }
  }

  resetPrepChecklist() {
    if (!confirm("Reset Preprocessing sign-off items for the current dataset?")) return;
    const p = this.getActiveProject();
    if (p && p.checkedItems && ML_WORKFLOW_DATA.preprocessingTracker) {
      ML_WORKFLOW_DATA.preprocessingTracker.forEach(item => {
        delete p.checkedItems[item.id];
      });
      this.saveState();
      this.renderActiveTab();
      this.showToast("Preprocessing checklist reset");
    }
  }

  copyPrepMarkdown() {
    const p = this.getActiveProject();
    const stats = this.getStats();
    const checked = p.checkedItems || {};
    let md = `# Preprocessing Sign-Off: ${p.name}\n\n`;
    md += `**Status:** ${stats.prepDone}/${stats.prepTotal} verified\n\n`;
    
    const categories = {};
    (ML_WORKFLOW_DATA.preprocessingTracker || []).forEach(item => {
      if (!categories[item.category]) categories[item.category] = [];
      categories[item.category].push(item);
    });

    Object.keys(categories).forEach(cat => {
      md += `### ${cat}\n`;
      categories[cat].forEach(item => {
        const isDone = checked[item.id]?.status === "done";
        const note = checked[item.id]?.note;
        md += `${isDone ? '[x]' : '[ ]'} **${item.name}**: ${item.desc}\n`;
        if (note) md += `    > Note: ${note}\n`;
      });
      md += `\n`;
    });

    navigator.clipboard.writeText(md).then(() => {
      this.showToast("Preprocessing sign-off copied!");
    }).catch(() => {
      this.showToast("Failed to copy");
    });
  }

  resetLeakageChecklist() {
    if (!confirm("Reset Leakage Audit items for the current dataset?")) return;
    const p = this.getActiveProject();
    if (p && p.checkedItems && ML_WORKFLOW_DATA.leakageTracker) {
      ML_WORKFLOW_DATA.leakageTracker.forEach(item => {
        delete p.checkedItems[item.id];
      });
      this.saveState();
      this.renderActiveTab();
      this.showToast("Leakage audit reset");
    }
  }

  copyLeakageMarkdown() {
    const p = this.getActiveProject();
    const stats = this.getStats();
    const checked = p.checkedItems || {};
    let md = `# Leakage Audit: ${p.name}\n\n`;
    md += `**Status:** ${stats.leakDone}/${stats.leakTotal} verified\n\n`;

    const categories = {};
    (ML_WORKFLOW_DATA.leakageTracker || []).forEach(item => {
      if (!categories[item.category]) categories[item.category] = [];
      categories[item.category].push(item);
    });

    Object.keys(categories).forEach(cat => {
      md += `### ${cat}\n`;
      categories[cat].forEach(item => {
        const isDone = checked[item.id]?.status === "done";
        const note = checked[item.id]?.note;
        md += `${isDone ? '[x]' : '[ ]'} **${item.name}**: ${item.desc}\n`;
        if (note) md += `    > Note: ${note}\n`;
      });
      md += `\n`;
    });

    navigator.clipboard.writeText(md).then(() => {
      this.showToast("Leakage audit copied!");
    }).catch(() => {
      this.showToast("Failed to copy");
    });
  }

  buildMarkdownReport() {
    const p = this.getActiveProject();
    const stats = this.getStats();
    const checked = p.checkedItems || {};

    let md = `# Production ML Project Checklist: ${p.name}\n\n`;
    md += `**Master Progress:** ${stats.percent}% (${stats.masterDone}/${stats.masterTotal} tasks verified)\n`;
    md += `**EDA Tracker:** ${stats.edaDone}/${stats.edaTotal} verified\n`;
    md += `**Preprocessing Sign-Off:** ${stats.prepDone}/${stats.prepTotal} verified\n`;
    md += `**Leakage Audit:** ${stats.leakDone}/${stats.leakTotal} verified\n`;
    if (p.targetCol) md += `**Target Variable:** ${p.targetCol}\n`;
    if (p.taskType) md += `**Task Type:** ${p.taskType}\n`;
    md += `\n`;

    const groups = {};
    ML_WORKFLOW_DATA.masterTracker.forEach(item => {
      if (!groups[item.group]) groups[item.group] = [];
      groups[item.group].push(item);
    });

    Object.keys(groups).forEach(grp => {
      md += `### Master: ${grp}\n`;
      groups[grp].forEach(item => {
        const isDone = checked[item.id]?.status === "done";
        const note = checked[item.id]?.note;
        md += `${isDone ? '[x]' : '[ ]'} ${item.title}\n`;
        if (note) md += `    > Note: ${note}\n`;
      });
      md += `\n`;
    });

    if (ML_WORKFLOW_DATA.preprocessingTracker) {
      md += `### Preprocessing Sign-Off (0/24)\n`;
      ML_WORKFLOW_DATA.preprocessingTracker.forEach(item => {
        const isDone = checked[item.id]?.status === "done";
        const note = checked[item.id]?.note;
        md += `${isDone ? '[x]' : '[ ]'} **${item.name}** (${item.category})\n`;
        if (note) md += `    > Note: ${note}\n`;
      });
      md += `\n`;
    }

    if (ML_WORKFLOW_DATA.leakageTracker) {
      md += `### Leakage Audit (0/18)\n`;
      ML_WORKFLOW_DATA.leakageTracker.forEach(item => {
        const isDone = checked[item.id]?.status === "done";
        const note = checked[item.id]?.note;
        md += `${isDone ? '[x]' : '[ ]'} **${item.name}** (${item.category})\n`;
        if (note) md += `    > Note: ${note}\n`;
      });
      md += `\n`;
    }

    return md;
  }

  copyMarkdownChecklist() {
    const md = this.buildMarkdownReport();
    navigator.clipboard.writeText(md).then(() => {
      this.showToast("Checklist copied to clipboard!");
    }).catch(() => {
      this.showToast("Failed to copy");
    });
  }

  openReportModal() {
    const text = this.buildMarkdownReport();
    document.getElementById("report-modal-text").textContent = text;
    document.getElementById("report-modal")?.classList.add("open");
  }

  downloadMarkdownReport() {
    const p = this.getActiveProject();
    const md = this.buildMarkdownReport();
    const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ML_Checklist_${p.name.replace(/\s+/g, '_')}.md`;
    a.click();
    URL.revokeObjectURL(url);
    this.showToast("Report downloaded");
  }

  copyCodeSnippet(btn) {
    const code = btn.closest(".code-box").querySelector("pre code")?.innerText;
    if (!code) return;
    navigator.clipboard.writeText(code).then(() => {
      const orig = btn.innerText;
      btn.innerText = "Copied!";
      setTimeout(() => { btn.innerText = orig; }, 1800);
      this.showToast("Code copied");
    });
  }

  exportJSON() {
    const data = {
      version: "2.0",
      date: new Date().toISOString(),
      projects: this.projects
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ML_Checklist_Backup_${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    this.showToast("Exported JSON");
  }

  handleFileImport(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed.projects && Array.isArray(parsed.projects)) {
          this.projects = parsed.projects;
          if (this.projects.length > 0) this.currentProjectId = this.projects[0].id;
          this.saveState();
          this.renderDatasetDropdown();
          this.renderActiveTab();
          this.showToast(`Imported ${this.projects.length} dataset profiles`);
        }
      } catch (err) {
        alert("Invalid JSON format");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  showToast(msg) {
    const box = document.getElementById("toast-box");
    if (!box) return;
    const toast = document.createElement("div");
    toast.className = "toast-msg";
    toast.textContent = msg;
    box.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transition = "opacity 0.2s ease";
      setTimeout(() => toast.remove(), 250);
    }, 2200);
  }
}

function escapeHtml(str) {
  if (typeof str !== "string") return str || "";
  return str.replace(/[&<>"']/g, function(m) {
    switch (m) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '"': return '&quot;';
      case "'": return '&#39;';
      default: return m;
    }
  });
}

let app;
window.addEventListener("DOMContentLoaded", () => {
  app = new MLChecklistApp();
});
