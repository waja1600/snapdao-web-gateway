
import { toast } from "sonner";

export class AgreementService {
  async signAgreement(agreementId: string, password: string, otp: string): Promise<boolean> {
    try {
      // Simulate signing agreement
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (otp.length === 6 && /^\d+$/.test(otp) && password.length >= 6) {
        toast.success("Agreement signed successfully");
        return true;
      } else {
        toast.error("Invalid credentials");
        return false;
      }
    } catch (error) {
      console.error("Failed to sign agreement:", error);
      toast.error("Failed to sign agreement");
      return false;
    }
  }
}
