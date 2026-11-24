// X launch page: progressive enhancement only. The page, prices and links all work without JavaScript.
(() => {
  // BOOKING LINK: paste Marina's booking page here (for example a Calendly or Cal.com link).
  // While it is empty, every "Book a call" button opens an email to Marina instead.
  const BOOKING_URL = '';
  const EMAIL = 'marketing@marinai.xyz';

  const form = document.querySelector('.xl-calc');
  const money = n => '$' + Math.round(n).toLocaleString('en-US');

  if (BOOKING_URL) {
    document.querySelectorAll('[data-book]').forEach(a => {
      a.href = BOOKING_URL;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    });
  }

  if (!form) return;
  const boxes = [...form.querySelectorAll('input[name="service"]')];
  const range = form.querySelector('#xl-budget');
  const out = form.querySelector('#xl-budget-out');
  const lines = form.querySelector('#xl-lines');
  const servicesTotal = form.querySelector('#xl-services-total');
  const influencerTotal = form.querySelector('#xl-influencer-total');
  const total = form.querySelector('#xl-total');
  const cta = form.querySelector('#xl-receipt-cta');

  const nameOf = box => box.closest('label').querySelector('strong').textContent.trim();

  const render = () => {
    const picked = boxes.filter(b => b.checked);
    const services = picked.reduce((sum, b) => sum + Number(b.dataset.price || 0), 0);
    const budget = Number(range.value);

    lines.replaceChildren(...(picked.length ? picked.map(b => {
      const li = document.createElement('li');
      const label = document.createElement('span');
      const price = document.createElement('span');
      label.textContent = nameOf(b);
      price.textContent = money(Number(b.dataset.price || 0));
      li.append(label, price);
      return li;
    }) : [Object.assign(document.createElement('li'), { className: 'xl-empty', textContent: 'No services selected yet.' })]));

    out.value = money(budget);
    out.textContent = money(budget);
    servicesTotal.textContent = money(services);
    influencerTotal.textContent = money(budget);
    total.textContent = money(services + budget);
    range.style.setProperty('--fill', ((budget - range.min) / (range.max - range.min) * 100) + '%');

    if (!BOOKING_URL && cta) {
      const body = [
        'Hi Marina,',
        '',
        'I’d like to book a call about launching on X.',
        '',
        'Services I’m interested in:',
        ...(picked.length ? picked.map(b => '- ' + nameOf(b)) : ['- Not sure yet']),
        '',
        'Influencer budget: ' + money(budget),
        'Estimated total from your calculator: ' + money(services + budget),
        '',
        'Launch date:',
        'What we’re launching:',
        'Website:'
      ].join('\n');
      cta.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent('Book a call: X launch') + '&body=' + encodeURIComponent(body);
    }
  };

  form.addEventListener('input', render);
  form.addEventListener('change', render);
  form.addEventListener('submit', e => e.preventDefault());
  render();
})();
