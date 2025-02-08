/* eslint-disable @next/next/no-img-element */
'use client'

import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

const STEPS = [
  {
    name: 'Step 1: Add image',
    description: 'Choose an image for your case',
    url: '/upload',
  },
  {
    name: 'Step 2: Customize design',
    description: 'Make the case yours',
    url: '/design',
  },
  {
    name: 'Step 3: Summary',
    description: 'Review your final design',
    url: '/preview',
  },
]

const Steps = () => {
  const pathname = usePathname()

  return (
    <nav aria-label="Progress" className="w-full">
      <ol className="rounded-md bg-white lg:flex lg:rounded-none lg:border-l lg:border-r lg:border-gray-200">
        {STEPS.map((step, i) => {
          const isCurrent = pathname.endsWith(step.url)
          const isCompleted = STEPS.slice(i + 1).some((step) =>
            pathname.endsWith(step.url)
          )
          const imgPath = `/snake-${i + 1}.png`

          return (
            <li 
              key={step.name} 
              className="relative overflow-hidden lg:flex-1"
              aria-current={isCurrent ? 'step' : undefined}
            >
              <div className="group">
                {/* Progress Bar */}
                <span
                  className={cn(
                    'absolute left-0 top-0 h-full w-1 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full',
                    {
                      'bg-zinc-700': isCurrent,
                      'bg-primary': isCompleted,
                      'bg-zinc-400': !isCurrent && !isCompleted,
                    }
                  )}
                  aria-hidden="true"
                />

                {/* Step Content */}
                <div
                  className={cn(
                    'flex items-center px-6 py-4 text-sm font-medium',
                    i !== 0 ? 'lg:pl-9' : ''
                  )}
                >
                  {/* Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={imgPath}
                      alt={`Step ${i + 1} illustration`}
                      className={cn(
                        'h-20 w-20 object-contain',
                        {
                          'border-2 border-zinc-700': isCurrent,
                          'border-none': !isCurrent,
                        }
                      )}
                    />
                  </div>

                  {/* Text Content */}
                  <div className="ml-4 flex min-w-0 flex-col justify-center">
                    <span
                      className={cn('text-sm font-semibold', {
                        'text-primary': isCompleted,
                        'text-zinc-700': !isCompleted || isCurrent,
                      })}
                    >
                      {step.name}
                    </span>
                    <span className="text-sm text-zinc-500">
                      {step.description}
                    </span>
                  </div>
                </div>

                {/* Separator */}
                {i !== 0 && (
                  <div className="absolute inset-0 left-0 hidden w-3 lg:block" aria-hidden="true">
                    <svg
                      className="h-full w-full text-gray-300"
                      viewBox="0 0 12 82"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0.5 0V31L10.5 41L0.5 51V82"
                        stroke="currentcolor"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Steps