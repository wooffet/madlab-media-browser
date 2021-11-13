const express = require("express");
const initRoutes = require("./routes/index");
const app = express();

global.__sharedir = `C:\\Users\\loomy\\Dev\\`;

app.use(express.urlencoded({ extended: true }));

initRoutes(app);

const port = 48080;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});
