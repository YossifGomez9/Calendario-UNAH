import { Button } from "@/components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import WelcomeModal from "./Modal";

export default function Header() {
  return (
    <>
    <WelcomeModal />

      <nav className="relative z-50 grid grid-cols-1 items-center gap-4 border-0 bg-[#183972] px-6 py-4 shadow-none outline-none sm:grid-cols-3"></nav>
      <nav className="relative z-50 grid grid-cols-1 items-center gap-4 border-0 bg-[#183972] px-6 py-4 shadow-none outline-none sm:grid-cols-3">
        <div className="flex justify-center sm:justify-start">
          <img

            src="https://www.unah.edu.hn/themes/portalunah-new/assets/images/logo-unah-blanco.png"
            alt="Logo UNAH"
            className="h-20 w-auto"
          />
        </div>

        <div className="flex justify-center">
          <h2 className="text-center text-2xl font-bold text-gray-200">
            Calendario Académico UNAH
          </h2>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button>Iniciar sesión</Button>
          <Button>Registrarse</Button>
        </div>
      </nav>

      <header
        className="relative -mt-px min-h-[32rem] overflow-hidden bg-[#edf2f7] bg-cover bg-center p-6 md:min-h-[28rem]"
        style={{
          backgroundImage:
            "url('https://curc.unah.edu.hn/assets/assets/common/sol-cut.png')",
        }}
      >
        <div className="mx-auto max-w-3xl px-6 py-8">
  <div className="mt-4 md:mt-10">
    <Card className="flex flex-col items-center justify-center rounded-xl bg-white px-6 py-6 text-center shadow-lg md:px-8 md:py-8">
      <div className="mx-auto max-w-xl">

        <h2 className="mb-3 text-center text-3xl font-bold tracking-wide text-[#183972]">
         Aqui encontraras...
        </h2>

        <p className="mx-auto text-center text-base leading-7 text-gray-600">
          tu recurso confiable para estar al tanto de todas las fechas importantes. Aquí encontrarás información actualizada. ¡Mantente informado y no te pierdas ningún evento importante en tu vida universitaria!
        </p>

      </div>
    </Card>
  </div>
</div>

      </header>
    </>
  );
}
