import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Image, Scissors, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const VisionBoard = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-screen bg-background max-w-sm mx-auto">{/* iPhone 16 width */}
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

      {/* Main Vision Board Canvas Area */}
      <main className="flex-1 p-3 relative overflow-hidden">
        <div className="h-full rounded-2xl bg-white/60 backdrop-blur-lg border border-white/30 shadow-glass relative overflow-hidden">
          
          {/* Large Vision Board Interactive Area */}
          <div className="absolute inset-3 top-3 bottom-32">
            {/* Single Add Photo Button in center */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-32 bg-white/80 backdrop-blur-lg rounded-xl border border-white/40 shadow-glass p-4">
              <div className="w-full h-full rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors cursor-pointer">
                <div className="text-center">
                  <Plus className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <span className="text-sm text-gray-400 font-medium">Add Photo</span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Cards - smaller and positioned higher */}
          <div className="absolute bottom-24 left-3 right-3 grid grid-cols-2 gap-3">
            <Card className="p-4 bg-soft-yellow/70 backdrop-blur-lg border border-white/30 shadow-glass">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-700 mb-1">12</div>
                <div className="text-xs text-gray-600">Daily Goals</div>
              </div>
            </Card>
            
            <Card className="p-4 bg-soft-blue/70 backdrop-blur-lg border border-white/30 shadow-glass">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-700 mb-1">85%</div>
                <div className="text-xs text-gray-600">Progress</div>
              </div>
            </Card>
          </div>

          {/* Greeting Section */}
          <div className="absolute bottom-12 left-3 right-3 text-center">
            <h2 className="text-lg font-semibold text-foreground mb-1">Good Morning! ☀️</h2>
            <p className="text-muted-foreground mb-3 text-xs">
              Ready to start your day with some positive habits?
            </p>
            <Button className="bg-gray-800 text-white hover:bg-gray-700 px-6 py-2 rounded-full text-sm mb-3">
              Let's Begin
            </Button>
          </div>

          {/* Action Buttons - moved below greeting */}
          <div className="absolute bottom-2 left-3 right-3 grid grid-cols-3 gap-2">
            <Button variant="ghost" className="flex flex-col items-center p-2 bg-white/60 backdrop-blur-lg border border-white/30 shadow-glass rounded-lg hover:bg-white/70 transition-all">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mb-1 text-gray-600">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <circle cx="12" cy="12" r="4"/>
              </svg>
              <span className="text-xs text-gray-600 font-medium">Shop</span>
            </Button>
            
            <Button variant="ghost" className="flex flex-col items-center p-2 bg-white/60 backdrop-blur-lg border border-white/30 shadow-glass rounded-lg hover:bg-white/70 transition-all">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mb-1 text-gray-600">
                <path d="M12 20h9"/>
                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
              </svg>
              <span className="text-xs text-gray-600 font-medium">Customize</span>
            </Button>
            
            <Button variant="ghost" className="flex flex-col items-center p-2 bg-white/60 backdrop-blur-lg border border-white/30 shadow-glass rounded-lg hover:bg-white/70 transition-all" onClick={() => navigate("/goals")}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mb-1 text-gray-600">
                <path d="M9 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-4"/>
                <path d="M9 7v10"/>
                <path d="M13 7v10"/>
                <path d="M15 7v10"/>
              </svg>
              <span className="text-xs text-gray-600 font-medium">See Goals</span>
            </Button>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white/80 backdrop-blur-lg border-t border-white/20 px-4 py-2">
        <div className="flex items-center justify-around max-w-sm mx-auto">
          <Button variant="ghost" size="icon" className="text-muted-foreground" onClick={() => navigate("/chat")}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </Button>
          
          <Button variant="ghost" size="icon" className="text-muted-foreground" onClick={() => navigate("/goals")}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
          </Button>
          
          <Button variant="ghost" size="icon" className="text-primary bg-primary/10 rounded-full">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9,22 9,12 15,12 15,22"/>
            </svg>
          </Button>
          
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
              <path d="M8 11h8"/>
              <path d="M8 7h6"/>
            </svg>
          </Button>
          
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default VisionBoard;