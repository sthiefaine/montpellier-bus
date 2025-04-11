import React, { useState, useEffect, useRef, useTransition } from "react";
import { Bus, ServerStatusEnum } from "./types";
import {
  fetchBusData,
  formatBusData,
  filterAndSortBuses,
  fetchBusDataBlablabus,
} from "./actions/busActions";
import Header from "./components/Header/Header";
import CompanyFilter from "./components/CompanyFilter/CompanyFilter";
import BusCard from "./components/BusCard/BusCard";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import { COMPANIES, UPDATE_INTERVAL } from "./helpers/constants";
import { formatTimeHHMM } from "./helpers/utils";
import checkServerStatusAction from "./actions/serverStateActions";

import "./App.css";

const App = () => {
  const [busSchedules, setBusSchedules] = useState<Bus[]>([]);
  const [filteredBusSchedules, setFilteredBusSchedules] = useState<Bus[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<string>("all");
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [serverStatus, setServerStatus] = useState<ServerStatusEnum>(
    ServerStatusEnum.LOADING
  );
  const [isPending, startTransition] = useTransition();

  const initialFetchDone = useRef<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, UPDATE_INTERVAL);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchBusDataFromAPI = async () => {
      try {
        if (initialFetchDone.current) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        const [serverStatus, data, dataBlablabus] = await Promise.all([
          checkServerStatusAction(),
          fetchBusData(),
          fetchBusDataBlablabus(),
        ]);

        const formattedBuses = formatBusData(data.rides);
        const formattedBusesBlablabus = formatBusData(dataBlablabus.rides);

        const allBuses = [...formattedBuses, ...formattedBusesBlablabus];

        startTransition(() => {
          setBusSchedules(allBuses);

          const filteredAndSortedBuses = filterAndSortBuses(
            allBuses,
            selectedCompany
          );

          setFilteredBusSchedules(filteredAndSortedBuses);
        });

        setServerStatus(
          serverStatus
            ? ServerStatusEnum.CONNECTED
            : ServerStatusEnum.DISCONNECTED
        );
      } catch (err) {
        setError(
          "Erreur lors de la récupération des horaires. Veuillez réessayer."
        );
        console.error("Erreur:", err);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    };

    if (!initialFetchDone.current) {
      fetchBusDataFromAPI();
      initialFetchDone.current = true;
    } else {
      fetchBusDataFromAPI();
    }

    const interval = setInterval(fetchBusDataFromAPI, UPDATE_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (busSchedules.length > 0) {
      startTransition(() => {
        setFilteredBusSchedules(
          filterAndSortBuses(busSchedules, selectedCompany)
        );
      });
    }
  }, [selectedCompany, busSchedules, startTransition]);

  const handleCompanySelect = (companyId: string) => {
    startTransition(() => {
      setSelectedCompany(companyId);
    });
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <Header currentTime={currentTime} />

      <div className="pt-30"></div>

      <CompanyFilter
        serverStatus={serverStatus}
        companies={COMPANIES}
        selectedCompany={selectedCompany}
        onSelectCompany={handleCompanySelect}
        isRefreshing={isPending || refreshing}
      />

      {/* Liste des bus */}
      <div className="w-full max-w-2xl mx-auto p-2">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
            <p className="text-red-700">{error}</p>
          </div>
        ) : filteredBusSchedules.length === 0 ? (
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-md">
            <p className="text-yellow-700">
              Aucun bus disponible pour le moment.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredBusSchedules.map((bus) => (
              <BusCard
                key={bus.id + bus.scheduledTime + bus.company}
                bus={bus}
                stops={bus.calls}
              />
            ))}
          </div>
        )}
      </div>

      <div className="w-full max-w-2xl mx-auto p-4 text-center text-xs text-gray-500">
        Dernière mise à jour: {formatTimeHHMM(currentTime)}
      </div>
    </div>
  );
};

export default App;
