import { deleteJob } from "../lib/api";
import { useQueryClient } from "@tanstack/react-query";

export default function JobsTable({ jobs }: { jobs: any[] }){
  const qc = useQueryClient();

  async function onDelete(id: number){
    await deleteJob(id);
    qc.invalidateQueries({ queryKey: ["jobs"] });
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Company</th>
          <th>Applications</th>
          <th>Created</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {jobs.map((j:any)=>(
          <tr key={j.id}>
            <td>{j.title}</td>
            <td>{j.company?.name}</td>
            <td>{j.applications?.length ?? 0}</td>
            <td>{new Date(j.createdAt).toLocaleString()}</td>
            <td><button onClick={()=>onDelete(j.id)}>Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}