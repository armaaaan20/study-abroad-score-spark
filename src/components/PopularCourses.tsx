
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
    averageFees: '$25,000 - $45,000 per year'
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
    averageFees: 'CAD 30,000 - 50,000 per year'
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
    averageFees: 'AUD 35,000 - 45,000 per year'
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
    averageFees: '£18,000 - £30,000 per year'
  },
  {
    id: 5,
    title: 'Bachelor of Medicine (MBBS)',
    country: 'Germany',
    university: 'German Medical Schools',
    description: 'Medical education with clinical rotations and specializations.',
    duration: '6 years',
    popular: false,
    new: false,
    averageFees: 'Minimal fees (mostly public universities)'
  },
  {
    id: 6,
    title: 'Bachelor of Hospitality Management',
    country: 'Switzerland',
    university: 'Swiss Hospitality Schools',
    description: 'Focus on luxury hospitality, tourism and event management.',
    duration: '3-4 years',
    popular: false,
    new: true,
    averageFees: 'CHF 25,000 - 40,000 per year'
  }
];

const PopularCourses: React.FC = () => {
  return (
    <div className="w-full">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-brand-800 mb-3">Popular Study Programs</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover the most sought-after international courses with high employment rates and return on investment
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="course-card overflow-hidden border border-gray-200">
            <div className="h-2 bg-brand-600"></div>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl font-bold text-brand-800 line-clamp-2">
                  {course.title}
                </CardTitle>
                <div className="flex space-x-2">
                  {course.popular && <span className="badge badge-popular">Popular</span>}
                  {course.new && <span className="badge badge-new">New</span>}
                </div>
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {course.country} • {course.duration}
              </div>
            </CardHeader>
            
            <CardContent>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm font-medium text-gray-500">Average Tuition Fees</div>
                <div className="text-brand-700 font-semibold mt-1">{course.averageFees}</div>
              </div>
            </CardContent>
            
            <CardFooter className="border-t pt-4 flex justify-between">
              <div className="text-sm text-gray-500">{course.university}</div>
              <Button variant="ghost" className="text-brand-600 hover:text-brand-800 p-0">
                Check Eligibility
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="text-center mt-10">
        <Button className="bg-brand-600 hover:bg-brand-700">
          View All Programs
        </Button>
      </div>
    </div>
  );
};

export default PopularCourses;
