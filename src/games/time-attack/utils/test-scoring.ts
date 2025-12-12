// Test scoring system
import { calculateScore } from './time-calculation';

export function testScoring() {
  const testCases = [
    // Perfect - exactly 10.00
    { time: 10.00, expected: '100' },
    { time: 10.0001, expected: '100' },
    { time: 9.9999, expected: '100' },
    
    // Critical points
    { time: 9.99, expected: '50' },
    { time: 10.01, expected: '50' },
    
    // Linear 1-9
    { time: 1.0, expected: '1' },
    { time: 2.0, expected: '2' },
    { time: 5.0, expected: '5' },
    { time: 8.0, expected: '8' },
    { time: 9.0, expected: '9' },
    
    // 9-9.99 range (linear 9→50)
    { time: 9.1, expected: '~13' },
    { time: 9.5, expected: '~30' },
    { time: 9.8, expected: '~42' },
    { time: 9.95, expected: '~48' },
    { time: 9.99, expected: '50' },
    
    // 9.99-10.00 range (linear 50→100)
    { time: 9.995, expected: '~75' },
    { time: 10.00, expected: '100' },
    
    // 10.00-10.01 range (linear 100→50)
    { time: 10.005, expected: '~75' },
    { time: 10.01, expected: '50' },
    
    // 10.01-10.10 range (linear 50→0)
    { time: 10.02, expected: '~44' },
    { time: 10.05, expected: '~28' },
    { time: 10.08, expected: '~11' },
    { time: 10.10, expected: '0' },
    
    // No points after 10.10
    { time: 10.11, expected: '0' },
    { time: 10.5, expected: '0' },
    { time: 11.0, expected: '0' },
    { time: 20.0, expected: '0' },
  ];
  
  console.log('=== SCORING SYSTEM TEST ===');
  console.log('🎯 10.00s = 100 points (PERFECT!)');
  console.log('⚡ 9.99s = 50 points');
  console.log('⚡ 10.01s = 50 points');
  console.log('❌ 10.10s+ = 0 points\n');
  
  testCases.forEach(({ time, expected }) => {
    const timeMs = time * 1000;
    const score = calculateScore(timeMs);
    const emoji = score === 100 ? '🎯' : score === 50 ? '⚡' : score >= 25 ? '✨' : score > 0 ? '✅' : '❌';
    console.log(`${emoji} ${time.toFixed(3)}s → ${score.toString().padStart(3)} points (expected: ${expected})`);
  });
  
  console.log('\n=== SCORING BREAKDOWN ===');
  console.log('• 0-1s: 1 point');
  console.log('• 1-9s: Linear (1pt per second)');
  console.log('• 9-9.99s: Linear 9→50 points');
  console.log('• 9.99-10.00s: Linear 50→100 points');
  console.log('• 10.00s: 100 POINTS 🎯');
  console.log('• 10.00-10.01s: Linear 100→50 points');
  console.log('• 10.01-10.10s: Linear 50→0 points');
  console.log('• 10.10s+: 0 POINTS ❌');
}

// Run test
testScoring();
