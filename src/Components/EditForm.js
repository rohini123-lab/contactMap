import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editContact } from "../Store/contactSlice";

export default function EditForm() {
  const [error, setError] = React.useState(false);
  const { id } = useParams();
  const contacts = useSelector((state) => state.contacts);
  const updatedContactIndex = contacts.findIndex(
    (contact) => contact.id === id
  );
  const [firstName, setFirstName] = React.useState(
    contacts[updatedContactIndex].firstName
  );
  const [lastName, setLastName] = React.useState(
    contacts[updatedContactIndex].lastName
  );
  const [status, setStatus] = useState(contacts[updatedContactIndex].status);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (firstName === "" || lastName === "") {
      setError(true);
    } else {
      dispatch(
        editContact({
          id: id,
          firstName: firstName,
          lastName: lastName,
          status: status,
        })
      );
      setFirstName("");
      setLastName("");
      setStatus("");
      navigate("/");
    }
  };

  const handleStatusChange = (event, id) => {
    const newStatus = event.target.value;
    setStatus(newStatus);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Typography
        component="h1"
        sx={{
          p: "20px 0 0 0",
          textAlign: "center",
        }}
        variant="h5"
      >
        Update Contact
      </Typography>
      <Box sx={{ mt: 1 }}>
        <Paper
          component="form"
          elevation="18"
          sx={{
            p: "30px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography style={{ marginRight: "10px" }}>FirstName</Typography>
              <TextField
                style={{ marginTop: "15px" }}
                value={firstName}
                name="firstName"
                id="firstName"
                onChange={(event) => setFirstName(event.currentTarget.value)}
                onBlur={(event) => {
                  setFirstName(event.currentTarget.value);
                  if (firstName === "") {
                    setError(true);
                  } else {
                    setError(false);
                  }
                }}
                error={error}
                placeholder="First name..."
              />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography style={{ marginRight: "10px" }}>LastName</Typography>
              <TextField
                value={lastName}
                name="lastName"
                id="lastName"
                onChange={(event) => setLastName(event.currentTarget.value)}
                onBlur={(event) => {
                  setLastName(event.currentTarget.value);
                  if (firstName === "") {
                    setError(true);
                  } else {
                    setError(false);
                  }
                }}
                error={error}
                style={{ marginTop: "15px" }}
                placeholder="Last name..."
              />
            </div>
            <div>
              <Typography>
                Status:
                <RadioGroup
                  name="status"
                  value={status}
                  onChange={handleStatusChange}
                >
                  <FormControlLabel
                    value="active"
                    control={<Radio />}
                    label="Active"
                  />
                  <FormControlLabel
                    value="inactive"
                    control={<Radio />}
                    label="Inactive"
                  />
                </RadioGroup>
              </Typography>
            </div>
            <div
              style={{
                marginTop: "20px",
                marginBottom: "0px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button onClick={handleSubmit} variant="contained" size="medium">
                Update Contact
              </Button>
            </div>
          </div>
        </Paper>
        {error && (
          <p style={{ padding: "0 10px", color: "red", fontSize: "14px" }}>
            Enter correct name
          </p>
        )}
      </Box>
    </Container>
  );
}
