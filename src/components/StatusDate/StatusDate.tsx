import React from "react";
import { Bus } from "../../types";

interface StatusDateProps {
  bus: Bus;
}

const StatusDate = ({ bus }: StatusDateProps) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const busDate = bus.scheduledDateTime;
  const busDay = new Date(
    busDate.getFullYear(),
    busDate.getMonth(),
    busDate.getDate()
  );

  // Déterminer le texte pour la date
  let dateText = "";
  if (busDay.getTime() === today.getTime()) {
    dateText = "aujourd'hui";
  } else if (busDay.getTime() === tomorrow.getTime()) {
    dateText = "demain";
  } else if (busDay.getTime() === yesterday.getTime()) {
    dateText = "hier";
  } else {
    // Format de date comme "Lun. 15 avr."
    dateText = busDate.toLocaleDateString("fr-FR", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  }

  if (dateText === "aujourd'hui") {
    return null;
  }

  return (
    <div className={`text-sm px-3 py-1 rounded-full text-black ${dateText === "hier" ? "bg-purple-400" : "bg-yellow-400"}`}>
      {dateText}
    </div>
  );
};

export default StatusDate;
