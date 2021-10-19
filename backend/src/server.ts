import { app } from "./app";

app.listen(Number(process.env.PORT), process.env.ADDRESS, () =>
  console.log(
    `Server is running at ${process.env.ADDRESS}:${process.env.PORT} ...`,
  ),
);
