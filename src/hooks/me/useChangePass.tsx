import {useIonAlert, useIonRouter} from "@ionic/react";
import {object, ref, string} from "yup";
import {SubmitErrorHandler, SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useState} from "react";
import {ChangePassInputs} from "../../types/me";
import {client} from "../../client";
import useChangePassModal from "./useChangePassModal";

export default function useChangePass() {
  const [show] = useIonAlert();
  const rt = useIonRouter()
  const formSchema = object().shape({
    newPass: string().required().label("New Password"),
    confirmPass: string().required().label("Confirm Password").oneOf([ref("newPass")], "Passwords must match")
  })

  const form = useForm({
    resolver: yupResolver(formSchema)
  });

  const [processing, setProcessing] = useState(false);

  const { toggleShowChangePass } = useChangePassModal();

  const handleChangePass: SubmitHandler<ChangePassInputs> = async (data) => {
    console.log("handleChangePass is called");
    console.log(data);

    setProcessing(true);

    // change password
    const setPassRes = await client.auth.updateUser({
      password: data.newPass
    })

    // if error, show error
    if (setPassRes.error) {
      console.log(setPassRes.error);
      setProcessing(false);
      await show({
        header: "Error",
        message: setPassRes.error.message,
        buttons: ["OK"]
      })

      // set processing to false
      setProcessing(false);

      return;
    }

    // if success, page is automatically redirected to home page
    setProcessing(false);

    // show an alert which has an ok button that triggers a page reload
    await show({
      header: "Success",
      message: "Password changed successfully!",
      buttons: [{
        text: "OK",
        handler: () => {
          location.reload();
        }
      }]
    })
  }

  const handleError: SubmitErrorHandler<ChangePassInputs> = async (data) => {
    console.log("handleError is called");
    console.log(data);

    // set processing to false
    setProcessing(false);

    // if (data.oldPass) {
    //   await show({
    //     header: "Error",
    //     message: data.oldPass.message,
    //     buttons: ["OK"]
    //   })
    //   return;
    // }

    if (data.newPass) {
      await show({
        header: "Error",
        message: data.newPass.message,
        buttons: ["OK"]
      })

      return;
    }

    if (data.confirmPass) {
      await show({
        header: "Error",
        message: data.confirmPass.message,
        buttons: ["OK"]
      })
      return;
    }
  }

  return {
    ...form,
    handleChangePass,
    handleError,
    processing,
  }
}