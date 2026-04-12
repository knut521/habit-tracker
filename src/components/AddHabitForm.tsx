'use client';

import { useState } from 'react';

interface AddHabitFormProps {
  onAddHabit: (name: string, description: string) => void;
  isAdding?: boolean;
}

export default function AddHabitForm({ onAddHabit, isAdding = false }: AddHabitFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && description.trim()) {
      onAddHabit(name.trim(), description.trim());
      setName('');
      setDescription('');
      setIsExpanded(false);
    }
  };

  const handleCancel = () => {
    setName('');
    setDescription('');
    setIsExpanded(false);
  };

  return (
    <div className="bg-card rounded-xl border border-dashed border-border hover:border-solid hover:border-accent/50 transition-all duration-300">
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="w-full p-6 text-center group"
          disabled={isAdding}
        >
          <div className="flex flex-col items-center justify-center">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-3 group-hover:bg-accent/20 transition-colors duration-200">
              <svg
                className="w-6 h-6 text-accent group-hover:text-accent-foreground transition-colors duration-200"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-card-foreground mb-1">
              Add New Habit
            </h3>
            <p className="text-sm text-muted-foreground">
              Start tracking a new daily habit
            </p>
          </div>
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="habit-name" className="block text-sm font-medium text-card-foreground mb-2">
                Habit Name *
              </label>
              <input
                id="habit-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Morning Meditation"
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-input-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors duration-200"
                required
                autoFocus
              />
            </div>

            <div>
              <label htmlFor="habit-description" className="block text-sm font-medium text-card-foreground mb-2">
                Description *
              </label>
              <textarea
                id="habit-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g., 5 minutes of mindfulness meditation"
                rows={2}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-input-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors duration-200 resize-none"
                required
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={!name.trim() || !description.trim() || isAdding}
                className="flex-1 py-2 px-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isAdding ? 'Adding...' : 'Add Habit'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 text-muted-foreground hover:text-card-foreground hover:bg-muted rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}