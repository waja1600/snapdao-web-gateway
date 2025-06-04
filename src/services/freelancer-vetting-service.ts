
export interface FreelancerAssessment {
  id: string;
  freelancerId: string;
  testScore: number;
  documentsVerified: boolean;
  skillsAssessed: string[];
  aiGrade: 'A' | 'B' | 'C' | 'D' | 'F';
  verificationBadge: boolean;
  assessmentDate: Date;
  specializations: string[];
}

export interface AssessmentQuestion {
  id: string;
  category: string;
  question: string;
  type: 'multiple_choice' | 'code' | 'essay';
  options?: string[];
  correctAnswer?: string;
  points: number;
}

export interface DocumentVerification {
  type: 'id' | 'education' | 'certification' | 'portfolio';
  status: 'pending' | 'verified' | 'rejected';
  url: string;
  verifiedBy?: string;
  verificationDate?: Date;
}

export class FreelancerVettingService {
  private assessments: FreelancerAssessment[] = [];
  
  getAssessmentQuestions(specialization: string): AssessmentQuestion[] {
    const baseQuestions: AssessmentQuestion[] = [
      {
        id: '1',
        category: 'Technical',
        question: 'Which methodology is best for agile project management?',
        type: 'multiple_choice',
        options: ['Waterfall', 'Scrum', 'Kanban', 'All of the above'],
        correctAnswer: 'All of the above',
        points: 10
      },
      {
        id: '2',
        category: 'Business',
        question: 'Explain Harvard Business School\'s approach to negotiation strategy.',
        type: 'essay',
        points: 20
      }
    ];

    // Add specialization-specific questions
    if (specialization === 'development') {
      baseQuestions.push({
        id: '3',
        category: 'Development',
        question: 'Write a function to implement a binary search algorithm.',
        type: 'code',
        points: 25
      });
    }

    return baseQuestions;
  }

  async conductAssessment(freelancerId: string, answers: Record<string, string>): Promise<FreelancerAssessment> {
    // Simulate AI grading
    const score = Math.floor(Math.random() * 100);
    let grade: 'A' | 'B' | 'C' | 'D' | 'F';
    
    if (score >= 90) grade = 'A';
    else if (score >= 80) grade = 'B';
    else if (score >= 70) grade = 'C';
    else if (score >= 60) grade = 'D';
    else grade = 'F';

    const assessment: FreelancerAssessment = {
      id: Date.now().toString(),
      freelancerId,
      testScore: score,
      documentsVerified: true,
      skillsAssessed: ['project_management', 'communication', 'technical_skills'],
      aiGrade: grade,
      verificationBadge: grade !== 'F',
      assessmentDate: new Date(),
      specializations: ['general']
    };

    this.assessments.push(assessment);
    return assessment;
  }

  getFreelancerAssessment(freelancerId: string): FreelancerAssessment | undefined {
    return this.assessments.find(a => a.freelancerId === freelancerId);
  }

  verifyDocuments(freelancerId: string, documents: DocumentVerification[]): boolean {
    // Simulate document verification process
    return documents.every(doc => doc.status === 'verified');
  }
}

export const vettingService = new FreelancerVettingService();
