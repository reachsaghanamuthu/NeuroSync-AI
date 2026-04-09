import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Activity, Send, ShieldAlert, HeartPulse, Stethoscope, Loader2, AlertTriangle, Clock, ChevronRight, Apple, Zap, Ban } from 'lucide-react';
import NeuralBackground from './components/NeuralBackground';

function App() {
  const [input, setInput] = useState('');
  const [personalDetails, setPersonalDetails] = useState({ age: '', gender: '', conditions: '' });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('neurosync_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const saveToHistory = (query, res) => {
    const newHist = [{ query, date: new Date().toISOString(), result: res }, ...history].slice(0, 5);
    setHistory(newHist);
    localStorage.setItem('neurosync_history', JSON.stringify(newHist));
  };

  const handleAnalyze = (e) => {
    e?.preventDefault();
    if (!input.trim()) return;
    
    setIsAnalyzing(true);
    setResult(null);

    setTimeout(() => {
      setIsAnalyzing(false);
      const lowerInput = input.toLowerCase();
      let res = {
        causes: [],
        severity: "Low",
        actions: [],
        whenToSeeDoctor: "If symptoms persist for more than 48 hours or suddenly worsen.",
        neuroInsights: {
          pattern: "Systemic baseline variance",
          riskCategory: "Routine",
          explanation: "Symptoms align with common daily stressors or mild metabolic fluctuations. No major neural or systemic anomalies detected."
        },
        preventive: {
          diet: ["Increase complex carbohydrates", "Maintain proper hydration"],
          habits: ["Aim for 7-8 hours of continuous sleep", "Take regular breaks from digital screens"],
          avoid: ["Excessive caffeine after 3 PM", "High-stress environments without breaks"]
        }
      };

      if (lowerInput.includes('headache') || lowerInput.includes('migraine') || lowerInput.includes('head')) {
        res.causes = ["Tension-type headache", "Migraine onset", "Dehydration"];
        res.severity = "Medium";
        res.actions = ["Rest in a dark, quiet room", "Hydrate immediately with electrolytes", "Apply cold compress to forehead"];
        res.whenToSeeDoctor = "If it's the 'worst headache of your life', accompanied by vision loss, or confusion.";
        res.neuroInsights = {
          pattern: "Cranial vascular constriction & tension",
          riskCategory: "Moderate",
          explanation: "Neural pattern indicates significant neurovascular stress. Common with prolonged screen time, sleep deficit, or dehydration."
        };
        res.preventive.habit = ["Implement the 20-20-20 rule for screens"];
      } else if (lowerInput.includes('chest') || lowerInput.includes('heart') || lowerInput.includes('breath')) {
        res.causes = ["Cardiovascular distress", "Severe anxiety/panic attack", "Acute gastroesophageal reflux"];
        res.severity = "High";
        res.actions = ["Sit down and rest immediately", "Loosen tight clothing", "Take deep, slow, measured breaths"];
        res.whenToSeeDoctor = "IMMEDIATELY call emergency services if pain radiates to arm/jaw, is crushing, or if breathing becomes severely restricted.";
        res.neuroInsights = {
          pattern: "Cardiopulmonary acute distress signal",
          riskCategory: "Critical",
          explanation: "Symptoms strongly correlate with critical cardiovascular pathways or severe autonomic nervous system overload. Cannot rule out ischemia."
        };
        res.preventive.avoid = ["Heavy lifting", "High sodium foods", "Extreme stress triggers"];
      } else if (lowerInput.includes('stomach') || lowerInput.includes('nausea') || lowerInput.includes('pain') || lowerInput.includes('belly')) {
        res.causes = ["Acute Gastroenteritis", "Mild foodborne illness", "Stress-induced gut-brain disturbance"];
        res.severity = "Low";
        res.actions = ["Sip clear fluids slowly", "Transition to a bland diet (BRAT)", "Apply warm compress to abdomen"];
        res.whenToSeeDoctor = "If unable to keep liquids down for 24 hours, or if accompanied by high fever or severe, localized pain.";
        res.neuroInsights = {
          pattern: "Enteric nervous system distress",
          riskCategory: "Routine",
          explanation: "The gut-brain axis indicates inflammatory response localized to the gastrointestinal tract, likely viral or digestive overload."
        };
        res.preventive.diet = ["Incorporate probiotics daily", "Eat smaller, more frequent meals", "Reduce spicy/acidic intake"];
      } else if (lowerInput.includes('fever') || lowerInput.includes('cold') || lowerInput.includes('cough')) {
        res.causes = ["Viral upper respiratory infection", "Seasonal Influenza", "Allergic rhinitis flare"];
        res.severity = "Medium";
        res.actions = ["Monitor temperature every 4 hours", "Consume warm liquids to soothe throat", "Stay isolated and maximize rest"];
        res.whenToSeeDoctor = "If fever exceeds 103°F (39.4°C), lasts more than 3 days, or breathing becomes difficult.";
        res.neuroInsights = {
          pattern: "Systemic immune activation",
          riskCategory: "Moderate",
          explanation: "Global hypothalamic temperature set-point adjustment indicating active immune response to foreign pathogen."
        };
      } else {
        res.causes = ["General fatigue", "Minor autonomic disturbance", "Stress physical manifestation"];
        res.actions = ["Focus on high-quality rest", "Monitor symptoms over the next 24-48 hours", "Avoid strenuous physical activity temporarily"];
      }

      setResult(res);
      saveToHistory(input, res);
    }, 1500 + Math.random() * 1500);
  };

  const handleRefine = () => {
    setResult(null);
    setInput(input + " "); // Add space to encourage user to type more context
    document.getElementById('symptom-input').focus();
  };

  return (
    <div className="relative min-h-screen text-neuro-light overflow-y-auto font-sans">
      <NeuralBackground />
      
      {/* Navbar */}
      <nav className="relative z-10 w-full flex items-center justify-between p-6 glass-panel border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-neuro-teal to-neuro-pink p-2 rounded-xl shadow-lg shadow-neuro-teal/20">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-wide">
            NeuroSync <span className="text-sm font-normal text-neuro-teal ml-1 border border-neuro-teal/30 px-2 py-0.5 rounded-full">v2.0</span>
          </span>
        </div>
        <button className="px-6 py-2 rounded-full border border-neuro-teal/50 text-neuro-teal hover:bg-neuro-teal/10 transition-all font-medium text-sm">
          Sign In
        </button>
      </nav>

      <main className="relative z-10 w-full max-w-5xl mx-auto px-4 pt-12 pb-24 flex flex-col items-center">
        
        {/* Landing Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 text-sm text-neuro-pink">
            <Activity className="w-4 h-4" />
            <span>Next-Gen Neural Intelligence</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight tracking-tight">
            AI-Powered Intelligence for <br/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neuro-teal to-neuro-pink">
              Smarter Healthcare Decisions
            </span>
          </h1>
          <p className="text-lg opacity-70 max-w-2xl mx-auto">
            Input your symptoms and personal profile below. Our neural engine provides severity analysis, neuro-insights, and preventive pathways.
          </p>
        </motion.div>

        {/* Input Form Dashboard */}
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-[1fr_250px] gap-6">
          <div className="flex flex-col gap-6">
            
            {/* Personal Details */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="w-full glass-panel p-5 rounded-2xl flex flex-col shadow-[0_0_30px_rgba(44,30,74,0.4)]"
            >
              <h3 className="text-white/80 font-medium text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-neuro-teal" /> Patient Profile (Optional)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input 
                  type="number" placeholder="Age" value={personalDetails.age} onChange={e => setPersonalDetails({...personalDetails, age: e.target.value})}
                  className="bg-white/5 border border-white/10 outline-none text-white px-4 py-2.5 rounded-xl text-sm"
                />
                <select 
                  value={personalDetails.gender} onChange={e => setPersonalDetails({...personalDetails, gender: e.target.value})}
                  className="bg-white/5 border border-white/10 outline-none text-white px-4 py-2.5 rounded-xl text-sm appearance-none"
                >
                  <option value="" className="text-black">Gender</option>
                  <option value="Male" className="text-black">Male</option>
                  <option value="Female" className="text-black">Female</option>
                  <option value="Other" className="text-black">Other</option>
                </select>
                <input 
                  type="text" placeholder="Known Conditions" value={personalDetails.conditions} onChange={e => setPersonalDetails({...personalDetails, conditions: e.target.value})}
                  className="bg-white/5 border border-white/10 outline-none text-white px-4 py-2.5 rounded-xl text-sm sm:col-span-1"
                />
              </div>
            </motion.div>

            {/* Symptom Input */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full glass-panel p-2 rounded-2xl flex flex-col shadow-[0_0_40px_rgba(44,30,74,0.5)] bg-neuro-dark/60"
            >
              <form onSubmit={handleAnalyze} className="relative flex items-center">
                <div className="pl-4 pr-2 py-4">
                  <Stethoscope className="w-6 h-6 text-neuro-teal/60" />
                </div>
                <input 
                  id="symptom-input"
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Describe your symptoms in detail..."
                  className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/30 px-2 py-4 text-lg w-full"
                />
                <button 
                  type="submit" 
                  disabled={isAnalyzing || !input.trim()}
                  className="ml-2 mr-2 bg-gradient-to-r from-neuro-teal to-[rgba(29,211,176,0.8)] p-3 rounded-xl hover:shadow-[0_0_20px_rgba(29,211,176,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed group text-neuro-dark"
                >
                  {isAnalyzing ? (
                    <Loader2 className="w-6 h-6 animate-spin text-neuro-dark" />
                  ) : (
                    <Send className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  )}
                </button>
              </form>
            </motion.div>

            {/* Results Output */}
            <AnimatePresence>
              {(isAnalyzing || result) && (
                <motion.div 
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  className="w-full overflow-hidden glass-panel rounded-3xl"
                >
                  <div className="p-8">
                    {isAnalyzing ? (
                      <div className="flex flex-col items-center justify-center py-12 gap-6">
                        <div className="relative">
                          <div className="absolute inset-0 bg-neuro-pink/20 blur-xl rounded-full"></div>
                          <Brain className="w-16 h-16 text-neuro-pink animate-pulse relative z-10" />
                        </div>
                        <div className="flex flex-col items-center gap-2">
                           <h3 className="text-xl font-medium text-white/90">Synthesizing Neural Pathways...</h3>
                           <p className="text-white/40 text-sm">Evaluating symptoms against medical intelligence layer</p>
                        </div>
                      </div>
                    ) : result ? (
                      <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                      >
                        {/* Severity Indicator */}
                        <div className={`border p-5 rounded-2xl md:col-span-2 flex items-start gap-4 transition-colors ${result.severity === 'High' ? 'bg-red-500/10 border-red-500/30' : result.severity === 'Medium' ? 'bg-orange-500/10 border-orange-500/30' : 'bg-green-500/10 border-green-500/30'}`}>
                          <AlertTriangle className={`w-6 h-6 shrink-0 mt-0.5 ${result.severity === 'High' ? 'text-red-400' : result.severity === 'Medium' ? 'text-orange-400' : 'text-green-400'}`} />
                          <div>
                            <h4 className={`text-lg font-bold mb-1 tracking-wide ${result.severity === 'High' ? 'text-red-400' : result.severity === 'Medium' ? 'text-orange-400' : 'text-green-400'}`}>
                              SYSTEM ALERT: {result.severity.toUpperCase()} SEVERITY
                            </h4>
                            {result.severity === 'High' && <p className="text-red-300 text-sm font-medium mb-2 border border-red-500/20 bg-red-900/20 px-3 py-1.5 rounded-lg inline-block">⚠️ This condition requires immediate medical attention.</p>}
                            <p className="text-white/80 text-sm mt-1"><strong className="text-white">When to See a Doctor:</strong> {result.whenToSeeDoctor}</p>
                          </div>
                        </div>

                        {/* Neuro Insights */}
                        <div className="bg-gradient-to-r from-neuro-purple/80 to-neuro-dark/80 border border-neuro-purple p-6 rounded-2xl md:col-span-2">
                          <div className="flex items-center gap-3 mb-4">
                            <Brain className="w-5 h-5 text-neuro-pink" />
                            <h4 className="text-lg font-semibold text-white">Neuro Insight Analysis</h4>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-black/40 p-3 rounded-xl border border-white/5">
                              <span className="text-xs text-white/50 uppercase tracking-wider block mb-1">Pattern Detected</span>
                              <span className="text-sm text-neuro-teal font-medium">{result.neuroInsights.pattern}</span>
                            </div>
                            <div className="bg-black/40 p-3 rounded-xl border border-white/5">
                              <span className="text-xs text-white/50 uppercase tracking-wider block mb-1">Risk Category</span>
                              <span className={`text-sm font-medium ${result.neuroInsights.riskCategory === 'Critical' ? 'text-red-400' : 'text-yellow-400'}`}>{result.neuroInsights.riskCategory}</span>
                            </div>
                            <div className="bg-black/40 p-3 rounded-xl border border-white/5 md:col-span-2">
                              <span className="text-xs text-white/50 uppercase tracking-wider block mb-1">Neural Explanation</span>
                              <span className="text-sm text-white/80 leading-relaxed">{result.neuroInsights.explanation}</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                          <div className="flex items-center gap-3 mb-4">
                            <Activity className="w-5 h-5 text-neuro-pink" />
                            <h4 className="text-lg font-semibold text-white">Possible Correlates</h4>
                          </div>
                          <ul className="space-y-3">
                            {result.causes.map((cause, idx) => (
                              <li key={idx} className="flex gap-3 text-white/70 text-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-neuro-pink mt-1.5 shrink-0"></span>
                                <span>{cause}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                          <div className="flex items-center gap-3 mb-4">
                            <HeartPulse className="w-5 h-5 text-neuro-teal" />
                            <h4 className="text-lg font-semibold text-white">Suggested Actions</h4>
                          </div>
                          <ul className="space-y-3">
                            {result.actions.map((action, idx) => (
                              <li key={idx} className="flex gap-3 text-white/70 text-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-neuro-teal mt-1.5 shrink-0"></span>
                                <span>{action}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Preventive Care Generation block */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:col-span-2">
                          <div className="flex items-center gap-3 mb-5">
                            <ShieldAlert className="w-5 h-5 text-blue-400" />
                            <h4 className="text-lg font-semibold text-white">Preventive Care Generator</h4>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-black/20 p-4 rounded-xl">
                              <h5 className="text-sm font-medium text-white mb-3 flex items-center gap-2"><Apple className="w-4 h-4 text-green-400"/> Diet</h5>
                              <ul className="space-y-2">
                                {result.preventive.diet.map((item, i) => <li key={i} className="text-xs text-white/60">• {item}</li>)}
                              </ul>
                            </div>
                            <div className="bg-black/20 p-4 rounded-xl">
                              <h5 className="text-sm font-medium text-white mb-3 flex items-center gap-2"><Zap className="w-4 h-4 text-yellow-400"/> Habits</h5>
                              <ul className="space-y-2">
                                {result.preventive.habits.map((item, i) => <li key={i} className="text-xs text-white/60">• {item}</li>)}
                              </ul>
                            </div>
                            <div className="bg-black/20 p-4 rounded-xl">
                              <h5 className="text-sm font-medium text-white mb-3 flex items-center gap-2"><Ban className="w-4 h-4 text-red-400"/> Avoid</h5>
                              <ul className="space-y-2">
                                {result.preventive.avoid.map((item, i) => <li key={i} className="text-xs text-white/60">• {item}</li>)}
                              </ul>
                            </div>
                          </div>
                        </div>

                        {/* Refine Diagnosis Button */}
                        <div className="md:col-span-2 mt-2">
                          <button 
                            onClick={handleRefine}
                            className="w-full py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-neuro-light transition-all text-sm font-medium tracking-wide flex justify-center items-center gap-2"
                          >
                            <Activity className="w-4 h-4" />
                            Refine My Diagnosis
                          </button>
                        </div>
                      </motion.div>
                    ) : null}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Symptom History Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full glass-panel p-5 rounded-2xl flex flex-col shadow-[0_0_30px_rgba(44,30,74,0.4)] h-fit sticky top-6"
          >
            <h3 className="text-white/90 font-semibold mb-4 flex items-center gap-2 border-b border-white/10 pb-3">
              <Clock className="w-4 h-4 text-neuro-pink" /> Symptom History
            </h3>
            {history.length > 0 ? (
              <div className="space-y-4">
                {history.map((item, idx) => (
                  <div key={idx} className="bg-white/5 p-3 rounded-xl border border-white/5 hover:border-white/10 transition-colors cursor-pointer group" onClick={() => {setInput(item.query); handleAnalyze()}}>
                    <p className="text-xs text-white/40 mb-1">{new Date(item.date).toLocaleDateString()}</p>
                    <p className="text-sm text-white/80 line-clamp-2 leading-snug group-hover:text-neuro-teal transition-colors">"{item.query}"</p>
                    <div className="mt-2 flex items-center gap-1.5 opacity-60">
                      <div className={`w-2 h-2 rounded-full ${item.result.severity === 'High' ? 'bg-red-400' : item.result.severity === 'Medium' ? 'bg-orange-400' : 'bg-green-400'}`}></div>
                      <span className="text-xs tracking-wider uppercase">{item.result.severity} Issue</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-white/40 text-center py-6">No previous symptoms tracked.</p>
            )}
          </motion.div>

        </div>
      </main>
    </div>
  );
}

export default App;
