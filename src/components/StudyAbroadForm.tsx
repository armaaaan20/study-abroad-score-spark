
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ProgressBar from './ProgressBar';
import EligibilityMeter from './EligibilityMeter';
import { calculateEligibility, FormData, EligibilityResult } from '../services/eligibilityService';

const StudyAbroadForm: React.FC = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const value = e.target.value;
    const numValue = parseFloat(value) || 0;
    
    setFormData({ ...formData, [fieldName]: numValue });
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
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

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        if (!formData.name || !formData.email || !formData.whatsapp) {
          toast({
            title: "Required Fields",
            description: "Please fill in all the required fields",
            variant: "destructive"
          });
          return false;
        }
        if (!validateEmail(formData.email)) {
          toast({
            title: "Invalid Email",
            description: "Please enter a valid email address",
            variant: "destructive"
          });
          return false;
        }
        if (!validatePhone(formData.whatsapp)) {
          toast({
            title: "Invalid WhatsApp Number",
            description: "Please enter a valid WhatsApp number with country code",
            variant: "destructive"
          });
          return false;
        }
        return true;
        
      case 2:
        if (formData.academics < 0 || formData.academics > 100) {
          toast({
            title: "Invalid Academic Score",
            description: "Please enter a valid academic percentage (0-100)",
            variant: "destructive"
          });
          return false;
        }
        return true;
        
      case 3:
        if (formData.budget <= 0) {
          toast({
            title: "Invalid Budget",
            description: "Please enter your budget",
            variant: "destructive"
          });
          return false;
        }
        return true;
        
      default:
        return true;
    }
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^\+?[0-9]{10,15}$/.test(phone);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateCurrentStep()) {
      const eligibilityResult = calculateEligibility(formData);
      setResult(eligibilityResult);
      setFormSubmitted(true);
      
      // Here you could send the data to a backend or Google Sheets
      console.log("Form submitted with data:", formData);
      console.log("Eligibility result:", eligibilityResult);
      
      toast({
        title: "Success!",
        description: "We've calculated your eligibility score",
      });
    }
  };

  const handleBookCounseling = () => {
    toast({
      title: "Booking Scheduled",
      description: "Our counselor will contact you soon!",
    });
  };

  const handleDownloadGuide = () => {
    toast({
      title: "Download Started",
      description: "Your free guide is being downloaded",
    });
    // In a real app, you would initiate a download here
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
              {/* Step 1: Personal Information */}
              <div className={`form-step ${currentStep === 1 ? 'active' : 'inactive'}`}>
                <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name*</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address*</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="whatsapp">WhatsApp Number (with country code)*</Label>
                    <Input
                      id="whatsapp"
                      name="whatsapp"
                      placeholder="+91XXXXXXXXXX"
                      value={formData.whatsapp}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
              
              {/* Step 2: Academic Information */}
              <div className={`form-step ${currentStep === 2 ? 'active' : 'inactive'}`}>
                <h3 className="text-xl font-semibold mb-4">Academic Information</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="academics">Academic Score (%)*</Label>
                    <Input
                      id="academics"
                      name="academics"
                      type="number"
                      min="0"
                      max="100"
                      placeholder="Enter your academic percentage"
                      value={formData.academics || ''}
                      onChange={(e) => handleNumberInputChange(e, 'academics')}
                      required
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="englishTestType">English Test Type*</Label>
                    <Select 
                      value={formData.englishTestType} 
                      onValueChange={(value) => handleSelectChange('englishTestType', value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select test type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="IELTS">IELTS</SelectItem>
                        <SelectItem value="TOEFL">TOEFL</SelectItem>
                        <SelectItem value="None">Not taken yet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {formData.englishTestType !== 'None' && (
                    <div>
                      <Label htmlFor="englishScore">
                        {formData.englishTestType === 'IELTS' ? 'IELTS Score (0-9)*' : 'TOEFL Score (0-120)*'}
                      </Label>
                      <Input
                        id="englishScore"
                        name="englishScore"
                        type="number"
                        min="0"
                        max={formData.englishTestType === 'IELTS' ? 9 : 120}
                        step={formData.englishTestType === 'IELTS' ? 0.5 : 1}
                        placeholder={`Enter your ${formData.englishTestType} score`}
                        value={formData.englishScore || ''}
                        onChange={(e) => handleNumberInputChange(e, 'englishScore')}
                        required
                        className="mt-1"
                      />
                    </div>
                  )}
                  
                  <div>
                    <Label htmlFor="backlogs">Number of Backlogs*</Label>
                    <Input
                      id="backlogs"
                      name="backlogs"
                      type="number"
                      min="0"
                      placeholder="Enter number of backlogs (0 if none)"
                      value={formData.backlogs || ''}
                      onChange={(e) => handleNumberInputChange(e, 'backlogs')}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
              
              {/* Step 3: Study Preferences */}
              <div className={`form-step ${currentStep === 3 ? 'active' : 'inactive'}`}>
                <h3 className="text-xl font-semibold mb-4">Study Preferences</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="budget">Budget (₹ in lakhs)*</Label>
                    <div className="relative mt-1">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₹</span>
                      <Input
                        id="budget"
                        name="budget"
                        type="number"
                        min="500000"
                        step="100000"
                        placeholder="Enter your budget in INR"
                        value={formData.budget || ''}
                        onChange={(e) => handleNumberInputChange(e, 'budget')}
                        required
                        className="pl-8"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Enter amount in rupees (e.g., 1500000 for ₹15 lakhs)</p>
                  </div>
                  
                  <div>
                    <Label htmlFor="country">Preferred Country*</Label>
                    <Select 
                      value={formData.country} 
                      onValueChange={(value) => handleSelectChange('country', value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select preferred country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USA">USA</SelectItem>
                        <SelectItem value="UK">UK</SelectItem>
                        <SelectItem value="Canada">Canada</SelectItem>
                        <SelectItem value="Australia">Australia</SelectItem>
                        <SelectItem value="Germany">Germany</SelectItem>
                        <SelectItem value="France">France</SelectItem>
                        <SelectItem value="Ireland">Ireland</SelectItem>
                        <SelectItem value="New Zealand">New Zealand</SelectItem>
                        <SelectItem value="Singapore">Singapore</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              {/* Step 4: Course Information */}
              <div className={`form-step ${currentStep === 4 ? 'active' : 'inactive'}`}>
                <h3 className="text-xl font-semibold mb-4">Course Information</h3>
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
              </div>
              
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
          <div className="p-6 animate-fade-in">
            <div className="text-center mb-8">
              <div className="inline-flex justify-center items-center w-20 h-20 bg-green-100 rounded-full mb-4">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold">Your Results</h3>
            </div>
            
            {result && (
              <>
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-brand-700 mb-2">{result.message}</div>
                  <p className="text-gray-600">Based on your profile details</p>
                </div>
                
                <EligibilityMeter result={result} />
                
                <div className="bg-brand-50 p-4 rounded-lg mb-8">
                  <p className="text-brand-900">
                    <strong>Our experts can help you:</strong> improve your profile, select the right university, and maximize your chances of admission with scholarship opportunities.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                  <Button 
                    onClick={handleBookCounseling}
                    className="bg-brand-600 hover:bg-brand-700 h-14"
                  >
                    Book Free Counseling Session
                  </Button>
                  
                  <Button 
                    onClick={handleDownloadGuide} 
                    variant="outline"
                    className="border-brand-600 text-brand-600 hover:bg-brand-50 h-14"
                  >
                    Download Free Country Guide
                  </Button>
                </div>
              </>
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
