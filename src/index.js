import app from "./app.js"
import connectDB from "./db.js";

//mongo connection
connectDB();
//launch node server
app.listen(3000, () =>
    console.log('Example app listening on port 3000!'),
);
