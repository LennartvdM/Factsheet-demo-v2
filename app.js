// ===== DATA =====
const DATA = {
  dimensions: ['Leiderschap', 'Strategie', 'HR', 'Communicatie', 'Kennis', 'Klimaat'],
  mv: [3.2, 2.7, 3.4, 3.1, 3.1, 3.2],
  inclusiviteit: [3.3, 2.8, 3.0, 2.8, 2.8, 3.0],
  cultureel: [3.1, 2.6, 2.5, 2.5, 2.4, 2.6],
  colors: {
    mv: '#2c5f8a',
    inclusiviteit: '#8e44ad',
    cultureel: '#d4770a'
  }
};

const FOLDOUTS = {
  'respondent-bias': {
    title: 'Respondent bias',
    body: '89% respons is hoog, maar 10 organisaties hebben niet meegedaan. Als die 10 systematisch anders zijn (slechtere presteerders die zich aan toezicht onttrekken), zijn alle gemiddelden in dit rapport licht optimistisch.'
  },
  'data-discrepantie': {
    title: 'Data discrepantie',
    body: 'n=82 voor de kwantitatieve data, n=84 voor de kwalitatieve dimensies. Twee organisaties leverden beleidsgegevens aan maar geen personeelscijfers. Kleine inconsistentie, maar het laat zien dat de data niet perfect schoon is.'
  },
  'instroom-doorstroom': {
    title: 'Het probleem is niet instroom maar doorstroom',
    body: 'De totale organisatie staat op 47,5% — nagenoeg pariteit. Dit cijfer beweegt nauwelijks. Het probleem is dus niet vrouwen binnenkrijgen, maar vrouwen laten doorstromen. Dat is een fundamenteel ander verhaal dan vaak wordt aangenomen.'
  },
  'subtop-sneller': {
    title: 'De subtop vult sneller dan de top',
    body: 'De subtop groeide sneller (+2,0pp) dan de top (+1,3pp). De subtop bouwt druk op. Dit is óf een teken dat de pijplijn zich vult en uiteindelijk doorbreekt, óf dat er een plafond zit tussen subtop en top dat standhoudt.'
  },
  'conversie-niveaus': {
    title: 'Conversie tussen niveaus',
    body: 'Bij bijna-pariteit in de totale organisatie wordt het absolute percentage minder interessant. De echte maatstaf is de conversieratio tussen niveaus: hoeveel vrouwen stromen door van organisatie naar subtop, en van subtop naar top?'
  },
  'rvb-zwakste-schakel': {
    title: 'De rvb is nu de zwakste schakel',
    body: 'De rvb op 33,5% ligt nu onder het totale topcijfer van 35,5%. De raad van bestuur is niet alleen achtergebleven — het trekt het gemiddelde naar beneden. De plek met de meeste executieve macht is de zwakste schakel in de hele toplaag.'
  },
  'rvc-sprong': {
    title: 'De rvc-sprong',
    body: 'De rvc sprong 3,7pp in één jaar — de grootste enkeljarige stijging in alle bestuurscategorieën. Is dit het effect van de Wet Ingroeiquotum? De timing zou kloppen.'
  },
  'rvt-pariteit': {
    title: 'De rvt nadert pariteit',
    body: 'De rvt staat op 48,1% — feitelijk pariteit. De toezichtkant van Nederlandse organisaties heeft dit vraagstuk effectief opgelost. Dat verdient benoeming als mijlpaal.'
  },
  'toezicht-uitvoering': {
    title: 'Toezicht vs. uitvoering',
    body: 'Vrouwen zijn steeds meer vertegenwoordigd in organen die toezicht houden (rvc, rvt), maar minder in het orgaan dat bestuurt (rvb). De vraag is: krijgen vrouwen oversight-rollen maar niet de operationele macht?'
  },
  'beheersing-differentiatie': {
    title: 'Beheersing is waar de echte differentiatie zit',
    body: 'Leiderschap heeft 49% in de beheersingsfase, HR 44%. Maar communicatie staat op 23% en kennis op 24%. Grofweg de helft van de organisaties beheerst diversiteit in leiderschap, maar slechts een kwart beheerst hoe ze erover communiceren. Je kunt het leiden, maar je kunt er niet over praten.'
  },
  'orientatiefase-17jaar': {
    title: 'Na 17 jaar nog in de oriëntatiefase',
    body: 'Strategie en management is de enige dimensie met een betekenisvolle groep nog in de oriëntatiefase (4%). Na 17 jaar charter heeft 4% van de ondertekenaars niet eens begonnen met strategisch diversiteitsmanagement. Klein getal, maar opvallend.'
  },
  'communicatie-blinde-vlek': {
    title: 'Communicatie als structurele blinde vlek',
    body: 'Communicatie heeft nog 6% in de oriëntatiefase en 18% in de ontwikkelfase. Na 17 jaar. Dit is geen achterstand — dit is een structurele blinde vlek.'
  },
  'laatste-kilometer-kennis': {
    title: 'De laatste kilometer bij kennis',
    body: 'Kennis heeft de hoogste "grotendeels" score (64,3%) maar de laagste "volledig" score (14,3%). Organisaties zijn er bijna — maar kunnen de laatste stap niet zetten. Vergelijk dit met leiderschap waar 53,6% volledige realisatie rapporteert. Het verschil tussen "bijna klaar" en "echt klaar" is bij kennis enorm.'
  },
  'strategie-nulgroep': {
    title: 'Strategie: de enige dimensie met een nulgroep',
    body: 'Strategie en management is de enige dimensie waar een betekenisvolle groep (7,1%) rapporteert dat inclusiviteit "niet gerealiseerd" is. Terwijl diezelfde organisaties hoog scoren op leiderschap. Dat is een kloof tussen intentie en infrastructuur.'
  },
  'vormpatroon-fractaal': {
    title: 'Het vormpatroon is fractaal',
    body: 'Organisaties weten hoe ze diversiteit moeten leiden aan de top en in HR-beleid, maar worstelen om het te verankeren in communicatie, strategie en kennisopbouw. Dit patroon herhaalt zich in m/v, in inclusiviteit en in culturele diversiteit — steeds op een ander niveau. De inspanning concentreert zich waar organisaties al comfortabel zijn, niet waar de gaten zitten.'
  },
  'gericht-vs-breed': {
    title: 'Gericht beleid vs. breed beleid',
    body: 'Alle zes m/v-dimensies hebben bewezen effect op vrouwen in de top. Inclusiviteit niet. De conclusie: gericht genderbeleid werkt, brede inclusie alleen niet. Organisaties moeten specifieke genderinterventies niet vervangen door algemeen D&I-beleid.'
  },
  'vrouwen-converteren': {
    title: 'Vrouwen converteren beter',
    body: 'Shortlist: 41% vrouwen. Plaatsingen: 46% vrouwen. Vrouwen converteren van shortlist naar plaatsing op een hoger percentage dan mannen. Een positief signaal verscholen in dalende pijplijncijfers — als vrouwen op de shortlist komen, winnen ze vaker.'
  },
  'bureaus-ambitie': {
    title: 'Bureaus verlagen hun eigen ambitie',
    body: 'Het streefcijfer daalde van 51% naar 48%. Bureaus missen niet alleen hun doelen — ze stellen de doelen naar beneden bij. Dat is een ander signaal dan target niet halen.'
  },
  'meer-rvb-toch-daling': {
    title: 'Meer rvb-plaatsingen, toch daling',
    body: 'Rvb-plaatsingen zijn nu 32% van het totaal (was 22%). Er worden meer bestuursfuncties via search ingevuld. Toch daalt het aandeel vrouwen in de rvb. De daling is dus niet te wijten aan minder vacatures — er speelt iets anders.'
  },
  'vragen-niet-benoemen': {
    title: 'Vragen is niet benoemen',
    body: 'De meerderheid van opdrachtgevers vraagt nu om bi-culturele kandidaten, een omslag ten opzichte van voorgaande jaren. Maar het rapport kan niet vertellen of dit zich vertaalt naar daadwerkelijke benoemingen. Vragen is niet hetzelfde als aannemen.'
  },
  'omgekeerde-dynamiek': {
    title: 'De omgekeerde bestuurskamerdynamiek',
    body: 'Bij gender ligt de rvb achter op de rvc. Bij culturele diversiteit is het omgekeerd: de rvb (10,9%) scoort ruim boven de rvc (5,2%). Mogelijk omdat bestuursbenoemingen zichtbaarder zijn en meer onderhevig aan publieke druk, terwijl de bredere top een gesloten netwerk blijft. Volledig andere dynamiek.'
  },
  'trechter-steiler': {
    title: 'De trechter is veel steiler',
    body: 'Bij gender: 47,5% in de organisatie vs. 35,5% in de top — een verhouding van 0,75. Bij culturele diversiteit: 12,8% vs. 6,3% — een verhouding van 0,49. De culturele diversiteitstrechter is proportioneel veel steiler dan de gendertrechter.'
  },
  'uniform-achter': {
    title: 'Uniform achter, niet selectief achter',
    body: 'De dimensiescores variëren van 2,4 tot 3,1. Bij m/v van 2,7 tot 3,4. Het verschil is circa 0,3–0,4 over elke dimensie. Culturele diversiteit is niet zwak op specifieke gebieden — het loopt uniform achter. Dat wijst op een volwassenheidsvraagstuk, niet een structureel probleem.'
  }
};

// ===== SCROLL REVEAL =====
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ===== FUNNEL BARS =====
function initFunnelBars() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target.querySelector('.funnel-bar');
        if (bar) {
          const width = bar.dataset.width;
          entry.target.style.setProperty('--bar-w', width);
        }
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.funnel-level').forEach(el => observer.observe(el));
}

// ===== DUAL FUNNEL BARS =====
function initDualFunnel() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Set bar widths based on data
        entry.target.querySelectorAll('.dual-bar').forEach(bar => {
          const pct = parseFloat(bar.dataset.width);
          const fill = bar.querySelector('.dual-bar-fill');
          // Scale: gender bars relative to 50%, cultural relative to 15%
          const isGender = fill.classList.contains('dual-bar-fill--gender');
          const scale = isGender ? (pct / 50 * 100) : (pct / 50 * 100);
          fill.style.width = Math.min(scale, 100) + '%';
        });
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.dual-funnel').forEach(el => observer.observe(el));
}

// ===== CAROUSELS =====
function initCarousels() {
  document.querySelectorAll('.carousel-container').forEach(container => {
    const track = container.querySelector('.carousel-track');
    const dots = container.querySelectorAll('.dot');
    if (!track || !dots.length) return;

    const cards = track.querySelectorAll('.carousel-card');

    track.addEventListener('scroll', () => {
      const scrollLeft = track.scrollLeft;
      const cardWidth = cards[0].offsetWidth + 16; // gap
      const index = Math.round(scrollLeft / cardWidth);
      dots.forEach((d, i) => d.classList.toggle('active', i === index));
    }, { passive: true });
  });
}

// ===== FOLDOUT PANEL =====
function initFoldouts() {
  const overlay = document.getElementById('foldout-overlay');
  const panel = document.getElementById('foldout-panel');
  const title = document.getElementById('foldout-title');
  const body = document.getElementById('foldout-body');
  const closeBtn = document.getElementById('foldout-close');

  function openFoldout(id) {
    const data = FOLDOUTS[id];
    if (!data) return;
    title.textContent = data.title;
    body.textContent = data.body;
    panel.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeFoldout() {
    panel.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.foldout-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openFoldout(btn.dataset.foldout);
    });
  });

  closeBtn.addEventListener('click', closeFoldout);
  overlay.addEventListener('click', closeFoldout);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeFoldout();
  });
}

// ===== RADIAL BAR CHART =====
function drawRadialChart(svgEl, layers, options = {}) {
  const { size = 500, maxRings = 4, animate = false } = options;
  const cx = size / 2;
  const cy = size / 2;
  const minR = size * 0.15;
  const maxR = size * 0.44;

  svgEl.innerHTML = '';

  const dims = DATA.dimensions;
  const numDims = dims.length;
  const angleStep = (Math.PI * 2) / numDims;
  const startAngle = -Math.PI / 2; // start at top

  // Draw dimension labels
  dims.forEach((dim, i) => {
    const angle = startAngle + angleStep * i + angleStep / 2;
    const labelR = maxR + 20;
    const x = cx + Math.cos(angle) * labelR;
    const y = cy + Math.sin(angle) * labelR;

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', x);
    text.setAttribute('y', y);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('dominant-baseline', 'middle');
    text.setAttribute('fill', '#999');
    text.setAttribute('font-size', size > 400 ? '11' : '9');
    text.setAttribute('font-family', '-apple-system, BlinkMacSystemFont, sans-serif');
    text.textContent = dim;
    svgEl.appendChild(text);
  });

  // Draw reference rings
  for (let r = 1; r <= maxRings; r++) {
    const radius = minR + (maxR - minR) * (r / maxRings);
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', cx);
    circle.setAttribute('cy', cy);
    circle.setAttribute('r', radius);
    circle.setAttribute('fill', 'none');
    circle.setAttribute('stroke', '#eee');
    circle.setAttribute('stroke-width', '1');
    svgEl.appendChild(circle);
  }

  // Draw dimension separator lines
  dims.forEach((_, i) => {
    const angle = startAngle + angleStep * i;
    const x1 = cx + Math.cos(angle) * minR;
    const y1 = cy + Math.sin(angle) * minR;
    const x2 = cx + Math.cos(angle) * maxR;
    const y2 = cy + Math.sin(angle) * maxR;

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    line.setAttribute('stroke', '#eee');
    line.setAttribute('stroke-width', '1');
    svgEl.appendChild(line);
  });

  // Draw arcs for each layer
  layers.forEach((layer, layerIdx) => {
    const values = DATA[layer.key];
    const color = DATA.colors[layer.key];
    const opacity = layer.opacity || 0.7;

    values.forEach((val, i) => {
      const arcRadius = minR + (maxR - minR) * (val / maxRings);
      const a1 = startAngle + angleStep * i + 0.02;
      const a2 = startAngle + angleStep * (i + 1) - 0.02;

      const x1 = cx + Math.cos(a1) * minR;
      const y1 = cy + Math.sin(a1) * minR;
      const x2 = cx + Math.cos(a1) * arcRadius;
      const y2 = cy + Math.sin(a1) * arcRadius;
      const x3 = cx + Math.cos(a2) * arcRadius;
      const y3 = cy + Math.sin(a2) * arcRadius;
      const x4 = cx + Math.cos(a2) * minR;
      const y4 = cy + Math.sin(a2) * minR;

      const largeArc = (a2 - a1) > Math.PI ? 1 : 0;

      const d = [
        `M ${x1} ${y1}`,
        `L ${x2} ${y2}`,
        `A ${arcRadius} ${arcRadius} 0 ${largeArc} 1 ${x3} ${y3}`,
        `L ${x4} ${y4}`,
        `A ${minR} ${minR} 0 ${largeArc} 0 ${x1} ${y1}`,
        'Z'
      ].join(' ');

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', d);
      path.setAttribute('fill', color);
      path.setAttribute('opacity', animate ? '0' : String(opacity));
      path.setAttribute('stroke', '#fff');
      path.setAttribute('stroke-width', '1');

      if (animate) {
        path.style.transition = `opacity 0.6s ease ${layerIdx * 0.3 + i * 0.05}s`;
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            path.setAttribute('opacity', String(opacity));
          });
        });
      }

      svgEl.appendChild(path);
    });
  });
}

// ===== RADIAL CHART SCROLL BUILD =====
function initRadialScrollBuild() {
  const svg = document.getElementById('radial-chart');
  const legend = document.getElementById('radial-legend');
  let currentLayers = [];

  const layerDefs = [
    { key: 'mv', opacity: 0.6, label: 'M/V-diversiteit', color: DATA.colors.mv },
    { key: 'inclusiviteit', opacity: 0.5, label: 'Inclusiviteit', color: DATA.colors.inclusiviteit },
    { key: 'cultureel', opacity: 0.5, label: 'Culturele diversiteit', color: DATA.colors.cultureel }
  ];

  function updateLegend(layers) {
    legend.innerHTML = layers.map(l =>
      `<div class="legend-item"><span class="legend-swatch" style="background:${l.color}"></span>${l.label}</div>`
    ).join('');
  }

  const triggers = document.querySelectorAll('.scroll-trigger');

  const observer = new IntersectionObserver((entries) => {
    // Determine which layers should be visible
    let maxVisibleIndex = -1;
    triggers.forEach((t, i) => {
      const rect = t.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.6) {
        maxVisibleIndex = i;
      }
    });

    const newLayers = layerDefs.slice(0, maxVisibleIndex + 1);
    if (newLayers.length !== currentLayers.length) {
      currentLayers = newLayers;
      drawRadialChart(svg, currentLayers, { animate: true });
      updateLegend(currentLayers);
    }
  }, { threshold: [0, 0.25, 0.5, 0.75, 1] });

  triggers.forEach(t => observer.observe(t));

  // Also use scroll event for more responsive updates
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        let maxVisibleIndex = -1;
        triggers.forEach((t, i) => {
          const rect = t.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.6) {
            maxVisibleIndex = i;
          }
        });

        const newLayers = layerDefs.slice(0, maxVisibleIndex + 1);
        if (newLayers.length !== currentLayers.length) {
          currentLayers = newLayers;
          drawRadialChart(svg, currentLayers, { animate: true });
          updateLegend(currentLayers);
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

// ===== ECHO RADIAL CHART =====
function initEchoRadial() {
  const svg = document.getElementById('radial-chart-echo');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        drawRadialChart(svg, [
          { key: 'cultureel', opacity: 0.6 }
        ], { size: 400, animate: true });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(svg);
}

// ===== CODA CHARTS =====
function initCoda() {
  const charts = [
    { el: document.getElementById('coda-chart-1'), layers: [{ key: 'mv', opacity: 0.6 }] },
    { el: document.getElementById('coda-chart-2'), layers: [{ key: 'inclusiviteit', opacity: 0.6 }] },
    { el: document.getElementById('coda-chart-3'), layers: [{ key: 'cultureel', opacity: 0.6 }] }
  ];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        charts.forEach((c, i) => {
          setTimeout(() => {
            drawRadialChart(c.el, c.layers, { size: 300, animate: true });
          }, i * 200);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  observer.observe(document.getElementById('coda'));
}

// ===== DETAIL VIEW =====
function initDetailView() {
  const detailView = document.getElementById('detail-view');
  const detailContent = document.getElementById('detail-content');
  const detailBack = document.getElementById('detail-back');
  let savedScrollPos = 0;

  const detailData = {
    boardroom: `
      <h3>De bestuurskamer — volledig overzicht</h3>
      <table>
        <thead>
          <tr><th>Orgaan</th><th>2023</th><th>2024</th><th>Verschil</th></tr>
        </thead>
        <tbody>
          <tr><td>Raad van bestuur (rvb)</td><td>36,3%</td><td>33,5%</td><td style="color:#c0392b">−2,8 pp</td></tr>
          <tr><td>Raad van commissarissen (rvc)</td><td>39,7%</td><td>43,4%</td><td style="color:#27ae60">+3,7 pp</td></tr>
          <tr><td>Raad van toezicht (rvt)</td><td>45,4%</td><td>48,1%</td><td style="color:#27ae60">+2,7 pp</td></tr>
        </tbody>
      </table>
      <p style="margin-top:1rem;color:#6b6b6b;font-size:0.9rem;">Charterorganisaties scoren nog steeds veel hoger dan bedrijven die onder de Wet Ingroeiquotum en streefcijfers vallen. Het percentage vrouwen in de rvb is afgenomen, terwijl rvc en rvt zijn gestegen.</p>
    `
  };

  // Deep swipe detection on carousels
  document.querySelectorAll('.carousel-track').forEach(track => {
    track.addEventListener('scroll', () => {
      const maxScroll = track.scrollWidth - track.clientWidth;
      if (track.scrollLeft >= maxScroll - 5) {
        // At the end — could trigger detail view
        // For now, add a visual hint
        track.classList.add('at-end');
      } else {
        track.classList.remove('at-end');
      }
    }, { passive: true });
  });

  detailBack.addEventListener('click', () => {
    detailView.classList.remove('active');
    document.body.style.overflow = '';
    window.scrollTo(0, savedScrollPos);
  });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initFunnelBars();
  initDualFunnel();
  initCarousels();
  initFoldouts();
  initRadialScrollBuild();
  initEchoRadial();
  initCoda();
  initDetailView();
});
