import "./style.css";

const app = document.querySelector("#app");

app.innerHTML = `
  <div class="container">
    <header class="header">
      <h1>Frontend JavaScript Portfolio</h1>
      <p class="subtitle">Clean DOM rendering, async/await, loading & error states.</p>
    </header>

    <section class="controls">
      <button id="loadBtn" class="btn">Load Users</button>
      <button id="clearBtn" class="btn btn-secondary">Clear</button>
    </section>

    <section class="status">
      <p id="statusText" class="status-text">Click “Load Users” to fetch data.</p>
    </section>

    <section>
      <div id="grid" class="grid"></div>
    </section>
  </div>
`;

const loadBtn = document.querySelector("#loadBtn");
const clearBtn = document.querySelector("#clearBtn");
const statusText = document.querySelector("#statusText");
const grid = document.querySelector("#grid");

function setStatus(message, type = "info") {
  statusText.textContent = message;
  statusText.dataset.type = type; // used by CSS
}

function renderUsers(users) {
  grid.innerHTML = users
    .map(
      (u) => `
      <article class="card">
        <h3 class="card-title">${u.name}</h3>
        <p class="card-line"><span>Email:</span> ${u.email}</p>
        <p class="card-line"><span>Company:</span> ${u.company?.name ?? "—"}</p>
        <p class="card-line"><span>City:</span> ${u.address?.city ?? "—"}</p>
      </article>
    `
    )
    .join("");
}

async function fetchUsers() {
  setStatus("Loading users...", "loading");
  grid.innerHTML = "";

  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!res.ok) {
      throw new Error(`Request failed: ${res.status}`);
    }

    const users = await res.json();
    renderUsers(users);
    setStatus(`Loaded ${users.length} users.`, "success");
  } catch (err) {
    setStatus(`Error: ${err.message}`, "error");
  }
}

loadBtn.addEventListener("click", fetchUsers);

clearBtn.addEventListener("click", () => {
  grid.innerHTML = "";
  setStatus("Cleared. Click “Load Users” to fetch data.", "info");
});