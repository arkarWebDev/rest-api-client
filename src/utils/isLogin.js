import { redirect } from "react-router-dom";

const isLogin = async () => {
  const token = JSON.parse(localStorage.getItem("token"));

  if (!token) {
    return redirect("/");
  }

  const response = await fetch(`${import.meta.env.VITE_API}/status`, {
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
  });

  if (response.status === 401) {
    return redirect("/");
  } else {
    return null;
  }
};

export default isLogin;
