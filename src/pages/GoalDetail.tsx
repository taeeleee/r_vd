import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, FileStack, Plus } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

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

interface HabitEntry {
  id: number;
  date: string;
  completed: boolean;
}

interface GratitudeEntry {
  id: number;
  text: string;
  date: string;
}

const GoalDetail = () => {
  const navigate = useNavigate();
  const { goalId } = useParams();
  
  // Mock data for the selected goal
  const goal = {
    id: parseInt(goalId || "1"),
    title: "건강한 라이프스타일 만들기",
    description: "매일 운동하고 건강한 식단 유지하기"
  };

  const [todos, setTodos] = useState<TodoItem[]>([
    { id: 1, text: "LC 한시간 연습", completed: true },
    { id: 2, text: "LC 밥 잘 챙겨", completed: true },
    { id: 3, text: "", completed: false }
  ]);

  const [dailyHabits] = useState<Habit[]>([
    { id: 1, name: "Workout", color: "bg-red-500", emoji: "💪" },
    { id: 2, name: "Drink Water", color: "bg-blue-500", emoji: "💧" },
    { id: 3, name: "Read", color: "bg-green-500", emoji: "📚" }
  ]);

  const [habitCompletions, setHabitCompletions] = useState<HabitCompletion[]>([
    { habitId: 1, date: format(new Date(), "yyyy-MM-dd"), completed: true },
    { habitId: 2, date: format(new Date(), "yyyy-MM-dd"), completed: false },
    { habitId: 3, date: format(new Date(), "yyyy-MM-dd"), completed: true }
  ]);

  const [habits, setHabits] = useState<HabitEntry[]>([
    { id: 1, date: "2025-01-21", completed: true },
    { id: 2, date: "2025-01-22", completed: true },
    { id: 3, date: "2025-01-23", completed: false },
  ]);

  const [gratitudeEntries, setGratitudeEntries] = useState<GratitudeEntry[]>([
    { id: 1, text: "오늘 네가 너무 감사하더라", date: "2025-01-21" }
  ]);

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const toggleHabitCompletion = (habitId: number) => {
    const today = format(new Date(), "yyyy-MM-dd");
    setHabitCompletions(prev => 
      prev.map(completion => 
        completion.habitId === habitId && completion.date === today
          ? { ...completion, completed: !completion.completed }
          : completion
      )
    );
  };

  const isHabitCompleted = (habitId: number) => {
    const today = format(new Date(), "yyyy-MM-dd");
    const completion = habitCompletions.find(c => c.habitId === habitId && c.date === today);
    return completion?.completed || false;
  };

  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  
  // Generate calendar days for current week
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1);
  
  const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return date.getDate();
  });

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-lg border-b border-white/20">
        <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="text-muted-foreground">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-medium text-foreground">{goal.title}</h1>
        <Button variant="ghost" size="icon" onClick={() => navigate("/goals")} className="text-muted-foreground">
          <FileStack className="w-5 h-5" />
        </Button>
      </header>

      {/* Content */}
      <main className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4 max-w-2xl mx-auto">
          
          {/* Calendar */}
          <Card 
            className="p-4 bg-white/70 backdrop-blur-lg border border-white/30 shadow-glass cursor-pointer hover:bg-white/80 transition-colors"
            onClick={() => navigate("/calendar")}
          >
            <h3 className="text-sm font-medium text-foreground mb-3">{currentMonth}</h3>
            <div className="grid grid-cols-7 gap-2 text-center">
              {weekDays.map((day, index) => (
                <div key={index} className="text-xs text-muted-foreground mb-2">{day}</div>
              ))}
              {weekDates.map((date, index) => {
                const dateObj = new Date(startOfWeek);
                dateObj.setDate(startOfWeek.getDate() + index);
                const isToday = dateObj.toDateString() === currentDate.toDateString();
                
                return (
                  <div 
                    key={index} 
                    className={`text-sm text-foreground p-1 relative ${
                      isToday ? 'bg-muted rounded-full w-8 h-8 flex items-center justify-center mx-auto' : ''
                    }`}
                  >
                    {date}
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Todo List */}
          <Card className="p-4 bg-white/70 backdrop-blur-lg border border-white/30 shadow-glass">
            <h3 className="text-sm font-medium text-foreground mb-3">To do list</h3>
            <div className="space-y-2">
              {todos.map((todo) => (
                <div key={todo.id} className="flex items-center space-x-3">
                  <Checkbox 
                    checked={todo.completed}
                    onCheckedChange={() => toggleTodo(todo.id)}
                  />
                  <span className={`text-sm ${todo.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                    {todo.text}
                  </span>
                </div>
              ))}
              <Button variant="ghost" size="sm" className="mt-2 text-muted-foreground">
                <Plus className="w-4 h-4 mr-1" />
                항목 추가
              </Button>
            </div>
          </Card>

          {/* Habit Tracker */}
          <Card 
            className="p-4 bg-white/70 backdrop-blur-lg border border-white/30 shadow-glass cursor-pointer hover:bg-white/80 transition-colors"
            onClick={() => navigate("/habit-tracker")}
          >
            <h3 className="text-sm font-medium text-foreground mb-3">Habit Tracker</h3>
            <div className="space-y-2">
              {dailyHabits.map((habit) => (
                <div key={habit.id} className="flex items-center space-x-3">
                  <Checkbox 
                    checked={isHabitCompleted(habit.id)}
                    onCheckedChange={() => toggleHabitCompletion(habit.id)}
                  />
                  <span className="text-lg">{habit.emoji}</span>
                  <span className={`text-sm ${isHabitCompleted(habit.id) ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                    {habit.name}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Gratitude Journal */}
          <Card 
            className="p-4 bg-white/70 backdrop-blur-lg border border-white/30 shadow-glass cursor-pointer hover:bg-white/80 transition-colors"
            onClick={() => navigate("/gratitude-journal")}
          >
            <h3 className="text-sm font-medium text-foreground mb-3">감사 일기</h3>
            <div className="space-y-2">
              {gratitudeEntries.map((entry) => (
                <div key={entry.id} className="p-3 bg-white/50 rounded-lg">
                  <p className="text-sm text-foreground">{entry.text}</p>
                </div>
              ))}
              <Button variant="ghost" size="sm" className="mt-2 text-muted-foreground">
                <Plus className="w-4 h-4 mr-1" />
                감사 일기 추가
              </Button>
            </div>
          </Card>

        </div>
      </main>
    </div>
  );
};

export default GoalDetail;