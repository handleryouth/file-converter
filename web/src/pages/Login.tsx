import { Button, Card } from "@heroui/react";
import { NavLink } from "react-router";
import { Input, InputPassword, LottiePlayer, Seo } from "../component";
import { Form, Formik, type FormikProps } from "formik";
import { useTranslation } from "../translations";

interface LoginFormValues {
  email: string;
  password: string;
}

export default function Login() {
  const { translate } = useTranslation();

  return (
    <div className="flex items-center justify-center w-full gap-4">
      <Seo
        title="Login"
        description="Login screen to access video and image converter"
      />
      <Card className="w-100 p-8">
        <Card.Header>
          <Card.Title className="font-bold text-2xl">
            {translate("common.login")}
          </Card.Title>
          <Card.Description>
            {translate("input.putCredentials")}
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
        <Card.Footer className="flex items-center justify-between">
          <NavLink to="/sign-up" className="text-sm text-gray-500">
            {translate("common.signUp")}
          </NavLink>

          <NavLink to="/forgot-password" className="text-sm text-gray-500">
            {translate("common.forgotPassword")}
          </NavLink>
        </Card.Footer>
      </Card>

      <LottiePlayer
        animation="mobileVideo"
        playerOptions={{
          className: "w-96",
        }}
      />
    </div>
  );
}
