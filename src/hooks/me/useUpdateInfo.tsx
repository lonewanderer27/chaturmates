import {useState} from "react";
import {SubmitErrorHandler, SubmitHandler, useForm} from "react-hook-form";
import {UpdateProfileInputs} from "../../types/me";
import useSelfStudent from "../student/useSelfStudent";
import {client} from "../../client";
import {useIonAlert} from "@ionic/react";
import {qClient} from "../../main";
import {useAtom} from "jotai";
import {editAtom} from "../../atoms/me";

export default function useUpdateInfo() {
  const [show] = useIonAlert();
  const [edit, setEdit] = useAtom(editAtom);
  const [saving, setSaving] = useState(() => false);
  const {student} = useSelfStudent();

  const form = useForm<UpdateProfileInputs>({
    defaultValues: {
      fullName: student?.full_name ?? undefined,
      description: student?.description ?? undefined,
      type: student?.type ?? undefined
    }
  });

  const handleSave: SubmitHandler<UpdateProfileInputs> = async (newData) => {
    console.log("handleSave");
    console.log(newData);

    // log saving and edit states
    console.log("saving", saving);
    console.log("edit", edit);

    setSaving(true);

    // update the student profile
    const {data, error} = await client.from("students").update({
      full_name: newData.fullName,
      type: newData.type,
      description: newData.description
    }).eq("id", student!.id).select("*").single();

    if (error) {
      console.log(error);
      setSaving(false);
      setEdit(false);

      await show({
        header: "Error",
        message: "Something went wrong while updating your profile. Please try again.",
        buttons: ["Ok"]
      })

      return
    }

    // log the new data
    console.log(data);

    // refresh the student and profile
    await qClient.invalidateQueries({
      queryKey: ["student, profile id:", student!.profile_id]
    })

    // set the edit to false
    setEdit(false);

    // set the saving to false
    setSaving(false);
  }

  const handleError: SubmitErrorHandler<UpdateProfileInputs> = async (data) => {
    console.log("handleError");
    console.log(data);

    // log saving and edit states
    console.log("saving", saving);
    console.log("edit", edit);

    setSaving(false);

    if (data.fullName) {
      await show({
        header: "Error",
        message: data.fullName.message,
        buttons: ["Ok"]
      })

      return;
    }

    if (data.description) {
      await show({
        header: "Error",
        message: data.description.message,
        buttons: ["Ok"]
      })

      return;
    }

    if (data.type) {
      await show({
        header: "Error",
        message: data.type.message,
        buttons: ["Ok"]
      })

      return;
    }
  }

  return {
    ...form,
    edit,
    setEdit,
    saving,
    handleError,
    handleSave
  }
}