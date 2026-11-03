require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 6000;   

const authroutes = require("./src/routes/authroutes");
const homeRoutes = require("./src/routes/homeroutes");
const bookingRoutes = require("./src/routes/bookingroutes");

require("./src/config/db");


app.use(express.json());

app.get("/", (req, res) => {
   return res.send("Guru Kripa Tour & Travels API Running");
});

app.use("/api/auth", authroutes);
app.use("/api/home", homeRoutes);  
app.use("/api/bookings", bookingRoutes);    

app.listen(PORT, () => {
  console.log(`Server is Running on PORT=${PORT}`);
});