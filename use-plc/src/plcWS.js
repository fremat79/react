const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3001;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors()); // This will enable CORS for all routes

// Define a GET route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Define a simple API endpoint
app.get("/api/readVariables", async (req, res) => {
  // const plcData = {
  //   StatoPosLoad: 32,
  //   IDStatoPosLoad: 34,
  // };

  const plcVar = req.body;
  console.log("post readVariables", plcVar);

  const plcData = await readPLC();
  res.status(200).json({ data: plcData });
});

// Define a simple API endpoint
app.get("/api/readVariable", async (req, res) => {
  const plcVar = req.query.Variable;

  const [name, value] = plcVar.split(":");
  const plcObject = { [name]: value };

  const plcData = await readPLC(plcObject);
  res.status(200).json({ data: plcData });
});

/*
 *
 */

// Define a simple API endpoint
app.post("/api/readVariablesNew", async (req, res) => {
  // const plcData = {
  //   StatoPosLoad: 32,
  //   IDStatoPosLoad: 34,
  // };

  const plcVar = req.body;
  console.log("post readVariablesNew", plcVar);

  try {
    const plcData = await readPLC();
    res.status(200).json({ data: plcData });
  } catch (error) {
    res.status(500);
  }
});

app.post("/api/writeVariable", async (req, res) => {
  const plcVar = req.body;
  console.log("post writeVariable", plcVar);

  try {
    await writePLC(plcVar);
    res.status(200).json({ message: "Variable successfully written to PLC" });
  } catch (error) {
    console.error("Error writing variable to PLC:", error);
    res.status(500).json({ error: "Failed to write variable to PLC" });
  }
});

async function writePLC(vObj) {
  return new Promise((resolve, reject) => {
    const nodes7 = require("nodes7"); // Step 2: Import nodes7
    const plc = new nodes7(); // Step 3: Create a connection object

    const connParams = {
      port: 102,
      host: "10.64.0.93",
      rack: 0,
      slot: 2,
    };

    plc.initiateConnection(connParams, (err) => {
      if (err) {
        console.error("Error connecting to PLC:", err);
        reject(err);
      }

      const wInfos = vObj.variable.split(":");

      const plcVar = {
        WRITE: wInfos[1],
      }; // Example: Writing to DB1,INT0
      const valueToWrite = { WRITE: vObj.value }; // The value to write

      plc.setTranslationCB((tag) => plcVar[tag]);
      plc.addItems(Object.keys(plcVar));

      plc.writeItems(
        Object.keys(valueToWrite),
        Object.values(valueToWrite),
        (error) => {
          if (error) {
            console.error("Error writing:", error);
            reject(error);
          } else {
            console.log("Variable successfully written to PLC");
            resolve();
          }
          plc.dropConnection();
        }
      );
    });
  });
}

function readPLC(plcVar = null) {
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

      if (!plcVar) {
        plc.setTranslationCB((tag) => vars[tag]); // Maps variable names
        plc.addItems(Object.keys(vars)); // Add variables to read/write list
      } else {
        plc.setTranslationCB((tag) => plcVar[tag]); // Maps variable names
        plc.addItems(Object.keys(plcVar)); // Add variables to read/write list
      }

      plc.readAllItems((error, values) => {
        // Step 6: Read variables
        if (error) {
          console.error("Error reading:", error);
          reject(error);
        } else {
          console.log("PLC values:", values);
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
