(function () {
  const defaultView = document.getElementById("publication-default-view");
  const dynamicView = document.getElementById("publication-dynamic-view");
  const topicFilters = document.getElementById("publication-topic-filters");
  const controls = Array.from(document.querySelectorAll("[data-publication-view]"));

  if (!defaultView || !dynamicView || !topicFilters || controls.length === 0) return;

  const entries = Array.from(defaultView.querySelectorAll(".publication-entry")).map((entry, index) => ({
    element: entry,
    index,
    year: Number.parseInt(entry.dataset.year || "0", 10),
    topic: entry.dataset.topic || "other",
  }));

  const topics = Array.from(new Set(entries.map((entry) => entry.topic))).sort((a, b) => a.localeCompare(b));
  const selectedTopics = new Set(topics);

  function sortByYearThenOriginal(a, b) {
    return b.year - a.year || a.index - b.index;
  }

  function makeList(sortedEntries) {
    const ol = document.createElement("ol");
    ol.className = "bibliography publication-dynamic-list";
    sortedEntries.forEach((entry) => {
      const li = document.createElement("li");
      const clone = entry.element.cloneNode(true);
      clone.removeAttribute("id");
      li.appendChild(clone);
      ol.appendChild(li);
    });
    return ol;
  }

  function renderYearView() {
    dynamicView.innerHTML = "";
    dynamicView.appendChild(makeList([...entries].sort(sortByYearThenOriginal)));
  }

  function renderTopicView() {
    dynamicView.innerHTML = "";

    topics.forEach((topic) => {
      if (!selectedTopics.has(topic)) return;

      const topicEntries = entries.filter((entry) => entry.topic === topic).sort(sortByYearThenOriginal);
      if (topicEntries.length === 0) return;

      const heading = document.createElement("h2");
      heading.textContent = topic;
      dynamicView.appendChild(heading);
      dynamicView.appendChild(makeList(topicEntries));
    });
  }

  function setActiveView(view) {
    controls.forEach((control) => {
      control.classList.toggle("active", control.dataset.publicationView === view);
    });

    const isDefault = view === "default";
    defaultView.hidden = !isDefault;
    dynamicView.hidden = isDefault;
    topicFilters.hidden = view !== "topic";

    if (view === "year") renderYearView();
    if (view === "topic") renderTopicView();
  }

  function renderTopicFilters() {
    topicFilters.innerHTML = "";

    topics.forEach((topic) => {
      const label = document.createElement("label");
      label.className = "publication-topic-option";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = topic;
      checkbox.checked = true;
      checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
          selectedTopics.add(topic);
        } else {
          selectedTopics.delete(topic);
        }
        renderTopicView();
      });

      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(topic));
      topicFilters.appendChild(label);
    });
  }

  controls.forEach((control) => {
    control.addEventListener("click", () => setActiveView(control.dataset.publicationView));
  });

  renderTopicFilters();
})();
