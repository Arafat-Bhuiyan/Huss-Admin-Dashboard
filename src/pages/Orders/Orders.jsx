"use client";

import { useState } from "react";
import OrdersTable from "./OrdersTable";
import ProductDetailsModal from "./ProductDetails";

export default function OrdersPage() {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F2]">
      {/* Main Content */}
      <OrdersTable
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        onViewDetails={handleViewDetails}
      />

      {/* Product Details Modal */}
      {isModalOpen && selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
