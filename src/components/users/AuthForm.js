import { TextField, Button } from "@material-ui/core";
import { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import useInput from "../../hooks/useInput";
import {
  useSignUpMutation,
  useLoginMutation,
} from "../../features/auth/authEndpoints";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import Fade from "@mui/material/Fade";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";

const AuthForm = () => {
  const [
    signUpUser,
    {
      isSuccess: signUpSuccess,
      isError: signUpError,
      error: signUpErrorMessage,
    },
  ] = useSignUpMutation();
  const [
    loginUser,
    { isSuccess: loginSuccess, isError: loginError, error: loginErrorMessage },
  ] = useLoginMutation();
  const navigate = useNavigate();
  const [signUp, setsignUp] = useState(false);
  const { value: name, bind: bindName, reset: resetName } = useInput("");
  const { value: email, bind: bindEmail, reset: resetEmail } = useInput("");
  const {
    value: password,
    bind: bindPassword,
    reset: resetPassword,
  } = useInput("");

  const handleSwitch = () => {
    setsignUp((prevState) => !prevState);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (signUp) {
      const signUpFormState = { user: { name, email, password } };
      signUpUser(signUpFormState);
      if (signUpSuccess) {
        navigate("/shows");
      }
    } else if (!signUp) {
      const loginState = { user: { email, password } };
      loginUser(loginState);
      if (loginSuccess) {
        navigate("/shows");
      }
    }
  };

  return (
    <Fragment>
      {signUpError && (
        <Alert severity="error" onClose={() => {}}>
          {signUpErrorMessage.data.status.message}
        </Alert>
      )}
      {loginError && (
        <Alert severity="error" onClose={() => {}}>
          {loginErrorMessage.data.error}
        </Alert>
      )}

      <form onSubmit={handleSubmit} sx={{ outline: "white" }}>
        <Grid
          container
          spacing={0}
          direction="column"
          wrap="nowrap"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "50vh" }}
        >
          <Grid item>
            <Typography variant="h6" align="center">
              {signUp && "Sign Up"}
              {!signUp && "Log In"}
            </Typography>
          </Grid>
          <Grid item>
            <Fade in={signUp}>
              <TextField
                id="name-input"
                name="name"
                label="Name"
                type="text"
                margin="dense"
                {...bindName}
                sx={{ marginBottom: "15px" }}
              />
            </Fade>
            <Grid item>
              <TextField
                id="email-input"
                name="email"
                label="Email"
                type="email"
                margin="dense"
                {...bindEmail}
                sx={{ marginBottom: "15px" }}
              />
            </Grid>
            <Grid item>
              <TextField
                id="password-input"
                name="password"
                label="Password"
                type="password"
                margin="dense"
                {...bindPassword}
                sx={{ marginBottom: "15px" }}
              />
            </Grid>
            <Stack direction="row" spacing={1}>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                align="center"
              >
                Submit
              </Button>
              {/* <Typography>Login</Typography> */}
              <FormControlLabel
                mt="15px"
                control={<Switch color="primary" onChange={handleSwitch} />}
                label={signUp ? "Log In" : "Sign Up"}
                labelPlacement="bottom"
              />
              {/* <Typography>Sign Up</Typography> */}
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
};

export default AuthForm;
