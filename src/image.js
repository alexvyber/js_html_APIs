const root = document.getElementById("image");

// Just simple way to generate needed HTML
root.innerHTML = `
    <main class="dnd-wrapper">
    <h1>Image Uploader</h1>
    <h4>Accepts only .jpg, .png, .svg files</h4>


    <label for="file-input">
    File
    </label>
    <input type="file" id="file-input" class="file-input" accept="image/*" multiple>


    <div id="image-zone" class="zone">DropZone</div>
    <section id="image-preview" class="image-preview"></section>
</main>
    `;

const isAllowedType = (file) =>
  ["image/jpeg", "image/png", "image/svg+xml"].includes(file.type);

const init = () => {
  const dropzone = document.querySelector("#image-zone");
  const preview = document.querySelector("#image-preview");
  const files = document.querySelector("#file-input");

  preview.addEventListener("drop", (e) => {
    e.stopPropagation();
    e.preventDefault();
  });

  // Image preview
  const showFilePreview = (file) => {
      // uploader(file)
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", (e) => {
      const imagePreview = document.createElement("div");
      const img = document.createElement("img");

      img.className = "image-preview-item";
      // console.log(e.target);
      // console.log(file);
      img.src = e.target.result;
      img.alt = file.name;

      const info = document.createElement("aside");
      info.innerHTML = `<span style="display: block; margin-bottom: 10px">Name: ${
        file.name
      }</span>  Size: ${(file.size / 1024).toFixed(2)} Kb`;
      info.style.width = "320px";
      // info.style.padding = "10px"

      imagePreview.append(img);
      imagePreview.append(info);
      preview.append(imagePreview);
    });
  };

  const uploadFiles = async (files) => {
    const form = new FormData();

    const f = [...files];
    f.forEach((file) => form.append(file.name, file));

    // console.log(form)
    //   console.log([...form.entries()])

    const request = await fetch("http://localhost:4300/upload", {
      method: "POST",
      body: form,
    });

    return await (request.json());
  };

  const handleFileUpload = async (files) => {
    // for (let i = 0; i < files.length ; i++) {
    //     const file = files.item(0)
    //     console.log(isTypeAllowed(file))
    // }

    const filesToUpload = [...files].filter(isAllowedType);
    filesToUpload.map((f) => showFilePreview(f));

    const uploaded = await uploadFiles(filesToUpload);
      uploaded && console.log(uploaded.images)
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
    files.addEventListener("change", e => handleFileUpload(e.target.files))
};

// Check if element has draggable property in it
if ("draggable" in document.createElement("div")) {
  init();
}
