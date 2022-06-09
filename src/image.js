const root = document.getElementById("image");

// Just simple way to generate needed HTML

root.innerHTML = `
    <main class="dnd-wrapper">
    <h1>Image Uploader</h1>
    <h4>Accepts only .jpg, .png, .svg files</h4>
    <div id="image-zone" class="zone">DropZone</div>
    <section id="image-preview" class="image-preview"></section>
</main>
    `;

const isAllowedType = (file) =>
  ["image/jpeg", "image/png", "image/svg+xml"].includes(file.type);

const init = () => {
  const dropzone = document.querySelector("#image-zone");
  const preview = document.querySelector("#image-preview");

    preview.addEventListener('drop', e => { e.stopPropagation() ; e.preventDefault() }) 

  // Image preview
  const showFilePreview = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", (e) => {

        const imagePreview = document.createElement('div')
      const img = document.createElement("img");

      img.className = "image-preview-item";
        console.log(e.target)
        console.log(file)
        img.src = e.target.result
        img.alt = file.name

        const info = document.createElement('aside')
        info.innerHTML = `<span style="display: block; margin-bottom: 10px">Name: ${file.name}</span>  Size: ${ (file.size / 1024 ).toFixed(2) } Kb`
        info.style.width = "320px"
        // info.style.padding = "10px"
            

        imagePreview.append(img)
        imagePreview.append(info)
        preview.append(imagePreview)
    });
  };

  const handleFileUpload = (files) => {
    // for (let i = 0; i < files.length ; i++) {
    //     const file = files.item(0)
    //     console.log(isTypeAllowed(file))
    // }

    const filesToUpload = [...files].filter(isAllowedType);
    filesToUpload.map((f) => showFilePreview(f));
  };

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

    // console.log(e.dataTransfer.files)
    handleFileUpload(e.dataTransfer.files);

    e.target.classList.remove("active");
  });
};

// Check if element has draggable property in it
if ("draggable" in document.createElement("div")) {
  init();
}
