import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('გმადლობთ თქვენი შეტყობინებისთვის! ჩვენ მალე დაგიკავშირდებით.');
    setContactForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">დაგვიკავშირდით</h2>
        <p className="text-xl text-gray-600">ჩვენ მზად ვართ დაგეხმაროთ ნებისმიერ კითხვაში</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">გამოგვიგზავნეთ შეტყობინება</h3>
          <form onSubmit={handleContactSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">სახელი და გვარი</label>
              <input
                type="text"
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="შეიყვანეთ თქვენი სახელი"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ელ. ფოსტა</label>
              <input
                type="email"
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="თქვენი@ელფოსტა.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">შეტყობინება</label>
              <textarea
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="დაწერეთ თქვენი შეტყობინება..."
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
            >
              <Send size={20} />
              გაგზავნა
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center justify-center w-14 h-14 bg-blue-600 text-white rounded-full">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">ტელეფონი</h3>
                <p className="text-gray-700">+995 555 123 456</p>
                <p className="text-gray-700">+995 555 654 321</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center justify-center w-14 h-14 bg-purple-600 text-white rounded-full">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">ელ. ფოსტა</h3>
                <p className="text-gray-700">info@educenter.ge</p>
                <p className="text-gray-700">contact@educenter.ge</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-8 rounded-2xl shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center justify-center w-14 h-14 bg-pink-600 text-white rounded-full">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">მისამართი</h3>
                <p className="text-gray-700">თბილისი, საქართველო</p>
                <p className="text-gray-700">რუსთაველის გამზირი 1</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold mb-4">სამუშაო საათები</h3>
            <div className="space-y-2">
              <p className="flex justify-between">
                <span>ორშაბათი - პარასკევი:</span>
                <span className="font-semibold">09:00 - 20:00</span>
              </p>
              <p className="flex justify-between">
                <span>შაბათი:</span>
                <span className="font-semibold">10:00 - 18:00</span>
              </p>
              <p className="flex justify-between">
                <span>კვირა:</span>
                <span className="font-semibold">დახურულია</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
