import axios from "axios";

export const handleApiError = (err: unknown) => {
  if (axios.isAxiosError(err)) {
    return err.response?.data?.message || err.message;
  }
  return "Something went wrong";
};
