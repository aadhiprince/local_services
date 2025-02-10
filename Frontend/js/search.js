const services_container = document.querySelectorAll(".service-card");
console.log(services_container);
services_container.forEach((service) => {
  service.addEventListener("click", () => {
    const div = service.querySelector("h2");
    const services = div.textContent.toLowerCase();
    console.log(services);
    const backendUrl = `http://localhost:3000/get_services?service=${services}`;
    fetch(backendUrl, {
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
          console.log(data.message);
          localStorage.setItem("Services", JSON.stringify(data.data));
          window.location.href = "details.html";
        }
      });
  });
});

// // Search Functionality
// document.getElementById("search-box").addEventListener("input", function () {
//     const query = this.value.toLowerCase(); // Get the input value and convert to lowercase
//     const cards = document.querySelectorAll(".service-card"); // Select all service cards
//     let anyMatch = false; // Track if any cards match the search

//     cards.forEach((card) => {
//       const text = card.textContent.toLowerCase(); // Get the card's text and convert to lowercase
//       if (text.includes(query)) {
//         card.style.display = "block"; // Show the card if it matches the query
//         anyMatch = true; // A match is found
//       } else {
//         card.style.display = "none"; // Hide the card if it doesn't match the query
//       }
//     });

//     // Display "No service was found" if no matches are found
//     const noResultsMessage = document.getElementById("no-results");
//     if (!anyMatch) {
//       noResultsMessage.style.display = "block"; // Show the message
//     } else {
//       noResultsMessage.style.display = "none"; // Hide the message
//     }
//   });

//   // Optional: Add functionality for the search button
//   document.getElementById("search-button").addEventListener("click", function () {
//     const query = document.getElementById("search-box").value.toLowerCase();
//     const cards = document.querySelectorAll(".service-card");
//     let anyMatch = false;

//     cards.forEach((card) => {
//       const text = card.textContent.toLowerCase();
//       if (text.includes(query)) {
//         card.style.display = "block";
//         anyMatch = true;
//       } else {
//         card.style.display = "none";
//       }
//     });

//     const noResultsMessage = document.getElementById("no-results");
//     if (!anyMatch) {
//       noResultsMessage.style.display = "block";
//     } else {
//       noResultsMessage.style.display = "none";
//     }
//   });
