import React from 'react'

const OverviewPage = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-border shadow-sm">
            <div className="h-4 w-24 bg-accent rounded mb-4" />
            <div className="h-8 w-16 bg-primary/20 rounded mb-2" />
            <div className="h-3 w-32 bg-accent/60 rounded" />
          </div>
        ))}
      </div>
      <div className="bg-white p-8 rounded-xl border border-border shadow-sm h-96 flex flex-col items-center justify-center text-muted-foreground gap-4">
        <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center">
          <div className="w-8 h-8 bg-primary/20 rounded-full" />
        </div>
        <p className="text-lg font-medium">Overview Content Placeholder</p>
        <p className="text-sm">Main dashboard overview and statistics will appear here.</p>
      </div>
    </div>
  )
}

export default OverviewPage