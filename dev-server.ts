import http from "node:http";
import { config } from "dotenv";

// Load .env.local before importing the handler so RESEND_API_KEY is available
config({ path: ".env.local" });

const { default: handler } = await import("./api/send-confirmation.ts");

const PORT = 3001;

const server = http.createServer((req, res) => {
  // CORS headers for local dev
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  let raw = "";
  req.on("data", (chunk) => (raw += chunk));
  req.on("end", () => {
    try {
      (req as any).body = raw ? JSON.parse(raw) : {};
    } catch {
      (req as any).body = {};
    }

    // Polyfill Vercel response methods on top of the plain Node ServerResponse
    const vercelRes = res as any;

    vercelRes.status = (code: number) => {
      res.statusCode = code;
      return vercelRes; // allow chaining: res.status(200).json(...)
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
