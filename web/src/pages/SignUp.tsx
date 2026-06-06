import { Button, Card } from "@heroui/react";
import { NavLink } from "react-router";
import { Input, Seo } from "../component";
import { Form, Formik, type FormikProps } from "formik";

interface SignupFormValues {
  email: string;
}

export default function SignUp() {
  return (
    <div className="flex items-center justify-center w-full">
      <Seo title="Sign Up" description="Sign up to get an account" />
      <Card>
        <Card.Header>
          <Card.Title className="font-bold text-2xl">Sign Up</Card.Title>
          <Card.Description>
            Enter your email to sign up for an account
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <Formik
            initialValues={{
              email: "",
            }}
            onSubmit={(values, actions) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                actions.setSubmitting(false);
              }, 1000);
            }}
          >
            {(props: FormikProps<SignupFormValues>) => (
              <Form className="flex flex-col gap-4">
                <Input
                  name="email"
                  label={{
                    children: "Email",
                  }}
                  input={{
                    placeholder: "Email",
                  }}
                />

                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Card.Content>
        <Card.Footer>
          <NavLink to="/login" className="font-bold">
            Login
          </NavLink>
        </Card.Footer>
      </Card>
    </div>
  );
}
