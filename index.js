const axios = require("axios");

const mapFromAlphaVantage = (data) => {
  const globalQuote = data["Global Quote"];
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

exports.testGCPFn = (req, res) => {
  const code = req.query.code;
  if (!!code) {
    return axios.get(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${code}&dataType=json&apikey=${process.env.ALPHAVANTAGE_KEY}`
    ).then(result => {
      const parsed = mapFromAlphaVantage(result.data);
      res.status(200).send(`Here's your info about ${code} -> Price: ${parsed.price} / Change: ${parsed.changeP}`);
    }).catch(console.error);
  } 
  return res.status(404);
};