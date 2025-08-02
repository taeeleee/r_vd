import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Globe, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Customize = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>("character");
  const [activeSubCategory, setActiveSubCategory] = useState<string>("상의");

  const categories = [
    { id: "character", label: "Character", icon: "👤" },
    { id: "background", label: "Background", icon: "🏞️" },
    { id: "exterior", label: "Exterior", icon: "🏠" },
    { id: "interior", label: "Interior", icon: "🛋️" },
  ];

  const characterSubCategories = [
    { id: "상의", label: "상의", icon: "👔" },
    { id: "하의", label: "하의", icon: "👖" },
    { id: "외투", label: "외투", icon: "🧥" },
    { id: "악세서리", label: "악세서리", icon: "💍" },
    { id: "펫", label: "펫", icon: "🐕" },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-lg border-b border-white/20">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-muted-foreground"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-lg font-medium text-foreground">Customize</h1>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Globe className="w-6 h-6" />
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col p-4">
        {/* Character Preview Area */}
        <div className="flex-1 bg-white/60 backdrop-blur-lg border border-white/30 shadow-glass rounded-2xl p-6 mb-4">
          <div className="flex items-center justify-center h-full">
            <div className="w-48 h-64 bg-gradient-to-b from-blue-100 to-blue-200 rounded-xl border-2 border-dashed border-blue-300 flex items-center justify-center">
              <span className="text-blue-500 text-sm">Character Preview</span>
            </div>
          </div>
        </div>

        {/* Category Selection */}
        <div className="mb-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                className={`flex-shrink-0 ${
                  activeCategory === category.id 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-white/70 text-foreground"
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className="mr-2">{category.icon}</span>
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Sub-category Selection (for Character) */}
        {activeCategory === "character" && (
          <div className="mb-4">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {characterSubCategories.map((subCategory) => (
                <Button
                  key={subCategory.id}
                  variant={activeSubCategory === subCategory.id ? "default" : "outline"}
                  size="sm"
                  className={`flex-shrink-0 ${
                    activeSubCategory === subCategory.id 
                      ? "bg-secondary text-secondary-foreground" 
                      : "bg-white/50 text-foreground"
                  }`}
                  onClick={() => setActiveSubCategory(subCategory.id)}
                >
                  <span className="mr-1">{subCategory.icon}</span>
                  {subCategory.label}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Items Grid */}
        <Card className="bg-white/70 backdrop-blur-lg border border-white/30 shadow-glass p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-foreground">
              {activeCategory === "character" ? activeSubCategory : categories.find(c => c.id === activeCategory)?.label} Items
            </h3>
            <Button variant="outline" size="sm" className="bg-white/50">
              <Search className="w-4 h-4 mr-2" />
              Search Online
            </Button>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {Array.from({ length: 9 }).map((_, index) => (
              <div
                key={index}
                className="aspect-square bg-white/80 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-primary transition-colors"
              >
                <span className="text-xs text-gray-400">Item {index + 1}</span>
              </div>
            ))}
          </div>

          {/* Internet Search Button */}
          <Button className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white">
            <Globe className="w-4 h-4 mr-2" />
            Search Internet for More Items
          </Button>
        </Card>
      </main>

      {/* Bottom Action Buttons */}
      <div className="p-4 bg-white/80 backdrop-blur-lg border-t border-white/20">
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1 bg-white/70">
            Reset
          </Button>
          <Button className="flex-1 bg-primary text-primary-foreground">
            Apply Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Customize;