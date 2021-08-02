import * as React from "react";
import { useAlert } from "react-alert";
import { StringParam, useQueryParams } from "use-query-params";
import { BASE_URL } from "@temp/core/config";
import { RouteComponentProps } from "react-router";
import { useAccountConfirm } from "@temp/@sdk/react";

export const AccountConfirm: React.FC<RouteComponentProps> = ({ history }) => {
  const [query] = useQueryParams({
    email: StringParam,
    token: StringParam,
  });

  const alert = useAlert();

  const [accountConfirm] = useAccountConfirm();

  const displayConfirmationAlert = anyErrors => {
    alert.show(
      {
        content:
          anyErrors.length > 0
            ? anyErrors.map(error => error.message).join(" ")
            : "You can now log in",
        title: anyErrors.length > 0 ? "Error" : "Account confirmed",
      },
      { type: anyErrors.length > 0 ? "error" : "success", timeout: 5000 }
    );
  };

  const handleAccountConfirm = async() => {

    const { data, error} = await accountConfirm({ email: query.email, token: query.token });
    if (data?.confirmAccount?.accountErrors) {      
      const possibleErrors = data.confirmAccount.accountErrors;
      displayConfirmationAlert(possibleErrors);
    } else if (error) {

      const errors = [
        {
          message: "Something went wrong while activating your account.",
        },
      ];
      displayConfirmationAlert(errors);
    }
    history.push(BASE_URL);
    
  }


  React.useEffect(() => {
    handleAccountConfirm();

  }, []);


  return (
    <div></div>
  );
};

export default AccountConfirm;
