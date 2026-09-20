import {
  Star,
  Store,
  MessageSquare,
  TrendingUp
} from "lucide-react";

const Dashboard = () => {
  return (
    <div>

      <div className="page-heading">
        <div>
          <h1>Dashboard</h1>
          <p>
            Discover stores and share your experience.
          </p>
        </div>
      </div>

      <div className="stats-grid">

        <div className="stat-card">
          <div className="stat-icon blue">
            <Store size={21} />
          </div>

          <div>
            <span>Total Stores</span>
            <strong>0</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon yellow">
            <Star size={21} />
          </div>

          <div>
            <span>Your Ratings</span>
            <strong>0</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">
            <MessageSquare size={21} />
          </div>

          <div>
            <span>Reviews Given</span>
            <strong>0</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon purple">
            <TrendingUp size={21} />
          </div>

          <div>
            <span>Average Rating</span>
            <strong>—</strong>
          </div>
        </div>

      </div>

      <div className="dashboard-welcome">

        <div>
          <span>Rate with confidence</span>

          <h2>
            Your experience helps others
            make better decisions.
          </h2>

          <p>
            Browse stores, check ratings and
            share your own experience.
          </p>
        </div>

        <div className="welcome-stars">
          <Star size={25} fill="currentColor" />
          <Star size={25} fill="currentColor" />
          <Star size={25} fill="currentColor" />
          <Star size={25} fill="currentColor" />
          <Star size={25} fill="currentColor" />
        </div>

      </div>

    </div>
  );
};

export default Dashboard;