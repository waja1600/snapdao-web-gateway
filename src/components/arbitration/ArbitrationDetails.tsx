
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText, Gavel, Handshake, AlertCircle, Calendar } from "lucide-react";

interface ArbitrationDetailsProps {
  disputeId: string;
  title: string;
  description: string;
  contractReference: string;
  status: "pending" | "inProgress" | "resolved";
  date?: string;
}

export function ArbitrationDetails({ 
  disputeId,
  title,
  description,
  contractReference,
  status,
  date
}: ArbitrationDetailsProps) {
  const { t } = useLanguage();
  const [open, setOpen] = React.useState(false);

  const getStatusColor = () => {
    switch(status) {
      case "pending": return "text-red-500";
      case "inProgress": return "text-amber-500";
      case "resolved": return "text-green-500";
      default: return "text-gray-500";
    }
  };

  const getStatusText = () => {
    switch(status) {
      case "pending": return t("pending");
      case "inProgress": return t("inProgress");
      case "resolved": return t("resolved");
      default: return status;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          {t('viewDetails')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
            <AlertCircle className={`h-5 w-5 ${getStatusColor()}`} />
            <span className="font-medium">{t('status')}: {getStatusText()}</span>
          </div>
          
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-medium text-gray-500">{t('disputeId')}</h3>
            <p>{disputeId}</p>
          </div>
          
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-medium text-gray-500">{t('contractReference')}</h3>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>{contractReference}</span>
            </div>
          </div>
          
          {date && (
            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-medium text-gray-500">
                {status === "resolved" ? t('resolvedDate') : t('submittedDate')}
              </h3>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{date}</span>
              </div>
            </div>
          )}
          
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-medium text-gray-500">{t('description')}</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{description}</p>
          </div>
          
          <div className="space-y-3 pt-4 border-t">
            {status === "pending" && (
              <Button className="w-full">
                <Gavel className="h-4 w-4 mr-2" />
                {t('initiateArbitration')}
              </Button>
            )}
            
            {status === "inProgress" && (
              <Button variant="secondary" className="w-full">
                {t('viewArbitrationProcess')}
              </Button>
            )}
            
            {status === "resolved" && (
              <Button variant="outline" className="w-full">
                <Handshake className="h-4 w-4 mr-2" />
                {t('viewResolution')}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
