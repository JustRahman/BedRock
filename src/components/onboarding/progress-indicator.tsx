'use client'

import { Check } from 'lucide-react'

interface Step {
  id: number
  name: string
  description: string
}

interface ProgressIndicatorProps {
  steps: Step[]
  currentStep: number
}

export function ProgressIndicator({ steps, currentStep }: ProgressIndicatorProps) {
  return (
    <nav aria-label="Progress" className="mb-8">
      {/* Row 1: Circles and connector lines */}
      <div className="flex items-center">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-1 items-center last:flex-none">
            {/* Step circle */}
            <div
              className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 ${
                currentStep > step.id
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : currentStep === step.id
                  ? 'border-blue-600 bg-white text-blue-600'
                  : 'border-gray-300 bg-white text-gray-500'
              }`}
            >
              {currentStep > step.id ? (
                <Check className="h-4 w-4" />
              ) : (
                <span className="text-xs font-medium">{step.id}</span>
              )}
            </div>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div
                className={`h-0.5 flex-1 ${
                  currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Row 2: Labels — aligned under each circle */}
      <div className="mt-2 flex">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`text-center ${index < steps.length - 1 ? 'flex-1' : ''}`}
            style={{ minWidth: 32 }}
          >
            <p
              className={`text-[10px] font-medium leading-tight sm:text-xs ${
                currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              {step.name}
            </p>
          </div>
        ))}
      </div>
    </nav>
  )
}
