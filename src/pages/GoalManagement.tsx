import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Plus, CheckSquare, Clock, Heart, FileStack } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Goal {
  id: number;
  title: string;
  description: string;
  todoProgress: { completed: number; total: number };
  habitProgress: { completed: number; total: number };
  gratitudeProgress: { completed: number; total: number };
}

const GoalManagement = () => {
  const navigate = useNavigate();
  
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: 1,
      title: "건강한 라이프스타일 만들기",
      description: "매일 운동하고 건강한 식단 유지하기",
      todoProgress: { completed: 8, total: 12 },
      habitProgress: { completed: 15, total: 21 },
      gratitudeProgress: { completed: 5, total: 7 }
    },
    {
      id: 2,
      title: "커리어 성장",
      description: "새로운 스킬 배우고 전문성 향상시키기",
      todoProgress: { completed: 6, total: 10 },
      habitProgress: { completed: 12, total: 14 },
      gratitudeProgress: { completed: 3, total: 7 }
    },
    {
      id: 3,
      title: "TOEIC 점수 향상 목표",
      description: "매일 영어 공부하여 목표 점수 달성하기",
      todoProgress: { completed: 4, total: 8 },
      habitProgress: { completed: 18, total: 21 },
      gratitudeProgress: { completed: 6, total: 7 }
    }
  ]);

  const getProgressColor = (completed: number, total: number) => {
    const percentage = (completed / total) * 100;
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 50) return "text-yellow-600";
    return "text-red-500";
  };

  const getProgressPercentage = (completed: number, total: number) => {
    return Math.round((completed / total) * 100);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-lg border-b border-white/20">
        <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="text-muted-foreground">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-medium text-foreground">목표 관리</h1>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <FileStack className="w-5 h-5" />
        </Button>
      </header>

      {/* Goals List */}
      <main className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4 max-w-2xl mx-auto">
          {goals.map((goal) => (
            <Card 
              key={goal.id} 
              className="p-6 bg-white/70 backdrop-blur-lg border border-white/30 shadow-glass cursor-pointer hover:bg-white/80 transition-all duration-200"
              onClick={() => navigate(`/goals/${goal.id}`)}
            >
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-foreground mb-2">{goal.title}</h3>
                <p className="text-sm text-muted-foreground">{goal.description}</p>
              </div>
              
              {/* Progress Indicators */}
              <div className="flex justify-between items-center">
                {/* Todo Progress */}
                <div className="flex items-center space-x-2">
                  <CheckSquare className="w-5 h-5 text-blue-500" />
                  <span className={`text-sm font-medium ${getProgressColor(goal.todoProgress.completed, goal.todoProgress.total)}`}>
                    {goal.todoProgress.completed}/{goal.todoProgress.total}
                  </span>
                </div>

                {/* Habit Progress */}
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-orange-500" />
                  <span className={`text-sm font-medium ${getProgressColor(goal.habitProgress.completed, goal.habitProgress.total)}`}>
                    {goal.habitProgress.completed}/{goal.habitProgress.total}
                  </span>
                </div>

                {/* Gratitude Progress */}
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  <span className={`text-sm font-medium ${getProgressColor(goal.gratitudeProgress.completed, goal.gratitudeProgress.total)}`}>
                    {goal.gratitudeProgress.completed}/{goal.gratitudeProgress.total}
                  </span>
                </div>
              </div>

              {/* Overall Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>전체 진행률</span>
                  <span>
                    {Math.round(
                      ((goal.todoProgress.completed + goal.habitProgress.completed + goal.gratitudeProgress.completed) /
                      (goal.todoProgress.total + goal.habitProgress.total + goal.gratitudeProgress.total)) * 100
                    )}%
                  </span>
                </div>
                <div className="w-full bg-gray-200/50 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-primary to-primary/70 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${
                        ((goal.todoProgress.completed + goal.habitProgress.completed + goal.gratitudeProgress.completed) /
                        (goal.todoProgress.total + goal.habitProgress.total + goal.gratitudeProgress.total)) * 100
                      }%`
                    }}
                  />
                </div>
              </div>
            </Card>
          ))}

          {/* Add New Goal Card */}
          <Card className="p-6 bg-white/50 backdrop-blur-lg border border-white/30 shadow-glass border-dashed hover:bg-white/60 transition-all duration-300 cursor-pointer">
            <div className="flex flex-col items-center justify-center text-center">
              <Plus className="w-8 h-8 text-muted-foreground mb-2" />
              <span className="text-sm text-muted-foreground">새로운 목표 추가하기</span>
            </div>
          </Card>
        </div>
      </main>

      {/* Bottom Summary */}
      <div className="p-4 bg-white/80 backdrop-blur-lg border-t border-white/20">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">총 {goals.length}개의 목표</span>
            <span className="text-primary font-medium">
              평균 진행률: {Math.round(
                goals.reduce((acc, goal) => {
                  const totalCompleted = goal.todoProgress.completed + goal.habitProgress.completed + goal.gratitudeProgress.completed;
                  const totalTasks = goal.todoProgress.total + goal.habitProgress.total + goal.gratitudeProgress.total;
                  return acc + (totalCompleted / totalTasks);
                }, 0) / goals.length * 100
              )}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalManagement;