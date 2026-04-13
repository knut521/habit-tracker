export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Brand */}
          <div className="flex items-center">
            <div className="w-6 h-6 bg-accent rounded-md flex items-center justify-center mr-2">
              <span className="text-accent-foreground font-bold text-sm">H</span>
            </div>
            <span className="text-sm font-medium text-card-foreground">
              Habit Tracker
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center space-x-6">
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-card-foreground transition-colors duration-200"
            >
              About
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-card-foreground transition-colors duration-200"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-card-foreground transition-colors duration-200"
            >
              Terms
            </a>
          </div>

          {/* Technology */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-muted-foreground">
              Built with
            </span>
            <div className="flex items-center space-x-1">
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                Next.js 15
              </span>
              <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">
                Tailwind CSS
              </span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Habit Tracker. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}