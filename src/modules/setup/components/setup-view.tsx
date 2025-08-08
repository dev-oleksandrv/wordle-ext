import { Logo } from "@/core/components/logo";
import { LocaleEnum, useIntl, useTranslations } from "@/modules/intl";
import { RouterViewEnum, useRouter } from "@/modules/router";
import { SETUP_LOCALE_BUTTON_CONFIG_LIST } from "@/modules/setup/constants";
import { SetupLocaleButton } from "@/modules/setup/components/setup-locale-button";
import { CheckIcon } from "lucide-react";

export function SetupView() {
  const t = useTranslations();
  const { setCurrentView } = useRouter();
  const { locale, setLocale } = useIntl();

  const handleLocaleSelect = (selectedLocale: LocaleEnum) => void setLocale(selectedLocale);

  const handleSubmit = () => void setCurrentView(RouterViewEnum.GAME);

  return (
    <div className="flex flex-col size-full p-4">
      <div className="flex-none h-8 flex flex-row items-center">
        <Logo />
      </div>

      <div className="flex flex-col flex-1 gap-4 justify-center w-full">
        <p className="text-lg font-bold">{t("setup.title")}</p>

        <div className="flex flex-col gap-2">
          {SETUP_LOCALE_BUTTON_CONFIG_LIST.map((btnCfg) => (
            <SetupLocaleButton
              key={btnCfg.locale}
              isSelected={btnCfg.locale === locale}
              config={btnCfg}
              onSelect={handleLocaleSelect}
            />
          ))}
        </div>

        <button
          className="flex flex-row justify-center items-center text-white gap-2 rounded-lg shadow-md shadow-black/10 px-4 py-3 cursor-pointer box-content bg-emerald-500 hover:bg-emerald-600"
          onClick={handleSubmit}
        >
          {t("setup.save-changes")} <CheckIcon className="size-4 leading-none" />
        </button>
      </div>

      <div className="flex-none">
        <p className="text-gray-500">{t("setup.description")}</p>
      </div>
    </div>
  );
}
