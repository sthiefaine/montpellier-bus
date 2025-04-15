import React, { useState, useEffect, useRef, useTransition } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import checkServerStatusAction from "./actions/serverStateActions";
import BusStorage from "./utils/busStorage";
import useOnlineStatus from "./hooks/useOnlineStatus";
import Footer from "./components/Footer/Footer";
import useAutoScroll from "./hooks/useAutoScroll";
import ServerStatus from "./components/ServerStatus/ServerStatus";
import InfoPage from "./components/InfoPage/InfoPage";
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
  const [cacheTimestamp, setCacheTimestamp] = useState<Date | null>(null);

  const isOnline = useOnlineStatus();

  const initialFetchDone = useRef<boolean>(false);
  const lastSuccessfulBusSchedules = useRef<Bus[]>([]);

  const { busRefs, scrollContainerRef, firstActiveBusIndex } = useAutoScroll(
    filteredBusSchedules,
    loading
  );

  useEffect(() => {
    const { buses, timestamp } = BusStorage.loadBusSchedules();
    if (buses.length > 0) {
      lastSuccessfulBusSchedules.current = buses;
      setBusSchedules(buses);
      setFilteredBusSchedules(filterAndSortBuses(buses, selectedCompany));
      setCacheTimestamp(timestamp);

      if (!isOnline) {
        setError("Vous êtes hors ligne. Affichage des données en cache.");
      }
    }
  }, []);

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

        if (!isOnline) {
          throw new Error(
            "Vous êtes hors ligne. Utilisation des données en cache."
          );
        }

        const [serverStatusCheck, data, dataBlablabus] = await Promise.all([
          checkServerStatusAction(),
          fetchBusData(),
          fetchBusDataBlablabus(),
        ]);

        const formattedBuses = formatBusData(data.rides);
        const formattedBusesBlablabus = formatBusData(dataBlablabus.rides);

        const allBuses = [...formattedBuses, ...formattedBusesBlablabus];
        if (allBuses.length > 0) {
          lastSuccessfulBusSchedules.current = allBuses;
          BusStorage.saveBusSchedules(allBuses);
          setCacheTimestamp(new Date());
        }

        startTransition(() => {
          setBusSchedules(allBuses);

          const filteredAndSortedBuses = filterAndSortBuses(
            allBuses,
            selectedCompany
          );

          setFilteredBusSchedules(filteredAndSortedBuses);
        });

        setServerStatus(
          serverStatusCheck
            ? ServerStatusEnum.CONNECTED
            : ServerStatusEnum.DISCONNECTED
        );
        setError(null);
      } catch (err) {
        const errorMessage = !isOnline
          ? "Vous êtes hors ligne. Affichage des données en cache."
          : "Erreur lors de la récupération des horaires. Utilisation des données en cache.";

        setError(errorMessage);
        console.error("Erreur:", err);

        setServerStatus(ServerStatusEnum.DISCONNECTED);

        if (lastSuccessfulBusSchedules.current.length > 0) {
          console.log(
            "Utilisation des dernières données disponibles:",
            lastSuccessfulBusSchedules.current.length
          );

          if (busSchedules.length === 0) {
            startTransition(() => {
              setBusSchedules(lastSuccessfulBusSchedules.current);
              setFilteredBusSchedules(
                filterAndSortBuses(
                  lastSuccessfulBusSchedules.current,
                  selectedCompany
                )
              );
            });
          }
        }
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
  }, [isOnline]);

  useEffect(() => {
    if (busSchedules.length > 0) {
      startTransition(() => {
        setFilteredBusSchedules(
          filterAndSortBuses(busSchedules, selectedCompany)
        );
      });
    }
  }, [selectedCompany, busSchedules, startTransition]);

  useEffect(() => {
    if (isOnline) {
      console.log("Retour en ligne détecté");
    } else {
      console.log("Passage hors ligne détecté");
      setError("Vous êtes hors ligne. Affichage des données en cache.");
    }
  }, [isOnline]);

  const handleCompanySelect = (companyId: string) => {
    startTransition(() => {
      setSelectedCompany(companyId);
    });
  };

  return (
    <Router>
      <div className="flex flex-col items-center min-h-screen bg-gray-100 pb-6">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <div className="fixed top-18 left-0 right-0 z-10 w-full bg-white shadow-md">
                  <div className="w-full mx-auto py-2 px-2 flex gap-4">
                    <CompanyFilter
                      companies={COMPANIES}
                      selectedCompany={selectedCompany}
                      onSelectCompany={handleCompanySelect}
                    />
                  </div>
                </div>

                <div className="pt-30"></div>

                {firstActiveBusIndex > 0 && filteredBusSchedules.length > 0 && (
                  <div className="w-full max-w-2xl mx-auto px-2 mb-2 mt-2">
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-2 rounded-md flex justify-between items-center">
                      <p className="text-blue-700 text-sm">
                        {firstActiveBusIndex} bus déjà passés
                      </p>
                      <button
                        className="text-xs text-blue-600 bg-blue-100 hover:bg-blue-200 px-2 py-1 rounded-full capitalize"
                        onClick={() => {
                          if (busRefs.current[firstActiveBusIndex]) {
                            const headerOffset = 140;
                            const element = busRefs.current[firstActiveBusIndex];
                            const offsetPosition =
                              element!.getBoundingClientRect().top +
                              window.screenY -
                              headerOffset;
                            window.scrollTo({
                              top: offsetPosition,
                              behavior: "smooth",
                            });
                          }
                        }}
                      >
                        défiler
                      </button>
                    </div>
                  </div>
                )}

                <div
                  ref={scrollContainerRef}
                  className="w-full max-w-2xl mx-auto p-2 mb-8"
                >
                  <>
                    {loading && busSchedules.length === 0 && <LoadingSpinner />}

                    {error && busSchedules.length === 0 && (
                      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                        <p className="text-red-700">{error}</p>
                      </div>
                    )}

                    {filteredBusSchedules.length === 0 &&
                      !loading &&
                      busSchedules.length === 0 &&
                      !error && (
                        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-md">
                          <p className="text-yellow-700">
                            Aucun bus disponible pour le moment.
                          </p>
                        </div>
                      )}

                    {filteredBusSchedules.length > 0 && (
                      <div className="space-y-2">
                        {filteredBusSchedules.map((bus, index) => (
                          <div
                            key={bus.id + bus.scheduledTime + bus.company}
                            ref={(el) => {
                              if (el) {
                                busRefs.current[index] = el;
                              }
                            }}
                          >
                            <BusCard bus={bus} stops={bus.calls} />
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                </div>
              </>
            }
          />
          <Route path="/infos" element={<InfoPage />} />
        </Routes>

        <Footer
          currentTime={currentTime}
          isOnline={isOnline}
          cacheTimestamp={cacheTimestamp}
          serverStatus={serverStatus}
          isRefreshing={isPending || refreshing}
        />
      </div>
    </Router>
  );
};

export default App;
