import { useRouter } from "@/modules/router";
import { useTranslations } from "@/modules/intl";

export default function App() {
  const { currentView } = useRouter();
  const t = useTranslations("setup");

  return (
    <div>
      {currentView} {t("title")}
    </div>
  );
}
