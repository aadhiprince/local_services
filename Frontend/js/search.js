const servicesContainer = document.querySelectorAll(".service-card");
const spinnerOverlay = document.querySelector(".spinner-overlay");
const noResultsMessage = document.getElementById("no-results");

// Add click event for each service card
servicesContainer.forEach((service) => {
  service.addEventListener("click", () => {
    const div = service.querySelector("h2");
    const services = div.textContent.toLowerCase();
    console.log(services);

    const backendUrl = `https://local-services.onrender.com/get_services?service=${services}`;
    showSpinner(); // Show the spinner

    fetch(backendUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        hideSpinner(); // Hide the spinner when response is received
        if (response.status === 404 || !response.ok) {
          throw new Error("No details found");
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          console.log(data.message);
          localStorage.setItem("Services", JSON.stringify(data.data));
          window.location.href = "details.html";
        }
      })
      .catch((error) => {
        hideSpinner(); // Ensure spinner hides on error
        console.error(error);
        alert("An error occurred or no details found.");
      });
  });
});

// Search Functionality
document.getElementById("search-box").addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const cards = document.querySelectorAll(".service-card");
  let anyMatch = false;

  cards.forEach((card) => {
    const text = card.textContent.toLowerCase();
    if (text.includes(query)) {
      card.style.display = "block";
      anyMatch = true;
    } else {
      card.style.display = "none";
    }
  });

  noResultsMessage.style.display = anyMatch ? "none" : "block";
});

// Spinner Functions
function showSpinner() {
  spinnerOverlay.style.display = "flex";
}

function hideSpinner() {
  spinnerOverlay.style.display = "none";
}
