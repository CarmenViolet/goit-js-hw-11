export function createGalleryMarkup(array) {
    return array.reduce((acc, {largeImageURL, webformatURL, tags, likes, views, comments, downloads}) => acc + `
    <div class="photo-card">
    <a href="${largeImageURL}"></a>
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${likes}
    </p>
    <p class="info-item">
      <b>Views</b>${views}
    </p>
    <p class="info-item">
      <b>Comments</b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${downloads}
    </p>
  </div>
</div>`, "");
}