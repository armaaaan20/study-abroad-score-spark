
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import EligibilityMeter from './EligibilityMeter';
import { EligibilityResult, FormData } from '../services/eligibilityService';
import { Mail, Download } from "lucide-react";

interface EligibilityResultsProps {
  result: EligibilityResult;
  formData: FormData;
  isSubmitting: boolean;
  onBookCounseling: () => void;
  onDownloadGuide: () => void;
}

const EligibilityResults: React.FC<EligibilityResultsProps> = ({
  result,
  formData,
  isSubmitting,
  onBookCounseling,
  onDownloadGuide
}) => {
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <div className="inline-flex justify-center items-center w-20 h-20 bg-green-100 rounded-full mb-4">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold mb-2">Great News!</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          You're <span className="font-bold text-brand-600 text-xl">{result.score}% eligible</span> to study 
          <span className="font-bold"> {formData.course}</span> in <span className="font-bold">{formData.country}</span>!
        </p>
      </div>
      
      <Card className="mb-8 shadow-md">
        <CardHeader className="pb-2 bg-brand-50">
          <CardTitle className="text-2xl font-bold text-brand-700">{result.message}</CardTitle>
          <CardDescription className="text-base">Our expert counselors can help you maximize your chances!</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <EligibilityMeter result={result} showBreakdown={false} />
        </CardContent>
      </Card>
      
      <Card className="mb-8 bg-brand-50 border-brand-100 shadow-md">
        <CardContent className="p-6">
          <h4 className="font-semibold text-xl text-brand-800 mb-3">How We Can Help You</h4>
          <p className="text-brand-700 leading-relaxed mb-4">
            Our experts can help improve your profile, select the right university, and maximize your chances of admission with scholarship opportunities.
          </p>
          <ul className="space-y-2 text-brand-700 pl-5">
            <li className="flex items-start">
              <svg className="w-5 h-5 text-brand-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>University selection guidance tailored to your profile</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-brand-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Scholarship matching and application assistance</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-brand-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Visa preparation and documentation support</span>
            </li>
          </ul>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Button 
          onClick={onBookCounseling}
          className="bg-brand-600 hover:bg-brand-700 h-14"
          disabled={isSubmitting}
        >
          <Mail className="mr-3" />
          Book Free Counseling Session
        </Button>
        
        <Button 
          onClick={onDownloadGuide} 
          variant="outline"
          className="border-brand-600 text-brand-600 hover:bg-brand-50 h-14"
          disabled={isSubmitting}
        >
          <Download className="mr-3" />
          Download Free Country Guide
        </Button>
      </div>
    </div>
  );
};

export default EligibilityResults;
