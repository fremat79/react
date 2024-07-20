const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Define a GET route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Define a simple API endpoint
app.get("/api/greet", (req, res) => {
  const name = req.query.name || "Guest";
  res.json({ message: `Hello, ${name}!` });
});

// Define a simple API endpoint
app.get("/api/read", async (req, res) => {
  const plcData = await readPLC();
  res.json({ data: plcData });
});

function readPLC() {
  return new Promise((resolve, reject) => {
    const nodes7 = require("nodes7"); // Step 2: Import nodes7
    const plc = new nodes7(); // Step 3: Create a connection object

    const connParams = {
      port: 102, // Common port for Siemens PLCs
      host: "10.64.0.93", // Replace with your PLC's IP address
      rack: 0, // Rack number (for S7-300/400)
      slot: 2, // Slot number (for S7-300/400)
    };

    const vars = {
      // Step 4: Define PLC variables
      M3Gas: "DB1067,REAL40",
      StatoPosLoad: "DB1067,INT0",
      IDStatoPosLoad: "DB1067,INT2",
      StatoForno: "DB1067,INT4",
      IDTrattForno: "DB1067,INT6",
      TzZ1Bruc: "DB1067,REAL8",
      TzZ1Vent: "DB1067,REAL12",
      TzZ1Tetto: "DB1067,REAL16",
      SPZ1: "DB1067,REAL20",
      TzZ2Bruc: "DB1067,REAL24",
      TzZ2Vent: "DB1067,REAL28",
      TzZ2Tetto: "DB1067,REAL32",
      SPZ2: "DB1067,REAL36",
      IDTrattReq: "DB1067,INT44",
      FlagReq: "DB1067,INT46",
    };

    plc.initiateConnection(connParams, (err) => {
      // Step 5: Connect to the PLC
      if (err) {
        console.error("Error connecting to PLC:", err);
      }

      plc.setTranslationCB((tag) => vars[tag]); // Maps variable names
      plc.addItems(Object.keys(vars)); // Add variables to read/write list

      const writeVariable = false;

      plc.readAllItems((error, values) => {
        // Step 6: Read variables
        if (error) {
          console.error("Error reading:", error);
          reject(error);
        } else {
          resolve(values);
          //   Object.keys(values).forEach((key) => {
          //     console.log(`${key}: ${values[key]}`);
          //   });
        }
        plc.dropConnection();
      });
    });
  });
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
