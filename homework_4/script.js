fetch('https://api.artic.edu/api/v1/artworks?page=1&limit=10')
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

      if (imageUrl && title) {
        const titleElement = document.createElement('h2');
        titleElement.textContent = title;
        artworkElement.appendChild(titleElement);

        const imageElement = document.createElement('img');
        imageElement.src = imageUrl;
        imageElement.alt = title;
        
        artworkElement.appendChild(imageElement);

        artworkElement.appendChild(buttonElement);

        const containerElement = document.getElementById('container');
        containerElement.appendChild(artworkElement);
      }
    });
  })
  .catch(error => console.error(error));
