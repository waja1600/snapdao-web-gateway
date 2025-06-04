
// Harvard Business School Negotiation Framework Implementation
export interface HarvardNegotiationPrinciple {
  id: string;
  name: string;
  description: string;
  application: string;
}

export interface NegotiationSession {
  id: string;
  groupId: string;
  participants: string[];
  currentPhase: 'preparation' | 'opening' | 'bargaining' | 'closing' | 'implementation';
  principles: HarvardNegotiationPrinciple[];
  positions: NegotiationPosition[];
  interests: NegotiationInterest[];
  options: NegotiationOption[];
  criteria: ObjectiveCriteria[];
  batna: BATNA[];
  agreements: Agreement[];
  createdAt: Date;
  updatedAt: Date;
}

export interface NegotiationPosition {
  participantId: string;
  statement: string;
  underlyingInterests: string[];
  flexibility: 'rigid' | 'moderate' | 'flexible';
}

export interface NegotiationInterest {
  participantId: string;
  type: 'financial' | 'operational' | 'strategic' | 'legal' | 'personal';
  description: string;
  priority: 'high' | 'medium' | 'low';
  shared: boolean;
}

export interface NegotiationOption {
  id: string;
  description: string;
  beneficiaries: string[];
  value: number;
  feasibility: 'high' | 'medium' | 'low';
  creativeSolution: boolean;
}

export interface ObjectiveCriteria {
  id: string;
  name: string;
  type: 'market_standard' | 'legal_requirement' | 'industry_benchmark' | 'expert_opinion';
  value: any;
  source: string;
  acceptedBy: string[];
}

export interface BATNA {
  participantId: string;
  alternatives: Alternative[];
  bestAlternative: string;
  walkAwayPoint: number;
}

export interface Alternative {
  id: string;
  description: string;
  value: number;
  probability: number;
  timeframe: string;
}

export interface Agreement {
  id: string;
  clause: string;
  agreedValue: any;
  participants: string[];
  objectiveBasis: string;
  implementationSteps: string[];
  successMetrics: string[];
  contingencies: string[];
  signedAt: Date;
}

export class HarvardNegotiationService {
  private principles: HarvardNegotiationPrinciple[] = [
    {
      id: 'people_problem',
      name: 'Separate People from the Problem',
      description: 'Focus on the substantive problem, not personal conflicts',
      application: 'Address relationship issues separately from substantive negotiations'
    },
    {
      id: 'interests_positions',
      name: 'Focus on Interests, Not Positions',
      description: 'Identify underlying needs and concerns behind stated positions',
      application: 'Ask "why" and "why not" to uncover real interests'
    },
    {
      id: 'options_gain',
      name: 'Generate Options for Mutual Gain',
      description: 'Create multiple solutions before deciding',
      application: 'Brainstorm creative solutions that benefit all parties'
    },
    {
      id: 'objective_criteria',
      name: 'Use Objective Criteria',
      description: 'Base agreements on fair standards independent of will',
      application: 'Reference market prices, legal standards, expert opinions'
    }
  ];

  private sessions: NegotiationSession[] = [];

  startNegotiationSession(groupId: string, participants: string[]): NegotiationSession {
    const session: NegotiationSession = {
      id: `NEG-${Date.now()}`,
      groupId,
      participants,
      currentPhase: 'preparation',
      principles: this.principles,
      positions: [],
      interests: [],
      options: [],
      criteria: [],
      batna: [],
      agreements: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.sessions.push(session);
    return session;
  }

  addPosition(sessionId: string, participantId: string, statement: string, interests: string[]): boolean {
    const session = this.sessions.find(s => s.id === sessionId);
    if (!session) return false;

    session.positions.push({
      participantId,
      statement,
      underlyingInterests: interests,
      flexibility: 'moderate'
    });

    session.updatedAt = new Date();
    return true;
  }

  identifyInterests(sessionId: string, participantId: string, interests: Omit<NegotiationInterest, 'participantId'>[]): boolean {
    const session = this.sessions.find(s => s.id === sessionId);
    if (!session) return false;

    interests.forEach(interest => {
      session.interests.push({
        ...interest,
        participantId
      });
    });

    session.updatedAt = new Date();
    return true;
  }

  generateOptions(sessionId: string, options: Omit<NegotiationOption, 'id'>[]): boolean {
    const session = this.sessions.find(s => s.id === sessionId);
    if (!session) return false;

    options.forEach(option => {
      session.options.push({
        ...option,
        id: `OPT-${Date.now()}-${Math.random()}`
      });
    });

    session.currentPhase = 'bargaining';
    session.updatedAt = new Date();
    return true;
  }

  establishCriteria(sessionId: string, criteria: Omit<ObjectiveCriteria, 'id' | 'acceptedBy'>[]): boolean {
    const session = this.sessions.find(s => s.id === sessionId);
    if (!session) return false;

    criteria.forEach(criterion => {
      session.criteria.push({
        ...criterion,
        id: `CRIT-${Date.now()}-${Math.random()}`,
        acceptedBy: []
      });
    });

    session.updatedAt = new Date();
    return true;
  }

  developBATNA(sessionId: string, participantId: string, alternatives: Alternative[]): boolean {
    const session = this.sessions.find(s => s.id === sessionId);
    if (!session) return false;

    const bestAlternative = alternatives.reduce((best, current) => 
      current.value * current.probability > best.value * best.probability ? current : best
    );

    const batna: BATNA = {
      participantId,
      alternatives,
      bestAlternative: bestAlternative.id,
      walkAwayPoint: bestAlternative.value * bestAlternative.probability * 0.8 // 80% of best alternative
    };

    // Remove existing BATNA for this participant
    session.batna = session.batna.filter(b => b.participantId !== participantId);
    session.batna.push(batna);

    session.updatedAt = new Date();
    return true;
  }

  reachAgreement(sessionId: string, agreement: Omit<Agreement, 'id' | 'signedAt'>): boolean {
    const session = this.sessions.find(s => s.id === sessionId);
    if (!session) return false;

    const finalAgreement: Agreement = {
      ...agreement,
      id: `AGR-${Date.now()}`,
      signedAt: new Date()
    };

    session.agreements.push(finalAgreement);
    session.currentPhase = 'implementation';
    session.updatedAt = new Date();
    return true;
  }

  assessNegotiationQuality(sessionId: string): {
    scoreByPrinciple: Record<string, number>;
    overallScore: number;
    recommendations: string[];
  } {
    const session = this.sessions.find(s => s.id === sessionId);
    if (!session) throw new Error('Session not found');

    const scores = {
      people_problem: this.assessPeopleProblemSeparation(session),
      interests_positions: this.assessInterestsFocus(session),
      options_gain: this.assessOptionGeneration(session),
      objective_criteria: this.assessObjectiveCriteria(session)
    };

    const overallScore = Object.values(scores).reduce((sum, score) => sum + score, 0) / 4;

    const recommendations = this.generateRecommendations(session, scores);

    return {
      scoreByPrinciple: scores,
      overallScore,
      recommendations
    };
  }

  private assessPeopleProblemSeparation(session: NegotiationSession): number {
    // Assess if relationship issues were handled separately
    return 8; // Placeholder scoring logic
  }

  private assessInterestsFocus(session: NegotiationSession): number {
    const interestToPositionRatio = session.interests.length / Math.max(session.positions.length, 1);
    return Math.min(interestToPositionRatio * 5, 10);
  }

  private assessOptionGeneration(session: NegotiationSession): number {
    const creativeSolutions = session.options.filter(o => o.creativeSolution).length;
    return Math.min(creativeSolutions * 2, 10);
  }

  private assessObjectiveCriteria(session: NegotiationSession): number {
    const criteriaUsed = session.agreements.filter(a => a.objectiveBasis).length;
    return Math.min(criteriaUsed * 3, 10);
  }

  private generateRecommendations(session: NegotiationSession, scores: Record<string, number>): string[] {
    const recommendations: string[] = [];

    if (scores.people_problem < 7) {
      recommendations.push('Focus more on separating relationship issues from substantive problems');
    }
    if (scores.interests_positions < 7) {
      recommendations.push('Spend more time understanding underlying interests');
    }
    if (scores.options_gain < 7) {
      recommendations.push('Generate more creative options for mutual gain');
    }
    if (scores.objective_criteria < 7) {
      recommendations.push('Use more objective criteria for decision making');
    }

    return recommendations;
  }

  getSessions(): NegotiationSession[] {
    return this.sessions;
  }

  getSessionById(id: string): NegotiationSession | undefined {
    return this.sessions.find(s => s.id === id);
  }
}

export const harvardNegotiationService = new HarvardNegotiationService();
