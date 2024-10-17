import React from 'react';

const Checkout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Checkout</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Billing Information</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" id="name" className="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" id="email" className="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <input type="text" id="address" className="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
            </div>
            <div className="mb-4">
              <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">Card Number</label>
              <input type="text" id="card-number" className="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Pay Now</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
