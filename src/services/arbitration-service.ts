
export class ArbitrationService {
  private disputes: any[] = [
    {
      id: "ARB-2023-001",
      title: "Payment Delay Dispute",
      titleAr: "نزاع حول تأخير الدفع",
      description: "The client has failed to make payment for services rendered as per the agreed schedule.",
      descriptionAr: "لم يقم العميل بسداد مدفوعات الخدمات المقدمة وفقاً للجدول الزمني المتفق عليه.",
      contractReference: "CT-2023-0542",
      clientId: "CL-2023-156",
      status: "pending",
      createdAt: "2023-12-15",
      updatedAt: null,
      resolvedAt: null
    },
    {
      id: "ARB-2023-002",
      title: "Contract Terms Dispute",
      titleAr: "نزاع حول شروط العقد",
      description: "There is a disagreement about the interpretation of contract terms related to service delivery.",
      descriptionAr: "هناك خلاف حول تفسير شروط العقد المتعلقة بتقديم الخدمة.",
      contractReference: "CT-2023-0126",
      clientId: "CL-2023-098",
      status: "inProgress",
      createdAt: "2023-11-10",
      updatedAt: "2023-11-20",
      resolvedAt: null
    },
    {
      id: "ARB-2023-003",
      title: "Scope of Work Dispute",
      titleAr: "نزاع حول نطاق العمل",
      description: "Resolved dispute regarding the scope of work covered by the contract.",
      descriptionAr: "تم حل النزاع المتعلق بنطاق العمل الذي يغطيه العقد.",
      contractReference: "CT-2023-0098",
      clientId: "CL-2023-045",
      status: "resolved",
      createdAt: "2023-10-05",
      updatedAt: "2023-11-10",
      resolvedAt: "2023-11-15"
    }
  ];

  getAllDisputes() {
    return this.disputes;
  }

  getActiveDisputes() {
    return this.disputes.filter(dispute => 
      dispute.status === "pending" || dispute.status === "inProgress"
    );
  }

  getResolvedDisputes() {
    return this.disputes.filter(dispute => dispute.status === "resolved");
  }

  getDisputeById(id: string) {
    return this.disputes.find(dispute => dispute.id === id);
  }

  createDispute(disputeData: any) {
    // In a real app, this would include validation and API calls
    const newDispute = {
      id: `ARB-${new Date().getFullYear()}-${String(this.disputes.length + 1).padStart(3, '0')}`,
      ...disputeData,
      status: "pending",
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: null,
      resolvedAt: null
    };
    
    this.disputes.push(newDispute);
    return newDispute;
  }

  updateDisputeStatus(id: string, newStatus: string) {
    const dispute = this.getDisputeById(id);
    if (!dispute) return false;
    
    dispute.status = newStatus;
    dispute.updatedAt = new Date().toISOString().split('T')[0];
    
    if (newStatus === "resolved") {
      dispute.resolvedAt = new Date().toISOString().split('T')[0];
    }
    
    return true;
  }
}
