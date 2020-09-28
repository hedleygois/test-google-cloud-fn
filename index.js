const axios = require("axios");

const mapFromAlphaVantage = (data) => {
  const parsed = JSON.parse(data);
  const globalQuote = parsed["Global Quote"];
  const keys = Object.keys(globalQuote);
  return {
    symbol: globalQuote[keys[0]].split(".")[0],
    open: Number(globalQuote[keys[1]]),
    high: Number(globalQuote[keys[2]]),
    low: Number(globalQuote[keys[3]]),
    price: Number(globalQuote[keys[4]]),
    volume: Number(globalQuote[keys[5]]),
    latest: globalQuote[keys[6]],
    previous: Number(globalQuote[keys[7]]),
    changeAbs: Number(globalQuote[keys[8]]),
    changeP: Number(globalQuote[keys[9]].slice(0, globalQuote[keys[9]].length - 1))
  }
}

exports.handler = async (req, res) => {
  console.log(req);
  const code = req.query.code;
  if (!!code) {
    const result = await axios.get(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${code}&dataType=json&apikey=${process.env.ALPHAVANTAGE_KEY}`
    );
    const parsed = mapFromAlphaVantage(result);
    return res.status(200).send(`Here's your info about ${code} -> Price: ${parsed.price} / Change: ${changeP}`);
  }
  return res.status(400);
};
