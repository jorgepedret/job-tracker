export async function getJobs(){
	const res = await fetch(import.meta.env.VITE_API_URL + "/api/jobs");
	if(!res.ok) throw new Error("Failed");
	return res.json();
}