import { Button, Card } from "@heroui/react";
import { NavLink } from "react-router";
import { Input, InputPassword, Seo } from "../component";
import { Form, Formik, type FormikProps } from "formik";

interface LoginFormValues {
  email: string;
  password: string;
}

export default function Login() {
  return (
    <div className="flex items-center justify-center w-full">
      <Seo
        title="Login"
        description="Login screen to access video and image converter"
      />
      <Card>
        <Card.Header>
          <Card.Title className="font-bold text-2xl">Login</Card.Title>
          <Card.Description>
            Enter your credentials to access your account
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={(values, actions) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                actions.setSubmitting(false);
              }, 1000);
            }}
          >
            {(props: FormikProps<LoginFormValues>) => (
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

                <InputPassword
                  name="password"
                  label={{
                    children: "Password",
                  }}
                  input={{
                    placeholder: "Password",
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
          <NavLink to="/sign-up" className="font-bold">
            Sign Up
          </NavLink>
        </Card.Footer>
      </Card>
    </div>
  );
}
