import App from "./app";

const app = new App().server;

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});
