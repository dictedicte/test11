
function filterItems() {
  const input = document.getElementById("search").value.toLowerCase();
  const items = document.querySelectorAll(".timeline li");

  items.forEach(item => {
    const pText = item.querySelector("p")?.textContent.toLowerCase() || "";
    const h5Text = item.querySelector("h5")?.textContent.toLowerCase() || "";

    if (pText.includes(input) || h5Text.includes(input)) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });
}