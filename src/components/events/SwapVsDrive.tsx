import React from 'react';

export default function SwapVsDrive() {
  return (
    <div className="w-full bg-white">
      <div 
        className="max-w-5xl mx-auto p-8 text-black" 
        style={{ fontFamily: 'Telegraf, sans-serif' }}
      >
        <p 
          className="text-5xl text-center mb-10 font-bold" 
          style={{ fontFamily: '"Brasika Display", serif' }}
        >
          Clothing Swap Vs. Drive
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          <div 
            className="rounded-xl p-8 border border-gray-600 shadow-sm"
            style={{ backgroundColor: '#DEE8D0' }}
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
            className="rounded-xl p-8 border border-gray-500 shadow-sm"
            style={{ backgroundColor: '#CED8E0' }}
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
          className="rounded-xl p-6 border border-amber-900/20 shadow-sm max-w-4xl mx-auto mt-10"
          style={{ backgroundColor: '#FFFAF4' }}
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