import { createRoot } from "react-dom/client";
import "./index.css";
import Main from "./src/main";

createRoot(document.getElementById("app") as Element).render(<Main />);
// InitializingServiceWorker();
