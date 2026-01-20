import React from 'react';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-bold text-gray-800">About Us</h2>
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <p className="text-lg text-gray-700 mb-6">
          Welcome to our platform! We are dedicated to bringing you the latest news and updates in a clean, easy-to-read format.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          Our mission is to provide high-quality content that informs, educates, and inspires our readers.
        </p>
        <p className="text-lg text-gray-700">
          Thank you for being part of our community!
        </p>
      </div>
    </div>
  );
};
