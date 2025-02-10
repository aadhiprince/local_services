window.onload = handleData;

function handleData() {
  const data = localStorage.getItem("Services");
  if (!data) {
    console.log("No services found in localStorage.");
    return;
  }

  const services = JSON.parse(data);
  const servicesContainer = document.querySelector("#services-container");
  const serviceNameSpan = document.querySelector("#service-name-span");

  // Display the first service name in the header with proper capitalization
  const fullWorld = services[0].service
    .split(" ")
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(" ");
  serviceNameSpan.textContent = fullWorld;

  // Iterate through services and create service cards
  services.forEach(service => {
    const serviceCard = document.createElement("div");
    serviceCard.classList.add("service-card");

    // Ensure ratings have a default value of 1 if not provided
    const rating = service.ratings || 1;

    serviceCard.innerHTML = `
      <h5>
        <span class="label">Service: </span>
        <span class="content">${service.service.toUpperCase()}</span>
      </h5>
      <h5>
        <span class="label">User Name: </span>
        <span class="content">${service.name.toUpperCase()}</span>
      </h5>
      <a href="tel:${service.mobile_number}">
        <span class="label">Mobile No: </span>
        <span class="content">${service.mobile_number}</span>
      </a>
      <p>
        <span class="label">Address: </span>
        <span class="content">${service.address}</span>
      </p>
      <p class="ratings">
        <span class="label">Ratings: </span>
        ${getRatings(rating)}
      </p>
    `;

    servicesContainer.appendChild(serviceCard);
  });

  // Add click event to the "add service" button
  const addButton = document.getElementById("add-service");
  addButton.addEventListener("click", () => {
    window.location.href = "add_service.html";
  });
}

function getRatings(rating) {
  return `<span class="star-rating">${"★".repeat(rating)}</span>`;
}
