// Auto-generated from the existing portfolio markup during the Next.js migration.
// Rendered via dangerouslySetInnerHTML inside app/portfolio/page.tsx -- the content itself
// is authored HTML (not user input), and the inline scripts that used to run alongside it
// (nav scroll-spy, scroll-reveal, black hole canvas) have been ported to real React
// hooks/components instead of being embedded as <script> tags.

export const NAV_HTML = `<nav class="rail" aria-label="Section navigation">
  <div class="rail-inner">
    <a href="#top" class="rail-mark">Satvik Saluja</a>
    <div class="rail-links">
      <span class="eyebrow rail-eyebrow">Index</span>
      <a href="#research" class="rail-link">Research</a>
      <a href="#experience" class="rail-link">Experience</a>
      <a href="#projects" class="rail-link">Selected Projects</a>
      <a href="#interests" class="rail-link">Research Interests</a>
      <a href="#cv" class="rail-link">CV</a>
      <a href="#contact" class="rail-link">Contact</a>
    </div>
    <div class="rail-foot">
      <a href="https://github.com/SatvikSaluja" target="_blank" rel="noopener">GitHub ↗</a>
      <a href="https://www.linkedin.com/in/satvik-saluja/" target="_blank" rel="noopener">LinkedIn ↗</a>
    </div>
  </div>
</nav>
`;

export const PAGE_CONTENT_HTML = `  <!-- ============ 1. HERO ============ -->
  <header class="intro" id="top">
    <span class="eyebrow">Research Portfolio</span>
    <h1>Satvik Saluja</h1>
    <p class="role">Computational Biology · AI · Biomedical Research</p>
    <p class="lede">I work at the intersection of computational/AI methods and biological systems — building neural architectures that encode the physical and biological constraints they model, then studying how those systems adapt and where their behavior qualitatively shifts. My work spans metabolic and organoid simulation, molecular design, computational neuroscience, and retrieval-grounded biomedical AI.</p>
    <p class="idlinks">
      <a href="mailto:satviksaluja2507@gmail.com">Email</a><span class="sep">·</span><a href="https://github.com/SatvikSaluja" target="_blank" rel="noopener">GitHub</a><span class="sep">·</span><a href="https://www.linkedin.com/in/satvik-saluja/" target="_blank" rel="noopener">LinkedIn</a><span class="sep">·</span><a href="https://summerofcode.withgoogle.com/programs/2026/projects/N3X7QDzg" target="_blank" rel="noopener">GSoC 2026 Archive</a>
    </p>
  </header>

  <!-- ============ 2. RESEARCH ============ -->
  <section id="research">
    <div class="section-head">
      <span class="eyebrow">Research</span>
      <h2>Constraint-aware graph learning, across scales</h2>
    </div>

    <div class="thesis-body measure">
      <p>Most "physics-informed" neural networks encode domain knowledge as a soft penalty in the loss function — a preference the model can still violate if it's undertrained or pushed off-distribution. My work takes a different approach: encode the constraint as an <strong>architectural operation the network cannot violate</strong>, whatever it learns. A stoichiometric null-space projection cannot leak mass. A directionality gate cannot let an irreversible reaction run backward. The guarantee comes from linear algebra, not from training convergence.</p>
      <p>The same toolkit — hard architectural constraints, elastic-weight-consolidated online adaptation, and Jacobian-norm bifurcation detection — recurs across three independent biological simulators: a multi-well organoid-monitoring system fusing biosensor data, a metabolic flux surrogate built from scratch, and a cortical-microcircuit surrogate built on connectivity internals I already maintain through my Google Summer of Code work. Related projects extend this same scientific-ML mindset — evidence and uncertainty over convenience — to autonomous molecular discovery and retrieval-grounded biomedical AI.</p>
    </div>

    <div class="mechanism" role="img" aria-label="Diagram: a raw flux prediction passes through a fixed null-space projection to become a conservation-valid output">
      <div class="step"><span class="step-num">01</span><b>Raw prediction</b><span class="step-desc">GNN flux output, no guarantee of mass balance</span></div>
      <div class="arrow" aria-hidden="true">→</div>
      <div class="step"><span class="step-num">02</span><b>Fixed projection</b><span class="step-desc">onto null(S), computed once via SVD, offline</span></div>
      <div class="arrow" aria-hidden="true">→</div>
      <div class="step"><span class="step-num">03</span><b>Valid output</b><span class="step-desc">conservation-valid by construction, not by training</span></div>
    </div>

    <div>
      <span class="eyebrow" style="margin-bottom:4px;">The same mechanisms, three domains</span>
      <div class="tblwrap">
        <table class="method">
          <thead>
            <tr><th>Mechanism</th><th>OrganoidTwin — organoid systems</th><th>Cell Digital Twin — metabolism</th><th>HNN-Core surrogate — cortical circuits</th></tr>
          </thead>
          <tbody>
            <tr>
              <th>Hard architectural constraint</th>
              <td data-label="OrganoidTwin — organoid systems">An auxiliary O₂/lactate flux head tied to the health-score head by a hard stoichiometric constraint, not a soft loss term.</td>
              <td data-label="Cell Digital Twin — metabolism">SVD-derived null-space projection of the stoichiometric matrix, applied inside the forward pass; a KEGG reversibility mask gates directionality via activation choice (β=6 vs β=1 softplus).</td>
              <td data-label="HNN-Core surrogate — cortical circuits">Dale's-law and non-negative-delay constraints enforced as architectural gates on synaptic weight and delay outputs, not as training penalties.</td>
            </tr>
            <tr>
              <th>Online continual adaptation</th>
              <td data-label="OrganoidTwin — organoid systems">EWC fine-tuning on live-streamed plate conditions; the regularization strength was empirically retuned by ~6 orders of magnitude from the textbook default for this model's gradient scale.</td>
              <td data-label="Cell Digital Twin — metabolism">EWC fine-tuning on live (glucose, O₂, enzyme, temperature) regimes streamed over WebSocket, Fisher-weighted against catastrophic forgetting.</td>
              <td data-label="HNN-Core surrogate — cortical circuits">EWC fine-tuning as new drive patterns and connectivity configurations are explored — no retraining from scratch per regime.</td>
            </tr>
            <tr>
              <th>Regime-transition detection</th>
              <td data-label="OrganoidTwin — organoid systems">Jacobian-sensitivity bifurcation detector calibrated from known-healthy reference periods; ~14-hour median lead time ahead of ground-truth decline onset.</td>
              <td data-label="Cell Digital Twin — metabolism">‖∂flux/∂env‖ via autograd Jacobian; adaptive z-score threshold flags shifts like aerobic → Warburg-like fermentation.</td>
              <td data-label="HNN-Core surrogate — cortical circuits">Same Jacobian-norm probe, targeting shifts in dominant oscillatory frequency or onset of pathological synchrony.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <!-- ============ 3. EXPERIENCE ============ -->
  <section id="experience">
    <div class="section-head">
      <span class="eyebrow">Experience</span>
      <h2>Research Experience</h2>
    </div>

    <article class="entry">
      <div class="entry-head">
        <div class="entry-head-top">
          <h3>Computational Neuroscience Research Contributor</h3>
          <span class="pill pill--built">May 2026 – Aug 2026</span>
        </div>
        <p class="entry-org">Google Summer of Code 2026 · INCF — HNN-Core</p>
      </div>
      <p class="entry-sub">Research project: refactoring the synaptic connectivity architecture of a biophysical neural simulation library used across computational neuroscience research groups.</p>

      <div class="stat-row">
        <div class="stat"><b class="tnum">16</b><span>Connection rules audited</span></div>
        <div class="stat"><b class="tnum">5</b><span>Person maintainer team</span></div>
        <div class="stat"><b class="tnum">0</b><span>Behavioral disturbance post-refactor</span></div>
      </div>

      <span class="blocklabel">Methodology &amp; contribution</span>
      <ul class="bullets">
        <li>Redesigned HNN-Core's synaptic connectivity architecture, migrating from nested dictionaries to a structured per-synapse DataFrame to support new probabilistic connectivity features.</li>
        <li>Diagnosed and resolved a simulation-correctness bug causing divergence in simulated dipole output — traced to synapse-deduplication logic across 16 network connection rules, then validated the fix against the pre-refactor reference implementation with zero behavioral disturbance, preserving scientific backward compatibility.</li>
        <li>Built backward-compatible support for absolute point-to-point connectivity, so existing HNN-Core workflows kept working through the transition.</li>
        <li>Co-designed the new connectivity architecture with a 5-person INCF/HNN-Core maintainer team, balancing new probabilistic/Gaussian connectivity requirements against strict backward-compatibility constraints on an actively used simulation platform.</li>
      </ul>

      <span class="blocklabel">Methods &amp; technologies</span>
      <p class="stack-line">Python · HNN-Core · NEURON · pandas · connectivity architecture</p>

      <p class="entry-links">
        <a href="https://github.com/SatvikSaluja/hnn-core" target="_blank" rel="noopener">hnn-core fork →</a>
        <a href="https://summerofcode.withgoogle.com/programs/2026/projects/N3X7QDzg" target="_blank" rel="noopener">GSoC 2026 Archive →</a>
      </p>
    </article>
  </section>

  <!-- ============ 4. SELECTED PROJECTS ============ -->
  <section id="projects">
    <div class="section-head">
      <span class="eyebrow">Selected Projects</span>
      <h2>Selected Projects</h2>
      <p class="lede">Featured research projects first, leading with the most rigorously validated — followed by additional research work and smaller applied technical work. Live links and repositories are being finalized; implementations and supporting materials are available on request.</p>
    </div>

    <div class="subsection">
      <span class="subsection-label">Featured Research Projects</span>

      <div class="entry-grid">

      <!-- Project 0 -->
      <article class="entry">
        <div class="entry-head">
          <div class="entry-head-top">
            <h3>OrganoidTwin</h3>
            <div class="icon-links icon-links-top">
              <a class="icon-link" href="https://organoid-twin.netlify.app/" target="_blank" rel="noopener"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6.5 3H3.5A1.5 1.5 0 0 0 2 4.5v8A1.5 1.5 0 0 0 3.5 14h8a1.5 1.5 0 0 0 1.5-1.5V9.5"/><path d="M9.5 2H14v4.5"/><path d="M14 2 7 9"/></svg>View live</a>
              <a class="icon-link" href="https://github.com/SatvikSaluja/Organoid_twin" target="_blank" rel="noopener"><svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg>GitHub</a>
            </div>
          </div>
          <p class="entry-domain">Organoid Systems · Biosensor Fusion · Computational Biology</p>
        </div>
        <p class="entry-sub">A graph neural network that fuses multi-sensor biosensor data to monitor simulated organoid cultures in real time, flag early decline, and test whether automated intervention actually improves outcomes.</p>

        <span class="blocklabel">Approach</span>
        <ul class="bullets">
          <li>Built a biologically-grounded simulation from scratch: a metabolic flux model tracking glucose, oxygen, and lactate per well, including a Warburg-shift mechanism and two mechanistically distinct decline pathways — reversible substrate limitation vs. permanent adverse-event damage.</li>
          <li>Simulated realistic noisy, laggy sensor readings (pH, dissolved O₂, glucose/lactate proxy, impedance) from that hidden ground truth, so the model only ever sees what a real deployment would see.</li>
          <li>A custom graph neural network — a temporal GRU encoder feeding a hand-implemented dense GATv2 attention layer, no external graph library — fusing all four sensor streams across a 24-well plate simultaneously, with multi-task heads for health-score regression, an auxiliary O₂/lactate flux prediction tied to the health head by a hard stoichiometric constraint, and a 4-way root-cause classifier (healthy / oxygen-limited / glucose-limited / adverse event).</li>
          <li>MC-dropout for predictive uncertainty and a Jacobian-sensitivity bifurcation detector that flags early regime-shift warnings, calibrated from known-healthy reference periods rather than a live baseline.</li>
          <li>Elastic Weight Consolidation for continual learning, letting the model periodically fine-tune on live-streamed conditions without catastrophically forgetting its original training distribution.</li>
          <li>A rule-based recommendation engine driven by the learned cause classifier, benchmarked against a heuristic-only baseline.</li>
        </ul>

        <span class="blocklabel">Methods &amp; technologies</span>
        <p class="stack-line">Python · PyTorch · FastAPI · React · SQLAlchemy · WebSocket</p>
        <div class="stat-row">
          <div class="stat"><b class="tnum">0.64</b><span>Uncertainty–error correlation (Spearman)</span></div>
          <div class="stat"><b class="tnum">47.9%</b><span>Recommendation accuracy vs. 28.7% baseline</span></div>
          <div class="stat"><b>~14h</b><span>Median early-warning lead time</span></div>
        </div>

        <span class="blocklabel">Additional system capabilities</span>
        <ul class="bullets">
          <li>Closed-loop control arena — a 3-arm experiment (no control / model-driven / oracle) using Kaplan–Meier survival curves and a log-rank test, with a built-in negative control that validates the experiment design itself.</li>
          <li>Interactive control panel — inspect the model's attention weights across wells and preview "what-if" interventions by cloning the live simulation state.</li>
          <li>Drug-screening module — simulated dose-response plates with Hill-equation curves fit live via scipy.optimize.curve_fit.</li>
          <li>Real-data CSV ingestion with graceful degradation, plus SQLAlchemy-backed cohort analytics across experiment runs.</li>
        </ul>

        <span class="blocklabel">Result / contribution</span>
        <p class="result-text">A validated closed-loop monitoring system: the cause-classifier-driven recommendation engine outperforms a heuristic-only baseline (47.9% vs. 28.7% accuracy, n=94 flagged events), the uncertainty estimate correlates meaningfully with actual error (Spearman ρ=0.64, p&lt;0.001) though it under-covers relative to its nominal target, and the closed-loop control experiment includes a built-in negative control that behaves exactly as expected — validating the experiment design itself. All of this is demonstrated on a from-scratch synthetic simulation, not real lab data: the contribution is the system design — multi-modal sensor fusion, calibrated uncertainty, causal-attribution-driven control, and statistically rigorous experimentation with negative controls — not a biological finding.</p>
      </article>

      <!-- Project 1 -->
      <article class="entry">
        <div class="entry-head">
          <div class="entry-head-top">
            <h3>Cell Digital Twin</h3>
            <div class="icon-links icon-links-top">
              <a class="icon-link" href="https://tca-version-2.netlify.app/" target="_blank" rel="noopener"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6.5 3H3.5A1.5 1.5 0 0 0 2 4.5v8A1.5 1.5 0 0 0 3.5 14h8a1.5 1.5 0 0 0 1.5-1.5V9.5"/><path d="M9.5 2H14v4.5"/><path d="M14 2 7 9"/></svg>View live</a>
              <a class="icon-link" href="https://github.com/SatvikSaluja/TCA-Glycolysis-Metabolism-Pathway-Simulator" target="_blank" rel="noopener"><svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg>GitHub</a>
            </div>
          </div>
          <p class="entry-domain">Metabolism · Computational Biology</p>
        </div>
        <p class="entry-sub">Constraint-embedded graph neural networks for real-time metabolic flux inference.</p>

        <span class="blocklabel">Approach</span>
        <ul class="bullets">
          <li>A 3-layer GATv2 with FiLM-based environmental conditioning as a real-time neural surrogate for cellular metabolic state.</li>
          <li>Mass conservation as a hard architectural constraint: an SVD-derived stoichiometric null-space projection inside the forward pass, so every prediction is conservation-valid independent of training convergence — not a soft penalty an undertrained model could still violate.</li>
          <li>Thermodynamic directionality baked into the architecture: a KEGG-annotated reversibility mask selects a sharp (β=6) vs. gentle (β=1) softplus, enforcing irreversible-reaction behavior rather than hoping the network learns it from data.</li>
          <li>An online continual-learning loop with Elastic Weight Consolidation: the deployed model fine-tunes on newly observed (glucose, oxygen, enzyme, temperature) regimes streamed over WebSocket, Fisher-weighted against catastrophic forgetting.</li>
          <li>A Jacobian-norm regime-transition detector — ‖∂flux/∂env‖ via autograd — flagging qualitative shifts such as aerobic respiration → Warburg-like fermentation, using an adaptively calibrated statistical threshold.</li>
        </ul>

        <span class="blocklabel">Methods &amp; technologies</span>
        <p class="stack-line">PyTorch · PyTorch Geometric · GATv2 · FastAPI · WebSocket · Elastic Weight Consolidation</p>
        <div class="stat-row">
          <div class="stat"><b class="tnum">40+</b><span>Metabolites modeled</span></div>
          <div class="stat"><b class="tnum">30+</b><span>Enzymatic reactions</span></div>
          <div class="stat"><b>3-layer</b><span>GATv2 surrogate</span></div>
        </div>

        <span class="blocklabel">Result / contribution to date</span>
        <p class="result-text">The core surrogate is built and running, with conservation and directionality guaranteed architecturally rather than learned. Formal benchmarking against classical FBA is the next step — see the evaluation roadmap below.</p>

        <span class="blocklabel roadmap">Evaluation roadmap — planned, not yet run</span>
        <ul class="bullets">
          <li>Benchmark against classical FBA (COBRApy LP solve) on accuracy and inference latency, to quantify the speed/accuracy tradeoff against the gold-standard method.</li>
          <li>Ablation across hard-projection / soft-penalty / unconstrained variants, to show zero conservation violation by construction vs. non-zero for the soft-penalty case.</li>
          <li>EWC ablation: train on normoxic data, adapt online to hypoxic data, re-test on normoxic — with and without the EWC penalty — to isolate catastrophic forgetting.</li>
          <li>Bifurcation validation: sweep random (glucose, enzyme, temperature) conditions and report detector true-positive rate at the aerobic/Warburg boundary (O₂ ≈ 0.02–0.10) against the false-positive rate elsewhere.</li>
        </ul>
      </article>
      </div>
    </div>

    <div class="subsection">
      <span class="subsection-label">Additional Research Projects</span>

      <div class="entry-grid">

      <!-- Project 3 -->
      <article class="entry">
        <div class="entry-head">
          <div class="entry-head-top">
            <h3>HNN-Core Surrogate</h3>
            <div class="icon-links icon-links-top">
              <a class="icon-link" href="https://github.com/SatvikSaluja/hnn-core" target="_blank" rel="noopener"><svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg>GitHub</a>
            </div>
          </div>
          <p class="entry-domain">Cortical Circuits · Computational Neuroscience</p>
        </div>
        <p class="entry-sub">A constrained, continually-adapting differentiable surrogate for cortical microcircuit dynamics.</p>

        <span class="blocklabel">Approach</span>
        <ul class="bullets">
          <li>A graph representation of the cortical microcircuit — cell populations/compartments as nodes, synaptic connections as edges — using the per-synapse connectivity DataFrame (source/target GID, section, segment, receptor, weight) I designed during my GSoC refactor of HNN-Core.</li>
          <li>Hard biophysical constraints as architectural gates, mirroring Project 1's directionality gate: Dale's Law (a cell's outgoing synapses are all-excitatory or all-inhibitory) and non-negative conduction delays, enforced structurally rather than through a soft penalty.</li>
          <li>EWC-based continual adaptation as new drive patterns or connectivity configurations are explored, reusing Project 1's EWC machinery on a different model family.</li>
          <li>A Jacobian-based bifurcation detector aimed at transitions between qualitatively different oscillatory regimes — the same probe as Project 1, applied to a system where "regime change" already has direct scientific meaning.</li>
        </ul>

        <span class="blocklabel">Methods &amp; technologies</span>
        <p class="stack-line">PyTorch Geometric · HNN-Core · NEURON · Elastic Weight Consolidation</p>
        <div class="stat-row">
          <div class="stat"><b class="tnum">2</b><span>Hard biophysical constraints</span></div>
          <div class="stat"><b>Reused</b><span>Project 1's EWC + Jacobian toolkit</span></div>
        </div>

        <span class="blocklabel">Result / contribution to date</span>
        <p class="result-text">Built directly on connectivity internals from my GSoC refactor of HNN-Core, which substantially de-risks the data-generation and domain-correctness problem that usually makes this kind of project hard. Architecture design is underway; no simulation results yet.</p>

        <p class="entry-links"><a href="https://github.com/SatvikSaluja/hnn-core" target="_blank" rel="noopener">GSoC connectivity work this builds on →</a></p>

        <span class="blocklabel roadmap">Evaluation roadmap — planned, not yet run</span>
        <ul class="bullets">
          <li>Speed/accuracy tradeoff against real hnn-core simulation runs, using my own GSoC branch to generate fast, correct ground-truth training data.</li>
          <li>Ablation confirming the hard biophysical constraints (Dale's Law, non-negative delays) are never violated, against a soft-penalty baseline.</li>
          <li>Validate the bifurcation detector against a documented oscillatory-regime shift in hnn-core under a specific drive-parameter sweep.</li>
        </ul>
      </article>
      <!-- Project 4 -->
      <article class="entry">
        <div class="entry-head">
          <div class="entry-head-top">
            <h3>ML-Based Prediction of CVD-Grown 2D Material Quality</h3>
            <div class="icon-links icon-links-top">
              <a class="icon-link" href="https://github.com/SatvikSaluja" target="_blank" rel="noopener"><svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg>GitHub</a>
            </div>
          </div>
          <p class="entry-domain">Materials Science · Applied ML</p>
        </div>
        <p class="entry-sub">Predicting 2D semiconductor material quality directly from CVD growth-chamber parameters, replacing trial-and-error tuning with data-driven prediction.</p>

        <span class="blocklabel">Approach</span>
        <ul class="bullets">
          <li>Engineered a 9-parameter synthesis feature set (growth temperature 650–850°C, chamber pressure 50–760 Torr, precursor/Ar/H₂ flow, growth time, substrate and heating conditions) mapped to 8 quantitative quality outputs.</li>
          <li>Benchmarked Random Forest, XGBoost, SVR, and neural-network regressors under cross-validation.</li>
          <li>Used SHAP feature-importance analysis to identify growth temperature and precursor flow as the dominant drivers of domain size, coverage, Raman signatures, and defect density.</li>
        </ul>

        <span class="blocklabel">Methods &amp; technologies</span>
        <p class="stack-line">Random Forest · XGBoost · SVR · Neural Network Regression · SHAP · Python</p>
        <div class="stat-row">
          <div class="stat"><b class="tnum">9</b><span>Growth parameters modeled</span></div>
          <div class="stat"><b class="tnum">87/100</b><span>Held-out quality score</span></div>
          <div class="stat"><b class="tnum">78%</b><span>Predicted coverage</span></div>
        </div>

        <span class="blocklabel">Result / contribution</span>
        <p class="result-text">Validated the pipeline on held-out conditions (750°C, 500 Torr, 8 sccm precursor, 20 min) → predicted 12.4 µm domain size, 78% coverage, 9.8 cm⁻¹ FWHM, 1.4×10⁹ defects/cm², quality score 87/100.</p>
      </article>

      <!-- Project 5 -->
      <article class="entry">
        <div class="entry-head">
          <div class="entry-head-top">
            <h3>Bayesian Optimization of CVD Growth Conditions</h3>
            <div class="icon-links icon-links-top">
              <a class="icon-link" href="https://github.com/SatvikSaluja" target="_blank" rel="noopener"><svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg>GitHub</a>
            </div>
          </div>
          <p class="entry-domain">Materials Science · Bayesian ML</p>
        </div>
        <p class="entry-sub">Minimizing the number of experiments needed to reach a target CVD material-quality threshold.</p>

        <span class="blocklabel">Approach</span>
        <ul class="bullets">
          <li>Trained a Gaussian Process surrogate model on 20–50 initial CVD runs across 9 process variables.</li>
          <li>Used a Bayesian acquisition function to select the next most-informative experiment, updating the model with each run's microscopy/Raman results.</li>
          <li>Formulated a multi-objective target maximizing domain size, coverage, and Raman quality while minimizing defect density and FWHM, targeting a quality score above 90/100.</li>
        </ul>

        <span class="blocklabel">Methods &amp; technologies</span>
        <p class="stack-line">Gaussian Process Regression · Bayesian Optimization · Python</p>
        <div class="stat-row">
          <div class="stat"><b class="tnum">94/100</b><span>Recommended-condition quality score</span></div>
          <div class="stat"><b class="tnum">89%</b><span>Predicted coverage</span></div>
          <div class="stat"><b>20–50</b><span>Initial CVD runs</span></div>
        </div>

        <span class="blocklabel">Result / contribution</span>
        <p class="result-text">Reached a recommended condition (772°C, 410 Torr, 24 min) predicting 17.8 µm domain size, 89% coverage, quality score 94/100 — benchmarked against random/grid search on experiments-to-threshold.</p>
      </article>

      <!-- Project 6 -->
      <article class="entry">
        <div class="entry-head">
          <div class="entry-head-top">
            <h3>Evidence-Grounded Clinical RAG System</h3>
            <div class="icon-links icon-links-top">
              <a class="icon-link" href="https://clinical-rag-frontend.onrender.com/" target="_blank" rel="noopener"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6.5 3H3.5A1.5 1.5 0 0 0 2 4.5v8A1.5 1.5 0 0 0 3.5 14h8a1.5 1.5 0 0 0 1.5-1.5V9.5"/><path d="M9.5 2H14v4.5"/><path d="M14 2 7 9"/></svg>View live</a>
              <a class="icon-link" href="https://github.com/SatvikSaluja/Clinical_RAG" target="_blank" rel="noopener"><svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg>GitHub</a>
            </div>
          </div>
          <p class="entry-domain">Biomedical AI · Retrieval-Augmented Generation</p>
        </div>
        <p class="entry-sub">A longitudinal clinical RAG pipeline that grounds patient-specific responses in verifiable biomedical literature and clinical guidelines.</p>

        <span class="blocklabel">Approach</span>
        <ul class="bullets">
          <li>Built a hybrid retrieval pipeline (BM25 + dense embedding retrieval + cross-encoder reranking) surfacing the top 5–20 most relevant evidence sources per query, integrated with 10–30 lab measurements, 1–10 medications, and 5–20 history events per patient.</li>
          <li>Implemented claim-level verification classifying each generated claim as supported, contradicted, or unsupported against retrieved evidence, to flag unreliable outputs before they reach a clinician.</li>
        </ul>

        <span class="blocklabel">Methods &amp; technologies</span>
        <p class="stack-line">BM25 · Dense Retrieval · Cross-Encoder Reranking · Retrieval-Augmented Generation · Python</p>
        <div class="stat-row">
          <div class="stat"><b class="tnum">81%</b><span>Recall@5, target</span></div>
          <div class="stat"><b class="tnum">85%</b><span>Citation accuracy, target</span></div>
          <div class="stat"><b class="tnum">13%</b><span>Hallucination rate, target</span></div>
        </div>

        <span class="blocklabel">Result / contribution</span>
        <p class="result-text">Targeted rigorous quality bars across biomedical evaluation queries: 81% Recall@5, 85% citation accuracy, 82% supported-claim rate, and 13% hallucination rate.</p>
      </article>
      </div>
    </div>

    <div class="subsection">
      <span class="subsection-label">Other Technical Work</span>
      <div class="earlier-list">
        <div class="earlier-item">
          <div class="role">Cognitive state simulator</div>
          <h4>NeuroODE</h4>
          <p class="desc">Neural-ODE model of continuous cognitive-state evolution (attention, fatigue, stress) from EEG — learns dS/dt = f(S, U, θ) with torchdiffeq (dopri5) instead of discrete-step prediction.</p>
          <p class="stack-line"><b>Stack —</b> PyTorch · Neural ODE · EEG</p>
          <div class="icon-links">
            <a class="icon-link" href="https://neuro-ode.onrender.com/" target="_blank" rel="noopener"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6.5 3H3.5A1.5 1.5 0 0 0 2 4.5v8A1.5 1.5 0 0 0 3.5 14h8a1.5 1.5 0 0 0 1.5-1.5V9.5"/><path d="M9.5 2H14v4.5"/><path d="M14 2 7 9"/></svg>View live</a>
            <a class="icon-link" href="https://github.com/SatvikSaluja/Neuro-ODE" target="_blank" rel="noopener"><svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg>GitHub</a>
          </div>
        </div>

        <div class="earlier-item">
          <div class="role">Diagnostic tooling</div>
          <h4>HNN Validation &amp; Integrity Framework</h4>
          <p class="desc">Separates HNN-Core simulation execution from validation logic, auditing peak latency and configuration consistency to catch inconsistent simulation outputs. Direct precursor to the GSoC connectivity work.</p>
          <p class="stack-line"><b>Stack —</b> Python · NumPy · HNN-Core</p>
          <div class="icon-links">
            <a class="icon-link" href="https://github.com/SatvikSaluja/hnn_simulation" target="_blank" rel="noopener"><svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg>GitHub</a>
          </div>
        </div>

        <div class="earlier-item">
          <div class="role">Metabolic pathway modeling</div>
          <h4>TCA + PPP + Glycolysis Simulator</h4>
          <p class="desc">Systems-level biochemical model coupling glycolysis, the pentose phosphate pathway, and the TCA cycle — tracks flux, energy balance, and cofactor dynamics with conserved ATP/NAD pools, validated with pytest-based stoichiometric tests. This original build was later rebuilt into Cell Digital Twin's constrained GNN surrogate above.</p>
          <p class="stack-line"><b>Stack —</b> Python · RK4 · pytest</p>
          <div class="icon-links">
            <a class="icon-link" href="https://serene-wisp-ce0176.netlify.app/" target="_blank" rel="noopener"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6.5 3H3.5A1.5 1.5 0 0 0 2 4.5v8A1.5 1.5 0 0 0 3.5 14h8a1.5 1.5 0 0 0 1.5-1.5V9.5"/><path d="M9.5 2H14v4.5"/><path d="M14 2 7 9"/></svg>View live</a>
            <a class="icon-link" href="https://github.com/SatvikSaluja/TCA-PPP-glycolysis-simulation" target="_blank" rel="noopener"><svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg>GitHub</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ 5. RESEARCH INTERESTS ============ -->
  <section id="interests">
    <div class="section-head">
      <span class="eyebrow">Research Interests</span>
      <h2>Research Interests</h2>
    </div>
    <div class="chips">
      <span class="chip">Scientific Machine Learning</span>
      <span class="chip">Computational Biology</span>
      <span class="chip">AI for Biomedical Systems</span>
      <span class="chip">Multimodal Biological Signal Analysis</span>
      <span class="chip">Graph Neural Networks</span>
      <span class="chip">Real-Time Biological Modeling</span>
      <span class="chip">Organoid Systems</span>
    </div>
  </section>

  <!-- ============ 6. CV ============ -->
  <section id="cv">
    <div class="section-head">
      <span class="eyebrow">CV</span>
      <h2>CV</h2>
      <p class="lede">Education and technical toolkit. <a href="/Satvik_Saluja_CV.docx" download>Download the full CV</a>.</p>
    </div>

    <div class="subsection">
      <span class="subsection-label">Education</span>
      <div class="edu measure">
        <h3>Jaypee Institute of Information Technology (JIIT), Noida</h3>
        <p class="edu-meta">B.Tech in Biotechnology, Minor in Artificial Intelligence &amp; Machine Learning · Expected 2028 · CGPA 8.8 / 10</p>
        <p class="edu-note"><b>Laboratory &amp; experimental training —</b> A/A+ across Basic Bioscience, Biochemical Techniques, Thermodynamics &amp; Chemical Processes, Genetics &amp; Developmental Biology, Microbiology, and Immunology (4 A+, 2 A); Bioinformatics Lab — A.</p>
      </div>
    </div>

    <div class="subsection">
      <span class="subsection-label">Technical Toolkit</span>
      <div class="skill-grid">
        <div class="skill-row">
          <span class="label">ML &amp; scientific ML</span>
          <span class="items">PyTorch, PyTorch Geometric, graph neural networks, GATv2, continual learning (EWC), uncertainty modeling, agentic LLM systems</span>
        </div>
        <div class="skill-row">
          <span class="label">ML optimization &amp; retrieval</span>
          <span class="items">Random Forest, XGBoost, SVR, Gaussian Process Regression, Bayesian Optimization, SHAP, Retrieval-Augmented Generation (RAG), BM25, dense retrieval, cross-encoder reranking</span>
        </div>
        <div class="skill-row">
          <span class="label">Computational biology</span>
          <span class="items">Flux balance analysis, metabolic modeling, stoichiometric modeling, KEGG, big data, computational neuroscience, NEURON / HNN-Core</span>
        </div>
        <div class="skill-row">
          <span class="label">Scientific computing</span>
          <span class="items">Python, NumPy, SciPy, pandas, FastAPI, WebSocket, Git</span>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ 7. CONTACT ============ -->
  <section id="contact">
    <div class="section-head">
      <span class="eyebrow">Contact</span>
      <h2>Get in touch</h2>
      <p class="lede">Open to research internships and collaborations at the intersection of computational biology and machine learning.</p>
    </div>
    <p class="contact-links">
      <a href="mailto:satviksaluja2507@gmail.com">satviksaluja2507@gmail.com</a>
      <a href="https://github.com/SatvikSaluja" target="_blank" rel="noopener">GitHub</a>
      <a href="https://www.linkedin.com/in/satvik-saluja/" target="_blank" rel="noopener">LinkedIn</a>
      <a href="https://summerofcode.withgoogle.com/programs/2026/projects/N3X7QDzg" target="_blank" rel="noopener">GSoC 2026 Archive</a>
    </p>
  </section>

  <footer>
    <span>Satvik Saluja — Computational Biology · AI · Biomedical Research</span>
    <span class="mono">Updated 2026</span>
  </footer>
`;
