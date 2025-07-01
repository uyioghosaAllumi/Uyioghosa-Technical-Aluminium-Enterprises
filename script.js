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

