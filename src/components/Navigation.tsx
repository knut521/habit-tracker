'use client';

import { useState } from 'react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-lg">H</span>
              </div>
            </div>
            <div className="ml-3">
              <h1 className="text-xl font-bold text-card-foreground">Habit Tracker</h1>
              <p className="text-sm text-muted-foreground">Build better habits</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-card-foreground hover:text-accent transition-colors duration-200"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-card-foreground transition-colors duration-200"
            >
              Stats
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-card-foreground transition-colors duration-200"
            >
              Settings
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-card-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-accent focus:ring-inset transition-colors duration-200"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-border">
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-card-foreground bg-muted"
              >
                Dashboard
              </a>
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-card-foreground hover:bg-muted"
              >
                Stats
              </a>
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-card-foreground hover:bg-muted"
              >
                Settings
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}