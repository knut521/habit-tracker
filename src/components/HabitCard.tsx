'use client';

interface Habit {
  id: string;
  name: string;
  description: string;
  streak: number;
  completedToday: boolean;
  lastCompleted: string | null;
}

interface HabitCardProps {
  habit: Habit;
  onToggleCompletion: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function HabitCard({ habit, onToggleCompletion, onDelete }: HabitCardProps) {
  const getStreakEmoji = (streak: number) => {
    if (streak >= 100) return '🔥';
    if (streak >= 50) return '⭐';
    if (streak >= 30) return '🎯';
    if (streak >= 21) return '🌟';
    if (streak >= 14) return '✨';
    if (streak >= 7) return '🌱';
    return '🌱';
  };

  const getStreakColor = (streak: number) => {
    if (streak >= 100) return 'text-red-500';
    if (streak >= 50) return 'text-yellow-500';
    if (streak >= 30) return 'text-green-500';
    if (streak >= 21) return 'text-blue-500';
    if (streak >= 14) return 'text-purple-500';
    if (streak >= 7) return 'text-accent';
    return 'text-muted-foreground';
  };

  return (
    <div className="bg-card rounded-xl shadow-lg border border-border hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="p-6">
        {/* Header with delete button */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-card-foreground mb-1">
              {habit.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {habit.description}
            </p>
          </div>
          <button
            onClick={() => onDelete(habit.id)}
            className="ml-4 flex-shrink-0 p-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors duration-200"
            title="Delete habit"
          >
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>

        {/* Streak and status */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className={`text-lg font-bold ${getStreakColor(habit.streak)}`}>
              {getStreakEmoji(habit.streak)} {habit.streak}
            </span>
            <span className="text-sm text-muted-foreground">
              day streak
            </span>
          </div>
          
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
            habit.completedToday 
              ? 'bg-accent/20 text-accent' 
              : 'bg-muted text-muted-foreground'
          }`}>
            {habit.completedToday ? (
              <>
                <svg
                  className="w-3 h-3 mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Completed
              </>
            ) : (
              <>
                <svg
                  className="w-3 h-3 mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Pending
              </>
            )}
          </span>
        </div>

        {/* Completion button */}
        <button
          onClick={() => onToggleCompletion(habit.id)}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 ${
            habit.completedToday
              ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              : 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md'
          }`}
        >
          {habit.completedToday ? 'Mark Incomplete' : 'Mark Complete'}
        </button>

        {/* Last completed date */}
        {habit.lastCompleted && (
          <p className="text-xs text-muted-foreground mt-3 text-center">
            Last completed: {habit.lastCompleted}
          </p>
        )}
      </div>
    </div>
  );
}