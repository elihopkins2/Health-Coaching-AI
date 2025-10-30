import React, { useEffect, useState } from 'react';
import { Activity, Clock, DollarSign, Users, Heart, TrendingUp, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';

export default function BarrierAwareHealthCoach() {
    useEffect(() => {
        document.title = 'Barrier-Aware Health Coach';
    }, []);
    const [step, setStep] = useState('intake');
    const [userProfile, setUserProfile] = useState({
        healthGoal: '',
        workSchedule: '',
        budget: '',
        familySituation: '',
        neighborhood: '',
        transportation: ''
    });

    const [wearableData, setWearableData] = useState({
        sleepScore: 70,
        activityLevel: 50,
        stressLevel: 60,
        heartRateVariability: 45
    });

    const [recommendations, setRecommendations] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleProfileChange = (field, value) => {
        setUserProfile(prev => ({ ...prev, [field]: value }));
    };

    const handleWearableChange = (field, value) => {
        setWearableData(prev => ({ ...prev, [field]: parseInt(value) }));
    };

    const generateRecommendations = () => {
        setLoading(true);

        setTimeout(() => {
            const generic = generateGenericAdvice();
            const barrierAware = generateBarrierAwareAdvice();

            setRecommendations({
                generic,
                barrierAware,
                behavioralPrinciples: identifyPrinciples()
            });

            setStep('results');
            setLoading(false);
        }, 2000);
    };

    const generateGenericAdvice = () => {
        return [
            "Exercise for 30 minutes daily, 5 days per week",
            "Get 8 hours of sleep each night",
            "Eat a balanced diet with plenty of vegetables",
            "Practice meditation for 20 minutes daily",
            "Schedule annual check-ups with your primary care physician"
        ];
    };

    const generateBarrierAwareAdvice = () => {
        const advice = [];

        if (wearableData.sleepScore < 70) {
            if (userProfile.workSchedule.includes('shift') || userProfile.workSchedule.includes('irregular')) {
                advice.push({
                    action: "Create a 'wind-down kit' for whenever you finish work - blackout curtains, white noise app, and consistent pre-sleep routine regardless of time",
                    barrier: "Irregular schedule makes consistent sleep time impossible",
                    principle: "Anchor habits to events, not times",
                    impact: "Could improve sleep score by 15-20 points"
                });
            } else if (userProfile.familySituation.includes('children') || userProfile.familySituation.includes('kids')) {
                advice.push({
                    action: "Set phone to Do Not Disturb at 9 PM. Use the 20 minutes after kids sleep for a simple routine: 5-min stretch, warm shower, read in bed",
                    barrier: "Caregiving responsibilities limit evening time",
                    principle: "Micro-routines (20 min vs 60 min)",
                    impact: "Realistic goal with high compliance likelihood"
                });
            } else {
                advice.push({
                    action: "Move your bedtime 15 minutes earlier each week until you reach 7 hours. Set a phone reminder 1 hour before target bedtime",
                    barrier: "Low urgency for gradual improvement",
                    principle: "Gradual change + implementation intention",
                    impact: "80% adherence rate vs 30% for immediate change"
                });
            }
        }

        if (wearableData.activityLevel < 60) {
            const hasBudget = userProfile.budget.includes('flexible') || userProfile.budget.includes('moderate');
            const hasTime = !userProfile.workSchedule.includes('multiple jobs') && !userProfile.workSchedule.includes('60+');

            if (!hasTime && !hasBudget) {
                advice.push({
                    action: "During commute: if standing, do calf raises at every stop. Get off one stop early 2x/week and walk. Weekend: one 20-min YouTube workout with kids",
                    barrier: "Time poverty + budget constraints",
                    principle: "Habit stacking + environment design",
                    impact: "Activity level increase without gym/time investment"
                });
            } else if (userProfile.neighborhood.includes('unsafe') || userProfile.neighborhood.includes('limited')) {
                advice.push({
                    action: "Indoor movement: 10 squats every time you use the bathroom, walk in place during TV commercials, YouTube fitness (no equipment needed)",
                    barrier: "No safe outdoor walking areas",
                    principle: "Remove environmental barriers",
                    impact: "Can achieve 150 min/week activity indoors"
                });
            } else if (hasBudget && hasTime) {
                advice.push({
                    action: "Join a community fitness class or walking group. Social commitment = 95% attendance vs 40% solo. Start with 2x/week, same time/place",
                    barrier: "Motivation and accountability",
                    principle: "Social proof + commitment device",
                    impact: "Higher adherence through community"
                });
            } else {
                advice.push({
                    action: "Walking meetings if possible, stairs instead of elevator (start with down only), park further away. Track steps - aim for +500 steps/day this week",
                    barrier: "Fitting activity into workday",
                    principle: "Incremental goals + choice architecture",
                    impact: "Sustainable daily habit formation"
                });
            }
        }

        if (wearableData.stressLevel > 60) {
            if (userProfile.budget.includes('tight') || userProfile.budget.includes('limited')) {
                advice.push({
                    action: "Free breathing app (Breathwrk or Oak): 2 minutes before work, 2 minutes at lunch. No cost, no time commitment, immediate impact on HRV",
                    barrier: "Can't afford therapy or wellness apps",
                    principle: "Remove cost barrier + micro-habit",
                    impact: "Measurable HRV improvement in 2 weeks"
                });
            } else {
                advice.push({
                    action: "Identify your top 2 stressors. For each, schedule one 15-min 'problem-solving session' this week. Write down 3 tiny actions you control",
                    barrier: "Overwhelm prevents action",
                    principle: "Break down complexity + control focus",
                    impact: "Reduces rumination, increases agency"
                });
            }
        }

        if (userProfile.healthGoal.includes('prevent') || userProfile.healthGoal.includes('screening')) {
            const hasTransport = userProfile.transportation.includes('car') || userProfile.transportation.includes('reliable');
            const hasFlexibility = !userProfile.workSchedule.includes('strict') && !userProfile.workSchedule.includes('multiple');

            if (!hasTransport || !hasFlexibility) {
                advice.push({
                    action: "Check if your employer offers on-site health screenings. If not, use CVS MinuteClinic (evening/weekend hours) or telehealth for blood pressure check",
                    barrier: "Transportation + inflexible work schedule",
                    principle: "Meet people where they are",
                    impact: "Removes 2 major barriers to preventative care"
                });
            } else {
                advice.push({
                    action: "Schedule your annual physical right now (use this momentum!). Morning appointments have fewer delays. Block 3 hours on calendar including travel",
                    barrier: "Procrastination + time uncertainty",
                    principle: "Implementation intention + buffer time",
                    impact: "Scheduled appointments are 85% more likely to happen"
                });
            }
        }

        return advice.slice(0, 4);
    };

    const identifyPrinciples = () => {
        return [
            { principle: "Present Bias Mitigation", usage: "Immediate small wins vs distant big goals" },
            { principle: "Choice Architecture", usage: "Make healthy choices the easy default" },
            { principle: "Implementation Intentions", usage: "Specific when/where/how plans" },
            { principle: "Social Proof", usage: "Leverage community and accountability" },
            { principle: "Habit Stacking", usage: "Attach new habits to existing routines" }
        ];
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-8">
            <div className="max-w-5xl mx-auto space-y-8 md:space-y-10">
                <header className="relative overflow-hidden rounded-2xl mb-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 opacity-10"></div>
                    <div className="relative px-6 py-10 md:px-10 md:py-12 bg-white/60 backdrop-blur-sm rounded-2xl border border-indigo-100">
                        <div className="flex items-center justify-center gap-3 mb-3">
                            <div className="p-2 rounded-xl bg-blue-50 border border-blue-100">
                                <Heart className="w-7 h-7 text-blue-600" />
                            </div>
                            <span className="text-xs font-semibold tracking-wide text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded">
                                Barrier-Aware
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 text-center tracking-tight">
                            Health Coaching that Fits Your Real Life
                        </h1>
                        <p className="mt-4 text-base md:text-lg text-gray-600 max-w-2xl mx-auto text-center">
                            Personalized guidance that adapts to your schedule, budget, family, and environment—
                            not the other way around.
                        </p>
                    </div>
                </header>

                <nav aria-label="Progress" className="mb-8">
                    <ol role="list" className="flex items-center justify-center gap-4">
                        <li role="listitem">
                            <button
                                type="button"
                                onClick={() => setStep('intake')}
                                aria-current={step === 'intake' ? 'step' : undefined}
                                className={`group inline-flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-full px-1 py-1 ${step === 'intake' ? 'text-blue-700' : 'text-gray-500'}`}
                                title="Your Context"
                            >
                                <span className={`w-8 h-8 rounded-full flex items-center justify-center border ${step === 'intake' ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-100 border-gray-300 group-hover:border-gray-400'}`}>1</span>
                                <span className="hidden md:inline text-sm font-medium">Your Context</span>
                            </button>
                        </li>
                        <li aria-hidden="true" className="w-12 h-0.5 bg-gray-300" />
                        <li role="listitem">
                            <button
                                type="button"
                                onClick={() => setStep('wearable')}
                                aria-current={step === 'wearable' ? 'step' : undefined}
                                className={`group inline-flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-full px-1 py-1 ${step === 'wearable' ? 'text-blue-700' : 'text-gray-500'}`}
                                title="Health Data"
                            >
                                <span className={`w-8 h-8 rounded-full flex items-center justify-center border ${step === 'wearable' ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-100 border-gray-300 group-hover:border-gray-400'}`}>2</span>
                                <span className="hidden md:inline text-sm font-medium">Health Data</span>
                            </button>
                        </li>
                        <li aria-hidden="true" className="w-12 h-0.5 bg-gray-300" />
                        <li role="listitem">
                            <button
                                type="button"
                                onClick={() => {
                                    if (recommendations) setStep('results');
                                }}
                                disabled={!recommendations}
                                aria-current={step === 'results' ? 'step' : undefined}
                                className={`group inline-flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-full px-1 py-1 ${step === 'results' ? 'text-blue-700' : 'text-gray-500'} ${!recommendations ? 'opacity-50 cursor-not-allowed' : ''}`}
                                title="Your Plan"
                            >
                                <span className={`w-8 h-8 rounded-full flex items-center justify-center border ${step === 'results' ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-100 border-gray-300 group-hover:border-gray-400'}`}>3</span>
                                <span className="hidden md:inline text-sm font-medium">Your Plan</span>
                            </button>
                        </li>
                    </ol>
                </nav>

                {step === 'intake' && (
                    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">Tell us about your real-world context</h2>

                        <div className="space-y-6">
                            <div>
                                        <label className="block text-sm md:text-base font-medium text-gray-800 mb-2">
                                    What's your main health goal?
                                </label>
                                <textarea
                                    value={userProfile.healthGoal}
                                    onChange={(e) => handleProfileChange('healthGoal', e.target.value)}
                                    placeholder="e.g., Lower my blood pressure, get better sleep, lose weight, manage stress, stay on top of preventative screenings..."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    rows="2"
                                />
                            </div>

                            <div>
                                        <label className="block text-sm md:text-base font-medium text-gray-800 mb-2">
                                    <Clock className="w-4 h-4 inline mr-1" />
                                    What's your work schedule like?
                                </label>
                                <select
                                    value={userProfile.workSchedule}
                                    onChange={(e) => handleProfileChange('workSchedule', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="">Select...</option>
                                    <option value="standard-9-5">Standard 9-5, weekdays</option>
                                    <option value="flexible-hours">Flexible hours, some control over schedule</option>
                                    <option value="shift-work">Shift work (nights, weekends, rotating)</option>
                                    <option value="irregular-hours">Irregular/unpredictable hours</option>
                                    <option value="multiple-jobs">Multiple jobs (60+ hrs/week)</option>
                                    <option value="strict-schedule">Strict schedule, no flexibility</option>
                                </select>
                            </div>

                            <div>
                                        <label className="block text-sm md:text-base font-medium text-gray-800 mb-2">
                                    <DollarSign className="w-4 h-4 inline mr-1" />
                                    What's your budget for health/wellness?
                                </label>
                                <select
                                    value={userProfile.budget}
                                    onChange={(e) => handleProfileChange('budget', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="">Select...</option>
                                    <option value="very-tight">Very tight - every dollar counts</option>
                                    <option value="limited-budget">Limited - can afford basics only</option>
                                    <option value="moderate-budget">Moderate - some flexibility for health</option>
                                    <option value="flexible-budget">Flexible - budget isn't a major constraint</option>
                                </select>
                            </div>

                            <div>
                                        <label className="block text-sm md:text-base font-medium text-gray-800 mb-2">
                                    <Users className="w-4 h-4 inline mr-1" />
                                    Family situation
                                </label>
                                <select
                                    value={userProfile.familySituation}
                                    onChange={(e) => handleProfileChange('familySituation', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="">Select...</option>
                                    <option value="single-no-dependents">Single, no dependents</option>
                                    <option value="young-children">Primary caregiver for young children</option>
                                    <option value="school-age-children">Have school-age children</option>
                                    <option value="elderly-care">Caring for elderly family member</option>
                                    <option value="partner-no-kids">Partner/spouse, no children</option>
                                </select>
                            </div>

                            <div>
                                        <label className="block text-sm md:text-base font-medium text-gray-800 mb-2">
                                    <Activity className="w-4 h-4 inline mr-1" />
                                    Your neighborhood
                                </label>
                                <select
                                    value={userProfile.neighborhood}
                                    onChange={(e) => handleProfileChange('neighborhood', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="">Select...</option>
                                    <option value="safe-walkable">Safe, walkable, parks nearby</option>
                                    <option value="limited-walkability">Limited walkability, some amenities</option>
                                    <option value="unsafe-limited">Safety concerns, limited outdoor spaces</option>
                                    <option value="suburban-car-needed">Suburban, car needed for everything</option>
                                    <option value="urban-accessible">Urban, good public transit/resources</option>
                                </select>
                            </div>

                            <div>
                                        <label className="block text-sm md:text-base font-medium text-gray-800 mb-2">
                                    Transportation access
                                </label>
                                <select
                                    value={userProfile.transportation}
                                    onChange={(e) => handleProfileChange('transportation', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="">Select...</option>
                                    <option value="own-car">Own car, reliable</option>
                                    <option value="public-transit">Public transit available</option>
                                    <option value="limited-transport">Limited transportation options</option>
                                    <option value="no-reliable-transport">No reliable transportation</option>
                                </select>
                            </div>
                        </div>

                        <button
                            onClick={() => setStep('wearable')}
                            disabled={!userProfile.healthGoal || !userProfile.workSchedule || !userProfile.budget}
                            className="mt-8 w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            Continue to Health Data <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                )}

                {step === 'wearable' && (
                    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Your Health Data</h2>
                        <p className="text-gray-600 text-sm md:text-base mb-6">
                            Adjust these sliders to simulate what your wearable (Apple Watch, Oura, Garmin, etc.) might show
                        </p>

                        <div className="space-y-8">
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                            <label className="text-sm md:text-base font-medium text-gray-800">Sleep Score</label>
                                    <span className={`text-2xl font-bold ${wearableData.sleepScore >= 70 ? 'text-green-600' : 'text-orange-600'}`}>
                                        {wearableData.sleepScore}
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={wearableData.sleepScore}
                                    onChange={(e) => handleWearableChange('sleepScore', e.target.value)}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>Poor</span>
                                    <span>Excellent</span>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                            <label className="text-sm md:text-base font-medium text-gray-800">Activity Level</label>
                                    <span className={`text-2xl font-bold ${wearableData.activityLevel >= 60 ? 'text-green-600' : 'text-orange-600'}`}>
                                        {wearableData.activityLevel}
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={wearableData.activityLevel}
                                    onChange={(e) => handleWearableChange('activityLevel', e.target.value)}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>Sedentary</span>
                                    <span>Very Active</span>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                            <label className="text-sm md:text-base font-medium text-gray-800">Stress Level</label>
                                    <span className={`text-2xl font-bold ${wearableData.stressLevel <= 40 ? 'text-green-600' : 'text-orange-600'}`}>
                                        {wearableData.stressLevel}
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={wearableData.stressLevel}
                                    onChange={(e) => handleWearableChange('stressLevel', e.target.value)}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>Low</span>
                                    <span>High</span>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                            <label className="text-sm md:text-base font-medium text-gray-800">Heart Rate Variability (HRV)</label>
                                    <span className={`text-2xl font-bold ${wearableData.heartRateVariability >= 60 ? 'text-green-600' : 'text-orange-600'}`}>
                                        {wearableData.heartRateVariability}
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={wearableData.heartRateVariability}
                                    onChange={(e) => handleWearableChange('heartRateVariability', e.target.value)}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>Low</span>
                                    <span>High</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 mt-8">
                            <button
                                onClick={() => setStep('intake')}
                                className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300"
                            >
                                Back
                            </button>
                            <button
                                onClick={generateRecommendations}
                                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center gap-2"
                            >
                                Generate My Plan <TrendingUp className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                )}

                {loading && (
                    <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-lg text-gray-600">Analyzing your context and generating personalized recommendations...</p>
                    </div>
                )}

                {step === 'results' && recommendations && (
                            <div className="space-y-6">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg p-6 md:p-8 text-white">
                            <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">The Problem with Generic Health Advice</h2>
                            <p className="text-base md:text-lg opacity-90">
                                Traditional health apps give everyone the same advice. But your life has real constraints - 
                                time, money, responsibilities, environment. Generic advice fails because it ignores these barriers. 
                                <span className="font-semibold"> Barrier-aware AI adapts recommendations to what's actually possible for YOU.</span>
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <AlertCircle className="w-6 h-6 text-red-500" />
                                            <h3 className="text-lg md:text-xl font-bold text-gray-900">Generic Health App</h3>
                                </div>
                                        <p className="text-sm md:text-base text-gray-600 mb-4">One-size-fits-all recommendations (typical 30% adherence rate)</p>
                                
                                <div className="space-y-3">
                                    {recommendations.generic.map((rec, idx) => (
                                        <div key={idx} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                                            <p className="text-sm text-gray-700">{rec}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                                    <p className="text-sm font-semibold text-gray-700 mb-2">Why this fails:</p>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                        <li>• Ignores your work schedule constraints</li>
                                        <li>• Assumes unlimited time and money</li>
                                        <li>• Doesn't account for caregiving responsibilities</li>
                                        <li>• No adaptation to your environment</li>
                                        <li>• Sets unrealistic expectations → guilt → giving up</li>
                                    </ul>
                                </div>
                            </div>

                                    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border-2 border-blue-500">
                                <div className="flex items-center gap-3 mb-4">
                                    <CheckCircle className="w-6 h-6 text-green-500" />
                                            <h3 className="text-lg md:text-xl font-bold text-gray-900">Barrier-Aware AI Coach</h3>
                                </div>
                                        <p className="text-sm md:text-base text-gray-600 mb-4">Personalized to YOUR real-world constraints (targets 60-70% adherence)</p>
                                
                                <div className="space-y-4">
                                    {recommendations.barrierAware.map((rec, idx) => (
                                        <div key={idx} className="p-4 bg-green-50 border border-green-200 rounded-lg">
                                            <p className="text-sm font-semibold text-gray-900 mb-2">{rec.action}</p>
                                            <div className="space-y-1 text-xs text-gray-600">
                                                <p><span className="font-semibold">Barrier addressed:</span> {rec.barrier}</p>
                                                <p><span className="font-semibold">Psychology used:</span> {rec.principle}</p>
                                                <p className="text-green-700 font-semibold">{rec.impact}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                    <p className="text-sm font-semibold text-gray-900 mb-2">✓ Why this works:</p>
                                    <ul className="text-sm text-gray-700 space-y-1">
                                        <li>• Adapts to your actual schedule and resources</li>
                                        <li>• Micro-habits you can actually maintain</li>
                                        <li>• Uses proven behavioral psychology</li>
                                        <li>• Immediate, achievable wins build momentum</li>
                                        <li>• Success breeds more success</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Behavioral Economics Principles Applied</h3>
                            <p className="text-sm md:text-base text-gray-600 mb-6">
                                These recommendations leverage proven psychological principles to drive behavior change:
                            </p>
                            
                            <div className="grid md:grid-cols-2 gap-4">
                                {recommendations.behavioralPrinciples.map((item, idx) => (
                                    <div key={idx} className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                                        <h4 className="font-semibold text-gray-900 mb-1">{item.principle}</h4>
                                        <p className="text-sm text-gray-600">{item.usage}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl shadow-lg p-6 md:p-8 border border-green-200">
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Business Impact</h3>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div>
                                    <div className="text-2xl md:text-3xl font-bold text-green-600 mb-1 md:mb-2">2-3x</div>
                                    <p className="text-sm md:text-base text-gray-700">Higher adherence rate vs generic coaching</p>
                                </div>
                                <div>
                                    <div className="text-2xl md:text-3xl font-bold text-green-600 mb-1 md:mb-2">40-50%</div>
                                    <p className="text-sm md:text-base text-gray-700">Reduction in user churn through personalization</p>
                                </div>
                                <div>
                                    <div className="text-2xl md:text-3xl font-bold text-green-600 mb-1 md:mb-2">$$$</div>
                                    <p className="text-sm md:text-base text-gray-700">Expanded TAM to underserved populations</p>
                                </div>
                            </div>
                            <p className="mt-4 text-sm md:text-base text-gray-600 italic">
                                * Projected based on behavior change literature and digital health engagement studies
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 text-center">
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Ready to try a different profile?</h3>
                            <button
                                onClick={() => {
                                    setStep('intake');
                                    setRecommendations(null);
                                    setUserProfile({
                                        healthGoal: '',
                                        workSchedule: '',
                                        budget: '',
                                        familySituation: '',
                                        neighborhood: '',
                                        transportation: ''
                                    });
                                }}
                                className="bg-blue-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-blue-700"
                            >
                                Start Over
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}