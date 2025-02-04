window.onload = handledata();
function handledata() {
  const data = localStorage.getItem("Services");
  console.log(data);

  const services_container = document.querySelector("#services-container");

  const service_name = document.querySelectorAll("#service-name");

  const services = JSON.parse(data);

  const service_name_span = document.querySelector("#service-name-span");

  const full_world = services[0].service.split(" ").map((word) => {
    let one_word = word[0].toUpperCase() + word.slice(1);
    return one_word;
  });

  service_name_span.textContent = full_world.join(" ");

  services.forEach((service) => {
    const service_card = document.createElement("div");
    service_card.classList.add("service-card");
    const name = document.createElement("h5");
    const mobile_number = document.createElement("a");
    const adddress = document.createElement("p");
    const ratings = document.createElement("p");

    service_name.textContent = service.service;
    name.textContent = service.name.toUpperCase();
    mobile_number.textContent = service.mobile_number;
    adddress.textContent = service.address;

    for (let i = 0; i < service.ratings; i++) {
      const star = document.createElement("i");
      star.classList.add("fa");
      star.classList.add("fa-star");
      star.textContent += "★";
      ratings.appendChild(star);
    }

    service_card.appendChild(name);
    service_card.appendChild(mobile_number);
    service_card.appendChild(adddress);
    service_card.appendChild(ratings);
    services_container.appendChild(service_card);
  });
}
const add_button = document.getElementById("add-service");

add_button.addEventListener("click", () => {
  window.location.href = "add_service.html";
});
