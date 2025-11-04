import JobForm from "./components/JobForm";
import { useQuery } from '@tanstack/react-query';
import { getJobs } from './lib/api';

export default function App(){
  const { data = [] } = useQuery({ queryKey:['jobs'], queryFn: getJobs });
  return (
    <div style={{ padding: 24 }}>
      <h1>Job Tracker</h1>
      <JobForm />
      <ul>
        {data.map((j:any) => (
          <li key={j.id}>
            {j.title} — {j.company?.name ?? 'Unknown'} — {(j.applications?.length ?? 0)} apps
          </li>
        ))}
      </ul>
    </div>
  );
}