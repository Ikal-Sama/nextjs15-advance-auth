"use client";

import { useState } from "react";

import { useCallback, useEffect } from "react";
import { CardWrapper } from "./card-wrapper";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";

import { newVerification } from "@/actions/new-verification";

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Missing token!");
      return;
    }
    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, []);

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonHref="/auth/login"
      backButtonLabel="Go back to login"
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && <BeatLoader />}

        {success && <FormSuccess message={success} />}

        {error && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};
