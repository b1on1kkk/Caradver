import { AxiosError } from "axios";

export function ErrorHandler(err: AxiosError): AxiosError {
  return err;
}
