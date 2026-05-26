"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function WelcomeModal() {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4">
      <Card className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl">
        <h2 className="mb-4 text-2xl font-bold text-[#183972]">
         ¡Bienvenido pumita!
        </h2>

        <p className="mb-6 text-base leading-7 text-gray-600">
          Calendario académico UNAH
        </p>

        <Button
          onClick={() => setOpen(false)}
          className="rounded-full  px-8 text-[#183972] "
        >
          Cerrar
        </Button>
      </Card>
    </div>
  );
}