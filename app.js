(function () {
  "use strict";
  var site = window.SITE;
  var treeEl = document.getElementById("nav-tree");
  var pageEl = document.getElementById("page");
  var tocEl = document.getElementById("toc");
  var searchEl = document.getElementById("nav-search");
  var menuBtn = document.getElementById("menu-btn");
  var scrim = document.getElementById("scrim");
  var themeBtn = document.getElementById("theme-btn");

  /* Index every page by its path. */
  var pages = [];   // flat, in reading order
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

  var chevron = '<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M6 3.5 10.5 8 6 12.5" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function buildList(items) {
    var ul = document.createElement("ul");
    ul.className = "nav-list";
    items.forEach(function (it) {
      if (it.section) {
        var h = document.createElement("li");
        h.className = "nav-section";
        h.setAttribute("role", "presentation");
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
      a.className = "nav-link";
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
        b.innerHTML = chevron;
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
    treeEl.querySelectorAll(".nav-link").forEach(function (a) {
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
      if (q && (childHit || own) && li.querySelector(":scope > .nav-list")) {
        li.classList.add("open");
      }
    });
    treeEl.querySelectorAll(".nav-section").forEach(function (s) { s.hidden = !!q; });
    if (q && !any) {
      var p = document.createElement("p");
      p.className = "nav-empty";
      p.textContent = "No pages match.";
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
    return '<ul class="cards">' + items.map(function (c) {
      return '<li><a class="card" href="' + c.path + '" data-link><span class="card-title">' + esc(c.title) +
        '</span><span class="card-text">' + esc(c.summary) + '</span></a></li>';
    }).join("") + "</ul>";
  }

  function renderHome() {
    var html = '<h1 tabindex="-1">' + esc(site.name) + '</h1><p class="lead">' + esc(site.tagline) + "</p>";
    var section = null, group = [];
    function flush() {
      if (section && group.length) html += '<h2 class="home-section">' + esc(section) + "</h2>" + cardList(group);
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
      crumbs = '<nav class="crumbs" aria-label="Breadcrumb"><a href="/" data-link>Home</a>' +
        p.parents.map(function (a) { return '<span aria-hidden="true">/</span><a href="' + a.path + '" data-link>' + esc(a.title) + "</a>"; }).join("") +
        "</nav>";
    }
    var idx = pages.indexOf(p);
    var prev = pages[idx - 1], next = pages[idx + 1];
    var pager = '<div class="pager">' +
      (prev ? '<a class="prev" href="' + prev.path + '" data-link><small>Previous</small>' + esc(prev.title) + "</a>" : "") +
      (next ? '<a class="next" href="' + next.path + '" data-link><small>Next</small>' + esc(next.title) + "</a>" : "") +
      "</div>";
    pageEl.innerHTML = crumbs + '<h1 tabindex="-1">' + esc(p.title) + '</h1><p class="lead">' + esc(p.summary) + "</p>" +
      (p.body || "") + (p.children ? cardList(p.children) : "") + pager;
    document.title = p.title + " | " + site.name;
  }

  function buildToc() {
    var heads = pageEl.querySelectorAll("h2:not(.home-section)");
    if (!heads.length) { tocEl.hidden = true; tocEl.innerHTML = ""; return; }
    var html = '<h2>On this page</h2><ul>';
    heads.forEach(function (h, i) {
      if (!h.id) h.id = "s" + (i + 1);
      html += '<li><a href="#' + h.id + '">' + esc(h.textContent) + "</a></li>";
    });
    tocEl.innerHTML = html + "</ul>";
    tocEl.hidden = false;
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
  themeBtn.addEventListener("click", function () {
    var root = document.documentElement;
    var attr = root.getAttribute("data-theme");
    var dark = attr ? attr === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    var next = dark ? "light" : "dark";
    root.setAttribute("data-theme", next);
    store("wx-theme", next);
  });

  scrim.hidden = true;
  route(false);
})();
