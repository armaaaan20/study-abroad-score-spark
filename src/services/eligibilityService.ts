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

// Constants for eligibility calculation
const HIGH_DEMAND_COUNTRIES = ['Germany', 'Canada', 'Australia', 'UK', 'USA'];
const MODERATE_DEMAND_COUNTRIES = ['Netherlands', 'France', 'Sweden', 'New Zealand', 'Singapore', 'Ireland'];
const COUNTRY_DIFFICULTY = {
  'USA': 0.95,
  'UK': 0.92,
  'Canada': 0.88,
  'Australia': 0.85,
  'Germany': 0.82,
  'Singapore': 0.80,
  'Netherlands': 0.78,
  'France': 0.75,
  'Sweden': 0.75,
  'Ireland': 0.72,
  'New Zealand': 0.70,
};

// Courses with higher competition
const COMPETITIVE_COURSES = [
  'Computer Science', 'Data Science', 'Artificial Intelligence', 'Medicine',
  'Business Administration', 'MBA', 'Finance', 'Engineering'
];

export function calculateEligibility(formData: FormData): EligibilityResult {
  // Initialize score breakdown
  const breakdown = {
    academics: 0,
    englishScore: 0,
    budget: 0,
    backlogs: 0,
    countryMatch: 0
  };
  
  // Academic score (30%)
  if (formData.academics >= 85) {
    breakdown.academics = 30;
  } else if (formData.academics >= 75) {
    breakdown.academics = 25;
  } else if (formData.academics >= 65) {
    breakdown.academics = 20;
  } else if (formData.academics >= 60) {
    breakdown.academics = 15;
  } else {
    breakdown.academics = Math.max(5, Math.floor(formData.academics / 10));
  }

  // English test score (25%)
  if (formData.englishTestType === 'IELTS') {
    if (formData.englishScore >= 7.5) {
      breakdown.englishScore = 25;
    } else if (formData.englishScore >= 7.0) {
      breakdown.englishScore = 20;
    } else if (formData.englishScore >= 6.5) {
      breakdown.englishScore = 15;
    } else if (formData.englishScore >= 6.0) {
      breakdown.englishScore = 10;
    } else {
      breakdown.englishScore = 5;
    }
  } else if (formData.englishTestType === 'TOEFL') {
    if (formData.englishScore >= 100) {
      breakdown.englishScore = 25;
    } else if (formData.englishScore >= 90) {
      breakdown.englishScore = 20;
    } else if (formData.englishScore >= 80) {
      breakdown.englishScore = 15;
    } else if (formData.englishScore >= 70) {
      breakdown.englishScore = 10;
    } else {
      breakdown.englishScore = 5;
    }
  } else {
    // No English test
    breakdown.englishScore = 5;
  }

  // Budget (20%)
  const highBudgetThreshold = formData.country === 'USA' || formData.country === 'UK' ? 2000000 : 1500000;
  const mediumBudgetThreshold = formData.country === 'USA' || formData.country === 'UK' ? 1500000 : 1000000;
  
  if (formData.budget >= highBudgetThreshold) {
    breakdown.budget = 20;
  } else if (formData.budget >= mediumBudgetThreshold) {
    breakdown.budget = 15;
  } else if (formData.budget >= 800000) {
    breakdown.budget = 10;
  } else {
    breakdown.budget = 5;
  }

  // Backlogs (15%)
  if (formData.backlogs === 0) {
    breakdown.backlogs = 15;
  } else if (formData.backlogs === 1) {
    breakdown.backlogs = 10;
  } else if (formData.backlogs <= 3) {
    breakdown.backlogs = 5;
  } else {
    breakdown.backlogs = 0;
  }

  // Country Match & Course Competition (10%)
  if (HIGH_DEMAND_COUNTRIES.includes(formData.country)) {
    breakdown.countryMatch = 10;
  } else if (MODERATE_DEMAND_COUNTRIES.includes(formData.country)) {
    breakdown.countryMatch = 7;
  } else {
    breakdown.countryMatch = 5;
  }

  // Calculate raw score
  let rawScore = 
    breakdown.academics + 
    breakdown.englishScore + 
    breakdown.budget + 
    breakdown.backlogs + 
    breakdown.countryMatch;
  
  // Apply country difficulty factor
  const countryFactor = COUNTRY_DIFFICULTY[formData.country as keyof typeof COUNTRY_DIFFICULTY] || 0.85;
  
  // Apply course competition factor
  let courseFactor = 1.0;
  if (COMPETITIVE_COURSES.some(course => formData.course.includes(course))) {
    courseFactor = 0.92;
  }
  
  // Add some realistic variance (±5%)
  const varianceFactor = 1 + (Math.random() * 0.1 - 0.05);
  
  // Calculate final score with all factors
  let finalScore = Math.round(rawScore * countryFactor * courseFactor * varianceFactor);
  
  // Keep score in realistic range (35-85% for most applications)
  finalScore = Math.max(Math.min(finalScore, 85), 35);

  // Generate appropriate message based on score
  let message = "";
  if (finalScore >= 75) {
    message = `You have an excellent chance of admission to ${formData.country}! With our guidance, we can help you maximize scholarship opportunities.`;
  } else if (finalScore >= 60) {
    message = `You have a good profile for studying in ${formData.country}. With some profile improvements, you can significantly boost your chances.`;
  } else if (finalScore >= 45) {
    message = `Your profile shows potential for ${formData.country}. Our experts can help strengthen your application to improve your chances.`;
  } else {
    message = `We can help you build a stronger profile for ${formData.country} or suggest alternative destinations where you'll have better chances.`;
  }

  return {
    score: finalScore,
    country: formData.country,
    breakdown: breakdown,
    message: message
  };
}
