'use client';

import { useState } from 'react';

interface Habit {
  id: string;
  name: string;
  description: string;
  streak: number;
  completedToday: boolean;
  lastCompleted: string | null;
}

const sampleHabits: Habit[] = [
  {
    id: '1',
    name: 'Morning Meditation',
    description: '5 minutes of mindfulness meditation',
    streak: 7,
    completedToday: false,
    lastCompleted: '2026-04-11',
  },
  {
    id: '2',
    name: 'Daily Exercise',
    description: '30 minutes of physical activity',
    streak: 14,
    completedToday: true,
    lastCompleted: '2026-04-12',
  },
  {
    id: '3',
    name: 'Read Book',
    description: 'Read for 20 minutes',
    streak: 21,
    completedToday: false,
    lastCompleted: '2026-04-10',
  },
];

export default function HabitTracker() {
  const [habits, setHabits] = useState<Habit[]>(sampleHabits);
  const [newHabitName, setNewHabitName] = useState('');
  const [newHabitDescription, setNewHabitDescription] = useState('');

  const toggleHabitCompletion = (id: string) => {
    setHabits(habits.map(habit => {
      if (habit.id === id) {
        const today = new Date().toISOString().split('T')[0];
        const wasCompletedToday = habit.completedToday;
        const lastCompleted = wasCompletedToday ? habit.lastCompleted : today;
        
        // Calculate streak
        let newStreak = habit.streak;
        if (!wasCompletedToday) {
          if (habit.lastCompleted) {
            const lastDate = new Date(habit.lastCompleted);
            const todayDate = new Date(today);
            const diffTime = Math.abs(todayDate.getTime() - lastDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays === 1) {
              newStreak = habit.streak + 1;
            } else if (diffDays > 1) {
              newStreak = 1;
            }
          } else {
            newStreak = 1;
          }
        }

        return {
          ...habit,
          completedToday: !wasCompletedToday,
          streak: newStreak,
          lastCompleted: lastCompleted,
        };
      }
      return habit;
    }));
  };

  const addNewHabit = () => {
    if (newHabitName.trim()) {
      const newHabit: Habit = {
        id: Date.now().toString(),
        name: newHabitName.trim(),
        description: newHabitDescription.trim(),
        streak: 0,
        completedToday: false,
        lastCompleted: null,
      };
      
      setHabits([...habits, newHabit]);
      setNewHabitName('');
      setNewHabitDescription('');
    }
  };

  const deleteHabit = (id: string) => {
    setHabits(habits.filter(habit => habit.id !== id));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-center text-card-foreground">
            Habit Tracker
          </h1>
          <p className="text-center text-muted-foreground mt-2">
            Build better habits one day at a time
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex-1">
        {/* Add New Habit Form */}
        <div className="bg-card rounded-lg shadow-md p-6 mb-8 border border-border">
          <h2 className="text-xl font-semibold mb-4 text-card-foreground">
            Add New Habit
          </h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="habit-name" className="block text-sm font-medium text-card-foreground mb-2">
                Habit Name
              </label>
              <input
                id="habit-name"
                type="text"
                value={newHabitName}
                onChange={(e) => setNewHabitName(e.target.value)}
                placeholder="e.g., Morning Meditation"
                className="w-full px-3 py-2 border border-input rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="habit-description" className="block text-sm font-medium text-card-foreground mb-2">
                Description (Optional)
              </label>
              <input
                id="habit-description"
                type="text"
                value={newHabitDescription}
                onChange={(e) => setNewHabitDescription(e.target.value)}
                placeholder="e.g., 5 minutes of mindfulness"
                className="w-full px-3 py-2 border border-input rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
            </div>
            <button
              onClick={addNewHabit}
              disabled={!newHabitName.trim()}
              className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Add Habit
            </button>
          </div>
        </div>

        {/* Habits List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-card-foreground mb-6">
            Your Habits
          </h2>
          
          {habits.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-lg">No habits yet. Add your first habit above!</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {habits.map((habit) => (
                <div
                  key={habit.id}
                  className="bg-card rounded-lg shadow-md p-6 border border-border hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg text-card-foreground">
                        {habit.name}
                      </h3>
                      {habit.description && (
                        <p className="text-muted-foreground text-sm mt-1">
                          {habit.description}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => deleteHabit(habit.id)}
                      className="text-destructive hover:text-destructive/80 transition-colors"
                      aria-label="Delete habit"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-muted-foreground">
                      Streak: <span className="font-semibold text-accent">{habit.streak}</span> days
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      habit.completedToday 
                        ? 'bg-accent/20 text-accent' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {habit.completedToday ? 'Completed' : 'Pending'}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleHabitCompletion(habit.id)}
                    className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
                      habit.completedToday
                        ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                        : 'bg-primary text-primary-foreground hover:bg-primary/90'
                    }`}
                  >
                    {habit.completedToday ? 'Mark Incomplete' : 'Mark Complete'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-muted-foreground text-sm">
            Built with Next.js 15 & Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}