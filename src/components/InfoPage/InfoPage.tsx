import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";

const InfoPage = () => {
  const [selectedTab, setSelectedTab] = useState("all");

  const tabs = [
    { id: "all", label: "Tous", ariaLabel: "Tous les liens", color: "#3B82F6" },
    { id: "about", label: "Blabla", ariaLabel: "À propos", color: "#10B981" },
    { id: "site", label: "Site", ariaLabel: "Mon site web", color: "#6366F1" },
    { id: "github", label: "Git", ariaLabel: "Mon GitHub", color: "#6B7280" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="fixed top-18 left-0 right-0 z-10 w-full bg-white shadow-md">
        <div className="w-full mx-auto py-2 px-2 flex items-center gap-4">
          <Link
            aria-label="Retour à la page d'accueil"
            to="/"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </Link>
          <div className="flex gap-1 overflow-x-auto no-scrollbar flex-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                aria-label={tab.ariaLabel}
                style={{
                  backgroundColor: selectedTab === tab.id ? tab.color : "white",
                  borderColor: tab.color,
                }}
                className={`py-1 px-2 rounded-full border-2 font-medium text-sm transition-colors duration-200 flex-shrink-0
                  ${selectedTab === tab.id ? "text-white" : "text-gray-700"}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-35 pb-20">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
            {(selectedTab === "all" || selectedTab === "about") && (
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">
                  À propos
                </h1>
                <p className="text-gray-700">
                  Cette application a été développée par Thiéfaine Simonnou dans
                  le but de fournir une solution simple et efficace pour suivre
                  les horaires des bus de la gare routière Sabines à
                  Montpellier. L'objectif est de rendre l'information accessible
                  à tous de manière claire et intuitive.
                </p>
              </div>
            )}

            {(selectedTab === "all" || selectedTab === "site") && (
              <a
                href="https://thiefaine.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-4">
                  <svg
                    className="w-8 h-8 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Mon site web
                    </h2>
                    <p className="text-indigo-600">thiefaine.dev</p>
                  </div>
                </div>
              </a>
            )}

            {(selectedTab === "all" || selectedTab === "github") && (
              <a
                href="https://github.com/sthiefaine"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-4">
                  <svg
                    className="w-8 h-8 text-gray-800"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .268.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                    />
                  </svg>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Mon GitHub
                    </h2>
                    <p className="text-gray-600">github.com/sthiefaine</p>
                  </div>
                </div>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
