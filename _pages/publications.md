---
layout: page
permalink: /publications/
title: publications
description: publications and preprints.
nav: true
nav_order: 2
---

Here is my [Google Scholar](https://scholar.google.com/citations?user=KtLwkBYAAAAJ&hl=en) profile.

<!--
  Publication data lives in _bibliography/papers.bib.
  Default view follows the old jemdoc order: preprints, journal papers, conference papers.
  For future year/topic views, reuse the category and topic fields in the BibTeX entries.
-->

## Preprints

<div class="publications">
{% bibliography --group_by none --query @*[category=preprint]* %}
</div>

## Journal Papers

<div class="publications">
{% bibliography --group_by none --query @*[category=journal]* %}
</div>

## Conference Papers

<div class="publications">
{% bibliography --group_by none --query @*[category=conference]* %}
</div>

## Thesis

<div class="publications">
{% bibliography --group_by none --query @*[category=thesis]* %}
</div>
