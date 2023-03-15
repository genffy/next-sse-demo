
const getStockPrice = (range: number, base: number) =>
    (Math.random() * range + base).toFixed(2);

const getTime = () => new Date().toLocaleTimeString();

export const getLineStr = () => `data: {"time": "${getTime()}", "aTechStockPrice": "${getStockPrice(
    2, 20)}", "bTechStockPrice": "${getStockPrice(4, 22)}"}`