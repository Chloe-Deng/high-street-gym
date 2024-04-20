import { useNavigate } from "react-router-dom";

export function useMoveBack() {
  const navigate = useNavigate();
  return () => navigate(-1);
  // return (e) => {
  //   e.preventDefault();
  //   navigate(-1);
  // };
}
