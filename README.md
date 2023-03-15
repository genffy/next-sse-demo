# next-sse-demo

The demo is inspired by [using-fetch-event-source-server-sent-events-react](https://blog.logrocket.com/using-fetch-event-source-server-sent-events-react/)

As we all know, nextjs support stream have two ways:

- API Routes with edge runtime, but have some limit [unsupported-apis](https://nextjs.org/docs/api-reference/edge-runtime#unsupported-apis)
- router handler [streaming](https://beta.nextjs.org/docs/routing/route-handlers#streaming)

If we connect the api to a simple nodejs service, sse can be achieved with `res.write`.

So why? What does nextjs do on API Routes with nodejs runtime?

refs:
[Edge and Node.js Runtimes](https://beta.nextjs.org/docs/rendering/edge-and-nodejs-runtimes)
