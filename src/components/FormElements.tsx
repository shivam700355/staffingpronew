import React from 'react';
import { Check, Info, AlertTriangle, AlertCircle } from 'lucide-react';

// Unified styled Form Field Wrapper
interface FormFieldProps {
  label: string;
  id?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

export function FormField({ label, id, error, required, children }: FormFieldProps) {
  return (
    <div className="space-y-1.5" id={id}>
      <label className="text-xs font-extrabold text-indigo-950 uppercase tracking-wider block">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-500 font-bold">{error}</p>}
    </div>
  );
}

// Styled Checkbox Wrapper for Filters and checklists
interface FormCheckboxProps {
  key?: React.Key;
  label: string;
  checked: boolean;
  onChange: () => void;
  id?: string;
}

export function FormCheckbox({ label, checked, onChange, id }: FormCheckboxProps) {
  return (
    <label 
      id={id}
      className="flex items-center gap-2.5 text-xs font-semibold text-gray-600 hover:text-sp-green cursor-pointer select-none py-0.5 group transition-colors"
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4.5 w-4.5 text-sp-green rounded border-gray-300 focus:ring-sp-green/40 transition-colors"
      />
      <span className="group-hover:translate-x-0.5 transition-transform">{label}</span>
    </label>
  );
}

// Styled Range Slider for numbers
interface RangeSliderProps {
  label: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (val: number) => void;
  displayValue: string;
  minLabel: string;
  maxLabel: string;
  id?: string;
}

export function RangeSlider({
  label,
  min,
  max,
  step = 1,
  value,
  onChange,
  displayValue,
  minLabel,
  maxLabel,
  id
}: RangeSliderProps) {
  return (
    <div className="space-y-2.5" id={id}>
      <div className="flex justify-between items-center">
        <h4 className="text-xs font-black text-indigo-950 uppercase tracking-wider">
          {label}
        </h4>
        <span className="text-[11px] font-bold text-sp-green font-mono bg-sp-green-light px-2 py-0.5 rounded">
          {displayValue}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-sp-green cursor-pointer bg-gray-150 h-1.5 rounded-lg appearance-none"
      />
      <div className="flex justify-between text-[10px] text-gray-400 font-bold">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}

// Reusable alert notification banner
interface AlertBannerProps {
  type: 'success' | 'info' | 'warning' | 'danger';
  title: string;
  description?: string;
  id?: string;
}

export function AlertBanner({ type, title, description, id }: AlertBannerProps) {
  const getStyle = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-emerald-50 border-emerald-150 text-emerald-800',
          icon: <Check className="h-5 w-5 text-emerald-600 shrink-0" />
        };
      case 'warning':
        return {
          bg: 'bg-amber-50 border-amber-150 text-amber-800',
          icon: <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
        };
      case 'danger':
        return {
          bg: 'bg-red-50 border-red-150 text-red-800',
          icon: <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />
        };
      case 'info':
      default:
        return {
          bg: 'bg-indigo-50 border-indigo-150 text-indigo-800',
          icon: <Info className="h-5 w-5 text-indigo-600 shrink-0" />
        };
    }
  };

  const currentStyle = getStyle();

  return (
    <div id={id} className={`flex gap-3 p-4 border rounded-xl shadow-xs leading-relaxed ${currentStyle.bg}`}>
      {currentStyle.icon}
      <div>
        <h4 className="text-xs font-extrabold uppercase tracking-wide leading-none mb-1">{title}</h4>
        {description && <p className="text-xs font-medium">{description}</p>}
      </div>
    </div>
  );
}

// Multi-step progressive timeline tracking component
interface StepTimelineProps {
  steps: { id: number; label: string }[];
  currentStep: number;
}

export function StepTimeline({ steps, currentStep }: StepTimelineProps) {
  return (
    <div className="bg-white border border-gray-150 rounded-xl p-5 mb-8 flex items-center justify-between shadow-xs" id="interactive-step-timeline">
      {steps.map((st, sIdx) => (
        <div key={st.id} className="flex-1 flex items-center gap-2">
          <span className={`h-8 w-8 rounded-full border text-xs font-black flex items-center justify-center shrink-0 transition-all duration-300 ${
            currentStep === st.id
              ? 'bg-sp-green border-sp-green text-white shadow-sm ring-4 ring-sp-green/20'
              : currentStep > st.id
                ? 'bg-indigo-950 border-indigo-950 text-white'
                : 'bg-white border-gray-250 text-gray-400'
          }`}>
            {st.id}
          </span>
          <span className={`text-[11px] font-black tracking-wide hidden sm:inline uppercase transition-colors duration-200 ${
            currentStep === st.id ? 'text-indigo-950 font-extrabold' : 'text-gray-400'
          }`}>
            {st.label}
          </span>
          {sIdx < steps.length - 1 && <div className="flex-1 h-0.5 bg-gray-100 hidden sm:block mx-1.5" />}
        </div>
      ))}
    </div>
  );
}
