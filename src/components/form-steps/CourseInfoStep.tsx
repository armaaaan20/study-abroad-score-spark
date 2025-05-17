
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { InteractivePopularCourses } from '../InteractivePopularCourses';

interface CourseInfoStepProps {
  formData: {
    course: string;
    intake: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  onSelectCourse: (title: string, country: string, university: string) => void;
  selectedCourseDetails: null | {
    title: string;
    country: string;
    university: string;
  };
}

const CourseInfoStep: React.FC<CourseInfoStepProps> = ({
  formData,
  handleInputChange,
  handleSelectChange,
  onSelectCourse,
  selectedCourseDetails
}) => {
  return (
    <>
      <div className="mb-6">
        <h4 className="text-lg font-medium text-brand-700 mb-3">Popular Programs You Might Be Interested In</h4>
        <p className="text-sm text-gray-600 mb-4">Browse these popular courses or enter your own preference below. Hover on any course for more details.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <InteractivePopularCourses onSelectCourse={onSelectCourse} />
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="course">Preferred Course*</Label>
          <Input
            id="course"
            name="course"
            placeholder="E.g., Master of Computer Science"
            value={formData.course}
            onChange={handleInputChange}
            required
            className="mt-1"
          />
          {selectedCourseDetails && (
            <p className="text-xs text-brand-600 mt-1">
              Selected: {selectedCourseDetails.title} ({selectedCourseDetails.university})
            </p>
          )}
        </div>
        
        <div>
          <Label htmlFor="intake">Preferred Intake*</Label>
          <Select 
            value={formData.intake} 
            onValueChange={(value) => handleSelectChange('intake', value)}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select intake season" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Fall 2025">Fall 2025</SelectItem>
              <SelectItem value="Spring 2026">Spring 2026</SelectItem>
              <SelectItem value="Fall 2026">Fall 2026</SelectItem>
              <SelectItem value="Not decided">Not decided yet</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
};

export default CourseInfoStep;
