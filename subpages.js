(function () {
  var nav = document.getElementById('nav');
  function onScroll() {
    if (!nav) return;
    if (nav.classList.contains('nav--always-solid')) {
      nav.classList.add('solid');
      return;
    }
    nav.classList.toggle('solid', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var bar = document.getElementById('scroll-progress');
  function progress() {
    if (!bar) return;
    var doc = document.documentElement;
    var sh = doc.scrollHeight - doc.clientHeight;
    bar.style.width = sh > 0 ? (doc.scrollTop / sh) * 100 + '%' : '0%';
  }
  window.addEventListener('scroll', progress, { passive: true });
  progress();

  function isDark() {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  }
  function setTheme(dark) {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    } catch (e) {}
    syncIcons();
  }
  function syncIcons() {
    var dark = isDark();
    var pathMoon = 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z';
    var sun =
      '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>';
    document.querySelectorAll('#icon-theme, .theme-mob-svg').forEach(function (svg) {
      svg.innerHTML = dark ? sun : '<path d="' + pathMoon + '"/>';
    });
  }
  function toggleTheme() {
    setTheme(!isDark());
  }
  var t1 = document.getElementById('theme-toggle');
  var t2 = document.getElementById('theme-toggle-mob');
  if (t1) t1.addEventListener('click', toggleTheme);
  if (t2) t2.addEventListener('click', toggleTheme);
  syncIcons();

  var overlay = document.getElementById('mob-overlay');
  var openBtn = document.getElementById('nav-open');
  var closeBtn = document.getElementById('nav-close');
  if (overlay && openBtn) {
    openBtn.addEventListener('click', function () {
      overlay.classList.add('open');
      overlay.setAttribute('aria-hidden', 'false');
    });
  }
  function closeMob() {
    if (!overlay) return;
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
  }
  if (closeBtn) closeBtn.addEventListener('click', closeMob);
  if (overlay) {
    overlay.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMob);
    });
  }
})();
