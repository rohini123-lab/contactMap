import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteContact } from "../Store/contactSlice";
import CancelIcon from "@mui/icons-material/Cancel";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts);

  const removeTodoHandler = (contact) => {
    dispatch(deleteContact(contact));
  };
  return (
    <>
      <Container sx={{ py: 2 }} maxWidth="md">
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/create")}
        >
          Create Contact
        </Button>

        {contacts.length === 0 && (
          <Card className="ui-cart" sx={{ mt: 2, mb: 2 }}>
            <CardContent>
              <Typography gutterBottom>
                <CancelIcon size="large"></CancelIcon> <br />
                No contact Found
                <br />
                Please add contact from
                <br />
                create contact Button
              </Typography>
            </CardContent>
          </Card>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: " space-between",
            flexWrap: "wrap",
          }}
        >
          {contacts.map((contact) => (
            <Card className="ui-cart" key={contact.id} sx={{ mt: 2, mb: 2 }}>
              <CardContent>
                <Typography gutterBottom>
                  <strong> First Name:</strong> {contact.firstName}
                </Typography>
                <Typography gutterBottom>
                  <strong>Last Name:</strong> {contact.lastName}
                </Typography>
                <Typography gutterBottom>
                  <strong>Status:</strong> {contact.status}
                </Typography>
              </CardContent>
              <CardActions style={{ display: "flex" }}>
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate(`/Edit/${contact.id}`)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    removeTodoHandler(contact);
                  }}
                  size="small"
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
      </Container>
    </>
  );
}

export default Home;
