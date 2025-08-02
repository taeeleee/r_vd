import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, User, Heart, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ChatBot = () => {
  const navigate = useNavigate();
  const [selectedCharacter, setSelectedCharacter] = useState<string>("avatar");
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{id: number, text: string, sender: 'user' | 'bot'}>>([]);

  const characters = [
    { id: "avatar", name: "Avatar", icon: User, description: "Your personal AI companion" },
    { id: "coach", name: "Life Coach", icon: Heart, description: "Professional guidance" },
    { id: "counselor", name: "Counselor", icon: Users, description: "Emotional support" }
  ];

  const topics = [
    { id: "development", name: "자기계발", color: "bg-soft-blue/70" },
    { id: "counseling", name: "상담", color: "bg-soft-yellow/70" }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now(),
        text: message,
        sender: 'user' as const
      };
      setMessages(prev => [...prev, newMessage]);
      setMessage("");
      
      // Simulate bot response
      setTimeout(() => {
        const botResponse = {
          id: Date.now() + 1,
          text: "Thank you for your message. I'm here to help you with your goals!",
          sender: 'bot' as const
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-2 bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-lg">
        <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="text-muted-foreground">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-medium text-foreground">Chat</h1>
        <div className="w-10" />
      </header>

      {/* Character Selection */}
      <div className="px-4 py-2 bg-white/10 backdrop-blur-xl border-b border-white/20">
        <p className="text-sm text-muted-foreground mb-3">Choose your companion:</p>
        <div className="flex gap-2 overflow-x-auto">
          {characters.map((character) => {
            const IconComponent = character.icon;
            return (
              <Button
                key={character.id}
                variant={selectedCharacter === character.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCharacter(character.id)}
                className="min-w-fit whitespace-nowrap"
              >
                <IconComponent className="w-4 h-4 mr-2" />
                {character.name}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Topic Selection */}
      <div className="px-4 py-2 bg-white/10 backdrop-blur-xl border-b border-white/20">
        <p className="text-sm text-muted-foreground mb-3">Focus area:</p>
        <div className="flex gap-2 overflow-x-auto">
          {topics.map((topic) => (
            <Button
              key={topic.id}
              variant={selectedTopic === topic.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTopic(topic.id)}
              className="min-w-fit whitespace-nowrap"
            >
              {topic.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <main className="flex-1 px-4 py-6 overflow-y-auto">
        <div className="space-y-4 max-w-2xl mx-auto">
          {/* Welcome Message */}
          {messages.length === 0 && (
            <Card className="p-6 bg-white/70 backdrop-blur-lg border border-white/30 shadow-glass text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
                {selectedCharacter === "avatar" && <User className="w-8 h-8 text-primary" />}
                {selectedCharacter === "coach" && <Heart className="w-8 h-8 text-primary" />}
                {selectedCharacter === "counselor" && <Users className="w-8 h-8 text-primary" />}
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                What would you like to do today?
              </h3>
              <p className="text-sm text-muted-foreground">
                I'm here to support your journey. How can I help you grow?
              </p>
            </Card>
          )}

          {/* Messages */}
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <Card className={`max-w-xs p-3 ${
                msg.sender === 'user' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-white/70 backdrop-blur-lg border border-white/30 shadow-glass'
              }`}>
                <p className="text-sm">{msg.text}</p>
              </Card>
            </div>
          ))}
        </div>
      </main>

      {/* Input Area */}
      <div className="px-4 py-2 bg-white/10 backdrop-blur-xl border-t border-white/20 shadow-lg">
        <div className="flex gap-2 max-w-2xl mx-auto">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask me anything..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 bg-white/70 backdrop-blur-lg border border-white/30"
          />
          <Button 
            onClick={handleSendMessage}
            size="icon"
            className="bg-primary/90 backdrop-blur-lg border border-white/20 shadow-glass hover:shadow-xl transition-all duration-300"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;