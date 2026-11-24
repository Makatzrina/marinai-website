// X launch page: progressive enhancement only. The page and its links work without JavaScript.
(() => {
  // BOOKING LINK: paste Marina's booking page here (for example a Calendly or Cal.com link).
  // While it is empty, every "Book a call" button opens an email to Marina instead,
  // with the visitor's checklist answers filled in.
  const BOOKING_URL = '';
  const EMAIL = 'marketing@marinai.xyz';

  if (BOOKING_URL) {
    document.querySelectorAll('[data-book]').forEach(a => {
      a.href = BOOKING_URL;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    });
  }

  const form = document.querySelector('.xl-calc');
  if (!form) return;
  const boxes = [...form.querySelectorAll('input[name="service"]')];
  const lines = form.querySelector('#xl-lines');
  const budgetOut = form.querySelector('#xl-budget-out');
  const timingOut = form.querySelector('#xl-timing-out');
  const cta = form.querySelector('#xl-receipt-cta');

  const nameOf = box => box.closest('label').querySelector('strong').textContent.trim();
  const picked = name => form.querySelector(`input[name="${name}"]:checked`)?.value || 'Not sure yet';

  const render = () => {
    const chosen = boxes.filter(b => b.checked);
    const budget = picked('budget');
    const timing = picked('timing');

    lines.replaceChildren(...(chosen.length ? chosen.map(b => {
      const li = document.createElement('li');
      const label = document.createElement('span');
      const mark = document.createElement('span');
      label.textContent = nameOf(b);
      mark.textContent = '✓';
      li.append(label, mark);
      return li;
    }) : [Object.assign(document.createElement('li'), { className: 'xl-empty', textContent: 'Nothing ticked yet. That’s fine, we’ll work it out on the call.' })]));

    budgetOut.textContent = budget;
    timingOut.textContent = timing;

    if (!BOOKING_URL && cta) {
      const body = [
        'Hi Marina,',
        '',
        'I’d like to book a call about a launch on X.',
        '',
        'What I need:',
        ...(chosen.length ? chosen.map(b => '- ' + nameOf(b)) : ['- Not sure yet']),
        '',
        'Influencer budget: ' + budget,
        'Launch: ' + timing,
        '',
        'Company / website:',
        'What we’re launching:'
      ].join('\n');
      cta.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent('Book a call: X launch') + '&body=' + encodeURIComponent(body);
    }
  };

  form.addEventListener('change', render);
  form.addEventListener('submit', e => e.preventDefault());
  render();
})();
