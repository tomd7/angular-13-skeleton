const storageKey = 'user-preferences';
const media = '(prefers-color-scheme: dark)';

function getStoredPreferences() {
  const preferences = localStorage.getItem(storageKey);
  return preferences ? JSON.parse(preferences) : undefined;
}

function getColorPreference() {
  const storedPreferences = getStoredPreferences();

  if (storedPreferences && storedPreferences.theme) {
    return storedPreferences.theme.value;
  }

  return window.matchMedia(media).matches ? 'dark' : 'light';
}

function applyTheme(value) {
  document.documentElement
    .setAttribute('data-theme', value);
}

// Retrieve the stored theme
let theme = getColorPreference();

// Apply the theme
applyTheme(theme);

// Apply the theme on page load
window.addEventListener('load', () => applyTheme(theme));

// Apply the theme when system preferences change
window
  .matchMedia(media)
  .addEventListener('change', ({matches: isDark}) => {
    const storedPreferences = getStoredPreferences();

    // Don't apply the chang if the user has preferences
    if (storedPreferences && storedPreferences.theme) {
      return;
    }

    // Apply the change
    theme = isDark ? 'dark' : 'light';
    applyTheme(theme);
  });
