import app from "./app.js";
import connectDb from "./src/db/connect.js";

connectDb();
app.listen(process.env.PORT);
console.log(`App listening on port ${process.env.PORT}`);
