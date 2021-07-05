import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
// LOGIN COMPONENT
import SignUp from "../components/login/SignUp";
import LogIn from "../components/login/LogIn";

const LogInPage = () => {
  const { signUp, setSignUp, clear_error_message, user } =
    useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    clear_error_message();
  }, [signUp, clear_error_message]);

  useEffect(() => {
    if (user !== undefined) {
      history.push(`/user/${user.user_name}`);
    }
  });

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
