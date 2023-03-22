const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = 5000;

const getStockPrice = (range, base) =>
  (Math.random() * range + base).toFixed(2);
const getTime = () => new Date().toLocaleTimeString();

app.post("/api/stream", function (req, res) {
  const { type } = req.body;
  switch (type) {
    case "chunk":
      processChunk(res);
      break;
    case "sse":
      processSSE(res);
      break;
    default:
      processStock(res);
      break;
  }
});

function processStock(res) {
  res.writeHead(200, {
    Connection: "keep-alive",
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
  });
  const intervalId = setInterval(() => {
    res.write(
      `data: {"time": "${getTime()}", "aTechStockPrice": "${getStockPrice(
        2, 20)}", "bTechStockPrice": "${getStockPrice(4, 22)}"}`
    );
    res.write("\n\n");
  }, 5000);
  res.on('close', () => {
    clearInterval(intervalId);
    res.end()
  })
}

function processChunk(res) {
  res.writeHead(200, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  const intervalId = setInterval(() => {
    const rand = Math.round(Math.random() * 10);
    res.write(`${rand}`);
    if (rand > 7) {
      clearInterval(intervalId);
      res.end();
    }
  }, 200);
  res.on('close', () => {
    clearInterval(intervalId);
    res.end();
  })
}

function processSSE(res) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  const intervalId = setInterval(() => {
    res.write(`id: ${new Date().getTime()}\n\n`);
    res.write(`data: ${Math.round(Math.random() * 10)}\n\n`);
  }, 200);
  res.on('close', () => {
    clearInterval(intervalId);
    res.end();
  })
}
app.listen(PORT, function () {
  console.log(`Server is running on port ${PORT}`);
});
