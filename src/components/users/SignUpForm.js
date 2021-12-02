import {
  Grid,
  TextField,
  FormControlLabel,
  FormControl,
  Button,
} from "@material-ui/core";
import useInput from "../../hooks/useInput";
import { useSignUpMutation } from "../../features/auth/authEndpoints";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../../features/auth/authSlice";

const SignUpForm = () => {
  const [signUpUser, { data, error, isLoading, isSuccess, isError }] =
    useSignUpMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { value: name, bind: bindName, reset: resetName } = useInput("");
  const { value: email, bind: bindEmail, reset: resetEmail } = useInput("");
  const {
    value: password,
    bind: bindPassword,
    reset: resetPassword,
  } = useInput("");

  const formState = { user: { name, email, password } };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await signUpUser(formState).unwrap();
      debugger;
      const { data: user } = response;
      dispatch(setCredentials(user));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id="name-input"
        name="name"
        label="Name"
        type="text"
        {...bindName}
      />
      <TextField
        id="email-input"
        name="email"
        label="Email"
        type="email"
        {...bindEmail}
      />
      <TextField
        id="password-input"
        name="password"
        label="Password"
        type="password"
        {...bindPassword}
      />
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </form>
  );
};

export default SignUpForm;
