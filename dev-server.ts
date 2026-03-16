import http from "node:http";
import { config } from "dotenv";

config({ path: ".env.local" });

const { default: confirmationHandler } = await import("./api/send-confirmation.ts");
const { default: raffleVerifyHandler } = await import("./api/raffle-verify.ts");
const { default: raffleEmailHandler } = await import("./api/send-raffle-email.ts");

const PORT = 3001;

type Handler = (req: any, res: any) => Promise<any>;

const routes: Record<string, Handler> = {
  "/api/send-confirmation": confirmationHandler,
  "/api/raffle-verify": raffleVerifyHandler,
  "/api/send-raffle-email": raffleEmailHandler,
};

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  let raw = "";
  req.on("data", (chunk: string) => (raw += chunk));
  req.on("end", () => {
    try {
      (req as any).body = raw ? JSON.parse(raw) : {};
    } catch {
      (req as any).body = {};
    }

    const vercelRes = res as any;

    vercelRes.status = (code: number) => {
      res.statusCode = code;
      return vercelRes;
    };

    vercelRes.json = (data: unknown) => {
      if (!res.headersSent) {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(data));
      }
      return vercelRes;
    };

    vercelRes.send = (data: unknown) => {
      if (!res.headersSent) {
        res.end(typeof data === "string" ? data : JSON.stringify(data));
      }
      return vercelRes;
    };

    const handler = routes[req.url ?? ""];
    if (!handler) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Not found" }));
      return;
    }

    handler(req as any, vercelRes).catch((err: unknown) => {
      console.error("[api] Unhandled error in handler:", err);
      if (!res.headersSent) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Internal server error" }));
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`[api] Local function server → http://localhost:${PORT}`);
});
