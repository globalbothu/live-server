// 24/7 Live Web Server - zero dependencies
const http = require("http");

const PORT = process.env.PORT || 3000;
const START_TIME = Date.now();

function getUptime() {
  const totalSeconds = Math.floor((Date.now() - START_TIME) / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours}h ${minutes}m ${seconds}s`;
}

const server = http.createServer((req, res) => {
  const now = new Date().toUTCString();

  // Health check endpoint (Render / pingers use this)
  if (req.url === "/health" || req.url === "/ping") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok", uptime: getUptime(), time: now }));
    return;
  }

  // Simple landing page
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>24/7 Live Server</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #0f172a, #1e293b);
      color: #e2e8f0;
      font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
      text-align: center;
      padding: 24px;
    }
    .card {
      background: rgba(30, 41, 59, 0.8);
      border: 1px solid #334155;
      border-radius: 16px;
      padding: 40px;
      max-width: 520px;
      width: 100%;
      box-shadow: 0 20px 60px rgba(0,0,0,.4);
    }
    .dot {
      width: 14px; height: 14px; border-radius: 50%;
      background: #22c55e; display: inline-block; margin-right: 8px;
      box-shadow: 0 0 0 0 rgba(34,197,94,.6);
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0% { box-shadow: 0 0 0 0 rgba(34,197,94,.6); }
      70% { box-shadow: 0 0 0 12px rgba(34,197,94,0); }
      100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); }
    }
    h1 { font-size: 1.7rem; margin-bottom: 8px; }
    .status { color: #4ade80; font-size: 1rem; margin-bottom: 24px; }
    .row {
      display: flex; justify-content: space-between;
      padding: 12px 0; border-top: 1px solid #334155;
      font-size: .95rem;
    }
    .row span:last-child { color: #93c5fd; }
  </style>
</head>
<body>
  <div class="card">
    <h1><span class="dot"></span>24/7 Live Server</h1>
    <p class="status">Server is ONLINE</p>
    <div class="row"><span>Uptime</span><span>${getUptime()}</span></div>
    <div class="row"><span>Server Time (UTC)</span><span>${now}</span></div>
    <div class="row"><span>Health Check</span><span>/health</span></div>
    <div class="row"><span>Platform</span><span>Render Free</span></div>
  </div>
</body>
</html>`;

  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(html);
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
