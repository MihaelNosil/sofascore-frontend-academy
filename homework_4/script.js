let page = 1;
function loadArtworks() {
  fetch('https://api.artic.edu/api/v1/artworks?page=$(page)&limit=10')
    .then(response => response.json())
    .then(data => {
      const artworks = data.data;

      const titleList = document.createElement('ul');

      console.log(page);
      console.log(`https://api.artic.edu/api/v1/artworks?page=${page}&limit=10`);

      artworks.forEach(artwork => {
        const title = artwork.title;
        const imageUrl = artwork.image_id ? `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg` : null;

        const artworkElement = document.createElement('div');
        artworkElement.classList.add('artwork-image');

        const hideArtworkButton = document.createElement('button');
        hideArtworkButton.textContent = 'Hide';
        hideArtworkButton.addEventListener('click', () => {
          artworkElement.style.display = 'none';
        });

        const infoArtworkContainer = document.createElement('div');
        infoArtworkContainer.classList.add('info-container');
        infoArtworkContainer.style.display = 'none';

        const infoArtworkElement = document.createElement('p');
        infoArtworkElement.textContent = artwork.thumbnail.alt_text;
        infoArtworkContainer.appendChild(infoArtworkElement);

        const artworkAccordionButton = document.createElement('button');
          artworkAccordionButton.textContent = 'Show more';
          artworkAccordionButton.addEventListener('click', () => {
            if (infoArtworkContainer.style.display === 'none') {
              infoArtworkContainer.style.display = 'block';
              artworkAccordionButton.textContent = 'Show less';
            } else {
              infoArtworkContainer.style.display = 'none';
              artworkAccordionButton.textContent = 'Show more';
            }
          });

        if (imageUrl && title) {
          const artworkTitleElement = document.createElement('h2');
          artworkTitleElement.textContent = title;
          artworkElement.appendChild(artworkTitleElement);

          const artworkImageElement = document.createElement('img');
          artworkImageElement.src = imageUrl;
          artworkImageElement.alt = title;

          artworkElement.appendChild(artworkImageElement);
          artworkElement.appendChild(hideArtworkButton);
          artworkElement.appendChild(infoArtworkContainer);
          artworkElement.appendChild(artworkAccordionButton);


          const containerElement = document.getElementById('container');
          containerElement.appendChild(artworkElement);
        }
      });

      page++;

      if (page <= data.pagination.total_pages) {
        const nextButton = document.createElement('button');
        nextButton.textContent = 'More';
        nextButton.addEventListener('click', loadArtworks);
        const containerElement = document.getElementById('container');
        containerElement.appendChild(nextButton);
      }
    })
    .catch(error => console.error(error));
}

loadArtworks();

const showAllArtworksButton = document.createElement('button');
showAllArtworksButton.textContent = 'Show all';
showAllArtworksButton.addEventListener('click', () => {
  const artworkElements = document.querySelectorAll('.artwork-image');
  artworkElements.forEach(artworkElement => {
    artworkElement.style.display = 'flex';
  });
});
const containerElement = document.getElementById('container');
containerElement.parentNode.insertBefore(showAllArtworksButton, containerElement);