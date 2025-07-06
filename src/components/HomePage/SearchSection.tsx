
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";

export const SearchSection = () => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGateway, setSelectedGateway] = useState("all");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedSector, setSelectedSector] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const handleSearch = () => {
    console.log("Search:", { searchTerm, selectedGateway, selectedCountry, selectedSector, selectedStatus });
  };

  return (
    <section className="section-spacing px-4 bg-gradient-to-br from-muted/30 to-background">
      <div className="container-responsive">
        <Card className="card shadow-[var(--shadow-elevated)]">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-6 text-center text-foreground">
              {language === 'en' ? 'Find Open Opportunities' : 'ابحث عن الفرص المفتوحة'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              <div className="lg:col-span-2">
                <Input
                  placeholder={language === 'en' ? 'Search groups, services...' : 'البحث في المجموعات والخدمات...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select value={selectedGateway} onValueChange={setSelectedGateway}>
                <SelectTrigger>
                  <SelectValue placeholder={language === 'en' ? 'Gateway' : 'البوابة'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{language === 'en' ? 'All Gateways' : 'جميع البوابات'}</SelectItem>
                  <SelectItem value="buying">{language === 'en' ? 'Cooperative Buying' : 'الشراء التعاوني'}</SelectItem>
                  <SelectItem value="marketing">{language === 'en' ? 'Cooperative Marketing' : 'التسويق التعاوني'}</SelectItem>
                  <SelectItem value="freelancers">{language === 'en' ? 'Freelancers' : 'المستقلين'}</SelectItem>
                  <SelectItem value="suppliers">{language === 'en' ? 'Suppliers' : 'الموردين'}</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger>
                  <SelectValue placeholder={language === 'en' ? 'Country' : 'الدولة'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{language === 'en' ? 'All Countries' : 'جميع البلدان'}</SelectItem>
                  <SelectItem value="sa">{language === 'en' ? 'Saudi Arabia' : 'السعودية'}</SelectItem>
                  <SelectItem value="ae">{language === 'en' ? 'UAE' : 'الإمارات'}</SelectItem>
                  <SelectItem value="eg">{language === 'en' ? 'Egypt' : 'مصر'}</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedSector} onValueChange={setSelectedSector}>
                <SelectTrigger>
                  <SelectValue placeholder={language === 'en' ? 'Sector' : 'القطاع'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{language === 'en' ? 'All Sectors' : 'جميع القطاعات'}</SelectItem>
                  <SelectItem value="tech">{language === 'en' ? 'Technology' : 'التكنولوجيا'}</SelectItem>
                  <SelectItem value="food">{language === 'en' ? 'Food & Beverage' : 'الأغذية والمشروبات'}</SelectItem>
                  <SelectItem value="medical">{language === 'en' ? 'Medical Equipment' : 'المعدات الطبية'}</SelectItem>
                </SelectContent>
              </Select>

              <Button 
                onClick={handleSearch} 
                className="w-full bg-gpo-primary hover:bg-gpo-primary-dark text-white"
              >
                <Search className="w-4 h-4 mr-2" />
                {language === 'en' ? 'Search' : 'بحث'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
