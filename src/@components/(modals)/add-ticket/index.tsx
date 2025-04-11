import { ReactIcons } from "@/utils/icons";
import { useModal } from "@/providers/app/ModalProvider";
import { useEffect, useState } from "react";
import { useEventProvider } from "@/providers/features/EventProvider";
import { AuSoftUI } from "@/@components/(ausoft)";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { internalApi, langByCookies } from "@/http/axios/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEventTicketProvider } from "@/providers/features/EventTicketProvider";
import { useAppProvider } from "@/providers/app/AppProvider";

import AAuSoftLogo from "@/@components/(ausoft)/AAuSoftLogo";
import BaseModal from "../base";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import TicketSchemas from "@/services/schemas/TicketSchema";
import CAxiosErrorToastify from "@/http/errors/CAxiosErrorToastify";
import ARegisterProgress from "@/@components/(ausoft)/ARegisterProgress";

export default function AddTicketModal() {
  // Contexts
  const { handleFetchEvent, handleSelectEvent, selectedEvent } =
    useEventProvider();
  const { selectedEventTicket } = useEventTicketProvider();
  const { handleOpenModal, handleAddTextOnBoxSuccess } = useModal();
  const { handleAddToastOnArray } = useAppProvider();

  // Controls
  const [ticketStatus, setTicketStatius] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const schema = new TicketSchemas(langByCookies);
  type formData = z.infer<typeof schema.ticketSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    resolver: zodResolver(schema.ticketSchema),
    defaultValues: selectedEventTicket
      ? {
          amount: selectedEventTicket.amount,
          description: selectedEventTicket.description,
          name: selectedEventTicket.name,
        }
      : {
          amount: 0,
          description: "",
          name: "",
        },
  });

  async function handleRegister(data: formData) {
    try {
      if (ticketStatus == "") {
        return AuSoftUI.Component.ToastifyWithTranslation({
          description_en: "Please, select a status",
          description_pt: "Por favor, selecione um estado",
          title_en: "No Status",
          title_pt: "Sem Estado",
          toast: handleAddToastOnArray,
          type: "error",
        });
      }

      setIsSubmitting(true);

      if (selectedEventTicket) {
        await internalApi.put("/events/tickets", {
          id: selectedEventTicket.id,
          name: selectedEventTicket.name,
          description: selectedEventTicket.description,
          amount: selectedEventTicket.amount,
          status: ticketStatus,
          event_id: selectedEvent?.id,
        });
      } else {
        await internalApi.post("/events/tickets", {
          name: data.name,
          description: data.description,
          amount: data.amount,
          status: ticketStatus,
          event_id: selectedEvent?.id,
        });
      }

      handleAddTextOnBoxSuccess({
        text_en:
          "Many congratulations! Your ticket has been registered successfully",
        text_pt: "Muitos parabéns! O seu ingresso foi cadastrado com sucesso",
        title_en: "Ticket added successfully",
        title_pt: "Ingresso adicionado com sucesso",
      });

      handleOpenModal("box-success");
      setIsSubmitting(false);
      handleFetchEvent(true);
    } catch (err) {
      setIsSubmitting(false);
      return CAxiosErrorToastify({ err, openToast: handleAddToastOnArray });
    }
  }

  function handleClose() {
    handleOpenModal("");
    handleFetchEvent(false);
    handleSelectEvent(undefined);
  }

  useEffect(() => {
    if (selectedEventTicket) {
      setTicketStatius(selectedEventTicket.status);
    }
  }, [selectedEventTicket]);

  return (
    <BaseModal callbackClose={handleClose} customDesktop="p-2">
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="flex flex-col md:w-[50vw] w-[90vw] relative pb-2 justify-between"
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-300 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <AAuSoftLogo size={40} />
            <h3 className="text-base font-bold dark:text-white">
              {!selectedEventTicket && (
                <CTranslateTo eng="New Ticket" pt="Novo Ingresso" />
              )}
              {selectedEventTicket && (
                <CTranslateTo eng="Edit Ticket" pt="Editar Ingresso" />
              )}
            </h3>
          </div>
          <button
            onClick={() => handleOpenModal("")}
            className="dark:text-white"
          >
            <ReactIcons.BiIcon.BiX size={20} />
          </button>
        </div>
        <div className="p-5 flex flex-col gap-4 h-[60vh] overflow-y-auto">
          <div className="flex flex-col gap-2">
            <h3 className="dark:text-white">
              <CTranslateTo eng="Name" pt="Nome" />
            </h3>
            <AuSoftUI.UI.TextField.Default
              weight={"md"}
              {...register("name")}
              requiredField={errors.name?.message ? true : false}
              className="w-full"
              placeholder="Ex: 2ª Edição - Festival Infatil"
            />
            {errors.name?.message && (
              <AuSoftUI.Component.RequiredTextField
                text={errors.name.message!}
                color="red"
              />
            )}
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <div className="flex flex-col gap-2">
              <h3 className="dark:text-white">
                <CTranslateTo eng="Amount" pt="Montante (Kz)" />
              </h3>
              <AuSoftUI.UI.TextField.Default
                {...register("amount", { valueAsNumber: true })}
                requiredField={errors.amount?.message ? true : false}
                weight={"md"}
                className="w-full"
                placeholder="Ex: 2ª Edição - Festival Infatil"
              />
              {errors.amount?.message && (
                <AuSoftUI.Component.RequiredTextField
                  text={errors.amount.message!}
                  color="red"
                />
              )}
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-base dark:text-white">
                <CTranslateTo eng="Status" pt="Estado" />
              </h1>
              <AuSoftUI.UI.Select
                value={ticketStatus}
                onChange={(e) => {
                  setTicketStatius(e.target.value);
                }}
                className="w-full"
                weight={"md"}
              >
                <option
                  value={""}
                  className="dark:bg-ausoft-slate-950 dark:text-white"
                >
                  <CTranslateTo
                    eng="--------- Select Status -------"
                    pt="-------- Selecione um estado ------"
                  />
                </option>

                <option
                  value={"available"}
                  className="dark:bg-ausoft-slate-950 dark:text-white"
                >
                  <CTranslateTo eng="Available" pt="Disponível" />
                </option>
                <option
                  value={"unavailable"}
                  className="dark:bg-ausoft-slate-950 dark:text-white"
                >
                  <CTranslateTo eng="Unavailable" pt="Indisponível" />
                </option>
              </AuSoftUI.UI.Select>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="dark:text-white">
              <CTranslateTo eng="Description" pt="Descrição" />
            </h3>
            <AuSoftUI.UI.TextField.TextArea
              weight={"md"}
              {...register("description")}
              requiredField={errors.description?.message ? true : false}
              className="w-full h-[40vh]"
              placeholder={
                langByCookies == "en"
                  ? "Write something about this ticket"
                  : "Escreva alguma coisa sobre este ingresso"
              }
            />
            {errors.description?.message && (
              <AuSoftUI.Component.RequiredTextField
                text={errors.description.message!}
                color="red"
              />
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 md:px-5 px-5 py-4 border-t border-slate-300 dark:border-slate-800 ">
          <AuSoftUI.UI.Button
            onClick={handleClose}
            type="button"
            size={"md"}
            variant={"outline"}
          >
            <CTranslateTo eng="Cancel" pt="Cancelar" />
          </AuSoftUI.UI.Button>
          <AuSoftUI.UI.Button type="submit" size={"md"} variant={"primary"}>
            {!isSubmitting && !selectedEventTicket && (
              <CTranslateTo eng="Add Ticket" pt="Adicionar Ingresso" />
            )}

            {!isSubmitting && selectedEventTicket && (
              <CTranslateTo eng="Save Changes" pt="Salvar Alterações" />
            )}

            <AuSoftUI.Component.isFormSubmitting isSubmitting={isSubmitting} />
          </AuSoftUI.UI.Button>
        </div>

        <ARegisterProgress isOpened={isSubmitting} rounded="all" />
      </form>
    </BaseModal>
  );
}
