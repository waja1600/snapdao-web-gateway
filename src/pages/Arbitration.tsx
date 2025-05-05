
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gavel, FileText, Handshake } from "lucide-react";

const Arbitration = () => {
  const { t } = useLanguage();
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{t('arbitration')}</h1>
        </div>
        
        <Tabs defaultValue="active">
          <TabsList className="mb-4">
            <TabsTrigger value="active">{t('activeDisputes')}</TabsTrigger>
            <TabsTrigger value="resolved">{t('resolvedDisputes')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active">
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">
                      {t('disputeTitle1')}
                    </CardTitle>
                    <Badge variant="destructive">{t('pending')}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-3">{t('disputeDesc1')}</p>
                  <div className="flex items-center gap-2 text-sm mb-4">
                    <FileText className="h-4 w-4" />
                    <span>{t('contractReference')}: CT-2023-0542</span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="outline">
                      {t('viewDetails')}
                    </Button>
                    <Button size="sm">
                      <Gavel className="h-4 w-4 mr-2" />
                      {t('initiateArbitration')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">
                      {t('disputeTitle2')}
                    </CardTitle>
                    <Badge variant="secondary">{t('inProgress')}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-3">{t('disputeDesc2')}</p>
                  <div className="flex items-center gap-2 text-sm mb-4">
                    <FileText className="h-4 w-4" />
                    <span>{t('contractReference')}: CT-2023-0126</span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="outline">
                      {t('viewDetails')}
                    </Button>
                    <Button size="sm" variant="secondary">
                      {t('viewArbitrationProcess')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="resolved">
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">
                      {t('disputeTitle3')}
                    </CardTitle>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      {t('resolved')}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-3">{t('disputeDesc3')}</p>
                  <div className="flex items-center gap-2 text-sm mb-4">
                    <Handshake className="h-4 w-4" />
                    <span>{t('resolvedDate')}: 2023-11-15</span>
                  </div>
                  <Button size="sm" variant="outline">
                    {t('viewResolution')}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Arbitration;
