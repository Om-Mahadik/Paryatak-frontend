import React from "react";
import { PlusCircle, Box } from "lucide-react";
import QuickActionCard from "./QuickActionCard";
import "./QuickActions.css";

const QuickActions = () => {
const actions = [
  {
    title: "Add Blog",
    icon: PlusCircle,
    link: "/admin/blog-setup",
    color: "linear-gradient(135deg, #2563eb33, #38bdf833)", // faint blue gradient
  },
  {
    title: "Add Package",
    icon: Box,
    link: "/admin/package-setup",
    color: "linear-gradient(135deg, #3b82f633, #60a5fa33)", // faint lighter blue
  },
];

  return (
    <section className="dashboard-block quick-actions">
      <h3>Quick Actions</h3>
      <div className="quick-actions-grid">
        {actions.map((action, idx) => (
          <QuickActionCard key={idx} {...action} />
        ))}
      </div>
    </section>
  );
};

export default QuickActions;
