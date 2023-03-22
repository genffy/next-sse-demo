"use client"

import React, { useState, useEffect, useRef } from "react";
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
  const resualtRef = useRef<HTMLDivElement>(null)
  function renderData(data: string) {
    if (resualtRef.current) {
      resualtRef.current.innerHTML = resualtRef.current.innerHTML + data;
    }
  }
  useEffect(() => {
    const url = `${serverBaseURL}/hello`;
    const apiRouteUrl = `${serverBaseURL}/stream`;
    const nodeServerUrl = `${nodeServerBaseURL}/stream`;
    const fetchData = async () => {
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
    // 1.eventSource方式(连接不能断开，否则会重连)：
    function runEventSource() {
      const eventSource = new EventSource(url);
      eventSource.addEventListener('message', function (event) {
        console.log('event.data:', event.data);
        renderData(event.data)
      });
      eventSource.addEventListener('open', function (event) {
        console.log('eventSource open');
      });
      eventSource.addEventListener('error', function (event) {
        console.log('eventSource error');
      });
    }

    // 2.fetch read方式：
    function simpleFetch() {
      fetch(url, {
        method: 'POST',
        body: JSON.stringify({ 'type': 'sse' }),

      }).then(response => {
        if (response && response.body) {
          const reader = response.body.getReader();
          const decoder = new TextDecoder('utf-8');
          reader.read().then(function processText({ done, value }): Promise<void> {
            if (done) {
              console.log('传输完毕');
              return Promise.resolve();
            }
            console.log('result----', decoder.decode(value));
            return reader.read().then(processText);
          });
        }

      }).catch(error => console.error(error));
    }


    // 3.fetch stream方式：
    function streamFetch() {
      fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          type: 'sse'
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (response && response.body) {
            const reader = response.body.getReader();
            const decoder = new TextDecoder('utf-8');
            const stream = new ReadableStream({
              start(controller) {
                function push() {
                  reader.read().then(({ done, value }) => {
                    if (done) {
                      controller.close();
                      return;
                    }

                    const chunk = decoder.decode(value, { stream: true });
                    console.log('chunk1111111:', chunk);
                    push();
                  }).catch(error => {
                    console.error(error);
                    controller.error(error);
                  });
                };
                push();
              }
            });
            return new Response(stream, { headers: { 'Content-Type': 'text/event-stream' } });
          } else {
            return response;
          }
        })
        .then(response => response.text())
        .then(data => console.log('data---:', data))
        .catch(error => console.error(error));
    }

    // 4.fetch read chunk方式：
    function getChunk() {
      fetch(url, {
        method: 'POST',
        body: JSON.stringify({ 'type': 'chunk' }),

      }).then(response => {
        if (response && response.body) {
          const reader = response.body.getReader();
          const decoder = new TextDecoder('utf-8');
          reader.read().then(function processText({ done, value }): Promise<void> {
            if (done) {
              console.log('传输完毕');
              return Promise.resolve();
            }
            console.log('result----', decoder.decode(value));
            renderData(decoder.decode(value));
            return reader.read().then(processText);
          });
        }
      }).catch(error => console.error(error));
    }
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
      <h2>demo data</h2>
      <div ref={resualtRef}>

      </div>
    </div>
  );
};

export default App;
