// Shared logic for the Security+ Dashboard
const CHAPTER_FILES = [
  'data/chapter1.json',
  'data/chapter2.json',
  'data/chapter3.json',
  'data/chapter4.json',
  'data/chapter5.json'
];

const CHAPTER_TITLES = {
  1: "Chapter 1",
  2: "Chapter 2",
  3: "Chapter 3",
  4: "Chapter 4",
  5: "Chapter 5"
};

function getStored(key, fallback){
  try{ return JSON.parse(localStorage.getItem(key)) ?? fallback } catch(e){ return fallback }
}
function setStored(key, val){
  localStorage.setItem(key, JSON.stringify(val));
}

function storageKeyForItem(name){
  return `studied::${name}`;
}

function markStudied(name, value){
  setStored(storageKeyForItem(name), !!value);
}

function isStudied(name){
  return !!getStored(storageKeyForItem(name), false);
}

async function fetchJson(url){
  const res = await fetch(url);
  if(!res.ok) throw new Error('Failed to load ' + url);
  return res.json();
}

async function loadAllData(){
  const all = [];
  for(let i=0; i<CHAPTER_FILES.length; i++){
    try{
      const arr = await fetchJson(CHAPTER_FILES[i]);
      const chapterNum = i+1;
      arr.forEach(obj => {
        all.push({
          Chapter: chapterNum,
          Acronym: obj.Acronym || "",
          Name: obj.Name || "",
          Description: obj.Description || "",
          Devices_Layer: obj.Devices_Layer || ""
        });
      });
    }catch(e){
      console.error(e);
    }
  }
  return all;
}

function filterItems(items, query="", chapter=0){
  const q = (query||"").toLowerCase().trim();
  return items.filter(it => {
    const inChapter = chapter ? (it.Chapter === chapter) : true;
    if(!q) return inChapter;
    const hay = (it.Acronym + " " + it.Name + " " + it.Description).toLowerCase();
    return inChapter && hay.includes(q);
  });
}

function renderItemsTable(tbody, items){
  let html = "";
  for(const it of items){
    const studied = isStudied(it.Name);
    html += `
      <tr>
        <td style="width:90px"><span class="tag">Ch ${it.Chapter}</span></td>
        <td><strong>${escapeHtml(it.Acronym || "-")}</strong></td>
        <td>${escapeHtml(it.Name)}</td>
        <td>${escapeHtml(it.Description)}</td>
        <td style="width:120px">
          <label style="display:flex;align-items:center;gap:8px">
            <input type="checkbox" ${studied ? "checked":""} data-name="${escapeHtml(it.Name)}" class="study-toggle">
            <span class="small">${studied ? "Studied" : "Mark studied"}</span>
          </label>
        </td>
      </tr>
    `;
  }
  tbody.innerHTML = html;
  // bind toggles
  tbody.querySelectorAll(".study-toggle").forEach(cb => {
    cb.addEventListener("change", e => {
      const name = e.target.getAttribute("data-name");
      markStudied(name, e.target.checked);
      e.target.nextElementSibling.textContent = e.target.checked ? "Studied" : "Mark studied";
    });
  });
}

function escapeHtml(s){
  return (s||"").replace(/[&<>'"]/g, c => ({
    "&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;", '"':"&quot;"
  }[c]));
}

// ---- Charts (Chart.js) ----
function summarizeByChapter(items){
  const counts = {1:0,2:0,3:0,4:0,5:0};
  const studiedCounts = {1:0,2:0,3:0,4:0,5:0};
  for(const it of items){
    counts[it.Chapter]++;
    if(isStudied(it.Name)) studiedCounts[it.Chapter]++;
  }
  return {counts, studiedCounts};
}

function buildProgressChart(ctx, summary){
  const labels = Object.keys(summary.counts).map(n => "Ch " + n);
  const total = Object.values(summary.counts);
  const studied = Object.values(summary.studiedCounts);
  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        { label: 'Total terms', data: total },
        { label: 'Studied', data: studied }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { labels: { color: '#e6edf3' } }
      },
      scales: {
        x: { ticks: { color: '#9fb0c0' }, grid: { color: '#223043' } },
        y: { ticks: { color: '#9fb0c0' }, grid: { color: '#223043' } }
      }
    }
  });
}

// ---- Flashcards ----
function shuffle(array){
  for(let i=array.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [array[i],array[j]]=[array[j],array[i]];
  }
  return array;
}

function createFlashcards(items, mode='acronym'){
  // mode: 'acronym' => question = Acronym/Name, answer = Description
  //       'definition' => question = Description, answer = Name
  const cards = items.map(it => {
    const q = (mode === 'definition')
      ? (it.Description || it.Name)
      : (it.Acronym || it.Name);
    const a = (mode === 'definition')
      ? (it.Name || it.Acronym)
      : (it.Description || it.Name);
    return {
      Chapter: it.Chapter,
      question: q,
      answer: a,
      key: it.Name
    };
  });
  return shuffle(cards);
}

export {
  loadAllData, filterItems, renderItemsTable,
  summarizeByChapter, buildProgressChart,
  createFlashcards, CHAPTER_TITLES
};