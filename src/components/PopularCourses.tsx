
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';

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
    id: 5,
    title: 'Bachelor of Medicine (MBBS)',
    country: 'Germany',
    university: 'German Medical Schools',
    description: 'Medical education with clinical rotations and specializations.',
    duration: '6 years',
    popular: false,
    new: false,
    averageFees: 'Minimal fees (mostly public universities)',
    details: {
      requirements: 'Excellent academic record, German language proficiency (B2/C1)',
      prospects: 'Doctor, Medical Researcher, Healthcare Administrator',
      scholarships: 'DAAD Scholarships, German Academic Merit Scholarships'
    }
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
    averageFees: 'CHF 25,000 - 40,000 per year',
    details: {
      requirements: 'High school diploma with good grades, English proficiency',
      prospects: 'Hotel Manager, Event Director, Tourism Executive, Restaurant Manager',
      scholarships: 'Merit-based Scholarships, Hospitality Industry Sponsorships'
    }
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
          <HoverCard key={course.id} openDelay={150} closeDelay={100}>
            <HoverCardTrigger asChild>
              <Card className="course-card overflow-hidden border border-gray-200 cursor-pointer hover:shadow-lg transition-all hover:border-brand-400 transform hover:-translate-y-1 duration-300">
                <div className="h-2 bg-brand-600"></div>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-bold text-brand-800 line-clamp-2">
                      {course.title}
                    </CardTitle>
                    <div className="flex space-x-2">
                      {course.popular && (
                        <span className="badge bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                          Popular
                        </span>
                      )}
                      {course.new && (
                        <span className="badge bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                          New
                        </span>
                      )}
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
            </HoverCardTrigger>
            <HoverCardContent className="w-80 p-4 shadow-xl border-brand-200 animate-fade-in">
              <div className="space-y-3">
                <h4 className="font-semibold text-lg text-brand-800">{course.title}</h4>
                <p className="text-sm text-gray-600">{course.description}</p>
                
                <div className="space-y-2 pt-1">
                  <h5 className="text-sm font-semibold text-brand-700 border-b pb-1 border-gray-100">Admission Requirements</h5>
                  <p className="text-xs">{course.details.requirements}</p>
                  
                  <h5 className="text-sm font-semibold text-brand-700 border-b pb-1 border-gray-100 mt-2">Career Prospects</h5>
                  <p className="text-xs">{course.details.prospects}</p>
                  
                  <h5 className="text-sm font-semibold text-brand-700 border-b pb-1 border-gray-100 mt-2">Scholarship Opportunities</h5>
                  <p className="text-xs">{course.details.scholarships}</p>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
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
