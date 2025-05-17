
import React, { useEffect, useState } from 'react';
import { EligibilityResult } from '../services/eligibilityService';

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
    <div className="w-full my-6">
      <div className="flex justify-between mb-1">
        <span className="text-base font-medium text-brand-700">Eligibility Score</span>
        <span className="text-sm font-medium text-brand-700">{animatedScore}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-6">
        <div 
          className={`${getScoreColor(animatedScore)} h-6 rounded-full eligibility-gauge`} 
          style={{ width: `${animatedScore}%` }}
        ></div>
      </div>
      
      <div className="mt-6 space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Score Breakdown:</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600">Academics</p>
            <p className="text-lg font-semibold">{result.breakdown.academics}%</p>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600">English Score</p>
            <p className="text-lg font-semibold">{result.breakdown.englishScore}%</p>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600">Budget</p>
            <p className="text-lg font-semibold">{result.breakdown.budget}%</p>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600">Backlogs</p>
            <p className="text-lg font-semibold">{result.breakdown.backlogs}%</p>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm col-span-2">
            <p className="text-sm text-gray-600">Country Match</p>
            <p className="text-lg font-semibold">{result.breakdown.countryMatch}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EligibilityMeter;
