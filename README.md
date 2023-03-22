# next-sse-demo

Demo for [sse-what-why-how](https://genffy.com/2023/03/sse-what-why-how/)

The demo is inspired by [using-fetch-event-source-server-sent-events-react](https://blog.logrocket.com/using-fetch-event-source-server-sent-events-react/)

As we all know, nextjs support stream have two ways:

- API Route under `pages` folder with edge runtime, but have some limit [unsupported-apis](https://nextjs.org/docs/api-reference/edge-runtime#unsupported-apis)     
    some issues:    
    - https://github.com/vercel/next.js/issues/30932 
    - https://github.com/axios/axios/issues/5523
- Router handler under `app` folder [streaming](https://beta.nextjs.org/docs/routing/route-handlers#streaming)

If we connect the api to a simple nodejs service(eg: use `express`), sse can be achieved with [`res.write`](./server.js#L15-L29), but API router with [default runtime](https://beta.nextjs.org/docs/rendering/edge-and-nodejs-runtimes#segment-runtime-option)(nodejs) not.

So why? What does nextjs do on API Routes with nodejs runtime?

refs:       
- [Edge and Node.js Runtimes](https://beta.nextjs.org/docs/rendering/edge-and-nodejs-runtimes)        
- [Streams—The definitive guide](https://web.dev/streams/)