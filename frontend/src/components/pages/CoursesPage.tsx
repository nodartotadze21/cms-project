import React, { useState } from 'react';
import { BookOpen, Globe, Code, GraduationCap, Calculator, Zap, FlaskConical, Leaf, BookText, Clock } from 'lucide-react';
import { RegistrationModal } from '../modals/RegistrationModal';

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  icon: React.ReactNode;
}

interface CourseCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  courses: Course[];
}

export const CoursesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('entrance-exam');
  const [showRegistration, setShowRegistration] = useState(false);

  const categories: CourseCategory[] = [
    {
      id: 'entrance-exam',
      title: 'სააბიტურიენტო საგნები',
      description: 'სრული მომზადება ეროვნულ გამოცდებზე',
      icon: <GraduationCap className="w-8 h-8" />,
      courses: [
        {
          id: 'math',
          title: 'მათემატიკა',
          description: 'სრული კურსი მათემატიკაში ეროვნულ გამოცდებზე მომზადებისთვის. მოიცავს ალგებრას, გეომეტრიას და ტრიგონომეტრიას.',
          duration: '8 თვე',
          level: 'საშუალო-მაღალი',
          icon: <Calculator className="w-6 h-6" />
        },
        {
          id: 'physics',
          title: 'ფიზიკა',
          description: 'ფიზიკის ძირითადი კურსი სააბიტურიენტებისთვის. მექანიკა, თერმოდინამიკა, ელექტროსტატიკა.',
          duration: '8 თვე',
          level: 'საშუალო-მაღალი',
          icon: <Zap className="w-6 h-6" />
        },
        {
          id: 'chemistry',
          title: 'ქიმია',
          description: 'ქიმიის სრული კურსი: არაორგანული, ორგანული ქიმია და ქიმიური რეაქციები.',
          duration: '8 თვე',
          level: 'საშუალო-მაღალი',
          icon: <FlaskConical className="w-6 h-6" />
        },
        {
          id: 'biology',
          title: 'ბიოლოგია',
          description: 'ბიოლოგიის კომპლექსური კურსი: უჯრედული ბიოლოგია, გენეტიკა, ანატომია და ეკოლოგია.',
          duration: '8 თვე',
          level: 'საშუალო',
          icon: <Leaf className="w-6 h-6" />
        },
        {
          id: 'georgian',
          title: 'ქართული ენა და ლიტერატურა',
          description: 'ქართული ენის გრამატიკა და ლიტერატურის სრული კურსი გამოცდებისთვის.',
          duration: '8 თვე',
          level: 'საშუალო',
          icon: <BookText className="w-6 h-6" />
        },
        {
          id: 'history',
          title: 'ისტორია',
          description: 'საქართველოს და მსოფლიო ისტორიის კურსი ეროვნულ გამოცდებზე მომზადებისთვის.',
          duration: '8 თვე',
          level: 'საშუალო',
          icon: <Clock className="w-6 h-6" />
        }
      ]
    },
    {
      id: 'languages',
      title: 'ენების ცენტრი',
      description: 'უცხო ენების შესწავლა ყველა დონეზე',
      icon: <Globe className="w-8 h-8" />,
      courses: [
        {
          id: 'english',
          title: 'ინგლისური ენა',
          description: 'ინგლისური ენის შესწავლა დამწყებიდან მაღალ დონემდე. IELTS/TOEFL მომზადება.',
          duration: '10 თვე',
          level: 'ყველა დონე',
          icon: <Globe className="w-6 h-6" />
        },
        {
          id: 'german',
          title: 'გერმანული ენა',
          description: 'გერმანული ენის ინტენსიური კურსი A1-დან C1 დონემდე. Goethe სერტიფიკატის მომზადება.',
          duration: '10 თვე',
          level: 'ყველა დონე',
          icon: <Globe className="w-6 h-6" />
        },
        {
          id: 'french',
          title: 'ფრანგული ენა',
          description: 'ფრანგული ენის შესწავლა თანამედროვე მეთოდებით. DELF/DALF მომზადება.',
          duration: '10 თვე',
          level: 'ყველა დონე',
          icon: <Globe className="w-6 h-6" />
        },
        {
          id: 'russian',
          title: 'რუსული ენა',
          description: 'რუსული ენის სრული კურსი გრამატიკის, ლექსიკისა და კომუნიკაციის განვითარებით.',
          duration: '8 თვე',
          level: 'ყველა დონე',
          icon: <Globe className="w-6 h-6" />
        },
        {
          id: 'turkish',
          title: 'თურქული ენა',
          description: 'თურქული ენის შესწავლა ძირითადი დონიდან საუბრის თავისუფალ დონემდე.',
          duration: '8 თვე',
          level: 'დამწყები-საშუალო',
          icon: <Globe className="w-6 h-6" />
        }
      ]
    },
    {
      id: 'programming',
      title: 'პროგრამირება',
      description: 'თანამედროვე პროგრამირების სწავლება',
      icon: <Code className="w-8 h-8" />,
      courses: [
        {
          id: 'python',
          title: 'Python პროგრამირება',
          description: 'Python-ის სრული კურსი დამწყებებისთვის. ძირითადი სინტაქსიდან OOP-მდე.',
          duration: '5 თვე',
          level: 'დამწყები',
          icon: <Code className="w-6 h-6" />
        },
        {
          id: 'javascript',
          title: 'JavaScript & React',
          description: 'თანამედროვე ვებ დეველოპმენტი JavaScript-ით და React ბიბლიოთეკით.',
          duration: '6 თვე',
          level: 'საშუალო',
          icon: <Code className="w-6 h-6" />
        },
        {
          id: 'java',
          title: 'Java პროგრამირება',
          description: 'Java-ს შესწავლა: ძირითადი კონცეფციები, OOP, Spring Framework.',
          duration: '6 თვე',
          level: 'დამწყები-საშუალო',
          icon: <Code className="w-6 h-6" />
        },
        {
          id: 'web-dev',
          title: 'ვებ დეველოპმენტი',
          description: 'სრული სტეკის ვებ დეველოპმენტი: HTML, CSS, JavaScript, Node.js, MongoDB.',
          duration: '8 თვე',
          level: 'ყველა დონე',
          icon: <Code className="w-6 h-6" />
        },
        {
          id: 'mobile-dev',
          title: 'მობილური აპლიკაციები',
          description: 'მობილური აპლიკაციების შექმნა React Native-ით iOS და Android-ისთვის.',
          duration: '6 თვე',
          level: 'საშუალო',
          icon: <Code className="w-6 h-6" />
        }
      ]
    },
    {
      id: 'other',
      title: 'სხვა კურსები',
      description: 'დამატებითი საგანმანათლებლო კურსები',
      icon: <BookOpen className="w-8 h-8" />,
      courses: [
        {
          id: 'graphic-design',
          title: 'გრაფიკული დიზაინი',
          description: 'Adobe Photoshop, Illustrator და InDesign-ის შესწავლა პროფესიონალურ დონეზე.',
          duration: '4 თვე',
          level: 'დამწყები-საშუალო',
          icon: <BookOpen className="w-6 h-6" />
        },
        {
          id: 'accounting',
          title: 'ბუღალტერია',
          description: 'ბუღალტრული აღრიცხვის საფუძვლები და თანამედროვე პროგრამული უზრუნველყოფა.',
          duration: '5 თვე',
          level: 'დამწყები',
          icon: <BookOpen className="w-6 h-6" />
        },
        {
          id: 'digital-marketing',
          title: 'ციფრული მარკეტინგი',
          description: 'SEO, SMM, კონტენტ მარკეტინგი და Google Ads-ის გამოყენება.',
          duration: '4 თვე',
          level: 'დამწყები-საშუალო',
          icon: <BookOpen className="w-6 h-6" />
        },
        {
          id: 'photography',
          title: 'ფოტოგრაფია',
          description: 'ფოტოგრაფიის ხელოვნება: კომპოზიცია, განათება, ფოტომონტაჟი.',
          duration: '3 თვე',
          level: 'დამწყები',
          icon: <BookOpen className="w-6 h-6" />
        },
        {
          id: 'music',
          title: 'მუსიკის თეორია და პრაქტიკა',
          description: 'მუსიკალური ინსტრუმენტების შესწავლა და მუსიკის თეორია.',
          duration: '6 თვე',
          level: 'ყველა დონე',
          icon: <BookOpen className="w-6 h-6" />
        }
      ]
    }
  ];

  const currentCategory = categories.find(cat => cat.id === selectedCategory) || categories[0];

  // Flatten all courses for registration modal
  const allCourses = categories.flatMap(cat => 
    cat.courses.map(course => ({
      id: course.id,
      title: course.title,
      category: cat.title
    }))
  );

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">ჩვენი კურსები</h2>
        <p className="text-xl text-gray-600">აირჩიეთ თქვენთვის სასურველი მიმართულება</p>
      </div>

      {/* Category Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`p-6 rounded-xl transition-all transform hover:scale-105 ${
              selectedCategory === category.id
                ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-xl'
                : 'bg-white text-gray-800 shadow-lg hover:shadow-xl'
            }`}
          >
            <div className="flex justify-center mb-3">
              {category.icon}
            </div>
            <h3 className="text-lg font-bold mb-2">{category.title}</h3>
            <p className={`text-sm ${selectedCategory === category.id ? 'text-blue-100' : 'text-gray-600'}`}>
              {category.description}
            </p>
          </button>
        ))}
      </div>

      {/* Courses Grid */}
      <div>
        <h3 className="text-3xl font-bold text-gray-800 mb-6">{currentCategory.title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCategory.courses.map(course => (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 overflow-hidden"
            >
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-6 text-white">
                <div className="flex items-center gap-3 mb-2">
                  {course.icon}
                  <h4 className="text-xl font-bold">{course.title}</h4>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4 min-h-[80px]">{course.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">ხანგრძლივობა:</span>
                    <span className="font-semibold text-blue-600">{course.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">დონე:</span>
                    <span className="font-semibold text-purple-600">{course.level}</span>
                  </div>
                </div>
                <button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105">
                  დეტალურად
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-8 text-center">
        <h3 className="text-3xl font-bold mb-4">მზად ხართ სწავლის დაწყებისთვის?</h3>
        <p className="text-xl mb-6">დარეგისტრირდით და დაიწყეთ თქვენი საგანმანათლებლო მოგზაურობა დღესვე!</p>
        <button 
          onClick={() => setShowRegistration(true)}
          className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105"
        >
          რეგისტრაცია
        </button>
      </div>

      <RegistrationModal
        isOpen={showRegistration}
        onClose={() => setShowRegistration(false)}
        allCourses={allCourses}
      />
    </div>
  );
};
