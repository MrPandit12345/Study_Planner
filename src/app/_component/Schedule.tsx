"use client";

import React, { useState, useRef } from "react";
import { HiOutlineCalendar, HiOutlinePlus } from "react-icons/hi";
import { BiBookAlt } from "react-icons/bi";
import { FaGlobe } from "react-icons/fa";
import { RiTestTubeFill } from "react-icons/ri";
import { TbMath } from "react-icons/tb";

type Session = {
  id: string;
  title: string;
  start: string; // 24h HH:MM
  end: string; // 24h HH:MM
  completed?: boolean;
  icon?: React.ReactElement;
};

const sampleSessions: Session[] = [
  {
    id: "1",
    title: "Mathematics",
    start: "09:00",
    end: "10:30",
    completed: true,
    icon: <TbMath className="text-white" />,
  },
  {
    id: "2",
    title: "Physics",
    start: "11:00",
    end: "12:00",
    completed: false,
    icon: <RiTestTubeFill className="text-white" />,
  },
  {
    id: "3",
    title: "English Literature",
    start: "14:00",
    end: "15:30",
    completed: false,
    icon: <BiBookAlt className="text-white" />,
  },
  {
    id: "4",
    title: "History",
    start: "16:00",
    end: "17:00",
    completed: false,
    icon: <FaGlobe className="text-white" />,
  },
];

function formatTime24To12(t: string) {
  const [h, m] = t.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hh = ((h + 11) % 12) + 1;
  return `${hh}:${m.toString().padStart(2, "0")} ${period}`;
}

function diffDuration(start: string, end: string) {
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  let minutes = eh * 60 + em - (sh * 60 + sm);
  if (minutes < 0) minutes += 24 * 60; // handle crossing midnight
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h > 0 ? `${h}h ` : ""}${m > 0 ? `${m}m` : ""}`.trim();
}

const Schedule: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>(sampleSessions);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    start: "09:00",
    end: "10:00",
    completed: false,
    iconType: "book",
  });
  const idRef = useRef(1);

  const toggleForm = () => setShowForm((s) => !s);

  const addSession = (e?: React.FormEvent) => {
    e?.preventDefault();
    const newSession: Session = {
      id: `session-${idRef.current++}`,
      title: form.title || "New Session",
      start: form.start,
      end: form.end,
      completed: form.completed,
      icon: getIconForType(form.iconType),
    };
    setSessions((s) => [newSession, ...s]);
    setShowForm(false);
    setForm({
      title: "",
      start: "09:00",
      end: "10:00",
      completed: false,
      iconType: "book",
    });
  };

  function getIconForType(type: string) {
    switch (type) {
      case "math":
        return <TbMath className="text-white" />;
      case "flask":
        return <RiTestTubeFill className="text-white" />;
      case "book":
        return <BiBookAlt className="text-white" />;
      case "globe":
        return <FaGlobe className="text-white" />;
      default:
        return <BiBookAlt className="text-white" />;
    }
  }

  return (
    <div className="w-full">
      <div className="rounded-xl border border-slate-100 p-6 shadow-sm bg-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-slate-50 text-slate-700">
              <HiOutlineCalendar className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-semibold">Today’s Schedule</h2>
          </div>
          <div>
            <button
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700"
              onClick={toggleForm}
            >
              <HiOutlinePlus className="w-4 h-4" /> <span>Add Session</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {sessions.map((item) => {
            const isCompleted = !!item.completed;
            const containerClass = isCompleted
              ? "bg-green-50 border-green-100 text-slate-900"
              : "bg-slate-50 border-transparent text-slate-900";
            return (
              <div
                key={item.id}
                className={`${containerClass} border rounded-lg p-4 flex items-center justify-between`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isCompleted ? "bg-green-400" : "bg-white border"
                    }`}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-semibold">{item.title}</div>
                    <div className="text-sm text-slate-500 mt-1">
                      {formatTime24To12(item.start)} -{" "}
                      {formatTime24To12(item.end)} •{" "}
                      {diffDuration(item.start, item.end)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isCompleted ? (
                    <span className="text-green-600 font-semibold">
                      ✓ Completed
                    </span>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black/40 z-40 flex items-center justify-center">
            <form
              onSubmit={addSession}
              className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold">Add Session</h3>
                <button
                  type="button"
                  className="text-slate-500"
                  onClick={() => setShowForm(false)}
                >
                  ✕
                </button>
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium text-slate-700">
                  Subject
                </label>
                <input
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, title: e.target.value }))
                  }
                  type="text"
                  className="mt-1 block w-full rounded-md border px-3 py-2 text-sm shadow-sm"
                  placeholder="Mathematics"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Icon
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, iconType: "math" }))}
                    className={`p-2 rounded-md border ${
                      form.iconType === "math"
                        ? "bg-blue-50 border-blue-200"
                        : "bg-white"
                    }`}
                    aria-pressed={form.iconType === "math"}
                  >
                    <TbMath />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setForm((f) => ({ ...f, iconType: "flask" }))
                    }
                    className={`p-2 rounded-md border ${
                      form.iconType === "flask"
                        ? "bg-blue-50 border-blue-200"
                        : "bg-white"
                    }`}
                    aria-pressed={form.iconType === "flask"}
                  >
                    <RiTestTubeFill />
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, iconType: "book" }))}
                    className={`p-2 rounded-md border ${
                      form.iconType === "book"
                        ? "bg-blue-50 border-blue-200"
                        : "bg-white"
                    }`}
                    aria-pressed={form.iconType === "book"}
                  >
                    <BiBookAlt />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setForm((f) => ({ ...f, iconType: "globe" }))
                    }
                    className={`p-2 rounded-md border ${
                      form.iconType === "globe"
                        ? "bg-blue-50 border-blue-200"
                        : "bg-white"
                    }`}
                    aria-pressed={form.iconType === "globe"}
                  >
                    <FaGlobe />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Start
                  </label>
                  <input
                    value={form.start}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, start: e.target.value }))
                    }
                    type="time"
                    className="mt-1 block w-full rounded-md border px-3 py-2 text-sm shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    End
                  </label>
                  <input
                    value={form.end}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, end: e.target.value }))
                    }
                    type="time"
                    className="mt-1 block w-full rounded-md border px-3 py-2 text-sm shadow-sm"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <input
                  checked={form.completed}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, completed: e.target.checked }))
                  }
                  id="completed"
                  type="checkbox"
                  className="h-4 w-4 border rounded"
                />
                <label htmlFor="completed" className="text-sm">
                  Mark as completed
                </label>
                <div className="ml-auto text-sm text-slate-600">
                  Duration: {diffDuration(form.start, form.end)}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg border"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Schedule;
