const getRecordsEndpoint = "http://localhost:8000/getData";

export default async function getRecords() {
  const response = await fetch(getRecordsEndpoint);
  const jsonResponse = await response.json();

  console.log(jsonResponse);

  return jsonResponse;
}
