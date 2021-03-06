import {
  Alert,
  Button,
  Fade,
  FormControlLabel,
  Grid,
  Snackbar,
  Switch,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Fragment, useEffect } from "react";
import useInput from "../../hooks/useInput";
import {
  useSignUpMutation,
  useLoginMutation,
} from "../../features/auth/authEndpoints";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AuthForm = () => {
  const navigate = useNavigate();
  const [signUp, setsignUp] = useState(false);
  const [openSignUpError, setOpenSignUpError] = useState(false);
  const [openLoginError, setOpenLoginError] = useState(true);
  const { value: name, bind: bindName } = useInput("");
  const { value: email, bind: bindEmail } = useInput("");
  const { value: password, bind: bindPassword } = useInput("");
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

  useEffect(() => {
    if (signUpError && signUp) {
      setOpenSignUpError(true);
    } else if (loginError && !signUp) {
      setOpenLoginError(true);
    }
  }, [signUpError, loginError, signUp]);

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
        <Snackbar
          autoHideDuration={2000}
          onClose={() => {
            setOpenSignUpError(false);
          }}
          open={openSignUpError}
        >
          <Alert severity="error">
            {signUpErrorMessage.data.status.message}
          </Alert>
        </Snackbar>
      )}
      {loginError && (
        <Snackbar
          autoHideDuration={2000}
          onClose={() => {
            setOpenLoginError(false);
          }}
          open={openLoginError}
        >
          <Alert severity="error">{loginErrorMessage.data.error}</Alert>
        </Snackbar>
      )}

      <form sx={{ outline: "white" }}>
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
            {signUp && <Typography variant="h3">Sign Up</Typography>}
            {!signUp && <Typography variant="h3">Log In</Typography>}
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
            <Stack
              direction="row"
              sx={{
                justifyContent: "space-between",
              }}
              spacing={1}
            >
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#FFE4E1",
                  color: "#000000",
                  "&:hover": {
                    backgroundColor: "#fff",
                  },
                }}
                align="center"
                size="small"
                onClick={handleSubmit}
              >
                Submit
              </Button>
              <FormControlLabel
                mt="15px"
                control={<Switch color="primary" onChange={handleSwitch} />}
                label={
                  signUp ? (
                    <Typography variant="caption">Log In</Typography>
                  ) : (
                    <Typography variant="caption">Sign Up</Typography>
                  )
                }
                labelPlacement="bottom"
              />
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
};

export default AuthForm;
