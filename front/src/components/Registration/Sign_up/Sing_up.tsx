import { useNavigate } from "react-router-dom";
import { useState, useReducer } from "react";

import { v4 as uuidv4 } from "uuid";

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
import { ErrorHandler } from "../../../utils/errorHandler";
import { CheckAllValidity } from "../../../utils/checkAllValidity";
//

import axios from "axios";
axios.defaults.withCredentials = true;

export default function SignUp() {
  const navigate = useNavigate();
  const [seePassword, setSeePassword] = useState<boolean>(false);
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

  async function SignUpNewUser() {
    if (
      !FlashEmptyFields(
        setFormValidityData,
        Object.values(formData),
        Object.keys(WhatToValidaty)
      ) &&
      CheckAllValidity(Object.values(formValidityData))
    ) {
      try {
        const unique_key = uuidv4();

        await axios.post("http://localhost:2000/sign_up", {
          name: formData.first_name,
          surname: formData.last_name,
          email: formData.email,
          password: formData.password,
          city: "",
          address: "",
          birthday: "",
          gender: "none",
          photo_link:
            "https://s3-alpha-sig.figma.com/img/f60f/b0cb/53ece4752b8eb610fb19de0636019a84?Expires=1701648000&Signature=GVg5~La2biwdNlY56SQY8lLZWOPTm-ltVsz5v2fmuerETEbbZTiS~3dDclAcg5~5mcLWhiekXDL3xM5wFbBzejuawQFts35IM3yGE~vyWI2ZQeHBG5w1SmJrNDOXmSIj38Nzq4YwT8-GTKv5gbqfFgC~Hj5PEnfNYOY4vD2JJeBL0PjfwCd4V-9V20j-oJUVq1T0cfTxt-AQeD-WYX104UsaGuaC8HXfU5RfyRRSARUQG0~6juWqXJRBUywXb5xd92bjwVWa0Jh52b8f-69CV01d6RAoYkUijrQgsB-F4gkS9SD9yXOQE~npj5tZVVDPFD1oQjkWN~RFFmvYKCjUVg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
          facebook_link: "",
          twitter_link: "",
          unique_key: unique_key,
          role: false
        });

        navigate("/");
      } catch (error: any) {
        console.log(ErrorHandler(error.message));
      }
    }
  }

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="flex flex-col py-7">
        <Header
          title="Have an account?"
          link="registration"
          link_text="Log in"
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
              title="First Name"
              onChange={(e) =>
                setFormData({
                  type: WhatToForm.NAME,
                  payload: e.target.value
                })
              }
              text_value={formData.first_name}
              placeholder={"Delowar"}
              type={"text"}
              icon="User"
              error_status={formValidityData.nameError}
              error_text="Empty field!"
              onBlur={(e) => {
                setFormValidityData({
                  payload: {
                    key: "VALIDATE_NAME",
                    text: e.target.value
                  }
                });
              }}
            />

            <LoggingInput
              title="Last Name"
              onChange={(e) =>
                setFormData({
                  type: WhatToForm.SURNAME,
                  payload: e.target.value
                })
              }
              text_value={formData.last_name}
              placeholder={"Hossen"}
              type={"text"}
              icon="User"
              error_status={formValidityData.surnameError}
              error_text="Empty field!"
              onBlur={(e) => {
                setFormValidityData({
                  payload: {
                    key: "VALIDATE_SURNAME",
                    text: e.target.value
                  }
                });
              }}
            />

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
              error_text="Incorrect email address!"
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

        <Underneath button_text="Sign up" onClick={() => SignUpNewUser()} />
      </div>
    </div>
  );
}
