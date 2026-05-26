"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { events } from "../data/events";
import EventCard from "./EventCard";



const ITEMS_PER_PAGE = 3;

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export default function CalendarSection() {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("Todos");
  const [currentPage, setCurrentPage] = useState(0);

  const eventTypes = useMemo(() => {
    const types = Array.from(new Set(events.map((event) => event.type)));
    return ["Todos", ...types];
  }, []);

  const filteredEvents = useMemo(() => {
    const text = normalizeText(search.trim());

    return events.filter((event) => {
      const eventDate = new Date(`${event.date}T00:00:00`);
      const dateText = eventDate.toLocaleDateString("es-HN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      const matchesSearch =
        !text ||
        normalizeText(event.title).includes(text) ||
        normalizeText(event.type).includes(text) ||
        normalizeText(event.description).includes(text) ||
        normalizeText(event.date).includes(text) ||
        normalizeText(dateText).includes(text);

      const matchesType =
        selectedType === "Todos" || event.type === selectedType;

      return matchesSearch && matchesType;
    });
  }, [search, selectedType]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredEvents.length / ITEMS_PER_PAGE),
  );

  const visibleEvents = filteredEvents.slice(
    currentPage * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE,
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(0);
  };

  const handleFilterChange = (type: string) => {
    setSelectedType(type);
    setCurrentPage(0);
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedType("Todos");
    setCurrentPage(0);
  };

  const previousPage = () => {
    setCurrentPage((page) => (page === 0 ? totalPages - 1 : page - 1));
  };

  const nextPage = () => {
    setCurrentPage((page) => (page === totalPages - 1 ? 0 : page + 1));
  };

  return (
    <section
      id="calendario"
      className="relative w-full overflow-hidden bg-slate-100 px-4 py-20 sm:px-8 lg:px-12"
    >
      <div className="absolute inset-0 bg-[#183972]" />

      <div className="relative z-10 mx-auto w-full max-w-[1500px]">
        <div className="mb-12 text-center">
          <span className="rounded-full bg-blue-100 px-5 py-2 text-base font-bold text-blue-900 shadow-sm">
            Vista general
          </span>

          <h2 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">
            Calendario académico UNAH
          </h2>
        </div>

        <Card className="mx-auto rounded-[2.5rem] border-slate-200 bg-white/95 p-6 shadow-2xl backdrop-blur-sm sm:p-8 lg:p-10">
          <div className="mb-8 flex flex-col gap-6 rounded-[2rem] bg-[#183972] p-7 text-white lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="text-3xl font-black">Período académico 2026</h3>

              <p className="mt-2 text-base text-blue-100">
                Eventos registrados para la primera versión del proyecto.
              </p>
            </div>

            <div className="grid gap-x-6 gap-y-4 md:grid-cols-2 lg:grid-cols-3">
              <Input
                value={search}
                onChange={(event) => handleSearchChange(event.target.value)}
                placeholder="Buscar por evento, categoría o fecha..."
                className="h-12 rounded-xl border-2 border-yellow-400 bg-white text-slate-800 placeholder:text-slate-400 
                focus:ring-yellow-300"
              />

              <select
                value={selectedType}
                onChange={(event) => handleFilterChange(event.target.value)}
                className="h-12 rounded-xl border-2 border-yellow-400 bg-white px-4 text-sm font-semibold text-[#183972] 
                outline-none focus:ring-2 focus:ring-yellow-300"
                aria-label="Filtrar eventos por tipo"
              >
                {eventTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}

              
              </select>

              <Button
                type="button"
                onClick={clearFilters}
                className="h-12 rounded-xl px-5"
              >
                Limpiar
              </Button>
            </div>
          </div>

          <div className="mb-16 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          

            <div className="flex items-center justify-center gap-4">
              <Button
                type="button"
                onClick={previousPage}
                disabled={totalPages === 1}
                aria-label="Ver eventos anteriores"
                variant="outline"
                size="icon"
                className="h-14 w-14 rounded-full text-4xl font-black text-[#183972] shadow-md"
              >
                ‹
              </Button>

              <span className="min-w-24 text-center text-base font-bold text-slate-600">
                {currentPage + 1} / {totalPages}
              </span>

              <Button
                type="button"
                onClick={nextPage}
                disabled={totalPages === 1}
                aria-label="Ver eventos siguientes"
                variant="outline"
                size="icon"
                className="h-14 w-14 rounded-full text-4xl font-black text-[#183972] shadow-md"
              >
                ›
              </Button>
            </div>
          </div>

          {visibleEvents.length > 0 ? (
            <div className="overflow-hidden rounded-[2rem]">
              <div
                key={`${selectedType}-${search}-${currentPage}`}
                className="grid gap-x-12 gap-y-16 py-10 transition-all duration-300 ease-in-out md:grid-cols-2 xl:grid-cols-3"
              >
                {visibleEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    title={event.title}
                    date={event.date}
                    type={event.type}
                    description={event.description}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-base font-semibold text-slate-500">
              No se encontraron eventos con esa búsqueda o filtro.
            </div>
          )}

          <div className="mt-8 flex justify-center gap-3">
            {Array.from({ length: totalPages }).map((_, index) => (
              <Button
                key={index}
                type="button"
                onClick={() => setCurrentPage(index)}
                aria-label={`Ir a la página ${index + 1}`}
                variant="ghost"
                className={`h-4 rounded-full p-0 transition-all ${
                  currentPage === index
                    ? "w-10 bg-[#183972] hover:bg-[#183972]"
                    : "w-4 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
