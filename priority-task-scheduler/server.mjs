import http from "node:http";
import { processTask } from "./challenge.mjs";

const PORT = 42069;
const HOST = "0.0.0.0";

http
  .createServer((req, res) => {
    if (req.method !== "GET") {
      res.writeHead(405).end();
      return;
    }

    const reqUrl = new URL(
      req.url,
      `http://${req.headers.host || "localhost"}`
    );
    res.setHeader("Content-Type", "application/json");
    if (reqUrl.pathname !== "/request") {
      res
        .writeHead(404)
        .end(JSON.stringify({ message: "Send me a task at /request" }));
      return;
    }
    if (
      !reqUrl.searchParams.get("priority") ||
      isNaN(parseInt(reqUrl.searchParams.get("priority"), 10))
    ) {
      res
        .writeHead(400)
        .end(JSON.stringify({ message: "priority is required" }));
      return;
    }
    processTask({
      id: `task-${new Date().getTime()}`,
      priority: parseInt(reqUrl.searchParams.get("priority")),
      description: reqUrl.searchParams.get("description") || "",
      setTaskDone: function (message) {
        res.end(
          JSON.stringify({ message: message ?? "Task Done", id: this.id })
        );
      },
    });
  })
  .listen(PORT, HOST, () =>
    console.log(`server started on: http://${HOST}:${PORT}`)
  );
