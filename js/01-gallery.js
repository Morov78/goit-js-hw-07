import { galleryItems } from "./gallery-items.js";
// import * as basicLightbox from "basiclightbox";
// Change code below this line

const galleryEl = document.querySelector(".gallery");
makeItemsGalleryEl(galleryItems);
galleryEl.addEventListener("click", onImageClick);
const instance = basicLightbox.create(
  `
    <img src="" width="800" height="600">;
    
`,
  {
    closable: false,
    onShow: (instance) => {
      window.addEventListener("keydown", onKeypress);
    },
    onClose: (instance) => {
      window.removeEventListener("keydown", onKeypress);
    },
  }
);

function makeItemsGalleryEl(galleryItems) {
  const galleryMarkup = galleryItems
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
        <a class="gallery__link" target="_self" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </div>`;
    })
    .join(" ");
  galleryEl.insertAdjacentHTML("afterbegin", galleryMarkup);
}
function onImageClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  instance.element().querySelector("img").src = event.target.dataset.source;
  instance.show();
}

function onKeypress(event) {
  console.log(event.key);
  if (event.key === "Escape") {
    instance.close();
  }
}
