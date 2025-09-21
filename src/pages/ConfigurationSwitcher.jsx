import React, { useState } from 'react';
import LayoutRenderer from '../components/layout/LayoutRenderer';
import  Avatar  from '../components/common/Avatar';
import contactsDefault from '../data/contacts.json';
import contactsAlt from '../data/contacts-alt.json';
import layoutDefault from '../data/layout.json';
import layoutAlt from '../data/layout-alt.json';
import contactFields from '../data/contactFields.json';
import conversations from '../data/conversations.json';
import notes from '../data/notes.json';

/**
 * ConfigurationSwitcher - Bonus feature for runtime JSON layout switching
 */
export const ConfigurationSwitcher = () => {
  const [configSet, setConfigSet] = useState('default');
  
  const contactData = configSet === 'default' ? contactsDefault : contactsAlt;

  const handleConfigChange = (newConfig) => {
    setConfigSet(newConfig);
  };

  // Using local JSON imports; no loading/error states needed

  const fullName = `${contactData?.first_name || ''} ${contactData?.last_name || ''}`.trim();
  const jobTitle = contactData?.job_title || 'No title';
  const company = contactData?.company_name || 'No company';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Configuration Switcher */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Configuration Switcher</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => handleConfigChange('default')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  configSet === 'default'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Default Config
              </button>
              <button
                onClick={() => handleConfigChange('alt')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  configSet === 'alt'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Alternative Config
              </button>
            </div>
          </div>
        </div>

        {/* Contact Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center space-x-4">
            <Avatar 
              src={contactData?.avatar}
              name={fullName}
              size="xl"
            />
            
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold text-gray-900 truncate">
                {fullName || 'Unknown Contact'}
              </h1>
              <p className="text-lg text-gray-600 truncate">
                {jobTitle}
              </p>
              <p className="text-sm text-gray-500 truncate">
                {company}
              </p>
            </div>

            <div className="flex space-x-3">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call
              </button>
              
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email
              </button>
              
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Note
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Content */}
        <LayoutRenderer 
          layout={configSet === 'default' ? layoutDefault : layoutAlt}
          configs={{
            contactFields,
            contactData,
            conversations,
            notes,
          }}
        />
      </div>
    </div>
  );
};
