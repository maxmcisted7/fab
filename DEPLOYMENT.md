# Deploying Your Fable Presentation

This guide will help you deploy your Fable presentation to various platforms so you can use it as a template.

## What is Fable?

Fable is a presentation generator that creates beautiful slideshows from TOML files. It's like a more flexible alternative to tools like Reveal.js or Marp, with:
- Custom React templates for different slide layouts
- Markdown support
- Code syntax highlighting
- Image and diagram support
- PDF export capability
- Built-in Tailwind CSS styling

## Deployment Options

### Option 1: Vercel (Recommended - Free & Easy)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Follow the prompts** - Vercel will automatically detect your project and deploy it.

### Option 2: Netlify

1. **Create a `netlify.toml` file:**
   ```toml
   [build]
     command = "cd starter/main && npm install && npm run generate:css"
     publish = "starter/main/public"
     functions = "starter/main"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. **Deploy via Netlify dashboard** or use Netlify CLI.

### Option 3: GitHub Pages

1. **Create a GitHub repository** and push your code
2. **Enable GitHub Pages** in repository settings
3. **Set build command** to generate static files

### Option 4: Any Static Hosting

Build the presentation as static files and upload to any hosting service.

## Customizing Your Presentation

### Edit Content
- Modify `starter/main/content.toml` to change your presentation content
- Add new slides by adding new `[[pages]]` sections
- Use different templates like "Basic", "Cover", "TitleMultiColumn", etc.

### Available Templates
- `Cover` - Title slide
- `Basic` - Standard text slide with Markdown support
- `TitleMultiColumn` - Multi-column layout
- `FullPageDiagram` - ASCII art diagrams
- `FullPageImage` - Full-screen images
- `HalfPage` - Split layout with text and image/diagram

### Example Slide
```toml
[[pages]]
template = "Basic"
title = "My Awesome Slide"
text = """
- This is a **bullet point**
- You can use *italics* and **bold**
- Code: `console.log('Hello World')`
- Images: ![alt text](image.jpg)
"""
```

## Running Locally

1. **Install dependencies:**
   ```bash
   cd starter/main
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run start
   ```

3. **View at:** http://localhost:3000

## Export to PDF

```bash
cd starter/main
npm run export-pdf
```

## Navigation

- Use **arrow keys** to navigate slides
- Press **F** for fullscreen mode
- Press **ESC** to exit fullscreen

## Getting Help

- Check the [Fable GitHub repository](https://github.com/oxidecomputer/fable)
- Look at the example templates in `src/templates/`
- Modify the TOML content to create your own presentations 