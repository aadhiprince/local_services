let nameInput = document.getElementById("name");
let mobileInput = document.getElementById("mobile");
let addressInput = document.getElementById("address");
let serviceInput = document.getElementById("service");

const submit = document.getElementById("submit");

const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  name = nameInput.value;
  mobile = mobileInput.value;
  address = addressInput.value;
  service = serviceInput.value;
  console.log(name, mobile, address, service);
  if (!name || !mobile || !address || !service) {
    alert("please fill all the fields");
  } else {
    const details = {
      name: name.toLowerCase(),
      mobile: mobile,
      address: address.toLowerCase(),
      service: service.toLowerCase(),
      ratings: 0,
    };
    fetch("http://localhost:3000/add_service", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    })
      .then((response) => {
        if (response.status === 404) {
          throw new Error("Service not found");
        }
        if (response.status === 300) {
          alert("Service already exists");
          throw new Error("Service already exists");
        }

        return response.json();
      })
      .then((data) => {
        if (data.success) {
          console.log(data.message);
          alert("Service added successfully");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
});
