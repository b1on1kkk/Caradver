import { Outlet } from "react-router-dom";

import Header from "../../components/Header/Header";
import LeftSideMenu from "../../components/LeftSideMenu/LeftSideMenu";

import { useState, useEffect } from "react";

export default function MainLayOut() {
  // update workplace width based on user screen
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    window.addEventListener("resize", () => setHeight(window.innerHeight));
    return () => {
      window.removeEventListener("resize", () => setHeight(window.innerHeight));
    };
  }, []);
  //

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <LeftSideMenu />
        <main
          className="flex-1 bg-gray-100 rounded-tl-xl overflow-auto w-full"
          style={{ height: `${height - 110}px` }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
