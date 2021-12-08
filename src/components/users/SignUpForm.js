import { TextField, Button } from "@material-ui/core";
import useInput from "../../hooks/useInput";
import { useSignUpMutation } from "../../features/auth/authEndpoints";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [signUpUser, { data, isSuccess, isError, error }] = useSignUpMutation(); //TODO handle user object
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
      // TODO Confirm user auth works

      debugger;
      if (response.status.code === 200) {
        navigate("/");
      }
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
