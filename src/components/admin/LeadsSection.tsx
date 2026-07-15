"use client";

import { useEffect, useState } from "react";

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  source: string;
  status: string;
  createdAt: string;
}

export default function LeadsSection() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchLeads = async () => {
    try {
      const res = await fetch("/api/leads");
      if (res.ok) {
        setLeads(await res.json());
      }
    } catch (err) {
      console.error("Failed to load leads:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Filter logic
  useEffect(() => {
    let filtered = leads;

    if (search.trim() !== "") {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.email.toLowerCase().includes(q) ||
          (l.phone && l.phone.toLowerCase().includes(q)) ||
          (l.message && l.message.toLowerCase().includes(q)),
      );
    }

    if (sourceFilter !== "all") {
      filtered = filtered.filter((l) => l.source === sourceFilter);
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((l) => l.status === statusFilter);
    }

    setFilteredLeads(filtered);
  }, [search, sourceFilter, statusFilter, leads]);

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        const updated = await res.json();
        setLeads(leads.map((l) => (l.id === updated.id ? updated : l)));
      }
    } catch (err) {
      console.error("Failed to update lead status:", err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    try {
      const res = await fetch(`/api/leads/${id}`, { method: "DELETE" });
      if (res.ok) {
        setLeads(leads.filter((l) => l.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete lead:", err);
    }
  };

  // Export to CSV function
  const handleExportCSV = () => {
    if (filteredLeads.length === 0) return;

    const headers = [
      "ID",
      "Name",
      "Email",
      "Phone",
      "Message",
      "Source",
      "Status",
      "Created At",
    ];
    const rows = filteredLeads.map((l) => [
      l.id,
      `"${l.name.replace(/"/g, '""')}"`,
      l.email,
      l.phone || "",
      `"${(l.message || "").replace(/"/g, '""').replace(/\n/g, " ")}"`,
      l.source,
      l.status,
      l.createdAt,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `fidel_leads_export_${new Date().toISOString().split("T")[0]}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="w-10 h-10 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-brand-muted text-sm">Loading leads...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="font-serif text-lg font-bold text-brand-ink">
            Inquiries & Leads
          </h2>
          <p className="text-brand-muted text-xs">
            Showing {filteredLeads.length} of {leads.length} total lead
            {leads.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={handleExportCSV}
          disabled={filteredLeads.length === 0}
          className="bg-brand-primary text-brand-paper hover:bg-brand-primary-deep disabled:opacity-50 px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer self-start sm:self-auto"
        >
          Export CSV
        </button>
      </div>

      {/* Filters bar */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between p-4 bg-brand-cream-warm/15 border border-brand-rule rounded-xl mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email, details..."
          className="w-full md:max-w-xs px-3.5 py-2 rounded-lg border border-brand-rule bg-white text-brand-ink text-xs focus:outline-none focus:border-brand-primary"
        />

        <div className="flex flex-wrap gap-4 items-center w-full md:w-auto justify-end">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-semibold text-brand-muted uppercase tracking-wide">
              Source:
            </span>
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="px-2 py-1.5 rounded-lg border border-brand-rule bg-white text-brand-ink text-xs focus:outline-none focus:border-brand-primary"
            >
              <option value="all">All Sources</option>
              <option value="contact">Contact Inquiry</option>
              <option value="trial">Trial Request</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-semibold text-brand-muted uppercase tracking-wide">
              Status:
            </span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-2 py-1.5 rounded-lg border border-brand-rule bg-white text-brand-ink text-xs focus:outline-none focus:border-brand-primary"
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="converted">Converted</option>
            </select>
          </div>
        </div>
      </div>

      {/* Leads list */}
      {filteredLeads.length === 0 ? (
        <div className="text-center py-12 bg-brand-cream-warm/10 rounded-xl border border-brand-rule border-dashed">
          <p className="text-brand-muted text-sm">
            No leads match the current filters.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto border border-brand-rule rounded-xl shadow-sm">
          <table className="w-full text-left text-xs text-brand-ink bg-white border-collapse">
            <thead>
              <tr className="bg-brand-cream-warm/10 border-b border-brand-rule font-bold text-brand-muted">
                <th className="p-3.5">Name</th>
                <th className="p-3.5">Contact Details</th>
                <th className="p-3.5">Message / Inquiry</th>
                <th className="p-3.5">Source</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-rule/40">
              {filteredLeads.map((l) => (
                <tr key={l.id} className="hover:bg-brand-cream-warm/5">
                  <td className="p-3.5 font-semibold align-top">{l.name}</td>
                  <td className="p-3.5 align-top space-y-1">
                    <div className="font-medium">{l.email}</div>
                    {l.phone && (
                      <div className="text-brand-muted">{l.phone}</div>
                    )}
                    <div className="text-[10px] text-brand-muted">
                      {new Date(l.createdAt).toLocaleDateString()}{" "}
                      {new Date(l.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </td>
                  <td className="p-3.5 align-top max-w-xs break-words whitespace-pre-wrap text-brand-muted">
                    {l.message || (
                      <span className="italic opacity-60">
                        No message provided
                      </span>
                    )}
                  </td>
                  <td className="p-3.5 align-top">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                        l.source === "contact"
                          ? "bg-purple-50 text-purple-700 border border-purple-100"
                          : "bg-blue-50 text-blue-700 border border-blue-100"
                      }`}
                    >
                      {l.source}
                    </span>
                  </td>
                  <td className="p-3.5 align-top">
                    <select
                      value={l.status}
                      onChange={(e) => handleStatusChange(l.id, e.target.value)}
                      className={`px-2 py-1 rounded-lg text-[10px] font-bold border focus:outline-none cursor-pointer ${
                        l.status === "new"
                          ? "bg-amber-50 text-amber-700 border-amber-200"
                          : l.status === "contacted"
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : "bg-emerald-50 text-emerald-700 border-emerald-200"
                      }`}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="converted">Converted</option>
                    </select>
                  </td>
                  <td className="p-3.5 align-top text-right">
                    <button
                      onClick={() => handleDelete(l.id)}
                      className="px-2 py-1 rounded-lg text-[10px] font-semibold text-red-600 border border-red-100 hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
