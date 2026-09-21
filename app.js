// ============================================================
// LOGIC HIỂN THỊ / TÌM KIẾM / SẮP XẾP
// File này đọc dữ liệu từ biến DATA (định nghĩa trong data.js).
// Không cần sửa file này khi thêm quán mới.
// ============================================================

// --- Vietnamese-friendly search: strip diacritics + tone marks, handle đ/Đ, lowercase ---
function normalizeVN(str){
  return (str || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();
}

// Tra badge class theo tên category — thêm category mới ở đây khi cần,
// nhớ tạo class .badge-xxx tương ứng trong style.css.
const BADGE_MAP = {
  "Buffet": "badge-buffet",
  "Ăn vặt": "badge-vat",
  "Gà Hàn": "badge-ga",
  "Trà sữa": "badge-tra-sua",
  "Cơm gà": "badge-com-ga",
  "Bún": "badge-bun",
  "Cháo": "badge-chao",
  "Chè": "badge-che",
  "Phở": "badge-pho",
  "Bingsu": "badge-bingsu",
  "Mì": "badge-mi",
  "Hủ tiếu": "badge-hu-tieu",
  "Xíu mại": "badge-xiu-mai",
  "Bánh mì": "badge-banh-mi",
  "Cơm": "badge-com",
  "Chay": "badge-chay",
  "Trà trái cây": "badge-tra-trai-cay",
  "Bột chiên": "badge-bot-chien",
  "Bánh tráng": "badge-banh-trang",
  "Cafe": "badge-cafe",
  "Matcha": "badge-matcha",
  "Kem": "badge-kem",
};
function badgeFor(cat){
  return BADGE_MAP[cat] || "badge-vat"; // fallback nếu quên khai báo màu
}

const CATEGORIES = ["Tất cả", ...Array.from(new Set(DATA.flatMap(d => d.categories)))];

// Giữ lại thứ tự thêm vào ban đầu trong data.js, dùng làm sắp xếp mặc định.
DATA.forEach((d, i) => { d.__order = i; });

let state = { category: "Tất cả", query: "", sortKey: "order", sortDir: -1 };
const randomWeights = new Map();

function renderTabs(){
  const tabsEl = document.getElementById("tabs");
  tabsEl.innerHTML = "";
  CATEGORIES.forEach(cat => {
    const li = document.createElement("li");
    li.className = "nav-item";
    const btn = document.createElement("button");
    btn.className = "nav-link" + (state.category === cat ? " active" : "");
    btn.type = "button";
    btn.textContent = cat;
    btn.addEventListener("click", () => { state.category = cat; render(); });
    li.appendChild(btn);
    tabsEl.appendChild(li);
  });
}

function getFiltered(){
  let rows = DATA.filter(r => state.category === "Tất cả" || r.categories.includes(state.category));
  if(state.query.trim()){
    const q = normalizeVN(state.query);
    rows = rows.filter(r => {
      const haystack = [
        r.name,
        ...r.categories,
        r.note,
        ...r.branches.map(b => b.label),
        ...r.branches.map(b => b.address)
      ].map(normalizeVN).join(" | ");
      return haystack.includes(q);
    });
  }
  rows = rows.slice().sort((a,b) => {
    if(state.sortKey === "random"){
      return randomWeights.get(a) - randomWeights.get(b);
    }
    if(state.sortKey === "order"){
      return (a.__order - b.__order) * state.sortDir;
    }
    let av, bv;
    if(state.sortKey === "address"){
      av = a.branches[0].address; bv = b.branches[0].address;
    } else if(state.sortKey === "category"){
      av = a.categories.join(", "); bv = b.categories.join(", ");
    } else {
      av = (a[state.sortKey] || "").toString();
      bv = (b[state.sortKey] || "").toString();
    }
    av = normalizeVN(av); bv = normalizeVN(bv);
    if(av < bv) return -1 * state.sortDir;
    if(av > bv) return 1 * state.sortDir;
    return 0;
  });
  return rows;
}

function renderTable(){
  const rows = getFiltered();
  const body = document.getElementById("table-body");
  body.innerHTML = "";

  if(rows.length === 0){
    body.innerHTML = '<tr class="empty-row"><td colspan="4">Không tìm thấy quán nào.</td></tr>';
  } else {
    rows.forEach(r => {
      const tr = document.createElement("tr");
      const branchBlocks = r.branches.map(b => {
        const dirUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(b.address)}`;
        return `
        <div class="branch-block">
          ${b.label ? `<span class="branch-label">${b.label}</span>` : ""}
          <div class="branch-addr">${b.address} <a class="branch-directions" href="${dirUrl}" target="_blank" rel="noopener" title="Chỉ đường">📍</a></div>
          <div class="branch-meta">
            <span class="branch-hours">${b.hours}</span>
            ${b.phone ? `<span class="branch-phone">· ${b.phone}</span>` : ""}
          </div>
        </div>
      `;
      }).join("");
      const badgeBlocks = r.categories.map(cat =>
        `<span class="badge rounded-pill ${badgeFor(cat)}">${cat}</span>`
      ).join("");
      tr.innerHTML = `
        <td class="col-name">
          <span class="name-vn">${r.name}</span>
        </td>
        <td><div class="badge-list">${badgeBlocks}</div></td>
        <td data-label="Chi nhánh"><div class="branch-list">${branchBlocks}</div></td>
        <td class="note" data-label="Ghi chú">
          <div class="note-text">${r.note}</div>
          <button type="button" class="note-toggle d-none">Xem thêm</button>
        </td>
      `;
      body.appendChild(tr);
    });
  }

  document.getElementById("count-visible").textContent = rows.length;
  initNoteToggles();
}

function initNoteToggles(){
  const isMobile = window.matchMedia("(max-width: 700px)").matches;

  document.querySelectorAll(".note").forEach(cell => {
    const text = cell.querySelector(".note-text");
    const btn = cell.querySelector(".note-toggle");

    text.classList.remove("expanded");
    btn.classList.add("d-none");
    btn.textContent = "Xem thêm";

    if(isMobile){
      text.style.display = "";
      text.style.webkitBoxOrient = "";
      text.style.webkitLineClamp = "";
      text.style.overflow = "";

      if(text.scrollHeight > text.clientHeight + 1){
        btn.classList.remove("d-none");
        btn.onclick = () => {
          const expanded = text.classList.toggle("expanded");
          btn.textContent = expanded ? "Thu gọn" : "Xem thêm";
        };
      }
    } else {
      const row = cell.closest("tr");
      const branchCell = row.children[2];
      if(!branchCell) return;

      const branchList = branchCell.querySelector(".branch-list");
      const targetHeight = branchList ? branchList.offsetHeight : branchCell.offsetHeight;
      const naturalHeight = text.scrollHeight;

      const lineHeight = parseFloat(getComputedStyle(text).lineHeight) || 20;
      const naturalLines = Math.round(naturalHeight / lineHeight);
      const maxLines = Math.max(1, Math.floor(targetHeight / lineHeight));

      const applyClamp = (lines) => {
        text.style.display = "-webkit-box";
        text.style.webkitBoxOrient = "vertical";
        text.style.webkitLineClamp = lines;
        text.style.overflow = "hidden";
      };
      const showFull = () => {
        text.style.display = "-webkit-box";
        text.style.webkitBoxOrient = "vertical";
        text.style.webkitLineClamp = "none";
        text.style.overflow = "visible";
      };

      if(naturalLines > maxLines){
        applyClamp(maxLines);
        btn.classList.remove("d-none");
        btn.onclick = () => {
          const collapsed = text.style.webkitLineClamp !== "none" && text.style.webkitLineClamp !== "";
          if(collapsed){
            text.style.webkitLineClamp = "none";
            text.style.overflow = "visible";
            btn.textContent = "Thu gọn";
          } else {
            applyClamp(maxLines);
            btn.textContent = "Xem thêm";
          }
        };
      } else {
        showFull();
      }
    }
  });
}

function renderSortIndicators(){
  document.querySelectorAll("thead th").forEach(th => {
    th.classList.remove("sorted");
    const arrow = th.querySelector(".arrow");
    if(th.dataset.key === state.sortKey){
      th.classList.add("sorted");
      arrow.textContent = state.sortDir === 1 ? "▾" : "▴";
    } else {
      arrow.textContent = "▾";
    }
  });
}

function render(){
  renderTabs();
  renderTable();
  renderSortIndicators();
  document.getElementById("random-btn").classList.toggle("active", state.sortKey === "random");
}

document.querySelectorAll("thead th").forEach(th => {
  th.addEventListener("click", () => {
    const key = th.dataset.key;
    if(state.sortKey === key){ state.sortDir *= -1; }
    else { state.sortKey = key; state.sortDir = 1; }
    render();
  });
});

document.getElementById("random-btn").addEventListener("click", () => {
  DATA.forEach(r => randomWeights.set(r, Math.random()));
  state.sortKey = "random";
  render();
});

document.getElementById("search-input").addEventListener("input", (e) => {
  state.query = e.target.value;
  render();
});

let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(initNoteToggles, 150);
});

render();