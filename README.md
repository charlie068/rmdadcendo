# rmdadcendo

Custom HTML output format and template for ADCT R Markdown reports.

This R package provides the `adcendobook` template for creating clean, professional HTML reports for the company with automatic table of contents, custom styling, and branding.

## Installation

```r
# Install from local source
install.packages("rmdadcendo_0.1.0.tar.gz", repos = NULL, type = "source")
```

## Usage

Create a new R Markdown document and use the `adcendobook` template:

```yaml
---
title: "Your Report Title"
author: "Your Name"
date: "`r Sys.Date()`"
output:
  rmdadcendo::adcendobook:
    code_folding: hide
    toc_depth: 3
---
```

## Features

- Clean, professional design with ADCENDO branding
- Automatic table of contents with floating navigation
- Code folding capabilities
- Responsive design
- Embedded fonts for offline viewing
- Support for lightbox image galleries

## Template Options

- `fig_width`, `fig_height`: Figure dimensions
- `fig_caption`: Enable/disable figure captions
- `code_folding`: Code folding ("hide", "show", or "none")
- `toc_depth`: Table of contents depth (1-6)
- `lightbox`: Enable lightbox for images
- `thumbnails`: Display images as thumbnails
- `embed_fonts`: Use embedded fonts (default: TRUE)

## Author

Jean-Charles Isner (charlie068@gmail.com)

## License


GPL (>= 2)
