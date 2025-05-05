
import React from "react";
import { useForm } from "react-hook-form";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDAO } from "@/contexts/DAOContext";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { FileText, Gavel } from "lucide-react";

interface ArbitrationFormValues {
  contractId: string;
  clientId: string;
  contractDate: string;
  contractType: string;
  disputeDescription: string;
  disputeReason: string;
  disputeAmount: string;
  contractStatus: string;
  notes: string;
}

export function ArbitrationForm() {
  const { t } = useLanguage();
  const [open, setOpen] = React.useState(false);
  
  const form = useForm<ArbitrationFormValues>({
    defaultValues: {
      contractId: "",
      clientId: "",
      contractDate: "",
      contractType: "",
      disputeDescription: "",
      disputeReason: "",
      disputeAmount: "",
      contractStatus: "",
      notes: ""
    }
  });

  const onSubmit = async (values: ArbitrationFormValues) => {
    try {
      console.log("Submitted values:", values);
      // Here you would typically send the data to your backend
      
      toast.success(t('arbitrationRequestSubmitted'));
      setOpen(false);
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(t('errorSubmittingRequest'));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Gavel className="h-4 w-4 mr-2" />
          {t('requestArbitration')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{t('newArbitrationRequest')}</DialogTitle>
          <DialogDescription>
            {t('fillArbitrationDetails')}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="contractId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('contractReference')}</FormLabel>
                    <FormControl>
                      <Input placeholder="CT-XXXX-XXXX" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="clientId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('clientId')}</FormLabel>
                    <FormControl>
                      <Input placeholder="CL-XXXX" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="contractDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('contractDate')}</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="contractType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('contractType')}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('selectContractType')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="services">{t('servicesContract')}</SelectItem>
                        <SelectItem value="goods">{t('goodsContract')}</SelectItem>
                        <SelectItem value="construction">{t('constructionContract')}</SelectItem>
                        <SelectItem value="consulting">{t('consultingContract')}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="contractStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('contractStatus')}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('selectContractStatus')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="active">{t('active')}</SelectItem>
                      <SelectItem value="onHold">{t('onHold')}</SelectItem>
                      <SelectItem value="expired">{t('expired')}</SelectItem>
                      <SelectItem value="terminated">{t('terminated')}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="disputeDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('disputeDescription')}</FormLabel>
                  <FormControl>
                    <Textarea placeholder={t('describeDispute')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="disputeReason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('disputeReason')}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('selectDisputeReason')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="payment">{t('paymentIssue')}</SelectItem>
                      <SelectItem value="delivery">{t('deliveryIssue')}</SelectItem>
                      <SelectItem value="quality">{t('qualityIssue')}</SelectItem>
                      <SelectItem value="scope">{t('scopeIssue')}</SelectItem>
                      <SelectItem value="termination">{t('terminationIssue')}</SelectItem>
                      <SelectItem value="other">{t('otherIssue')}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="disputeAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('disputeAmount')}</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('additionalNotes')}</FormLabel>
                  <FormControl>
                    <Textarea placeholder={t('anyAdditionalNotes')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                {t('cancel')}
              </Button>
              <Button type="submit">{t('submitRequest')}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
