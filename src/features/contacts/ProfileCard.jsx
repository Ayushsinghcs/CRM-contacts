import React, { useState } from "react";

export default function ProfileCard({ data }) {
  const [isOwnerDropdownOpen, setIsOwnerDropdownOpen] = useState(false);
  const [isFollowersDropdownOpen, setIsFollowersDropdownOpen] = useState(false);

  const toggleOwnerDropdown = () => {
    setIsOwnerDropdownOpen(!isOwnerDropdownOpen);
    setIsFollowersDropdownOpen(false); // Close followers dropdown when opening owner
  };

  const toggleFollowersDropdown = () => {
    setIsFollowersDropdownOpen(!isFollowersDropdownOpen);
    setIsOwnerDropdownOpen(false); // Close owner dropdown when opening followers
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
      {/* Avatar and Name */}
      <div className="flex items-center mb-3">
        <img
          src={data.avatar}
          alt={data.first_name}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0 mr-3"
        />

        {/* Name + Call in one flex row */}
        <div className="flex items-center justify-between flex-1">
          <h2 className="text-sm sm:text-base font-semibold text-gray-900 truncate">
            {data.first_name} {data.last_name}
          </h2>

          <button
            className="bg-green-100 hover:bg-green-100 text-white px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm shadow transition-colors ml-2"
            title="Call"
          >
            📞
          </button>
        </div>
      </div>

      {/* Owner and Followers Section */}
      <div className="flex gap-3">
        {/* Owner Dropdown */}
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1">Owner</label>
          <div className="relative">
            <button
              onClick={toggleOwnerDropdown}
              className="w-[100px] flex items-center gap-2 px-2 py-2 text-left text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-[10px] border border-gray-200 transition-colors h-[25px]"
            >
              {/* Small Avatar for Owner */}
              <img
                src={`https://i.pravatar.cc/100`}
                alt={data.owner || 'Unknown'}
                className="w-5 h-5 rounded-full object-cover flex-shrink-0"
              />
              {/* Owner Name */}
              <span className="flex-1 truncate text-xs">{data.owner || "No Owner"}</span>
              {/* Dropdown Icon */}
              <svg
                className={`w-3 h-3 transition-transform flex-shrink-0 ${isOwnerDropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Owner Dropdown Content */}
            {isOwnerDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-[10px] shadow-lg z-10 min-w-[200px]">
                <div className="p-2">
                  <div className="flex items-center gap-2 px-2 py-1 text-sm text-gray-700 hover:bg-gray-50 rounded">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(data.owner || 'Unknown')}&size=32&background=random`}
                      alt={data.owner || 'Unknown'}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium">{data.owner || "No Owner"}</div>
                      <div className="text-xs text-gray-500">Contact Owner</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Followers Dropdown */}
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1">Followers</label>
          <div className="relative">
            <button
              onClick={toggleFollowersDropdown}
              className="w-[52px] flex items-center justify-between  py-2 text-left text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-[10px] border border-gray-200 transition-colors h-[25px]"
            >
              {/* Overlapping Avatars for Followers */}
              <div className="relative flex items-center">
                <img
                  src={`https://i.pravatar.cc/101`}
                  alt="Follower 1"
                  className="w-4 h-4 rounded-full object-cover border border-white relative z-10"
                />
                <img
                  src={`https://i.pravatar.cc/102`}
                  alt="Follower 2"
                  className="w-4 h-4 rounded-full object-cover border border-white relative -ml-1 z-20"
                />
                <img
                  src={`https://i.pravatar.cc/103`}
                  alt="Follower 3"
                  className="w-4 h-4 rounded-full object-cover border border-white relative -ml-1 z-30"
                />
              </div>
              {/* Dropdown Icon */}
              <svg
                className={`w-3 h-3 transition-transform flex-shrink-0 ${isFollowersDropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Followers Dropdown Content */}
            {isFollowersDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-[10px] shadow-lg z-10 min-w-[200px]">
                <div className="p-2">
                  <div className="flex items-center gap-2 px-2 py-1 text-sm text-gray-700 hover:bg-gray-50 rounded">
                    <img
                      src={`https://ui-avatars.com/api/?name=John+Doe&size=32&background=random`}
                      alt="John Doe"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium">John Doe</div>
                      <div className="text-xs text-gray-500">Team Member</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1 text-sm text-gray-700 hover:bg-gray-50 rounded">
                    <img
                      src={`https://ui-avatars.com/api/?name=Jane+Smith&size=32&background=random`}
                      alt="Jane Smith"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium">Jane Smith</div>
                      <div className="text-xs text-gray-500">Manager</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1 text-sm text-gray-700 hover:bg-gray-50 rounded">
                    <img
                      src={`https://ui-avatars.com/api/?name=Mike+Johnson&size=32&background=random`}
                      alt="Mike Johnson"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium">Mike Johnson</div>
                      <div className="text-xs text-gray-500">Developer</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
