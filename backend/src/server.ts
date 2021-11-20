import { app } from "./app";

app.listen(Number(process.env.PORT), () =>
  console.log(
    `Server is running at port ${process.env.PORT} ...`,
  ),
);
