import React from 'react';

export default function SwapVsDrive() {
  return (
    <div className="w-full bg-white">
      <div className="mx-auto max-w-5xl p-8 font-body text-black">
        <p className="mb-10 text-center font-display text-5xl font-bold">
          Clothing Swap Vs. Drive
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          <div 
            className="rounded-xl border border-gray-600 bg-brand-olive-light p-8 shadow-sm"
          >
            <h2 className="text-3xl font-bold mb-6">Clothing Swap</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-lg">Purpose</h3>
                <p className="text-sm">Let students browse and take free clothing.</p>
              </div>
              <div>
                <h3 className="font-bold text-lg">What Happens</h3>
                <p className="text-sm">Students attend an in-person event to browse, swap, and take items.</p>
              </div>
              <div>
                <h3 className="font-bold text-lg">When</h3>
                <p className="text-sm">On specific event dates.</p>
              </div>
              <div>
                <h3 className="font-bold text-lg">Outcome</h3>
                <p className="text-sm">Students leave with free second-hand clothes.</p>
              </div>
            </div>
          </div>

          <div 
            className="rounded-xl border border-gray-500 bg-brand-blue-light p-8 shadow-sm"
          >
            <h2 className="text-3xl font-bold mb-6">Clothing Drive</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-lg">Purpose</h3>
                <p className="text-sm">Collect clothing donations across campus.</p>
              </div>
              <div>
                <h3 className="font-bold text-lg">What Happens</h3>
                <p className="text-sm">Students donate clothing at bins or drives. The BU Campus Closet team sorts and stores items.</p>
              </div>
              <div>
                <h3 className="font-bold text-lg">When</h3>
                <p className="text-sm">Throughout the semester.</p>
              </div>
              <div>
                <h3 className="font-bold text-lg">Outcome</h3>
                <p className="text-sm">Clothes are prepared for future swaps.</p>
              </div>
            </div>
          </div>

        </div>

        <div 
          className="mx-auto mt-10 max-w-4xl rounded-xl border border-amber-900/20 bg-brand-cream p-6 shadow-sm"
        >
          <h2 className="text-2xl font-bold text-center mb-6">General Guidelines for All Events</h2>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-16 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>No undergarments, shoes, bedding, or accessories</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Bring clean, gently-used clothing in good condition</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
