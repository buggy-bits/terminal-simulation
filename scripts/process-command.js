const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const chalk = require('chalk');

// Command to process
const command = process.argv[2] || 'help';

// Output file for terminal session
const outputFile = path.join(__dirname, '../output.txt');

// Define terminal width and other formatting
const TERMINAL_WIDTH = 80;
const USERNAME = 'sainag';
const HOSTNAME = 'github';

// Helper to center text
function centerText(text, width = TERMINAL_WIDTH) {
  const padding = Math.max(0, Math.floor((width - text.length) / 2));
  return ' '.repeat(padding) + text;
}

// Helper to draw a horizontal line
function horizontalLine(char = '─', width = TERMINAL_WIDTH) {
  return char.repeat(width);
}

// Terminal prompt
function getPrompt() {
  return `${USERNAME}@${HOSTNAME}:~$ `;
}

// Command handlers
const commands = {
  help: () => {
    const output = [
      '',
      chalk.green(centerText('AVAILABLE COMMANDS')),
      chalk.gray(horizontalLine()),
      '',
      chalk.yellow('help       ') + chalk.white('Show this help message'),
      chalk.yellow('about      ') + chalk.white('Learn about me'),
      chalk.yellow('skills     ') + chalk.white('View my technical skills'),
      chalk.yellow('projects   ') + chalk.white('Browse my projects'),
      chalk.yellow('experience ') + chalk.white('See my work experience'),
      chalk.yellow('education  ') + chalk.white('View my educational background'),
      chalk.yellow('contact    ') + chalk.white('How to reach me'),
      chalk.yellow('clear      ') + chalk.white('Clear the terminal'),
      '',
      chalk.gray(horizontalLine()),
      chalk.gray(centerText('Tip: Create an issue with a command name to run it!')),
      ''
    ];
    return output.join('\n');
  },

  about: () => {
    const output = [
      '',
      chalk.green(centerText('ABOUT ME')),
      chalk.gray(horizontalLine()),
      '',
      chalk.white("Hello! I'm a backend developer passionate about building efficient,"),
      chalk.white("scalable server-side applications. My journey in software development"),
      chalk.white("started with a fascination for how systems work behind the scenes."),
      '',
      chalk.white("I enjoy working with databases, APIs, and server architecture. When I'm"),
      chalk.white("not coding, you can find me exploring new technologies, contributing to"),
      chalk.white("open source, or learning about system design principles."),
      '',
      chalk.gray(horizontalLine()),
      ''
    ];
    return output.join('\n');
  },

  skills: () => {
    const output = [
      '',
      chalk.green(centerText('TECHNICAL SKILLS')),
      chalk.gray(horizontalLine()),
      '',
      chalk.yellow('Languages:'),
      chalk.white('  • JavaScript/Node.js  [') + progressBar(70) + chalk.white(']'),
      chalk.white('  • Python             [') + progressBar(65) + chalk.white(']'),
      chalk.white('  • SQL                [') + progressBar(75) + chalk.white(']'),
      chalk.white('  • Java               [') + progressBar(40) + chalk.white(']'),
      '',
      chalk.yellow('Frameworks:'),
      chalk.white('  • Express.js         [') + progressBar(80) + chalk.white(']'),
      chalk.white('  • Django             [') + progressBar(60) + chalk.white(']'),
      chalk.white('  • Flask              [') + progressBar(65) + chalk.white(']'),
      '',
      chalk.yellow('Databases:'),
      chalk.white('  • MongoDB            [') + progressBar(75) + chalk.white(']'),
      chalk.white('  • PostgreSQL         [') + progressBar(70) + chalk.white(']'),
      chalk.white('  • Redis              [') + progressBar(60) + chalk.white(']'),
      '',
      chalk.yellow('Tools & Technologies:'),
      chalk.white('  • Docker             [') + progressBar(65) + chalk.white(']'),
      chalk.white('  • Git                [') + progressBar(85) + chalk.white(']'),
      chalk.white('  • AWS                [') + progressBar(55) + chalk.white(']'),
      '',
      chalk.gray(horizontalLine()),
      ''
    ];
    return output.join('\n');
  },

  projects: () => {
    const output = [
      '',
      chalk.green(centerText('FEATURED PROJECTS')),
      chalk.gray(horizontalLine()),
      '',
      chalk.yellow('📁 Project 1: API Authentication System'),
      chalk.white('  • Secure user authentication with JWT and refresh tokens'),
      chalk.white('  • Role-based access control and permission management'),
      chalk.white('  • Password hashing and security best practices'),
      chalk.white('  • Technologies: Node.js, Express, MongoDB'),
      '',
      chalk.yellow('📁 Project 2: Database Performance Optimizer'),
      chalk.white('  • SQL query analysis and optimization tool'),
      chalk.white('  • Automatic index recommendations'),
      chalk.white('  • Dashboard for visualizing database performance'),
      chalk.white('  • Technologies: Python, PostgreSQL, Flask'),
      '',
      chalk.yellow('📁 Project 3: Microservice Communication System'),
      chalk.white('  • Event-driven architecture for inter-service communication'),
      chalk.white('  • Message queue implementation for reliability'),
      chalk.white('  • Service discovery and load balancing'),
      chalk.white('  • Technologies: Node.js, RabbitMQ, Docker'),
      '',
      chalk.gray(horizontalLine()),
      ''
    ];
    return output.join('\n');
  },

  experience: () => {
    const output = [
      '',
      chalk.green(centerText('WORK EXPERIENCE')),
      chalk.gray(horizontalLine()),
      '',
      chalk.yellow('🏢 Backend Developer | Example Company'),
      chalk.gray('   Jan 2023 - Present'),
      chalk.white('   • Developed and maintained RESTful APIs for client applications'),
      chalk.white('   • Optimized database queries, improving response times by 40%'),
      chalk.white('   • Implemented CI/CD pipelines for automated testing and deployment'),
      '',
      chalk.yellow('🏢 Junior Developer | Previous Company'),
      chalk.gray('   Jun 2021 - Dec 2022'),
      chalk.white('   • Built internal tools for data processing and analysis'),
      chalk.white('   • Collaborated with frontend team on API design'),
      chalk.white('   • Participated in code reviews and documentation'),
      '',
      chalk.gray(horizontalLine()),
      ''
    ];
    return output.join('\n');
  },

  education: () => {
    const output = [
      '',
      chalk.green(centerText('EDUCATION')),
      chalk.gray(horizontalLine()),
      '',
      chalk.yellow('🎓 Bachelor of Science in Computer Science'),
      chalk.white('   University Name, Graduated 2021'),
      chalk.white('   • GPA: 3.8/4.0'),
      chalk.white('   • Relevant coursework: Data Structures, Algorithms, Database Systems,'),
      chalk.white('     Operating Systems, Network Security'),
      '',
      chalk.yellow('📜 Certifications'),
      chalk.white('   • AWS Certified Developer - Associate'),
      chalk.white('   • MongoDB Certified Developer'),
      chalk.white('   • Docker Certified Associate'),
      '',
      chalk.gray(horizontalLine()),
      ''
    ];
    return output.join('\n');
  },

  contact: () => {
    const output = [
      '',
      chalk.green(centerText('CONTACT INFORMATION')),
      chalk.gray(horizontalLine()),
      '',
      chalk.yellow('📧 Email:    ') + chalk.white('your.email@example.com'),
      chalk.yellow('🔗 LinkedIn: ') + chalk.white('linkedin.com/in/your-profile'),
      chalk.yellow('🌐 Website:  ') + chalk.white('yourwebsite.com'),
      chalk.yellow('📝 Blog:     ') + chalk.white('yourblog.dev'),
      '',
      chalk.gray(horizontalLine()),
      chalk.gray(centerText('Feel free to reach out for collaboration or questions!')),
      ''
    ];
    return output.join('\n');
  },

  clear: () => {
    return '\x1Bc' + chalk.green('Terminal cleared. Type "help" to see available commands.');
  },

  default: (cmd) => {
    return [
      '',
      chalk.red(`Command not found: ${cmd}`),
      chalk.white('Type "help" to see available commands.'),
      ''
    ].join('\n');
  }
};

// Helper to create progress bars
function progressBar(percentage, length = 20) {
  const filled = Math.round(percentage * length / 100);
  const empty = length - filled;
  return chalk.green('█'.repeat(filled)) + chalk.gray('░'.repeat(empty));
}

// Process the command and generate output
function processCommand(cmd) {
  const normalizedCmd = cmd.toLowerCase().trim();
  
  // Create terminal output
  let output = '';
  
  // Add prompt with command
  output += getPrompt() + cmd + '\n';
  
  // Add command output
  if (commands[normalizedCmd]) {
    output += commands[normalizedCmd]();
  } else {
    output += commands.default(cmd);
  }
  
  return output;
}

// Write the output to a file for the SVG generator
const terminalOutput = processCommand(command);
fs.writeFileSync(outputFile, terminalOutput);

console.log(`Processed command: ${command}`);
console.log(`Output written to: ${outputFile}`);