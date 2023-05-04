import { getLineStr } from "@/utils/fake-data";
const encoder = new TextEncoder();

function apiHandler() {
  let controller: any;
  const stream = new ReadableStream({
    async start(_) {
      controller = _;
    },
  });
  setInterval(() => {
    controller.enqueue(encoder.encode(`${getLineStr()}\n\n`));
  }, 5000);
  return stream;
}
export async function POST() {
  return new Response(apiHandler())
}
export async function GET() {
  return new Response(apiHandler(), {
    headers: {
      'Content-Type': 'text/event-stream'
    }
  })
}