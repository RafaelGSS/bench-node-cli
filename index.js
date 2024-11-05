#!/usr/bin/env -S node --allow-natives-syntax
require('module-alias/register')

const path = require('path')

require('module-alias')
  .addAlias('bench-node', path.join(__dirname, '..', 'bench-node', 'lib'))

const { existsSync } = require('fs');

// Get the benchmark file from command line arguments
const benchmarkFile = process.argv[2];

if (!benchmarkFile) {
  console.error('Please provide a benchmark file as an argument.');
  process.exit(1);
}

// Resolve the file path
const filePath = path.resolve(process.cwd(), benchmarkFile);

// Check if the file exists
if (!existsSync(filePath)) {
  console.error(`Benchmark file not found: ${filePath}`);
  process.exit(1);
}

async function main() {
  try {
    if (require) {
      require(filePath);
    } else {
      await import(filePath);
    }
  } catch (error) {
    console.error('Error running the benchmark:', error);
    process.exit(1);
  }
}

main()
