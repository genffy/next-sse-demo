const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = 5000;

const getStockPrice = (range, base) =>
  (Math.random() * range + base).toFixed(2);
const getTime = () => new Date().toLocaleTimeString();

app.post("/api/stream", function (req, res) {
  res.writeHead(200, {
    Connection: "keep-alive",
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
  });
  const interId = setInterval(() => {
    res.write(
      `data: {"time": "${getTime()}", "aTechStockPrice": "${getStockPrice(
        2, 20)}", "bTechStockPrice": "${getStockPrice(4, 22)}"}`
    );
    res.write("\n\n");
  }, 5000);
  res.on('close', () => {
    clearInterval(interId);
    res.end()
  })
});

app.listen(PORT, function () {
  console.log(`Server is running on port ${PORT}`);
});