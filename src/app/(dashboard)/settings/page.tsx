import React from 'react'

const SettingsPage = () => {
  return (
    <div className="bg-white rounded-xl border border-border shadow-sm max-w-2xl">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-semibold">Settings</h2>
      </div>
      <div className="p-6 space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="h-4 w-32 bg-accent rounded" />
              <div className="h-3 w-48 bg-accent/50 rounded" />
            </div>
            <div className="w-10 h-6 bg-secondary rounded-full" />
          </div>
        ))}
        <div className="pt-4">
          <button className="bg-primary text-white px-6 py-2 rounded-lg font-medium">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage