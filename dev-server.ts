import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { config } from "dotenv";

// Load .env.local before importing handlers so RESEND_API_KEY is available
config({ path: ".env.local" });

const PORT = 3001;

const server = http.createServer((req, res) => {
  // CORS headers for local dev
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // Parse URL to find the requested API endpoint
  const url = new URL(req.url || "/", `http://${req.headers.host}`);
  const pathname = url.pathname; // e.g., /api/send-raffle-update-email

  if (!pathname.startsWith("/api/")) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not Found" }));
    return;
  }

  // Determine the file path for the handler (e.g., /api/foo -> ./api/foo.ts)
  const apiFile = pathname.replace(/^\/api\//, "") + ".ts";
  const apiPath = path.join(process.cwd(), "api", apiFile);

  if (!fs.existsSync(apiPath)) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: `Endpoint ${pathname} not found` }));
    return;
  }

  let raw = "";
  req.on("data", (chunk) => (raw += chunk));
  req.on("end", async () => {
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

    try {
      // Dynamically import the correct API handler
      const moduleUrl = new URL(`file://${apiPath}`);
      const { default: handler } = await import(moduleUrl.href);

      await handler(req as any, vercelRes);
    } catch (err: unknown) {
      console.error(`[api] Unhandled error in handler for ${pathname}:`, err);
      if (!res.headersSent) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Internal server error" }));
      }
    }
  });
});

server.listen(PORT, () => {
  console.log(`[api] Local function server → http://localhost:${PORT}`);
});
