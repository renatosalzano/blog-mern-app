import axios from "axios";
import Router from "./Router";
import "./styles/layout.scss";
import "./styles/input.scss";
import "./styles/user.scss";
import "./styles/post.scss";
import "./styles/comment.scss";
import "./styles/panel.scss";
import "./styles/button.scss";
import "./styles/media_query.scss";

import { AuthProvider } from "./auth/AuthContext";

axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="layout">
      <AuthProvider>
        <Router />
      </AuthProvider>
    </div>
  );
}

export default App;
