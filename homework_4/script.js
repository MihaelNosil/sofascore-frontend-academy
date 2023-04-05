let page = 1;
function loadArtworks() {
  fetch('https://api.artic.edu/api/v1/artworks?page=$(page)&limit=10')
    .then(response => response.json())
    .then(data => {
      const artworks = data.data;

      const titleList = document.createElement('ul');

      artworks.forEach(artwork => {
        const title = artwork.title;
        const imageUrl = artwork.image_id ? `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg` : null;

        const artworkElement = document.createElement('div');
        artworkElement.classList.add('artwork-image');

        const buttonElement = document.createElement('button');
        buttonElement.textContent = 'Hide';
        buttonElement.addEventListener('click', () => {
          artworkElement.style.display = 'none';
        });

        const infoContainer = document.createElement('div');
        infoContainer.classList.add('info-container');
        infoContainer.style.display = 'none';

        const infoElement = document.createElement('p');
        infoElement.textContent = artwork.thumbnail.alt_text;
        infoContainer.appendChild(infoElement);

        if (imageUrl && title) {
          const titleElement = document.createElement('h2');
          titleElement.textContent = title;
          artworkElement.appendChild(titleElement);

          const imageElement = document.createElement('img');
          imageElement.src = imageUrl;
          imageElement.alt = title;

          artworkElement.appendChild(imageElement);

          artworkElement.appendChild(buttonElement);

          artworkElement.appendChild(infoContainer);

          const accordionButton = document.createElement('button');
          accordionButton.textContent = 'Show more';
          accordionButton.addEventListener('click', () => {
            if (infoContainer.style.display === 'none') {
              infoContainer.style.display = 'block';
              accordionButton.textContent = 'Show less';
            } else {
              infoContainer.style.display = 'none';
              accordionButton.textContent = 'Show more';
            }
          });
          artworkElement.appendChild(accordionButton);


          const containerElement = document.getElementById('container');
          containerElement.appendChild(artworkElement);
        }
      });
      page++;

      if (page <= data.pagination.total_pages) {
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.addEventListener('click', loadArtworks);
        const containerElement = document.getElementById('container');
        containerElement.appendChild(nextButton);
      }
    })
    .catch(error => console.error(error));
}

loadArtworks();

const showAllButton = document.createElement('button');
showAllButton.textContent = 'Show all';
showAllButton.addEventListener('click', () => {
  const artworkElements = document.querySelectorAll('.artwork-image');
  artworkElements.forEach(artworkElement => {
    artworkElement.style.display = 'block';
  });
});
const containerElement = document.getElementById('container');
containerElement.parentNode.insertBefore(showAllButton, containerElement);