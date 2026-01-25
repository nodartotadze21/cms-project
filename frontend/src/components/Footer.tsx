import React from 'react';
import { Facebook, Instagram, Linkedin, Mail, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-900 to-purple-900 text-white mt-16 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">ფენიქსი</h3>
            <p className="text-gray-300 mb-4">ფენიქსი - საგანმანათლებლო ცენტრი. თანამედროვე განათლება ყველასთვის</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-400 transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-pink-400 transition">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">კონტაქტი</h3>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>+995 555 123 456</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>info@educenter.ge</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">სამუშაო საათები</h3>
            <div className="space-y-1 text-gray-300">
              <p>ორშ-პარ: 09:00 - 20:00</p>
              <p>შაბათი: 10:00 - 18:00</p>
              <p>კვირა: დახურულია</p>
            </div>
          </div>
        </div>
        <div className="border-t border-blue-800 pt-6 text-center text-gray-300">
          <p>&copy; 2026 ფენიქსი - საგანმანათლებლო ცენტრი. ყველა უფლება დაცულია.</p>
        </div>
      </div>
    </footer>
  );
};
