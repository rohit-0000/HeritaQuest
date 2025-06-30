import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuth2RedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("HeritaQuestToken", token);
      navigate("/");
      window.location.reload();
    } else {
      navigate("/"); 
      window.location.reload();
    }
  }, []);

  return null;
};

export default OAuth2RedirectHandler;