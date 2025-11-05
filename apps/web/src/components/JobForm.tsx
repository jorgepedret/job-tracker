import { useEffect, useState } from "react";
import { createJob, getCompanies } from "../lib/api";
import { useQueryClient } from "@tanstack/react-query";

export default function JobForm(){
  const qc = useQueryClient();
  const [companies, setCompanies] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [companyId, setCompanyId] = useState<number | "">("");

  useEffect(() => {
    getCompanies().then(setCompanies).catch(console.error);
  }, []);

  async function submit(e: React.FormEvent){
    e.preventDefault();
    if(!title || !companyId) return;
    await createJob({ title, companyId: Number(companyId) });
    setTitle("");
    setCompanyId("");
    qc.invalidateQueries({ queryKey: ["jobs"] });
  }

  return (
    <form onSubmit={submit} style={{ display: "flex", gap: 8, marginBottom: 16 }}>
      <input
        placeholder="Job title"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
      />
      <select value={companyId} onChange={(e)=>setCompanyId(Number(e.target.value))}>
        <option value="">Select company</option>
        {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>
      <button type="submit">Add</button>
    </form>
  );
}