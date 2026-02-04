import React from 'react'

const ProductsPage = () => {
  return (
    <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
      <div className="p-6 border-b border-border flex items-center justify-between">
        <h2 className="text-xl font-semibold">Products</h2>
        <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
          Add Product
        </button>
      </div>
      <div className="p-8 h-96 flex flex-col items-center justify-center text-muted-foreground gap-4">
        <div className="w-20 h-20 bg-accent rounded-xl flex items-center justify-center">
          <div className="w-10 h-10 bg-primary/20 rounded-lg" />
        </div>
        <p className="text-lg font-medium">Product List Placeholder</p>
        <p className="text-sm">Your product catalog will be managed here.</p>
      </div>
    </div>
  )
}

export default ProductsPage