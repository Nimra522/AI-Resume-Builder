/**
 * Test script for name validation
 */

import { validateName } from './validation.js';

console.log('Testing name validation...\n');

// Test cases
const testCases = [
  // Valid names
  { input: 'John', expected: true, description: 'Single name' },
  { input: 'John Doe', expected: true, description: 'Two names with space' },
  { input: 'John Smith Jr', expected: true, description: 'Three names with spaces' },
  { input: 'Mary-Jane Watson', expected: false, description: 'Contains hyphen (invalid)' },
  { input: 'O\'Connor', expected: false, description: 'Contains apostrophe (invalid)' },
  { input: 'John123', expected: false, description: 'Contains numbers (invalid)' },
  { input: 'John@Doe', expected: false, description: 'Contains special character (invalid)' },
  { input: ' J', expected: false, description: 'Starts with space (invalid)' },
  { input: 'J ', expected: false, description: 'Ends with space (invalid)' },
  { input: 'J', expected: false, description: 'Too short (1 char)' },
  { input: '', expected: false, description: 'Empty string' },
  { input: 'A'.repeat(51), expected: false, description: 'Too long (51 chars)' },
  { input: 'A'.repeat(50), expected: true, description: 'Maximum length (50 chars)' },
  { input: 'A B'.repeat(17), expected: false, description: 'Too long with spaces' },
];

let passedTests = 0;
let totalTests = testCases.length;

testCases.forEach((testCase, index) => {
  const result = validateName(testCase.input);
  const passed = result.isValid === testCase.expected;
  
  console.log(`Test ${index + 1}: ${testCase.description}`);
  console.log(`  Input: "${testCase.input}"`);
  console.log(`  Expected: ${testCase.expected}, Got: ${result.isValid}`);
  console.log(`  Message: ${result.errorMessage || 'Valid'}`);
  console.log(`  Status: ${passed ? '✅ PASS' : '❌ FAIL'}\n`);
  
  if (passed) passedTests++;
});

console.log(`\nResults: ${passedTests}/${totalTests} tests passed`);

if (passedTests === totalTests) {
  console.log('🎉 All tests passed!');
} else {
  console.log('❌ Some tests failed.');
  process.exit(1);
}