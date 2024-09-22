const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3001;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors()); // This will enable CORS for all routes

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/api/readVariables", async (req, res) => {
  const plcVar = req.body;
  const plcData = await readPLC();
  res.status(200).json({ data: plcData });
});

app.get("/api/readVariable", async (req, res) => {
  const plcVar = req.query.Variable;
  const [name, value] = plcVar.split(":");
  const plcObject = { [name]: value };
  const plcData = await readPLC(plcObject);
  res.status(200).json({ data: plcData });
});

app.post("/api/readVariablesNew", async (req, res) => {
  const plcVar = req.body;
  try {
    const plcData = await readPLC(plcVar);
    res.status(200).json({ data: plcData });
  } catch (error) {
    res.status(500);
  }
});

app.post("/api/writeVariable", async (req, res) => {
  const plcVar = req.body;
  try {
    await writePLC(plcVar);
    res.status(200).json({ message: "Variable successfully written to PLC" });
  } catch (error) {
    res.status(500).json({ error: "Failed to write variable to PLC" });
  }
});

async function writePLC(vObj) {
  return new Promise((resolve, reject) => {
    const nodes7 = require("nodes7");
    const plc = new nodes7();

    const connParams = vObj.connectionInfo;

    plc.initiateConnection(connParams, (err) => {
      if (err) {
        console.error("Error connecting to PLC:", err);
        reject(err);
      }
      const wInfos = vObj.variable.split(":");
      const plcVar = {
        WRITE: wInfos[1],
      };
      const valueToWrite = { WRITE: vObj.value };
      plc.setTranslationCB((tag) => plcVar[tag]);
      plc.addItems(Object.keys(plcVar));
      plc.writeItems(
        Object.keys(valueToWrite),
        Object.values(valueToWrite),
        (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
          plc.dropConnection();
        }
      );
    });
  });
}

async function readPLC(plcVar = null) {
  return new Promise((resolve, reject) => {
    const nodes7 = require("nodes7"); // Step 2: Import nodes7
    const plc = new nodes7(); // Step 3: Create a connection object

    const connParams = plcVar.plcInfo;

    const vars = {};
    plcVar.variables.reduce((acc, v) => {
      acc[v.Name] = `${v.DB},${v.Type}${v.Address}`;
      return acc;
    }, vars);

    console.log(vars);

    plc.initiateConnection(connParams, (err) => {
      if (err) {
        reject(`Error while connect to plc: ${err.message}`);
        return;
      }

      plc.setTranslationCB((tag) => vars[tag]); // will be called readAllItems
      plc.addItems(Object.keys(vars)); // Add variables to read/write list

      plc.readAllItems((error, values) => {
        if (error) {
          reject(error);
        } else {
          resolve(values);
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
