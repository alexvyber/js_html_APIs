const root = document.getElementById("app");
root.innerHTML = `
<main class="dnd-wrapper">
    <div id="one" class="drag" draggable="true">One</div>
    <div id="two" class="drag" draggable="true">Two</div>
    <div id="three" class="drag" draggable="true">Three</div>
    <div class="zone">here</div>
</main>
<style>
    body {
        background: #f6f6f6;
        padding: 20px;
    font-family: sans-serif;
    }
.dnd-wrapper {
    max-width: 748px;
    padding: 10px 25px;
    margin: 25px auto;
    background: #fff;
    border-radius: 12px;
    }

.drag {
 background: #cfcfff;
    // height: 48px;
    padding: 14px 20px;
    margin: 20px auto;
    border-radius: 8px

}

.drag-active {
    width: 50%;
    background: #efe;
}

.zone {
    padding: 25px;
    margin: 20px auto;
    border: 2px dashed #ddd;
    border-radius: 8px;
    background: #f8f8ff;

}

.active {
    background: #eeffee;
    border-color: #aaffaa;
}
    </style>

    `;

const init = () => {
  const drags = Array.from(document.querySelectorAll(".drag"));
  // console.log(drags);
  drags.map((drag) =>
    drag.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData('text/plain', e.target.id)
      // console.log(e.target);
    })
  );

  const dropzone = document.querySelector(".zone");

  dropzone.addEventListener("dragenter", (e) => {
    // console.log(e);
    e.target.classList.add("active");
    // dropzone.classList.add("active");
  });
  dropzone.addEventListener("dragleave", (e) =>
    e.target.classList.remove("active")
  );
  dropzone.addEventListener("dragover", (e) => {
    // console.log("dragging...");
    e.preventDefault();
    // e.dataTransfer.dropEffect = "move";
    // console.log(e.dataTransfer)
  });
  dropzone.addEventListener("drop", (e) => {
    e.preventDefault();
    e.stopPropagation();
    // e.dataTransfer.dropEffect = "move";
    console.log(e.dataTransfer.getData('text/plain'));

      const id = e.dataTransfer.getData('text/plain')
      const element = document.getElementById(id)
      dropzone.append(element)
    e.target.classList.remove("active");
  });
};

// console.dir(document.createElement('div'))
// console.log('draggable' in document.createElement('div'))

if ("draggable" in document.createElement("div")) {
  init();
}
