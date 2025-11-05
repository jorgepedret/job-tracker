import express from "express";
import cors from "cors";
import jobs from "./routes/jobs";
import applications from "./routes/applications";
import companies from "./routes/companies";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/jobs", jobs);
app.use("/api/applications", applications);
app.use("/api/companies", companies);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API on :${port}`));