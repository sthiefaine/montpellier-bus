import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ServerStatus from "./ServerStatus";
import { ServerStatusEnum } from "../../types";

vi.mock("../../hooks/useOnlineStatus", () => ({
  default: vi.fn(() => true),
}));
vi.mock("../../hooks/useTranslation", () => ({
  useTranslation: () => ({
    t: (key) => {
      const translations = {
        "server.status.connected": "Connecté",
        "server.status.disconnected": "Déconnecté",
        "server.status.loading": "Connexion...",
        "server.status.updating": "Mise à jour...",
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

import useOnlineStatus from "../../hooks/useOnlineStatus";

describe("ServerStatus Component", () => {
  it("should render connected status correctly", () => {
    render(
      <ServerStatus
        serverStatus={ServerStatusEnum.CONNECTED}
        isRefreshing={false}
      />
    );

    expect(screen.getByText("Connecté")).toBeInTheDocument();

    const indicator = screen.getByText("Connecté").previousSibling;
    expect(indicator).toHaveClass("bg-green-500");

    expect(indicator).not.toHaveClass("animate-pulse");
  });

  it("should render disconnected status correctly", () => {
    render(
      <ServerStatus
        serverStatus={ServerStatusEnum.DISCONNECTED}
        isRefreshing={false}
      />
    );

    expect(screen.getByText("Déconnecté")).toBeInTheDocument();
    const indicator = screen.getByText("Déconnecté").previousSibling;
    expect(indicator).toHaveClass("bg-red-500");
  });

  it("should render loading status correctly", () => {
    render(
      <ServerStatus
        serverStatus={ServerStatusEnum.LOADING}
        isRefreshing={false}
      />
    );
    expect(screen.getByText("Connexion...")).toBeInTheDocument();
    const indicator = screen.getByText("Connexion...").previousSibling;
    expect(indicator).toHaveClass("bg-yellow-500");
  });

  it("should render refreshing status correctly", () => {
    render(
      <ServerStatus
        serverStatus={ServerStatusEnum.CONNECTED}
        isRefreshing={true}
      />
    );

    expect(screen.getByText("Mise à jour...")).toBeInTheDocument();

    const indicator = screen.getByText("Mise à jour...").previousSibling;
    expect(indicator).toHaveClass("bg-blue-500");
    expect(indicator).toHaveClass("animate-pulse");
  });

  it("should render offline status correctly", () => {
    // Simuler état hors ligne
    useOnlineStatus.mockReturnValue(false);

    render(
      <ServerStatus
        serverStatus={ServerStatusEnum.CONNECTED}
        isRefreshing={false}
      />
    );

    expect(screen.getByText("Déconnecté")).toBeInTheDocument();

    const indicator = screen.getByText("Déconnecté").previousSibling;
    expect(indicator).toHaveClass("bg-orange-500");
    useOnlineStatus.mockReturnValue(true);
  });

  it("should apply custom className prop", () => {
    render(
      <ServerStatus
        serverStatus={ServerStatusEnum.CONNECTED}
        isRefreshing={false}
        className="custom-class"
      />
    );

    const container = screen.getByText("Connecté").closest(".flex");
    expect(container).toHaveClass("custom-class");
  });
});
