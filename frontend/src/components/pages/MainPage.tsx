import React from 'react';
import { BookOpen, Globe, Code, GraduationCap, Award, Users } from 'lucide-react';

interface MainPageProps {
  onNewsClick: () => void;
  onCoursesClick: (category: string) => void;
}

export const MainPage: React.FC<MainPageProps> = ({ onNewsClick, onCoursesClick }) => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-20 px-4 rounded-2xl shadow-2xl">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-6xl font-bold mb-6 animate-fade-in">
            მოგესალმებით საგანმანათლებლო ცენტრში
          </h2>
          <p className="text-xl sm:text-2xl mb-8 leading-relaxed">
            აღმოაჩინეთ ახალი ცოდნა და განავითარეთ თქვენი უნარები ჩვენს თანამედროვე საგანმანათლებლო პროგრამებში
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onNewsClick}
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
            >
              უახლესი სიახლეები
            </button>
            <button
              onClick={() => onCoursesClick('courses-entrance-exam')}
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all transform hover:scale-105"
            >
              იხილეთ კურსები
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2">
          <div className="flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full mb-4">
            <Award size={32} />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-gray-800">სერტიფიცირებული კურსები</h3>
          <p className="text-gray-700 leading-relaxed">
            მიიღეთ აღიარებული სერტიფიკატი თითოეული დასრულებული კურსისთვის და გააძლიერეთ თქვენი კარიერა
          </p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2">
          <div className="flex items-center justify-center w-16 h-16 bg-purple-600 text-white rounded-full mb-4">
            <Users size={32} />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-gray-800">გამოცდილი პედაგოგები</h3>
          <p className="text-gray-700 leading-relaxed">
            ისწავლეთ მაღალკვალიფიციური და გამოცდილი პედაგოგებისგან, რომლებიც დაგეხმარებიან თქვენს წარმატებაში
          </p>
        </div>
        <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2">
          <div className="flex items-center justify-center w-16 h-16 bg-pink-600 text-white rounded-full mb-4">
            <GraduationCap size={32} />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-gray-800">ინდივიდუალური მიდგომა</h3>
          <p className="text-gray-700 leading-relaxed">
            თითოეული მოსწავლე იღებს ინდივიდუალურ ყურადღებას და მხარდაჭერას სასწავლო პროცესის განმავლობაში
          </p>
        </div>
      </section>

      {/* Courses Categories */}
      <section>
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">კურსების კატეგორიები</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <button
            onClick={() => onCoursesClick('courses-entrance-exam')}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 text-left group"
          >
            <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg mb-4 group-hover:scale-110 transition-transform">
              <GraduationCap size={28} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-blue-600 transition">სააბიტურიენტო საგნები</h3>
            <p className="text-gray-600 text-sm">სრული მომზადება ეროვნულ გამოცდებზე</p>
          </button>

          <button
            onClick={() => onCoursesClick('courses-languages')}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 text-left group"
          >
            <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg mb-4 group-hover:scale-110 transition-transform">
              <Globe size={28} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-purple-600 transition">ენების ცენტრი</h3>
            <p className="text-gray-600 text-sm">უცხო ენების შესწავლა ყველა დონეზე</p>
          </button>

          <button
            onClick={() => onCoursesClick('courses-programming')}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 text-left group"
          >
            <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg mb-4 group-hover:scale-110 transition-transform">
              <Code size={28} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-green-600 transition">პროგრამირება</h3>
            <p className="text-gray-600 text-sm">თანამედროვე პროგრამირების სწავლება</p>
          </button>

          <button
            onClick={() => onCoursesClick('courses-other')}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 text-left group"
          >
            <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-lg mb-4 group-hover:scale-110 transition-transform">
              <BookOpen size={28} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-pink-600 transition">სხვა კურსები</h3>
            <p className="text-gray-600 text-sm">დამატებითი საგანმანათლებლო პროგრამები</p>
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 px-4 rounded-2xl shadow-xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl sm:text-5xl font-bold mb-2">500+</div>
            <div className="text-lg opacity-90">მოსწავლე</div>
          </div>
          <div>
            <div className="text-4xl sm:text-5xl font-bold mb-2">50+</div>
            <div className="text-lg opacity-90">კურსი</div>
          </div>
          <div>
            <div className="text-4xl sm:text-5xl font-bold mb-2">30+</div>
            <div className="text-lg opacity-90">პედაგოგი</div>
          </div>
          <div>
            <div className="text-4xl sm:text-5xl font-bold mb-2">95%</div>
            <div className="text-lg opacity-90">წარმატების მაჩვენებელი</div>
          </div>
        </div>
      </section>
    </div>
  );
};
