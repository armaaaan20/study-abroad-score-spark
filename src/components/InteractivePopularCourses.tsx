
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';

interface InteractivePopularCoursesProps {
  onSelectCourse: (title: string, country: string, university: string) => void;
}

export const InteractivePopularCourses: React.FC<InteractivePopularCoursesProps> = ({ onSelectCourse }) => {
  const [hoveredCourseId, setHoveredCourseId] = useState<number | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  
  // Subset of courses for the form
  const courses = [
    {
      id: 1,
      title: 'Master of Science in Computer Science',
      country: 'USA',
      university: 'Top US Universities',
      description: 'Specialized in AI, Machine Learning, Data Science, or Software Engineering.',
      duration: '2 years',
      popular: true,
      new: false,
      averageFees: '$25,000 - $45,000 per year',
      details: {
        requirements: "Bachelor's degree with 75%+ marks, GRE 310+, IELTS 7+",
        prospects: 'Software Engineer, Data Scientist, ML Engineer, Product Manager',
        scholarships: 'TA/RA positions, University Merit Scholarships, STEM Fellowships'
      }
    },
    {
      id: 2,
      title: 'Master of Business Administration (MBA)',
      country: 'Canada',
      university: 'Top Canadian Universities',
      description: 'Focus on Leadership, Finance, Marketing, or International Business.',
      duration: '1-2 years',
      popular: true,
      new: false,
      averageFees: 'CAD 30,000 - 50,000 per year',
      details: {
        requirements: "Bachelor's degree with 70%+ marks, 2+ years work experience, GMAT 650+",
        prospects: 'Management Consultant, Financial Analyst, Marketing Manager, Entrepreneur',
        scholarships: 'University Scholarships, Corporate Sponsorships, Leadership Awards'
      }
    },
    {
      id: 4,
      title: 'Master in Data Science & Analytics',
      country: 'UK',
      university: 'Russell Group Universities',
      description: 'Focus on Big Data, Statistical Analysis and Machine Learning.',
      duration: '1 year',
      popular: true,
      new: true,
      averageFees: '£18,000 - £30,000 per year',
      details: {
        requirements: "Bachelor's degree with 65%+ marks in quantitative field, IELTS 6.5+",
        prospects: 'Data Scientist, Data Analyst, Business Intelligence Specialist',
        scholarships: 'Chevening Scholarships, Commonwealth Scholarships, University Grants'
      }
    },
    {
      id: 3,
      title: 'Master of Engineering',
      country: 'Australia',
      university: 'Leading Australian Universities',
      description: 'Specializations in Civil, Mechanical, Electrical or Chemical Engineering.',
      duration: '2 years',
      popular: true,
      new: false,
      averageFees: 'AUD 35,000 - 45,000 per year',
      details: {
        requirements: "Bachelor's degree in Engineering with 65%+ marks, IELTS 6.5+",
        prospects: 'Professional Engineer, Project Manager, Technical Consultant',
        scholarships: 'Australia Awards, Research Scholarships, Engineering Excellence Grants'
      }
    }
  ];

  const handleSelectCourse = (course) => {
    setSelectedCourseId(course.id);
    onSelectCourse(course.title, course.country, course.university);
  };

  return (
    <>
      {courses.map((course) => (
        <Card 
          key={course.id} 
          className={`course-card overflow-hidden border transition-all duration-300 ${
            hoveredCourseId === course.id ? 'shadow-lg border-brand-500' : 'border-gray-200'
          } ${
            selectedCourseId === course.id ? 'ring-2 ring-brand-500' : ''
          }`}
          onMouseEnter={() => setHoveredCourseId(course.id)}
          onMouseLeave={() => setHoveredCourseId(null)}
        >
          <div className={`h-1 ${selectedCourseId === course.id ? 'bg-brand-700' : 'bg-brand-600'}`}></div>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-base font-bold text-brand-800 line-clamp-2">
                {course.title}
              </CardTitle>
              <div className="flex space-x-2">
                {course.popular && (
                  <span className="badge badge-popular text-[10px] bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                    Popular
                  </span>
                )}
                {course.new && (
                  <span className="badge badge-new text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                    New
                  </span>
                )}
              </div>
            </div>
            <div className="text-xs text-gray-500">
              {course.country} • {course.duration}
            </div>
          </CardHeader>
          
          <CardContent className="pt-0 pb-2">
            <div className="bg-gray-50 p-2 rounded-lg text-xs">
              <div className="font-medium text-gray-500">Tuition Fees</div>
              <div className="text-brand-700 font-semibold">{course.averageFees}</div>
            </div>
            
            {/* Expandable content that shows on hover - within the card */}
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                hoveredCourseId === course.id 
                  ? 'max-h-[500px] opacity-100 mt-3' 
                  : 'max-h-0 opacity-0 mt-0'
              }`}
            >
              <div className="space-y-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div>
                  <h5 className="text-sm font-semibold text-brand-700 border-b pb-1 border-gray-100">
                    Admission Requirements
                  </h5>
                  <p className="text-xs mt-1">{course.details.requirements}</p>
                </div>
                
                <div>
                  <h5 className="text-sm font-semibold text-brand-700 border-b pb-1 border-gray-100">
                    Career Prospects
                  </h5>
                  <p className="text-xs mt-1">{course.details.prospects}</p>
                </div>
                
                <div>
                  <h5 className="text-sm font-semibold text-brand-700 border-b pb-1 border-gray-100">
                    Scholarship Opportunities
                  </h5>
                  <p className="text-xs mt-1">{course.details.scholarships}</p>
                </div>
              </div>
              
              <div className="mt-3 text-xs text-gray-500 flex items-center">
                <Info className="w-3 h-3 mr-1" />
                <span>Hover to view details, click to select</span>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="pt-1 pb-3 flex justify-center">
            <Button 
              variant={selectedCourseId === course.id ? "default" : "outline"}
              size="sm"
              className={`text-xs transition-colors w-full ${
                selectedCourseId === course.id 
                  ? 'bg-brand-600 text-white hover:bg-brand-700' 
                  : 'text-brand-600 hover:bg-brand-50 hover:text-brand-800'
              }`}
              onClick={() => handleSelectCourse(course)}
            >
              {selectedCourseId === course.id ? 'Selected' : 'Select This Course'}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

export default InteractivePopularCourses;
