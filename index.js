import app from "./app.js";
import connectDb from "./src/db/connect.js";

connectDb();
app.listen(3000);
console.log("server listening on port 3000");
