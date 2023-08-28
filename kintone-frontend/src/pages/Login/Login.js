import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    // const response = await fetch(
    //   `https://${process.env.SUBDOMAIN}.kintone.com/k/v1/record.json`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "X-Cybozu-API-Token": process.env.APITOKEN,
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       app: process.env.APPID,
    //       record: {
    //         value: username,
    //       },
    //       password: {
    //         value: password,
    //       },
    //     }),
    //   }
    // );
    // const data = await response.json();
    // console.log(data);
    navigate("/");
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
