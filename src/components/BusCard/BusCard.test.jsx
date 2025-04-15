/* eslint-disable no-undef */
import { describe, it, expect, vi, beforeAll, afterAll } from "vitest";
import { render, screen } from "@testing-library/react";
import BusCard from "./BusCard";

vi.mock("@number-flow/react", () => ({
  default: ({ value }) => <span data-testid="number-flow">{value}</span>,
}));

vi.mock("../../hooks/useTranslation", () => ({
  useTranslation: () => ({
    t: (key) => {
      const translations = {
        "bus.delay.late": "Retard {{minutes}} min",
        "bus.status.cancelled": "Annulé",
        "bus.status.late": "Retard",
      };
      return translations[key] || key;
    },
  }),
}));

vi.mock("../../contexts/LanguageContext", () => ({
  useLanguage: () => ({
    language: "fr",
    setLanguage: vi.fn(),
  }),
}));

describe("BusCard Component", () => {
  const fixedDate = new Date("2025-04-13T15:00:00Z");
  let originalDate;

  beforeAll(() => {
    originalDate = global.Date;
    global.Date = class extends Date {
      constructor(...args) {
        if (args.length === 0) {
          return fixedDate;
        }
        return new originalDate(...args);
      }
      static now() {
        return fixedDate.getTime();
      }
    };
  });

  afterAll(() => {
    global.Date = originalDate;
  });

  const mockBus = {
    id: "test-bus-123",
    lineCode: "F123",
    company: "FlixBus",
    companyColor: "#5AB946",
    destination: "Lyon Perrache",
    scheduledTime: "15:30",
    delayedTime: "15:40",
    deviation_seconds: 600,
    isDelayed: true,
    delayMinutes: 10,
    status: "LATE",
    scheduledDateTime: new Date("2025-04-13T15:30:00Z"),
    delayedDateTime: new Date("2025-04-13T15:40:00Z"),
    scheduledDateISO: "2025-04-13T15:30:00Z",
    delayedDateISO: "2025-04-13T15:40:00Z",
    calls: [
      {
        sequence: 0,
        stop: {
          id: "montpellier",
          name: "Montpellier Sabines",
        },
      },
      {
        sequence: 1,
        stop: {
          id: "lyon",
          name: "Lyon Perrache",
        },
      },
    ],
  };

  it("should render correctly with all information", () => {
    render(<BusCard bus={mockBus} stops={mockBus.calls} />);
    expect(screen.getByText("Lyon Perrache")).toBeInTheDocument();
    expect(screen.getByText("F123")).toBeInTheDocument();
    expect(screen.getByText(/Retard/)).toBeInTheDocument();
  });

  it("should display the correct number of stops", () => {
    render(<BusCard bus={mockBus} stops={mockBus.calls} />);
    expect(screen.getByTestId("number-flow")).toHaveTextContent("1");
    expect(screen.getByText("/2 : Montpellier Sabines")).toBeInTheDocument();
  });

  it("should render with a past bus status", () => {
    const pastBus = {
      ...mockBus,
      scheduledDateTime: new Date("2025-04-13T14:30:00Z"),
      delayedDateTime: new Date("2025-04-13T14:40:00Z"),
      scheduledDateISO: "2025-04-13T14:30:00Z",
      delayedDateISO: "2025-04-13T14:40:00Z",
    };

    render(<BusCard bus={pastBus} stops={pastBus.calls} />);
    const busCard = screen.getByText("Lyon Perrache").closest(".rounded-lg");
    expect(busCard).toHaveClass("opacity-70");
  });

  it("should render with a cancelled bus status", () => {
    const cancelledBus = {
      ...mockBus,
      status: "CANCELLED",
    };

    render(<BusCard bus={cancelledBus} stops={cancelledBus.calls} />);
    expect(screen.getByText("Annulé")).toBeInTheDocument();
    const busCard = screen.getByText("Lyon Perrache").closest(".rounded-lg");
    expect(busCard).toHaveClass("opacity-70");
  });
});
