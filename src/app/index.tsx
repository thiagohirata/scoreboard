import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ScoreBoard from "../components/ScoreBoard";

if (!window.IS_SERVE && "serviceWorker" in navigator) {
  navigator.serviceWorker.register("./service-worker.js", {
    scope: "./",
  });
}

const Root: React.FC = () => {
  return (
    <main className="page py-4">
      <ScoreBoard />
    </main>
  );
};

createRoot(document.getElementById("root")).render(<Root />);

new EventSource("/esbuild").addEventListener("change", () => location.reload());
