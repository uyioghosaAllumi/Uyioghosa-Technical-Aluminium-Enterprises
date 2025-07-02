var type = new Typed(".text",{
    strings: ["Roofing Contractor", "Alluminium fabricator", "Hand Rainings" , "Stainless Glass" , "Home contractor" , "roofing Materials"],
   typeSpeed: 100,
   backSpeed: 100,
   backDelay: 1000,
   loop: true
});

  const form = document.getElementById('contact-form');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch("https://formspree.io/f/xblywqqz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      alert("Message sent successfully!");
      form.reset();
    } else {
      alert("There was an error. Please try again.");
    }
  });


const uploadSection = document.getElementById('uploadSection');
const addMoreContainer = document.getElementById('addMoreContainer');
const gallery = document.getElementById('gallery');

const imageInput = document.getElementById('imageUpload');
const headingInput = document.getElementById('headingInput');
const introInput = document.getElementById('introInput');
const uploadButton = document.getElementById('uploadBtn');
const addMoreButton = document.getElementById('addMoreBtn');
const clearRecentButton = document.getElementById('clearRecentBtn');

let uploadedImageURL = null;

uploadSection.style.display = 'none';

function authorizeUploader() {
  const password = document.getElementById('authPassword').value;
  const authSection = document.getElementById('authSection');
  if (password === 'uyiino') {
    uploadSection.style.display = 'block';
    authSection.style.display = 'none';
  } else {
    alert('Unauthorized. Incorrect password.');
  }
}

imageInput.addEventListener('change', function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      uploadedImageURL = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

uploadButton.addEventListener('click', function () {
  const password = prompt("Enter upload password:");
  if (password !== 'uyiino') {
    alert('Unauthorized. Incorrect password.');
    return;
  }

  const heading = headingInput.value.trim();
  const intro = introInput.value.trim();

  if (!uploadedImageURL || !heading || !intro) {
    alert('Please fill in all fields and select an image.');
    return;
  }

  const card = document.createElement('div');
  card.classList.add('row');
  card.innerHTML = `
    <img src="${uploadedImageURL}" height="500" width="500">
    <div class="layer">
      <h5 style="padding: 10px;">${heading}</h5>
      <p style="padding: 10px;">${intro}</p>
      <a href="#" target="blank">Order Now</a>
    </div>
  `;
  gallery.appendChild(card);

  const existingData = JSON.parse(localStorage.getItem('galleryItems') || '[]');
  existingData.push({ image: uploadedImageURL, heading, intro });
  localStorage.setItem('galleryItems', JSON.stringify(existingData));

  uploadedImageURL = null;
  imageInput.value = '';
  headingInput.value = '';
  introInput.value = '';

  uploadSection.style.display = 'none';
  addMoreContainer.style.display = 'block';
});

addMoreButton.addEventListener('click', function () {
  uploadedImageURL = null;
  imageInput.value = '';
  headingInput.value = '';
  introInput.value = '';

  uploadSection.style.display = 'block';
  addMoreContainer.style.display = 'none';
});

clearRecentButton.addEventListener('click', function () {
  const password = prompt("Enter password to delete the most recent portfolio:");
  if (password !== 'uyiino') {
    alert('Unauthorized. Incorrect password.');
    return;
  }

  let savedItems = JSON.parse(localStorage.getItem('galleryItems') || '[]');

  if (savedItems.length === 0) {
    alert('No uploads to remove.');
    return;
  }

  savedItems.pop();
  localStorage.setItem('galleryItems', JSON.stringify(savedItems));

  const rows = document.querySelectorAll('#gallery .row');
  if (rows.length > 0) {
    rows[rows.length - 1].remove();
  }
});

window.addEventListener('DOMContentLoaded', function () {
  const savedItems = JSON.parse(localStorage.getItem('galleryItems') || '[]');
  savedItems.forEach(({ image, heading, intro }) => {
    const card = document.createElement('div');
    card.classList.add('row');
    card.innerHTML = `
      <img src="${image}" height="500" width="500">
      <div class="layer">
        <h5 style="padding: 10px;">${heading}</h5>
        <p style="padding: 10px;">${intro}</p>
        <a href="#" target="blank">Order Now</a>
      </div>
    `;
    gallery.appendChild(card);
  });
});
