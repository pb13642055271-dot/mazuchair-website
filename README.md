# MAZU - Premium Folding Chairs

Corporate website for MAZU, a leading folding chair manufacturer based in Hebei, China.

## Features

- **7 Pages**: Home, About Us, Products, Product Detail, Case Studies, Blog, Contact
- **Responsive Design**: Mobile-first approach with breakpoints at 640px, 768px, 1024px, 1280px
- **Interactive Features**: 
  - Navigation with dropdown product menu
  - Search modal (Cmd/Ctrl + K)
  - Inquiry/quote modal with form
  - Animated number counters
  - FAQ accordion
  - WhatsApp floating button
  - Back-to-top button
  - Scroll reveal animations
  - Product category filtering
  - Product gallery with thumbnails
  - Breadcrumb navigation
- **SEO Ready**: Meta tags, Open Graph, sitemap.xml, robots.txt
- **Deployment Ready**: Pure HTML/CSS/JS, no build step required

## Tech Stack

- HTML5 (semantic markup)
- CSS3 (CSS Grid, Flexbox, CSS Variables, CSS Animations)
- Vanilla JavaScript (ES6+)
- Inter font (self-hosted via CDN mirror)

## Project Structure

```
/
├── index.html              # Homepage
├── about.html              # About Us
├── products.html           # Products listing
├── product-detail.html     # Product detail page
├── cases.html              # Case Studies / Portfolio
├── blog.html               # News & Blog
├── contact.html            # Contact page
├── robots.txt              # SEO robots file
├── sitemap.xml             # SEO sitemap
├── site.webmanifest        # PWA manifest
├── css/
│   └── style.css           # Main stylesheet (design system + components)
├── js/
│   ├── config.js           # Image base URL configuration
│   ├── data.js             # Product, case study, blog data
│   └── main.js             # Shared components and utilities
└── static/                 # Logo and images (hosted externally)
```

## Deployment

### Vercel

1. Push this project to a GitHub repository
2. Go to vercel.com and import the repo
3. Framework preset: **Other** (static)
4. Build command: — (none)
5. Output directory: `.` (root)
6. Deploy!

### Netlify

1. Push to GitHub/GitLab/Bitbucket
2. Drag-and-drop the folder to app.netlify.com, OR
3. Connect the repo with these settings:
   - Build command: — (none)
   - Publish directory: `.` (root)
4. Deploy!

### Image Setup

Before deploying to production, upload all product images to your preferred image host 
(Cloudinary, Imgix, S3 + CDN, etc.) and update the image paths:

**Option 1: Update `js/config.js`**
```js
const MAZU_CONFIG = {
  imgBase: 'https://your-cdn.com/images/',
};
```

**Option 2: Place images in `/images/` folder**
```
images/
├── logo.png
├── product1.jpg
├── product2.jpg
...
```
Update data in `js/data.js` to reference `product1.jpg` etc. (without base path)

## Customization

- **Colors**: Edit CSS variables in `css/style.css` under `:root`
- **Products**: Edit `SITE_DATA.products` in `js/data.js`
- **Categories**: Edit `SITE_DATA.categories` in `js/data.js`
- **Company info**: Edit `SITE_DATA.company` in `js/data.js`
- **Logo**: Replace the logo image path in `js/config.js` (LOGO_PATH)

## Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## License

© 2026 MAZU Furniture Co., Ltd. All rights reserved.
