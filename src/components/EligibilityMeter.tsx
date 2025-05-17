
import React, { useEffect, useState } from 'react';
import { EligibilityResult } from '../services/eligibilityService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface EligibilityMeterProps {
  result: EligibilityResult;
}

const EligibilityMeter: React.FC<EligibilityMeterProps> = ({ result }) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    // Animate the score from 0 to the final result
    const timer = setTimeout(() => {
      setAnimatedScore(result.score);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [result.score]);

  // Determine color based on score
  const getScoreColor = (score: number) => {
    if (score < 40) return 'bg-red-500';
    if (score < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="w-full my-8">
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-brand-700">Eligibility Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-1">
            <span className="text-base font-medium text-gray-600">Your Score</span>
            <span className="text-base font-semibold text-brand-700">{animatedScore}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-6 mb-4">
            <div 
              className={`${getScoreColor(animatedScore)} h-6 rounded-full eligibility-gauge`} 
              style={{ width: `${animatedScore}%` }}
            ></div>
          </div>
        </CardContent>
      </Card>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Score Breakdown</h3>
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-600">Academics</p>
                <p className="text-lg font-semibold text-brand-700">{result.breakdown.academics}%</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-600">English Score</p>
                <p className="text-lg font-semibold text-brand-700">{result.breakdown.englishScore}%</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-600">Budget</p>
                <p className="text-lg font-semibold text-brand-700">{result.breakdown.budget}%</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-600">Backlogs</p>
                <p className="text-lg font-semibold text-brand-700">{result.breakdown.backlogs}%</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-2">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-600">Country Match</p>
                <p className="text-lg font-semibold text-brand-700">{result.breakdown.countryMatch}%</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EligibilityMeter;
