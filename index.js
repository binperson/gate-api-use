const BABY_USDT = "BABY_USDT";
const PEOPLE_USDT = "PEOPLE_USDT";
const ENS_USDT = "ENS_USDT";
const MANA_USDT = "MANA_USDT";
const SAND_USDT = "SAND_USDT";
const FLOKI_USDT = "FLOKI_USDT";
const getOrders = (order) => {
  const basePrice = Math.floor(order.price * 10000) / 10000

  const baseAmount = Number(1/basePrice).toFixed(2)
  return [
    {
      ...order,
      amount: baseAmount,
      price: String(Math.floor(order.price * 9800) / 10000),
    },
    {
      ...order,
      amount: baseAmount * 2,
      price: String(Math.floor(order.price * 9300) / 10000),
    },
    {
      ...order,
      amount: baseAmount * 4,
      price: String(Math.floor(order.price * 8800) / 10000),
    },
    {
      ...order,
      amount: baseAmount * 8,
      price: String(Math.floor(order.price * 8300) / 10000),
    },
    {
      ...order,
      amount: baseAmount * 16,
      price: String(Math.floor(order.price * 7800) / 10000),
    },
    {
      ...order,
      amount: baseAmount * 32,
      price: String(Math.floor(order.price * 7300) / 10000),
    },
  ];
};

const main = async (currencyPair) => {
  const GateApi = require("gate-api");
  const client = new GateApi.ApiClient();
  client.setApiKeySecret(
    "eaf5b61db0ee1d88ccc1cbdd042d8c7e",
    "09ead8ef1bb84b5357461b66e81cf018855676fc5395bf874d3c8144f1c286c1"
  );
  // uncomment the next line to change base path
  // client.basePath = "https://some-other-host"

  const api = new GateApi.SpotApi(client);
  const opts = {
    currencyPair, // string | Currency pair PEOPLE_USDT
  };

  try {
    const listTickers = await api.listTickers(opts);
    listTickersInfo = listTickers.body;
    const orders = getOrders({
      text: `t-${currencyPair}`,
      currencyPair: currencyPair,
      type: "limit",
      account: "spot",
      side: "buy",
      iceberg: "0",
      amount: "1",
      price: listTickersInfo[0].last,
      time_in_force: "gtc",
      auto_borrow: false,
    });
    api.createBatchOrders(orders).then(
      (value) =>
        console.log("API called successfully. Returned data: ", value.body),
      (error) => console.error(error)
    );
  } catch (e) {
    console.error(e);
  }
};

main(PEOPLE_USDT);
main(BABY_USDT);
main(SAND_USDT);
main(ENS_USDT);
main(FLOKI_USDT);