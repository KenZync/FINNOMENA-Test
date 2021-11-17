import { render, screen } from "@testing-library/react";
import App from "./App";
// import axios from "axios";
// import MockAdapter from "axios-mock-adapter";

// const testData = [
//   {
//     avg_return: 63.633823,
//     mstar_id: "F00000ZMXD",
//     nav: 14.154,
//     nav_date: "2021-09-07T00:00:00.000Z",
//     nav_return: 74.80117,
//     rank: 1,
//     thailand_fund_code: "PRINCIPAL VNEQ-A",
//   },
//   {
//     avg_return: 63.633823,
//     mstar_id: "F0000109C9",
//     nav: 14.2656,
//     nav_date: "2021-09-07T00:00:00.000Z",
//     nav_return: 74.79997,
//     rank: 2,
//     thailand_fund_code: "PRINCIPAL VNEQ-I",
//   },
//   {
//     avg_return: 65.394614,
//     mstar_id: "F00000HHFC",
//     nav: 3.4868,
//     nav_date: "2021-09-03T00:00:00.000Z",
//     nav_return: 73.33466,
//     rank: 3,
//     thailand_fund_code: "KT-OIL",
//   },
// ];

it("renders without crashing", () => {
  const div = document.createElement("div");
  render(<App />, div);
});

it("renders FINNOMENA Header", () => {
  render(<App />);
  expect(screen.getByText("FINNOMENA")).toBeInTheDocument();
});

it("renders Fund Ranking Title", () => {
  render(<App />);
  expect(screen.getByText("Fund Ranking")).toBeInTheDocument();
});

// describe("FundRanking", () => {
//   it("Get Fund Ranking by Time Range 1 Year", (done) => {
//     var mock = new MockAdapter(axios);
//     mock
//       .onGet("http://localhost:3001/fundranking?timerange=1Y")
//       .reply(200, testData);
//     done();
//     // chatbot.sendMessage(0, "any").then((response) => {
//     //   expect(response).toEqual(data);
//     //   done();
//     // });
//   });
// });
