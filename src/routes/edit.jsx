// Import required hooks and components from 'react-router-dom' and the updateContact function in the app.
import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { updateContact } from "../contacts";

export async function action({ request, params }) {
  const formData = await request.formData(); // Fetch the FormData.
  const updates = Object.fromEntries(formData); // Convert FormData into a plain object.
  await updateContact(params.contactId, updates); // Call updateContact with the contact ID and the form data.
  return redirect(`/contacts/${params.contactId}`); // Redirect the user to the updated contact's detail page.
}

// Define the EditContact component.
export default function EditContact() {
  const { contact } = useLoaderData(); // Use the useLoaderData hook to access data loaded for this route.
  const navigate = useNavigate(); // Use the useNavigate hook for navigation actions.

  // Render the form for editing a contact.
  return (
    <Form method="post" id="contact-form">
      {" "}
      <p>
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={contact.first} // Set the default value of the input to the contact's first name.
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          defaultValue={contact.last} // Set the default value of the input to the contact's last name.
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          defaultValue={contact.twitter} // Set the default value of the input to the contact's Twitter handle.
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={contact.avatar} // Set the default value of the input to the contact's avatar URL.
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea name="notes" defaultValue={contact.notes} rows={6} />
      </label>
      <p>
        <button type="submit">Save</button>
        <button
          type="button"
          onClick={() => {
            navigate(-1); // Button to navigate back to the previous page.
          }}
        >
          Cancel
        </button>
      </p>
    </Form>
  );
}
