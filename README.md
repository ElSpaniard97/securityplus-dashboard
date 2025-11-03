# 🧠 Security+ Study Dashboard

A modern, multi-user web dashboard for studying **CompTIA Security+** using dynamic data, progress tracking, and flashcards — built with HTML, CSS, and JavaScript, and fully deployable on **GitHub Pages**.
Visit https://elspaniard97.github.io/securityplus-dashboard/

---

## 🚀 Features

### 👥 Multi-User Login
- Two user profiles:
  - **Ezekiel Correa** — PIN `8290`
  - **Guest** — PIN `1234`
- Each user’s progress, flashcard reviews, and study data are saved **separately** via `localStorage`.

### 🧭 Navigation
- **Overview** → KPI dashboard with charts showing study progress  
- **Chapters** → Browse terms by chapter, mark items as “studied”  
- **Flashcards** → Flip cards, mark for review, review-only mode  
- **Search** → Global search across all chapters  
- **Logout** → Switch users safely at any time  

### 📊 Analytics
- Real-time **bar chart**: Studied vs. total terms per chapter  
- Circular **progress ring**: Overall completion percentage  

### ⭐ Flashcard Review System
- Click any flashcard to **flip** and reveal the answer  
- Mark cards for **future review**  
- Use **Review Only** mode to study just marked cards  
- Includes a **Reset Reviews** option  

### 🎨 Design
- Modern responsive UI inspired by admin dashboards  
- Sidebar navigation with icons  
- Orange-blue palette (`#14213d`, `#fca311`, `#f5f7fa`)  
- Consistent spacing, rounded corners, and soft shadows  

---

## 🧩 Folder Structure

securityplus-dashboard/
│
├── index.html # Overview dashboard
├── chapters.html # Browse study chapters
├── flashcards.html # Interactive flashcard mode
├── search.html # Search across all chapters
├── login.html # Multi-user login page
│
├── style.css # Main theme and layout
├── script.js # Core logic and user isolation
│
├── data/
│ ├── chapter1.json
│ ├── chapter2.json
│ ├── chapter3.json
│ ├── chapter4.json
│ └── chapter5.json
│
└── README.md

yaml
Copy code

---

## 🧱 Local Development

### 1. Clone the repository
```bash
git clone https://elspaniard97.github.io/securityplus-dashboard/
cd securityplus-dashboard
2. Run locally
Use VS Code Live Server or any local web server to test:

bash
Copy code
# Example (Python 3)
python3 -m http.server
Then open http://localhost:8000/login.html

3. Log In
Username	PIN
Ezekiel Correa	8290
Guest	1234

🌐 GitHub Pages Deployment
Push all files to a public GitHub repository.

Go to Settings → Pages.

Under “Source,” choose:

Deploy from a branch

Branch: main (or master)

Folder: / (root)

Save changes — GitHub Pages will provide your live link:

arduino
Copy code
https://<your-username>.github.io/securityplus-dashboard/
💾 Data Persistence
All progress, reviews, and study markers are stored locally:

Data Type	Key Format Example
Studied Items	securityplus_Ezekiel Correa_studied::VPN
Review Cards	securityplus_Ezekiel Correa_review_cards

Each user’s data is completely isolated.

🔧 Customization
Add New Chapters
Place a new JSON file in the /data folder (e.g., chapter6.json).

Add a title entry in script.js:

js
Copy code
export const CHAPTER_TITLES = {
  1: "Chapter 1",
  2: "Chapter 2",
  3: "Chapter 3",
  4: "Chapter 4",
  5: "Chapter 5",
  6: "Chapter 6"
};
Add a <option> for Chapter 6 in flashcards.html.

Add New Users
In login.html, modify:

js
Copy code
const USERS = {
  "Ezekiel Correa": "8290",
  "Guest": "1234",
  "NewUser": "5678"
};
🧹 Maintenance
Reset all local data by clearing browser storage:

Developer Tools → Application → Local Storage → Clear All

Update data sets by replacing JSON files in /data/.

📜 License
This project is released under the MIT License.
Free for personal and educational use.

💡 Credits
Built by Ezekiel Correa
Designed and implemented with HTML, CSS, and modern JavaScript (ES6 modules)
Styled using your uploaded dashboard reference image for the UI layout.
