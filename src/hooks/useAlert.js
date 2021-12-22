import { useState, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";

const useAlert = (actionStatusSuccessObject, actionStatusErrorObject) => {
  const [openSnackbarSuccess, setOpenSnackbarSuccess] = useState(false);
  const [openSnackbarError, setOpenSnackbarError] = useState(false);

  const { isSuccess, successMessage } = actionStatusSuccessObject;
  const { isError, error } = actionStatusErrorObject;

  useEffect(() => {
    if (isSuccess) {
      setOpenSnackbarSuccess(true);
    } else if (isError) {
      setOpenSnackbarError(true);
    }
  }, [isSuccess, isError]);

  const successAlert = (
    <Snackbar
      autoHideDuration={2000}
      onClose={() => {
        setOpenSnackbarSuccess(false);
      }}
      open={openSnackbarSuccess}
    >
      <Alert severity="success">{successMessage}</Alert>
    </Snackbar>
  );

  const errorAlert = (
    <Snackbar
      autoHideDuration={2000}
      onClose={() => {
        setOpenSnackbarError(false);
      }}
      open={openSnackbarError}
    >
      <Alert severity="error">{error}</Alert>
    </Snackbar>
  );

  return {
    successAlert,
    errorAlert,
  };
};

export default useAlert;
