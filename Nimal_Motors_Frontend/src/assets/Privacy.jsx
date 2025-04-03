import React from "react";

const Privacy = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-blue-800 text-white p-6 flex flex-col">
        <div className="flex flex-col items-center mb-8">
          <img
            src="https://via.placeholder.com/150"
            alt="User"
            className="w-24 h-24 rounded-full mb-3 cursor-pointer border-2 border-white hover:opacity-80 transition"
          />
          <h2 className="text-lg font-bold">John Doe</h2>
        </div>
        <nav className="flex-1">
          <ul className="space-y-4">
            <li className="flex items-center gap-3 p-3 hover:bg-blue-600 rounded cursor-pointer transition">
              Privacy Settings
            </li>
            {/* Add other navigation items */}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Settings</h1>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="text-lg text-gray-800">
            This is where you can configure your privacy settings. Here you can change how your information is shared and who can see it.
          </p>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Sharing</h2>
            <p className="text-lg text-gray-700">Select who can view your data:</p>
            <div className="mt-2">
              <label className="block text-lg">
                <input type="checkbox" className="mr-2" />
                Allow others to view my data
              </label>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Notifications</h2>
            <p className="text-lg text-gray-700">Choose the types of notifications you'd like to receive:</p>
            <div className="mt-2">
              <label className="block text-lg">
                <input type="checkbox" className="mr-2" />
                Receive email notifications
              </label>
            </div>
            <div className="mt-2">
              <label className="block text-lg">
                <input type="checkbox" className="mr-2" />
                Receive SMS notifications
              </label>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Privacy;
