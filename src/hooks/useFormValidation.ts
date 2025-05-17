
import { useToast } from '@/hooks/use-toast';
import { FormData } from '../services/eligibilityService';

export const useFormValidation = () => {
  const { toast } = useToast();

  const validateCurrentStep = (currentStep: number, formData: FormData): boolean => {
    switch (currentStep) {
      case 1:
        if (!formData.name || !formData.email || !formData.whatsapp) {
          toast({
            title: "Required Fields",
            description: "Please fill in all the required fields to proceed.",
            variant: "destructive"
          });
          return false;
        }
        if (!validateEmail(formData.email)) {
          toast({
            title: "Invalid Email",
            description: "Please enter a valid email address to receive important updates.",
            variant: "destructive"
          });
          return false;
        }
        if (!validatePhone(formData.whatsapp)) {
          toast({
            title: "Invalid WhatsApp Number",
            description: "Please enter a valid WhatsApp number with country code for easy communication.",
            variant: "destructive"
          });
          return false;
        }
        return true;
        
      case 2:
        if (formData.academics < 0 || formData.academics > 100) {
          toast({
            title: "Invalid Academic Score",
            description: "Please enter a valid academic percentage between 0 and 100.",
            variant: "destructive"
          });
          return false;
        }
        if (formData.englishTestType !== 'None' && (!formData.englishScore || formData.englishScore <= 0)) {
          toast({
            title: "English Score Required",
            description: `Please enter your ${formData.englishTestType} score to accurately assess your eligibility.`,
            variant: "destructive"
          });
          return false;
        }
        return true;
        
      case 3:
        if (formData.budget <= 0) {
          toast({
            title: "Budget Information Required",
            description: "Please enter your budget to help us recommend suitable programs.",
            variant: "destructive"
          });
          return false;
        }
        if (!formData.country) {
          toast({
            title: "Country Preference Required",
            description: "Please select your preferred study destination.",
            variant: "destructive"
          });
          return false;
        }
        if (!formData.intake) {
          toast({
            title: "Intake Period Required",
            description: "Please select your preferred intake period.",
            variant: "destructive"
          });
          return false;
        }
        return true;
        
      case 4:
        if (!formData.course) {
          toast({
            title: "Course Selection Required",
            description: "Please select or enter a course to complete your application.",
            variant: "destructive"
          });
          return false;
        }
        return true;
        
      default:
        return true;
    }
  };

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    return /^\+?[0-9]{10,15}$/.test(phone);
  };

  return { validateCurrentStep };
};
