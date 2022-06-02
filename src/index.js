const root = document.getElementById("app");

// Just simple way to generate needed HTML
const myDivs = ["one", "two", "three", "four", "kotik"];
let htmlDivs = "";
for (const el in myDivs) {
  htmlDivs =
    htmlDivs +
    `<div id="${myDivs[el]}" class="drag" draggable="true">${myDivs[el]}</div>`;
}

root.innerHTML = `
<main class="dnd-wrapper">
    ${htmlDivs}
    <div class="zone">here</div>
</main>
    `;

const init = () => {
  const drags = Array.from(document.querySelectorAll(".drag"));
  drags.map((drag) =>
    drag.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", e.target.id);
    })
  );

  const dropzone = document.querySelector(".zone");

  dropzone.addEventListener("dragenter", (e) => {
    e.target.classList.add("active");
  });
  dropzone.addEventListener("dragleave", (e) =>
    e.target.classList.remove("active")
  );
  dropzone.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  dropzone.addEventListener("drop", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const id = e.dataTransfer.getData("text/plain");
    const element = document.getElementById(id);
    dropzone.append(element);
    e.target.classList.remove("active");
  });
};

// Check if element has draggable property in it
if ("draggable" in document.createElement("div")) {
  init();
}
