import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format, isSameDay } from "date-fns";

interface Habit {
  id: number;
  name: string;
  color: string;
  emoji: string;
}

interface HabitCompletion {
  habitId: number;
  date: string;
  completed: boolean;
}

const HabitTracker = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  const [habits] = useState<Habit[]>([
    { id: 1, name: "Workout", color: "bg-red-500", emoji: "💪" },
    { id: 2, name: "Eat Breakfast", color: "bg-orange-500", emoji: "🍳" },
    { id: 3, name: "Do stretching", color: "bg-yellow-500", emoji: "🧘" },
    { id: 4, name: "Drinking Water", color: "bg-blue-500", emoji: "💧" },
    { id: 5, name: "Running", color: "bg-green-500", emoji: "🏃" },
    { id: 6, name: "Yoga", color: "bg-purple-500", emoji: "🧘‍♀️" },
    { id: 7, name: "Reading", color: "bg-indigo-500", emoji: "📚" }
  ]);

  const [completions, setCompletions] = useState<HabitCompletion[]>([
    { habitId: 1, date: "2025-01-20", completed: true },
    { habitId: 2, date: "2025-01-20", completed: true },
    { habitId: 3, date: "2025-01-20", completed: true },
    { habitId: 1, date: "2025-01-21", completed: true },
    { habitId: 4, date: "2025-01-21", completed: true },
    { habitId: 2, date: "2025-01-22", completed: true },
    { habitId: 5, date: "2025-01-22", completed: true },
  ]);

  const toggleHabitCompletion = (habitId: number, date: Date) => {
    const dateString = format(date, "yyyy-MM-dd");
    const existingCompletion = completions.find(
      c => c.habitId === habitId && c.date === dateString
    );

    if (existingCompletion) {
      setCompletions(completions.map(c => 
        c.habitId === habitId && c.date === dateString 
          ? { ...c, completed: !c.completed }
          : c
      ));
    } else {
      setCompletions([...completions, { habitId, date: dateString, completed: true }]);
    }
  };

  const getHabitCompletionsForDate = (date: Date) => {
    const dateString = format(date, "yyyy-MM-dd");
    return completions.filter(c => c.date === dateString && c.completed);
  };

  const isHabitCompletedOnDate = (habitId: number, date: Date) => {
    const dateString = format(date, "yyyy-MM-dd");
    const completion = completions.find(c => c.habitId === habitId && c.date === dateString);
    return completion?.completed || false;
  };

  const getHabitColor = (habitId: number) => {
    const habit = habits.find(h => h.id === habitId);
    return habit?.color || "bg-gray-500";
  };

  const renderDayContent = (date: Date) => {
    const dayCompletions = getHabitCompletionsForDate(date);
    const dayNumber = date.getDate();
    
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        <span className="text-sm">{dayNumber}</span>
        {dayCompletions.length > 0 && (
          <div className="flex gap-0.5 mt-1 flex-wrap justify-center max-w-8">
            {dayCompletions.slice(0, 3).map((completion) => (
              <div
                key={completion.habitId}
                className={`w-1.5 h-1.5 rounded-full ${getHabitColor(completion.habitId).replace('bg-', 'bg-')} opacity-80`}
              />
            ))}
            {dayCompletions.length > 3 && (
              <div className="w-1.5 h-1.5 rounded-full bg-gray-400 opacity-60" />
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-2 bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-lg">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-muted-foreground">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-medium text-foreground">Habit Tracker</h1>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Plus className="w-5 h-5" />
        </Button>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 py-6 overflow-y-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto h-full">
          
          {/* Calendar Section */}
          <Card className="p-4 bg-white/70 backdrop-blur-lg border border-white/30 shadow-glass">
            <h3 className="text-lg font-medium text-foreground mb-4">Calendar</h3>
            <div className="calendar-container flex justify-center w-full">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="w-full max-w-none"
                classNames={{
                  months: "flex w-full justify-center",
                  month: "space-y-4 w-full",
                  table: "w-full border-collapse",
                  head_row: "flex w-full",
                  head_cell: "text-muted-foreground rounded-md w-full font-normal text-[0.8rem] flex-1",
                  row: "flex w-full mt-2",
                  cell: "h-9 w-full text-center text-sm p-0 relative flex-1 [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                  day: "h-9 w-full p-0 font-normal flex flex-col items-center justify-center relative aria-selected:opacity-100",
                  day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                  day_today: "bg-accent text-accent-foreground",
                  day_outside: "day-outside text-muted-foreground opacity-50  aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
                  day_disabled: "text-muted-foreground opacity-50",
                  day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                  day_hidden: "invisible"
                }}
                components={{
                  DayContent: ({ date }) => renderDayContent(date)
                }}
              />
            </div>
          </Card>

          {/* Habits Section */}
          <Card className="p-4 bg-white/70 backdrop-blur-lg border border-white/30 shadow-glass">
            <h3 className="text-lg font-medium text-foreground mb-4">
              Habits for {format(selectedDate, "MMM dd")}
            </h3>
            <div className="space-y-3">
              {habits.map((habit) => (
                <div
                  key={habit.id}
                  className={`p-4 rounded-lg border transition-all duration-200 ${
                    isHabitCompletedOnDate(habit.id, selectedDate)
                      ? `${habit.color} text-white border-transparent`
                      : "bg-white/50 border-white/30 hover:bg-white/70"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{habit.emoji}</span>
                      <span className="font-medium">{habit.name}</span>
                    </div>
                    <Checkbox
                      checked={isHabitCompletedOnDate(habit.id, selectedDate)}
                      onCheckedChange={() => toggleHabitCompletion(habit.id, selectedDate)}
                      className="data-[state=checked]:bg-white data-[state=checked]:text-gray-900"
                    />
                  </div>
                </div>
              ))}
              
              <Button 
                variant="ghost" 
                className="w-full mt-4 text-muted-foreground border border-dashed border-white/30"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Habit
              </Button>
            </div>
          </Card>

        </div>
      </main>
    </div>
  );
};

export default HabitTracker;