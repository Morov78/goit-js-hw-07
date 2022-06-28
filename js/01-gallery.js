import { galleryItems } from "./gallery-items.js";
// import * as basicLightbox from "basiclightbox";
// Change code below this line

const galleryEl = document.querySelector(".gallery");
makeItemsGallery(galleryItems);
galleryEl.addEventListener("click", onImageClick);
let instance = {};

function makeItemsGallery(galleryItems) {
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
  const srcLargeImage = event.target.dataset.source;
  openModal(srcLargeImage);
}
function openModal(image) {
  instance = basicLightbox.create(
    `
    <img src="${image}" width="800" height="600">;
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
  instance.show();
}
function onKeypress(event) {
  console.log(event.key);
  if (event.key === "Escape") {
    instance.close();
  }
}
// function openModal(image) {
//   const instance = basicLightbox.create(
//     `
//     <img src="${image}" width="800" height="600">
// `,
//     {
//       closable: false,
//       onShow: (instance) => {
//         document.onkeydown = (event) => {
//           if (event.key === "Escape") {
//             instance.close(() => (document.onkeydown = null));
//           }
//         };
//       },
//     }
//   );
//   instance.show();
// }
