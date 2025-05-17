
import { FormData } from './eligibilityService';
import emailjs from '@emailjs/browser';

export interface EmailSubmission {
  formData: FormData;
  eligibilityScore: number;
  requestType: 'counseling' | 'guide';
}

export async function sendEmailToOwner(submission: EmailSubmission): Promise<boolean> {
  try {
    // In a real implementation, you would integrate with an email service
    // like EmailJS, FormSubmit, or a custom backend API endpoint
    
    console.log('Sending email with data:', submission);
    
    // Include specific course details from the form data
    const emailData = {
      name: submission.formData.name,
      email: submission.formData.email,
      whatsapp: submission.formData.whatsapp,
      score: submission.eligibilityScore,
      requestType: submission.requestType,
      course: submission.formData.course,
      country: submission.formData.country,
      intake: submission.formData.intake,
      budget: submission.formData.budget,
      academics: submission.formData.academics
    };
    
    console.log('Prepared email data:', emailData);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // This is a simulation of sending an email
    // In a production environment, you would use actual API keys
    // Example with EmailJS:
    // await emailjs.send(
    //   'YOUR_SERVICE_ID',
    //   'YOUR_TEMPLATE_ID',
    //   emailData,
    //   'YOUR_PUBLIC_KEY'
    // );
    
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}
