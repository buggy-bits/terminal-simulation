const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Input and output files
const inputFile = path.join(__dirname, '../output.txt');
const outputSvg = path.join(__dirname, '../terminal.svg');

// Terminal dimensions and styles
const WIDTH = 800;
const HEIGHT = 500;
const BACKGROUND_COLOR = '#282a36';
const FOREGROUND_COLOR = '#f8f8f2';
const FONT_FAMILY = 'SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace';
const FONT_SIZE = 14;
const PADDING = 20;

// Generate SVG using the terminal output
function generateSvg() {
  try {
    // Check if the output file exists
    if (!fs.existsSync(inputFile)) {
      console.error('Error: Terminal output file not found');
      return;
    }
    
    // Read the terminal output
    const terminalOutput = fs.readFileSync(inputFile, 'utf8');
    const lines = terminalOutput.split('\n');
    
    // Create SVG content
    let svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
      <!-- Terminal window background -->
      <rect width="100%" height="100%" fill="${BACKGROUND_COLOR}" rx="5" ry="5" />
      
      <!-- Terminal title bar -->
      <rect x="0" y="0" width="100%" height="30" fill="#44475a" rx="5" ry="5" />
      
      <!-- Terminal title -->
      <text x="${WIDTH/2}" y="20" font-family="${FONT_FAMILY}" font-size="14" fill="#f8f8f2" text-anchor="middle">Terminal ~ GitHub Profile</text>
      
      <!-- Terminal window buttons -->
      <circle cx="20" cy="15" r="7" fill="#ff5555" />
      <circle cx="45" cy="15" r="7" fill="#ffb86c" />
      <circle cx="70" cy="15" r="7" fill="#50fa7b" />
      
      <!-- Terminal content container -->
      <foreignObject x="${PADDING}" y="40" width="${WIDTH - (PADDING * 2)}" height="${HEIGHT - 50}">
        <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: '${FONT_FAMILY}'; font-size: ${FONT_SIZE}px; color: ${FOREGROUND_COLOR}; white-space: pre; line-height: 1.5;">
    `;
    
    // Process each line with ANSI color codes
    for (let line of lines) {
      // Handle ANSI escape codes (basic implementation)
      line = line
        .replace(/\x1B\[\d+m/g, '') // Remove ANSI color codes
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
        
      svgContent += line + '\n';
    }
    
    // Close SVG tags
    svgContent += `
        </div>
      </foreignObject>
      
      <!-- Terminal cursor animation -->
      <rect x="${PADDING + 4}" y="${HEIGHT - 60}" width="10" height="${FONT_SIZE}" fill="white" opacity="0.7">
        <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" />
      </rect>
    </svg>
    `;
    
    // Write SVG to file
    fs.writeFileSync(outputSvg, svgContent);
    console.log(`SVG terminal generated: ${outputSvg}`);
  } catch (error) {
    console.error('Error generating SVG:', error);
  }
}

// Execute SVG generation
generateSvg();