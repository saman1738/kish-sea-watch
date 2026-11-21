import { I18nProvider } from "@/lib/i18n";
import { router } from "@/router";
import { RouterProvider } from "@tanstack/react-router";

export default function App() {
  return (
    <I18nProvider>
      <RouterProvider router={router} />
    </I18nProvider>
  );
}
