
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import ProgressBar from './ProgressBar';
import { calculateEligibility, FormData, EligibilityResult } from '../services/eligibilityService';
import { useFormValidation } from '../hooks/useFormValidation';
import EligibilityResults from './EligibilityResults';
import { FormStepHandler } from './study-form/FormStepHandler';
import { useFormInputHandlers } from './study-form/FormInputHandlers';
import { useFormActions } from './study-form/FormActionHandlers';

const StudyAbroadForm: React.FC = () => {
  const { toast } = useToast();
  const { validateCurrentStep } = useFormValidation();
  const { handleBookCounseling, handleDownloadGuide, isSubmitting } = useFormActions();
  
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  
  const initialFormData: FormData = {
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
  };
  
  const {
    formData,
    selectedCourseDetails,
    handleInputChange,
    handleSelectChange,
    handleNumberInputChange,
    handleCourseSelection
  } = useFormInputHandlers(initialFormData);

  const [result, setResult] = useState<EligibilityResult | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

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

  const onBookCounseling = async () => {
    if (!result) return;
    await handleBookCounseling(formData, result);
  };

  const onDownloadGuide = async () => {
    if (!result) return;
    await handleDownloadGuide(formData, result);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white shadow-xl rounded-xl overflow-hidden">
        <div className="bg-gradient-to-r from-brand-600 to-brand-800 p-6 text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">EdushpereOverseas: Am-I-Eligible Tool </h2>
          <p className="opacity-90">Find out if you qualify for your dream international education</p>
        </div>

        {!formSubmitted ? (
          <div className="p-6">
            <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
            
            <form onSubmit={handleSubmit}>
              <FormStepHandler 
                currentStep={currentStep}
                formData={formData}
                handleInputChange={handleInputChange}
                handleNumberInputChange={handleNumberInputChange}
                handleSelectChange={handleSelectChange}
                handleCourseSelection={handleCourseSelection}
                selectedCourseDetails={selectedCourseDetails}
              />
              
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
                onBookCounseling={onBookCounseling}
                onDownloadGuide={onDownloadGuide}
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
