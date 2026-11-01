(function () {
  "use strict";
  var site = window.SITE;
  var mainEl = document.getElementById("main");
  var treeEl = document.getElementById("nav-tree");
  var pageEl = document.getElementById("page");
  var tocEl = document.getElementById("toc");
  var searchEl = document.getElementById("nav-search");
  var menuBtn = document.getElementById("menu-btn");
  var scrim = document.getElementById("scrim");
  var themeBtn = document.getElementById("theme-btn");

  /* Index every page by its path. */
  var pages = [];
  var byPath = {};
  function index(items, parentPath, parents) {
    items.forEach(function (it) {
      if (it.section) return;
      var path = parentPath + "/" + it.slug;
      it.path = path;
      it.parents = parents;
      byPath[path] = it;
      pages.push(it);
      if (it.children) index(it.children, path, parents.concat(it));
    });
  }
  index(site.nav, "", []);

  function store(key, value) { try { localStorage.setItem(key, value); } catch (e) {} }
  function load(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }

  /* Navigation */
  var openState = {};
  try { openState = JSON.parse(load("wx-nav-open") || "{}"); } catch (e) { openState = {}; }

  function buildList(items) {
    var ul = document.createElement("ul");
    ul.className = "nav-list";
    items.forEach(function (it) {
      if (it.section) {
        var h = document.createElement("li");
        h.className = "nav-label";
        h.textContent = it.section;
        ul.appendChild(h);
        return;
      }
      var li = document.createElement("li");
      li.className = "nav-item";
      li.dataset.path = it.path;
      var row = document.createElement("div");
      row.className = "nav-row";
      var a = document.createElement("a");
      a.href = it.path;
      a.textContent = it.title;
      a.setAttribute("data-link", "");
      row.appendChild(a);
      if (it.children) {
        var b = document.createElement("button");
        b.className = "nav-toggle";
        b.type = "button";
        b.setAttribute("aria-label", "Show or hide pages in " + it.title);
        b.setAttribute("aria-expanded", "false");
        b.addEventListener("click", function () { toggle(li, !li.classList.contains("open")); });
        row.appendChild(b);
      }
      li.appendChild(row);
      if (it.children) li.appendChild(buildList(it.children));
      ul.appendChild(li);
    });
    return ul;
  }

  function toggle(li, open) {
    li.classList.toggle("open", open);
    var b = li.querySelector(":scope > .nav-row > .nav-toggle");
    if (b) b.setAttribute("aria-expanded", String(open));
    openState[li.dataset.path] = open;
    store("wx-nav-open", JSON.stringify(openState));
  }

  treeEl.appendChild(buildList(site.nav));

  function syncNav(page) {
    var current = page ? page.path : null;
    treeEl.querySelectorAll("a").forEach(function (a) {
      if (a.getAttribute("href") === current) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    treeEl.querySelectorAll(".nav-item").forEach(function (li) {
      var path = li.dataset.path;
      var ancestor = page && (page.path === path || page.parents.some(function (p) { return p.path === path; }));
      if (li.querySelector(":scope > .nav-list")) toggle(li, ancestor || !!openState[path]);
    });
  }

  /* Filter */
  searchEl.addEventListener("input", function () {
    var q = searchEl.value.trim().toLowerCase();
    var any = false;
    var existing = treeEl.querySelector(".nav-empty");
    if (existing) existing.remove();
    treeEl.querySelectorAll(".nav-item").forEach(function (li) {
      var it = byPath[li.dataset.path];
      var own = it.title.toLowerCase().indexOf(q) !== -1;
      var childHit = (it.children || []).some(function (c) { return c.title.toLowerCase().indexOf(q) !== -1; });
      var parentHit = it.parents.some(function (p) { return p.title.toLowerCase().indexOf(q) !== -1; });
      var show = !q || own || childHit || parentHit;
      li.hidden = !show;
      if (show) any = true;
      if (q && (childHit || own) && li.querySelector(":scope > .nav-list")) li.classList.add("open");
    });
    treeEl.querySelectorAll(".nav-label").forEach(function (s) { s.hidden = !!q; });
    if (q && !any) {
      var p = document.createElement("p");
      p.className = "nav-empty";
      p.textContent = "No pages match. Try a shorter word.";
      treeEl.appendChild(p);
    }
    if (!q) syncNav(currentPage);
  });

  /* Rendering */
  var currentPage = null;

  function esc(s) {
    return s.replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
  }

  function cardList(items) {
    return '<ul class="card-grid">' + items.map(function (c) {
      return '<li><a class="pd-card pd-card--interactive" href="' + c.path + '" data-link><h3 class="pd-h3">' + esc(c.title) +
        '</h3><p class="pd-help">' + esc(c.summary) + "</p></a></li>";
    }).join("") + "</ul>";
  }

  function renderHome() {
    var html = '<header class="pd-pagehead"><h1 class="pd-hero" tabindex="-1">' + esc(site.name) +
      '</h1><p class="pd-deck">' + esc(site.tagline) + "</p></header>";
    var section = null, group = [];
    function flush() {
      if (section && group.length) html += "<section><h2 class=\"pd-h2 group-title\">" + esc(section) + "</h2>" + cardList(group) + "</section>";
      group = [];
    }
    site.nav.forEach(function (it) {
      if (it.section) { flush(); section = it.section; } else group.push(it);
    });
    flush();
    pageEl.innerHTML = html;
    document.title = site.name;
  }

  function renderPage(p) {
    var crumbs = "";
    if (p.parents.length) {
      crumbs = '<nav class="crumbs pd-caption" aria-label="Breadcrumb"><a href="/" data-link>Home</a>' +
        p.parents.map(function (a) { return '<span class="sep" aria-hidden="true">/</span><a href="' + a.path + '" data-link>' + esc(a.title) + "</a>"; }).join("") +
        "</nav>";
    }
    var idx = pages.indexOf(p);
    var prev = pages[idx - 1], next = pages[idx + 1];
    var pager = '<nav class="pager" aria-label="Previous and next pages">' +
      (prev ? '<a class="pd-card pd-card--interactive prev" href="' + prev.path + '" data-link><span class="pd-kicker">Previous</span><span class="pd-h3">' + esc(prev.title) + "</span></a>" : "") +
      (next ? '<a class="pd-card pd-card--interactive next" href="' + next.path + '" data-link><span class="pd-kicker">Next</span><span class="pd-h3">' + esc(next.title) + "</span></a>" : "") +
      "</nav>";
    pageEl.innerHTML = crumbs +
      '<header class="pd-pagehead"><h1 class="pd-h1" tabindex="-1">' + esc(p.title) + '</h1><p class="pd-deck">' + esc(p.summary) + "</p></header>" +
      (p.body ? '<div class="pd-prose">' + p.body + "</div>" : "") +
      (p.children ? cardList(p.children) : "") + pager;
    document.title = p.title + " | " + site.name;
  }

  function buildToc() {
    var heads = pageEl.querySelectorAll(".pd-prose h2");
    if (!heads.length) { tocEl.hidden = true; tocEl.innerHTML = ""; mainEl.classList.add("no-toc"); return; }
    var html = "<h2>On this page</h2><ul>";
    heads.forEach(function (h, i) {
      if (!h.id) h.id = "s" + (i + 1);
      html += '<li><a href="#' + h.id + '">' + esc(h.textContent) + "</a></li>";
    });
    tocEl.innerHTML = html + "</ul>";
    tocEl.hidden = false;
    mainEl.classList.remove("no-toc");
  }

  function route(focus) {
    var path = location.pathname.replace(/\/+$/, "") || "/";
    var p = byPath[path] || null;
    currentPage = p;
    if (p) renderPage(p); else renderHome();
    syncNav(p);
    buildToc();
    closeNav();
    window.scrollTo(0, 0);
    if (focus) {
      var h = pageEl.querySelector("h1");
      if (h) h.focus({ preventScroll: true });
    }
  }

  function go(href) {
    if (href === location.pathname) return;
    history.pushState({}, "", href);
    route(true);
  }

  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[data-link]");
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    go(a.getAttribute("href"));
  });
  window.addEventListener("popstate", function () { route(false); });

  /* Mobile navigation */
  function openNav() {
    document.body.classList.add("nav-open");
    scrim.hidden = false;
    menuBtn.setAttribute("aria-expanded", "true");
  }
  function closeNav() {
    document.body.classList.remove("nav-open");
    scrim.hidden = true;
    menuBtn.setAttribute("aria-expanded", "false");
  }
  menuBtn.addEventListener("click", function () {
    if (document.body.classList.contains("nav-open")) closeNav(); else openNav();
  });
  scrim.addEventListener("click", closeNav);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeNav(); });

  /* Theme */
  function isDark() {
    var attr = document.documentElement.getAttribute("data-theme");
    return attr ? attr === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  function syncThemeButton() { themeBtn.textContent = isDark() ? "Light mode" : "Dark mode"; }
  themeBtn.addEventListener("click", function () {
    var next = isDark() ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    store("wx-theme", next);
    syncThemeButton();
  });

  scrim.hidden = true;
  syncThemeButton();
  route(false);
})();
