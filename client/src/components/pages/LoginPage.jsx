import { useContext, useEffect } from "react";
import { AuthContext } from "../../auth/AuthContext";
import LogIn from "../login/LogIn";
import SignUp from "../login/SignUp";

const LogInPage = () => {
  const { signUp, setSignUp, clear_error_message } = useContext(AuthContext);

  useEffect(() => {
    clear_error_message();
  }, [signUp, clear_error_message]);

  return (
    <div className="page">
      <div className="login_section">
        {signUp ? (
          <SignUp setSignUp={setSignUp} />
        ) : (
          <LogIn setSignUp={setSignUp} />
        )}
      </div>
    </div>
  );
};

export default LogInPage;
