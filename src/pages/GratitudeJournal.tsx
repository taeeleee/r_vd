import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Heart, Plus, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

interface GratitudeEntry {
  id: number;
  text: string;
  date: string;
  gratitudeLevel: number;
}

const GratitudeJournal = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [expandedEntryId, setExpandedEntryId] = useState<number | null>(null);
  const [newEntryText, setNewEntryText] = useState("");
  const [newGratitudeLevel, setNewGratitudeLevel] = useState([5]);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const [gratitudeEntries, setGratitudeEntries] = useState<GratitudeEntry[]>([
    { id: 1, text: "오늘 네가 너무 감사하더라", date: format(new Date(), "yyyy-MM-dd"), gratitudeLevel: 8 },
    { id: 2, text: "가족과 함께한 저녁 시간", date: format(new Date(), "yyyy-MM-dd"), gratitudeLevel: 9 },
  ]);

  const selectedDateStr = format(selectedDate, "yyyy-MM-dd");
  const dayEntries = gratitudeEntries.filter(entry => entry.date === selectedDateStr);

  const toggleEntry = (id: number) => {
    setExpandedEntryId(expandedEntryId === id ? null : id);
  };

  const addNewEntry = () => {
    if (newEntryText.trim()) {
      const newEntry: GratitudeEntry = {
        id: Date.now(),
        text: newEntryText,
        date: selectedDateStr,
        gratitudeLevel: newGratitudeLevel[0]
      };
      setGratitudeEntries([...gratitudeEntries, newEntry]);
      setNewEntryText("");
      setNewGratitudeLevel([5]);
      setIsAddingNew(false);
    }
  };

  const getGratitudeColor = (level: number) => {
    if (level <= 3) return "text-gray-400";
    if (level <= 6) return "text-pink-400";
    if (level <= 8) return "text-red-400";
    return "text-red-600";
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-lg border-b border-white/20">
        <Button variant="ghost" size="icon" onClick={() => navigate("/goals/2")} className="text-muted-foreground">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-medium text-foreground">감사 일기</h1>
        <div className="w-10" />
      </header>

      {/* Content */}
      <main className="flex-1 p-2 md:p-4 overflow-y-auto">
        <div className="flex flex-col md:flex-row gap-4 max-w-6xl mx-auto h-full">
          
          {/* Calendar Section */}
          <div className="flex-1 min-h-[300px] md:min-h-0">
            <Card className="h-full p-3 md:p-4 bg-white/70 backdrop-blur-lg border border-white/30 shadow-glass">
              <h3 className="text-sm font-medium text-foreground mb-4">날짜 선택</h3>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="w-full pointer-events-auto"
                classNames={{
                  months: "flex flex-col w-full",
                  month: "space-y-4 w-full",
                  table: "w-full border-collapse",
                  head_row: "flex w-full",
                  head_cell: "text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem]",
                  row: "flex w-full mt-2",
                  cell: "h-9 flex-1 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                  day: "h-9 w-full p-0 font-normal aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground",
                  day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                  day_today: "bg-accent text-accent-foreground font-medium",
                }}
              />
            </Card>
          </div>

          {/* Journal Entries Section */}
          <div className="flex-1">
            <Card className="h-full p-4 bg-white/70 backdrop-blur-lg border border-white/30 shadow-glass">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-foreground">
                  {format(selectedDate, "M월 d일")} 감사 일기
                </h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsAddingNew(true)}
                  className="text-muted-foreground"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  추가
                </Button>
              </div>

              <div className="space-y-3 h-full overflow-y-auto">
                {/* New Entry Form */}
                {isAddingNew && (
                  <Card className="p-3 bg-white/50 border border-white/40">
                    <Textarea
                      placeholder="오늘 감사한 일을 적어보세요..."
                      value={newEntryText}
                      onChange={(e) => setNewEntryText(e.target.value)}
                      className="mb-3 resize-none"
                      rows={3}
                    />
                    
                    <div className="mb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Heart className={`w-4 h-4 ${getGratitudeColor(newGratitudeLevel[0])}`} fill="currentColor" />
                        <span className="text-xs text-muted-foreground">감사 정도: {newGratitudeLevel[0]}/10</span>
                      </div>
                      <Slider
                        value={newGratitudeLevel}
                        onValueChange={setNewGratitudeLevel}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" onClick={addNewEntry}>저장</Button>
                      <Button variant="ghost" size="sm" onClick={() => setIsAddingNew(false)}>취소</Button>
                    </div>
                  </Card>
                )}

                {/* Existing Entries */}
                {dayEntries.map((entry) => (
                  <Card key={entry.id} className="bg-white/50 border border-white/40 overflow-hidden">
                    <div 
                      className="p-3 cursor-pointer hover:bg-white/20 transition-colors"
                      onClick={() => toggleEntry(entry.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Heart 
                            className={`w-4 h-4 ${getGratitudeColor(entry.gratitudeLevel)}`} 
                            fill="currentColor" 
                          />
                          <span className="text-sm text-foreground truncate flex-1">
                            {entry.text.slice(0, 30)}{entry.text.length > 30 ? '...' : ''}
                          </span>
                        </div>
                        {expandedEntryId === entry.id ? (
                          <ChevronUp className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                    
                    {expandedEntryId === entry.id && (
                      <div className="px-3 pb-3 border-t border-white/20">
                        <div className="pt-3">
                          <p className="text-sm text-foreground mb-3">{entry.text}</p>
                          <div className="flex items-center gap-2">
                            <Heart className={`w-4 h-4 ${getGratitudeColor(entry.gratitudeLevel)}`} fill="currentColor" />
                            <span className="text-xs text-muted-foreground">감사 정도: {entry.gratitudeLevel}/10</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </Card>
                ))}

                {dayEntries.length === 0 && !isAddingNew && (
                  <div className="text-center py-8">
                    <p className="text-sm text-muted-foreground">이 날에는 감사 일기가 없습니다.</p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setIsAddingNew(true)}
                      className="mt-2 text-muted-foreground"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      첫 번째 감사 일기 작성하기
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GratitudeJournal;
