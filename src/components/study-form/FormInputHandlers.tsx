
import { useState } from 'react';
import { FormData } from '../../services/eligibilityService';
import { useToast } from '@/hooks/use-toast';

export const useFormInputHandlers = (initialFormData: FormData) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>(initialFormData);
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

  return {
    formData,
    setFormData,
    selectedCourseDetails,
    handleInputChange,
    handleSelectChange,
    handleNumberInputChange,
    handleCourseSelection
  };
};
