const express = require("express");
const chalk = require("ansi-colors");
const app = express();
const cors = require("cors");
const port = 8080;

app.use(cors());

app.get("/", (req, res) => {
  res.send("server monitoring api");
});

app.get("/checkServerStatus", async (req, res) => {
  console.log(
    chalk.blue(`GET /checkServerStatus ${chalk.gray(new Date().toISOString())}`)
  );
  const serverStatus = {};

  const servers = [
    "https://workflow.foodrabbit.store/api/v1/_health/ready",
    "https://8.8.8.8/",
    "https://onboarding.foodrabbit.store",
    "https://backoffice.foodrabbit.store",
    "https://kyc.foodrabbit.store",
    "https://api.foodrabbit.store/health",
    "https://foodrabbit.store",
    "https://scanner.keoscx.com",
    "https://eventos.keoscx.com",
    "https://keosgpt.keoscx.com",
    "https://chatbot-train.keoscx.com/api/v1/health",
    "https://ballerine-api.foodrabbit.store/api/v1/health",
    "https://checkout.foodrabbit.store/HyperLoader.js",
    "https://aviancaoffline.foodrabbit.ai/",
    "http://loyalty.keoscx.com/",
    "https://keoscard.keoscx.com/",
    "http://labcrm.keoscx.com/",
    "https://stg-mail.keos.co/",
    "https://dmail.keosapp.com/",
    "https://keoswallet.luminousdemo.com/",
    "https://keoscrm.com",
    "https://calendar.keoscx.com/",
    "https://events.keosapp.com/"
];
  await Promise.all(
    servers.map(async (server) => {
      try {
        const response = await fetch(server);
        if (response.ok) {
          serverStatus[server] = "up";
        } else {
          serverStatus[server] = "down";
        }
      } catch (error) {
        serverStatus[server] = "down";
      }
    })
  );

  res.send(serverStatus);
});

app.listen(port, () => {
  console.log(`Server:${port} ✅`);
});
