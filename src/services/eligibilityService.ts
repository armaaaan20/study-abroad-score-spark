export interface FormData {
  name: string;
  email: string;
  whatsapp: string;
  academics: number;
  englishScore: number;
  englishTestType: 'IELTS' | 'TOEFL' | 'None';
  budget: number;
  country: string;
  course: string;
  backlogs: number;
  intake: string;
}

export interface EligibilityResult {
  score: number;
  country: string;
  breakdown: {
    academics: number;
    englishScore: number;
    budget: number;
    backlogs: number;
    countryMatch: number;
  };
  message: string;
}

const HIGH_DEMAND_COUNTRIES = ['Germany', 'Canada', 'Australia', 'UK', 'USA'];

export function calculateEligibility(formData: FormData): EligibilityResult {
  // Initialize score breakdown
  const breakdown = {
    academics: 0,
    englishScore: 0,
    budget: 0,
    backlogs: 0,
    countryMatch: 0
  };

  // Academic score (25%)
  if (formData.academics >= 75) {
    breakdown.academics = 25;
  } else if (formData.academics >= 60) {
    breakdown.academics = 15;
  } else {
    breakdown.academics = 5;
  }

  // English test score (20%)
  if (formData.englishTestType === 'IELTS') {
    if (formData.englishScore >= 6.5) {
      breakdown.englishScore = 20;
    } else if (formData.englishScore >= 6.0) {
      breakdown.englishScore = 15;
    } else {
      breakdown.englishScore = 5;
    }
  } else if (formData.englishTestType === 'TOEFL') {
    if (formData.englishScore >= 90) {
      breakdown.englishScore = 20;
    } else if (formData.englishScore >= 80) {
      breakdown.englishScore = 15;
    } else {
      breakdown.englishScore = 5;
    }
  }

  // Budget (20%)
  if (formData.budget >= 1500000) { // ₹15L
    breakdown.budget = 20;
  } else if (formData.budget >= 1000000) { // ₹10L
    breakdown.budget = 15;
  } else {
    breakdown.budget = 5;
  }

  // Backlogs (10%)
  if (formData.backlogs === 0) {
    breakdown.backlogs = 10;
  } else if (formData.backlogs <= 2) {
    breakdown.backlogs = 5;
  }

  // Country Match (10%)
  if (HIGH_DEMAND_COUNTRIES.includes(formData.country)) {
    breakdown.countryMatch = 10;
  } else {
    breakdown.countryMatch = 5;
  }

  // Calculate total score
  let totalScore = 
    breakdown.academics + 
    breakdown.englishScore + 
    breakdown.budget + 
    breakdown.backlogs + 
    breakdown.countryMatch;

  // Boost the score to keep students motivated (minimum 45%, maximum 89%)
  totalScore = Math.max(Math.min(Math.round(totalScore * 1.5), 89), 45);

  return {
    score: totalScore,
    country: formData.country,
    breakdown: breakdown,
    message: `You're on the right track! We can help you achieve 100% success for your ${formData.country} dream.`
  };
}
