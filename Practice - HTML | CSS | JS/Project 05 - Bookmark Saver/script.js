// dom elements
const addBtn = document.getElementById("add-bookmark");
const list = document.getElementById("bookmark-list");
const nameInput = document.getElementById("bookmark-name");
const urlInput = document.getElementById("bookmark-url");

// load bookmarks on page load
document.addEventListener("DOMContentLoaded", () => {
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
  bookmarks.forEach(b => addBookmark(b.name, b.url));
});

// add bookmark on button click
addBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const url = urlInput.value.trim();
  
  if (!name || !url || (!url.startsWith("http://") && !url.startsWith("https://"))) {
    alert(!name || !url ? "Please enter both name and URL." : "Please enter a valid URL starting with http:// or https://");
    return;
  }

  addBookmark(name, url);
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
  bookmarks.push({ name, url });
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  nameInput.value = urlInput.value = "";
});

// create and display bookmark element
function addBookmark(name, url) {
  const li = document.createElement("li");
  li.innerHTML = `<a href="${url}" target="_blank">${name}</a><button>Remove</button>`;
  li.querySelector("button").onclick = () => {
    list.removeChild(li);
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks.filter(b => b.name !== name || b.url !== url)));
  };
  list.appendChild(li);
}
