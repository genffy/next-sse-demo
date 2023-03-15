import { getLineStr } from "@/utils/fake-data";
const encoder = new TextEncoder();
export async function POST() {
  let controller: any;
  const stream = new ReadableStream({
    async start(_) {
      controller = _;
    },
  });
  setInterval(() => {
    controller.enqueue(encoder.encode(`${getLineStr()}\n\n`));
  }, 5000);
  return new Response(stream)
}
