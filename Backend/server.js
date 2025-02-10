const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// Create a connection pool instead of a single connection.
const db = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Optional: test the pool
db.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to database (pool):", err);
  } else {
    console.log("Connected to MySQL database (pool)");
    connection.release();
  }
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  
  db.query(
    "SELECT * FROM admin WHERE username = ? AND password = ?",
    [username, password],
    (err, response) => {
      if (err) {
        console.log(err);
        return res.status(500).send("An error occurred while logging in");
      }
      console.log(response);
      if (response.length === 0) {
        return res.status(401).send("Invalid username or password");
      }
      return res.status(200).json({
        success: true,
        message: "Login successful",
        data: response,
      });
    }
  );
});

app.get('/get_all_services', (req, res) => {
  db.query("SELECT * FROM local_service", (err, response) => {
    if (err) {
      console.log(err);
      return res.status(500).send("An error occurred while getting services");
    }
    if (response.length === 0) {
      return res.status(404).send("No services found");
    }
    return res.status(200).json({
      success: true,
      message: "Services found",
      data: response,
    });
  });
});

app.put("/update_service/:id", (req, res) => {
  const { name, mobile_no, address, service, ratings } = req.body;
  const serviceId = req.params.id;
  db.query(
    "UPDATE local_service SET name = ?, mobile_no = ?, address = ?, service = ?, ratings = ? WHERE id = ?",
    [name, mobile_no, address, service, ratings, serviceId],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send("An error occurred while updating service");
      }
      return res.status(200).json({
        success: true,
        message: "Service updated successfully",
      });
    }
  );
});

app.delete("/delete_service/:id", (req, res) => {
  const serviceId = req.params.id;
  db.query(
    "DELETE FROM local_service WHERE id = ?",
    [serviceId],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send("An error occurred while deleting service");
      }
      return res.status(200).json({
        success: true,
        message: "Service deleted successfully",
      });
    }
  );
});

app.get("/get_services", (req, res) => {
  const service = req.query.service;
  db.query(
    "SELECT * FROM local_service WHERE service = ?",
    [service],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send("An error occurred while getting services");
      }
      if (result.length === 0) {
        return res.status(404).send("No services found");
      }
      const services = result.map((service) => ({
        name: service.name,
        mobile_number: service.mobile_no,
        address: service.address,
        ratings: service.ratings,
        service: service.service,
      }));

      return res.status(200).json({
        success: true,
        message: "Services found",
        data: services,
      });
    }
  );
});

app.post("/add_service", (req, res) => {
  const { name, mobile, address, service, ratings } = req.body;

  db.query(
    "SELECT * FROM local_service WHERE mobile_no = ?",
    [mobile],
    (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send("An error occurred");
      }
      if (results.length > 0) {
        return res.status(300).json({
          success: false,
          message: "Service already exists"
        });
      }
      if (results.length === 0) {
        db.query(
          "INSERT INTO local_service (name, mobile_no, address, service, ratings) VALUES (?,?,?,?,?)",
          [name, mobile, address, service, ratings],
          (err, result) => {
            if (err) {
              console.log(err);
              return res.status(500).send("An error occurred while adding service");
            }
            if (result.affectedRows > 0) {
              return res.status(200).json({
                success: true,
                message: "Service added successfully",
              });
            }
          }
        );
      }
    }
  );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
