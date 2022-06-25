import { app } from "./server";
import { port } from "./config";

app.listen(port, () =>{
    console.log(`[server]: Server is running at: https://localhost:${port}`);
});