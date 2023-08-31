const getRecordsEndpoint =
  "https://kintone-project-backend.onrender.com/backend/getData";

export default async function getRecords() {
  const response = await fetch(getRecordsEndpoint);
  const jsonResponse = await response.json();

  return jsonResponse;
}
