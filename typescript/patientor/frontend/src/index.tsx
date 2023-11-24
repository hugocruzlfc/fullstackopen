import ReactDOM from "react-dom/client";

import App from "./App";
import { StateProvider, reducer } from "./state";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StateProvider reducer={reducer}>
    <App />
  </StateProvider>
);
