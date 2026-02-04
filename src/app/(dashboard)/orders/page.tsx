import React from 'react'

const OrdersPage = () => {
  return (
    <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
      <div className="p-6 border-b border-border flex items-center justify-between">
        <h2 className="text-xl font-semibold">Orders</h2>
        <div className="flex gap-2">
          <div className="bg-accent px-3 py-1 rounded-full text-xs font-medium text-primary">All (0)</div>
          <div className="bg-accent/50 px-3 py-1 rounded-full text-xs font-medium text-muted-foreground">Pending</div>
        </div>
      </div>
      <div className="p-8 h-96 flex flex-col items-center justify-center text-muted-foreground gap-4">
        <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center">
          <div className="w-10 h-10 bg-primary/20 rounded-full" />
        </div>
        <p className="text-lg font-medium">Order History Placeholder</p>
        <p className="text-sm">Customer orders and fulfillment status will be listed here.</p>
      </div>
    </div>
  )
}

export default OrdersPage