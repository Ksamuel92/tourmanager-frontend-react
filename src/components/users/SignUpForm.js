import { TextField, Button } from "@material-ui/core";
import useInput from "../../hooks/useInput";
import {
  useSignUpMutation,
  useLoginMutation,
} from "../../features/auth/authEndpoints";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";

const SignUpForm = () => {
  const [signUpUser] = useSignUpMutation(); //TODO handle user object
  const [loginUser] = useLoginMutation();
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState(false);
  const { value: name, bind: bindName, reset: resetName } = useInput("");
  const { value: email, bind: bindEmail, reset: resetEmail } = useInput("");
  const {
    value: password,
    bind: bindPassword,
    reset: resetPassword,
  } = useInput("");

  const handleSwitch = () => {
    setLoginForm(!loginForm);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!loginForm) {
      try {
        const signUpFormState = { user: { name, email, password } };
        const response = await signUpUser(signUpFormState).unwrap();
        if (response.status.code === 200) {
          navigate("/shows");
        }
      } catch (err) {
        console.log(err);
      }
    } else if (loginForm) {
      try {
        const loginFormState = { user: { email, password } };
        const response = await loginUser(loginFormState).unwrap();
        if (response.status.code === 200) {
          navigate("/shows");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {loginForm ? null : (
          <TextField
            id="name-input"
            name="name"
            label="Name"
            type="text"
            {...bindName}
          />
        )}
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
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography>Sign Up</Typography>
        <Switch onChange={handleSwitch} />
        <Typography>Login</Typography>
      </Stack>
    </div>
  );
};

export default SignUpForm;
