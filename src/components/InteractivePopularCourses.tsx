
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';

interface InteractivePopularCoursesProps {
  onSelectCourse: (title: string, country: string, university: string) => void;
}

export const InteractivePopularCourses: React.FC<InteractivePopularCoursesProps> = ({ onSelectCourse }) => {
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

  return (
    <>
      {courses.map((course) => (
        <HoverCard key={course.id} openDelay={200} closeDelay={100}>
          <HoverCardTrigger asChild>
            <Card className="course-card overflow-hidden border border-gray-200 cursor-pointer hover:border-brand-300 transition-colors">
              <div className="h-1 bg-brand-600"></div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-base font-bold text-brand-800 line-clamp-2">
                    {course.title}
                  </CardTitle>
                  <div className="flex space-x-2">
                    {course.popular && <span className="badge badge-popular text-[10px]">Popular</span>}
                    {course.new && <span className="badge badge-new text-[10px]">New</span>}
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
              </CardContent>
              
              <CardFooter className="pt-1 pb-3 flex justify-center">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-xs text-brand-600 hover:bg-brand-50"
                  onClick={() => onSelectCourse(course.title, course.country, course.university)}
                >
                  Select This Course
                </Button>
              </CardFooter>
            </Card>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="space-y-2">
              <h4 className="font-semibold text-lg">{course.title}</h4>
              <p className="text-sm text-gray-600">{course.description}</p>
              
              <div className="space-y-1 pt-2">
                <h5 className="text-sm font-semibold text-brand-700">Admission Requirements</h5>
                <p className="text-xs">{course.details.requirements}</p>
                
                <h5 className="text-sm font-semibold text-brand-700 pt-1">Career Prospects</h5>
                <p className="text-xs">{course.details.prospects}</p>
                
                <h5 className="text-sm font-semibold text-brand-700 pt-1">Scholarship Opportunities</h5>
                <p className="text-xs">{course.details.scholarships}</p>
              </div>
              
              <div className="pt-2 text-center">
                <Button 
                  size="sm" 
                  className="text-xs bg-brand-600 hover:bg-brand-700 w-full"
                  onClick={() => onSelectCourse(course.title, course.country, course.university)}
                >
                  Select This Course
                </Button>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      ))}
    </>
  );
};

export default InteractivePopularCourses;
