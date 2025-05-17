
import { FormData } from '../../services/eligibilityService';
import React from 'react';
import PersonalInfoStep from '../form-steps/PersonalInfoStep';
import AcademicInfoStep from '../form-steps/AcademicInfoStep';
import StudyPreferencesStep from '../form-steps/StudyPreferencesStep';
import CourseInfoStep from '../form-steps/CourseInfoStep';

interface FormStepHandlerProps {
  currentStep: number;
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleNumberInputChange: (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleCourseSelection: (courseTitle: string, courseCountry: string, courseUniversity: string) => void;
  selectedCourseDetails: null | {
    title: string;
    country: string;
    university: string;
  };
}

export const FormStepHandler: React.FC<FormStepHandlerProps> = ({
  currentStep,
  formData,
  handleInputChange,
  handleNumberInputChange,
  handleSelectChange,
  handleCourseSelection,
  selectedCourseDetails
}) => {
  const renderFormStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="form-step active">
            <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
            <PersonalInfoStep 
              formData={formData} 
              handleInputChange={handleInputChange} 
            />
          </div>
        );
      case 2:
        return (
          <div className="form-step active">
            <h3 className="text-xl font-semibold mb-4">Academic Information</h3>
            <AcademicInfoStep 
              formData={formData} 
              handleNumberInputChange={handleNumberInputChange} 
              handleSelectChange={handleSelectChange} 
            />
          </div>
        );
      case 3:
        return (
          <div className="form-step active">
            <h3 className="text-xl font-semibold mb-4">Study Preferences</h3>
            <StudyPreferencesStep 
              formData={formData} 
              handleNumberInputChange={handleNumberInputChange} 
              handleSelectChange={handleSelectChange} 
            />
          </div>
        );
      case 4:
        return (
          <div className="form-step active">
            <h3 className="text-xl font-semibold mb-4">Course Information</h3>
            <CourseInfoStep 
              formData={formData}
              handleInputChange={handleInputChange}
              handleSelectChange={handleSelectChange}
              onSelectCourse={handleCourseSelection}
              selectedCourseDetails={selectedCourseDetails}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return renderFormStep();
};
