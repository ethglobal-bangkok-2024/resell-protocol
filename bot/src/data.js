export async function fetchData() {
  const res = await fetch(process.env.API_BASE_URL);
  const { chainId, address } = await res.json();
  return { chainId, address };
}