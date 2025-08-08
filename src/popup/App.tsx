import { useRouter } from "@/modules/router";

export default function App() {
  const { currentView } = useRouter();

  return <div>{currentView}</div>;
}
