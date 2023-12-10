import { useState, useReducer } from "react";

import { useNavigate } from "react-router-dom";

import axios, { AxiosError } from "axios";

// components
import Header from "../util_components/Header";
import LoggingInput from "../../../util_components/LoggingInput";
import Underneath from "../util_components/Underneath";
//

// utils
import { formReducer, WhatToForm } from "../utils/formReducer";
import {
  formValidityReducer,
  WhatToValidaty
} from "../utils/formValidityReducer";
import { FlashEmptyFields } from "../../../utils/flashEmptyFields";
import { CheckAllValidity } from "../../../utils/checkAllValidity";
import { ErrorHandler } from "../../../utils/errorHandler";
//

export default function LogIn() {
  const navigate = useNavigate();
  const [seePassword, setSeePassword] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<any>(null);
  const [formData, setFormData] = useReducer(formReducer, {
    first_name: "",
    last_name: "",
    email: "",
    password: ""
  });
  const [formValidityData, setFormValidityData] = useReducer(
    formValidityReducer,
    {
      nameError: false,
      surnameError: false,
      emailError: false,
      passwordError: false
    }
  );

  async function LogIn() {
    if (
      !FlashEmptyFields(
        setFormValidityData,
        [formData.email, formData.password],
        [WhatToValidaty.VALIDATE_EMAIL, WhatToValidaty.VALIDATE_PASSWORD]
      ) &&
      CheckAllValidity(Object.values(formValidityData))
    ) {
      try {
        await axios.post("http://localhost:2000/log_in", {
          email: formData.email,
          password: formData.password
        });

        navigate("/");
      } catch (error: any) {
        if (ErrorHandler(error).response) {
          setErrorText(ErrorHandler(error).response?.data);
        } else {
          const axiosError = error as AxiosError;
          setErrorText(axiosError.message);
        }

        setTimeout(() => {
          setErrorText(null);
        }, 2000);
      }
    }
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col">
        <Header
          title="Don’t have an account?"
          link="sign_up"
          link_text="Sign up"
        />

        <div className="flex gap-4 my-10">
          <div className="flex relative items-center flex-1">
            <div className="border-b-2 w-full absolute" />
          </div>
          <div className="text-lg text-gray-400">or</div>
          <div className="flex relative items-center flex-1">
            <div className="border-b-2 w-full absolute" />
          </div>
        </div>

        <div className="flex flex-col p-5 bg-white rounded-lg">
          <form className="flex flex-col gap-5">
            <LoggingInput
              title="Email"
              onChange={(e) =>
                setFormData({
                  type: WhatToForm.EMAIL,
                  payload: e.target.value
                })
              }
              text_value={formData.email}
              placeholder={"Enter email"}
              type={"text"}
              icon="Mails"
              error_status={formValidityData.emailError}
              error_text="Incorrect email address"
              onBlur={(e) => {
                setFormValidityData({
                  payload: {
                    key: "VALIDATE_EMAIL",
                    text: e.target.value
                  }
                });
              }}
            />

            <LoggingInput
              title="Password"
              onChange={(e) =>
                setFormData({
                  type: WhatToForm.PASSWORD,
                  payload: e.target.value
                })
              }
              text_value={formData.password}
              placeholder={"Enter password"}
              type={seePassword ? "text" : "password"}
              icon="KeyRound"
              error_status={formValidityData.passwordError}
              error_text="Password length must be at least 9 letters!"
              see_password={seePassword ? "EyeOff" : "Eye"}
              setSeePassword={setSeePassword}
              seePassword={seePassword}
              onBlur={(e) => {
                setFormValidityData({
                  payload: {
                    key: "VALIDATE_PASSWORD",
                    text: e.target.value
                  }
                });
              }}
            />
          </form>
        </div>

        {errorText && (
          <div className="mt-3 text-red-600 font-bold">{errorText}</div>
        )}
        <Underneath button_text="Log in" onClick={LogIn} />
      </div>
    </div>
  );
}
