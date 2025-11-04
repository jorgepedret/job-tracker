import { useEffect, useState } from "react";

export default function JobForm() {
  const [companies, setCompanies] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [companyId, setCompanyId] = useState<number | "">("");

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/api/companies")
      .then(r => r.json())
      .then(setCompanies);
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    await fetch(import.meta.env.VITE_API_URL + "/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, companyId: Number(companyId) }),
    });
    setTitle("");
    setCompanyId("");
    // If using React Query, invalidate ["jobs"] here
  }

  return (
    <form onSubmit={submit} style={{ display: "flex", gap: 8, marginBottom: 16 }}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Job title" required />
      <select value={companyId} onChange={(e) => setCompanyId(Number(e.target.value))} required>
        <option value="">Select company</option>
        {companies.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>
      <button type="submit">Create</button>
    </form>
  );
}