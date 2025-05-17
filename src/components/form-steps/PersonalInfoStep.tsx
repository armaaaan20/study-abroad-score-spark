
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

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
  );
};

export default PersonalInfoStep;
