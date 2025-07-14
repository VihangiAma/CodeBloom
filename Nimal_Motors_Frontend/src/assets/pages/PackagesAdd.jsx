import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';

const PackagesAdd = () => {
  const [packageData, setPackageData] = useState({
    PackageName: '',
    PackagePrice: '',
    PackageItems: '',
    PackageFeatured: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPackageData({
      ...packageData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const dataToSend = {
        ...packageData,
        PackagePrice: Number(packageData.PackagePrice)
      };

      await axios.post('http://localhost:5001/api/Package', dataToSend);

      setTimeout(() => {
        setIsSubmitting(false);
      }, 1500);

    } catch (error) {
      console.error('Error adding package:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="bg-indigo-600 py-6 px-8">
            <h1 className="text-3xl font-bold text-white">Create New Package</h1>
            <p className="mt-2 text-indigo-100">Fill in the details for your new service package</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Package Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Package Name
              </label>
              <input
                type="text"
                name="PackageName"
                value={packageData.PackageName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                placeholder="Premium Service Package"
                required
              />
            </div>

            {/* Package Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price (LKR)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">Rs.</span>
                <input
                  type="number"
                  name="PackagePrice"
                  value={packageData.PackagePrice}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                  placeholder="45000"
                  required
                />
              </div>
            </div>

            {/* Package Items (TextArea) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Included Items (one per line)
              </label>
              <textarea
                name="PackageItems"
                value={packageData.PackageItems}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g.\nEngine oil change\nAC filter replacement"
                required
              />
            </div>

            {/* Featured Checkbox */}
            <div className="flex items-center">
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    name="PackageFeatured"
                    checked={packageData.PackageFeatured}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className={`block w-14 h-8 rounded-full ${packageData.PackageFeatured ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
                  <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${packageData.PackageFeatured ? 'transform translate-x-6' : ''}`}></div>
                </div>
                <div className="ml-3 text-gray-700 font-medium">
                  Featured Package
                </div>
              </label>
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 rounded-lg text-white font-medium transition ${isSubmitting ? 'bg-green-500' : 'bg-indigo-600 hover:bg-indigo-700'}`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <FiCheck className="animate-pulse" /> Package Created!
                  </span>
                ) : (
                  'Create Package'
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PackagesAdd;
