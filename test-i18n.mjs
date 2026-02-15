#!/usr/bin/env node
/**
 * i18n Test for BACH CodeCommander MCP Server
 * Tests: default language, setLanguage(), getLanguage(), t() translations
 */

import { t, setLanguage, getLanguage } from './dist/i18n/index.js';

let passed = 0;
let failed = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`  ✅ ${testName}`);
    passed++;
  } else {
    console.log(`  ❌ ${testName}`);
    failed++;
  }
}

console.log('🧪 CodeCommander i18n Tests\n');

// === Test 1: Default language ===
console.log('--- Default Language ---');
assert(getLanguage() === 'de', 'Default language is "de"');

// === Test 2: German translations (t() returns correct strings) ===
console.log('\n--- German Translations ---');
const deT = t();
assert(typeof deT.common.fileNotFound === 'function', 'common.fileNotFound is a function');
assert(deT.common.fileNotFound('/test').includes('Datei nicht gefunden'), 'common.fileNotFound returns German text');
assert(deT.common.error('test').includes('Fehler'), 'common.error returns German text');
assert(deT.cc_analyze_code.metricTotalLines === 'Zeilen gesamt', 'cc_analyze_code.metricTotalLines is German');
assert(deT.cc_analyze_code.metricClasses === 'Klassen', 'cc_analyze_code.metricClasses is German');
assert(deT.cc_analyze_code.metricFunctions === 'Funktionen', 'cc_analyze_code.metricFunctions is German');
assert(deT.cc_fix_json.fixTrailingCommas.length > 0, 'cc_fix_json.fixTrailingCommas exists');
assert(typeof deT.cc_analyze_code.header === 'function', 'cc_analyze_code.header is a template function');
assert(deT.cc_analyze_code.header('test.py').includes('test.py'), 'cc_analyze_code.header includes filename');

// === Test 3: Switch to English ===
console.log('\n--- Switch to English ---');
setLanguage('en');
assert(getLanguage() === 'en', 'Language switched to "en"');

const enT = t();
assert(enT.common.fileNotFound('/test').includes('File not found'), 'common.fileNotFound returns English text');
assert(enT.common.error('test').includes('Error'), 'common.error returns English text');
assert(enT.cc_analyze_code.metricTotalLines === 'Total lines', 'cc_analyze_code.metricTotalLines is English');
assert(enT.cc_analyze_code.metricClasses === 'Classes', 'cc_analyze_code.metricClasses is English');
assert(enT.cc_analyze_code.metricFunctions === 'Functions', 'cc_analyze_code.metricFunctions is English');
assert(enT.cc_analyze_code.header('test.py').includes('test.py'), 'cc_analyze_code.header includes filename in EN');

// === Test 4: Switch back to German ===
console.log('\n--- Switch back to German ---');
setLanguage('de');
assert(getLanguage() === 'de', 'Language switched back to "de"');
assert(t().cc_analyze_code.metricTotalLines === 'Zeilen gesamt', 'After switch-back, German text returned');

// === Test 5: All tool sections exist ===
console.log('\n--- All Tool Sections Exist ---');
const sections = [
  'common', 'cc_analyze_code', 'cc_analyze_methods', 'cc_extract_classes',
  'cc_organize_imports', 'cc_diagnose_imports', 'cc_fix_json', 'cc_validate_json',
  'cc_fix_encoding', 'cc_cleanup_file', 'cc_convert_format', 'cc_fix_umlauts',
  'cc_scan_emoji', 'cc_generate_licenses', 'cc_md_to_pdf', 'cc_set_language'
];
for (const section of sections) {
  assert(t()[section] !== undefined, `Section "${section}" exists`);
}

// === Test 6: Template functions return strings with parameters ===
console.log('\n--- Template Functions ---');
setLanguage('de');
assert(t().cc_fix_json.validJson('test.json').includes('test.json'), 'cc_fix_json.validJson includes filename');
assert(t().cc_validate_json.typeArray(5).includes('5'), 'cc_validate_json.typeArray includes count');
assert(t().cc_scan_emoji.noEmojis(10).includes('10'), 'cc_scan_emoji.noEmojis includes count');
assert(t().cc_set_language.languageSet('en').includes('en'), 'cc_set_language.languageSet includes lang');

setLanguage('en');
assert(t().cc_fix_json.validJson('test.json').includes('test.json'), 'EN: cc_fix_json.validJson includes filename');
assert(t().cc_validate_json.typeArray(5).includes('5'), 'EN: cc_validate_json.typeArray includes count');

// === Test 7: DE and EN return different strings ===
console.log('\n--- DE vs EN differ ---');
setLanguage('de');
const deStr = t().cc_analyze_code.metricTotalLines;
setLanguage('en');
const enStr = t().cc_analyze_code.metricTotalLines;
assert(deStr !== enStr, `DE "${deStr}" != EN "${enStr}"`);

setLanguage('de');
const deErr = t().common.fileNotFound('/x');
setLanguage('en');
const enErr = t().common.fileNotFound('/x');
assert(deErr !== enErr, 'DE and EN error messages differ');

// === Summary ===
console.log(`\n${'='.repeat(40)}`);
console.log(`Results: ${passed} passed, ${failed} failed, ${passed + failed} total`);
if (failed > 0) {
  console.log('❌ SOME TESTS FAILED');
  process.exit(1);
} else {
  console.log('✅ ALL TESTS PASSED');
  process.exit(0);
}
