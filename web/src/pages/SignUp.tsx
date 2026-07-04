import { Button, Card } from "@heroui/react";
import { NavLink } from "react-router";
import { Input, LottiePlayer, Seo } from "../component";
import { Form, Formik, type FormikProps } from "formik";
import { useTranslation } from "../translations";

interface SignupFormValues {
  email: string;
}

export default function SignUp() {
  const { translate } = useTranslation();
  return (
    <div className="flex items-center justify-center w-full">
      <Seo title="Sign Up" description="Sign up to get an account" />
      <Card className="w-100 p-8">
        <Card.Header>
          <Card.Title className="font-bold text-2xl">
            {translate("common.signUp")}
          </Card.Title>
          <Card.Description>{translate("input.putEmail")}</Card.Description>
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
          <NavLink to="/login" className="text-sm text-gray-500">
            {translate("common.login")}
          </NavLink>
        </Card.Footer>
      </Card>

      <LottiePlayer
        animation="note"
        playerOptions={{
          className: "w-96",
        }}
      />
    </div>
  );
}
