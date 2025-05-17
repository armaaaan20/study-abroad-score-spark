import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import ProgressBar from './ProgressBar';
import { calculateEligibility, FormData, EligibilityResult } from '../services/eligibilityService';
import { sendEmailToOwner } from '../services/emailService';
import { useFormValidation } from '../hooks/useFormValidation';

// Importing form step components
import PersonalInfoStep from './form-steps/PersonalInfoStep';
import AcademicInfoStep from './form-steps/AcademicInfoStep';
import StudyPreferencesStep from './form-steps/StudyPreferencesStep';
import CourseInfoStep from './form-steps/CourseInfoStep';
import EligibilityResults from './EligibilityResults';

const StudyAbroadForm: React.FC = () => {
  const { toast } = useToast();
  const { validateCurrentStep } = useFormValidation();
  
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    whatsapp: '',
    academics: 0,
    englishScore: 0,
    englishTestType: 'IELTS',
    budget: 0,
    country: 'Canada',
    course: '',
    backlogs: 0,
    intake: 'Fall 2025',
  });

  const [result, setResult] = useState<EligibilityResult | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedCourseDetails, setSelectedCourseDetails] = useState<null | {
    title: string;
    country: string;
    university: string;
  }>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const value = e.target.value;
    
    // Special handling for backlogs to allow 0 as valid input
    if (fieldName === 'backlogs' && value === '0') {
      setFormData({ ...formData, [fieldName]: 0 });
      return;
    }
    
    const numValue = parseFloat(value) || 0;
    setFormData({ ...formData, [fieldName]: numValue });
  };

  const handleCourseSelection = (courseTitle: string, courseCountry: string, courseUniversity: string) => {
    setFormData({ 
      ...formData, 
      course: courseTitle,
      country: courseCountry 
    });
    setSelectedCourseDetails({
      title: courseTitle,
      country: courseCountry,
      university: courseUniversity
    });
    
    toast({
      title: "Course Selected",
      description: `You've selected ${courseTitle}`,
    });
  };

  const nextStep = () => {
    if (validateCurrentStep(currentStep, formData)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateCurrentStep(currentStep, formData)) {
      const eligibilityResult = calculateEligibility(formData);
      
      // Boost eligibility score to keep students motivated
      eligibilityResult.score = Math.min(Math.round(eligibilityResult.score * 1.25), 100);
      
      setResult(eligibilityResult);
      setFormSubmitted(true);
      
      console.log("Form submitted with data:", formData);
      console.log("Eligibility result:", eligibilityResult);
      
      toast({
        title: "Success!",
        description: "We've calculated your eligibility score",
      });
    }
  };

  const handleBookCounseling = async () => {
    if (!result) return;
    
    setIsSubmitting(true);
    
    toast({
      title: "Processing request",
      description: "Please wait while we connect you with a counselor...",
    });
    
    const success = await sendEmailToOwner({
      formData,
      eligibilityScore: result.score,
      requestType: 'counseling'
    });
    
    setIsSubmitting(false);
    
    if (success) {
      toast({
        title: "Booking Scheduled",
        description: "Our counselor will contact you soon!",
      });
    } else {
      toast({
        title: "Request Failed",
        description: "There was an error processing your request. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDownloadGuide = async () => {
    if (!result) return;
    
    setIsSubmitting(true);
    
    toast({
      title: "Processing download",
      description: "Preparing your guide...",
    });
    
    const success = await sendEmailToOwner({
      formData,
      eligibilityScore: result.score,
      requestType: 'guide'
    });
    
    setIsSubmitting(false);
    
    if (success) {
      toast({
        title: "Download Started",
        description: "Your free guide is being downloaded",
      });
      // In a real app, you would initiate a download here
    } else {
      toast({
        title: "Download Failed",
        description: "There was an error processing your download. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Render the current step of the form
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

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white shadow-xl rounded-xl overflow-hidden">
        <div className="bg-gradient-to-r from-brand-600 to-brand-800 p-6 text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Study Abroad Eligibility Checker</h2>
          <p className="opacity-90">Find out if you qualify for your dream international education</p>
        </div>

        {!formSubmitted ? (
          <div className="p-6">
            <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
            
            <form onSubmit={handleSubmit}>
              {renderFormStep()}
              
              <div className="mt-8 flex justify-between">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                  >
                    Previous
                  </Button>
                )}
                
                {currentStep < totalSteps ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="ml-auto"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="ml-auto bg-brand-600 hover:bg-brand-700"
                  >
                    Calculate My Eligibility
                  </Button>
                )}
              </div>
            </form>
          </div>
        ) : (
          <div className="p-8">
            {result && (
              <EligibilityResults 
                result={result}
                formData={formData}
                isSubmitting={isSubmitting}
                onBookCounseling={handleBookCounseling}
                onDownloadGuide={handleDownloadGuide}
              />
            )}
          </div>
        )}
        
        <div className="bg-gray-50 p-4 text-center text-sm text-gray-500 border-t">
          <p>Your information is secure and will only be used to process your eligibility.</p>
        </div>
      </div>
    </div>
  );
};

export default StudyAbroadForm;
