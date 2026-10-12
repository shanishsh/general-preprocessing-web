# ML Pipeline OS — Production Machine Learning Workflow & Checklist

An interactive, responsive web application for managing, auditing, and executing production-grade machine learning workflows across tabular datasets. Built with HTML5, CSS3, and modern vanilla JavaScript with zero external dependencies.

---

## 🚀 Key Features

### 1. Multi-Dataset & Project Management
- **Dataset Profiles**: Create, edit, switch between, and persist multiple dataset profiles (e.g., *Credit Default Risk*, *Customer Churn*, *House Prices Q3*).
- **Persistent State**: Auto-saves every milestone check, status change, and finding note to `localStorage`.
- **Export & Import**: Full backup and restore in JSON format (`ML_Workflow_Backup.json`).

### 2. Comprehensive Trackers & Checklists
- **Pure Black Minimalist UI**: Designed with a pure `#000000` canvas, `#1f1f1f` subtle borders, circular check indicators, and zero glowing or neon artifacts.
- **ChatGPT Typography Stack**: High-legibility **Inter** font for UI typography paired with **JetBrains Mono** for code blocks and data displays.
- **Inline Code Drawers**: Clickable `</> code` pill buttons next to checklist milestones to inspect and copy the exact Python snippet without leaving the checklist view.
- **Project Master Tracker (32 Milestones)**:
  - Real-time progress tracker (`0/32` or `0%` to `100%`)
  - Filter by status (*All*, *Completed*, *Pending*)
  - One-click copy as formatted Markdown report
- **Dedicated EDA Completion Tracker (31 Steps)**:
  - Visual completion counter (`0/31`)
  - Organized into:
    - *A. Initial inspection*
    - *B. Data quality analysis*
    - *C. Univariate analysis*
    - *D. Bivariate & multivariate analysis*
    - *E. Advanced & production-focused EDA*
    - *Document EDA findings*
  - Interactive reference table matching **Section 2.2** (*Analysis*, *When to use*, *Typical tools*).

### 3. Visual EDA Plot Interpretation Guide (15 Plots & Decision Matrix)
- **The 5 Core Questions**: For every plot, evaluate Distribution, Relationship, Data Quality, ML Impact, and Action.
- **15 Visual Plot Types (A through O)** with chart illustrations, key questions, "look for" checklists, and ML insights:
  - *Numerical Distributions*: Histograms (A), Box plots (B), Violin / KDE plots (C)
  - *Relationships*: Scatter plots (D), Correlation heatmaps (E), Grouped bar charts (F)
  - *Categorical Data*: Count plots (G), 100% Stacked bar charts (H), Mosaic plots / contingency tables (I)
  - *Data Quality & Outliers*: Missing-value heatmaps (J), Outlier scatter plots (K), Pair plots (L)
  - *Time-Series & Production*: Time-series line charts (M), Distribution drift comparison (N), Residual error diagnostic plots (O)
- **Observation → Action Decision Matrix**: 10-row operational table mapping visual findings (skewness, missingness, outliers, multicollinearity, drift) directly to concrete actions and cautions.
- **Reusable 6-Step Analysis Template**: Standardized reporting format (Plot name, Observation, Implication, ML impact, Action to test, Evidence/decision) with one-click copy.
- **Python Plotting Workflow**: Reusable Matplotlib and Seaborn script for rapid exploratory visualization.
- **EDA Plot Insight Logger Tool**: Interactive assistant to log visual findings and actions directly into your active dataset profile notes.

### 4. Complete ML Code Recipes & Cookbooks (34 Recipes)
A dedicated, filterable, and searchable Python cookbook organizing all recipes across 6 production categories:
- **EDA & Profiling**: Basic EDA plotting workflow, standard imports, automated `ydata-profiling` (`ProfileReport`), target correlation, multicollinearity filter (`> 0.85`), `mutual_info_classif`, Chi-Square test (`chi2_contingency` with `pd.qcut`), bias-corrected Cramér's V test, and ANOVA F-test (`f_oneway`).
- **Data Preprocessing**: `StandardScaler`, `MinMaxScaler`, `LabelEncoder`, one-hot encoding with `pd.get_dummies`, `pd.cut` continuous binning, and production `ColumnTransformer`.
- **Unsupervised & Clustering**: K-Means Elbow method (`inertia_` WCSS plot), K-Means clustering, DBSCAN with noise detection, and PCA 2D visualization with explained variance.
- **Training & Modeling**: `DummyClassifier` baseline, Linear Regression train/test split, candidate models suite, Random Forest `GridSearchCV`, KNN `GridSearchCV` pipeline, `LearningCurveDisplay`, `StackingClassifier`, and 3-model stacked ensemble (Tuned RF + XGBoost + LightGBM).
- **Model Evaluation**: Regression metrics (MAE, MSE, RMSE, R², Adjusted R²), residual error plots, actual vs predicted line plots, classification report & confusion matrix, logistic regression feature coefficients, and ROC Curve / ROC-AUC score plot.
- **Production & Deployment**: `logging.basicConfig` with timestamp and formatting.

### 5. Detailed Phase Deep Dives (Phases 1 through 9)
- **Phase 1 — Problem Definition & Data Understanding**: Business scoping, target specification, provenance, and data quality contracts.
- **Phase 2 — Exploratory Data Analysis (EDA)**: Profiling, anomalies, and multivariate relationships.
- **Phase 3 — Data Splitting & Leakage Prevention**:
  - Interactive decision matrix (*Random*, *Stratified*, *TimeSeriesSplit*, *GroupKFold*, *Nested CV*).
  - The Golden Leakage Rule explanation and copyable splitting templates.
- **Phase 4 — Data Preprocessing**:
  - Schema cleaning rules
  - Missing-value strategies matrix
  - Numerical scaling selector & 6-step outlier protocol
  - Categorical encoding distinctions & unknown category safeguards
  - Specialized data types (dates, text, audio, geospatial)
  - Class imbalance handling and warnings
  - Complete scikit-learn `ColumnTransformer` + `Pipeline` code template.
- **Phase 5 — Feature Engineering & Selection**:
  - 10 feature engineering categories
  - Temporal availability rule
  - Leak-free feature selection protocol inside cross-validation folds.
- **Phase 6 — Model Training & Selection**:
  - Naive baseline heuristics
  - Candidate model matrices by problem type
  - Evaluation protocol and hyperparameter tuning best practices.
- **Phase 7 — Model Evaluation**:
  - Task-specific metrics table (*Regression*, *Binary*, *Multiclass*, *Imbalanced*, *Forecasting*, *Clustering*)
  - 10-point production evaluation and slice fairness checklist.
- **Phase 8 — Packaging & Deployment**:
  - 8-step deployment roadmap
  - Standard stack (*scikit-learn*, *FastAPI*, *Pydantic*, *pytest*, *Docker*).
- **Phase 9 — Monitoring & Maintenance**:
  - 10 operational and statistical telemetry points (*PSI drift*, *prediction shifts*, *canary testing*, *rollback*).

### 6. Interactive Assistants & Code Generators
- **Splitting Strategy Advisor**: Select your data structure, class balance, and size to receive customized split recommendations and ready-to-run Python code.
- **Pipeline Code Generator**: Enter numerical and categorical column names and pick imputation/scaling/encoding to generate a production `ColumnTransformer`.
- **EDA Plot Insight Logger**: Connect visual observations to concrete actions and save directly to your active dataset notes.
- **FastAPI Model Serving Generator**: Generates a complete `main.py` microservice with Pydantic schema validation, health checks, latency logging, and `joblib` loading.

### 7. Audit & Reporting
- **Generate Audit Report**: Generates an auditable Markdown report containing project metadata, milestone statuses, and specific dataset findings.
- **Print / PDF**: Clean print stylesheet for compliance reviews and team documentation.

---

## 💻 How to Run

1. Open `index.html` directly in any web browser (Chrome, Edge, Firefox, Safari).
2. Alternatively, serve with a lightweight local web server:
   ```bash
   # Using Python:
   python -m http.server 8080

   # Or using Node:
   npx serve .
   ```
3. Navigate to `http://localhost:8080`.

