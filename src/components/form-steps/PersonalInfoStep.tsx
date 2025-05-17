
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';

interface PersonalInfoStepProps {
  formData: {
    name: string;
    email: string;
    whatsapp: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
  formData,
  handleInputChange
}) => {
  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Label htmlFor="name">Full Name*</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Enter your name as it appears on official documents</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Input
          id="name"
          name="name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="mt-1"
        />
        <p className="text-xs text-gray-500 mt-1">As per your passport or academic documents</p>
      </div>
      
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Label htmlFor="email">Email Address*</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">We'll send important updates to this email</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
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
        <p className="text-xs text-gray-500 mt-1">You'll receive important updates on this email</p>
      </div>
      
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Label htmlFor="whatsapp">WhatsApp Number (with country code)*</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Include your country code (e.g. +91 for India)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Input
          id="whatsapp"
          name="whatsapp"
          placeholder="+91XXXXXXXXXX"
          value={formData.whatsapp}
          onChange={handleInputChange}
          required
          className="mt-1"
        />
        <p className="text-xs text-gray-500 mt-1">Our counselor may contact you on this number</p>
      </div>
    </div>
  );
};

export default PersonalInfoStep;
