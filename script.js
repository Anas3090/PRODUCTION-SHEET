// Example using localStorage (can be replaced with Firebase/Google Sheets API)
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("dataForm");
  const tableBody = document.getElementById("dataRows");

  // Load existing data
  let data = JSON.parse(localStorage.getItem("productionData")) || [];

  function renderTable() {
    if (!tableBody) return;
    tableBody.innerHTML = "";
    data.forEach((row, index) => {
      const tr = document.createElement("tr");
      Object.values(row).forEach(val => {
        const td = document.createElement("td");
        td.textContent = val;
        tr.appendChild(td);
      });
      // Add delete button
      const tdDelete = document.createElement("td");
      const btn = document.createElement("button");
      btn.textContent = "Delete";
      btn.onclick = () => {
        data.splice(index, 1);
        localStorage.setItem("productionData", JSON.stringify(data));
        renderTable();
      };
      tdDelete.appendChild(btn);
      tr.appendChild(tdDelete);
      tableBody.appendChild(tr);
    });
  }

  renderTable();

  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const formData = new FormData(form);
      const newRow = {};
      formData.forEach((value, key) => newRow[key] = value);
      data.push(newRow);
      localStorage.setItem("productionData", JSON.stringify(data));
      form.reset();
      alert("Data saved!");
    });
  }
});
