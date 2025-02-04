window.onload = handledata;

function handledata() {
  fetch("https://local-services.onrender.com/get_all_services", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.status === 404 || !response.ok) {
        return { success: false, message: "No details found" };
      }
      return response.json();
    })
    .then((data) => {
      if (data.success) {
        const services = data.data;
        const services_container = document.getElementById("services-container");
        services_container.innerHTML = ""; // Clear previous results

        services.forEach((service) => {
          const service_card = document.createElement("div");
          service_card.classList.add("service-card");

          // Add service details
          const service_name = document.createElement("p");
          service_name.innerHTML = `<strong>Service:</strong> ${service.service}`;  // Service name like plumber, electrician

          const user_name = document.createElement("p");
          user_name.innerHTML = `<strong>User Name:</strong> ${service.name}`;  // User's name

          const mobile_number = document.createElement("p");
          mobile_number.innerHTML = `<strong>Mobile No:</strong> ${service.mobile_no}`;

          const address = document.createElement("p");
          address.innerHTML = `<strong>Address:</strong> ${service.address}`;

          const ratings = document.createElement("p");
          const stars = service.ratings > 0 ? "⭐".repeat(service.ratings) : "⭐";
          ratings.innerHTML = `<strong>Ratings:</strong> ${stars}`;

          // Icon container for Edit/Delete buttons
          const iconsContainer = document.createElement("div");
          iconsContainer.classList.add("icons-container");

          const editIcon = document.createElement("i");
          editIcon.classList.add("fas", "fa-edit", "edit-icon");
          editIcon.addEventListener("click", () => openEditModal(service));

          const deleteIcon = document.createElement("i");
          deleteIcon.classList.add("fas", "fa-trash-alt", "delete-icon");
          deleteIcon.addEventListener("click", () => confirmDelete(service.id));

          iconsContainer.appendChild(editIcon);
          iconsContainer.appendChild(deleteIcon);

          // Append elements to the service card
          service_card.appendChild(service_name);
          service_card.appendChild(user_name);
          service_card.appendChild(mobile_number);
          service_card.appendChild(address);
          service_card.appendChild(ratings);
          service_card.appendChild(iconsContainer);

          services_container.appendChild(service_card);
        });
      }
    });
}

function openEditModal(service) {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
    <div class="modal-content">
      <h3>Edit Service</h3>
      <label for="edit-service">Service:</label>
      <input type="text" id="edit-service" value="${service.service}" />

      <label for="edit-name">User Name:</label>
      <input type="text" id="edit-name" value="${service.name}" />

      <label for="edit-mobile">Mobile No:</label>
      <input type="tel" id="edit-mobile" value="${service.mobile_no}" />

      <label for="edit-address">Address:</label>
      <textarea id="edit-address">${service.address}</textarea>

      <label for="edit-ratings">Ratings:</label>
      <input type="number" id="edit-ratings" min="1" max="5" value="${service.ratings}" />
      
      <button class="save-btn" onclick="saveChanges(${service.id})">Save</button>
      <button class="cancel-btn" onclick="closeModal()">Cancel</button>
    </div>
  `;

  document.body.appendChild(modal);
}

function closeModal() {
  const modal = document.querySelector(".modal");
  if (modal) modal.remove();
}

function confirmDelete(serviceId) {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
    <div class="modal-content">
      <h3>Confirm Delete</h3>
      <p>Are you sure you want to delete this service?</p>
      <button class="confirm-delete" onclick="deleteService(${serviceId})">Yes, Delete</button>
      <button class="cancel-btn" onclick="closeModal()">Cancel</button>
    </div>
  `;

  document.body.appendChild(modal);
}

function deleteService(serviceId) {
  fetch(`https://local-services.onrender.com/delete_service/${serviceId}`, { method: "DELETE" })
    .then((response) => response.json())
    .then(() => {
      closeModal();
      handledata(); // Refresh the list
    });
}

function saveChanges(serviceId) {
  const updatedService = {
    service: document.getElementById("edit-service").value,
    name: document.getElementById("edit-name").value,
    mobile_no: document.getElementById("edit-mobile").value,
    address: document.getElementById("edit-address").value,
    ratings: parseInt(document.getElementById("edit-ratings").value),
  };

  fetch(`https://local-services.onrender.com/update_service/${serviceId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedService),
  })
    .then((response) => response.json())
    .then(() => {
      closeModal();
      handledata(); // Refresh the list
    });
}
