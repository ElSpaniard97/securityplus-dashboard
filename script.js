// =====================================================
// Security+ Dashboard Script
// Supports per-user tracking, flashcards, chapters, search
// =====================================================

// --- Global user isolation ---
export const USER = localStorage.getItem("securityplus_user") || "Guest";
export const STUDIED_PREFIX = `securityplus_${USER}_studied::`;
export const REVIEW_PREFIX  = `securityplus_${USER}_review_cards`;

// --- Chapter Titles (edit if you add/remove chapters) ---
export const CHAPTER_TITLES = {
  1: "Chapter 1",
  2: "Chapter 2",
  3: "Chapter 3",
  4: "Chapter 4",
  5: "Chapter 5"
};

// =====================================================
// Load and parse all JSON chapter files
// =====================================================
export async function loadAllData(){
  const chapters = [1,2,3,4,5];
  const data = [];
  for(const ch of chapters){
    try{
      const res = await fetch(`data/chapter${ch}.json`);
      const arr = await res.json();
      arr.forEach(x => x.Chapter = ch);
      data.push(...arr);
    } catch(e){
      console.error("Error loading chapter "+ch, e);
    }
  }
  return data;
}

// =====================================================
// Data Filtering and Table Rendering
// =====================================================
export function filterItems(all, query, chapter){
  const q = query.toLowerCase();
  return all.filter(it =>
    (chapter === 0 || it.Chapter === chapter) &&
    (it.Acronym?.toLowerCase().includes(q) ||
     it.Name?.toLowerCase().includes(q) ||
     it.Description?.toLowerCase().includes(q))
  );
}

export function renderItemsTable(tbody, items){
  tbody.innerHTML = "";
  for(const it of items){
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${it.Chapter}</td>
      <td>${it.Acronym || ""}</td>
      <td>${it.Name || ""}</td>
      <td>${it.Description || ""}</td>
      <td><input type="checkbox" ${isStudied(it.Name) ? "checked" : ""}></td>
    `;
    const checkbox = tr.querySelector("input");
    checkbox.addEventListener("change", e => {
      setStudied(it.Name, e.target.checked);
    });
    tbody.appendChild(tr);
  }
}

// =====================================================
// Studied Item Storage Helpers
// =====================================================
export function storageKeyForItem(name){
  return `${STUDIED_PREFIX}${name}`;
}

export function isStudied(name){
  return localStorage.getItem(storageKeyForItem(name)) === "true";
}

export function setStudied(name, val){
  localStorage.setItem(storageKeyForItem(name), val ? "true" : "false");
}

// =====================================================
// Flashcards
// =====================================================
export function createFlashcards(items, mode="acronym"){
  const cards = [];
  for(const it of items){
    const question = mode === "definition"
      ? (it.Description || "")
      : (it.Acronym || it.Name || "");
    const answer = mode === "definition"
      ? (it.Name || it.Acronym || "")
      : (it.Description || "");
    cards.push({
      key: it.Name,
      question,
      answer,
      Name: it.Name,
      Chapter: it.Chapter
    });
  }
  // Shuffle for randomness
  return cards.sort(() => Math.random() - 0.5);
}

// =====================================================
// Dashboard Analytics
// =====================================================
export function summarizeByChapter(all){
  const map = {};
  for(const it of all){
    const ch = it.Chapter;
    if(!map[ch]) map[ch] = { total: 0, studied: 0 };
    map[ch].total++;
    if(isStudied(it.Name)) map[ch].studied++;
  }
  return Object.keys(map).map(ch => ({
    chapter: ch,
    studied: map[ch].studied,
    total: map[ch].total
  }));
}

export function buildProgressChart(ctx, summary){
  const labels = summary.map(x => `Ch ${x.chapter}`);
  const studied = summary.map(x => x.studied);
  const total = summary.map(x => x.total);

  new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Studied",
          data: studied,
          backgroundColor: "#fca311"
        },
        {
          label: "Total",
          data: total,
          backgroundColor: "#e5e7eb"
        }
      ]
    },
    options: {
      responsive: true,
      plugins: { legend: { position: "bottom" } },
      scales: { y: { beginAtZero: true } }
    }
  });
}
