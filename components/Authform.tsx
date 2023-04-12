"use client";

import { register, signin } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import Button from "./Button";
import Card from "./Card";
import Input from "./Input";

type IContent = {
  linkUrl: string;
  linkText: string;
  header: string;
  subheader: string;
  buttonText: string;
};

export type IUser = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

type IProps = {
  mode: "register" | "signin";
};

const registerContent: IContent = {
  linkUrl: "/signin",
  linkText: "Already have an account?",
  header: "Create a new Account",
  subheader: "Complete mandatory fields",
  buttonText: "Register",
};

const signinContent: IContent = {
  linkUrl: "/register",
  linkText: "Don't have an account?",
  header: "Hello again",
  subheader: "Enter your credentials to login",
  buttonText: "Sign In",
};

const initialState: IUser = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
};

const AuthForm = ({ mode }: IProps) => {
  const [formState, setFormState] = useState<IUser>({
    ...initialState,
  });
  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (mode === "register") {
      await register(formState);
    } else {
      await signin(formState);
    }

    setFormState(initialState);
    router.replace("/home");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormState((s) => ({ ...s, [name]: value }));
  };

  const content = mode === "register" ? registerContent : signinContent;

  return (
    <Card>
      <div className="w-full">
        <div className="text-center">
          <h2 className="text-3xl mb-2">{content.header}</h2>
          <p className="tex-lg text-black/25">{content.subheader}</p>
        </div>
        <form onSubmit={handleSubmit} className="py-10 w-full">
          {mode === "register" && (
            <div className="flex mb-8 justify-between">
              <div className="pr-2">
                <div className="text-lg mb-4 ml-2 text-black/50">
                  First Name
                </div>
                <Input
                  required
                  placeholder="First Name"
                  name="firstName"
                  value={formState.firstName}
                  className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                  onChange={handleChange}
                />
              </div>
              <div className="pl-2">
                <div className="text-lg mb-4 ml-2 text-black/50">Last Name</div>
                <Input
                  required
                  placeholder="Last Name"
                  name="lastName"
                  value={formState.lastName}
                  className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                  onChange={handleChange}
                />
              </div>
            </div>
          )}
          <div className="mb-8">
            <div className="text-lg mb-4 ml-2 text-black/50">Email</div>
            <Input
              required
              type="email"
              placeholder="Email"
              name="email"
              value={formState.email}
              className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
              onChange={handleChange}
            />
          </div>
          <div className="mb-8">
            <div className="text-lg mb-4 ml-2 text-black/50">Password</div>
            <Input
              required
              value={formState.password}
              type="password"
              placeholder="Password"
              name="password"
              className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span>
                <Link
                  href={content.linkUrl}
                  className="text-blue-600 font-bold">
                  {content.linkText}
                </Link>
              </span>
            </div>
            <div>
              <Button type="submit" intent="secondary">
                {content.buttonText}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default AuthForm;
