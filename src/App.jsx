import React, { useState } from 'react';
import ContactDetailsPage from './pages/ContactDetailsPage';
import { ConfigurationSwitcher } from './pages/ConfigurationSwitcher';

function App() {
  const [showSwitcher, setShowSwitcher] = useState(false);

  return (
    <div>
      {/* Demo Toggle */}
      {/* <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setShowSwitcher(!showSwitcher)}
          className="bg-primary-600 text-white px-4 py-2 rounded-md shadow-lg hover:bg-primary-700 transition-colors text-sm font-medium"
        >
          {showSwitcher ? 'Standard View' : 'Config Switcher'}
        </button>
      </div> */}

      {showSwitcher ? <ConfigurationSwitcher /> : <ContactDetailsPage />}
    </div>
  );
}

export default App;
