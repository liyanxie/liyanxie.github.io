(() => {
  const initializeProfileToggle = () => {
    const profileImage = document.querySelector("[data-anime-src]");
    const toggleButton = document.querySelector("[data-home-anime-toggle]");

    if (!profileImage || !toggleButton) return;

    const animeLabel = toggleButton.dataset.animeLabel;
    const photoLabel = toggleButton.dataset.photoLabel;
    let showingAnime = false;
    let requestId = 0;

    const showPhoto = () => {
      requestId += 1;
      showingAnime = false;
      profileImage.src = profileImage.dataset.photoSrc;
      profileImage.alt = profileImage.dataset.photoAlt;
      toggleButton.textContent = animeLabel;
      toggleButton.setAttribute("aria-pressed", "false");
      toggleButton.removeAttribute("aria-busy");
      toggleButton.disabled = false;
    };

    const showAnime = () => {
      const currentRequestId = ++requestId;
      const animeImage = new Image();

      toggleButton.disabled = true;
      toggleButton.setAttribute("aria-busy", "true");

      animeImage.addEventListener("load", () => {
        if (currentRequestId !== requestId) return;

        showingAnime = true;
        profileImage.src = profileImage.dataset.animeSrc;
        profileImage.alt = profileImage.dataset.animeAlt;
        toggleButton.textContent = photoLabel;
        toggleButton.setAttribute("aria-pressed", "true");
        toggleButton.removeAttribute("aria-busy");
        toggleButton.disabled = false;
      });

      animeImage.addEventListener("error", () => {
        if (currentRequestId !== requestId) return;

        toggleButton.textContent = animeLabel;
        toggleButton.removeAttribute("aria-busy");
        toggleButton.disabled = false;
      });

      animeImage.src = profileImage.dataset.animeSrc;
    };

    toggleButton.addEventListener("click", () => {
      if (showingAnime) {
        showPhoto();
      } else {
        showAnime();
      }
    });

    window.addEventListener("pageshow", showPhoto);
    toggleButton.classList.add("is-ready");
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeProfileToggle);
  } else {
    initializeProfileToggle();
  }
})();
