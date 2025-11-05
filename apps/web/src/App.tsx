import { useQuery } from "@tanstack/react-query";
import { getJobs } from "./lib/api";
import JobForm from "./components/JobForm";
import JobsTable from "./components/JobsTable";

export default function App(){
  const { data = [], isLoading } = useQuery({ queryKey: ["jobs"], queryFn: getJobs });

  return (
    <div style={{ padding: 24 }}>
      <h1>Job Tracker</h1>
      <JobForm />
      {isLoading ? <div>Loading…</div> : <JobsTable jobs={data} />}
    </div>
  );
}