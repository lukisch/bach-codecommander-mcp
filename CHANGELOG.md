# Changelog

All notable changes to this project will be documented in this file.

## [1.3.2] - 2026-02-20

### Fixed
- Update CHANGELOG with 5 missing version entries (v1.1.0-v1.3.1)
- Fix server.json version mismatch
- Update SECURITY.md with missing tools

## [1.3.1] - 2026-02-17

### Changed
- Replace custom TOON parser/serializer with official `@toon-format/toon` package
- Proper TOON format: `key: value` syntax instead of custom `key = value`

## [1.3.0] - 2026-02-17

### Added
- `cc_diff_files` - Compare two files with unified diff output (LCS algorithm, configurable context lines)
- `cc_regex_test` - Test regex patterns against text/files with match details, groups, and replace preview
- Expand `cc_convert_format`: add YAML, TOML, XML, and TOON support (was JSON/CSV/INI only)
- Full i18n (DE/EN) for all new tools
- Total tools: 17

## [1.2.1] - 2026-02-17

### Added
- `mcpName` field in package.json for MCP Registry verification
- `server.json` for official MCP Registry publishing

## [1.2.0] - 2026-02-17

### Changed
- Rename `cc_md_to_pdf` to `cc_md_to_html` (was generating HTML, not PDF)

### Added
- `cc_md_to_pdf` - Real PDF generation via headless Edge/Chrome browser
- Cross-platform browser detection (Windows, macOS, Linux)
- Fallback to HTML output if no browser is available
- Total tools: 15

## [1.1.0] - 2026-02-15

### Added
- Complete internationalization (i18n) infrastructure with German (default) and English support
- New `cc_set_language` tool for runtime language switching
- `CC_LANGUAGE` environment variable for startup configuration
- ~170 translated strings (tool titles, descriptions, error messages)
- i18n test suite (43 tests)
- Language priority: `cc_set_language` > `CC_LANGUAGE` env > `"de"` default

## [1.0.1] - 2026-02-14

### Fixed
- `cc_md_to_pdf` completely rewritten: line-by-line parser instead of regex chain
- Added: nested lists, ordered lists, blockquotes, checkboxes, badge images, standalone images
- Added: bold+italic combo (`***text***`), proper `<thead>/<tbody>` tables
- Professional CSS: dark code blocks, colored headers, print-ready layout

## [1.0.0] - 2026-02-14

### Added
- Initial release with 14 developer-focused tools
- Code Analysis: `cc_analyze_code`, `cc_analyze_methods`, `cc_extract_classes`
- Import Management: `cc_organize_imports`, `cc_diagnose_imports`
- JSON Tools: `cc_fix_json`, `cc_validate_json`
- Encoding & Text: `cc_fix_encoding`, `cc_cleanup_file`, `cc_fix_umlauts`, `cc_scan_emoji`
- Format Conversion: `cc_convert_format`
- Documentation: `cc_generate_licenses`, `cc_md_to_pdf`
