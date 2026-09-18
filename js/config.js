// ============================================
// MAZU - Configuration
// Set IMG_BASE to your image CDN path before deployment
// ============================================

// Image base URL - change this before deploying to production
// In the sandbox, use the full CDN path
// For production, you can host images locally in /images/ folder
const MAZU_CONFIG = {
  // Local images (logo / category menu / product SKUs) always live in /images/.
  // Case-study / blog / factory photos still use the /static/ token -> CDN_BASE branch below.
  imgBase: 'images/',
  
  // Fallback: if images fail to load, use placeholder color
  usePlaceholders: false,
};

// Try to detect environment
(function() {
  // If running on localhost or custom domain, use relative paths
  const host = window.location.hostname;
  const isLocal = host === 'localhost' || host === '127.0.0.1';
  const isSandbox = host.includes('feishucdn.com') || host.includes('doubaocdn.com') || 
                    host.includes('feishu.cn') || host.includes('miaoda');
  
  // Default: auto-detect
  if (!MAZU_CONFIG.imgBase) {
    if (isSandbox || isLocal) {
      // Use the sandbox CDN path
      MAZU_CONFIG.imgBase = '/spark/app/app_17cdy0egpep/runtime/api/v1/storage/object/bucket_aadkqvfine6fi_static/';
    } else {
      // Use local images folder for production
      MAZU_CONFIG.imgBase = 'images/';
    }
  }
})();

// Helper function used throughout the app
function imgUrl(path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  // Miaoda sandbox tokens (e.g. "static/xxxx") always resolve to the absolute CDN URL,
  // so unmodified case-study / blog / factory photos keep working on any deployed domain.
  if (path.startsWith('static/')) {
    return CDN_BASE + path;
  }
  return MAZU_CONFIG.imgBase + path;
}

// Miaoda sandbox CDN base — used for unmodified case-study / blog / factory photos
// so they keep rendering on any deployed domain (images are NOT changed, only the URL scheme).
const CDN_BASE = 'https://app.miaoda.cn/spark/app/app_17cdy0egpep/runtime/api/v1/storage/object/bucket_aadkqvfine6fi_static/';

// Logo path helper
const LOGO_PATH = 'logo.png';
