import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQ_ITEMS } from '@/constants';

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section-padding bg-background">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="tag-pill mx-auto mb-4 w-fit">
            <HelpCircle size={12} /> FAQ
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Questions We Hear<br />
            <span className="italic" style={{ color: 'hsl(27 87% 60%)' }}>Most Often</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to know about YogicTown. Cannot find your answer?{' '}
            <a href="/contact" className="underline" style={{ color: 'hsl(133 18% 59%)' }}>Contact us.</a>
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <div
              key={i}
              className={`rounded-xl border transition-all duration-200 ${
                open === i ? 'border-primary shadow-sm' : 'border-border hover:border-primary/40'
              }`}
              style={open === i ? { borderColor: 'hsl(133 18% 59%)' } : {}}
            >
              <button
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-medium text-sm">{item.q}</span>
                <ChevronDown
                  size={16}
                  className={`shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
                  style={{ color: open === i ? 'hsl(133 18% 59%)' : undefined }}
                />
              </button>
              {open === i && (
                <div className="px-5 pb-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
