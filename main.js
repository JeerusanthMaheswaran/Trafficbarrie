// Mobile menu
const menuBtn = document.querySelector('.menu-btn');
const links = document.querySelector('.links');
menuBtn.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));

document.getElementById('year').textContent = new Date().getFullYear();

// Booking form
const form = document.getElementById('book-form');
document.getElementById('next-url').value = new URL('thanks.html', location.href).href;
form.querySelectorAll('input[name="Request type"]').forEach(r =>
  r.addEventListener('change', () => form.classList.toggle('question-mode', r.value !== 'Free consultation' && r.checked)));

// "Fight my ___ ticket" links pre-select the area
const areaSelect = document.getElementById('area-select');
document.querySelectorAll('[data-area]').forEach(a =>
  a.addEventListener('click', () => { areaSelect.value = a.dataset.area; }));

// Keep the mailto link in sync with what's typed, as a fallback
const mailto = document.getElementById('mailto-link');
form.addEventListener('input', () => {
  const f = new FormData(form);
  const body = ['Name','Phone','email','Ticket type','Location','Ticket date','Message']
    .map(k => `${k}: ${f.get(k) || ''}`).join('\n') + '\n\n(Please attach a photo of your ticket.)';
  mailto.href = 'mailto:trafficticketexperts@rogers.com?subject=' +
    encodeURIComponent('Traffic ticket question') + '&body=' + encodeURIComponent(body);
});

// Attachment size check (email services limit file size)
form.addEventListener('submit', e => {
  const file = form.querySelector('input[type=file]').files[0];
  if (file && file.size > 5 * 1024 * 1024) {
    e.preventDefault();
    alert('That photo is larger than 5 MB. Please choose a smaller photo, or email it to us directly.');
  }
});

// Google reviews (from reviews.js)
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const stars = n => '★'.repeat(Math.round(n)) + '☆'.repeat(5 - Math.round(n));
const grid = document.getElementById('review-grid');
(window.GOOGLE_REVIEWS || []).forEach(r => {
  grid.insertAdjacentHTML('beforeend', `<article class="review">
    <div class="stars" aria-label="${r.rating} out of 5 stars">${stars(r.rating || 5)}</div>
    <p>"${esc(r.text)}"</p>
    <div class="who">${esc(r.name)}</div>
    <div class="when">Google review${r.when ? ' · ' + esc(r.when) : ''}</div>
  </article>`);
});
const sum = window.GOOGLE_SUMMARY;
if (sum) {
  const el = document.getElementById('review-summary');
  el.innerHTML = `<span class="stars">${stars(sum.rating)}</span><br><b>${sum.rating}</b> out of 5 from <b>${sum.count}</b> Google reviews`;
  el.hidden = false;
  const hr = document.getElementById('hero-rating');
  hr.textContent = `★ ${sum.rating} on Google (${sum.count} reviews)`;
  hr.hidden = false;
}
