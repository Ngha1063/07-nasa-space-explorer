
const API_KEY = "DEMO_KEY";


const startInput = document.getElementById("startDate");
const endInput = document.getElementById("endDate");


const button = document.getElementById("getImages");


const gallery = document.getElementById("gallery");


const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");
const closeModal = document.getElementById("closeModal");


const factSection = document.getElementById("spaceFact");



setupDateInputs(startInput, endInput);



/* ---------------------------
   RANDOM SPACE FACT
--------------------------- */

const spaceFacts = [
  "Neutron stars can spin 600 times per second.",
  "A day on Venus is longer than its year.",
  "Saturn could float in water because it’s mostly gas.",
  "There are more trees on Earth than stars in the Milky Way.",
  "The footprints on the Moon will stay there for millions of years.",
  "One million Earths could fit inside the Sun."
];

function showRandomFact() {
  const randomIndex = Math.floor(Math.random() * spaceFacts.length);
  factSection.innerText = "Did You Know? " + spaceFacts[randomIndex];
}

showRandomFact();




function showLoading() {
  gallery.innerHTML = "<p>🔄 Loading space photos...</p>";
}




async function getSpaceImages() {

  const startDate = startInput.value;
  const endDate = endInput.value;

  const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${startDate}&end_date=${endDate}`;

  showLoading();

  try {

    const response = await fetch(url);
    const data = await response.json();

    displayGallery(data);

  } catch (error) {

    gallery.innerHTML = "<p>Error loading images.</p>";
    console.error(error);

  }

}




function displayGallery(images) {

  gallery.innerHTML = "";

  images.forEach(item => {

    const card = document.createElement("div");
    card.classList.add("gallery-item");




    if (item.media_type === "image") {

      card.innerHTML = `
        <img src="${item.url}" alt="${item.title}">
        <h3>${item.title}</h3>
        <p>${item.date}</p>
      `;

    }




    else if (item.media_type === "video") {

      card.innerHTML = `
        <iframe src="${item.url}" frameborder="0" allowfullscreen></iframe>
        <h3>${item.title}</h3>
        <p>${item.date}</p>
      `;

    }




    card.addEventListener("click", () => openModal(item));

    gallery.appendChild(card);

  });

}



function openModal(item) {

  let mediaHTML = "";



  if (item.media_type === "image") {

    mediaHTML = `<img src="${item.hdurl || item.url}">`;

  }



  if (item.media_type === "video") {

    mediaHTML = `<iframe src="${item.url}" frameborder="0" allowfullscreen></iframe>`;

  }



  modalContent.innerHTML = `
    ${mediaHTML}
    <h2>${item.title}</h2>
    <p>${item.date}</p>
    <p>${item.explanation}</p>
  `;

  modal.style.display = "block";

}



closeModal.onclick = function () {
  modal.style.display = "none";
};




window.onclick = function (event) {

  if (event.target === modal) {
    modal.style.display = "none";
  }

};


button.addEventListener("click", getSpaceImages);