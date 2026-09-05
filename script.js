document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("dataForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const entry = {
        workDate: document.getElementById("workDate").value,
        co186: document.getElementById("co186").value || 0,
        co252: document.getElementById("co252").value || 0,
        c210: document.getElementById("c210").value || 0,
        c18626: document.getElementById("c18626").value || 0,
        anthem: document.getElementById("anthem").value || 0,
        humana: document.getElementById("humana").value || 0,
        uhc: document.getElementById("uhc").value || 0,
        roi: document.getElementById("roi").value || 0,
      };
      entry.total = Object.values(entry).slice(1).reduce((a,b)=>a+Number(b),0);
      entry.status = entry.total >= 64 ? "✅" : "❌";
      entry.percent = entry.total ? ((entry.total/64)*100).toFixed(2)+"%" : "";

      let data = JSON.parse(localStorage.getItem("productionData") || "[]");
      const editIndex = form.getAttribute("data-edit-index");
      if (editIndex !== null) {
        data[editIndex] = entry;
        form.removeAttribute("data-edit-index");
      } else {
        data.push(entry);
      }
      localStorage.setItem("productionData", JSON.stringify(data));
      alert("Data saved!");
      form.reset();
    });
  }

  const tableBody = document.getElementById("dataRows");
  if (tableBody) {
    const data = JSON.parse(localStorage.getItem("productionData") || "[]");
    let totalSum = 0, percentSum = 0;
    data.forEach((row, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${row.workDate}</td>
        <td>${row.co186}</td>
        <td>${row.co252}</td>
        <td>${row.c210}</td>
        <td>${row.c18626}</td>
        <td>${row.anthem}</td>
        <td>${row.humana}</td>
        <td>${row.uhc}</td>
        <td>${row.roi}</td>
        <td>${row.total}</td>
        <td>${row.status}</td>
        <td>${row.percent}</td>
        <td>
          <button onclick="editEntry(${index})">Edit</button>
          <button onclick="deleteEntry(${index})">Delete</button>
        </td>
      `;
      tableBody.appendChild(tr);
      totalSum += row.total;
      percentSum += parseFloat(row.percent) || 0;
    });
    document.getElementById("totalSum").textContent = totalSum;
    document.getElementById("avgPercent").textContent = (percentSum/data.length).toFixed(2)+"%";
  }
});

function deleteEntry(index) {
  let data = JSON.parse(localStorage.getItem("productionData") || "[]");
  data.splice(index, 1);
  localStorage.setItem("productionData", JSON.stringify(data));
  location.reload();
}

function editEntry(index) {
  let data = JSON.parse(localStorage.getItem("productionData") || "[]");
  const entry = data[index];
  window.location.href = "add.html?edit=" + index;
}

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  if (params.has("edit")) {
    const
