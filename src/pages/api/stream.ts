import { getLineStr } from "@/utils/fake-data";
import { NextApiHandler, NextApiResponse } from "next";

const handler: NextApiHandler = async (req, res: NextApiResponse) => {
    res.writeHead(200, {
        Connection: "keep-alive",
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
    });
    res.flushHeaders()
    const interId = setInterval(() => {
        res.write(getLineStr());
        res.write("\n\n");
    }, 5000);
    res.on('close', ()=>{
        clearInterval(interId)
        res.end()
    })
}

export default handler;