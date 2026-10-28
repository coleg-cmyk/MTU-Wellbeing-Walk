import React, { useState, useEffect } from 'react';
import {
  Compass,
  Heart,
  BookOpen,
  MapPin,
  Sparkles,
  TreePine,
  Activity,
  PhoneCall,
  Clock,
  ExternalLink,
  ChevronRight,
  Sun,
  Smile,
  ShieldAlert,
  Wind,
  Award,
  Send,
  MessageSquare,
  CheckCircle,
  BarChart2,
  Filter,
  Navigation,
  RefreshCw,
  Sparkle
} from 'lucide-react';

// --- CURATED MTU & HOUGHTON TRAILS DATA ---
const TRAILS_DATA = [
  {
    id: 'tech-trails-core',
    name: 'Tech Trails Core Loop',
    category: 'On-Campus',
    proximity: 'On-campus',
    distance: 1.8,
    timeMins: 35,
    difficulty: 'Easy',
    elevation: '75 ft',
    surface: 'Gravel / Packed Dirt',
    allTrailsUrl: 'https://www.alltrails.com/us/michigan/houghton',
    description: 'Located right behind the SDC, this core loop offers dense cedar and maple forest coverage. Perfect for a quick break between classes.',
    wellbeingTip: 'Focus on the smell of pine and cedar trees. Take slow deep breaths while walking up the gentle inclines.',
    features: ['Shaded', 'Benches', 'Biking Allowed', 'Snowshoe Friendly'],
    vibeMatch: ['Quick energizer between classes', 'De-stress before exam']
  },
  {
    id: 'nara-nature-park',
    name: 'Nara Nature Park Boardwalk',
    category: 'Near Campus',
    proximity: '0.5-2 mi',
    distance: 2.5,
    timeMins: 50,
    difficulty: 'Easy',
    elevation: '20 ft',
    surface: 'Wooden Boardwalk & Flat Trail',
    allTrailsUrl: 'https://www.alltrails.com/parks/us/michigan/nara-nature-center',
    description: 'Meanders peacefully along the Pilgrim River and wetlands with scenic covered bridges and wildlife viewing platforms.',
    wellbeingTip: 'Listen to the sound of flowing water beneath the boardwalk to ground yourself when feeling overwhelmed.',
    features: ['Waterfront', 'Bird Watching', 'Wheelchair Accessible', 'Covered Bridges'],
    vibeMatch: ['Scenic views & fresh air', 'Nature immersion', 'De-stress before exam']
  },
  {
    id: 'princes-point-walk',
    name: 'Prince’s Point Waterfront Path',
    category: 'On-Campus',
    proximity: 'On-campus',
    distance: 0.9,
    timeMins: 20,
    difficulty: 'Easy',
    elevation: '15 ft',
    surface: 'Paved / Dirt Path',
    allTrailsUrl: 'https://www.alltrails.com/us/michigan/houghton',
    description: 'Scenic shoreline walk along the Portage Lake Shipping Canal starting right near campus residence halls.',
    wellbeingTip: 'Gaze out across the water to the lift bridge. Open horizon views help quiet racing thoughts.',
    features: ['Waterfront', 'Benches', 'Sunset Spot', 'Very Short'],
    vibeMatch: ['Quick energizer between classes', 'Scenic views & fresh air']
  },
  {
    id: 'mont-ripley-loop',
    name: 'Mont Ripley Ridge Overview',
    category: 'Short Drive',
    proximity: '0.5-2 mi',
    distance: 2.2,
    timeMins: 60,
    difficulty: 'Moderate',
    elevation: '420 ft',
    surface: 'Rugged Trail / Hill',
    allTrailsUrl: 'https://www.alltrails.com/trail/us/michigan/mont-ripley-trail',
    description: 'Challenging uphill climb to the ski hill crest offering breathtaking panoramic views of Houghton, Hancock, and the Portage Lift Bridge.',
    wellbeingTip: 'Use physical exertion as a healthy release for pent-up stress or anxiety. Celebrate reaching the summit panorama!',
    features: ['Panoramic View', 'High Elevation', 'Steep Incline', 'Fall Foliage Spot'],
    vibeMatch: ['Scenic views & fresh air', 'High physical energy release']
  },
  {
    id: 'portage-canal-walkway',
    name: 'Houghton Waterfront & Lift Bridge Walk',
    category: 'Walkable',
    proximity: '0.5-2 mi',
    distance: 3.1,
    timeMins: 60,
    difficulty: 'Easy',
    elevation: '10 ft',
    surface: 'Paved Walkway',
    allTrailsUrl: 'https://www.alltrails.com/us/michigan/houghton',
    description: 'Paved waterfront trail stretching along downtown Houghton waterfront park leading right up to the Historic Houghton-Hancock Lift Bridge.',
    wellbeingTip: 'Great for walking with a classmate or friend to check in with each other away from study desks.',
    features: ['Paved', 'Dog Friendly', 'Near Coffee Shops', 'Night Lighting'],
    vibeMatch: ['Scenic views & fresh air', 'Social walk with friend']
  },
  {
    id: 'pilgrim-river-watershed',
    name: 'Pilgrim River Watershed Nature Trail',
    category: 'Short Drive',
    proximity: '2+ mi drive',
    distance: 3.8,
    timeMins: 80,
    difficulty: 'Moderate',
    elevation: '180 ft',
    surface: 'Forest Dirt & Roots',
    allTrailsUrl: 'https://www.alltrails.com/trail/us/michigan/pilgrim-river-forest-trail',
    description: 'Tranquil deep-woods trail through mature hemlocks, hardwoods, and along the winding rapids of Pilgrim River.',
    wellbeingTip: 'Practice Shinrin-yoku (Japanese Forest Bathing). Put away phone notifications and immerse all 5 senses in the forest surroundings.',
    features: ['Deep Forest', 'River Rapids', 'Quiet / Low Traffic', 'Wildflowers'],
    vibeMatch: ['Nature immersion', 'De-stress before exam']
  }
];

// --- INITIAL COMMUNITY LOGS ---
const MOCK_COMMUNITY_LOGS = [
  {
    id: 1,
    name: 'Hannah M.',
    major: 'Mechanical Engineering',
    trail: 'Nara Nature Park Boardwalk',
    miles: 2.5,
    reflection: 'Needed a break from thermodynamics prep. Walking along the Pilgrim River listening to the water completely reset my stress levels!',
    date: '2 hours ago',
    mood: 'Calm & Recharged'
  },
  {
    id: 2,
    name: 'Derek K.',
    major: 'Computer Science',
    trail: 'Tech Trails Core Loop',
    miles: 1.8,
    reflection: 'Crisp autumn air behind the SDC. 35 minutes away from screens did wonders for my focus.',
    date: '5 hours ago',
    mood: 'Energized'
  },
  {
    id: 3,
    name: 'Prof. Larson',
    major: 'Biology Dept',
    trail: 'Prince’s Point Waterfront Path',
    miles: 0.9,
    reflection: 'Quick sunset walk by the Portage Canal before heading home. Reminded me how lucky we are to live in the Keweenaw.',
    date: '1 day ago',
    mood: 'Grateful'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  // Filter state for Walks
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [proximityFilter, setProximityFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrailModal, setSelectedTrailModal] = useState(null);

  // AI Path Finder State
  const [aiTime, setAiTime] = useState('30 mins');
  const [aiLength, setAiLength] = useState('1-3 mi');
  const [aiProximity, setAiProximity] = useState('Walkable from dorms');
  const [aiVibe, setAiVibe] = useState('De-stress before exam');
  const [aiResult, setAiResult] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  // Wellbeing Interactive Toolkit States
  const [breathingPhase, setBreathingPhase] = useState('Inhale');
  const [breathingTimer, setBreathingTimer] = useState(4);
  const [isBreathingActive, setIsBreathingActive] = useState(false);

  // Trail Log State
  const [logs, setLogs] = useState(MOCK_COMMUNITY_LOGS);
  const [logForm, setLogForm] = useState({
    name: '',
    major: '',
    trail: 'Tech Trails Core Loop',
    miles: '1.8',
    reflection: '',
    mood: 'Calm'
  });
  const [logSubmitted, setLogSubmitted] = useState(false);

  // Mood Widget State
  const [currentMood, setCurrentMood] = useState('');
  const [moodMessage, setMoodMessage] = useState('');

  // Breathing Circle Animation Effect
  useEffect(() => {
    let interval = null;
    if (isBreathingActive) {
      interval = setInterval(() => {
        setBreathingTimer((prev) => {
          if (prev > 1) return prev - 1;
          // Phase shift logic
          setBreathingPhase((currPhase) => {
            if (currPhase === 'Inhale (4s)') return 'Hold (4s)';
            if (currPhase === 'Hold (4s)') return 'Exhale (4s)';
            if (currPhase === 'Exhale (4s)') return 'Rest (4s)';
            return 'Inhale (4s)';
          });
          return 4;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isBreathingActive]);

  // Mood selector handler
  const handleMoodSelect = (mood) => {
    setCurrentMood(mood);
    const messages = {
      Stressed: "We hear you! Houghton's quiet nature paths are proven to lower cortisol. Try a gentle 20-min boardwalk walk at Nara Park.",
      Anxious: "Grounding yourself is key. Try our 5-4-3-2-1 exercise on the Resources page or take a calm stroll along Prince's Point.",
      Tired: "A quick 15-minute trail walk behind the SDC can pump oxygen to your brain and give you natural energy without caffeine crash!",
      Happy: "Awesome! Share that positive energy by completing a walk and posting an inspiring note on our Trail Log!",
      Overwhelmed: "Take a step back from assignments. Nature doesn't ask anything of you. Head to Tech Trails and just breathe."
    };
    setMoodMessage(messages[mood] || "Taking a short walk is always a great choice for your well-being!");
  };

  // Filter Trails
  const filteredTrails = TRAILS_DATA.filter((trail) => {
    const matchesDiff = difficultyFilter === 'All' || trail.difficulty === difficultyFilter;
    const matchesProx = proximityFilter === 'All' || trail.proximity === proximityFilter;
    const matchesSearch = trail.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          trail.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDiff && matchesProx && matchesSearch;
  });

  // AI Path Finder generator handler
  const handleGenerateAiPath = async () => {
    setAiLoading(true);
    setAiResult(null);

    // Call Gemini API if available, otherwise rich smart matching with custom generated AI text
    const prompt = `Act as an expert MTU Campus Wellbeing guide in Houghton, Michigan. Recommend the single best trail from these options: Tech Trails Core Loop, Nara Nature Park, Prince's Point Waterfront Path, Mont Ripley Ridge Overview, Portage Canal Walkway, or Pilgrim River Watershed based on:
    - Time available: ${aiTime}
    - Desired distance: ${aiLength}
    - Proximity to MTU Campus: ${aiProximity}
    - Student Goal/Vibe: ${aiVibe}
    Provide a warm, encouraging recommendation explaining WHY it fits their current vibe, Keweenaw safety/weather advice, and a mindful wellness tip for their walk. Format cleanly with key sections.`;

    try {
      const apiKey = ""; // Runtime key supplied if configured
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          systemInstruction: {
            parts: [{ text: "You are an empathetic, knowledgeable wellness guide for Michigan Tech students in Houghton, MI. Keep response clear, well-structured, inspiring, and concise." }]
          }
        })
      });

      const data = await response.json();
      const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (generatedText) {
        // Find best matched trail for badge linking
        const matched = TRAILS_DATA.find(t =>
          t.vibeMatch.includes(aiVibe) || generatedText.toLowerCase().includes(t.name.toLowerCase())
        ) || TRAILS_DATA[0];

        setAiResult({
          text: generatedText,
          trail: matched
        });
      } else {
        throw new Error('API output fallback triggered');
      }
    } catch (err) {
      // Smart algorithm fallback tailored to selections
      let matchedTrail = TRAILS_DATA[0];
      if (aiVibe === 'Scenic views & fresh air') matchedTrail = TRAILS_DATA[1]; // Nara Boardwalk
      else if (aiProximity === 'On-campus' || aiTime === '15 mins') matchedTrail = TRAILS_DATA[2]; // Prince's Point
      else if (aiVibe === 'High physical energy release') matchedTrail = TRAILS_DATA[3]; // Mont Ripley
      else if (aiVibe === 'Nature immersion') matchedTrail = TRAILS_DATA[5]; // Pilgrim River

      setAiResult({
        text: `### 🌲 Recommended for You: **${matchedTrail.name}**\n\n**Why it fits your current vibe:**\nSince your goal is **"${aiVibe}"** with **${aiTime}** available, **${matchedTrail.name}** is your ideal sanctuary. Situated **${matchedTrail.proximity}**, it requires minimal transit hassle so you can maximize your trail time.\n\n**Mindful Reflection Tip:**\n${matchedTrail.wellbeingTip}\n\n**Keweenaw Trail Advice:**\nWear sturdy boots or non-slip footwear. Remember that weather along Lake Superior and the Portage Canal changes rapidly—layer up with a warm windbreaker!`,
        trail: matchedTrail
      });
    } finally {
      setAiLoading(false);
    }
  };

  // Submit Trail Log
  const handleLogSubmit = (e) => {
    e.preventDefault();
    if (!logForm.name || !logForm.reflection) return;

    const newLog = {
      id: Date.now(),
      name: logForm.name,
      major: logForm.major || 'Huskies Community',
      trail: logForm.trail,
      miles: parseFloat(logForm.miles) || 1.5,
      reflection: logForm.reflection,
      date: 'Just now',
      mood: logForm.mood
    };

    setLogs([newLog, ...logs]);
    setLogSubmitted(true);
    setTimeout(() => setLogSubmitted(false), 4000);
    setLogForm({
      name: '',
      major: '',
      trail: 'Tech Trails Core Loop',
      miles: '1.8',
      reflection: '',
      mood: 'Calm'
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-900">
      
      {/* --- TOP HEADER / NAVIGATION --- */}
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo & Brand Name */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-emerald-500 p-0.5 shadow-lg shadow-amber-500/10">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                  <TreePine className="w-6 h-6 text-amber-400" />
                </div>
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
                  MTU Wellbeing <span className="text-amber-400 font-black">Walks</span>
                </span>
                <span className="block text-xs font-medium text-emerald-400/90 tracking-wide uppercase">
                  Michigan Tech Student Project
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 bg-slate-800/80 p-1.5 rounded-full border border-slate-700/60">
              {[
                { id: 'home', label: 'Home', icon: Sun },
                { id: 'about', label: 'About', icon: BookOpen },
                { id: 'walks', label: 'Walks & Trails', icon: Navigation },
                { id: 'ai-finder', label: 'AI Path Finder', icon: Sparkles, badge: 'Smart' },
                { id: 'resources', label: 'Resources', icon: Heart },
                { id: 'log', label: 'Trail Log', icon: Activity }
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 relative ${
                      isActive
                        ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20 scale-105'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-amber-400/80'}`} />
                    {item.label}
                    {item.badge && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded-full font-bold uppercase bg-emerald-500 text-slate-950">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Emergency Hotline Quick Button */}
            <a
              href="#husky-support"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('resources');
              }}
              className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 text-xs font-bold transition"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              Husky 24/7 Line
            </a>
          </div>

          {/* Mobile Navigation Scroll Tab Bar */}
          <div className="md:hidden flex overflow-x-auto py-2 border-t border-slate-800 gap-2 no-scrollbar">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'walks', label: 'Walks' },
              { id: 'ai-finder', label: 'AI Finder' },
              { id: 'resources', label: 'Resources' },
              { id: 'log', label: 'Trail Log' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                  activeTab === tab.id
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* --- PAGE CONTENT AREA --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ================= PAGE 1: HOME ================= */}
        {activeTab === 'home' && (
          <div className="space-y-12">
            
            {/* Hero Section */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 border border-slate-800 p-8 sm:p-12 lg:p-16 shadow-2xl">
              {/* Background ambient light */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-3xl space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-wide uppercase">
                  <TreePine className="w-4 h-4 text-amber-400" />
                  Keweenaw Mind-Body Connection
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                  Step Outdoors. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-400">
                    Clear Your Mind.
                  </span>
                </h1>

                <p className="text-slate-300 text-lg sm:text-xl leading-relaxed">
                  A dedicated wellbeing initiative for Michigan Tech students, faculty, and staff. Connecting our campus community with Houghton's serene outdoor trails and mental health resources.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={() => setActiveTab('ai-finder')}
                    className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold shadow-xl shadow-amber-400/20 transition transform hover:-translate-y-0.5"
                  >
                    <Sparkles className="w-5 h-5 text-slate-950" />
                    AI Trail Recommender
                  </button>
                  <button
                    onClick={() => setActiveTab('walks')}
                    className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold border border-slate-700 transition"
                  >
                    <Compass className="w-5 h-5 text-amber-400" />
                    Explore 6 Local Trails
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Mood Check-in Widget */}
            <div className="bg-slate-800/80 rounded-2xl p-6 sm:p-8 border border-slate-700/80 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-amber-400/10 rounded-lg text-amber-400">
                  <Smile className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">How are you feeling today, Husky?</h2>
                  <p className="text-sm text-slate-400">Select a mood for a instant personalized wellness tip</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 my-6">
                {['Stressed', 'Anxious', 'Tired', 'Happy', 'Overwhelmed'].map((mood) => (
                  <button
                    key={mood}
                    onClick={() => handleMoodSelect(mood)}
                    className={`p-3.5 rounded-xl border text-sm font-semibold transition text-center ${
                      currentMood === mood
                        ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold scale-105 shadow-md'
                        : 'bg-slate-900/60 border-slate-700 text-slate-300 hover:border-amber-400/50 hover:bg-slate-900'
                    }`}
                  >
                    {mood}
                  </button>
                ))}
              </div>

              {moodMessage && (
                <div className="p-4 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-emerald-200 text-sm flex items-start gap-3 animate-fadeIn">
                  <Sparkle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-emerald-300 mb-0.5">Wellbeing Suggestion:</span>
                    {moodMessage}
                  </div>
                </div>
              )}
            </div>

            {/* Mission Statement Box */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-800/60 border border-slate-700/70 p-6 rounded-2xl space-y-3">
                <div className="w-10 h-10 rounded-lg bg-amber-400/10 flex items-center justify-center text-amber-400">
                  <Heart className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Our Mission</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  To provide accessible, nature-based mental health support and outdoor walking resources to empower every member of Michigan Tech to thrive academically and personally.
                </p>
              </div>

              <div className="bg-slate-800/60 border border-slate-700/70 p-6 rounded-2xl space-y-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-400/10 flex items-center justify-center text-emerald-400">
                  <TreePine className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Keweenaw Nature</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Houghton receives over 200 inches of snow annually. Staying active outdoor year-round is vital to combating Seasonal Affective Disorder (SAD) and boosting mood.
                </p>
              </div>

              <div className="bg-slate-800/60 border border-slate-700/70 p-6 rounded-2xl space-y-3">
                <div className="w-10 h-10 rounded-lg bg-sky-400/10 flex items-center justify-center text-sky-400">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">24/7 Husky Support</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Walking is a helpful self-care tool, but professional support is always here for you. Directly link to MTU Counseling & crisis resources anytime.
                </p>
              </div>
            </div>

            {/* Featured Trail Highlights Preview */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Featured Campus & Local Trails</h2>
                  <p className="text-slate-400 text-sm">Curated walks synchronized with AllTrails maps</p>
                </div>
                <button
                  onClick={() => setActiveTab('walks')}
                  className="flex items-center gap-1.5 text-sm font-semibold text-amber-400 hover:text-amber-300 transition"
                >
                  View All Trails <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {TRAILS_DATA.slice(0, 3).map((trail) => (
                  <div
                    key={trail.id}
                    className="bg-slate-800/90 rounded-2xl border border-slate-700 p-5 space-y-4 hover:border-amber-400/50 transition shadow-md flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2.5 py-1 rounded-full bg-slate-900 text-amber-400 text-xs font-bold border border-amber-400/20">
                          {trail.proximity}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> {trail.timeMins} mins
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white">{trail.name}</h3>
                      <p className="text-slate-300 text-xs mt-2 line-clamp-2">{trail.description}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between">
                      <span className="text-xs font-semibold text-emerald-400">{trail.distance} miles • {trail.difficulty}</span>
                      <button
                        onClick={() => setSelectedTrailModal(trail)}
                        className="px-3 py-1.5 rounded-lg bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 text-xs font-bold transition"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ================= PAGE 2: ABOUT ================= */}
        {activeTab === 'about' && (
          <div className="space-y-12 max-w-4xl mx-auto">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-bold uppercase">
                Michigan Tech Class Project
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white">About Campus Wellbeing Walks</h1>
              <p className="text-slate-300 text-base max-w-2xl mx-auto">
                Created by MTU students to encourage daily movement, mindful breaks, and physical & mental health awareness across the Keweenaw Peninsula.
              </p>
            </div>

            {/* Detailed Story & Mind-Body Connection */}
            <div className="bg-slate-800/80 rounded-2xl border border-slate-700 p-6 sm:p-8 space-y-6">
              <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
                <BookOpen className="w-6 h-6" /> Project Origin & Story
              </h2>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                As Michigan Tech students, we understand firsthand the rigorous demands of STEM coursework, cold northern winters, and late-night study sessions in the library. It is easy to get hyper-focused on exams and lose touch with our daily physical wellbeing.
              </p>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                The <strong className="text-white">MTU Campus Wellbeing Walks</strong> initiative was founded to bridge the gap between mental health resources and physical outdoor exercise. Houghton is surrounded by breathtaking native landscapes—from the Tech Trails and Nara Boardwalk to the shores of Portage Lake.
              </p>
            </div>

            {/* Mind-Body in Houghton Climate */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-800/60 rounded-2xl border border-slate-700 p-6 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-400/10 text-emerald-400 flex items-center justify-center">
                  <Wind className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Keweenaw Climate Resilience</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Winters in Houghton are long, but outdoor exposure to natural daylight—even on overcast snow days—helps regulate circadian rhythms, improves sleep quality, and lifts mood.
                </p>
              </div>

              <div className="bg-slate-800/60 rounded-2xl border border-slate-700 p-6 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Nature Therapy (Shinrin-yoku)</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Research shows spending just 20 minutes in green or blue spaces significantly lowers salivary cortisol (stress hormone) levels and restores cognitive focus.
                </p>
              </div>
            </div>

            {/* Team / Student Contributors */}
            <div className="bg-slate-800/80 rounded-2xl border border-slate-700 p-6 sm:p-8 space-y-6">
              <h2 className="text-xl font-bold text-white">Student Contributors & Acknowledgments</h2>
              <p className="text-slate-300 text-sm">
                Developed as a class project with guidance from Michigan Tech faculty and inspired by the active Husky community. Special thanks to MTU Center for Student Mental Health & Well-being and MTU Recreation.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {[
                  { title: 'Project Focus', desc: 'Mental Health & Physical Wellness Integration' },
                  { title: 'Trail Partner Data', desc: 'AllTrails & MTU Tech Trails System' },
                  { title: 'AI Recommendation Engine', desc: 'Gemini AI API Smart Matching' }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/80">
                    <span className="text-xs font-bold text-amber-400 block mb-1">{item.title}</span>
                    <span className="text-xs text-slate-300">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= PAGE 3: WALKS / TRAILS ================= */}
        {activeTab === 'walks' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-black text-white">Explore Campus & Houghton Trails</h1>
              <p className="text-slate-400 text-sm mt-1">
                Filter by proximity to MTU campus, trail distance, or difficulty level. Synchronized with AllTrails maps.
              </p>
            </div>

            {/* Filter Bar */}
            <div className="bg-slate-800/80 p-4 sm:p-6 rounded-2xl border border-slate-700/80 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              
              {/* Search input */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Search Trails</label>
                <input
                  type="text"
                  placeholder="e.g. Nara, Boardwalk, Canal..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Difficulty Filter */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Difficulty</label>
                <select
                  value={difficultyFilter}
                  onChange={(e) => setDifficultyFilter(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="All">All Difficulties</option>
                  <option value="Easy">Easy</option>
                  <option value="Moderate">Moderate</option>
                </select>
              </div>

              {/* Proximity Filter */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Proximity to MTU</label>
                <select
                  value={proximityFilter}
                  onChange={(e) => setProximityFilter(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="All">All Proximities</option>
                  <option value="On-campus">On-campus</option>
                  <option value="0.5-2 mi">0.5 - 2 mi (Walk/Bike)</option>
                  <option value="2+ mi drive">2+ mi (Short Drive)</option>
                </select>
              </div>
            </div>

            {/* Trail Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTrails.length > 0 ? (
                filteredTrails.map((trail) => (
                  <div
                    key={trail.id}
                    className="bg-slate-800 rounded-2xl border border-slate-700/80 p-6 flex flex-col justify-between hover:border-amber-400/60 transition shadow-lg group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold">
                          {trail.proximity}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                          <Clock className="w-3.5 h-3.5 text-slate-400" /> {trail.timeMins} min
                        </span>
                      </div>

                      <h2 className="text-xl font-bold text-white group-hover:text-amber-400 transition">
                        {trail.name}
                      </h2>

                      <p className="text-slate-300 text-xs leading-relaxed">
                        {trail.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {trail.features.map((feat, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 text-[10px] font-semibold border border-slate-700">
                            {feat}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-700/80 space-y-3">
                      <div className="flex items-center justify-between text-xs text-slate-300 font-semibold">
                        <span>Distance: <strong className="text-emerald-400">{trail.distance} mi</strong></span>
                        <span>Elevation: <strong className="text-amber-400">{trail.elevation}</strong></span>
                        <span>Diff: <strong className="text-white">{trail.difficulty}</strong></span>
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <button
                          onClick={() => setSelectedTrailModal(trail)}
                          className="flex-1 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition"
                        >
                          Wellbeing View
                        </button>
                        <a
                          href={trail.allTrailsUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 transition"
                          title="Open on AllTrails"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12 bg-slate-800/40 rounded-2xl border border-dashed border-slate-700">
                  <p className="text-slate-400 text-sm">No trails matched your filter criteria.</p>
                  <button
                    onClick={() => { setDifficultyFilter('All'); setProximityFilter('All'); setSearchQuery(''); }}
                    className="mt-3 px-4 py-2 bg-amber-400 text-slate-950 rounded-xl text-xs font-bold"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= PAGE 4: AI PATH FINDER ================= */}
        {activeTab === 'ai-finder' && (
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-amber-500/10 via-slate-800 to-emerald-500/10 p-8 rounded-3xl border border-amber-500/30">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-amber-400 rounded-xl text-slate-950">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-white">AI Trail Recommender</h1>
                  <p className="text-xs sm:text-sm text-slate-300">
                    Specify your available time, current mood, and proximity preference to generate a customized path!
                  </p>
                </div>
              </div>
            </div>

            {/* Questionnaire Controls */}
            <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Available Time */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
                    Available Time
                  </label>
                  <select
                    value={aiTime}
                    onChange={(e) => setAiTime(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    <option>15 mins</option>
                    <option>30 mins</option>
                    <option>1 hour</option>
                    <option>2+ hours</option>
                  </select>
                </div>

                {/* Trail Distance */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
                    Desired Distance
                  </label>
                  <select
                    value={aiLength}
                    onChange={(e) => setAiLength(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    <option>under 1 mi</option>
                    <option>1-3 mi</option>
                    <option>3+ mi</option>
                  </select>
                </div>

                {/* Proximity */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
                    Proximity to Campus
                  </label>
                  <select
                    value={aiProximity}
                    onChange={(e) => setAiProximity(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    <option>On-campus</option>
                    <option>Walkable from dorms</option>
                    <option>Short drive</option>
                  </select>
                </div>

                {/* Vibe / Goal */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
                    Current Mood or Mental Goal
                  </label>
                  <select
                    value={aiVibe}
                    onChange={(e) => setAiVibe(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    <option>De-stress before exam</option>
                    <option>Scenic views & fresh air</option>
                    <option>Quick energizer between classes</option>
                    <option>Nature immersion</option>
                    <option>High physical energy release</option>
                  </select>
                </div>

              </div>

              <button
                onClick={handleGenerateAiPath}
                disabled={aiLoading}
                className="w-full py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-base transition flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20 disabled:opacity-50"
              >
                {aiLoading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Analyzing Keweenaw Trails...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate AI Trail Recommendation
                  </>
                )}
              </button>
            </div>

            {/* AI Output Result Box */}
            {aiResult && (
              <div className="bg-slate-800/90 rounded-2xl border border-amber-400/50 p-6 sm:p-8 space-y-6 shadow-2xl animate-fadeIn">
                <div className="flex items-center justify-between border-b border-slate-700 pb-4">
                  <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wide">
                    <Sparkle className="w-4 h-4 text-amber-400" /> AI Tailored Recommendation
                  </span>
                  <a
                    href={aiResult.trail.allTrailsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-700 text-amber-300 text-xs font-bold hover:bg-slate-600 transition"
                  >
                    View on AllTrails <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="prose prose-invert max-w-none text-slate-200 text-sm leading-relaxed whitespace-pre-line">
                  {aiResult.text}
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/80 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block">Matched Trail</span>
                    <span className="text-base font-bold text-white">{aiResult.trail.name}</span>
                  </div>
                  <button
                    onClick={() => setSelectedTrailModal(aiResult.trail)}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-lg transition"
                  >
                    Open Trail Details
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= PAGE 5: RESOURCES ================= */}
        {activeTab === 'resources' && (
          <div className="space-y-12 max-w-5xl mx-auto">
            <div>
              <h1 className="text-3xl font-black text-white">Mental Health & Wellbeing Resources</h1>
              <p className="text-slate-400 text-sm mt-1">
                Science-backed benefits of nature therapy, MTU support contacts, and interactive grounding exercises.
              </p>
            </div>

            {/* Science & Exercise Benefits Section */}
            <div className="bg-slate-800/80 rounded-2xl border border-slate-700 p-6 sm:p-8 space-y-6">
              <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
                <Heart className="w-5 h-5" /> The Science of Walking & Mental Wellbeing
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/60 space-y-2">
                  <span className="text-2xl font-black text-emerald-400">20 Mins</span>
                  <h3 className="text-sm font-bold text-white">Cortisol Reduction</h3>
                  <p className="text-xs text-slate-300">
                    Walking in natural green space for just 20 minutes significantly lowers stress hormones.
                  </p>
                </div>
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/60 space-y-2">
                  <span className="text-2xl font-black text-amber-400">+15% Focus</span>
                  <h3 className="text-sm font-bold text-white">Academic Performance</h3>
                  <p className="text-xs text-slate-300">
                    Physical movement increases hippocampal brain flow, sharpening focus before exams.
                  </p>
                </div>
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/60 space-y-2">
                  <span className="text-2xl font-black text-sky-400">Daylight Exposure</span>
                  <h3 className="text-sm font-bold text-white">Combat SAD in UP</h3>
                  <p className="text-xs text-slate-300">
                    Outdoor light exposure improves serotonin synthesis during cold Keweenaw winter months.
                  </p>
                </div>
              </div>
            </div>

            {/* MTU Specific Contacts Box */}
            <div id="husky-support" className="bg-gradient-to-r from-emerald-950 via-slate-800 to-slate-900 rounded-2xl border border-emerald-500/40 p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">MTU Mental Health & Crisis Contacts</h2>
                  <p className="text-xs text-emerald-300">Confidential support available to all Michigan Tech students</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-700/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-sm">MTU Center for Student Mental Health</h3>
                    <span className="text-[10px] bg-amber-400/20 text-amber-300 font-bold px-2 py-0.5 rounded">Admin Building 3rd Flr</span>
                  </div>
                  <p className="text-xs text-slate-300">Individual counseling, group therapy, and wellness workshops.</p>
                  <p className="text-xs font-bold text-amber-400 pt-1">Phone: (906) 487-1138</p>
                </div>

                <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-700/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-sm">Husky Support Line (24/7)</h3>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded">24 Hours / 7 Days</span>
                  </div>
                  <p className="text-xs text-slate-300">Immediate crisis counseling & mental health support anytime day or night.</p>
                  <p className="text-xs font-bold text-emerald-400 pt-1">Call/Text: (855) 280-1721</p>
                </div>
              </div>
            </div>

            {/* Interactive Wellbeing Toolkit */}
            <div className="bg-slate-800/80 rounded-2xl border border-slate-700 p-6 sm:p-8 space-y-8">
              <div>
                <h2 className="text-xl font-bold text-white">Interactive Wellbeing Toolkit</h2>
                <p className="text-slate-400 text-xs mt-1">Try these grounding techniques before or after your walk</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Tool 1: Box Breathing Animation */}
                <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-700 text-center space-y-4 flex flex-col items-center justify-between">
                  <div>
                    <h3 className="font-bold text-white text-base">Box Breathing Trainer</h3>
                    <p className="text-xs text-slate-400 mt-1">Calm your nervous system in 4 quick phases</p>
                  </div>

                  <div className="relative w-36 h-36 flex items-center justify-center my-4">
                    <div
                      className={`absolute inset-0 rounded-full bg-amber-400/20 border-2 border-amber-400 transition-all duration-1000 ${
                        isBreathingActive ? 'scale-110 shadow-lg shadow-amber-400/20' : 'scale-90'
                      }`}
                    />
                    <div className="text-center z-10">
                      <span className="text-3xl font-black text-amber-400">{breathingTimer}s</span>
                      <span className="block text-xs font-bold text-white mt-1">{breathingPhase}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsBreathingActive(!isBreathingActive)}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs transition ${
                      isBreathingActive ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-amber-400 text-slate-950'
                    }`}
                  >
                    {isBreathingActive ? 'Stop Breathing Trainer' : 'Start Box Breathing'}
                  </button>
                </div>

                {/* Tool 2: 5-4-3-2-1 Grounding */}
                <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-700 space-y-3">
                  <h3 className="font-bold text-white text-base">5-4-3-2-1 Outdoor Sensory Grounding</h3>
                  <p className="text-xs text-slate-400">While walking, pause and notice your surroundings:</p>

                  <ul className="space-y-2 text-xs text-slate-300 pt-2">
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 font-bold flex items-center justify-center shrink-0">5</span>
                      <span><strong>SEE:</strong> 5 things around you (e.g., pine trees, snow, clouds)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 font-bold flex items-center justify-center shrink-0">4</span>
                      <span><strong>TOUCH:</strong> 4 textures (e.g., cold air on skin, pine bark)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 font-bold flex items-center justify-center shrink-0">3</span>
                      <span><strong>HEAR:</strong> 3 sounds (e.g., wind in trees, water flowing)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 font-bold flex items-center justify-center shrink-0">2</span>
                      <span><strong>SMELL:</strong> 2 scents (e.g., crisp air, wet cedar)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 font-bold flex items-center justify-center shrink-0">1</span>
                      <span><strong>TASTE:</strong> 1 positive thought for yourself today</span>
                    </li>
                  </ul>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* ================= PAGE 6: TRAIL LOG & REFLECTIONS ================= */}
        {activeTab === 'log' && (
          <div className="space-y-10 max-w-4xl mx-auto">
            <div>
              <h1 className="text-3xl font-black text-white">Campus Wellbeing Trail Log</h1>
              <p className="text-slate-400 text-sm mt-1">
                Completed a walk? Log your miles and share a brief reflection or encouraging note for fellow MTU Huskies!
              </p>
            </div>

            {/* Log Form */}
            <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-6 sm:p-8 space-y-6 shadow-xl">
              <h2 className="text-lg font-bold text-amber-400 flex items-center gap-2">
                <Send className="w-5 h-5" /> Log Your Walk
              </h2>

              {logSubmitted && (
                <div className="p-4 bg-emerald-950 border border-emerald-500/50 rounded-xl text-emerald-300 text-sm flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-400" /> Walk logged successfully! Thank you for sharing your reflection.
                </div>
              )}

              <form onSubmit={handleLogSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Your Name or Alias</label>
                    <input
                      type="text"
                      placeholder="e.g. Alex R."
                      required
                      value={logForm.name}
                      onChange={(e) => setLogForm({ ...logForm, name: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Major or MTU Role</label>
                    <input
                      type="text"
                      placeholder="e.g. Civil Engineering / Senior"
                      value={logForm.major}
                      onChange={(e) => setLogForm({ ...logForm, major: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-300 mb-1">Trail Walked</label>
                    <select
                      value={logForm.trail}
                      onChange={(e) => setLogForm({ ...logForm, trail: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                    >
                      {TRAILS_DATA.map((t) => (
                        <option key={t.id} value={t.name}>{t.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Distance (Miles)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={logForm.miles}
                      onChange={(e) => setLogForm({ ...logForm, miles: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Reflection or Note to Huskies</label>
                  <textarea
                    rows={3}
                    placeholder="How did you feel during/after your walk? Any nature highlights?"
                    required
                    value={logForm.reflection}
                    onChange={(e) => setLogForm({ ...logForm, reflection: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm rounded-xl transition"
                >
                  Post Reflection to Community Log
                </button>
              </form>
            </div>

            {/* Community Log Stream */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-amber-400" /> Recent Student Logs
              </h2>

              <div className="space-y-4">
                {logs.map((log) => (
                  <div key={log.id} className="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-5 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-700/60 pb-2">
                      <div>
                        <span className="font-bold text-white text-sm">{log.name}</span>
                        <span className="text-xs text-slate-400 block">{log.major}</span>
                      </div>
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                        {log.trail} • {log.miles} mi
                      </span>
                    </div>

                    <p className="text-slate-300 text-sm leading-relaxed italic">
                      "{log.reflection}"
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                      <span>{log.date}</span>
                      <span className="text-amber-300 font-semibold">Mood: {log.mood}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* --- TRAIL DETAIL MODAL --- */}
      {selectedTrailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-800 border border-slate-700 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedTrailModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 text-xl font-bold"
            >
              ✕
            </button>

            <div className="space-y-2">
              <span className="px-3 py-1 bg-amber-400/10 text-amber-300 border border-amber-400/30 rounded-full text-xs font-bold">
                {selectedTrailModal.proximity}
              </span>
              <h2 className="text-2xl font-bold text-white">{selectedTrailModal.name}</h2>
              <p className="text-xs text-slate-300">{selectedTrailModal.description}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-900 p-4 rounded-2xl text-xs">
              <div>
                <span className="text-slate-400 block">Distance</span>
                <span className="font-bold text-white text-sm">{selectedTrailModal.distance} miles</span>
              </div>
              <div>
                <span className="text-slate-400 block">Est Time</span>
                <span className="font-bold text-white text-sm">{selectedTrailModal.timeMins} min</span>
              </div>
              <div>
                <span className="text-slate-400 block">Difficulty</span>
                <span className="font-bold text-white text-sm">{selectedTrailModal.difficulty}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Surface</span>
                <span className="font-bold text-white text-sm">{selectedTrailModal.surface}</span>
              </div>
            </div>

            <div className="p-4 bg-emerald-950/60 border border-emerald-500/40 rounded-2xl space-y-1">
              <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-emerald-400" /> Wellbeing Tip for this Trail
              </span>
              <p className="text-xs text-slate-200 leading-relaxed">
                {selectedTrailModal.wellbeingTip}
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={selectedTrailModal.allTrailsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl text-center flex items-center justify-center gap-2 transition"
              >
                Open Map on AllTrails <ExternalLink className="w-4 h-4" />
              </a>
              <button
                onClick={() => setSelectedTrailModal(null)}
                className="px-5 py-3 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold rounded-xl transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- FOOTER --- */}
      <footer className="mt-20 border-t border-slate-800 bg-slate-950 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <TreePine className="w-6 h-6 text-amber-400" />
            <div>
              <span className="text-sm font-bold text-white block">MTU Campus Wellbeing Walks</span>
              <span className="text-xs text-slate-400">Michigan Technological University Student Wellbeing Project</span>
            </div>
          </div>

          <div className="text-xs text-slate-400 text-center md:text-right space-y-1">
            <p>Designed for the MTU Husky Community in Houghton, MI.</p>
            <p className="text-slate-400">Integrated with AllTrails & Gemini AI API.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}