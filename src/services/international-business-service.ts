
// Harvard Business School + WTO + UNCITRAL Service
export interface BusinessFramework {
  id: string;
  name: string;
  standard: 'ISO_44001' | 'UNCITRAL' | 'WTO' | 'HARVARD' | 'ICC';
  description: string;
  applicableServices: string[];
}

export interface LegalJurisdiction {
  code: string;
  name: string;
  companyLaw: string;
  tradeLaw: string;
  arbitrationSupported: boolean;
  digitalSignatureValid: boolean;
}

export interface ServiceGateway {
  id: string;
  name: string;
  businessObjective: string;
  legalModel: string;
  framework: BusinessFramework;
  requiredDocuments: string[];
  workflowSteps: string[];
}

export class InternationalBusinessService {
  private frameworks: BusinessFramework[] = [
    {
      id: 'iso_44001',
      name: 'ISO 44001 - Collaborative Business Relationship Management',
      standard: 'ISO_44001',
      description: 'International standard for collaborative business relationships',
      applicableServices: ['cooperative_buying', 'cooperative_marketing', 'supplier_management']
    },
    {
      id: 'uncitral',
      name: 'UNCITRAL Model Law on Electronic Commerce',
      standard: 'UNCITRAL',
      description: 'International framework for electronic contracts and arbitration',
      applicableServices: ['contract_negotiation', 'arbitration', 'digital_signatures']
    },
    {
      id: 'harvard_negotiation',
      name: 'Harvard Negotiation Model',
      standard: 'HARVARD',
      description: 'Principled negotiation framework',
      applicableServices: ['group_negotiation', 'supplier_negotiation', 'freelancer_contracts']
    }
  ];

  private jurisdictions: LegalJurisdiction[] = [
    {
      code: 'EG',
      name: 'Egypt (GAFI)',
      companyLaw: 'Egyptian Companies Law 159/1981',
      tradeLaw: 'Egyptian Commercial Law',
      arbitrationSupported: true,
      digitalSignatureValid: true
    },
    {
      code: 'US_DE',
      name: 'Delaware, USA',
      companyLaw: 'Delaware General Corporation Law',
      tradeLaw: 'UCC - Uniform Commercial Code',
      arbitrationSupported: true,
      digitalSignatureValid: true
    },
    {
      code: 'UK',
      name: 'United Kingdom',
      companyLaw: 'Companies Act 2006',
      tradeLaw: 'UK Commercial Law',
      arbitrationSupported: true,
      digitalSignatureValid: true
    },
    {
      code: 'EE',
      name: 'Estonia (e-Residency)',
      companyLaw: 'Estonian Commercial Code',
      tradeLaw: 'Estonian Contract Law',
      arbitrationSupported: true,
      digitalSignatureValid: true
    },
    {
      code: 'AE',
      name: 'UAE (ADGM/DIFC)',
      companyLaw: 'UAE Federal Law No. 2/2015',
      tradeLaw: 'UAE Commercial Transactions Law',
      arbitrationSupported: true,
      digitalSignatureValid: true
    }
  ];

  private serviceGateways: ServiceGateway[] = [
    {
      id: 'cooperative_buying',
      name: 'الشراء التعاوني',
      businessObjective: 'Aggregated Procurement',
      legalModel: 'Framework Agreements',
      framework: this.frameworks[0], // ISO 44001
      requiredDocuments: ['RFQ', 'Framework Agreement Template', 'KYC Documents'],
      workflowSteps: ['Group Formation', 'Supplier Sourcing', 'Negotiation', 'Contract Signing', 'Delivery Management']
    },
    {
      id: 'cooperative_marketing',
      name: 'التسويق التعاوني',
      businessObjective: 'Strategic Marketing Partnerships',
      legalModel: 'LOIs – MOUs',
      framework: this.frameworks[0], // ISO 44001
      requiredDocuments: ['Marketing Brief', 'Budget Allocation', 'IP Rights Agreement'],
      workflowSteps: ['Campaign Planning', 'Resource Pooling', 'Execution', 'Performance Tracking']
    },
    {
      id: 'company_formation',
      name: 'تأسيس الشركات',
      businessObjective: 'Market Entry – Jurisdiction Selection',
      legalModel: 'Companies Act + Delaware + GAFI',
      framework: this.frameworks[1], // UNCITRAL
      requiredDocuments: ['Articles of Incorporation', 'Shareholder Agreement', 'Board Resolutions'],
      workflowSteps: ['Jurisdiction Selection', 'Name Reservation', 'Documentation', 'Registration', 'Compliance Setup']
    },
    {
      id: 'supplier_sourcing',
      name: 'بوابة الموردين',
      businessObjective: 'Supplier Sourcing & Due Diligence',
      legalModel: 'RFQs + ITT',
      framework: this.frameworks[2], // Harvard Negotiation
      requiredDocuments: ['Supplier Qualification', 'Financial Statements', 'Compliance Certificates'],
      workflowSteps: ['Sourcing', 'Due Diligence', 'Evaluation', 'Negotiation', 'Contract Award']
    },
    {
      id: 'freelancer_management',
      name: 'المستقلين',
      businessObjective: 'Freelance & Advisory Economy',
      legalModel: 'SLA + Time-based Contracts',
      framework: this.frameworks[2], // Harvard Negotiation
      requiredDocuments: ['Skills Assessment', 'Portfolio', 'SLA Template'],
      workflowSteps: ['Assessment', 'Verification', 'Matching', 'Contract', 'Delivery', 'Payment']
    },
    {
      id: 'arbitration_ipfs',
      name: 'التحكيم والتوثيق',
      businessObjective: 'Conflict Resolution & Digital Evidence',
      legalModel: 'ORDA + UNCITRAL + IPFS',
      framework: this.frameworks[1], // UNCITRAL
      requiredDocuments: ['Dispute Notice', 'Evidence Files', 'Arbitrator Selection'],
      workflowSteps: ['Filing', 'Evidence Submission', 'Hearing', 'Decision', 'Enforcement']
    }
  ];

  getServiceGateways(): ServiceGateway[] {
    return this.serviceGateways;
  }

  getJurisdictions(): LegalJurisdiction[] {
    return this.jurisdictions;
  }

  getFrameworks(): BusinessFramework[] {
    return this.frameworks;
  }

  getServiceByType(serviceType: string): ServiceGateway | undefined {
    return this.serviceGateways.find(s => s.id === serviceType);
  }

  validateBusinessFramework(serviceType: string, framework: string): boolean {
    const service = this.getServiceByType(serviceType);
    return service?.framework.standard === framework;
  }
}

export const internationalBusinessService = new InternationalBusinessService();
