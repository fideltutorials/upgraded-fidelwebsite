"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/layouts/Layout";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon, FilterIcon, Cancel01Icon } from "@hugeicons/core-free-icons";

interface Tutor {
  id: number;
  name: string;
  initials: string;
  image?: string | null;
  specialties: string[];
  grades: string[];
  bio: string;
}

const DEFAULT_TUTORS: Tutor[] = [
  {
    id: 1,
    name: "Hanna G.",
    initials: "HG",
    image: null,
    specialties: ["Mathematics"],
    grades: ["Grades 9 & 10", "Grades 11 & 12"],
    bio: "Eight years guiding Grade-12 students through EHEECE mathematics. Specialises in students who say they 'are not a maths person.'",
  },
  {
    id: 2,
    name: "Daniel M.",
    initials: "DM",
    image: null,
    specialties: ["English"],
    grades: ["SAT", "TOEFL"],
    bio: "Tutors students preparing for US and Canadian universities. Former examiner; obsessive about clear writing and a calm test day.",
  },
  {
    id: 3,
    name: "Selam A.",
    initials: "SA",
    image: null,
    specialties: ["Sciences"],
    grades: ["Grades 5–8", "Grades 9 & 10"],
    bio: "Biology and chemistry. Brings lab thinking into living rooms — every concept demonstrated before it is memorised.",
  },
  {
    id: 4,
    name: "Yonas T.",
    initials: "YT",
    image: null,
    specialties: ["Coding"],
    grades: ["Grades 5–8", "Grades 9 & 10"],
    bio: "Python, web development, and competitive maths. Leads the summer STEM camp and the Saturday coding cohort.",
  },
];

export default function Tutors() {
  const [tutorsList, setTutorsList] = useState<Tutor[]>(DEFAULT_TUTORS);
  const [filteredTutors, setFilteredTutors] = useState<Tutor[]>(DEFAULT_TUTORS);
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [selectedGrade, setSelectedGrade] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const res = await fetch("/api/tutors");
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setTutorsList(data);
            setFilteredTutors(data);
          }
        }
      } catch (err) {
        console.error("Failed to fetch tutors:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTutors();
  }, []);

  // Filter Logic
  useEffect(() => {
    let filtered = tutorsList;

    // Search Query filter
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.bio.toLowerCase().includes(q) ||
          t.specialties.some((s) => s.toLowerCase().includes(q)) ||
          t.grades.some((g) => g.toLowerCase().includes(q))
      );
    }

    // Specialty filter
    if (selectedSpecialty !== "All") {
      filtered = filtered.filter((t) =>
        t.specialties.includes(selectedSpecialty)
      );
    }

    // Grade filter
    if (selectedGrade !== "All") {
      filtered = filtered.filter((t) =>
        t.grades.includes(selectedGrade) || t.grades.includes("All")
      );
    }

    setFilteredTutors(filtered);
  }, [searchQuery, selectedSpecialty, selectedGrade, tutorsList]);

  // Extract all unique specialties
  const allSpecialties = ["All", ...Array.from(new Set(tutorsList.flatMap((t) => t.specialties)))];

  // Extract all unique grades
  const allGrades = ["All", ...Array.from(new Set(tutorsList.flatMap((t) => t.grades)))];

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedSpecialty("All");
    setSelectedGrade("All");
  };

  return (
    <Layout
      title="Our Vetted Tutor Network — Fidel Tutorial"
      description="Meet our vetted, subject-matter expert tutors. Filter by specialty and grades to find the perfect match."
    >
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-brand-cream-warm/40 border-b border-brand-rule">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <span className="text-xs font-bold tracking-widest text-brand-secondary uppercase block mb-3 font-semibold">Tutor Directory</span>
          <h1 className="font-serif text-4xl md:text-6xl font-medium text-brand-ink tracking-tight mb-6">
            Meet Our Professional Instructors
          </h1>
          <p className="text-brand-muted text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Our network consists of vetted, high-performing tutors trained in our results-driven methods. Filter below by subject and level to find the right fit for your child.
          </p>
        </div>
      </section>

      {/* Filter and Content Area */}
      <section className="py-16 bg-brand-paper">
        <div className="max-w-[1200px] mx-auto px-6">
          
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-6 border border-brand-rule bg-brand-cream-warm/10 rounded-2xl mb-12 shadow-sm">
            {/* Search Input */}
            <div className="relative w-full md:max-w-xs">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-muted/70">
                <HugeiconsIcon icon={Search01Icon} size={18} />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, subject..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-brand-rule bg-white text-brand-ink text-sm placeholder:text-brand-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-all"
              />
            </div>

            {/* Filter Selects */}
            <div className="flex flex-wrap gap-4 items-center w-full md:w-auto justify-end">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-brand-muted/80 uppercase tracking-wide whitespace-nowrap">Specialty:</span>
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl border border-brand-rule bg-white text-brand-ink text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-all"
                >
                  {allSpecialties.map((spec) => (
                    <option key={spec} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-brand-muted/80 uppercase tracking-wide whitespace-nowrap">Grade Level:</span>
                <select
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl border border-brand-rule bg-white text-brand-ink text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-all"
                >
                  {allGrades.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>

              {(searchQuery || selectedSpecialty !== "All" || selectedGrade !== "All") && (
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-brand-primary hover:bg-brand-primary/5 border border-brand-primary/20 transition-all cursor-pointer"
                >
                  <HugeiconsIcon icon={Cancel01Icon} size={12} />
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Grid View */}
          {loading ? (
            <div className="text-center py-20">
              <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-brand-muted text-sm">Loading our tutor directory...</p>
            </div>
          ) : filteredTutors.length === 0 ? (
            <div className="text-center py-20 bg-brand-cream-warm/20 rounded-2xl border border-brand-rule border-dashed">
              <span className="text-3xl block mb-3">🔍</span>
              <h3 className="font-serif text-lg font-semibold text-brand-ink mb-1">No tutors found</h3>
              <p className="text-brand-muted text-sm max-w-sm mx-auto mb-6">
                We couldn't find any tutors matching "{searchQuery}" with your chosen subject filters.
              </p>
              <button
                onClick={handleResetFilters}
                className="bg-brand-primary text-brand-paper hover:bg-brand-primary-deep px-5 py-2.5 rounded-xl text-xs font-semibold transition-colors"
              >
                Clear Search & Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredTutors.map((tutor) => (
                <article
                  key={tutor.id}
                  className="bg-brand-paper border border-brand-rule rounded-2xl overflow-hidden shadow-sm flex flex-col hover:border-brand-secondary hover:-translate-y-1.5 transition-all duration-300"
                >
                  {/* Photo / Avatar Section */}
                  <div className="aspect-square bg-gradient-to-br from-brand-cream-warm to-brand-cream flex items-center justify-center relative overflow-hidden group">
                    {tutor.image ? (
                      <img
                        src={tutor.image}
                        alt={tutor.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-brand-primary text-brand-secondary flex items-center justify-center font-serif text-3xl font-semibold shadow-md shadow-brand-primary/10">
                        {tutor.initials}
                      </div>
                    )}
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-brand-secondary/10 pointer-events-none" />
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-serif text-xl font-bold text-brand-ink mb-2">{tutor.name}</h3>
                    
                    {/* Tags / Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {tutor.specialties.map((spec) => (
                        <span
                          key={spec}
                          className="bg-brand-primary/5 text-brand-primary px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-brand-primary/10"
                        >
                          {spec}
                        </span>
                      ))}
                      {tutor.grades.map((grade) => (
                        <span
                          key={grade}
                          className="bg-brand-cream-warm/70 text-brand-ink px-2.5 py-0.5 rounded-full text-[10px] font-semibold border border-brand-rule"
                        >
                          {grade}
                        </span>
                      ))}
                    </div>

                    <p className="text-brand-muted text-xs leading-relaxed mb-6 flex-1">{tutor.bio}</p>

                    {/* Action Button */}
                    <a
                      href={`/book?tutor=${tutor.id}`}
                      className="text-center bg-brand-primary hover:bg-brand-primary-deep text-brand-paper py-3 rounded-xl font-semibold text-xs transition-colors shadow-sm block"
                    >
                      Book a Free Trial Session
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Career Banner bottom */}
      <section className="py-20 bg-brand-cream-warm/40 border-t border-brand-rule">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <span className="text-xs font-bold tracking-widest text-brand-secondary uppercase block mb-3 font-semibold">Join the Team</span>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-brand-ink mb-4">Apply to Teach with Us</h2>
          <p className="text-brand-muted text-base leading-relaxed mb-8">
            Are you a passionate educator or subject matter expert looking to make a difference? We are always expanding our network of vetted, trained, and certified tutors in Addis Ababa and online.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="mailto:careers@fideltutorial.com" className="bg-brand-primary text-brand-paper hover:bg-brand-primary-deep px-8 py-4 rounded-full font-bold transition-all hover:-translate-y-0.5 shadow-md">
              Submit Tutor Application
            </a>
            <a href="/contact" className="border border-brand-rule hover:bg-brand-cream-warm text-brand-ink px-8 py-4 rounded-full font-bold transition-all">
              Contact Recruitment Advisor
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
