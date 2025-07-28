import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Image, Scissors, Sparkles } from "lucide-react";

const VisionBoard = () => {
  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-lg border-b border-white/20">
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 6h18M3 18h18"/>
          </svg>
        </Button>
        <h1 className="text-lg font-medium text-foreground">Vision Board</h1>
        <div className="w-10" />
      </header>

      {/* Main Canvas Area */}
      <main className="flex-1 p-4 relative overflow-hidden">
        <div className="h-full rounded-2xl bg-white/60 backdrop-blur-lg border border-white/30 shadow-glass relative overflow-hidden">
          {/* Empty State */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
            <div className="bg-gradient-glass rounded-full p-8 mb-6 backdrop-blur-lg border border-white/20 shadow-glass">
              <Sparkles className="w-12 h-12 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">Create Your Vision</h2>
            <p className="text-muted-foreground mb-8 max-w-sm">
              Add photos, cutouts, and inspiration to build your perfect vision board
            </p>
            
            {/* Quick Action Cards */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
              <Card className="p-4 bg-soft-yellow/50 backdrop-blur-lg border border-white/30 shadow-soft hover:shadow-glass transition-all duration-300">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="bg-white/60 rounded-lg p-2">
                    <Image className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <span className="text-sm font-medium text-foreground">Add Photo</span>
                </div>
              </Card>
              
              <Card className="p-4 bg-soft-blue/50 backdrop-blur-lg border border-white/30 shadow-soft hover:shadow-glass transition-all duration-300">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="bg-white/60 rounded-lg p-2">
                    <Scissors className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <span className="text-sm font-medium text-foreground">Add Cutout</span>
                </div>
              </Card>
            </div>
          </div>

          {/* Floating Add Button */}
          <Button 
            className="absolute bottom-6 right-6 h-14 w-14 rounded-full bg-primary/90 backdrop-blur-lg border border-white/20 shadow-glass hover:shadow-xl transition-all duration-300 hover:scale-105"
            size="icon"
          >
            <Plus className="w-6 h-6" />
          </Button>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white/80 backdrop-blur-lg border-t border-white/20 px-4 py-2">
        <div className="flex items-center justify-around max-w-sm mx-auto">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </Button>
          
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
              <circle cx="9" cy="9" r="2"/>
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
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
              <circle cx="8" cy="21" r="1"/>
              <circle cx="19" cy="21" r="1"/>
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57L20.4 7H5.12"/>
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