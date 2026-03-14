import { useState } from 'react';
import html2canvas from 'html2canvas';
import { Camera, Download, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ScreenshotButton = () => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [screenshot, setScreenshot] = useState(null);

  const takeScreenshot = async () => {
    setIsCapturing(true);
    
    // Give time for UI to settle and hide any elements if needed
    await new Promise(resolve => setTimeout(resolve, 100));

    try {
      const canvas = await html2canvas(document.body, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#0a0a0a', // Match site background
        ignoreElements: (element) => {
          return element.hasAttribute('data-screenshot-ignore');
        }
      });

      const image = canvas.toDataURL('image/png');
      setScreenshot(image);
      setShowPreview(true);
    } catch (error) {
      console.error('Screenshot failed:', error);
    } finally {
      setIsCapturing(false);
    }
  };

  const downloadScreenshot = () => {
    if (!screenshot) return;
    const link = document.createElement('a');
    link.download = `ayush-portfolio-screenshot-${new Date().getTime()}.webp`;
    link.href = screenshot;
    link.click();
    setShowPreview(false);
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        data-screenshot-ignore="true"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={takeScreenshot}
        disabled={isCapturing}
        className="fixed bottom-6 right-6 z-[9999] p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-2xl text-white hover:bg-white/20 transition-all flex items-center justify-center group"
        title="Take a screenshot"
      >
        {isCapturing ? (
          <Loader2 className="w-6 h-6 animate-spin text-accent1" />
        ) : (
          <Camera className="w-6 h-6 group-hover:text-accent1 transition-colors" />
        )}
      </motion.button>

      {/* Preview Modal */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden max-w-5xl w-full shadow-3xl flex flex-col"
            >
              <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                <h3 className="text-white font-medium flex items-center gap-2">
                  <Camera className="w-4 h-4" />
                  Screenshot Captured
                </h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={downloadScreenshot}
                    className="flex items-center gap-2 px-4 py-2 bg-accent1 text-black font-semibold rounded-lg hover:bg-accent1/90 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  <button
                    onClick={() => setShowPreview(false)}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="p-4 flex-1 overflow-auto bg-[#0a0a0a] flex items-center justify-center">
                {screenshot && (
                  <img 
                    src={screenshot} 
                    alt="Latest Screenshot" 
                    className="max-w-full h-auto rounded-lg shadow-2xl border border-white/5"
                  />
                )}
              </div>

              <div className="p-3 text-center bg-white/5 text-gray-500 text-xs">
                Capturing the entire page might take a few moments. Scroll to see the full preview.
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ScreenshotButton;
