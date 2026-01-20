import React from 'react';
import { Target, Heart, Award, Users } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">ჩვენ შესახებ</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          ჩვენ ვართ თანამედროვე საგანმანათლებლო ცენტრი, რომელიც ეხმარება ყველას მიაღწიოს თავის საგანმანათლებლო მიზნებს
        </p>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 sm:p-12 rounded-2xl shadow-2xl">
        <h3 className="text-3xl font-bold mb-6">ჩვენი მისია</h3>
        <p className="text-lg sm:text-xl leading-relaxed mb-4">
          ჩვენი მისიაა უზრუნველვყოთ მაღალი ხარისხის განათლება და თითოეულ მოსწავლეს მივცეთ შესაძლებლობა 
          გაიხსნას თავისი პოტენციალი და მიაღწიოს წარმატებას თავის არჩეულ სფეროში.
        </p>
        <p className="text-lg sm:text-xl leading-relaxed">
          ჩვენ ვქმნით სასწავლო გარემოს, სადაც თითოეული სტუდენტი იღებს ინდივიდუალურ ყურადღებას და 
          მხარდაჭერას გამოცდილი პედაგოგებისგან.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <div className="flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
            <Target size={32} />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-gray-800">ჩვენი მიზნები</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>სტუდენტების მაღალი აკადემიური მოსწრების უზრუნველყოფა</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>თანამედროვე სასწავლო მეთოდების გამოყენება</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>ყველა სტუდენტისთვის თანაბარი შესაძლებლობების შექმნა</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>პრაქტიკული უნარების განვითარება</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <div className="flex items-center justify-center w-16 h-16 bg-purple-100 text-purple-600 rounded-full mb-4">
            <Heart size={32} />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-gray-800">ჩვენი ღირებულებები</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">•</span>
              <span>პროფესიონალიზმი და პასუხისმგებლობა</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">•</span>
              <span>თითოეული სტუდენტისადმი ინდივიდუალური მიდგომა</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">•</span>
              <span>ურთიერთპატივისცემა და ტოლერანტობა</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">•</span>
              <span>მუდმივი განვითარება და ინოვაცია</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
          <div className="flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full mx-auto mb-4">
            <Award size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">აღიარებული სერტიფიკატები</h3>
          <p className="text-gray-700">ჩვენი სერტიფიკატები აღიარებულია საქართველოსა და საზღვარგარეთ</p>
        </div>

        <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl">
          <div className="flex items-center justify-center w-16 h-16 bg-purple-600 text-white rounded-full mx-auto mb-4">
            <Users size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">10+ წლიანი გამოცდილება</h3>
          <p className="text-gray-700">ათწლიანი გამოცდილება საგანმანათლებლო სფეროში</p>
        </div>

        <div className="text-center p-6 bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl">
          <div className="flex items-center justify-center w-16 h-16 bg-pink-600 text-white rounded-full mx-auto mb-4">
            <Target size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">95% წარმატება</h3>
          <p className="text-gray-700">ჩვენი სტუდენტების 95% აღწევს დასახულ მიზნებს</p>
        </div>
      </div>

      <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-lg text-center">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">რატომ ჩვენ?</h3>
        <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto mb-6">
          ჩვენი საგანმანათლებლო ცენტრი გთავაზობთ თანამედროვე სასწავლო გარემოს, გამოცდილ პედაგოგებს და 
          ინდივიდუალურ მიდგომას. ჩვენთან ისწავლით იმას, რაც ნამდვილად გჭირდებათ წარმატებისთვის.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
          გახდით ჩვენი საგანმანათლებლო ოჯახის წევრი და დაიწყეთ გზა წარმატებისკენ დღესვე!
        </p>
      </div>
    </div>
  );
};
