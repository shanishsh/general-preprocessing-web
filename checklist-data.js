// Checklist Data Definition for Production-grade Machine Learning Workflow
const ML_WORKFLOW_DATA = {
  meta: {
    title: "Production-grade Machine Learning Workflow: Complete Checklist",
    subtitle: "A reproducible, leakage-free, tested, deployable, and maintainable ML pipeline system",
    version: "2.0.0"
  },
  
  // Quick Project Master Tracker Items (from Section: "Your complete ML project checklist")
  masterTracker: [
    {
      group: "Problem and data",
      id: "mt-1",
      phaseId: "phase1",
      title: "Define problem, target, prediction time, and success metrics",
      desc: "Identify business problem, ML task type, target column, prediction horizon, success criteria, and baseline."
    },
    {
      group: "Problem and data",
      id: "mt-2",
      phaseId: "phase1",
      title: "Collect data and version the source",
      desc: "Record data source, schema, primary key, observation period, freshness, permissions, and refresh schedule."
    },
    {
      group: "Problem and data",
      id: "mt-3",
      phaseId: "phase1",
      title: "Validate schema, permissions, and data quality rules",
      desc: "Ensure required columns exist, IDs/dates follow formats, numeric bounds hold, and quarantine rules are defined."
    },
    {
      group: "EDA",
      id: "mt-4",
      phaseId: "phase2",
      title: "Inspect shape, schema, types, and sample rows",
      desc: "Count rows/cols, inspect head/tail/random samples, verify dtypes, nullable fields, and metadata."
    },
    {
      group: "EDA",
      id: "mt-5",
      phaseId: "phase2",
      title: "Analyze missingness, duplicates, and invalid values",
      desc: "Compute missingness rates, check primary key uniqueness, uncover impossible domain values and format inconsistencies."
    },
    {
      group: "EDA",
      id: "mt-6",
      phaseId: "phase2",
      title: "Analyze distributions and categorical frequencies",
      desc: "Inspect 5-number summaries, skewness, outliers, rare categories, and target distribution/imbalance."
    },
    {
      group: "EDA",
      id: "mt-7",
      phaseId: "phase2",
      title: "Explore feature–target relationships and correlations",
      desc: "Assess predictive power, correlation heatmaps, feature interactions, and multicollinearity."
    },
    {
      group: "EDA",
      id: "mt-8",
      phaseId: "phase2",
      title: "Check outliers, rare categories, and class imbalance",
      desc: "Examine whether extreme values or low-frequency groups are genuine or erroneous, assess class ratios."
    },
    {
      group: "EDA",
      id: "mt-9",
      phaseId: "phase2",
      title: "Investigate leakage, temporal patterns, and representativeness",
      desc: "Ensure no future or target-derived information; inspect trends, seasonality, population drift, and subgroup bias."
    },
    {
      group: "EDA",
      id: "mt-10",
      phaseId: "phase2",
      title: "Document EDA findings and decisions",
      desc: "Record anomalies, hypotheses, transformations justified by the data, and downstream preprocessing actions."
    },
    {
      group: "Data preparation",
      id: "mt-11",
      phaseId: "phase3",
      title: "Choose the correct train/validation/test splitting strategy",
      desc: "Select random, stratified, chronological, or group-based splits. Respect independence boundaries and save random seeds."
    },
    {
      group: "Data preparation",
      id: "mt-12",
      phaseId: "phase4",
      title: "Clean inconsistent types, values, and duplicates",
      desc: "Cast string dates/numerics, standardize text casing/units, remove invalid duplicate entries."
    },
    {
      group: "Data preparation",
      id: "mt-13",
      phaseId: "phase4",
      title: "Handle missing values using a justified strategy",
      desc: "Apply mean/median/mode, constant, or indicator imputation fitted ONLY on training data; document why."
    },
    {
      group: "Data preparation",
      id: "mt-14",
      phaseId: "phase4",
      title: "Encode categorical variables",
      desc: "One-hot encode nominal features with handle_unknown='ignore', ordinal encode ordered features, or target-encode without leakage."
    },
    {
      group: "Data preparation",
      id: "mt-15",
      phaseId: "phase4",
      title: "Scale or transform numerical features if needed",
      desc: "Use StandardScaler, RobustScaler, or MinMaxScaler if the algorithm is scale-sensitive; fit only on train."
    },
    {
      group: "Data preparation",
      id: "mt-16",
      phaseId: "phase4",
      title: "Handle dates, text, or time series where relevant",
      desc: "Extract calendar features, lagged values, rolling stats, or text embeddings without accessing future information."
    },
    {
      group: "Data preparation",
      id: "mt-17",
      phaseId: "phase4",
      title: "Handle outliers and imbalanced classes if justified",
      desc: "Clip extreme values if error-prone; consider class weights, focal loss, or training-fold-only resampling if warranted."
    },
    {
      group: "Data preparation",
      id: "mt-18",
      phaseId: "phase5",
      title: "Create leakage-safe feature engineering and selection steps",
      desc: "Engineer ratios, domain interactions, or aggregations available at prediction time; eliminate zero-variance or redundant features."
    },
    {
      group: "Data preparation",
      id: "mt-19",
      phaseId: "phase4",
      title: "Build a reusable preprocessing pipeline",
      desc: "Encapsulate transformations into scikit-learn ColumnTransformer and Pipeline to guarantee train-serving consistency."
    },
    {
      group: "Training and evaluation",
      id: "mt-20",
      phaseId: "phase6",
      title: "Establish a baseline model",
      desc: "Implement a naive heuristic (mean, median, most frequent class, or lag-1) as the minimum benchmark."
    },
    {
      group: "Training and evaluation",
      id: "mt-21",
      phaseId: "phase6",
      title: "Train and compare suitable algorithms",
      desc: "Fit linear, tree-based, boosting, or deep models through the pipeline; record training time and cross-validation scores."
    },
    {
      group: "Training and evaluation",
      id: "mt-22",
      phaseId: "phase6",
      title: "Tune hyperparameters using training-only validation",
      desc: "Run Grid/Random/Bayesian search strictly across training folds with early stopping where applicable."
    },
    {
      group: "Training and evaluation",
      id: "mt-23",
      phaseId: "phase7",
      title: "Evaluate the selected pipeline on untouched test data",
      desc: "Score final frozen model once on holdout test set using business-aligned metrics (MAE, RMSE, ROC-AUC, PR-AUC, F1)."
    },
    {
      group: "Training and evaluation",
      id: "mt-24",
      phaseId: "phase7",
      title: "Check subgroup performance, errors, and robustness",
      desc: "Inspect confusion matrix, residual plots, calibration curves, slice fairness, and worst-case predictions."
    },
    {
      group: "Training and evaluation",
      id: "mt-25",
      phaseId: "phase6",
      title: "Record metrics, parameters, and experiment versions",
      desc: "Log artifacts, dataset hashes, commit SHA, hyperparams, and validation curves in an experiment registry."
    },
    {
      group: "Production",
      id: "mt-26",
      phaseId: "phase8",
      title: "Save the full fitted pipeline and model artifact",
      desc: "Serialize preprocessing and model together (e.g. joblib/onnx); record artifact checksum and version."
    },
    {
      group: "Production",
      id: "mt-27",
      phaseId: "phase8",
      title: "Validate prediction inputs and outputs",
      desc: "Define Pydantic schema validation for API request bodies and enforce strict response structures."
    },
    {
      group: "Production",
      id: "mt-28",
      phaseId: "phase8",
      title: "Write unit, integration, and pipeline tests",
      desc: "Verify preprocessing determinism, schema rejections, prediction boundary behaviors, and mock inference."
    },
    {
      group: "Production",
      id: "mt-29",
      phaseId: "phase8",
      title: "Package dependencies and configure the deployment",
      desc: "Pin requirements.txt, build Docker image, set environment variables, and configure container health checks."
    },
    {
      group: "Production",
      id: "mt-30",
      phaseId: "phase8",
      title: "Deploy the prediction service",
      desc: "Expose FastAPI inference endpoints with structured error handling, request IDs, and latency instrumentation."
    },
    {
      group: "Production",
      id: "mt-31",
      phaseId: "phase9",
      title: "Monitor quality, latency, drift, and model performance",
      desc: "Implement telemetry for missingness drift, prediction distribution shifts, latency spikes, and ground-truth metrics."
    },
    {
      group: "Production",
      id: "mt-32",
      phaseId: "phase9",
      title: "Define retraining, release validation, and rollback",
      desc: "Establish automated retraining triggers, shadow/canary evaluation criteria, and one-click rollback procedures."
    }
  ],

  // 31-Item EDA Tracker (Section 2.1)
  edaTracker: [
    {
      category: "A. Initial inspection",
      id: "eda-1",
      name: "Load the dataset",
      desc: "Verify that the file, query, or data source loaded successfully without silent row truncation or encoding issues."
    },
    {
      category: "A. Initial inspection",
      id: "eda-2",
      name: "Inspect shape",
      desc: "Count rows and columns; compare with expected data volume and storage benchmarks."
    },
    {
      category: "A. Initial inspection",
      id: "eda-3",
      name: "Inspect sample records",
      desc: "Review head, tail, and random samples to catch formatting anomalies, delimiters, or shifted columns."
    },
    {
      category: "A. Initial inspection",
      id: "eda-4",
      name: "Inspect schema",
      desc: "Check column names, data types, nullable fields, and expected schema specifications."
    },
    {
      category: "A. Initial inspection",
      id: "eda-5",
      name: "Inspect metadata",
      desc: "Check source, extraction timestamp, dataset version, licensing, and date coverage intervals."
    },

    {
      category: "B. Data quality analysis",
      id: "eda-6",
      name: "Missing-value analysis",
      desc: "Count missing values and calculate percentages per column; identify patterns of missingness."
    },
    {
      category: "B. Data quality analysis",
      id: "eda-7",
      name: "Duplicate analysis",
      desc: "Check duplicate rows, primary keys, and duplicate entities across transactions."
    },
    {
      category: "B. Data quality analysis",
      id: "eda-8",
      name: "Invalid-value checks",
      desc: "Find impossible ages, negative prices, future dates, illegal codes, and corrupt strings."
    },
    {
      category: "B. Data quality analysis",
      id: "eda-9",
      name: "Inconsistent formatting",
      desc: "Inspect casing, extra whitespace, spelling variants, disparate units, and mixed date formats."
    },
    {
      category: "B. Data quality analysis",
      id: "eda-10",
      name: "Constant and near-constant columns",
      desc: "Identify zero-variance or near-zero variance columns that convey zero predictive signal."
    },
    {
      category: "B. Data quality analysis",
      id: "eda-11",
      name: "High-cardinality columns",
      desc: "Identify IDs, UUIDs, and free-text columns with too many unique categorical values."
    },
    {
      category: "B. Data quality analysis",
      id: "eda-12",
      name: "Data-type mismatch",
      desc: "Find numbers stored as strings (e.g. '$12.50'), malformed dates, and mixed-type columns."
    },

    {
      category: "C. Univariate analysis",
      id: "eda-13",
      name: "Numerical distributions",
      desc: "Inspect mean, median, standard deviation, quartiles, minimum, and maximum for each numerical feature."
    },
    {
      category: "C. Univariate analysis",
      id: "eda-14",
      name: "Histograms and density plots",
      desc: "Understand skewness, multimodality, heavy tails, and distribution shapes (Gaussian vs non-Gaussian)."
    },
    {
      category: "C. Univariate analysis",
      id: "eda-15",
      name: "Box plots",
      desc: "Identify extreme values, interquartile ranges, and candidate outliers requiring domain investigation."
    },
    {
      category: "C. Univariate analysis",
      id: "eda-16",
      name: "Categorical frequencies",
      desc: "Count occurrences per category and inspect rare, long-tail, or unexpected classes."
    },
    {
      category: "C. Univariate analysis",
      id: "eda-17",
      name: "Target distribution",
      desc: "Check class imbalance ratios for classification or range, skewness, and zeros for regression."
    },
    {
      category: "C. Univariate analysis",
      id: "eda-18",
      name: "Text and date profiling",
      desc: "Inspect string length statistics, empty strings, date ranges, and time interval gaps where relevant."
    },

    {
      category: "D. Bivariate and multivariate analysis",
      id: "eda-19",
      name: "Feature–target relationships",
      desc: "Compare predictors with target variable using scatter plots, box plots by category, and ANOVA / mutual information."
    },
    {
      category: "D. Bivariate and multivariate analysis",
      id: "eda-20",
      name: "Numerical correlations",
      desc: "Inspect linear relationships using Pearson / Spearman correlation heatmaps (correlation != causation)."
    },
    {
      category: "D. Bivariate and multivariate analysis",
      id: "eda-21",
      name: "Categorical–target relationships",
      desc: "Compare target event rates or target medians across category groups using grouped bar plots."
    },
    {
      category: "D. Bivariate and multivariate analysis",
      id: "eda-22",
      name: "Feature interactions",
      desc: "Check whether combinations of features (e.g. income * debt, age / experience) may be strongly predictive."
    },
    {
      category: "D. Bivariate and multivariate analysis",
      id: "eda-23",
      name: "Multicollinearity",
      desc: "Investigate strongly collinear predictors using VIF (Variance Inflation Factor) or pair correlations."
    },
    {
      category: "D. Bivariate and multivariate analysis",
      id: "eda-24",
      name: "Segment analysis",
      desc: "Compare data quality and target behavior across meaningful business cohorts (e.g. region, device, tenure)."
    },

    {
      category: "E. Advanced and production-focused EDA",
      id: "eda-25",
      name: "Data leakage investigation",
      desc: "Check whether any feature contains future information, post-event signals, or target-derived calculations."
    },
    {
      category: "E. Advanced and production-focused EDA",
      id: "eda-26",
      name: "Temporal analysis",
      desc: "Examine trends, seasonality, seasonal gaps, timestamp chronological order, and label acquisition latency."
    },
    {
      category: "E. Advanced and production-focused EDA",
      id: "eda-27",
      name: "Train-serving differences",
      desc: "Compare historical training data schema and latency with features that live APIs will actually receive at runtime."
    },
    {
      category: "E. Advanced and production-focused EDA",
      id: "eda-28",
      name: "Distribution shifts",
      desc: "Compare feature distributions across time periods, data providers, operating systems, or geographic cohorts."
    },
    {
      category: "E. Advanced and production-focused EDA",
      id: "eda-29",
      name: "Sampling and representativeness",
      desc: "Determine if dataset reflects the true live operational population (e.g. survivor bias, voluntary survey bias)."
    },
    {
      category: "E. Advanced and production-focused EDA",
      id: "eda-30",
      name: "Bias and subgroup checks",
      desc: "Measure data coverage, representation parity, and model-relevant differences across sensitive or demographic groups."
    },
    {
      category: "E. Advanced and production-focused EDA",
      id: "eda-31",
      name: "Document EDA findings",
      desc: "Record decisions, anomalies, plots, preprocessing actions, and hypotheses into an engineering report."
    }
  ],

  // 24-Item Production Preprocessing Sign-Off Tracker (Phase 12)
  preprocessingTracker: [
    // Data validation
    {
      category: "Data validation",
      id: "prep-1",
      name: "Raw data is preserved and versioned",
      desc: "Store immutable raw extraction copies; record extraction timestamp, database version, or API query parameters."
    },
    {
      category: "Data validation",
      id: "prep-2",
      name: "Schema and required columns are validated",
      desc: "Verify required columns exist, column names are unique, and reject incompatible schemas immediately."
    },
    {
      category: "Data validation",
      id: "prep-3",
      name: "Missingness, duplicates and data types are profiled",
      desc: "Compute missing rates, check exact duplicate rows and business keys, and uncover stored-as-text numbers/dates."
    },
    {
      category: "Data validation",
      id: "prep-4",
      name: "Invalid values and known business rules are checked",
      desc: "Detect domain boundary violations (e.g. area <= 0, negative age, impossible dates); quarantine or reject."
    },
    {
      category: "Data validation",
      id: "prep-5",
      name: "Identifiers and target columns are handled correctly",
      desc: "Separate primary keys/IDs from predictors; isolate target labels and check units and expected class sets."
    },

    // Cleaning and transformations
    {
      category: "Cleaning and transformations",
      id: "prep-6",
      name: "Missing-value strategy is documented",
      desc: "Document justification for mean, median, mode, constant, or indicator imputation; fit strictly on training data."
    },
    {
      category: "Cleaning and transformations",
      id: "prep-7",
      name: "Duplicate handling is justified",
      desc: "Differentiate between accidental row repetitions (dropped) and genuine repeated transactions/measurements (preserved)."
    },
    {
      category: "Cleaning and transformations",
      id: "prep-8",
      name: "Outlier treatment is justified or explicitly unnecessary",
      desc: "Screen with IQR/domain bounds; clip or use robust models only when justified; avoid deleting genuine rare events."
    },
    {
      category: "Cleaning and transformations",
      id: "prep-9",
      name: "Numeric transformations and scaling are selected appropriately",
      desc: "Select StandardScaler, RobustScaler, MinMaxScaler, or unscaled trees based on algorithm sensitivity; fit on train only."
    },
    {
      category: "Cleaning and transformations",
      id: "prep-10",
      name: "Categorical encoding handles expected unseen values",
      desc: "Configure OneHotEncoder(handle_unknown='ignore') or safe ordinal/target encoding schemes with unknown fallbacks."
    },
    {
      category: "Cleaning and transformations",
      id: "prep-11",
      name: "Date, text or special-data processing is consistent",
      desc: "Extract calendar features, lags, or embeddings without using post-event or future information."
    },
    {
      category: "Cleaning and transformations",
      id: "prep-12",
      name: "Feature engineering uses only available information",
      desc: "Verify derived ratios, aggregations, and interactions rely strictly on features available at prediction time."
    },

    // Leakage prevention
    {
      category: "Leakage prevention",
      id: "prep-13",
      name: "Split strategy matches the data and intended use",
      desc: "Select random for independent records, stratified for imbalanced, chronological for time series, or group-based for entities."
    },
    {
      category: "Leakage prevention",
      id: "prep-14",
      name: "Data-dependent transformers are fitted only on training data",
      desc: "Imputers, scalers, encoders, and outlier caps learn parameters strictly from training partitions."
    },
    {
      category: "Leakage prevention",
      id: "prep-15",
      name: "Cross-validation refits transformations within each fold",
      desc: "Ensure all feature selection, imputation, and scaling steps execute inside cross-validation fold loops."
    },
    {
      category: "Leakage prevention",
      id: "prep-16",
      name: "Target encoding and feature selection are leakage-safe",
      desc: "Employ out-of-fold target encoding; rank and select features strictly on training folds."
    },
    {
      category: "Leakage prevention",
      id: "prep-17",
      name: "Resampling is restricted to training folds",
      desc: "Never apply SMOTE, oversampling, or undersampling on validation/test sets or before making the initial split."
    },
    {
      category: "Leakage prevention",
      id: "prep-18",
      name: "Final test data remains untouched during selection",
      desc: "Freeze holdout test set completely until final pipeline evaluation; never tune hyperparameters on test."
    },

    // Production readiness
    {
      category: "Production readiness",
      id: "prep-19",
      name: "Training and inference use the same fitted pipeline",
      desc: "Bundle ColumnTransformer with model estimator into a single unified scikit-learn Pipeline artifact."
    },
    {
      category: "Production readiness",
      id: "prep-20",
      name: "Input schema and prediction outputs are tested",
      desc: "Test handling of missing columns, unseen categories, malformed inputs, and verify API output consistency."
    },
    {
      category: "Production readiness",
      id: "prep-21",
      name: "Artifacts and dependencies are versioned",
      desc: "Serialize pipeline via joblib; pin requirements.txt dependencies and record container checksum."
    },
    {
      category: "Production readiness",
      id: "prep-22",
      name: "Pipeline has error handling and useful logging",
      desc: "Instrument structured logging with timestamps, latency metrics, input payload shapes, and clear exception traces."
    },
    {
      category: "Production readiness",
      id: "prep-23",
      name: "Data quality and preprocessing failures are monitored",
      desc: "Alert on missing-value spikes, unexpected category rates, schema rejections, and numerical feature drift."
    },
    {
      category: "Production readiness",
      id: "prep-24",
      name: "Model release, retraining and rollback procedures are defined",
      desc: "Establish shadow deployment gates, performance benchmarks, and automated one-click rollback procedures."
    }
  ],

  // Detailed Phases Data
  phases: [
    {
      id: "phase1",
      number: "1",
      title: "Problem definition and data understanding",
      icon: "bullseye",
      summary: "Translate business requirements into a rigorously scoped, evaluable ML task and audit raw data provenance.",
      items: [
        {
          id: "p1-1",
          title: "1. Define the ML problem",
          tags: ["Scoping", "Metrics"],
          details: [
            "Identify the business problem and the measurable objective.",
            "Decide task type: Regression, Binary/Multiclass Classification, Clustering, Forecasting, Ranking, or Anomaly Detection.",
            "Define the target variable clearly, including the exact timestamp when predictions will be requested.",
            "Define success criteria (e.g., reduce false positives by 20%, maintain inference latency under 50ms) and acceptable error margins.",
            "Choose primary metric (e.g., PR-AUC, RMSE) and secondary operational metrics (e.g., latency, recall at 99% precision).",
            "Establish a simple baseline for comparison (dummy classifier, historical average, business heuristic rule)."
          ],
          why: "A technically perfect model that predicts the wrong entity or evaluates on irrelevant metrics fails in production.",
          when: "At the inception of any ML initiative, before writing any data pipeline code."
        },
        {
          id: "p1-2",
          title: "2. Understand the data source",
          tags: ["Governance", "Lineage"],
          details: [
            "Identify origin: CSV, Relational DB (Postgres/MySQL), REST API, Kafka event stream, or Data Warehouse (BigQuery/Snowflake).",
            "Record the full schema, column semantics, measurement units (e.g. USD vs Cents, meters vs feet), and native types.",
            "Identify the primary key and the entity represented by each row (e.g., 1 row = 1 user, 1 row = 1 session, 1 row = 1 transaction).",
            "Determine the observation window and data freshness (batch sync lag vs real-time).",
            "Verify compliance: licensing, GDPR/CCPA privacy, PII scrubbing requirements, and data retention limits.",
            "Establish update frequency: how often will live data refresh in production serving?"
          ],
          why: "Prevents pipeline breaks caused by upstream schema changes, unit mismatches, or legal/privacy violations.",
          when: "During initial data ingestion setup."
        },
        {
          id: "p1-3",
          title: "3. Define data quality rules",
          tags: ["Validation", "Contracts"],
          details: [
            "Required columns must exist with zero unhandled nulls.",
            "Entity IDs must match strict regex patterns (e.g. UUIDv4, prefixed keys).",
            "Values must conform to type boundaries and valid units.",
            "Dates must follow an ISO standard (e.g. UTC ISO 8601 YYYY-MM-DDTHH:MM:SSZ).",
            "Numeric values must satisfy domain constraints (e.g. Age: 0-120, Price >= 0).",
            "Target labels must follow verified business logic without ambiguity.",
            "Define error policy: specify how malformed rows are handled (reject request, route to quarantine dead-letter queue, or apply default imputation)."
          ],
          why: "Garbage in guarantees garbage out; programmatic contracts protect training and serving integrity.",
          when: "Prior to ingesting data into exploration and preprocessing pipelines."
        }
      ]
    },

    {
      id: "phase2",
      number: "2",
      title: "Exploratory Data Analysis (EDA)",
      icon: "search",
      summary: "Understand distributions, anomalies, relationships, and potential leakage before touching code transformations.",
      tableData: {
        title: "2.2 Which EDA analyses should be used?",
        headers: ["Analysis", "When to use it", "Typical tools"],
        rows: [
          ["Missingness", "Almost every tabular dataset", "isna(), missingness summaries, missingno"],
          ["Duplicate checks", "Entity, transaction, or record datasets", "duplicated(), key uniqueness tests"],
          ["Histograms and box plots", "Numerical features", "Matplotlib, Seaborn, Plotly"],
          ["Frequency counts", "Categorical features", "value_counts(), bar charts"],
          ["Correlation analysis", "Numerical predictors and suitable targets", "corr(), heatmaps, Spearman rank"],
          ["Class imbalance", "Classification problems", "Class counts, proportions, minority ratio"],
          ["Outlier analysis", "Numerical data where extreme values matter", "IQR, Z-score, domain limits"],
          ["Time-series plots", "Time-dependent problems", "Line plots, rolling means, temporal summaries"],
          ["Drift analysis", "Existing model or changing data source", "Distribution comparisons, KS-test, PSI"],
          ["Subgroup analysis", "High-impact or heterogeneous populations", "Grouped metrics and slice summaries"]
        ],
        cautionNote: "Important: Do not automatically remove a column just because it is highly correlated with another feature. Do not automatically remove outliers or impute every missing value. Investigate why the issue exists and whether it affects the intended prediction."
      },
      items: [
        {
          id: "p2-1",
          title: "Initial Inspection & Data Profiling",
          tags: ["Inspection"],
          details: [
            "Verify complete load of files/queries; verify row and column counts against upstream tables.",
            "Review random sample rows alongside head and tail to catch shifted columns or truncation.",
            "Audit data types: distinguish categorical, numerical, boolean, timestamps, and unstructured text.",
            "Check metadata: extraction timestamp, dataset version, and time coverage."
          ],
          why: "Catches silent ingestion failures, corrupt parsing, and version mismatches before analysis begins.",
          when: "Step 1 of all EDA workflows."
        },
        {
          id: "p2-2",
          title: "Data Quality & Anomaly Discovery",
          tags: ["Quality", "Anomalies"],
          details: [
            "Calculate null percentages per feature; identify whether missingness is random (MCAR/MAR) or systematic (MNAR).",
            "Detect duplicates across full rows and business keys; check whether duplicates represent repeat transactions or errors.",
            "Spot impossible domain values: negative transaction amounts, birthdates in the future, invalid category codes.",
            "Identify zero-variance (constant) or near-zero-variance features to prune.",
            "Detect high-cardinality features (e.g. user_id, raw addresses) that cannot be directly one-hot encoded."
          ],
          why: "Bad values skew parameters and break inference; discovering them early informs preprocessing choices.",
          when: "After basic shape confirmation."
        },
        {
          id: "p2-3",
          title: "Univariate & Multivariate Analysis",
          tags: ["Statistics", "Relationships"],
          details: [
            "Calculate summary stats: mean, median, standard deviation, IQR, skewness, and kurtosis.",
            "Plot histograms and boxplots to visualize multimodal distributions, heavy tails, and extreme outliers.",
            "Profile target variable: check class imbalance ratio (e.g. 99:1 in fraud) or target skewness in regression.",
            "Plot feature vs target relationships (scatter plots, grouped boxplots, weight of evidence).",
            "Analyze correlation heatmaps and evaluate multicollinearity via VIF (Variance Inflation Factor).",
            "Perform slice analysis across key user segments, regions, or device types."
          ],
          why: "Reveals predictive signal, nonlinear patterns, and collinearity that will dictate model family selection.",
          when: "Prior to feature engineering and model selection."
        },
        {
          id: "p2-4",
          title: "Advanced & Production-Focused EDA",
          tags: ["Leakage", "Drift"],
          details: [
            "Investigate target leakage: are any features computed using post-event or future information?",
            "Temporal audit: check for time gaps, seasonality, trend changes, and label arrival delay.",
            "Compare training vs serving distribution: will live input data have identical fidelity and latency?",
            "Assess sampling representativeness and detect demographic or operational bias across subgroups.",
            "Document findings: produce an auditable log of data quirks and decisions."
          ],
          why: "Leakage creates false 99% test scores that crash in production; distribution shifts degrade models quietly.",
          when: "Final step of EDA before designing data splits."
        }
      ]
    },

    {
      id: "phase3",
      number: "3",
      title: "Data splitting and leakage prevention",
      icon: "columns",
      summary: "Lock down evaluation sets and cross-validation boundaries before fitting any statistical transformer.",
      tableData: {
        title: "3.1 Decide the splitting strategy",
        headers: ["Data/problem type", "Recommended approach"],
        rows: [
          ["Independent tabular observations", "Random train/test split"],
          ["Classification with imbalanced classes", "Stratified split, where appropriate"],
          ["Time-series forecasting", "Chronological split (TimeSeriesSplit / rolling-window)"],
          ["Multiple records per customer/patient/student", "Group-based split (GroupKFold) if records must not cross subsets"],
          ["Repeated measurements or multiple entities", "Group or time-based split, depending on deployment"],
          ["Very small dataset", "Cross-validation, possibly nested CV for model selection"],
          ["New users or new entities at inference", "Hold out appropriate unseen users or entities"]
        ]
      },
      leakageRule: "Leakage rule: Imputers, scalers, encoders, feature selectors, and other learned transformations must be fitted only on training data within each training fold. Validation and test data receive transformations from the fitted training pipeline. If you perform feature selection or target encoding, those operations must also respect cross-validation boundaries.",
      codeSnippet: `from sklearn.model_selection import train_test_split

# Separate predictors from target
X = df.drop(columns=["target"])
y = df["target"]

# For standard tabular data:
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y  # Use for imbalanced classification; omit for regression/unbalanced
)

# For time series: NEVER use random split! Use chronological index splitting:
# split_idx = int(len(df) * 0.8)
# X_train, X_test = X.iloc[:split_idx], X.iloc[split_idx:]
# y_train, y_test = y.iloc[:split_idx], y.iloc[split_idx:]`,
      items: [
        {
          id: "p3-1",
          title: "Select & Implement Splitting Strategy",
          tags: ["Validation", "Splits"],
          details: [
            "Separate features X from target y cleanly.",
            "Set aside a pristine holdout test set (typically 15-20%) that will NEVER be touched during exploratory fitting.",
            "Choose matching strategy: Stratified for imbalanced targets, Chronological for time series, GroupKFold for multi-record entities.",
            "Record exact random seed, split cutoff timestamps, and partition sizes for 100% reproducibility."
          ],
          why: "An incorrect splitting strategy creates over-optimistic evaluation metrics that fail to predict generalization.",
          when: "Before ANY fit() call on imputers, encoders, scalers, or models."
        },
        {
          id: "p3-2",
          title: "Enforce Cross-Validation & Leakage Boundaries",
          tags: ["Leakage Guard"],
          details: [
            "Never fit a transformer on full dataset before splitting.",
            "Verify all learned statistics (means, medians, category encodings, vocabulary, outlier bounds) come strictly from training folds.",
            "If using target encoding, ensure K-fold out-of-fold target calculation to prevent target feedback.",
            "Keep entity groups strictly within a single partition if the inference task evaluates generalization to unseen entities."
          ],
          why: "Data leakage is the #1 reason machine learning models fail when transitioning from notebook to production.",
          when: "When designing validation loops and pipelines."
        }
      ]
    },

    {
      id: "phase4",
      number: "4",
      title: "Data preprocessing: complete checklist",
      icon: "sliders",
      summary: "Convert raw, noisy inputs into valid, consistent, model-ready features encapsulated in reusable pipelines.",
      sections: [
        {
          name: "4.1 Schema validation and data cleaning",
          points: [
            {
              title: "1. Validate column names and schema",
              when: "At ingestion and every production batch or API request.",
              desc: "Verify required columns, data types, column names, and expected schema versions. Reject or quarantine incompatible input instead of silently accepting it."
            },
            {
              title: "2. Correct data types",
              when: "Numbers arrive as strings, dates are text, or categories have inconsistent types.",
              desc: "Convert to appropriate numeric, date/time, Boolean, categorical, or text representations. Define how parsing errors should be handled."
            },
            {
              title: "3. Remove duplicates",
              when: "Repeated records are invalid for the task.",
              desc: "Check both exact duplicate rows and duplicated business keys. Do not remove repeated transactions or repeated observations if they represent genuine events."
            },
            {
              title: "4. Fix inconsistent values",
              when: "Categories, units, dates, or text formatting vary for the same meaning.",
              desc: "Normalize whitespace, casing, unit conversions, and known spelling variants. Apply only mappings supported by business rules."
            },
            {
              title: "5. Handle invalid and impossible values",
              when: "Values violate domain constraints, such as a negative quantity that cannot be negative.",
              desc: "Investigate, correct from a trusted source, reject, or quarantine invalid records. Do not replace invalid values with arbitrary numbers."
            },
            {
              title: "6. Handle identifiers and unnecessary columns",
              when: "Columns contain database IDs, record numbers, irrelevant metadata, or duplicated information.",
              desc: "Drop identifiers from the predictors when they have no legitimate predictive meaning, but retain them separately when needed for joins, auditing, or tracking."
            }
          ]
        },
        {
          name: "4.2 Handle missing values",
          table: {
            title: "Missing-Value Handling Strategies",
            headers: ["Method", "When to use it", "Example"],
            rows: [
              ["Drop rows", "Very few records are incomplete and removal is safe", "Incomplete, nonessential records (<1% of data)"],
              ["Drop columns", "A feature is unusable or mostly missing with no reliable recovery strategy", "Mostly empty optional field (>70% null)"],
              ["Mean imputation", "Numerical feature with relatively suitable distribution and limited outlier sensitivity", "Sensor measurements (Gaussian-like)"],
              ["Median imputation", "Numerical feature with skew or outliers", "Income, housing prices, transaction amounts"],
              ["Most-frequent imputation", "Categorical feature with a useful common category", "Product category, device type"],
              ["Constant or missing-category imputation", "Missingness has meaning or a stable placeholder is suitable", "'Unknown', 'Not_Provided'"],
              ["Group-based imputation", "A defensible relationship exists within a group", "Typical value within a known product class / zip code"],
              ["Time-series imputation", "Missing observations occur in ordered measurements", "Forward fill (ffill) under valid temporal assumptions"],
              ["Model-based imputation", "Missingness is complex and the extra complexity is justified", "IterativeImputer (MICE), KNNImputer"],
              ["Missingness indicator", "The fact that a value is missing may be predictive", "Optional medical, survey, or transaction field (MissingIndicator)"]
            ]
          },
          productionNotes: [
            "Measure missingness per feature and per data source.",
            "Determine whether missingness is random (MCAR/MAR) or systematic (MNAR).",
            "Preserve legitimate missing values where appropriate.",
            "Fit statistical imputers on training data only.",
            "Define fallback behavior for entirely missing columns in incoming production requests.",
            "Avoid future observations when imputing historical time-series records."
          ]
        },
        {
          name: "4.3 Handle numerical features",
          table: {
            title: "Numerical Feature Operations",
            headers: ["Operation", "When to use it", "Common tools"],
            rows: [
              ["Scaling / standardization", "Features have different scales and the algorithm is scale-sensitive", "StandardScaler (z-score: mean=0, std=1)"],
              ["Min-max normalization", "Values need a bounded training range (e.g. neural nets, images)", "MinMaxScaler (e.g. 0 to 1)"],
              ["Robust scaling", "Extreme values distort ordinary scaling statistics", "RobustScaler (median & IQR)"],
              ["Log transformation", "Positive values are strongly right-skewed and a log scale is appropriate", "np.log1p (log(1 + x))"],
              ["Power transformation", "Skewed numerical features need a learned transformation toward normality", "PowerTransformer (Box-Cox, Yeo-Johnson)"],
              ["Quantile transformation", "A distribution-shaping transform is justified and its effects are acceptable", "QuantileTransformer"],
              ["Binning / discretization", "Threshold bands have domain meaning or improve a specific model", "KBinsDiscretizer"],
              ["Outlier treatment", "Verified extreme values cause problems for the chosen method", "Clipping / winsorizing, robust methods, domain rules"],
              ["Precision & unit normalization", "Numeric formats or units differ between sources", "Explicit conversion rules (cents to dollars, kg to lbs)"]
            ]
          },
          scalingGuide: [
            "StandardScaler: centers around training mean and divides by standard deviation (sensitive to extreme outliers).",
            "MinMaxScaler: maps training values to specified range [0, 1] (outliers compress non-outlier data).",
            "RobustScaler: subtracts median and divides by IQR; robust against extreme outliers.",
            "No scaling: appropriate for decision trees, Random Forests, XGBoost, LightGBM, and CatBoost.",
            "Rule: Do not automatically apply all three scalers. Select one based on algorithm and feature properties."
          ],
          outlierSteps: [
            "1. Identify suspicious observations through EDA (box plots, IQR, domain bounds).",
            "2. Check whether they are data errors or genuine rare cases.",
            "3. Correct verified errors using a trusted source.",
            "4. Consider clipping (winsorizing), robust scaling, or robust loss functions if justified.",
            "5. Compare model validation performance with and without the treatment.",
            "6. Apply the exact learned training thresholds at inference time (never refit on test!)."
          ]
        },
        {
          name: "4.4 Handle categorical features",
          table: {
            title: "Categorical Encoding Operations",
            headers: ["Operation", "When to use it", "Common tools"],
            rows: [
              ["One-hot encoding", "Nominal categories without natural order (low-to-medium cardinality)", "OneHotEncoder(handle_unknown='ignore')"],
              ["Ordinal encoding", "Categories possess a genuine inherent order (Low < Med < High)", "OrdinalEncoder(categories=[['low','med','high']])"],
              ["Rare-category grouping", "Many categories occur only a few times; long tail", "Explicit mapping or min_frequency in OneHotEncoder"],
              ["Unknown-category handling", "Production may receive unseen categories at inference", "handle_unknown='ignore' or default 'Other' bin"],
              ["Frequency encoding", "High-cardinality categories where popularity conveys signal", "Custom transformer (value counts proportion)"],
              ["Target encoding", "High-cardinality categories where label info is useful", "TargetEncoder (with cross-validation smoothing)"],
              ["Hashing", "Very high-cardinality or streaming categories with fixed memory budget", "FeatureHasher"],
              ["Category normalization", "Equivalent categories use different spellings or casing", "Explicit mapping ('USA', 'U.S.A.', 'United States')"]
            ]
          },
          distinctions: [
            "Do not assign arbitrary ordinal integers (1, 2, 3...) to unordered categories (e.g. Red=1, Blue=2, Green=3). Linear models and distance metrics will infer a false mathematical order.",
            "Always configure an unknown-category strategy so inference does not crash on brand-new categories.",
            "Fit one-hot and ordinal encoders on training data only.",
            "Target encoding must use smoothing and out-of-fold calculation to prevent catastrophic target leakage.",
            "Never one-hot encode unique identifiers (like user_id or transaction_id) simply because they are stored as strings."
          ]
        },
        {
          name: "4.5 Handle dates, text, and specialized data",
          table: {
            title: "Specialized Data Types",
            headers: ["Data type / issue", "Steps to consider", "When"],
            rows: [
              ["Date/time", "Parse timestamps, standardize to UTC, extract calendar features (day of week, hour, is_weekend, elapsed days)", "Time-related signals are relevant"],
              ["Time series", "Sort chronologically, check cadence/gaps, engineer lag features (t-1, t-7) and rolling statistics (7d mean, 30d std)", "Forecasting or sequential prediction"],
              ["Free text", "Normalize casing, strip HTML, tokenize, TF-IDF or transformer embeddings (Sentence-Transformers)", "Text classification, search, NLP"],
              ["Images", "Validate files, decode formats, resize/crop, normalize pixel range [0, 1], augment training data", "Computer vision"],
              ["Audio", "Validate sampling rate, resample, spectrograms / MFCCs or audio embeddings", "Audio ML"],
              ["Geospatial", "Validate coordinates (lat/long limits), calculate Haversine distance, geospatial clustering (H3, S2)", "Location-related predictions"],
              ["Structured JSON", "Validate schema, unpack nested keys, extract scalar features or flag presence of fields", "API payloads and event logs"]
            ]
          },
          temporalRule: "Production rule for temporal features: Ensure every derived feature uses only information that was available at the exact prediction timestamp. Rolling averages, lag features, and text embeddings must never peek into future records."
        },
        {
          name: "4.6 Class imbalance and label preparation",
          pointsList: [
            "Verify label definitions and audit label quality with domain experts.",
            "Calculate class counts and class proportions (e.g. 98% negative, 2% positive).",
            "Investigate whether minority instances are genuinely rare or under-reported.",
            "Consider class weights (e.g. class_weight='balanced') or cost-sensitive learning as the first-line defense.",
            "Consider random over/undersampling or SMOTE only if empirically justified.",
            "CRITICAL: Apply resampling exclusively to training data, strictly inside the cross-validation fold pipeline (never resample validation or test sets!).",
            "Use stratified splits (StratifiedKFold) to preserve minority class ratios across folds.",
            "Evaluate using Precision-Recall AUC (PR-AUC), F1-score, and cost-utility threshold optimization rather than accuracy or standard ROC-AUC.",
            "Warning: Do not automatically rebalance every dataset. Models often need to output calibrated real-world probabilities, which artificial balancing can distort."
          ]
        },
        {
          name: "4.7 Build the preprocessing pipeline",
          desc: "Instead of manually transforming training and test sets separately, encapsulate transformations into scikit-learn's ColumnTransformer and Pipeline.",
          pipelineCode: `from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.linear_model import LogisticRegression

# Define numerical and categorical sub-pipelines
numeric_pipeline = Pipeline([
    ("imputer", SimpleImputer(strategy="median")),
    ("scaler", StandardScaler()),
])

categorical_pipeline = Pipeline([
    ("imputer", SimpleImputer(strategy="most_frequent")),
    ("encoder", OneHotEncoder(handle_unknown="ignore", sparse_output=False)),
])

# Combine with ColumnTransformer
preprocessor = ColumnTransformer(
    transformers=[
        ("numeric", numeric_pipeline, numeric_columns),
        ("categorical", categorical_pipeline, categorical_columns)
    ],
    remainder="drop" # Drop unlisted columns (IDs, raw text, etc.)
)

# Full reproducible end-to-end model pipeline
model_pipeline = Pipeline([
    ("preprocessing", preprocessor),
    ("model", LogisticRegression(max_iter=1000, random_state=42))
])

# Fit ONLY on training data; evaluate cleanly on test
model_pipeline.fit(X_train, y_train)`
        }
      ]
    },

    {
      id: "phase5",
      number: "5",
      title: "Feature engineering and feature selection",
      icon: "magic",
      summary: "Transform raw inputs into high-signal representations and prune noisy, uninformative predictors.",
      tableData: {
        title: "5.1 Feature engineering checklist",
        headers: ["Step", "What to do", "When to use it"],
        rows: [
          ["Create derived features", "Calculate useful values from existing columns (e.g. total_cost = quantity * unit_price)", "Business logic provides meaningful relationships"],
          ["Date/time features", "Extract day, month, hour, duration, season, is_weekend, holiday flag", "Time patterns matter"],
          ["Interaction features", "Combine two or more predictors (e.g. debt / income, length * width)", "Relationships depend on combinations of variables"],
          ["Polynomial features", "Add powers and interactions (x1^2, x1*x2)", "Nonlinear patterns may help linear or logistic models"],
          ["Ratios and rates", "Calculate proportions, costs per unit, growth rates, conversion rates", "Relative quantities matter more than raw totals"],
          ["Aggregations", "Calculate historical counts, averages, sums per entity (e.g. customer 30d spend)", "Transaction or event history is available"],
          ["Lag features", "Include previous observations (y_t-1, y_t-7)", "Time-series prediction"],
          ["Rolling statistics", "Calculate moving averages, rolling min, max, std dev", "Temporal volatility or momentum matters"],
          ["Text features", "Word counts, character length, TF-IDF weights, sentiment, embeddings", "Text contributes to the prediction"],
          ["Domain-specific features", "Encode established subject-matter formulas (e.g. BMI, debt-to-income)", "Business or scientific context supports them"]
        ]
      },
      engineeringRule: "Production rule: Every feature must be computable from information available at the actual prediction time. Aggregations, target-derived statistics, and lag features require special care to avoid temporal and target leakage.",
      selectionPoints: [
        "Remove constant (zero-variance) and near-constant features that provide no discriminatory information.",
        "Remove duplicated columns and redundant metadata identifiers.",
        "Use domain expertise to exclude unavailable or irrelevant features upfront.",
        "Use correlation matrices and VIF to prune multicollinear predictors (essential for linear/logistic models).",
        "Evaluate Mutual Information or ANOVA F-tests to rank nonlinear feature relevance.",
        "Use L1 (Lasso) regularization or tree-based feature importance for automated sparse selection.",
        "Use Recursive Feature Elimination (RFE) only if the extra computational training cost is justified.",
        "Golden rule: Always validate feature selection inside cross-validation loops to prevent selection leakage!"
      ]
    },

    {
      id: "phase6",
      number: "6",
      title: "Model training and selection",
      icon: "cpu",
      summary: "Establish a baseline benchmark, train candidate algorithms with leak-free CV, and optimize hyperparameters.",
      candidateTable: {
        title: "6.2 Candidate models by problem type",
        headers: ["Problem", "Starting candidates"],
        rows: [
          ["Regression", "Linear Regression, Ridge, Lasso, ElasticNet, DecisionTreeRegressor, RandomForestRegressor, GradientBoostingRegressor"],
          ["Classification", "Logistic Regression, Decision Tree, Random Forest, LightGBM, XGBoost, CatBoost"],
          ["Tabular nonlinear data", "Random Forest, Gradient Boosting (LightGBM / XGBoost / CatBoost)"],
          ["Large-scale tabular data", "LightGBM, CatBoost, HistGradientBoostingClassifier"],
          ["Text classification", "TF-IDF + LogisticRegression / LinearSVC, followed by Transformer fine-tuning (DistilBERT) if justified"],
          ["Forecasting", "Naive lag baseline, Exponential Smoothing, ARIMA/SARIMA, Prophet, LightGBM with lag/rolling features"],
          ["Clustering", "K-Means, DBSCAN, HDBSCAN, Hierarchical Clustering (Agglomerative)"]
        ]
      },
      baselinePoints: [
        "Regression baseline: Predict training target mean or median (DummyRegressor).",
        "Classification baseline: Predict most frequent class or stratified random class (DummyClassifier).",
        "Time series baseline: Naive forecast (predict last observed value y_{t-1}).",
        "Core rule: A complex model MUST demonstrate significant, measurable improvement over the baseline to justify production operational complexity."
      ],
      trainingSteps: [
        "1. Define the full preprocessing + model pipeline (preventing leakage).",
        "2. Train candidate models using training fold data.",
        "3. Evaluate using rigorous cross-validation (K-Fold, Stratified, or TimeSeriesSplit).",
        "4. Record validation metrics, training duration, and inference latency.",
        "5. Compare candidates against baseline and against each other.",
        "6. Check slice performance across key business cohorts to catch hidden degradation.",
        "7. Select the simplest model that meets business performance and latency requirements (Occam's razor)."
      ],
      tuningPoints: [
        "Tune hyperparameters only after narrowing down to 2-3 promising model families.",
        "Use RandomizedSearchCV or Optuna (Bayesian optimization) over exhaustive GridSearchCV for large parameter spaces.",
        "Enforce early stopping for gradient boosting models using a clean validation fold.",
        "Log parameters, git commit hash, dataset version, random seed, and cross-validation scores in an experiment tracker (MLflow, Weights & Biases)."
      ]
    },

    {
      id: "phase7",
      number: "7",
      title: "Model evaluation",
      icon: "chart-bar",
      summary: "Evaluate the chosen pipeline on the pristine test set and audit calibration, errors, and subgroup fairness.",
      metricsTable: {
        title: "7.1 Choose the right metrics",
        headers: ["Task", "Useful metrics"],
        rows: [
          ["Regression", "MAE (interpretable error), RMSE (penalizes large errors), R^2 (variance explained), MAPE (percentage error)"],
          ["Binary classification", "Precision, Recall, F1-Score, ROC-AUC (ranking quality), PR-AUC (for imbalanced classes), Brier Score"],
          ["Multiclass classification", "Per-class Precision/Recall/F1, Macro-averaged F1, Weighted F1, Confusion Matrix"],
          ["Imbalanced classification", "PR-AUC (Average Precision), Minority-class Recall, Precision at top K%, Cost-weighted Loss"],
          ["Forecasting", "MAE, RMSE, MAPE, MASE (Mean Absolute Scaled Error), SMAPE"],
          ["Clustering", "Silhouette Score, Davies-Bouldin Index, Calinski-Harabasz, Domain-specific cluster validation"]
        ]
      },
      productionChecklist: [
        "Compare test performance with the baseline to prove real lift.",
        "Review confusion matrix, false positive rates, and residual plots for systematic errors.",
        "Audit performance across critical subgroups (demographics, regions, device types) to prevent disparate impact.",
        "Check probability calibration (calibration curve / Brier score) if probabilities drive automated decisions or risk thresholds.",
        "Optimize decision threshold based on operational business costs (cost of false positive vs cost of false negative).",
        "Estimate prediction uncertainty (prediction intervals, quantile regression) where risk tolerance is low.",
        "Stress-test robustness to missing values, corrupted inputs, and extreme boundary values.",
        "Benchmark inference latency (P50, P95, P99) and peak memory consumption under expected load.",
        "Verify 100% determinism and reproducibility with fixed random seeds.",
        "Document known limitations, corner cases, and boundary conditions in a Model Card."
      ]
    },

    {
      id: "phase8",
      number: "8",
      title: "Packaging and deployment",
      icon: "rocket",
      summary: "Transform the offline trained artifact into an audited, containerized, test-backed inference service.",
      stackInfo: "Recommended Initial Stack: scikit-learn, FastAPI, Pydantic, pytest, Git, and Docker. Add PostgreSQL, MLflow, or cloud serving (AWS SageMaker / GCP Vertex) as project complexity demands.",
      steps: [
        {
          num: "1",
          title: "Save the complete pipeline",
          desc: "Serialize preprocessing transformations and model together into a single atomic artifact (e.g. joblib, pickle, or ONNX). Record artifact SHA256 checksum and semantic version."
        },
        {
          num: "2",
          title: "Define a prediction interface",
          desc: "Specify explicit request and response schemas (e.g. JSON payloads) with strict typing and documentation."
        },
        {
          num: "3",
          title: "Add input validation",
          desc: "Use Pydantic to validate data types, range bounds (e.g. 0 < age < 120), allowed category strings, and reject malformed requests before model execution."
        },
        {
          num: "4",
          title: "Add error handling and logging",
          desc: "Log input metadata, inference latency, model version, and errors with unique request IDs; ensure sensitive PII is never exposed in logs."
        },
        {
          num: "5",
          title: "Write automated tests",
          desc: "Write unit tests for custom transformations, integration tests for the API endpoint, schema rejection tests, and reproducibility regression tests with pytest."
        },
        {
          num: "6",
          title: "Package dependencies",
          desc: "Pin all dependency versions in requirements.txt or pyproject.toml and build a minimal, hardened Docker container."
        },
        {
          num: "7",
          title: "Deploy the service",
          desc: "Expose predictions via an asynchronous web framework like FastAPI served with Uvicorn/Gunicorn behind a reverse proxy."
        },
        {
          num: "8",
          title: "Add CI/CD and release controls",
          desc: "Automate test execution on pull requests, enforce model staging, and configure canary releases or blue-green rollouts."
        }
      ]
    },

    {
      id: "phase9",
      number: "9",
      title: "Monitoring and maintenance",
      icon: "activity",
      summary: "Sustain model reliability in production through automated telemetry, drift tracking, and controlled retraining.",
      driftNote: "Important: Data drift does not necessarily mean model accuracy has dropped. Ground-truth performance should be monitored whenever actual labels become available.",
      points: [
        {
          name: "Data quality monitoring",
          desc: "Track missing value surges, unexpected categorical values, malformed inputs, and schema deviations in real-time requests."
        },
        {
          name: "Data drift monitoring",
          desc: "Monitor statistical shifts in incoming feature distributions using Population Stability Index (PSI) or Kolmogorov-Smirnov (KS) tests."
        },
        {
          name: "Prediction drift monitoring",
          desc: "Track changes in output score distributions, predicted category ratios, or confidence score percentiles over time."
        },
        {
          name: "Performance monitoring",
          desc: "Join predictions with delayed real-world outcomes to calculate actual production metrics (ROC-AUC, RMSE, conversion)."
        },
        {
          name: "Operational telemetry",
          desc: "Monitor API latency (P50, P95, P99), throughput (RPS), error rates (5xx, 4xx), CPU usage, and container memory limits."
        },
        {
          name: "Fairness and subgroup monitoring",
          desc: "Track model accuracy, false positive rates, and rejection rates across demographic or geographic cohorts over time."
        },
        {
          name: "Model version lineage",
          desc: "Tag every inference record with model_version, git_commit_sha, and pipeline_version for complete auditability."
        },
        {
          name: "Retraining policy",
          desc: "Define formal retraining triggers (scheduled periodic cadence, performance degradation threshold, or drift alerts)."
        },
        {
          name: "Validation before release",
          desc: "Evaluate any newly retrained model against a shadow production traffic stream or golden benchmark set before replacing production."
        },
        {
          name: "Rollback procedure",
          desc: "Maintain immediate, automated one-click rollback capabilities to restore a previously proven model artifact if anomalies emerge."
        }
      ]
    }
  ],

  // Recommended Implementation Order (Section: Recommended implementation order)
  implementationOrder: [
    { step: 1, title: "Data ingestion and schema validation", desc: "Set up data loading, verify types, and enforce validation rules at ingestion." },
    { step: 2, title: "EDA and a written data-quality report", desc: "Profile distributions, missingness, outliers, and document key findings." },
    { step: 3, title: "Correct splitting strategy and leakage checks", desc: "Lock down train/val/test splits (stratified/time/group) before fitting any transformers." },
    { step: 4, title: "Preprocessing with Pipeline and ColumnTransformer", desc: "Encapsulate imputers, encoders, and scalers in a unified, reusable pipeline." },
    { step: 5, title: "Baseline and candidate model training", desc: "Establish naive baseline, then train linear and gradient boosting candidates." },
    { step: 6, title: "Cross-validation and hyperparameter tuning", desc: "Tune hyperparameters strictly within training folds using Optuna or RandomizedSearch." },
    { step: 7, title: "Final test evaluation", desc: "Score frozen pipeline once on untouched test set; review slices and calibration." },
    { step: 8, title: "Save the fitted pipeline and write tests", desc: "Serialize pipeline artifact; write pytest unit and integration test suites." },
    { step: 9, title: "Serve predictions through FastAPI", desc: "Implement FastAPI endpoint with Pydantic request validation and error handling." },
    { step: 10, title: "Add Docker, logging, monitoring, and reproducible retraining", desc: "Containerize service, instrument telemetry, and establish drift and rollback policies." }
  ],

  goldenHabit: "The most important production habit: Every transformation should have a documented reason, a defined fit/transform behavior, and tests proving it behaves correctly on unseen data. This is much more valuable than applying every preprocessing technique to every dataset.",

  // How to Interpret Plots During EDA: What Insights Should You Look For?
  edaPlotGuide: {
    title: "How to interpret plots during EDA: What insights should you look for?",
    subtitle: "When performing Exploratory Data Analysis (EDA), the goal is not just to create plots — it is to discover something about the data that helps you make a decision.",
    fiveQuestions: [
      { id: "q1", title: "Distribution", question: "What values are common, rare, or unusual?" },
      { id: "q2", title: "Relationship", question: "Which variables move together, or behave differently?" },
      { id: "q3", title: "Data quality", question: "Is there missing, incorrect, duplicated, or suspicious data?" },
      { id: "q4", title: "ML impact", question: "Could this affect preprocessing, feature engineering, model choice, or evaluation?" },
      { id: "q5", title: "Action", question: "What should be done next, and why?" }
    ],
    example: "For example, if a histogram of house prices is strongly right-skewed, the insight is not simply 'the data is skewed.' The useful conclusion is that a few expensive houses may influence the mean and some models; you should investigate those observations and consider whether a log transformation or robust metric is appropriate.",
    categories: [
      {
        id: "cat-num",
        name: "1. Numerical distribution plots",
        plots: [
          {
            id: "plot-hist",
            letter: "A",
            name: "Histogram",
            question: "How are numerical values distributed?",
            image: "https://images.openai.com/static-rsc-4/fp4NFKEMuZcCSS16SxJ6OGSJkML8T8KPl2Kn2F5le6VrZ3vdbywzi9MYRVwkptIIr13_gyfJPOCrVBjZNBmOv3R76-0kMm9K_V8s28wMItS4D-0TP5893wKxcfFrxMGpggWSfWhtupAQRW0QGY_2EXVxPgdQdckmC9zj9EXnHiA?purpose=inline",
            sourceTitle: "Data Visualization Guide: Histograms, Box Plots & Scatter Plots for Exploratory Analysis - Interactive | Michael Brenndoerfer",
            lookFor: [
              "Symmetric or skewed distributions.",
              "One peak or multiple peaks.",
              "Gaps and unusual clusters.",
              "Values concentrated near a boundary."
            ],
            insight: "Strong right skew might justify investigating a log transformation. Multiple peaks may indicate distinct populations or data sources."
          },
          {
            id: "plot-box",
            letter: "B",
            name: "Box plot",
            question: "How spread out is the data, and are there extreme values?",
            image: "https://images.openai.com/static-rsc-4/OUce9PnoLYaB4sJ8wuK0QkiKKkxwq41Hu_rmehZdZoEMsiwz4XmlTrRBSQ_8_8EZZkNLY2RKXF2JZAY_7aSvVtTt0RGgXbDCo3f4XNzVGlu6pc-ARWZr6zdQOnshg5obqFP3aTQ8aaG2h8XPeQ_K1L-c7Avhrmwxy8Mk09lkbNU?purpose=inline",
            sourceTitle: "The Middle and the Mess — Biostatistics for Health Science Students",
            lookFor: [
              "Median and interquartile range.",
              "Asymmetry.",
              "Points beyond the whiskers.",
              "Differences between groups."
            ],
            insight: "Extreme points need investigation, not automatic deletion. They could be errors or legitimate rare cases."
          },
          {
            id: "plot-violin",
            letter: "C",
            name: "KDE or violin plot",
            question: "Where are values concentrated?",
            image: "https://images.openai.com/static-rsc-4/Z7Axl1ILeHmyeBX_fBAGh0KeBrDL8ZQO0w3Grj5du4owlec94Kn8a9L9ZpSME_lBcqW3WkbGcRv5f0R3yfyZnhIzBNxHiHHzxP5sZvSq_A_FI-uIiGJfOW-kzdkHzzzkgcoa6wmuRSujowuDbGtQ9ibxXDvRE3s_6KD77MoXagU?purpose=inline",
            sourceTitle: "A Complete Guide to Violin Plots | Atlassian",
            lookFor: [
              "Density peaks.",
              "Multiple modes.",
              "Wide versus narrow regions.",
              "Distribution differences between groups."
            ],
            insight: "Two groups can have the same mean but very different distributions. A violin plot can reveal this hidden difference."
          }
        ]
      },
      {
        id: "cat-rel",
        name: "2. Relationship plots",
        plots: [
          {
            id: "plot-scatter",
            letter: "D",
            name: "Scatter plot",
            question: "How does one numerical feature relate to another?",
            image: "https://images.openai.com/static-rsc-4/tpeyCTfMOi0xj_XKW_c8t_lXXWYa-OBETFglzXzpaAYfTBEG-Wcn9l1cuDoqWuO4hxTFFvdaMQmwl2vcFGNAhCf2RuGTknMguSFJJFd1R1mXtiFxKC0PI6u2NJho6PYrg42QeOC9xgAW01Pv6SfeLBX1tutLZz9nMUM8UTNlwsE?purpose=inline",
            sourceTitle: "Causal Inference in R: Scatter Relationships",
            lookFor: [
              "Positive or negative relationships.",
              "Nonlinear patterns.",
              "Clusters.",
              "Outliers and changing variance."
            ],
            insight: "A curved relationship may not be captured well by ordinary linear regression without suitable feature engineering or a nonlinear model."
          },
          {
            id: "plot-heatmap",
            letter: "E",
            name: "Correlation heatmap",
            question: "Which numerical variables have strong linear associations?",
            image: "https://images.openai.com/static-rsc-4/d2PxCXf5YeVV9MGCtzWYjeym5gGvsHn74goizihCWAhKzvjFmOgTlSO073KV-uLExFLtjQPKuW3NQOeUy8bOItR9BTaVyQOso5yyempjcjg2F-upSuN0JTDcJCqm3sexcfSOeOG-A7wtCHliP1lUr-Ks89zDTMxOJmAOB5L55m4?purpose=inline",
            sourceTitle: "K-means clustering using Python on IBM watsonx.ai",
            lookFor: [
              "Strong positive or negative correlations.",
              "Groups of highly correlated features.",
              "Predictors associated with the target."
            ],
            insight: "Highly correlated predictors may cause multicollinearity in linear models. However, low correlation does not mean a feature is useless; nonlinear relationships may exist."
          },
          {
            id: "plot-grouped-bar",
            letter: "F",
            name: "Grouped bar plot",
            question: "Does the outcome differ across categories?",
            image: "https://images.openai.com/static-rsc-4/91-GUaUBHkC7nkCe7O2LwYSFOpWvOO0ceUaPlxBS0VWJ-8op9C0wPiAJyElCZh4ukNvFjOpfmlkSZg9AHejuOloVMaQ6s6lM4xWJa0UhPIm9Vb61nopJh66qm9AtQ0o4VhMidGQifiLpMWWUlmPjFBtzUbKnbPQyfa_xRBG62eY?purpose=inline",
            sourceTitle: "The Metrics Are Lying — Hands-On Guide to Avoiding Data Illusions | Medium",
            lookFor: [
              "Differences in group averages or rates.",
              "Rare categories.",
              "Large differences in sample sizes.",
              "Categories with unusual outcomes."
            ],
            insight: "Some categories may be predictive, but check sample sizes and confounding variables before concluding that a category causes the outcome."
          }
        ]
      },
      {
        id: "cat-cat",
        name: "3. Categorical data plots",
        plots: [
          {
            id: "plot-countplot",
            letter: "G",
            name: "Count plot / frequency bar chart",
            question: "How are frequencies distributed across categories?",
            image: "https://images.openai.com/static-rsc-4/8CmMF2kbjoNmY3Qe1H-cauUkzESIxaoDDsh5AejRKC4CMKubbDVQl0gIr86qEfNysG5aqR9ReVWez9rAvISEVwI0ZLDwU4x8p-3gbJmGlWMkVbAoM70KQKySxOCZNSe25UecUxFfZz5tYC9nlwUqMmPP9dlxUCdE-4OIUZI9sAg?purpose=inline",
            sourceTitle: "Types of Data: Complete Guide to Data Classification | Michael Brenndoerfer",
            lookFor: [
              "Most frequent categories, rare categories, class imbalance, unexpected labels."
            ],
            insight: "A classification dataset with 95% of records in one class may need suitable metrics and possibly class-weighted training."
          },
          {
            id: "plot-stacked-bar",
            letter: "H",
            name: "Stacked or 100% stacked bar chart",
            question: "How do class proportions shift across category groups?",
            image: "https://images.openai.com/static-rsc-4/Jsz2Q2iuAelnwCTUjEjEGQ3JMKluZhf5PrycebIw664dTfwCrRj0BoImzxKrbonGJk8vQyGr5V9z4P2MkeaHprCXAB_cMEmtnQXqwJn1_BFuLkAsVuckmjyr8Qu1M0PAQy3xFNgyEcMofpyYUuNErnjE5IJnNk4C5ZtbE29m6HY?purpose=inline",
            sourceTitle: "computing column proportions in stat_count() · tidyverse/ggplot2",
            lookFor: [
              "Differences in class proportions across groups."
            ],
            insight: "The proportion of customers who churn may differ by subscription type. Use 100% stacked bars to compare proportions, and ordinary stacked bars when total counts also matter."
          },
          {
            id: "plot-mosaic",
            letter: "I",
            name: "Mosaic plot / contingency table",
            question: "Are two categorical variables statistically associated?",
            image: "https://images.openai.com/static-rsc-4/0cCHkui5BN1dQa5PdeXyDVY0qx6EHKibJbGnVAF1U6UXd1MPY2-OCNkqS1VgJ7DfFzHAJAEl1iD_XGLIgNOAyCW9siS5Llf7PAF0xllp7ee275AuNCbsS214pzffBr05lL8_sUzAazcepzvhBQLDBmqF7sVBu8Wsi2kT_KjuKbU?purpose=inline",
            sourceTitle: "Understanding Mosaic Plots & Categorical Associations",
            lookFor: [
              "Associations between two categorical variables and differences in group sizes."
            ],
            insight: "Certain combinations of customer type and payment method may occur more or less often than expected."
          }
        ]
      },
      {
        id: "cat-quality",
        name: "4. Missing values, outliers, and data quality plots",
        plots: [
          {
            id: "plot-missing-heat",
            letter: "J",
            name: "Missing-value heatmap or matrix",
            question: "Where and how are missing values distributed across records?",
            image: "https://images.openai.com/static-rsc-4/OrFYyJAPRK8jEl8PR7ysxBuivVSHwNpuEacRn8QWSM0BBugyuvGm3KTDt6KePfNGYG3SsDN1AjLsvVYiDSBD5B6NhmFLh60L6_zYGlM5JRCntjKl2XVhjixiWsvDSOBOx22Nivz8i0XgdKFqAStJGKKM7Dw6f2CCM3-fb3_fPZg?purpose=inline",
            sourceTitle: "Would I Have Survived the Titanic? Missing-Value Matrix",
            lookFor: [
              "Columns that are frequently missing and patterns of missingness across records."
            ],
            insight: "If income is missing primarily for a particular customer segment, missingness may be systematic. Investigate the cause before choosing an imputation method."
          },
          {
            id: "plot-outlier-scatter",
            letter: "K",
            name: "Outlier scatter plot",
            question: "Are there extreme or impossible values in multidimensional space?",
            image: "https://images.openai.com/static-rsc-4/BarqSwDk8C71LvnNI3ZBJ7shFKpGKPfkvJE94-_Gbj-bFiOGTfzbCxfY3tQcANIW_8wu8hSjmYT5KApkgx4RPdO1lO1hfpQrQ5R_d-rLnqn5ljyy-tNpvm9w4Gu9HZW7JMKpeDfTaRnRZ1AfntZ9Kbw77KreL8TmoqouAEgIX3k?purpose=inline",
            sourceTitle: "Data Visualization Guide: Histograms, Box Plots & Scatter Plots",
            lookFor: [
              "Isolated points, impossible values, and observations far from the main pattern."
            ],
            insight: "An unusual combination of values may reveal data-entry errors, fraud, or a legitimate rare event. Validate the observation before modifying it."
          },
          {
            id: "plot-pairplot",
            letter: "L",
            name: "Pair plot",
            question: "How do multiple numerical variables relate simultaneously?",
            image: "https://images.openai.com/static-rsc-4/WmzHznCob36QLuh03s5Ckftoo3J3Z-lIj0vPfcN4nOMByQId8uHCC9WQyYqScJH3cF3cbINhf4PYGusjyNT5NJKt3hSYJfPYvcGQLZmFKNgspVMw6FLvEMTdlGAqcl13IVEOGoJStNrfJPlA9LuU-y9tGq0PR2ty6eoJN_S-EE0?purpose=inline",
            sourceTitle: "seaborn.pairplot — Pairwise Numerical Distributions",
            lookFor: [
              "Relationships between multiple numerical variables, clusters, and potential outliers."
            ],
            insight: "Useful for small and medium-sized feature sets. For hundreds of features, use targeted plots because pair plots become expensive and difficult to interpret."
          }
        ]
      },
      {
        id: "cat-time",
        name: "5. Time-series and production data plots",
        plots: [
          {
            id: "plot-timeseries",
            letter: "M",
            name: "Time-series line plot",
            question: "How do values behave over time?",
            image: "https://images.openai.com/static-rsc-4/xvzbXVWU-aSHu4AdumM5BnaLGH3WrQAt1B2nfAp6N27rPplzIzzCHmLolU19YsVTywH2lUxh4VQW1MuisHQ8hYP95a9X3tgw6TJrDHq0nwX7UBWt_fnib4XfwebefexWjsXD_no0eqKOlI4ef4AowG3eVtpkafga3sF7XASWv-w?purpose=inline",
            sourceTitle: "Time Series Analysis: Top 6 Real Life Examples | Intelliarts",
            lookFor: [
              "Trends, seasonality, sudden jumps, missing periods, and changes in variance."
            ],
            insight: "If demand increases every weekend, calendar features may help. Preserve chronological order when splitting data for forecasting."
          },
          {
            id: "plot-drift",
            letter: "N",
            name: "Distribution comparison plot",
            question: "Has the distribution shifted between training vs live production?",
            image: "https://images.openai.com/static-rsc-4/-sp_waPTlMzhBljSHOBPks3XjXYzF_h7oGr45eAJAwo8VsMAwAy0GOX-cdDESfTNAP4cFx3W_lI0n-9V_CETK2RWsWm0NkPsLmNzRmrSIbX61WRMHjkm1R7jA9PCltWcCk7xGO9i2KUa0e7i3b9wkniJTEiuERjORL9SSRIJf1Q?purpose=inline",
            sourceTitle: "Evaluating Drift: Monitoring and Maintaining Model Performance Over Time",
            lookFor: [
              "Differences between training and test data, or training and live production inputs."
            ],
            insight: "A substantial shift may indicate data drift or a change in the user population. Investigate the cause and evaluate performance when labels become available."
          },
          {
            id: "plot-residuals",
            letter: "O",
            name: "Residual plot",
            question: "Are model errors random, or do systematic patterns remain?",
            image: "https://images.openai.com/static-rsc-4/-WQvUF5r7Tc1dneHETO8w49PNEazFaBIqsNQB7VfJzaqCcHED6-aXyk-EMuzO1V62xViY1F9Wkg_C69-lr8Mv1Q0C7BYbhq3Am51XPLrpzIJywUmS2KIrLLimhf0jEC_BaXiJ40sywlCm3yOHRM4ju_5Ln1eS_ttMfYeZpbCyac?purpose=inline",
            sourceTitle: "Linear Regression Explained: Residual Error Funnel Diagnostics | Medium",
            lookFor: [
              "Curved patterns, funnel shapes, systematic overprediction, and underprediction."
            ],
            insight: "A curve may indicate model misspecification. A funnel shape may indicate non-constant error variance. Use these findings to improve the model or its uncertainty estimates."
          }
        ]
      }
    ],
    decisionMatrix: [
      { observation: "Strongly skewed numerical feature", action: "Investigate log or power transformation", caution: "Some values, such as zero or negatives, need special handling" },
      { observation: "Many missing values", action: "Investigate missingness and compare strategies", caution: "Do not impute blindly" },
      { observation: "Extreme outliers", action: "Validate records; consider robust methods", caution: "Do not delete valid rare events automatically" },
      { observation: "Highly correlated predictors", action: "Investigate redundancy and multicollinearity", caution: "Correlation alone is not a reason to remove a feature" },
      { observation: "Rare categorical values", action: "Group rare categories if appropriate", caution: "Preserve meaningful rare groups" },
      { observation: "Imbalanced target classes", action: "Use suitable metrics, thresholds, or class weights", caution: "Resampling is not always necessary" },
      { observation: "Nonlinear feature–target pattern", action: "Try nonlinear models or feature transformations", caution: "Confirm with validation" },
      { observation: "Different target rates across groups", action: "Investigate segment differences", caution: "Association does not prove causation" },
      { observation: "Training–production distribution shift", action: "Investigate source changes and monitor performance", caution: "Drift alone does not prove model failure" },
      { observation: "Residual patterns", action: "Reconsider features, model assumptions, or model class", caution: "Confirm improvements on validation data" }
    ],
    template: [
      { num: 1, step: "Plot name and purpose", example: "Histogram of house prices to understand the target distribution." },
      { num: 2, step: "Observation", example: "Most prices are concentrated in the lower range, with a long right tail." },
      { num: 3, step: "Statistical or data-quality implication", example: "The mean may be influenced by expensive properties." },
      { num: 4, step: "Possible ML impact", example: "Squared-error metrics and some models may be sensitive to extreme targets." },
      { num: 5, step: "Action to test", example: "Compare the original target with a log-transformed target using training-only fitting and validation." },
      { num: 6, step: "Evidence and decision", example: "Record validation results and retain the transformation only if it helps the objective and preserves interpretability requirements." }
    ],
    pythonCode: `import matplotlib.pyplot as plt
import seaborn as sns

# Numerical distribution
df["price"].hist(bins=30)
plt.title("Price Distribution")
plt.xlabel("Price")
plt.ylabel("Frequency")
plt.show()

# Outliers
sns.boxplot(data=df, x="price")
plt.title("Price Box Plot")
plt.show()

# Relationship between two numerical features
sns.scatterplot(data=df, x="area", y="price")
plt.title("Area vs Price")
plt.show()

# Correlations among numerical columns
corr = df.select_dtypes(include="number").corr()
sns.heatmap(corr, cmap="coolwarm", center=0)
plt.title("Numerical Feature Correlations")
plt.show()

# Categorical frequencies
sns.countplot(data=df, x="property_type")
plt.title("Property Type Counts")
plt.xticks(rotation=45)
plt.show()

# Target distribution by category
sns.boxplot(data=df, x="property_type", y="price")
plt.title("Price by Property Type")
plt.xticks(rotation=45)
plt.show()`,
    finalRule: "Plot → Observe → Explain → Decide → Validate."
  },

  // Practical Python & ML Code Recipes (from pandas/scikit-learn workflow guide)
  codeRecipes: [
    {
      category: "EDA & Profiling",
      id: "recipe-basic-eda-plots",
      title: "Basic EDA Plotting Workflow (Matplotlib & Seaborn)",
      desc: "Comprehensive plotting script covering distributions, boxplots, scatter relationships, heatmaps, and categorical bar plots.",
      code: `import matplotlib.pyplot as plt
import seaborn as sns

# Numerical distribution
df["price"].hist(bins=30)
plt.title("Price Distribution")
plt.xlabel("Price")
plt.ylabel("Frequency")
plt.show()

# Outliers
sns.boxplot(data=df, x="price")
plt.title("Price Box Plot")
plt.show()

# Relationship between two numerical features
sns.scatterplot(data=df, x="area", y="price")
plt.title("Area vs Price")
plt.show()

# Correlations among numerical columns
corr = df.select_dtypes(include="number").corr()
sns.heatmap(corr, cmap="coolwarm", center=0)
plt.title("Numerical Feature Correlations")
plt.show()

# Categorical frequencies
sns.countplot(data=df, x="property_type")
plt.title("Property Type Counts")
plt.xticks(rotation=45)
plt.show()

# Target distribution by category
sns.boxplot(data=df, x="property_type", y="price")
plt.title("Price by Property Type")
plt.xticks(rotation=45)
plt.show()`
    },
    {
      category: "EDA & Profiling",
      id: "recipe-normal-lib",
      title: "Core ML Libraries & Warning Setup",
      desc: "Standard environment imports for data manipulation, plotting, and silencing non-critical warnings.",
      code: `import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import warnings
warnings.filterwarnings("ignore")`
    },
    {
      category: "EDA & Profiling",
      id: "recipe-pandas-profiling",
      title: "Automated Dataset Profiling (ydata-profiling)",
      desc: "Generate comprehensive interactive HTML data quality & exploratory report.",
      code: `import pandas as pd
from ydata_profiling import ProfileReport

# 1. Load dataset
df = pd.read_csv("train.csv")

# 2. Generate and export interactive HTML report
profile = ProfileReport(df, title="Dataset Quality & EDA Report", explorative=True)
profile.to_file("my_data_analysis.html")
print("Done! Open 'my_data_analysis.html' in your browser.")`
    },
    {
      category: "EDA & Profiling",
      id: "recipe-corr-target",
      title: "Feature Correlation with Target Variable",
      desc: "Directly calculate correlation of all predictors against a continuous target column.",
      code: `# Correlate all numeric columns with the target variable
cols = df.select_dtypes(include=[np.number]).columns
correlation_with_target = df[cols].corrwith(df["charges"]).sort_values(ascending=False)
print("Correlation with Target:\n", correlation_with_target)`
    },
    {
      category: "EDA & Profiling",
      id: "recipe-multicollinearity-drop",
      title: "Multicollinearity Detection & Collinear Drop",
      desc: "Identify and drop redundant features using correlation matrix upper triangle filtering.",
      code: `import numpy as np

# 1. Compute absolute correlation matrix
corr_matrix = df.corr(numeric_only=True).abs()

# 2. Extract upper triangle of correlation matrix
upper = corr_matrix.where(
    np.triu(np.ones(corr_matrix.shape), k=1).astype(bool)
)

# 3. Identify and drop features exceeding collinearity threshold (e.g. 0.85 or 0.90)
threshold = 0.85
to_drop = [col for col in upper.columns if any(upper[col] > threshold)]
print("Highly Collinear Columns to Drop:", to_drop)

# Drop redundant features
X_clean = df.drop(columns=to_drop)`
    },
    {
      category: "EDA & Profiling",
      id: "recipe-mutual-info",
      title: "Mutual Information Feature Selection",
      desc: "Nonlinear dependency scoring between numerical features and target variable.",
      code: `import pandas as pd
from sklearn.feature_selection import mutual_info_classif
from sklearn.impute import SimpleImputer

X = train[train_num_cols]
y = target

# Impute temporary missing values to compute MI
X_imputed = pd.DataFrame(
    SimpleImputer(strategy="median").fit_transform(X),
    columns=X.columns
)

# Calculate Mutual Information Scores
mi = mutual_info_classif(X_imputed, y, random_state=42)
mi_scores = pd.Series(mi, index=X.columns).sort_values(ascending=False)
print("Mutual Information Scores:\n", mi_scores)`
    },
    {
      category: "EDA & Profiling",
      id: "recipe-chi2-test",
      title: "Chi-Square Test of Categorical Independence",
      desc: "Test statistical association between categorical features and target with hypothesis rejection rule.",
      code: `import pandas as pd
from scipy.stats import chi2_contingency

alpha = 0.05
# Bin continuous target into quartiles if needed
df_clean["charges_bin"] = pd.qcut(df_clean["charges"], q=4, labels=False)
chi2_results = {}

for col in cat_features:
    table = pd.crosstab(df_clean[col], df_clean["charges_bin"])
    chi2_stat, p, _, _ = chi2_contingency(table)
    decision = "Reject Null (Keep Feature)" if p < alpha else "Accept Null (Drop Feature)"
    chi2_results[col] = {
        "chi2_statistics": round(chi2_stat, 4),
        "p_value": round(p, 6),
        "Decision": decision
    }

chi2_df = pd.DataFrame(chi2_results).T
print(chi2_df)`
    },
    {
      category: "EDA & Profiling",
      id: "recipe-cramers-v",
      title: "Bias-Corrected Cramér's V Test (Categorical Association)",
      desc: "Measure association strength between categorical features and target variable.",
      code: `import numpy as np
import pandas as pd
from scipy.stats import chi2_contingency

def cramers_v(x, y):
    table = pd.crosstab(x, y)
    chi2 = chi2_contingency(table)[0]
    n = table.sum().sum()
    phi2 = chi2 / n
    r, k = table.shape
    
    # Bias correction
    phi2_corr = max(0, phi2 - ((k - 1) * (r - 1)) / (n - 1))
    r_corr = r - ((r - 1) ** 2) / (n - 1)
    k_corr = k - ((k - 1) ** 2) / (n - 1)
    
    return np.sqrt(phi2_corr / min(k_corr - 1, r_corr - 1))

# Run across all categorical features
results = []
for col in cat_cols:
    val = cramers_v(X[col], y)
    results.append({"feature": col, "cramers_v": val})

cramers_df = pd.DataFrame(results).sort_values(by="cramers_v", ascending=False)
print("Cramer's V Association Ranking:\n", cramers_df)`
    },
    {
      category: "EDA & Profiling",
      id: "recipe-anova-test",
      title: "ANOVA F-Test (Numerical Features vs Categorical Target)",
      desc: "One-way ANOVA test to evaluate if numerical feature means differ significantly across target classes.",
      code: `import pandas as pd
from scipy.stats import f_oneway

alpha = 0.05
num_cols = df.select_dtypes(include=["int64", "float64"]).columns
num_cols = num_cols.drop("id", errors="ignore")

anova_results = {}
for col in num_cols:
    groups = [group[col].dropna() for _, group in df.groupby("health_condition")]
    f_stat, p = f_oneway(*groups)
    decision = "Reject Null (Keep Feature)" if p < alpha else "Accept Null (Drop Feature)"
    anova_results[col] = [round(f_stat, 4), p, decision]

results_df = pd.DataFrame(
    anova_results,
    index=["F-Statistic", "P-Value", "Decision"]
).T.sort_values(by="P-Value")

print("ANOVA Results:\n", results_df)`
    },

    // Preprocessing & Feature Engineering Recipes
    {
      category: "Data Preprocessing",
      id: "recipe-standard-scaler",
      title: "StandardScaler Transformation",
      desc: "Standardize numeric features by removing the mean and scaling to unit variance.",
      code: `from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()
df["height_scaled"] = scaler.fit_transform(df[["height"]])`
    },
    {
      category: "Data Preprocessing",
      id: "recipe-minmax-scaler",
      title: "MinMaxScaler Normalization",
      desc: "Transform features by scaling each feature to a bounded range [0, 1].",
      code: `from sklearn.preprocessing import MinMaxScaler

scaler = MinMaxScaler()
df["height_scaled"] = scaler.fit_transform(df[["height"]])`
    },
    {
      category: "Data Preprocessing",
      id: "recipe-label-encoder",
      title: "Label Encoding (Target or Ordered Categories)",
      desc: "Encode target labels or genuine ordinal features with values between 0 and n_classes-1.",
      code: `from sklearn.preprocessing import LabelEncoder

le = LabelEncoder()
df["Gender"] = le.fit_transform(df["Gender"])`
    },
    {
      category: "Data Preprocessing",
      id: "recipe-one-hot-encoding",
      title: "One-Hot Encoding with pandas",
      desc: "Convert categorical variable into dummy/indicator variables with integer output.",
      code: `df = pd.get_dummies(df, columns=["Gender"], dtype=int)`
    },
    {
      category: "Data Preprocessing",
      id: "recipe-binning-cut",
      title: "Binning Continuous Variables (pd.cut)",
      desc: "Discretize continuous numeric feature into specified interval bins with semantic labels.",
      code: `df["cleaned_category"] = pd.cut(
    df["cleaned"],
    bins=[0, 18.5, 23.5, 29.5, float("inf")],
    labels=["under", "normal", "upper", "extreme"]
)`
    },
    {
      category: "Data Preprocessing",
      id: "recipe-col-transformer",
      title: "Production ColumnTransformer Setup",
      desc: "Encapsulate numerical and categorical transformations into a unified scikit-learn preprocessor.",
      code: `from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OneHotEncoder, StandardScaler

numeric_features = ["age", "salary"]
categorical_features = ["gender", "city"]

numeric_transformer = Pipeline([
    ("imputer", SimpleImputer(strategy="median")),
    ("scaler", StandardScaler())
])

categorical_transformer = Pipeline([
    ("imputer", SimpleImputer(strategy="most_frequent")),
    ("encoder", OneHotEncoder(handle_unknown="ignore"))
])

preprocessor = ColumnTransformer([
    ("num", numeric_transformer, numeric_features),
    ("cat", categorical_transformer, categorical_features)
], remainder="passthrough")`
    },
    {
      category: "Data Preprocessing",
      id: "recipe-schema-validation",
      title: "Schema & Required Column Validation",
      desc: "Assert presence of mandatory columns and verify column names are unique.",
      code: `import pandas as pd

required_columns = ["area", "bedrooms", "location", "price"]
missing_columns = set(required_columns) - set(df.columns)
if missing_columns:
    raise ValueError(f"Missing required columns: {missing_columns}")

if not df.columns.is_unique:
    raise ValueError("Duplicate column names detected in dataframe.")

print("Schema validation passed successfully.")`
    },
    {
      category: "Data Preprocessing",
      id: "recipe-missing-report",
      title: "Missing-Value Summary & Percentage Report",
      desc: "Compute missing record counts and percentages sorted in descending order.",
      code: `import pandas as pd

missing_summary = pd.DataFrame({
    "missing_count": df.isna().sum(),
    "missing_pct": (df.isna().mean() * 100).round(2)
}).sort_values(by="missing_pct", ascending=False)

print("Missingness Summary:")
print(missing_summary[missing_summary["missing_count"] > 0])`
    },
    {
      category: "Data Preprocessing",
      id: "recipe-duplicate-check",
      title: "Duplicate Rows & Entity Key Verification",
      desc: "Check for both whole-row exact duplicates and repeated business entity primary keys.",
      code: `# Check exact duplicate rows across all columns
exact_dupes = df.duplicated().sum()
print(f"Exact duplicate rows: {exact_dupes}")

# Check duplicate business entity keys (e.g. user_id or transaction_id)
if "customer_id" in df.columns:
    key_dupes = df["customer_id"].duplicated().sum()
    print(f"Duplicate entity keys (customer_id): {key_dupes}")

# Optional: drop only accidental duplicate rows if justified
# df = df.drop_duplicates()`
    },
    {
      category: "Data Preprocessing",
      id: "recipe-invalid-bounds-check",
      title: "Domain Constraint & Invalid Bounds Checks",
      desc: "Flag impossible domain values (e.g. negative area or price) and quarantine them.",
      code: `# Assert domain constraints and flag invalid observations
invalid_mask = (
    (df["area"] <= 0) |
    (df["bedrooms"] < 0) |
    (df["price"] <= 0)
)

invalid_count = invalid_mask.sum()
print(f"Domain bounds violations found: {invalid_count}")

# Inspect or quarantine invalid records
if invalid_count > 0:
    quarantine_df = df[invalid_mask]
    print(quarantine_df.head())`
    },
    {
      category: "Data Preprocessing",
      id: "recipe-string-cleaning",
      title: "Text & Category Normalization",
      desc: "Strip leading/trailing whitespace, lowercase strings, and map known synonyms.",
      code: `# Normalize string categories: strip whitespace and lowercase
for col in ["location", "property_type"]:
    if col in df.columns and df[col].dtype == "object":
        df[col] = df[col].astype(str).str.strip().str.lower()

# Standardize known spelling/format variants
mapping = {
    "ny": "new york",
    "nyc": "new york",
    "sf": "san francisco"
}
if "location" in df.columns:
    df["location"] = df["location"].replace(mapping)`
    },
    {
      category: "Data Preprocessing",
      id: "recipe-type-coercion",
      title: "Safe Type Coercion with Error Tracking",
      desc: "Safely parse numeric and datetime values using errors='coerce' to catch parsing errors.",
      code: `import pandas as pd

# Safely coerce numeric column with error tracking
df["area"] = pd.to_numeric(df["area"], errors="coerce")

# Safely coerce date column to UTC timestamp
df["transaction_date"] = pd.to_datetime(df["transaction_date"], errors="coerce")

# Audit any values that failed parsing (turned to NaN)
print("Coercion null count in area:", df["area"].isna().sum())
print("Coercion null count in date:", df["transaction_date"].isna().sum())`
    },
    {
      category: "Data Preprocessing",
      id: "recipe-pipeline-production-mixed",
      title: "Production Mixed-Type Pipeline with ColumnTransformer",
      desc: "End-to-end ColumnTransformer and scikit-learn Pipeline with median imputation, scaling, and OHE.",
      code: `from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.linear_model import LogisticRegression

numeric_features = ["area", "bedrooms", "age"]
categorical_features = ["location", "property_type"]

numeric_pipe = Pipeline([
    ("imputer", SimpleImputer(strategy="median")),
    ("scaler", StandardScaler())
])

categorical_pipe = Pipeline([
    ("imputer", SimpleImputer(strategy="most_frequent")),
    ("encoder", OneHotEncoder(handle_unknown="ignore", sparse_output=False))
])

preprocessor = ColumnTransformer(
    transformers=[
        ("num", numeric_pipe, numeric_features),
        ("cat", categorical_pipe, categorical_features)
    ],
    remainder="drop"
)

pipeline = Pipeline([
    ("prep", preprocessor),
    ("model", LogisticRegression(max_iter=1000, random_state=42))
])

# Fit strictly on X_train; transforms occur automatically inside pipeline
pipeline.fit(X_train, y_train)`
    },
    {
      category: "Production & Deployment",
      id: "recipe-save-joblib-pipeline",
      title: "Pipeline Serialization & Loading with Joblib",
      desc: "Save the fitted preprocessing and model pipeline to disk and reload for serving.",
      code: `import joblib

# Persist fitted pipeline artifact (preprocessor + model bundled together)
model_artifact_path = "artifacts/production_pipeline_v1.joblib"
joblib.dump(pipeline, model_artifact_path)
print(f"Pipeline artifact saved to {model_artifact_path}")

# Load and run inference in serving service
loaded_pipeline = joblib.load(model_artifact_path)
predictions = loaded_pipeline.predict(X_new)
print(f"Generated {len(predictions)} predictions on new incoming batch.")`
    },

    // Unsupervised Learning & Dimensionality Reduction Recipes
    {
      category: "Unsupervised & Clustering",
      id: "recipe-kmeans-elbow",
      title: "K-Means: Finding Optimal K with Elbow Method",
      desc: "Compute WCSS (Inertia) across k values 1 to 10 and plot the inflection elbow point.",
      code: `from sklearn.cluster import KMeans
import matplotlib.pyplot as plt

wcss = []
for i in range(1, 11):
    kmeans = KMeans(n_clusters=i, random_state=42)
    kmeans.fit(X)
    wcss.append(kmeans.inertia_)

plt.figure(figsize=(8, 4))
plt.plot(range(1, 11), wcss, marker="o")
plt.xlabel("Number of Clusters (k)")
plt.ylabel("WCSS (Inertia)")
plt.title("Elbow Method for Optimal k")
plt.grid(True)
plt.show()`
    },
    {
      category: "Unsupervised & Clustering",
      id: "recipe-kmeans-clustering",
      title: "K-Means Clustering Implementation",
      desc: "Train K-Means model, extract cluster assignments, centers, and inertia.",
      code: `from sklearn.cluster import KMeans

# 1. Create and fit model
kmeans = KMeans(n_clusters=3, random_state=42)
kmeans.fit(X)

# 2. Extract cluster assignments and centers
clusters = kmeans.predict(X)
df["Cluster"] = clusters

print("Cluster Centers:\n", kmeans.cluster_centers_)
print("Inertia (WCSS):", kmeans.inertia_)`
    },
    {
      category: "Unsupervised & Clustering",
      id: "recipe-dbscan",
      title: "DBSCAN Density-Based Clustering",
      desc: "Density-based spatial clustering with noise detection (-1) and standard scaling.",
      code: `import pandas as pd
from sklearn.cluster import DBSCAN
from sklearn.preprocessing import StandardScaler

# 1. Scale features (essential for density clustering)
scaler = StandardScaler()
X_scaled = scaler.fit_transform(df[["F1", "F2"]])

# 2. Fit DBSCAN
dbscan = DBSCAN(eps=0.5, min_samples=5)
clusters = dbscan.fit_predict(X_scaled)
df["Cluster"] = clusters

# 3. Inspect results
n_clusters = len(set(clusters)) - (1 if -1 in clusters else 0)
n_noise = list(clusters).count(-1)
print(f"Discovered Clusters: {n_clusters}, Noise Outliers: {n_noise}")`
    },
    {
      category: "Unsupervised & Clustering",
      id: "recipe-pca",
      title: "PCA: Principal Component Analysis & Visualization",
      desc: "Reduce dimensionality to 2 components, calculate explained variance ratio, and plot scatter projection.",
      code: `import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA

# 1. Scale numeric features
X = df.drop("species", axis=1)
X_scaled = StandardScaler().fit_transform(X)

# 2. Compute 2 Principal Components
pca = PCA(n_components=2)
X_pca = pca.fit_transform(X_scaled)

print("Explained Variance Ratio:", pca.explained_variance_ratio_)
print("Total Variance Retained:", round(sum(pca.explained_variance_ratio_) * 100, 2), "%")

# 3. Create DataFrame and plot 2D projection
pca_df = pd.DataFrame(X_pca, columns=["PC1", "PC2"])
pca_df["species"] = df["species"]

plt.figure(figsize=(8, 6))
sns.scatterplot(data=pca_df, x="PC1", y="PC2", hue="species", palette="viridis")
plt.title("PCA 2D Projection")
plt.grid(True)
plt.show()`
    },

    // Model Training & Candidates
    {
      category: "Training & Modeling",
      id: "recipe-baseline-dummy",
      title: "Baseline Heuristic Evaluation (DummyClassifier)",
      desc: "Verify model beats trivial majority-class heuristic benchmark before deploying complex algorithms.",
      code: `from sklearn.dummy import DummyClassifier
from sklearn.metrics import accuracy_score

dummy = DummyClassifier(strategy="most_frequent")
dummy.fit(X_train, y_train)
dummy_pred = dummy.predict(X_test)

print("Baseline Naive Accuracy:", accuracy_score(y_test, dummy_pred))
print("Model Pipeline Accuracy:", accuracy_score(y_test, y_pred))`
    },
    {
      category: "Training & Modeling",
      id: "recipe-linear-regression-train",
      title: "Linear Regression Data Split & Training",
      desc: "End-to-end split, fitting, and prediction with scikit-learn LinearRegression.",
      code: `from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression

X = df_clean.drop("charges_log", axis=1)
y = df_clean["charges_log"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.20, random_state=42
)

model = LinearRegression()
model.fit(X_train, y_train)
y_pred = model.predict(X_test)`
    },
    {
      category: "Training & Modeling",
      id: "recipe-candidate-imports",
      title: "Comprehensive Candidate Algorithms Import List",
      desc: "Full suite of classification algorithms for systematic benchmarking.",
      code: `# Linear & Stochastic Models
from sklearn.linear_model import (
    LogisticRegression, RidgeClassifier, SGDClassifier,
    Perceptron, PassiveAggressiveClassifier
)
# Nearest Neighbors & SVM
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC, LinearSVC

# Tree & Naive Bayes
from sklearn.tree import DecisionTreeClassifier
from sklearn.naive_bayes import GaussianNB

# Ensemble Models
from sklearn.ensemble import (
    RandomForestClassifier, ExtraTreesClassifier,
    GradientBoostingClassifier, HistGradientBoostingClassifier,
    AdaBoostClassifier, BaggingClassifier, StackingClassifier
)
from xgboost import XGBClassifier
from lightgbm import LGBMClassifier`
    },
    {
      category: "Training & Modeling",
      id: "recipe-random-forest-grid",
      title: "Random Forest Hyperparameter Tuning with GridSearchCV",
      desc: "Tune trees count, depth, and min samples split inside 5-fold cross-validation.",
      code: `from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import GridSearchCV, train_test_split

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

model_rf = RandomForestClassifier(bootstrap=True, random_state=42)
param_grid = {
    "n_estimators": [100, 200, 300],
    "max_depth": [5, 10, None],
    "min_samples_split": [2, 5, 10]
}

grid = GridSearchCV(model_rf, param_grid=param_grid, cv=5, scoring="accuracy", n_jobs=-1)
grid.fit(X_train, y_train)

print("Best Parameters:", grid.best_params_)
print("Best CV Score:", grid.best_score_)
best_rf = grid.best_estimator_`
    },
    {
      category: "Training & Modeling",
      id: "recipe-knn-grid",
      title: "K-Nearest Neighbors Grid Search in Pipeline",
      desc: "Tune neighbor counts, weightings, and distance metrics cleanly inside a scaler pipeline.",
      code: `from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.model_selection import GridSearchCV, train_test_split
from sklearn.neighbors import KNeighborsClassifier

pipeline = Pipeline([
    ("scaler", StandardScaler()),
    ("model", KNeighborsClassifier())
])

param_grid = {
    "model__n_neighbors": [3, 5, 7, 9, 11],
    "model__weights": ["uniform", "distance"],
    "model__metric": ["euclidean", "manhattan"]
}

grid = GridSearchCV(pipeline, param_grid=param_grid, cv=5, scoring="accuracy")
grid.fit(X_train, y_train)

print("Best KNN Params:", grid.best_params_)
print("Best Score:", grid.best_score_)
best_knn = grid.best_estimator_`
    },
    {
      category: "Training & Modeling",
      id: "recipe-learning-curve",
      title: "Diagnostic Learning Curve Display",
      desc: "Plot sample efficiency and detect high bias (underfitting) vs high variance (overfitting).",
      code: `import matplotlib.pyplot as plt
from sklearn.model_selection import LearningCurveDisplay

LearningCurveDisplay.from_estimator(
    best_model,
    X,
    y,
    cv=5,
    scoring="accuracy",
    train_sizes=np.linspace(0.1, 1.0, 5)
)
plt.title("Model Learning Curve Diagnostics")
plt.grid(True)
plt.show()`
    },
    {
      category: "Training & Modeling",
      id: "recipe-stacking-classifier",
      title: "Stacking Classifier Pipeline",
      desc: "Combine diverse base learners (DecisionTree, SVM, KNN) into a meta Logistic Regression estimator.",
      code: `from sklearn.ensemble import StackingClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.svm import SVC
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.metrics import accuracy_score, classification_report

# Base learners
base_models = [
    ("dt", DecisionTreeClassifier(random_state=42)),
    ("svm", SVC(probability=True, random_state=42))
]
meta_model = LogisticRegression(max_iter=1000)

stack = StackingClassifier(
    estimators=base_models,
    final_estimator=meta_model,
    cv=5
)

pipeline = Pipeline([
    ("scaler", StandardScaler()),
    ("model", stack)
])

pipeline.fit(X_train, y_train)
y_pred = pipeline.predict(X_test)
print("Stacked Model Accuracy:", accuracy_score(y_test, y_pred))
print(classification_report(y_test, y_pred))`
    },
    {
      category: "Training & Modeling",
      id: "recipe-advanced-stacked-ensemble",
      title: "Advanced Ensemble: Tuned RF + XGBoost + LightGBM Stacking",
      desc: "Individually optimize RF, XGBoost, and LightGBM with GridSearch, then stack their best estimators.",
      code: `import pandas as pd
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.ensemble import RandomForestClassifier, StackingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report
from xgboost import XGBClassifier
from lightgbm import LGBMClassifier

# 1. Tune Random Forest
rf_grid = GridSearchCV(
    RandomForestClassifier(random_state=42),
    {"n_estimators": [100, 200], "max_depth": [5, 10]},
    cv=5, scoring="accuracy", n_jobs=-1
).fit(X_train, y_train)
best_rf = rf_grid.best_estimator_

# 2. Tune XGBoost
xgb_grid = GridSearchCV(
    XGBClassifier(random_state=42, eval_metric="mlogloss"),
    {"n_estimators": [100, 200], "max_depth": [3, 5], "learning_rate": [0.01, 0.1]},
    cv=5, scoring="accuracy", n_jobs=-1
).fit(X_train, y_train)
best_xgb = xgb_grid.best_estimator_

# 3. Tune LightGBM
lgbm_grid = GridSearchCV(
    LGBMClassifier(random_state=42),
    {"n_estimators": [100, 200], "learning_rate": [0.01, 0.1], "num_leaves": [31, 50]},
    cv=5, scoring="accuracy", n_jobs=-1
).fit(X_train, y_train)
best_lgbm = lgbm_grid.best_estimator_

# 4. Stack Best Estimators
base_models = [
    ("rf", best_rf),
    ("xgb", best_xgb),
    ("lgbm", best_lgbm)
]
stack = StackingClassifier(
    estimators=base_models,
    final_estimator=LogisticRegression(max_iter=1000),
    cv=5, n_jobs=-1
)
stack.fit(X_train, y_train)
y_pred = stack.predict(X_test)

print("Final Stacked Accuracy:", accuracy_score(y_test, y_pred))
print(classification_report(y_test, y_pred))`
    },

    // Evaluation & Diagnostics Recipes
    {
      category: "Model Evaluation",
      id: "recipe-regression-metrics",
      title: "Regression Metrics & Adjusted R²",
      desc: "Compute MAE, MSE, RMSE, R² Score, and Adjusted R² for continuous predictions.",
      code: `import numpy as np
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

mae = mean_absolute_error(y_test, y_pred)
mse = mean_squared_error(y_test, y_pred)
rmse = np.sqrt(mse)
r2 = r2_score(y_test, y_pred)

# Adjusted R² Calculation
n = X_test.shape[0]  # Number of samples
p = X_test.shape[1]  # Number of predictors
adjusted_r2 = 1 - ((1 - r2) * (n - 1) / (n - p - 1))

print(f"MAE:  {mae:.4f}")
print(f"MSE:  {mse:.4f}")
print(f"RMSE: {rmse:.4f}")
print(f"R²:   {r2:.4f}")
print(f"Adjusted R²: {adjusted_r2:.4f}")`
    },
    {
      category: "Model Evaluation",
      id: "recipe-residual-plots",
      title: "Residual Error Diagnostics & Scatter Plots",
      desc: "Plot residuals distribution and residual vs predicted scatter plot to diagnose heteroscedasticity.",
      code: `import matplotlib.pyplot as plt
import seaborn as sns

residuals = y_test - y_pred

fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# Plot 1: Residuals vs Predicted
sns.scatterplot(x=y_pred, y=residuals, ax=axes[0])
axes[0].axhline(0, color="red", linestyle="--")
axes[0].set_xlabel("Predicted Values")
axes[0].set_ylabel("Residuals (y_test - y_pred)")
axes[0].set_title("Residuals vs Predicted (Check Homoscedasticity)")

# Plot 2: Residuals Distribution
sns.histplot(residuals, kde=True, ax=axes[1])
axes[1].set_title("Residuals Distribution (Gaussian Check)")

plt.tight_layout()
plt.show()`
    },
    {
      category: "Model Evaluation",
      id: "recipe-actual-vs-predicted-graph",
      title: "Actual vs Predicted Line Graph Comparison",
      desc: "Visual sequence plot tracking actual target values vs predicted output line.",
      code: `import matplotlib.pyplot as plt
import seaborn as sns

plt.figure(figsize=(10, 5))
sns.lineplot(x=range(len(y_test)), y=y_test.values, marker="o", label="Actual")
sns.lineplot(x=range(len(y_pred)), y=y_pred, marker="x", label="Predicted")
plt.xlabel("Sample Index")
plt.ylabel("Target Value")
plt.title("Actual vs Predicted Comparison")
plt.legend()
plt.grid(True)
plt.show()`
    },
    {
      category: "Model Evaluation",
      id: "recipe-classification-eval",
      title: "Classification Metrics: Confusion Matrix & Report",
      desc: "Accuracy score, Confusion matrix, and full precision/recall/F1 report.",
      code: `from sklearn.metrics import accuracy_score, confusion_matrix, classification_report

print("Accuracy:", accuracy_score(y_test, y_pred))
print("\nConfusion Matrix:\n", confusion_matrix(y_test, y_pred))
print("\nClassification Report:\n", classification_report(y_test, y_pred))`
    },
    {
      category: "Model Evaluation",
      id: "recipe-logistic-coefficients",
      title: "Logistic Regression Feature Coefficients Ranking",
      desc: "Rank predictive features by magnitude of learned logistic regression coefficients.",
      code: `import pandas as pd

coef = pd.DataFrame({
    "Feature": X.columns,
    "Coefficient": model.coef_[0]
})
coef = coef.sort_values(by="Coefficient", key=abs, ascending=False)
print("Top Feature Weights:\n", coef)`
    },
    {
      category: "Model Evaluation",
      id: "recipe-roc-curve-plot",
      title: "ROC Curve & ROC-AUC Score Plot",
      desc: "Compute probabilities, false positive rate, true positive rate, and plot ROC curve.",
      code: `import matplotlib.pyplot as plt
from sklearn.metrics import roc_curve, roc_auc_score

# Extract predicted probabilities for positive class
y_prob = model.predict_proba(X_test)[:, 1]

# Calculate ROC metrics
fpr, tpr, thresholds = roc_curve(y_test, y_prob)
roc_auc = roc_auc_score(y_test, y_prob)

plt.figure(figsize=(8, 6))
plt.plot(fpr, tpr, label=f"ROC Curve (AUC = {roc_auc:.4f})", color="blue")
plt.plot([0, 1], [0, 1], linestyle="--", color="gray", label="Random Guess")
plt.xlabel("False Positive Rate")
plt.ylabel("True Positive Rate")
plt.title("Receiver Operating Characteristic (ROC)")
plt.legend()
plt.grid(True)
plt.show()

print("ROC-AUC Score:", roc_auc)`
    },

    // Production & Logging
    {
      category: "Production & Deployment",
      id: "recipe-production-logging",
      title: "Production Pipeline Logging Configuration",
      desc: "Setup standard file logging with timestamps and log level severity.",
      code: `import logging

logging.basicConfig(
    filename="all_ml.log",
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

logging.info("Model pipeline execution started")
logging.info(f"Loaded {len(df)} records for inference")`
    }
  ]
};

// Default Sample Dataset Template
const DEFAULT_PROJECTS = [
  {
    id: "proj_default_1",
    name: "Customer Churn Prediction (Production Pipeline)",
    taskType: "Binary Classification",
    targetCol: "churn_status",
    rowCount: "75,000",
    colCount: "28",
    description: "Predicting customer subscription cancellation within next 30 days to trigger retention campaigns.",
    createdAt: new Date().toISOString(),
    checkedItems: {
      "mt-1": { status: "done", note: "Business goal: reduce churn by 15%. Metric: PR-AUC due to 6% churn rate. Baseline: predict majority class." },
      "mt-2": { status: "done", note: "Extracted from Snowflake customer_events table. Observation: 2024-2025." },
      "mt-3": { status: "done", note: "Validated customer_id UUID format and tenure >= 0." },
      "eda-1": { status: "done", note: "Loaded successfully via Parquet connector." },
      "eda-2": { status: "done", note: "75,000 rows x 28 columns verified." },
      "eda-6": { status: "done", note: "monthly_spend has 1.2% nulls; total_calls has 0.1% nulls." },
      "eda-17": { status: "done", note: "Severe class imbalance: 94% retained, 6% churned." },
      "prep-1": { status: "done", note: "Raw Parquet copy archived in data/raw/ with SHA-256 hash." },
      "prep-2": { status: "done", note: "Schema asserted: 28 required columns present with expected dtypes." }
    }
  }
];

