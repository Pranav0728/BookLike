import React from 'react';

function HomeNavbar() {
  return (
    <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 pb-10 pt-4 md:px-8" aria-label="Global">
      <div className="flex items-center gap-2">
        <img 
          alt="DataFast logo" 
          width="28" 
          height="28" 
          decoding="async" 
          className="size-6 md:size-7" 
          style={{ color: 'transparent' }} 
          src="/logo.png" 
        />
        <span className="text-base font-bold md:text-lg">BookLike</span>
      </div>
      <div className="flex flex-1 items-center justify-end gap-4">
        <div className="relative">
          <button 
            className="btn btn-ghost btn-sm" 
            type="button" 
            aria-expanded="false" 
            id="headlessui-popover-button-:r0:"
          >
            <img 
              src=""
              alt="" 
              className="size-6 shrink-0 rounded-full" 
              referrerPolicy="no-referrer" 
              width="20" 
              height="20" 
            />
            <span className="capitalize">Pranav Molawade</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default HomeNavbar;
