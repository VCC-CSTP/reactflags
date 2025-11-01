import React from "react";

export const FlagHeader = ({
  searchTerm,
  onSearchChange,
  sortOrder,
  onSortChange,
}) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        {/* Top Row - Title */}
        <div className="mb-4">
          <h1 className="text-4xl font-bold text-gray-900">World Flags</h1>
          <p className="text-gray-600 text-sm mt-1">
            Explore countries around the world
          </p>
        </div>

        {/* Bottom Row - Search and Sort */}
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* Search Bar */}
          <div className="flex-1 w-full">
            <div className="relative">
              <input
                type="text"
                placeholder="Search countries..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Sort Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => onSortChange("asc")}
              className={`px-4 py-3 rounded-lg font-medium transition flex items-center gap-2 ${
                sortOrder === "asc"
                  ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                />
              </svg>
              A-Z
            </button>

            <button
              onClick={() => onSortChange("desc")}
              className={`px-4 py-3 rounded-lg font-medium transition flex items-center gap-2 ${
                sortOrder === "desc"
                  ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
                />
              </svg>
              Z-A
            </button>
          </div>
        </div>

        {/* Results Count */}
        {searchTerm && (
          <div className="mt-3 text-sm text-gray-600">
            Searching for: <span className="font-semibold">{searchTerm}</span>
          </div>
        )}
      </div>
    </header>
  );
};
