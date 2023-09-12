import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

const Sheet = ({ children }, ref) => {
  const { sheet, content } = ref;
  const BOTTOM_SHEET_HEIGHT = window.innerHeight - 60;
  return (
    <motion.div
      ref={sheet}
      className="flex flex-col fixed z-50 top-[calc(100%-68px)] left-0 right-0 h-[calc(100svh-60px)] rounded-t-[20px] bg-white ease-out drop-shadow-xl"
    >
      <div className="w-full h-5 flex items-center">
        <div className="bg-[#ddd] w-16 h-1 rounded-full mx-auto" />
      </div>
      <motion.div ref={content}>
        {children}
        <div>여긴 아니야</div>
      </motion.div>
    </motion.div>
  );
};

export default forwardRef(Sheet);
