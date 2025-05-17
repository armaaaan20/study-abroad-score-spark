
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface StudyPreferencesStepProps {
  formData: {
    budget: number;
    country: string;
  };
  handleNumberInputChange: (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => void;
  handleSelectChange: (name: string, value: string) => void;
}

const StudyPreferencesStep: React.FC<StudyPreferencesStepProps> = ({
  formData,
  handleNumberInputChange,
  handleSelectChange
}) => {
  return (
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
  );
};

export default StudyPreferencesStep;
