import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

function Sheet({ children, header, onClick }, ref) {
  const { sheet, content, handle } = ref;

  return (
    <motion.div
      ref={sheet}
      className="noSelect fixed inset-x-0 top-[calc(100%-68px)] z-50 mx-auto flex h-[calc(100svh-24px)] max-w-screen-sm flex-col rounded-t-[20px] bg-white drop-shadow-xl duration-300 ease-out"
      onClick={onClick}
    >
      {/* header */}
      <div
        ref={handle}
        className="flex w-full cursor-pointer flex-col items-center"
      >
        <div className="flex h-5 items-center ">
          <div className="mx-auto h-1 w-16 rounded-full bg-[#ddd]" />
        </div>
        {header}
      </div>
      <motion.div className="h-full overflow-x-scroll" ref={content}>
        {children}
      </motion.div>
    </motion.div>
  );
}

export default forwardRef(Sheet);
