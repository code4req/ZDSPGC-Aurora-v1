import { useState } from "react";
import {
  FaCalendarAlt,
  FaSignOutAlt,
  FaPlus,
  FaHome,
} from "react-icons/fa";

import { supabase } from "../lib/supabase";

const AdminDashboard = ({ user, onLogout }) => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  return (
    <main className="min-h-screen w-screen bg-zinc-950 text-white">

      {/* TOP NAVBAR */}

      <header className="border-b border-emerald-500/20 bg-black/80 backdrop-blur-xl sticky top-0 z-50">

        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-emerald-400">
              ZDSPGC
            </p>

            <h1 className="text-xl font-black uppercase">
              Admin Dashboard
            </h1>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-full border border-red-500/20 px-5 py-2.5 text-xs uppercase tracking-wider text-red-400 hover:bg-red-500 hover:text-white transition-all"
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>

      </header>

      {/* CONTENT */}

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Welcome */}

        <div className="mb-10">

          <p className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2">
            Administration
          </p>

          <h2 className="text-4xl md:text-5xl font-black uppercase">
            Welcome, Admin
          </h2>

          <p className="text-sm text-emerald-100/50 mt-2">
            {user?.email}
          </p>

        </div>

        {/* DASHBOARD CARDS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Events */}

          <button
            onClick={() => setActiveSection("events")}
            className="text-left rounded-3xl border border-emerald-500/20 bg-emerald-950/30 p-7 hover:border-emerald-400/50 hover:bg-emerald-950/50 transition-all"
          >

            <div className="h-14 w-14 rounded-2xl bg-emerald-400/10 flex items-center justify-center mb-6">
              <FaCalendarAlt className="text-emerald-400 text-xl" />
            </div>

            <h3 className="text-2xl font-black uppercase">
              Events
            </h3>

            <p className="text-sm text-emerald-100/50 mt-2">
              Manage school events and announcements.
            </p>

          </button>

          {/* Add Event */}

          <button
            onClick={() => setActiveSection("add-event")}
            className="text-left rounded-3xl border border-emerald-500/20 bg-emerald-950/30 p-7 hover:border-emerald-400/50 hover:bg-emerald-950/50 transition-all"
          >

            <div className="h-14 w-14 rounded-2xl bg-emerald-400/10 flex items-center justify-center mb-6">
              <FaPlus className="text-emerald-400 text-xl" />
            </div>

            <h3 className="text-2xl font-black uppercase">
              Add Event
            </h3>

            <p className="text-sm text-emerald-100/50 mt-2">
              Create a new school event.
            </p>

          </button>

          {/* Website */}

          <button
            onClick={onLogout}
            className="text-left rounded-3xl border border-emerald-500/20 bg-emerald-950/30 p-7 hover:border-emerald-400/50 hover:bg-emerald-950/50 transition-all"
          >

            <div className="h-14 w-14 rounded-2xl bg-emerald-400/10 flex items-center justify-center mb-6">
              <FaHome className="text-emerald-400 text-xl" />
            </div>

            <h3 className="text-2xl font-black uppercase">
              Website
            </h3>

            <p className="text-sm text-emerald-100/50 mt-2">
              Return to the public website.
            </p>

          </button>

        </div>

        {/* ACTIVE SECTION */}

        <div className="mt-10">

          {activeSection === "dashboard" && (
            <div className="rounded-3xl border border-emerald-500/20 bg-emerald-950/20 p-10">
              <p className="text-emerald-300 font-mono text-sm uppercase tracking-widest">
                Dashboard Ready
              </p>

              <h3 className="text-3xl font-black uppercase mt-3">
                Administration Center
              </h3>

              <p className="text-emerald-100/50 mt-3">
                Select an option above to manage your website.
              </p>
            </div>
          )}

          {activeSection === "events" && (
            <div className="rounded-3xl border border-emerald-500/20 bg-emerald-950/20 p-10">

              <p className="text-xs font-mono uppercase tracking-widest text-emerald-400">
                Content Management
              </p>

              <h3 className="text-3xl font-black uppercase mt-2">
                Event Management
              </h3>

              <p className="text-emerald-100/50 mt-3">
                Event management will be connected to your Supabase
                events table next.
              </p>

            </div>
          )}

          {activeSection === "add-event" && (
            <div className="rounded-3xl border border-emerald-500/20 bg-emerald-950/20 p-10">

              <p className="text-xs font-mono uppercase tracking-widest text-emerald-400">
                Content Management
              </p>

              <h3 className="text-3xl font-black uppercase mt-2">
                Add Event
              </h3>

              <p className="text-emerald-100/50 mt-3">
                The event creation form will be added next.
              </p>

            </div>
          )}

        </div>

      </div>

    </main>
  );
};

export default AdminDashboard;