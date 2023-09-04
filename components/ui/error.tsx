import React from "react";

type ErrorMessageProps = {
  message?: string;
};

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <>
      <h1 className="text-3xl font-bold text-primary">Oops...</h1>
      <p className="mt-3 text-base text-primary">
        {message || "Something went wrong. Please, reload and try again."}
      </p>
    </>
  );
};

export default ErrorMessage;
