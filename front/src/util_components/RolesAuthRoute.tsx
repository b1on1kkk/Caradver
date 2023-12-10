// redux
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

import { Navigate } from "react-router-dom";

export default function RolesAuthRoute({
  children,
  path
}: {
  children: React.ReactNode;
  path: string;
}) {
  const user = useSelector((state: RootState) => state.getUser.user);

  if (user.length > 0 && user[0].role === 1) return <>{children}</>;

  return <Navigate to={`/${path}`} />;
}
