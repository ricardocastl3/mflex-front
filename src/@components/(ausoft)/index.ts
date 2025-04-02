import { Button } from "../ui/Button";
import { TextField } from "../ui/TextField";
import { Select } from "../ui/Select";

import AAuSoftLogo from "./AAuSoftLogo";
import AAvatar from "./AAvatar";
import AButtonTab from "./AButttonTab";
import ADropdownBase from "./ADropdownBase";
import ARequiredTextfield from "./ARequiredTextfield";
import ASeparator from "./ASeparator";
import AStep from "./AStep";
import AToggle from "./AToggle";

import COpenToastyWithTranslation from "../(tips)/CToastify/COpenToastyWithTranslation";
import CToastify from "../(tips)/CToastify/CToastify";
import CToolTip from "../(tips)/CTooltip";

import ModalOpenProvider from "../(modals)";
import AClipboard from "./AClipboard";
import CToaster from "../(tips)/CToastify/CToaster";
import AIsSubmitting from "./AIsSubmitting";
import AListEmpty from "./AListEmpty";
import ALoadingList from "./ALoadingList";
import Onboarding from "../(modals)/onboarding";
import AAnimated from "./AAnimated";
import ARegisterProgress from "./ARegisterProgress";
import AQRCode from "./AQRCode";

export const AuSoftUI = {
  Component: {
    RegisterProgress: ARegisterProgress,
    Avatar: AAvatar,
    QRcode: AQRCode,
    Animated: AAnimated,
    ButtonTab: AButtonTab,
    Dropdown: ADropdownBase,
    RequiredTextField: ARequiredTextfield,
    Step: AStep,
    Toggle: AToggle,
    Separator: ASeparator,
    AuSoftLogo: AAuSoftLogo,
    Clipboard: AClipboard,
    ToolTip: CToolTip,
    Toaster: CToaster,
    Toastify: CToastify,
    ToastifyWithTranslation: COpenToastyWithTranslation,
    isFormSubmitting: AIsSubmitting,
    ListEmpty: AListEmpty,
    LoadingList: ALoadingList,
  },
  Modal: {
    Onboarding,
    ModalOpenProvider,
  },
  UI: {
    Button,
    TextField,
    Select,
  },
};
