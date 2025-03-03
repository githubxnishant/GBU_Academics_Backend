import { app } from "./app.js";
import { connectDB } from "./data/db.js";

connectDB();

app.listen(process.env.PORT || 5500, () => {
    console.log(`Server is running on port: ${process.env.PORT}`);
})