import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Image, Scissors, Sparkles, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";

const VisionBoard = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-lg border-b border-white/20">
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 6h18M3 18h18"/>
          </svg>
        </Button>
        <h1 className="text-lg font-medium text-foreground">r=vd</h1>
        <div className="w-10" />
      </header>

      {/* Main Canvas Area */}
      <main className="flex-1 p-4 relative overflow-hidden">
        <div className="h-full rounded-2xl bg-white/60 backdrop-blur-lg border border-white/30 shadow-glass relative overflow-hidden">
          
          {/* Vision Board Items */}
          <div className="absolute inset-4">
            {/* Single centered add photo box */}
            <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-40 h-32 bg-white/80 backdrop-blur-lg rounded-xl border border-white/40 shadow-glass p-3">
              <div className="w-full h-full rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                <span className="text-sm text-gray-400">+ Add Photo</span>
              </div>
            </div>
          </div>

          {/* Progress Cards */}
          <div className="absolute bottom-28 left-4 right-4 grid grid-cols-2 gap-3">
            <Card className="p-3 bg-soft-yellow/70 backdrop-blur-lg border border-white/30 shadow-glass">
              <div className="text-center flex flex-col items-center justify-center">
                <div className="text-xl font-bold text-gray-700 mb-1">12</div>
                <div className="text-xs text-gray-600">Daily Goals</div>
              </div>
            </Card>
            
            <Card className="p-3 bg-soft-blue/70 backdrop-blur-lg border border-white/30 shadow-glass">
              <div className="text-center flex flex-col items-center justify-center">
                <div className="text-xl font-bold text-gray-700 mb-1">85%</div>
                <div className="text-xs text-gray-600">Progress</div>
              </div>
            </Card>
          </div>

          {/* Floating Customize Button */}
          <Button 
            className="absolute bottom-32 right-4 h-10 w-10 rounded-full bg-primary/90 backdrop-blur-lg border border-white/20 shadow-glass hover:shadow-xl transition-all duration-300 hover:scale-105"
            size="icon"
            onClick={() => navigate("/customize")}
          >
            <Pencil className="w-4 h-4 text-white" />
          </Button>

          {/* Greeting Section */}
          <div className="absolute bottom-4 left-4 right-4 text-center">
            <h2 className="text-base font-semibold text-foreground mb-1">Good Morning! ☀️</h2>
            <p className="text-muted-foreground mb-2 text-xs">
              Ready to start your day with some positive habits?
            </p>
            <Button 
              className="bg-gray-800 text-white hover:bg-gray-700 px-4 py-1 rounded-full text-xs"
              onClick={() => navigate("/goals")}
            >
              Let's Begin
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VisionBoard;