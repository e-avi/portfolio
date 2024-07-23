import { useEffect, useState } from "react";
import { FunOS } from "./components/FunOS";
import { MainPortfolio } from "./components/MainPortfolio";

type Route = "home" | "fun";

function routeFromPath(pathname: string): Route {
  return pathname === "/fun" ? "fun" : "home";
}

export default function App() {
  const [route, setRoute] = useState<Route>(() =>
    routeFromPath(window.location.pathname),
  );

  useEffect(() => {
    const handlePopState = () => setRoute(routeFromPath(window.location.pathname));
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (path: "/" | "/fun") => {
    window.history.pushState({}, "", path);
    setRoute(routeFromPath(path));
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return route === "fun" ? (
    <FunOS navigateHome={() => navigate("/")} />
  ) : (
    <MainPortfolio navigateFun={() => navigate("/fun")} />
  );
}
