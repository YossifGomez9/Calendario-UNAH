import type { CollectionConfig } from "payload";
export const EventosAcademicos: CollectionConfig = {
    slug: "eventos-academicos",
    admin: {
        useAsTitle: "title",
        defaultColumns: ["title", "date", "type"],
    },
    access: {
        read: () => true,
    },
    fields: [

        {
            name: "title",
            label: "Título",
            type: "text",
            required: true,
        },
        {
            name: "date",
            label: "Fecha",
            type: "date",
            required: true,
        },
        {
            name: "type",
            label: "Tipo de evento",
            type: "select",
            required: true,
            options: [
                { label: "Admisiones", value: "Admisiones" },
                { label: "Clases", value: "Clases" },
                { label: "Exámenes", value: "Exámenes" },
                { label: "Feriado", value: "Feriado" },
                { label: "General", value: "General" },
            ],
        },
        {
            name: "description",
            label: "Descripción",
            type: "textarea",
            required: true,
        },

    ],
};