import AAuSoftLogo from "@/@components/(ausoft)/AAuSoftLogo";
import BaseModal from "../base";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import EventSchemas from "@/services/schemas/EventSchema";
import SelectCategoryDropdown from "./category";
import CAxiosErrorToastify from "@/http/errors/CAxiosErrorToastify";
import ARegisterProgress from "@/@components/(ausoft)/ARegisterProgress";

import { ReactIcons } from "@/utils/icons";
import { useModal } from "@/providers/app/ModalProvider";
import { AuSoftUI } from "@/@components/(ausoft)";
import { internalApi, langByCookies } from "@/http/axios/api";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { provinces } from "./datas";
import { useEventProvider } from "@/providers/features/EventProvider";
import { localImages } from "@/utils/images";
import { useCategoryProvider } from "@/providers/features/CategoryProvider";
import { useAppProvider } from "@/providers/app/AppProvider";

export default function AddEventModal() {
  // Contexts
  const { selectedEvent, handleFetchEvent } = useEventProvider();
  const { handleAddToastOnArray } = useAppProvider();
  const { selectedCategory, handleSelectCategory } = useCategoryProvider();
  const { handleOpenModal, handleAddTextOnBoxSuccess } = useModal();

  // Controls
  const [ticketImageUrl, setTicketImageUrl] = useState("");
  const [mainAddress, setMainAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Forms
  const schema = new EventSchemas(langByCookies);
  type formData = z.infer<typeof schema.eventSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    resolver: zodResolver(schema.eventSchema),
    defaultValues: selectedEvent
      ? {
          description: selectedEvent.description,
          map_location: selectedEvent.map_location,
          reference_address: selectedEvent.reference_address,
          start_at: new Date(selectedEvent.start_at),
          title: selectedEvent.title,
        }
      : {
          description: "",
          map_location: "",
          reference_address: "",
          title: "",
        },
  });

  async function handleRegister(data: formData) {
    try {
      if (!selectedCategory) {
        return AuSoftUI.Component.ToastifyWithTranslation({
          description_en: "Please, select an category",
          description_pt: "Por favor, selecione uma categoria",
          title_en: "No Category",
          title_pt: "Sem categoria",
          toast: handleAddToastOnArray,
          type: "error",
        });
      }

      if (mainAddress == "") {
        return AuSoftUI.Component.ToastifyWithTranslation({
          description_en: "Please, select an province",
          description_pt: "Por favor, selecione uma província",
          title_en: "No Province",
          title_pt: "Sem Província",
          toast: handleAddToastOnArray,
          type: "error",
        });
      }

      if (!selectedEvent && ticketImageUrl == "") {
        return AuSoftUI.Component.ToastifyWithTranslation({
          description_en: "Please, select an event image",
          description_pt: "Por favor, selecione uma imagem para o evento",
          title_en: "No Image",
          title_pt: "Sem Imagem",
          toast: handleAddToastOnArray,
          type: "error",
        });
      }

      setIsSubmitting(true);
      const formData = new FormData();

      if (ticketImageUrl != "") {
        const res = await fetch(ticketImageUrl);
        const blob = await res.blob();
        formData.append("event_image", blob);
      }

      if (selectedEvent) {
        formData.append("event_id", selectedEvent?.id);
      }

      formData.append("category_id", selectedCategory.id);
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("reference_address", data.reference_address);
      formData.append("main_address", mainAddress);
      formData.append("map_location", data.map_location);
      formData.append("start_at", data.start_at.toISOString());

      await internalApi.postForm("/events", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      handleAddTextOnBoxSuccess({
        text_en:
          "Many congratulations! Your event has been registered successfully",
        text_pt: "Muitos parabéns! O seu evento foi cadastrado com sucesso",
        title_en: "Event added successfully",
        title_pt: "Evento adicionado com sucesso",
      });

      handleOpenModal("box-success");

      handleFetchEvent(true);
      setIsSubmitting(false);
    } catch (err) {
      setIsSubmitting(false);
      return CAxiosErrorToastify({ err, openToast: handleAddToastOnArray });
    }
  }

  function handleClose() {
    handleOpenModal("");
    handleSelectCategory(undefined);
  }

  useEffect(() => {
    if (!selectedEvent) return;
    setMainAddress(selectedEvent.main_address);
    handleSelectCategory(selectedEvent.category);
  }, [selectedEvent]);

  const cataloguePreview = localImages.vectors.imageEmpty.src;

  return (
    <BaseModal callbackClose={handleClose} customDesktop="p-4 p-4">
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="flex flex-col md:w-[60vw] w-[90vw] relative"
      >
        <div className="flex items-center justify-between p-5 border-b border-slate-300 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <AAuSoftLogo size={40} />
            <h3 className="text-base font-bold dark:text-white">
              <CTranslateTo eng="New Event" pt="Novo Evento" />
            </h3>
          </div>
          <button onClick={handleClose} className="dark:text-white">
            <ReactIcons.BiIcon.BiX size={20} />
          </button>
        </div>
        <div className="p-5 flex flex-col gap-4 h-[60vh] overflow-y-auto">
          <div className="flex flex-col gap-4 items-center justify-center">
            <div className="rounded-xl w-fit">
              <div
                style={{
                  height: "150px",
                  width: "200px",
                  objectFit: "fill",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "contain",
                  backgroundImage: `url(${
                    ticketImageUrl != ""
                      ? ticketImageUrl
                      : selectedEvent && selectedEvent.image_url != ""
                      ? selectedEvent.image_url
                      : cataloguePreview
                  })`,
                }}
                className="rounded-xl bg-slate-200 dark:bg-slate-700/50"
              ></div>
            </div>
            <div className="relative cursor-pointer">
              <input
                name="avatar"
                className="absolute top-0 right-0 file:border-transparent cursor-pointer left-0 file:bg-transparent file:text-transparent"
                type="file"
                onChange={(e) => {
                  if (e.target.files?.length! > 0) {
                    if (e.target?.files) {
                      const file = e.target?.files[0];
                      if (file && file.type.startsWith("image/")) {
                        const url = URL.createObjectURL(file);
                        setTicketImageUrl(url);
                      }
                    }
                  }
                }}
              />
              <AuSoftUI.UI.Button
                type="button"
                variant={"primary"}
                className="rounded-full pt-1.5 pb-2 cursor-pointer px-2 z-20"
              >
                <ReactIcons.AiICon.AiFillEdit size={20} />
              </AuSoftUI.UI.Button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-base dark:text-white">
              <CTranslateTo eng="Event name" pt="Nome do evento" />
            </h1>
            <AuSoftUI.UI.TextField.Default
              requiredField={errors.title?.message ? true : false}
              {...register("title")}
              placeholder={`${
                langByCookies == "pt"
                  ? "2º Edição - Festa dos pequeninos"
                  : "2nd Edition - Children's Party"
              }`}
              className="w-full"
              weight={"md"}
            />
            {errors.title?.message && (
              <AuSoftUI.Component.RequiredTextField
                text={errors.title.message}
                color="red"
              />
            )}
          </div>

          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-base dark:text-white">
                <CTranslateTo eng="Start At" pt="Horário do evento" />
              </h1>
              <AuSoftUI.UI.TextField.Default
                requiredField={errors.start_at?.message ? true : false}
                {...register("start_at", { valueAsDate: true })}
                type="datetime-local"
                className="w-full"
                weight={"md"}
              />
              {errors.start_at?.message && (
                <AuSoftUI.Component.RequiredTextField
                  text={errors.start_at.message}
                  color="red"
                />
              )}
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="text-base dark:text-white">
                <CTranslateTo eng="Province" pt="Província" />
              </h1>
              <AuSoftUI.UI.Select
                value={mainAddress}
                onChange={(e) => {
                  setMainAddress(e.target.value);
                }}
                className="w-full"
                weight={"md"}
              >
                <option
                  value={""}
                  className="dark:bg-ausoft-slate-950 dark:text-white"
                >
                  <CTranslateTo
                    eng="--------- Select Province -------"
                    pt="-------- Selecione a província ------"
                  />
                </option>
                {provinces.map((_, i) => {
                  return (
                    <option
                      key={i}
                      value={_.title}
                      className="dark:bg-ausoft-slate-950 dark:text-white"
                    >
                      {_.title}
                    </option>
                  );
                })}
              </AuSoftUI.UI.Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-base dark:text-white">
                <CTranslateTo eng="Category" pt="Categoria" />
              </h1>
              <SelectCategoryDropdown />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-base dark:text-white">
                <CTranslateTo eng="Event Address" pt="Endereço do evento" />
              </h1>
              <AuSoftUI.UI.TextField.Default
                requiredField={errors.reference_address?.message ? true : false}
                {...register("reference_address")}
                placeholder={`${
                  langByCookies == "pt"
                    ? "Ex: Mediatecade de Luanda"
                    : "Ex: Mediatecade of Luanda"
                }`}
                className="w-full"
                weight={"md"}
              />
              {errors.reference_address?.message && (
                <AuSoftUI.Component.RequiredTextField
                  text={errors.reference_address.message}
                  color="red"
                />
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-base dark:text-white">
              <CTranslateTo eng="Map Location" pt="Localização no Mapa" />
            </h1>
            <AuSoftUI.UI.TextField.Default
              requiredField={errors.map_location?.message ? true : false}
              {...register("map_location")}
              placeholder={`${
                langByCookies == "pt"
                  ? "Ex: FGW9+48D, Luanda"
                  : "Ex: FGW9+48D, Luanda"
              }`}
              className="w-full"
              weight={"md"}
            />
            {errors.map_location?.message && (
              <AuSoftUI.Component.RequiredTextField
                text={errors.map_location.message}
                color="red"
              />
            )}
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-base dark:text-white">
              <CTranslateTo eng="Description" pt="Descrição" />
            </h1>
            <AuSoftUI.UI.TextField.TextArea
              requiredField={errors.description?.message ? true : false}
              {...register("description")}
              placeholder={`${
                langByCookies == "pt"
                  ? "Este evento é para você amante dos seus filhos..."
                  : "This event is for you lovers of your children..."
              }`}
              className="w-full h-[40vh]"
              weight={"md"}
            />
            {errors.description?.message && (
              <AuSoftUI.Component.RequiredTextField
                text={errors.description.message}
                color="red"
              />
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 border-t border-slate-300 dark:border-slate-800 px-5 pt-4 pb-5">
          <AuSoftUI.UI.Button
            type="button"
            onClick={handleClose}
            variant={"outline"}
            size={"md"}
          >
            <CTranslateTo eng="Cancel" pt="Cancelar" />
          </AuSoftUI.UI.Button>
          <AuSoftUI.UI.Button type="submit" variant={"primary"} size={"md"}>
            {selectedEvent && !isSubmitting && (
              <CTranslateTo eng="Save Changes" pt="Salvar alterações" />
            )}
            {!selectedEvent && !isSubmitting && (
              <CTranslateTo eng="Add new event" pt="Adicionar novo evento" />
            )}
            <AuSoftUI.Component.isFormSubmitting isSubmitting={isSubmitting} />
          </AuSoftUI.UI.Button>
        </div>
        <ARegisterProgress isOpened={isSubmitting} rounded="all" />
      </form>
    </BaseModal>
  );
}
