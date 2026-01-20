import React from 'react';

interface MainPageProps {
  onNewsClick: () => void;
}

export const MainPage: React.FC<MainPageProps> = ({ onNewsClick }) => {
  return (
    <div className="space-y-12">
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-4 rounded-lg">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">Welcome to Our Website</h2>
          <p className="text-xl sm:text-2xl mb-8">Discover amazing content and stay updated with our latest news</p>
          <button
            onClick={onNewsClick}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Read Latest News
          </button>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Latest Updates</h3>
          <p className="text-gray-600">Stay informed with our newest articles and announcements.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">About Us</h3>
          <p className="text-gray-600">Learn more about our mission and what we stand for.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Get in Touch</h3>
          <p className="text-gray-600">We'd love to hear from you. Contact us anytime.</p>
        </div>
      </section>
    </div>
  );
};
