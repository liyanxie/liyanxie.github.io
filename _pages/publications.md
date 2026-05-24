---
layout: page
permalink: /publications/
title: publications
nav: true
nav_order: 2
---

<div class="publication-controls" aria-label="Publication view controls">
  <button type="button" class="publication-control active" data-publication-view="default">default</button>
  <button type="button" class="publication-control" data-publication-view="year">sort by year</button>
  <button type="button" class="publication-control" data-publication-view="topic">sort by topic</button>
</div>

<div id="publication-topic-filters" class="publication-topic-filters" hidden></div>

<!--
  Publication data lives in _bibliography/papers.bib.
  Default view follows the old jemdoc order: preprints, journal papers, conference papers.
  For future year/topic views, reuse the category and topic fields in the BibTeX entries.
-->

<div id="publication-default-view">
  <h2>Preprints</h2>

  <div class="publications">
  {% bibliography --group_by none --query @*[category=preprint]* %}
  </div>

  <h2>Journal Papers</h2>

  <div class="publications">
  {% bibliography --group_by none --query @*[category=journal]* %}
  </div>

  <h2>Conference Papers</h2>

  <div class="publications">
  {% bibliography --group_by none --query @*[category=conference]* %}
  </div>

  <h2>Thesis</h2>

  <div class="publications">
  {% bibliography --group_by none --query @*[category=thesis]* %}
  </div>
</div>

<div id="publication-dynamic-view" class="publication-dynamic-view" hidden></div>

<script src="{{ '/assets/js/publications.js' | relative_url | bust_file_cache }}"></script>
