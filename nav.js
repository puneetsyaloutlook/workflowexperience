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
          slug: "wx-process-design-and-workforce-design",
          title: "WX, process design and workforce design",
          summary: "How the three disciplines work in parallel on the same product."
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
        { slug: "wx-and-process-design", title: "WX and process design", summary: "Where the two disciplines are similar, where they differ and how they work together." },
        { slug: "wx-and-workforce-design", title: "WX and workforce design", summary: "Where the two disciplines are similar, where they differ and how they work together." },
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
