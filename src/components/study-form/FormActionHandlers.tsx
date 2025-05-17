
import { FormData, EligibilityResult } from '../../services/eligibilityService';
import { sendEmailToOwner } from '../../services/emailService';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";

export const useFormActions = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const saveConsultationBooking = async (formData: FormData, eligibilityScore: number) => {
    try {
      const { error } = await supabase.from('consultation_bookings').insert({
        name: formData.name,
        email: formData.email,
        whatsapp: formData.whatsapp,
        academics: formData.academics,
        english_test_type: formData.englishTestType,
        english_score: formData.englishScore,
        backlogs: formData.backlogs,
        budget: formData.budget,
        country: formData.country,
        course: formData.course,
        intake: formData.intake,
        eligibility_score: eligibilityScore
      });

      if (error) {
        console.error("Error saving consultation booking:", error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error("Error saving consultation booking:", error);
      return false;
    }
  };

  const handleBookCounseling = async (formData: FormData, result: EligibilityResult) => {
    setIsSubmitting(true);
    
    toast({
      title: "Processing request",
      description: "Please wait while we connect you with a counselor...",
    });
    
    // Save to Supabase
    const savedToDatabase = await saveConsultationBooking(formData, result.score);
    
    // Also send email to owner as before
    const emailSent = await sendEmailToOwner({
      formData,
      eligibilityScore: result.score,
      requestType: 'counseling'
    });
    
    setIsSubmitting(false);
    
    if (savedToDatabase && emailSent) {
      toast({
        title: "Booking Scheduled",
        description: "Our counselor will contact you soon!",
      });
    } else if (savedToDatabase) {
      toast({
        title: "Booking Received",
        description: "Your counseling request has been recorded. Our team will contact you soon!",
      });
    } else {
      toast({
        title: "Request Failed",
        description: "There was an error processing your request. Please try again.",
        variant: "destructive"
      });
    }

    return isSubmitting;
  };

  const handleDownloadGuide = async (formData: FormData, result: EligibilityResult) => {
    setIsSubmitting(true);
    
    toast({
      title: "Processing download",
      description: "Preparing your guide...",
    });
    
    // Also save to Supabase when downloading guide
    const savedToDatabase = await saveConsultationBooking(formData, result.score);
    
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

    return isSubmitting;
  };

  return {
    handleBookCounseling,
    handleDownloadGuide,
    isSubmitting
  };
};
