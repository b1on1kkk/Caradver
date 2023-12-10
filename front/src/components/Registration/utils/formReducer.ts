export enum WhatToForm {
  EMAIL = "EMAIL",
  PASSWORD = "PASSWORD",
  NAME = "NAME",
  SURNAME = "SURNAME"
}

interface formAction {
  type: WhatToForm;
  payload: string;
}

interface formState {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export function formReducer(state: formState, action: formAction) {
  const { type, payload } = action;

  switch (type) {
    case WhatToForm.EMAIL:
      return {
        ...state,
        email: payload
      };
    case WhatToForm.PASSWORD:
      return {
        ...state,
        password: payload
      };
    case WhatToForm.NAME:
      return {
        ...state,
        first_name: payload
      };
    case WhatToForm.SURNAME:
      return {
        ...state,
        last_name: payload
      };
    default:
      return state;
  }
}
