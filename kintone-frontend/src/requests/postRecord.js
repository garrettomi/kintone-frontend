const addRecordEndpoint =
  "https://kintone-project-backend.onrender.com/backend/postData";

export default async function postRecord(location) {
  const recordBodyParameters = {
    country: location.country,
    state: location.state,
    city: location.city,
    email: location.email,
    locCoordsX: location.locCoordsX,
    locCoordsY: location.locCoordsY,
    imageUrl: location.imageUrl,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recordBodyParameters),
  };

  const response = await fetch(addRecordEndpoint, options);
  const jsonResponse = await response.json();

  console.log(JSON.stringify(jsonResponse));

  return jsonResponse;
}
