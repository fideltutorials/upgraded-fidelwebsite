"use client";

import { useEffect, useState } from "react";
import SlideOver from "./SlideOver";

interface Booking {
  id: number;
  parentName: string;
  email: string;
  phone: string;
  tutorId: number | null;
  subject: string;
  grade: string;
  format: string;
  message: string | null;
  status: string;
  createdAt: string;
}

interface Tutor {
  id: number;
  name: string;
}

export default function BookingsSection() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);

  // Detail slide-over state
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  const fetchData = async () => {
    try {
      const [bookingsRes, tutorsRes] = await Promise.all([
        fetch("/api/bookings"),
        fetch("/api/tutors"),
      ]);

      if (bookingsRes.ok) setBookings(await bookingsRes.json());
      if (tutorsRes.ok) setTutors(await tutorsRes.json());
    } catch (err) {
      console.error("Failed to load admin bookings data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getTutorName = (tutorId: number | null) => {
    if (!tutorId) return "Auto Match";
    const match = tutors.find((t) => t.id === tutorId);
    return match ? match.name : `Tutor ID: ${tutorId}`;
  };

  const openDetail = (booking: Booking) => {
    setSelectedBooking(booking);
    setDetailOpen(true);
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!selectedBooking) return;
    setUpdating(true);

    try {
      const res = await fetch(`/api/bookings/${selectedBooking.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        const updated = { ...selectedBooking, status: newStatus };
        setSelectedBooking(updated);
        setBookings(bookings.map((b) => (b.id === updated.id ? updated : b)));
      } else {
        alert("Failed to update status.");
      }
    } catch (err) {
      console.error("Error updating status:", err);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedBooking) return;
    if (
      !confirm(
        "Are you sure you want to delete this booking request permanently?",
      )
    )
      return;

    try {
      const res = await fetch(`/api/bookings/${selectedBooking.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setBookings(bookings.filter((b) => b.id !== selectedBooking.id));
        setDetailOpen(false);
        setSelectedBooking(null);
      } else {
        alert("Failed to delete booking.");
      }
    } catch (err) {
      console.error("Error deleting booking:", err);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-semibold text-brand-ink">
          Trial Bookings
        </h1>
        <p className="text-brand-muted text-sm mt-1">
          Manage family requests, tutoring level matching, and trial session
          scheduling · {bookings.length} request
          {bookings.length !== 1 ? "s" : ""}
        </p>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-brand-muted text-sm">Loading bookings list...</p>
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-20 bg-brand-cream-warm/40 rounded-2xl border border-brand-rule">
          <div className="w-16 h-16 rounded-2xl bg-brand-cream flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-brand-muted"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </div>
          <h3 className="font-serif text-lg font-semibold text-brand-ink mb-1">
            No bookings request
          </h3>
          <p className="text-brand-muted text-sm">
            New tutor bookings requested on the public portal will appear here.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-brand-rule overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand-cream-warm/60 border-b border-brand-rule">
                  <th className="text-left px-5 py-3 font-semibold text-brand-ink text-xs uppercase tracking-wider">
                    Parent / Student
                  </th>
                  <th className="text-left px-5 py-3 font-semibold text-brand-ink text-xs uppercase tracking-wider hidden md:table-cell">
                    Details
                  </th>
                  <th className="text-left px-5 py-3 font-semibold text-brand-ink text-xs uppercase tracking-wider hidden lg:table-cell">
                    Tutor
                  </th>
                  <th className="text-left px-5 py-3 font-semibold text-brand-ink text-xs uppercase tracking-wider hidden lg:table-cell">
                    Date
                  </th>
                  <th className="text-center px-5 py-3 font-semibold text-brand-ink text-xs uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-right px-5 py-3 font-semibold text-brand-ink text-xs uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-rule/50">
                {bookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="hover:bg-brand-cream-warm/30 transition-colors group"
                  >
                    <td className="px-5 py-4">
                      <div className="font-semibold text-brand-ink">
                        {booking.parentName}
                      </div>
                      <div className="text-xs text-brand-muted mt-0.5">
                        {booking.email}
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <div className="font-medium text-brand-ink">
                        {booking.subject}
                      </div>
                      <div className="text-xs text-brand-muted mt-0.5">
                        {booking.grade} · {booking.format}
                      </div>
                    </td>
                    <td className="px-5 py-4 font-semibold text-brand-primary text-xs uppercase tracking-wider hidden lg:table-cell">
                      {getTutorName(booking.tutorId)}
                    </td>
                    <td className="px-5 py-4 text-brand-muted text-xs hidden lg:table-cell">
                      {new Date(booking.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-5 py-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                          booking.status === "pending"
                            ? "bg-amber-50 text-amber-700 border border-amber-100"
                            : booking.status === "confirmed"
                              ? "bg-blue-50 text-blue-700 border border-blue-100"
                              : booking.status === "completed"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                                : "bg-red-50 text-red-700 border border-red-100"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            booking.status === "pending"
                              ? "bg-amber-500"
                              : booking.status === "confirmed"
                                ? "bg-blue-500"
                                : booking.status === "completed"
                                  ? "bg-emerald-500"
                                  : "bg-red-500"
                          }`}
                        ></span>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => openDetail(booking)}
                        className="px-3 py-2 rounded-lg text-xs font-medium text-brand-ink border border-brand-rule hover:bg-brand-cream-warm transition-colors inline-block cursor-pointer"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Booking Detail Slide-Over */}
      <SlideOver
        open={detailOpen}
        onClose={() => {
          setDetailOpen(false);
          setSelectedBooking(null);
        }}
        title={
          selectedBooking ? `Booking #${selectedBooking.id}` : "Booking Details"
        }
      >
        {selectedBooking && (
          <div className="flex flex-col gap-6">
            {/* Header */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-ink">
                {selectedBooking.parentName}
              </h2>
              <p className="text-brand-muted text-xs mt-1">
                Submitted on{" "}
                {new Date(selectedBooking.createdAt).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  },
                )}
              </p>
            </div>

            {/* Contact Information */}
            <div className="bg-brand-cream-warm/20 border border-brand-rule rounded-xl p-5">
              <h3 className="font-serif text-sm font-bold text-brand-ink mb-3 uppercase tracking-wider">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-brand-muted tracking-wider block">
                    Email
                  </span>
                  <a
                    href={`mailto:${selectedBooking.email}`}
                    className="text-sm font-semibold text-brand-primary hover:underline mt-0.5 block"
                  >
                    {selectedBooking.email}
                  </a>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-brand-muted tracking-wider block">
                    Phone
                  </span>
                  <a
                    href={`tel:${selectedBooking.phone}`}
                    className="text-sm font-semibold text-brand-ink hover:text-brand-primary mt-0.5 block"
                  >
                    {selectedBooking.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Tutoring Requirements */}
            <div className="bg-brand-cream-warm/20 border border-brand-rule rounded-xl p-5">
              <h3 className="font-serif text-sm font-bold text-brand-ink mb-3 uppercase tracking-wider">
                Tutoring Requirements
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-brand-muted tracking-wider block">
                    Subject
                  </span>
                  <span className="text-sm font-semibold text-brand-ink mt-0.5 block">
                    {selectedBooking.subject}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-brand-muted tracking-wider block">
                    Grade
                  </span>
                  <span className="text-sm font-semibold text-brand-ink mt-0.5 block">
                    {selectedBooking.grade}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-brand-muted tracking-wider block">
                    Format
                  </span>
                  <span className="text-sm font-semibold text-brand-ink mt-0.5 block">
                    {selectedBooking.format}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-brand-muted tracking-wider block">
                    Assigned Tutor
                  </span>
                  <span className="text-sm font-semibold text-brand-primary uppercase mt-0.5 block">
                    {getTutorName(selectedBooking.tutorId)}
                  </span>
                </div>
              </div>
            </div>

            {/* Message */}
            {selectedBooking.message && (
              <div className="bg-brand-cream-warm/20 border border-brand-rule rounded-xl p-5">
                <h3 className="font-serif text-sm font-bold text-brand-ink mb-2 uppercase tracking-wider">
                  Goals & Special Requirements
                </h3>
                <p className="text-brand-muted text-sm leading-relaxed italic bg-white border border-brand-rule/60 rounded-lg p-3">
                  &quot;{selectedBooking.message}&quot;
                </p>
              </div>
            )}

            {/* Status Control */}
            <div className="border border-brand-rule rounded-xl p-5">
              <h3 className="font-serif text-sm font-bold text-brand-ink mb-3">
                Update Status
              </h3>
              <select
                disabled={updating}
                value={selectedBooking.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                className={`w-full px-3 py-2.5 rounded-xl border text-xs font-semibold focus:outline-none transition-colors cursor-pointer ${
                  selectedBooking.status === "pending"
                    ? "bg-amber-50 text-amber-800 border-amber-200"
                    : selectedBooking.status === "confirmed"
                      ? "bg-blue-50 text-blue-800 border-blue-200"
                      : selectedBooking.status === "completed"
                        ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                        : "bg-red-50 text-red-800 border-red-200"
                }`}
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-50/50 rounded-xl border border-red-200/60 p-5">
              <h3 className="font-serif text-sm font-bold text-red-800 mb-2">
                Danger Zone
              </h3>
              <p className="text-[11px] text-red-700/80 leading-relaxed mb-3">
                Deleting this booking permanently removes it from the database.
                This action is irreversible.
              </p>
              <button
                onClick={handleDelete}
                className="w-full bg-red-600 hover:bg-red-700 text-brand-paper py-2.5 rounded-xl font-semibold text-xs shadow-sm transition-colors cursor-pointer"
              >
                Delete Booking Request
              </button>
            </div>
          </div>
        )}
      </SlideOver>
    </div>
  );
}
