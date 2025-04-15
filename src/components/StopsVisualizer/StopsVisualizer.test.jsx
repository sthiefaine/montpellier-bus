// src/components/StopsVisualizer/StopsVisualizer.test.jsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import StopsVisualizer from "./StopsVisualizer";

vi.mock("../../hooks/useTranslation", () => ({
  useTranslation: () => ({
    t: (key) => {
      const translations = {
        "bus.stops.label": "Arrêts du bus",
        "bus.stops.description": "Liste des {{total}} arrêts du bus",
        "bus.stops.visualizer": "Visualisation des arrêts du bus",
        "bus.stops.selected": "Arrêt sélectionné : {{stop}}",
        "bus.stops.departure": "Départ : {{stop}}",
        "bus.stops.terminus": "Terminus : {{stop}}",
        "bus.stops.intermediate": "Arrêt {{position}} sur {{total}} : {{stop}}",
        "bus.stops.current": "Arrêt actuel {{position}} sur {{total}} : {{stop}}",
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

describe("StopsVisualizer Component", () => {
  const mockStops = [
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
        id: "nimes",
        name: "Nîmes",
      },
    },
    {
      sequence: 2,
      stop: {
        id: "lyon",
        name: "Lyon Perrache",
      },
    },
  ];

  const mockOnStopClick = vi.fn();

  beforeEach(() => {
    screen.getByRole = vi.fn(screen.getByRole);
    screen.getAllByRole = vi.fn((role) => {
      if (role === "presentation") {
        const container = document.querySelector(".relative.w-full.h-4");
        if (container) {
          return Array.from(container.querySelectorAll("div.rounded-full"));
        }
        return [];
      }
      return document.querySelectorAll(`[role="${role}"]`);
    });
  });

  it("should render the correct number of stop points", () => {
    render(
      <StopsVisualizer
        stops={mockStops}
        currentIndex={0}
        onStopClick={mockOnStopClick}
      />
    );

    const stopPoints = document.querySelectorAll(".rounded-full");

    expect(stopPoints.length).toBe(3);
  });

  it("should highlight the current stop point", () => {
    render(
      <StopsVisualizer
        stops={mockStops}
        currentIndex={1}
        onStopClick={mockOnStopClick}
      />
    );

    const stopPoints = document.querySelectorAll(".rounded-full");

    expect(stopPoints[1].className).toContain("bg-blue-500");
    expect(stopPoints[1].className).toContain("animate-pulse");

    expect(stopPoints[0].className).not.toContain("bg-blue-500");
    expect(stopPoints[2].className).not.toContain("bg-blue-500");
  });

  it("should call onStopClick when a stop point is clicked", () => {
    render(
      <StopsVisualizer
        stops={mockStops}
        currentIndex={0}
        onStopClick={mockOnStopClick}
      />
    );
    const stopPoints = document.querySelectorAll(".rounded-full");
    fireEvent.click(stopPoints[1]);
    expect(mockOnStopClick).toHaveBeenCalledTimes(1);
    expect(mockOnStopClick).toHaveBeenCalledWith(1);
  });

  it("should apply different styles for already passed buses", () => {
    render(
      <StopsVisualizer
        stops={mockStops}
        currentIndex={0}
        alreadyPassed={true}
        onStopClick={mockOnStopClick}
      />
    );

    const progressLine = document.querySelector(".h-0\\.5");

    expect(progressLine.className).toContain("bg-gray-300");

    const stopPoints = document.querySelectorAll(".rounded-full");
    stopPoints.forEach((point) => {
      expect(point.className).not.toContain("animate-pulse");
    });
  });

  it("should apply special styles for departure and terminus stops", () => {
    render(
      <StopsVisualizer
        stops={mockStops}
        currentIndex={0}
        onStopClick={mockOnStopClick}
      />
    );

    const stopPoints = document.querySelectorAll(".rounded-full");

    expect(stopPoints[0].className).toContain("h-3");
    expect(stopPoints[0].className).toContain("w-3");
    expect(stopPoints[2].className).toContain("h-3");
    expect(stopPoints[2].className).toContain("w-3");
    expect(stopPoints[2].className).toContain("bg-black");
  });

  it("should apply special styles for Montpellier stop", () => {
    render(
      <StopsVisualizer
        stops={mockStops}
        currentIndex={1}
        onStopClick={mockOnStopClick}
      />
    );

    const stopPoints = document.querySelectorAll(".rounded-full");

    expect(stopPoints[0].className).toContain("bg-green-500");
  });

  it("should not apply animations for cancelled buses", () => {
    render(
      <StopsVisualizer
        stops={mockStops}
        currentIndex={1}
        busStatus="CANCELLED"
        onStopClick={mockOnStopClick}
      />
    );

    const stopPoints = document.querySelectorAll(".rounded-full");
    stopPoints.forEach((point) => {
      expect(point.className).not.toContain("animate-pulse");
    });
  });

  it("should handle empty stops gracefully", () => {
    const { container } = render(
      <StopsVisualizer
        stops={[]}
        currentIndex={0}
        onStopClick={mockOnStopClick}
      />
    );

    expect(container.firstChild).toBeNull();
  });
});
