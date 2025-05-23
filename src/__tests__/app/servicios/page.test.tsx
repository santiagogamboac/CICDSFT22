// src/__tests__/app/servicios/page.test.tsx
import { screen, render } from "@testing-library/react";
import ServiciosPage from "../../../app/services/page";

describe("Servicios Page", () => {
    beforeEach(() => {
        // Mockear la función fetch
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve([{ id: "1", name: "Servicio 1", description: "Descripción 1", price: 100, features: ["Feature 1", "Feature 2"] }]),
            })
        ) as jest.Mock;
    });

    afterEach(() => {
        jest.clearAllMocks(); // Limpiar mocks después de cada prueba
    });

    it("renders the ServiciosGestion component", () => {
        render(<ServiciosPage />);

        expect(screen.getByText("Nuestros Servicios")).toBeInTheDocument();
    });
});
