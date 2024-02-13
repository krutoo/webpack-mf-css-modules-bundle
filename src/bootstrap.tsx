import { createRoot } from "react-dom/client";
import { Header } from "./components/header";
import "./index.css";

const container = document.createElement("div");

document.body.append(container);

createRoot(container).render(<Header />);
