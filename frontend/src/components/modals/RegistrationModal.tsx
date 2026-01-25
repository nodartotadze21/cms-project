import React, { useState } from 'react';
import { X } from 'lucide-react';

interface CourseOption {
  id: string;
  title: string;
  category: string;
}

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  allCourses: CourseOption[];
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  allCourses
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    selectedCourses: [] as string[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.phone || !formData.email) {
      alert('გთხოვთ შეავსოთ ყველა სავალდებულო ველი');
      return;
    }

    if (formData.selectedCourses.length === 0) {
      alert('გთხოვთ აირჩიოთ მინიმუმ ერთი კურსი');
      return;
    }

    const selectedCourseTitles = formData.selectedCourses
      .map(id => allCourses.find(c => c.id === id)?.title)
      .filter(Boolean)
      .join(', ');

    alert(
      `რეგისტრაცია წარმატებით დასრულდა!\n\n` +
      `სახელი: ${formData.firstName} ${formData.lastName}\n` +
      `ტელეფონი: ${formData.phone}\n` +
      `ელ. ფოსტა: ${formData.email}\n` +
      `არჩეული კურსები: ${selectedCourseTitles}\n\n` +
      `ჩვენ მალე დაგიკავშირდებით!`
    );

    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      selectedCourses: []
    });
    onClose();
  };

  const handleCourseToggle = (courseId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedCourses: prev.selectedCourses.includes(courseId)
        ? prev.selectedCourses.filter(id => id !== courseId)
        : [...prev.selectedCourses, courseId]
    }));
  };

  if (!isOpen) return null;

  // Group courses by category
  const coursesByCategory = allCourses.reduce((acc, course) => {
    if (!acc[course.category]) {
      acc[course.category] = [];
    }
    acc[course.category].push(course);
    return acc;
  }, {} as Record<string, CourseOption[]>);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg p-8 max-w-3xl w-full my-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">რეგისტრაცია</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">სახელი *</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="შეიყვანეთ თქვენი სახელი"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">გვარი *</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="შეიყვანეთ თქვენი გვარი"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ტელეფონის ნომერი *</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+995 5XX XX XX XX"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ელ. ფოსტა *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="თქვენი@ელფოსტა.com"
                required
              />
            </div>
          </div>

          {/* Course Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">აირჩიეთ კურსები *</label>
            <div className="max-h-96 overflow-y-auto border border-gray-200 rounded-lg p-4 space-y-4">
              {Object.entries(coursesByCategory).map(([category, courses]) => (
                <div key={category} className="space-y-2">
                  <h4 className="font-semibold text-gray-800 text-sm uppercase tracking-wide border-b pb-1">
                    {category}
                  </h4>
                  <div className="space-y-2 pl-2">
                    {courses.map(course => (
                      <label
                        key={course.id}
                        className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer transition"
                      >
                        <input
                          type="checkbox"
                          checked={formData.selectedCourses.includes(course.id)}
                          onChange={() => handleCourseToggle(course.id)}
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-gray-700">{course.title}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              არჩეულია: {formData.selectedCourses.length} კურსი
            </p>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
            >
              რეგისტრაცია
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              გაუქმება
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
