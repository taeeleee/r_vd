import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-white/20 px-4 py-2 z-50">
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
        
        <Button 
          variant="ghost" 
          size="icon" 
          className={location.pathname === "/" ? "text-primary bg-primary/10 rounded-full" : "text-muted-foreground"}
          onClick={() => navigate("/")}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9,22 9,12 15,12 15,22"/>
          </svg>
        </Button>
        
        <Button variant="ghost" size="icon" className="text-muted-foreground" onClick={() => navigate("/self-narrative")}>
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
  );
};

export default BottomNav;