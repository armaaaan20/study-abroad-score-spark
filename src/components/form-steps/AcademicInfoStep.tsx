
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AcademicInfoStepProps {
  formData: {
    academics: number;
    englishTestType: 'IELTS' | 'TOEFL' | 'None';
    englishScore: number;
    backlogs: number;
  };
  handleNumberInputChange: (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => void;
  handleSelectChange: (name: string, value: string) => void;
}

const AcademicInfoStep: React.FC<AcademicInfoStepProps> = ({
  formData,
  handleNumberInputChange,
  handleSelectChange
}) => {
  return (
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
  );
};

export default AcademicInfoStep;
