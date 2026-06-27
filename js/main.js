const darkToggle = document.getElementById('darkToggle');
if (darkToggle) {
  const saved = localStorage.getItem('makekiTheme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  setIcon(saved);

  darkToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('makekiTheme', next);
    setIcon(next);
  });

  function setIcon(theme) {
    darkToggle.innerHTML = theme === 'dark'
      ? '<i class="bi bi-sun-fill"></i>'
      : '<i class="bi bi-moon-fill"></i>';
  }
}

/* ===== FEATURE 1: FORM VALIDATION ===== */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let valid = true;

    function check(id, msg) {
      const f = document.getElementById(id);
      const err = document.getElementById(id + 'Error');
      const bad = !f.value.trim();
      f.classList.toggle('field-error', bad);
      if (err) {
        err.textContent = bad ? msg : '';
        err.classList.toggle('visible', bad);
      }
      if (bad) valid = false;
    }

    check('contactName',    'Please enter your full name.');
    check('contactSubject', 'Please select a subject.');
    check('contactMessage', 'Please write your message.');

    const ef = document.getElementById('contactEmail');
    const ee = document.getElementById('contactEmailError');
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ef.value);
    ef.classList.toggle('field-error', !ok);
    if (ee) {
      ee.textContent = ok ? '' : 'Please enter a valid email.';
      ee.classList.toggle('visible', !ok);
    }
    if (!ok) valid = false;

    if (valid) {
      contactForm.reset();
      const banner = document.getElementById('formSuccess');
      if (banner) {
        banner.classList.add('visible');
        setTimeout(() => banner.classList.remove('visible'), 6000);
      }
    }
  });

  contactForm.querySelectorAll('input,textarea,select').forEach(f => {
    f.addEventListener('input', () => {
      f.classList.remove('field-error');
      const e = document.getElementById(f.id + 'Error');
      if (e) e.classList.remove('visible');
    });
  });
}

/* ===== FEATURE 3a: GALLERY FILTER ===== */
document.addEventListener('DOMContentLoaded', () => {
  const filterBtns   = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  console.log('Filter init — buttons:', filterBtns.length, 'items:', galleryItems.length);

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      console.log('Clicked:', this.dataset.filter);
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const f = this.dataset.filter;
      galleryItems.forEach(item => {
        if (f === 'all') {
          item.style.display = '';
        } else {
         if (item.dataset.category === f) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
       }
      });
    });
  });
});

/* ===== MENU CATEGORY FILTER ===== */
document.addEventListener('DOMContentLoaded', () => {
  const menuFilterBtns = document.querySelectorAll('.filter-btn');
  const menuItems = document.querySelectorAll('.menu-item');

  menuFilterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      menuFilterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const f = this.dataset.filter;
      menuItems.forEach(item => {
        if (f === 'all') {
          item.style.display = '';
        } else {
          item.style.display = item.dataset.category === f ? '' : 'none';
        }
      });
    });
  });
});

/* ===== FEATURE 3b: MENU LIVE SEARCH ===== */
const menuSearch = document.getElementById('menuSearch');
const menuItems  = document.querySelectorAll('.menu-item');
const noResults  = document.getElementById('noResults');
if (menuSearch) {
  menuSearch.addEventListener('input', () => {
    const q = menuSearch.value.toLowerCase().trim();
    let n = 0;
    menuItems.forEach(item => {
      const match = !q
        || (item.dataset.name     || '').includes(q)
        || (item.dataset.category || '').includes(q);
      item.classList.toggle('hidden', !match);
      if (match) n++;
    });
    if (noResults) noResults.style.display = n ? 'none' : 'block';
  });
}

/* ===== GALLERY MODAL LIGHTBOX ===== */
const imgModal = document.getElementById('imgModal');
if (imgModal) {
  imgModal.addEventListener('show.bs.modal', e => {
    const t = e.relatedTarget;
    if (!t) return;
    const src     = t.dataset.full || t.src;
    const caption = t.dataset.caption || t.alt;
    const img = document.getElementById('modalImage');
    const cap = document.getElementById('modalCaption');
    const lbl = document.getElementById('imgModalLabel');
    if (img) { img.src = src; img.alt = caption; }
    if (cap) cap.textContent = caption;
    if (lbl) lbl.textContent = caption;
  });

  imgModal.addEventListener('hidden.bs.modal', () => {
    const img = document.getElementById('modalImage');
    if (img) img.src = '';
  });
}

/* ===== BOOTSTRAP TOOLTIPS ===== */
document.addEventListener('DOMContentLoaded', () => {
  const tips = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tips.forEach(el => new bootstrap.Tooltip(el));
});