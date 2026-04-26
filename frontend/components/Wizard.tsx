'use client';

import { useState } from 'react';

interface WizardProps {
  onComplete: (config: any) => void;
}

const STEPS = [
  {
    id: 1,
    title: 'What brought you here?',
    subtitle: "We'll shape your path based on where you're starting from.",
    type: 'cards',
    field: 'startPoint',
    options: [
      { icon: '💡', title: 'I have an idea', desc: 'A spark to shape into something real' },
      { icon: '📑', title: 'I have notes', desc: 'Ready to start building' },
      { icon: '🚀', title: 'Running business', desc: 'Need tech to scale' },
      { icon: '🧪', title: 'Experiment', desc: 'Testing a concept' },
    ],
  },
  {
    id: 2,
    title: "Let's shape your idea",
    subtitle: 'What does your product help people do?',
    type: 'text',
    field: 'idea',
    chips: ['Match dog walkers', 'Home meal marketplace', 'Automate invoicing'],
  },
  {
    id: 3,
    title: 'Pick your strategic path',
    subtitle: 'How will your product work?',
    type: 'cards',
    field: 'path',
    options: [
      { icon: '🔗', title: 'Connect people', desc: 'Marketplace' },
      { icon: '⚙️', title: 'Automate work', desc: 'SaaS tool' },
      { icon: '💬', title: 'Bring together', desc: 'Community' },
      { icon: '🛒', title: 'Sell unique', desc: 'D2C store' },
    ],
  },
  {
    id: 4,
    title: 'How fast do you want to move?',
    subtitle: "Helps your Squad calibrate their pace.",
    type: 'range',
    field: 'pace',
    labels: ['Taking my time', 'Balanced', 'Fast'],
  },
  {
    id: 5,
    title: 'What matters most?',
    subtitle: 'Pick up to 3. Your Squad will prioritize these first.',
    type: 'tags',
    field: 'priorities',
    tags: ['First users', 'Professional look', 'Payments', 'Mobile', 'Low cost', 'Fast', 'Privacy', 'Social'],
  },
];

export default function Wizard({ onComplete }: WizardProps) {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, any>>({
    priorities: ['First users', 'Payments'],
  });
  const [ideaText, setIdeaText] = useState('');
  const [paceValue, setPaceValue] = useState(1);

  const currentStep = STEPS[step];
  const progress = ((step + 1) / STEPS.length) * 100;

  const selectCard = (field: string, value: string) => {
    setSelections((prev) => ({ ...prev, [field]: value }));
  };

  const toggleTag = (tag: string) => {
    setSelections((prev) => {
      const current = prev.priorities || [];
      if (current.includes(tag)) {
        return { ...prev, priorities: current.filter((t: string) => t !== tag) };
      }
      if (current.length >= 3) return prev;
      return { ...prev, priorities: [...current, tag] };
    });
  };

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      const config = {
        ...selections,
        idea: ideaText,
        pace: ['Taking my time', 'Balanced', 'Fast'][paceValue],
      };
      onComplete(config);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div className="min-h-[100dvh] flex flex-col">
      <div className="flex-1 max-w-xl mx-auto w-full px-4 py-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="h-1 bg-panel rounded overflow-hidden">
            <div
              className="h-full bg-aurora transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-xs text-nebula mt-2 font-mono">
            Step {step + 1} of {STEPS.length}
          </div>
        </div>

        {/* Step Content */}
        <div className="animate-fade-in">
          <h2 className="text-2xl font-bold mb-2">{currentStep.title}</h2>
          <p className="text-lunar text-sm mb-6">{currentStep.subtitle}</p>

          {currentStep.type === 'cards' && (
            <div className="grid grid-cols-2 gap-3 mb-6">
              {currentStep.options?.map((opt) => (
                <div
                  key={opt.title}
                  onClick={() => selectCard(currentStep.field, opt.title)}
                  className={`relative bg-surface border-2 rounded-xl p-4 cursor-pointer transition-all hover:-translate-y-0.5 ${
                    selections[currentStep.field] === opt.title
                      ? 'border-aurora bg-panel shadow-[0_0_20px_rgba(56,189,248,0.1)]'
                      : 'border-panel hover:border-nebula'
                  }`}
                >
                  <div className="text-2xl mb-2">{opt.icon}</div>
                  <div className="font-semibold text-sm mb-1">{opt.title}</div>
                  <div className="text-xs text-nebula">{opt.desc}</div>
                  {selections[currentStep.field] === opt.title && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-aurora rounded-full flex items-center justify-center text-void text-xs font-bold">
                      ✓
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {currentStep.type === 'text' && (
            <div className="mb-6">
              <textarea
                value={ideaText}
                onChange={(e) => setIdeaText(e.target.value)}
                placeholder="e.g. Help freelancers find office space..."
                className="w-full min-h-[100px] bg-surface border-2 border-panel rounded-xl p-4 text-starlight placeholder-nebula text-sm font-sans resize-y outline-none focus:border-aurora transition-colors"
              />
              <div className="flex flex-wrap gap-2 mt-3">
                {currentStep.chips?.map((chip) => (
                  <span
                    key={chip}
                    onClick={() => setIdeaText(chip)}
                    className="bg-aurora/10 text-aurora px-3 py-1 rounded-full text-xs cursor-pointer hover:bg-aurora/20 transition-colors"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          )}

          {currentStep.type === 'range' && (
            <div className="mb-6">
              <div className="flex justify-between text-xs text-nebula mb-3">
                {currentStep.labels?.map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </div>
              <input
                type="range"
                min="0"
                max="2"
                value={paceValue}
                onChange={(e) => setPaceValue(Number(e.target.value))}
                className="w-full"
              />
              <div className="text-center mt-3 text-aurora font-semibold">
                {currentStep.labels?.[paceValue]}
              </div>
            </div>
          )}

          {currentStep.type === 'tags' && (
            <div className="flex flex-wrap gap-2 mb-6">
              {currentStep.tags?.map((tag) => (
                <span
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm cursor-pointer transition-all ${
                    selections.priorities?.includes(tag)
                      ? 'bg-aurora text-void font-medium'
                      : 'bg-surface border border-panel text-lunar hover:border-nebula'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-4">
          <button
            onClick={handleBack}
            className={`text-nebula text-sm px-4 py-2 hover:text-lunar transition-colors ${
              step === 0 ? 'invisible' : ''
            }`}
          >
            ← Back
          </button>

          <button
            onClick={handleNext}
            className="bg-aurora text-void font-semibold px-6 py-3 rounded-full text-sm hover:scale-105 transition-transform"
          >
            {step === STEPS.length - 1 ? 'Assemble Squad →' : 'Continue →'}
          </button>
        </div>
      </div>
    </div>
  );
}
