import { AuSoftUI } from "@/@components/(ausoft)";
import { useModal } from "@/providers/app/ModalProvider";
import { useAuth } from "@/providers/auth/AuthProvider";
import {
  ResourceType,
  TSelectedResourceType,
  useResourceProvider,
} from "@/providers/features/ResourceProvider";
import { ReactIcons } from "@/utils/icons";

export default function ShareButtonResource({
  resource,
  type,
}: {
  resource: ResourceType;
  type: TSelectedResourceType;
}) {
  const { handleSelectResource, handleSelectResourceType } =
    useResourceProvider();
  const { handleOpenModal } = useModal();

  
  const { userLogged } = useAuth();
  if (!userLogged) return <></>;

  return (
    <AuSoftUI.UI.Button
      onClick={() => {
        handleSelectResourceType(type);
        handleSelectResource(resource);
        handleOpenModal("ct-share-post");
      }}
      className="items-center py-0.5 px-2.5"
      variant={"outline"}
      size={"sm"}
    >
      {resource?.shares.length}
      <ReactIcons.PiIcon.PiShareFatBold size={13} />
    </AuSoftUI.UI.Button>
  );
}
