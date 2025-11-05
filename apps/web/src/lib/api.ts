export async function getJobs(){
  const res = await fetch(import.meta.env.VITE_API_URL + "/api/jobs");
  if(!res.ok) throw new Error("Failed to fetch jobs");
  return res.json();
}

export async function getCompanies(){
  const res = await fetch(import.meta.env.VITE_API_URL + "/api/companies");
  if(!res.ok) throw new Error("Failed to fetch companies");
  return res.json();
}

export async function createJob(payload: { title: string; companyId: number; }){
  const res = await fetch(import.meta.env.VITE_API_URL + "/api/jobs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if(!res.ok) throw new Error("Failed to create job");
  return res.json();
}

export async function deleteJob(id: number){
  const res = await fetch(import.meta.env.VITE_API_URL + "/api/jobs/" + id, { method: "DELETE" });
  if(!res.ok) throw new Error("Failed to delete job");
}