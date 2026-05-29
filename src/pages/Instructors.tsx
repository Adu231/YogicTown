import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { useScrollTop } from '@/hooks/useScrollTop';
import { Star, CheckCircle, Search, Filter, ArrowRight, SlidersHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { INSTRUCTORS } from '@/constants';
import { toast } from 'sonner';

const SPECIALTIES = ['All', 'Hatha Yoga', 'Vinyasa', 'Ashtanga', 'Yin Yoga', 'Kundalini', 'Meditation', 'Sound Healing'];

const Instructors = () => {
  useScrollTop();
  const [search, setSearch] = useState('');
  const [specialty, setSpecialty] = useState('All');
  
  // Advanced filters and sorting state
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('rating');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [priceMax, setPriceMax] = useState(120);
  const [experienceMin, setExperienceMin] = useState(0);

  const filteredAndSorted = INSTRUCTORS.filter((ins) => {
    // 1. Specialty Match
    const matchSpec = specialty === 'All' || ins.specialty.some((s) => s.includes(specialty));
    
    // 2. Search Match
    const matchSearch = !search || 
      ins.name.toLowerCase().includes(search.toLowerCase()) || 
      ins.specialty.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    
    // 3. Verification Match
    const matchVerified = !verifiedOnly || ins.verified;
    
    // 4. Price Match
    const matchPrice = ins.price <= priceMax;
    
    // 5. Experience Match
    const expYears = parseInt(ins.experience) || 0;
    const matchExp = expYears >= experienceMin;

    return matchSpec && matchSearch && matchVerified && matchPrice && matchExp;
  }).sort((a, b) => {
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    if (sortBy === 'experience') {
      const expA = parseInt(a.experience) || 0;
      const expB = parseInt(b.experience) || 0;
      return expB - expA;
    }
    if (sortBy === 'price-asc') {
      return a.price - b.price;
    }
    if (sortBy === 'price-desc') {
      return b.price - a.price;
    }
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="section-padding" style={{ background: 'linear-gradient(135deg, hsl(133 20% 96%) 0%, hsl(60 17% 98%) 100%)' }}>
          <div className="max-w-4xl mx-auto text-center">
            <div className="tag-pill mx-auto mb-5 w-fit"><Star size={12} /> Certified Instructors</div>
            <h1 className="text-5xl font-bold mb-5">
              Learn from the<br />
              <span className="italic" style={{ color: 'hsl(27 87% 60%)' }}>World's Best</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">500+ verified yoga instructors. Every teacher is background-checked, credential-verified, and community-rated.</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or style..." type="text"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
              </div>
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm transition-colors ${showFilters ? 'bg-primary/10 border-primary text-primary font-semibold' : 'border-border hover:bg-muted'}`}
              >
                <Filter size={15} /> {showFilters ? 'Hide Filters' : 'Filters'}
              </button>
            </div>

            {/* Premium Collapsible Filters Panel */}
            {showFilters && (
              <div className="mt-6 p-6 rounded-2xl bg-background border border-border text-left shadow-lg animate-in fade-in slide-in-from-top-4 duration-300 max-w-lg mx-auto">
                <div className="flex items-center justify-between mb-4 border-b border-border pb-3">
                  <h3 className="font-semibold text-sm flex items-center gap-2">
                    <SlidersHorizontal size={14} /> Filter & Sort
                  </h3>
                  <button onClick={() => {
                    setSortBy('rating');
                    setVerifiedOnly(false);
                    setPriceMax(120);
                    setExperienceMin(0);
                    toast.success('Filters reset successfully');
                  }} className="text-xs font-semibold transition-colors hover:opacity-85" style={{ color: 'hsl(133 18% 45%)' }}>
                    Reset All
                  </button>
                </div>
                
                <div className="space-y-4">
                  {/* Sorting */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Sort By</label>
                    <select 
                      value={sortBy} 
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-muted border border-transparent focus:border-border focus:outline-none text-sm cursor-pointer"
                    >
                      <option value="rating">Highest Rating</option>
                      <option value="experience">Most Experienced</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="name">Name: A-Z</option>
                    </select>
                  </div>

                  {/* Verification Status */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                      Verification
                    </label>
                    <div className="flex items-center">
                      <label className="relative flex items-center gap-2.5 cursor-pointer text-sm select-none">
                        <input 
                          type="checkbox" 
                          checked={verifiedOnly} 
                          onChange={(e) => setVerifiedOnly(e.target.checked)}
                          className="w-4.5 h-4.5 rounded text-primary focus:ring-primary border-border bg-muted cursor-pointer" 
                        />
                        <span className="font-medium text-muted-foreground text-xs">Verified Instructors Only</span>
                      </label>
                    </div>
                  </div>

                  {/* Price Filter */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Max Hourly Rate</label>
                      <span className="text-xs font-bold text-foreground">${priceMax}/hr</span>
                    </div>
                    <input 
                      type="range" 
                      min="40" 
                      max="120" 
                      step="5"
                      value={priceMax} 
                      onChange={(e) => setPriceMax(Number(e.target.value))}
                      className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary" 
                    />
                    <div className="flex justify-between text-[10px] text-muted-foreground">
                      <span>$40</span>
                      <span>$80</span>
                      <span>$120</span>
                    </div>
                  </div>

                  {/* Experience Filter */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Min Experience</label>
                      <span className="text-xs font-bold text-foreground">{experienceMin}+ years</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="20" 
                      step="1"
                      value={experienceMin} 
                      onChange={(e) => setExperienceMin(Number(e.target.value))}
                      className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary" 
                    />
                    <div className="flex justify-between text-[10px] text-muted-foreground">
                      <span>0 yrs</span>
                      <span>10 yrs</span>
                      <span>20 yrs</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
          {/* Specialty Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {SPECIALTIES.map((s) => (
              <button key={s} onClick={() => setSpecialty(s)}
                className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${specialty === s ? 'border-transparent text-white' : 'border-border hover:border-primary/40'}`}
                style={specialty === s ? { background: 'hsl(133 18% 59%)' } : {}}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Instructor Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredAndSorted.length > 0 ? filteredAndSorted.map((ins) => (
              <div key={ins.id} className="card-wellness overflow-hidden p-0">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={ins.avatar} alt={ins.name} className="w-full h-full object-cover" />
                  {ins.verified && (
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow" style={{ background: 'hsl(133 18% 59%)' }}>
                      <CheckCircle size={16} className="text-white" />
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-base mb-1">{ins.name}</h3>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {ins.specialty.slice(0, 2).map((s) => <div key={s} className="tag-pill">{s}</div>)}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">{ins.bio}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Star size={12} fill="currentColor" style={{ color: 'hsl(27 87% 67%)' }} />
                      <strong className="text-foreground">{ins.rating}</strong> ({ins.reviews})
                    </div>
                    <span>{ins.experience} exp.</span>
                    <span className="font-semibold text-foreground">${ins.price}/hr</span>
                  </div>
                  <button onClick={() => toast.success(`Booking request sent to ${ins.name}!`)}
                    className="w-full py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                    style={{ background: 'hsl(133 18% 59%)' }}>
                    Book Session
                  </button>
                </div>
              </div>
            )) : (
              <div className="col-span-full text-center py-16">
                <div className="text-4xl mb-3">🧘</div>
                <h3 className="font-semibold mb-2">No instructors found</h3>
                <button onClick={() => { setSearch(''); setSpecialty('All'); setSortBy('rating'); setVerifiedOnly(false); setPriceMax(120); setExperienceMin(0); }} className="text-sm font-medium hover:underline" style={{ color: 'hsl(133 18% 59%)' }}>
                  Clear filters
                </button>
              </div>
            )}
          </div>

          {/* Become an Instructor CTA */}
          <div className="mt-14 rounded-3xl overflow-hidden p-8 md:p-12 text-center" style={{ background: 'linear-gradient(135deg, hsl(133 18% 59%), hsl(133 22% 48%))' }}>
            <h2 className="text-3xl font-bold text-white mb-3">Are You a Certified Yoga Instructor?</h2>
            <p className="text-white/75 mb-6 max-w-xl mx-auto">Join 500+ instructors on YogicTown. Set your own schedule, earn from your expertise, and build a global student community.</p>
            <Link to="/apply-instructor" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-white transition-all hover:bg-white/90"
              style={{ color: 'hsl(133 18% 59%)' }}>
              Apply as Instructor <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Instructors;
