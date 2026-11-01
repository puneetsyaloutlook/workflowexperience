/* Navigation tree and page content for the workflow experience design system.
   Each page has a slug, a title and a one-line summary. A page with children
   is a group page. An optional body holds HTML for the page. */
window.SITE = {
  name: "Workflow experience",
  tagline: "Principles, rules and patterns for designing the experience of workflows in which the work is automated.",
  nav: [
    { section: "Foundations" },
    {
      slug: "introduction",
      title: "Introduction",
      summary: "What workflow experience (WX) is, what the design system covers and how it relates to process design and workforce design.",
      body: "<p>WX (workflow experience) is the practice of designing a workflow for the people who take part in it. A workflow is designed to optimise work, which means automating some or all of it by some method, and automation changes what those people do, see, decide and answer for.</p><p>A workflow succeeds only if they still reach their goals, with a workload they can sustain, once the work is reorganised. In every workflow within scope, systems carry out some of the steps, whether they are fixed rules, trained models, AI agents or pipelines, and people direct, supervise, approve or take over.</p>",
      children: [
        {
          slug: "scope",
          title: "Scope",
          summary: "What the design system covers and what it leaves to other disciplines.",
          body: "<p>This design system covers WX only: principles, rules and reusable parts for designing the experience of a workflow. It does not cover how to build or train the systems. It does not cover process design or workforce design, which are separate disciplines that work in parallel with WX on the same product. It states what WX needs from each of them and what WX provides to each of them.</p>"
        },
        {
          slug: "wx-and-process-design",
          title: "WX and process design",
          summary: "What WX needs from process design, what it gives to process design and how the two disciplines work in parallel.",
          body: "<h2>Process design</h2><p>Process design decides how the work gets done: the steps, their sequence, the division of work between systems and people, and the targets. It succeeds when the process meets its aim, such as cost, speed, quality or risk. Its methods include process modelling, task analysis, function allocation, simulation, process mining and analytics on process measures. Process discovery from event logs, simulation of process changes and the business case for automation belong to process design.</p><h2>Where they are similar</h2><div class=\"pd-table-wrap\"><table class=\"pd-table\"><thead><tr><th scope=\"col\">Theme</th><th scope=\"col\">WX</th><th scope=\"col\">Process design</th></tr></thead><tbody><tr><th scope=\"row\">Current state research</th><td>Where the work exists today, studies how people do it, their pain points, what makes it succeed and their workarounds</td><td>Where the work exists today, studies the process: its steps, where it loses cost, time or quality, and what makes it succeed</td></tr><tr><th scope=\"row\">Ideation</th><td>Imagines how people and systems could share the work, what each person sees and decides, and how they hand over</td><td>Imagines the steps, their sequence and the division of work between systems and people</td></tr><tr><th scope=\"row\">Testing</th><td>Tests options with the people affected</td><td>Tests options by simulation</td></tr><tr><th scope=\"row\">Concept selection</th><td>Compares options by their effect on people: workload, trust, skill, emotion and control</td><td>Compares options by process results: cost, speed, quality and risk</td></tr><tr><th scope=\"row\">Dividing the work between systems and people</th><td>Checks the division of work against the human factors</td><td>Proposes the division of work from capability and cost</td></tr><tr><th scope=\"row\">In operation</th><td>Uses analytics on human measures</td><td>Uses analytics on process measures</td></tr></tbody></table></div><h2>Where they differ</h2><p>The two disciplines differ in focus, success measure, questions, methods and output.</p><div class=\"pd-table-wrap\"><table class=\"pd-table\"><thead><tr><th scope=\"col\"></th><th scope=\"col\">WX</th><th scope=\"col\">Process design</th></tr></thead><tbody><tr><th scope=\"row\">Focus</th><td>The people in the workflow, across all archetypes</td><td>The process: its steps, flow, cost and risk</td></tr><tr><th scope=\"row\">Success means</th><td>People reach their goals, with a workload they can sustain, trust that matches the system&#x27;s reliability and skills they keep</td><td>The process meets its target for the chosen aim, such as cost, speed, quality or risk</td></tr><tr><th scope=\"row\">Typical questions</th><td>What do these people need? What will they experience? Where will they struggle or lose trust?</td><td>What steps would the work need? What would it cost to run? What would an exception cost?</td></tr><tr><th scope=\"row\">Typical methods</th><td>Research with people, mapping of the experience across steps and channels, prototyping, usability testing, and analytics on human measures</td><td>Process modelling, task analysis, function allocation, simulation, process mining and analytics on process measures</td></tr><tr><th scope=\"row\">Output</th><td>Goals, human factors and success descriptions, options judged on human impact, rules, patterns and the workflow card</td><td>Process model, division of work and targets</td></tr></tbody></table></div><h2>How they work together</h2><p>The division of work between systems and people is decided jointly. Process design proposes it from what the systems can do and what it costs, and WX compares it with the alternatives by its effect on people: workload, trust, skill, emotion and control. A division that is efficient by process measures alone can still leave a person with only the hardest cases, or with a monitoring job they cannot sustain.</p><p>Process design also gives WX the process model and the targets, and WX gives process design measures of workload, trust and skill. Once the workflow is running, analytics show whether a problem is in the process, the experience or both, and the two disciplines decide together where the change goes.</p><p>At each stage of the design, each discipline contributes something different, and some decisions are made together.</p><div class=\"pd-table-wrap\"><table class=\"pd-table\"><thead><tr><th scope=\"col\">Stage</th><th scope=\"col\">WX contributes</th><th scope=\"col\">Process design contributes</th><th scope=\"col\">Decided together</th></tr></thead><tbody><tr><th scope=\"row\">Frame the opportunity</th><td>Who is affected, what they need, and what they do now if the work exists today</td><td>What the work must achieve, what it costs, and where any existing process loses cost, time or quality</td><td>Which opportunity to pursue, and for whom</td></tr><tr><th scope=\"row\">Imagine ways of working</th><td>Options for how people and systems share the work, what each person sees and decides, and how they hand over</td><td>Options for the steps, their sequence and the division of work between systems and people</td><td>Which options to develop further</td></tr><tr><th scope=\"row\">Judge the options</th><td>Compares options by their effect on people: workload, trust, skill, emotion and control</td><td>Compares options by process results: cost, speed, quality and risk</td><td>Which concept to take forward</td></tr><tr><th scope=\"row\">Design the chosen workflow</th><td>Rules, patterns, prototypes tested with people and the workflow card</td><td>Process model, division of work and targets</td><td>Which steps are automated and which people perform, and where checkpoints go</td></tr><tr><th scope=\"row\">Run and refine</th><td>Analytics on human measures and testing with people</td><td>Analytics on process measures</td><td>Whether a change goes to the process or the experience</td></tr></tbody></table></div><p>The tables draw on methods from process design, which include function allocation, task analysis and the business process management lifecycle. The evidence for them is weak.</p>"
        },
        {
          slug: "wx-and-workforce-design",
          title: "WX and workforce design",
          summary: "What WX needs from workforce design, what it gives to workforce design and how the two disciplines work in parallel."
        },
        {
          slug: "how-to-read",
          title: "How to read this design system",
          summary: "How the sections follow the five stages a designer works through."
        }
      ]
    },
    {
      slug: "key-concepts",
      title: "Key concepts",
      summary: "The ideas the rest of the design system depends on.",
      children: [
        { slug: "human-factors", title: "Human factors", summary: "The eight aspects of a person's experience that the rules are built to protect." }
      ]
    },
    {
      slug: "terminology",
      title: "Terminology",
      summary: "The core terms, each used for one thing throughout."
    },

    { section: "Design stages" },
    {
      slug: "frame-the-opportunity",
      title: "Frame the opportunity",
      summary: "Decide who is affected, what they need and what success means for each of them.",
      children: [
        { slug: "archetypes", title: "Archetypes, shared runs and oversight tiers", summary: "The recurring ways a person relates to a workflow, and the tiers of oversight they work in." },
        { slug: "personas", title: "From archetypes to personas", summary: "How an organisation derives its own personas from the archetypes." },
        { slug: "success", title: "What success means for each archetype", summary: "What each archetype needs from the workflow, and what it is concerned about." },
        { slug: "where-a-rule-is-set", title: "Where a rule is set", summary: "The levels of a workflow at which a rule can be set, and how a run inherits them." }
      ]
    },
    {
      slug: "imagine-ways-of-working",
      title: "Imagine ways of working",
      summary: "Decide what kind of workflow it is and how the work is divided between systems and people.",
      children: [
        { slug: "typology", title: "A typology of workflows", summary: "The kinds of workflow, so that each kind can have its own rules." },
        { slug: "dividing-the-work", title: "Ways of dividing the work between systems and people", summary: "The options for dividing the work, and the questions to test with the people affected." }
      ]
    },
    {
      slug: "judge-the-options",
      title: "Judge the options",
      summary: "Compare the options by their effect on people.",
      children: [
        { slug: "principles", title: "Principles", summary: "Thirteen draft principles, with the evidence behind each." }
      ]
    },
    {
      slug: "design-the-chosen-workflow",
      title: "Design the chosen workflow",
      summary: "Specify the rules, patterns and workflow card for the workflow that was chosen.",
      children: [
        { slug: "rule-families", title: "Rule families", summary: "The rules for each phase of a run, and the rules that apply across all phases." },
        { slug: "rule-profiles", title: "Rule profiles", summary: "How the rules differ between two workflow types." },
        { slug: "patterns", title: "Patterns", summary: "Reusable patterns for the experience of a workflow." },
        { slug: "workflow-card", title: "Workflow card", summary: "The specification of a workflow at run level and at step level." }
      ]
    },
    {
      slug: "run-and-refine",
      title: "Run and refine",
      summary: "Measure how the workflow performs for the people in it and change it.",
      children: [
        { slug: "evaluation", title: "Evaluation", summary: "Measures of the experience that teams can use or replace with their own." },
        { slug: "analytics", title: "Workflow analytics", summary: "What each metric from live runs says about the process and the experience." }
      ]
    },

    { section: "Worked example" },
    {
      slug: "estimating-a-motor-claim-negotiation",
      title: "Estimating a motor claim negotiation",
      summary: "One workflow taken through the five stages."
    }
  ]
};
