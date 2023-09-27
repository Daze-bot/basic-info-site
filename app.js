const express = require("express");
const app = express();
const port = 3000;
















app.listen(port, () => {
  console.log(`App listening on localhost:${port}`);
});

app.use((req, res, next) => {
  res.status(404).sendFile('404.html');
})