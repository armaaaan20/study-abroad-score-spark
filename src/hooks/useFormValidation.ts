
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
        
      case 4:
        if (!formData.course) {
          toast({
            title: "Course Required",
            description: "Please select or enter a course",
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
