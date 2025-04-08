import { type MetaFunction, Link } from '@remix-run/react';
import { motion } from 'framer-motion';
import { AnimatedText } from '~/components/AnimatedText'; // Adjusted import path

export const meta: MetaFunction = () => {
  return [
    { title: 'ModaMosaic | Home' }, // Updated title
    { name: 'description', content: 'Welcome to ModaMosaic' }, // Added description
  ];
};

export default function Homepage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  // Note: The jacquard font needs to be applied via Tailwind config (font-jacquard)
  // The Inter font is applied via the default sans stack in Tailwind config

  return (
    // Removed min-h-screen and justify-center to allow content flow
    <div className="w-full bg-white overflow-hidden flex items-center p-4">
      <motion.main
        className="border-black border-4 sm:border-8 p-4 sm:p-6 w-full max-w-7xl mx-auto flex flex-col justify-between"
        style={{
          height: 'calc(100vh - 2rem)', // Adjust height as needed
          maxHeight: '90vh', // Keep max height
          overflow: 'hidden', // Keep overflow hidden
        }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="flex flex-col justify-between h-full" variants={itemVariants}>
          {/* Header Section */}
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl sm:text-6xl lg:text-5xl font-bold mb-4 sm:mb-6">
              <AnimatedText text="MODAMOSAIC" />
            </h1>
          </motion.div>

          {/* Middle Section */}
          <motion.div className="flex-grow flex flex-col justify-center space-y-4 sm:space-y-6 overflow-hidden" variants={itemVariants}>
            <motion.div variants={itemVariants}>
              {/* Use Remix Link component */}
              <Link to="/explore" className="inline-block group">
                <span className={`bg-black text-white px-4 sm:px-6 py-2 sm:py-3 text-xl sm:text-4xl lg:text-3xl transition-all duration-100 ease-in-out transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:filter group-hover:drop-shadow-[5px_5px_0_rgba(0,0,0,1)] active:translate-y-0 active:translate-x-0 active:filter-none font-jacquard`}>
                  Explore →
                </span>
              </Link>
            </motion.div>
            <motion.h2
              className={`text-4xl sm:text-7xl lg:text-6xl text-white bg-blue-600 px-4 py-2 sm:px-6 sm:py-3 font-jacquard overflow-hidden whitespace-nowrap text-ellipsis`}
              variants={itemVariants}
            >
              <AnimatedText text="BASEBALL" />
            </motion.h2>

            <motion.h2
              className="text-4xl sm:text-7xl lg:text-6xl font-bold text-white bg-blue-600 px-4 py-2 sm:px-6 sm:py-3 font-sans overflow-hidden whitespace-nowrap text-ellipsis" // Use default sans (Inter)
              variants={itemVariants}
            >
              <AnimatedText text="MODAMOSAIC" />
            </motion.h2>

            <motion.p className="text-lg sm:text-xl lg:text-2xl px-4 py-2 font-sans" variants={itemVariants}> {/* Use default sans */}
              {/* Using AnimatedText for consistency, though simple text is fine here */}
              <AnimatedText text="last-updated:01/03/2025" />
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6">
              {/* Use Remix Link component */}
              <Link to="/collections/all" className="inline-block group"> {/* Updated link path */} 
                <span className={`bg-black text-white px-4 sm:px-6 py-2 sm:py-3 text-lg sm:text-3xl lg:text-2xl transition-all duration-100 ease-in-out transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:filter group-hover:drop-shadow-[5px_5px_0_rgba(0,0,0,1)] active:translate-y-0 active:translate-x-0 active:filter-none font-jacquard`}>
                  Shop Now →
                </span>
              </Link>
              {/* Use Remix Link component */}
              <Link to="/collections/all" className="inline-block group"> {/* Updated link path */}
                <span className={`bg-black text-white px-4 sm:px-6 py-2 sm:py-3 text-lg sm:text-3xl lg:text-2xl transition-all duration-100 ease-in-out transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:filter group-hover:drop-shadow-[5px_5px_0_rgba(0,0,0,1)] active:translate-y-0 active:translate-x-0 active:filter-none font-jacquard`}>
                  Shop All →
                </span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Footer Section */}
          <motion.div className="mt-4 sm:mt-6 flex-grow-0 flex flex-col justify-end" variants={itemVariants}>
            <motion.hr className="border-t-2 sm:border-t-4 border-black mb-4 sm:mb-6" variants={itemVariants} />

            <motion.div className="text-xl sm:text-2xl lg:text-3xl font-bold space-y-2 sm:space-y-3 font-sans" variants={itemVariants}> {/* Use default sans */}
              <motion.div variants={itemVariants}>
                {/* Use Remix Link component */}
                <Link to="/socials" className="block w-fit">
                  <span className="relative group">
                    <AnimatedText text="SOCIALS" />
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 sm:h-1 bg-black transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                {/* Use Remix Link component */}
                <Link to="/connect" className="block w-fit">
                  <span className="relative group">
                    <AnimatedText text="CONNECT" />
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 sm:h-1 bg-black transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.main>
    </div>
  );
} 