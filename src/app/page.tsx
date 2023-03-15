"use client"

import React, { useState, useEffect } from "react";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const serverBaseURL = "/api";
const nodeServerBaseURL = "http://localhost:5000/api";

const App = () => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = `${serverBaseURL}/hello`;
      const apiRouteUrl = `${serverBaseURL}/stream`;
      const nodeServerUrl = `${nodeServerBaseURL}/stream`;
      await fetchEventSource(url, {
        method: "POST",
        headers: {
          Accept: "text/event-stream",
        },
        async onopen(res) {
          if (res.ok && res.status === 200) {
            console.log("Connection made ", res);
          } else if (
            res.status >= 400 &&
            res.status < 500 &&
            res.status !== 429
          ) {
            console.log("Client side error ", res);
          }
        },
        onmessage(event) {
          console.log(event.data);
          const parsedData = JSON.parse(event.data);
          setData((data: any) => [...data, parsedData]);
        },
        onclose() {
          console.log("Connection closed by the server");
        },
        onerror(err) {
          console.log("There was an error from server", err);
        },
      });
    };
    fetchData();
  }, []);

  return (
    <div style={{ display: "grid", placeItems: "center" }}>
      <h1>Stock prices of aTech and bTech (USD)</h1>
      <LineChart width={1000} height={400} data={data} syncId="test">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis domain={[20, 26]} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="aTechStockPrice" stroke="#8884d8" />
        <Line type="monotone" dataKey="bTechStockPrice" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
};

export default App;