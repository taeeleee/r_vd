import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Plus, FileStack } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

interface Event {
  id: number;
  title: string;
  date: string;
  category: string;
  color: string;
}

const categories = [
  { name: "Must Do", color: "bg-pink-500" },
  { name: "운동", color: "bg-purple-500" },
  { name: "활동", color: "bg-yellow-500" },
  { name: "my projects", color: "bg-rose-400" },
  { name: "School", color: "bg-blue-500" },
  { name: "work", color: "bg-gray-500" },
  { name: "Plans", color: "bg-indigo-500" }
];

const CalendarPage = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<Event[]>([
    { id: 1, title: "5시반 현백 → 원영", date: "2025-01-21", category: "Plans", color: "bg-indigo-500" },
    { id: 2, title: "22시 거브테크 회의", date: "2025-01-21", category: "my projects", color: "bg-rose-400" },
    { id: 3, title: "지훈 시연 가능성 전화 회의", date: "2025-01-21", category: "my projects", color: "bg-rose-400" }
  ]);
  
  const [showEventDialog, setShowEventDialog] = useState(false);
  const [showDayEvents, setShowDayEvents] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", category: "Must Do" });

  const getEventsForDate = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    return events.filter(event => event.date === dateStr);
  };

  const addEvent = () => {
    if (newEvent.title && selectedDate) {
      const category = categories.find(cat => cat.name === newEvent.category);
      const event: Event = {
        id: Date.now(),
        title: newEvent.title,
        date: format(selectedDate, "yyyy-MM-dd"),
        category: newEvent.category,
        color: category?.color || "bg-gray-500"
      };
      setEvents([...events, event]);
      setNewEvent({ title: "", category: "Must Do" });
      setShowEventDialog(false);
    }
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setShowDayEvents(true);
  };

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-lg border-b border-white/20">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-muted-foreground">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-medium text-foreground">Calendar</h1>
        <Button variant="ghost" size="icon" onClick={() => navigate("/goals")} className="text-muted-foreground">
          <FileStack className="w-5 h-5" />
        </Button>
      </header>

      {/* Content */}
      <main className="flex-1 p-4 overflow-hidden flex flex-col">
        
        {/* Calendar */}
        <Card className="flex-1 p-6 bg-white/70 backdrop-blur-lg border border-white/30 shadow-glass flex flex-col">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            onDayClick={handleDateClick}
            className="w-full flex-1 pointer-events-auto [&>div]:h-full [&_.rdp-months]:h-full [&_.rdp-month]:h-full [&_.rdp-table]:h-full"
            modifiers={{
              hasEvents: (date) => getEventsForDate(date).length > 0
            }}
            modifiersStyles={{
              hasEvents: { 
                backgroundColor: 'hsl(var(--primary))', 
                color: 'hsl(var(--primary-foreground))',
                borderRadius: '6px'
              }
            }}
          />
        </Card>

      </main>

      {/* Fixed Add Task Button at Bottom */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
          <DialogTrigger asChild>
            <Button className="px-8 py-3 rounded-full shadow-lg bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Add a Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Event</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  placeholder="Please enter what to do"
                />
              </div>
              
              <div>
                <Label>Select Category</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {categories.map((category) => (
                    <Button
                      key={category.name}
                      variant={newEvent.category === category.name ? "default" : "outline"}
                      onClick={() => setNewEvent({ ...newEvent, category: category.name })}
                      className="justify-start"
                    >
                      <div className={`w-3 h-3 rounded-full ${category.color} mr-2`} />
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowEventDialog(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={addEvent} className="flex-1">
                  Add
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Day Events Bottom Sheet */}
      {showDayEvents && selectedDate && (
        <div className="fixed inset-x-0 bottom-0 bg-white/95 backdrop-blur-lg border-t border-white/30 rounded-t-3xl p-4 max-h-[50vh] overflow-y-auto">
          <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
          <div className="text-center mb-4">
            <h3 className="text-lg font-medium">
              {format(selectedDate, "EEE, MMM d")}
            </h3>
            <p className="text-sm text-muted-foreground">Today</p>
          </div>
          
          <div className="space-y-3">
            {selectedDateEvents.length > 0 ? (
              selectedDateEvents.map((event) => (
                <div key={event.id} className="flex items-center gap-3 p-3 bg-white/50 rounded-lg">
                  <div className={`w-1 h-12 ${event.color} rounded-full`} />
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{event.title}</p>
                    <p className="text-sm text-muted-foreground">{event.category}</p>
                  </div>
                  <div className="w-6 h-6 border-2 border-gray-300 rounded" />
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No events for this day
              </p>
            )}
          </div>
          
          <Button 
            variant="ghost" 
            onClick={() => setShowDayEvents(false)}
            className="w-full mt-4"
          >
            Close
          </Button>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;