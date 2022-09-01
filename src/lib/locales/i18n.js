import { locale, register, init, getLocaleFromNavigator } from 'svelte-i18n';
import { get, derived } from 'svelte/store';
import localesSettings from '$lib/locales/locales-settings.json';
import { goto } from '$app/navigation';

function getFallbackLocaleForApp() {
  //let fallbackLocaleForApp = 'ar';
  //let fallbackLocaleForApp = 'es';
  let fallbackLocaleForApp = 'en';
  return fallbackLocaleForApp;
}

const isLocaleLoaded = derived(locale, $locale => typeof $locale === 'string');

function setUpI18n() {
  registerDictionaries();

  init({
    fallbackLocale: getFallbackLocaleForApp(),
    initialLocale: getCurrentLocale()
  });
};

function registerDictionaries() {
  // IMPORTANT NOTE: always register a base language, like 'en', before 
  // registering a 'fully qualified' locale, like 'en-US', since the design is
  // such that it will select 'en' if 'en-US' is not available, but will _not_
  // select 'en-US' if 'en' is not available
  register('en', () => import('$lib/locales/dictionaries/en.json'));
  //register('en-US', () => import('$lib/locales/dictionaries/en-us.json'));
  register('es', () => import('$lib/locales/dictionaries/es.json'));
  register('ar', () => import('$lib/locales/dictionaries/ar.json'));
}

function getCurrentLocale() {
  let storedLocale;
  if (storedLocale = getStoredLocale()) {
    return storedLocale;
  }
  // let localeFromNavigator;
  const localeFromNavigator = getLocaleFromNavigator();
  return localeFromNavigator;
}

function getStoredLocale() {
  let storedLocale;
  if (
    typeof localStorage !== 'undefined' &&
    (storedLocale = localStorage.getItem('locale')) &&
    (localesSettings.hasOwnProperty(storedLocale)) 
  ) {
    return storedLocale; 
  } else {
    return null;
  }
}

function setLocaleSettings(currentLocale) {
  let storedLocale;

  const currentPathname = window.location.pathname;

  if (storedLocale = getStoredLocale()) {
    currentLocale = storedLocale;
  } else {
    currentLocale = useValidLocale(currentLocale, currentPathname);
  }
  setDocumentDirection(currentLocale);
  const newBase = setBaseURL(currentLocale);
  if (currentPathname == '/') {
    goto(newBase);
  } else {
    goto(currentPathname)
  } 
}

function useValidLocale(currentLocale, currentPathname) {
  let localeBase;
  let localeFromPathname;

  if (localesSettings.hasOwnProperty(currentLocale)) {
    locale.set(currentLocale);
  } else if (localeBase = useLocaleBaseAsLocale(currentLocale)) {
    currentLocale = setCurrentLocale(localeBase);
  } else {
    localeFromPathname = getLocaleFromPathname(currentPathname) 
    currentLocale = setCurrentLocale(localeFromPathname);
  }
  return currentLocale
}

function setCurrentLocale(currentLocale) {
  if (localesSettings.hasOwnProperty(currentLocale)) {
    locale.set(currentLocale);
    return currentLocale;
  } else {
    let fallbackLocaleForApp = getFallbackLocaleForApp();
    locale.set(fallbackLocaleForApp);
    return fallbackLocaleForApp;
  }
}

function useLocaleBaseAsLocale(currentLocale) {
  let localeBase = currentLocale.replace("_", "-").split("-")[0];
  if (localesSettings.hasOwnProperty(localeBase)) {
    return localeBase;
  } else {
    return null;
  }
}

function setBaseURL(currentLocale) {
  let newBase;
  newBase = "/" + currentLocale + "/"
  document.getElementById("localeBase").href = newBase
  return newBase;
}

function getLocaleFromPathname(currentPathname) {
  let isLocaleAvailableFromPathname;
  let localeAvailableFromPathname;
  let possibleLocaleBase;
  // get the characters in the path from the first '/' thru the 2nd '/'
  let regex = /^\/[a-z'-]+\//;
  let possibleLocale = currentPathname.toLowerCase().match(regex)
  if (possibleLocale == null) {
    return null;
  } else {
    // remove the '/' characters
    possibleLocale = possibleLocale[0].replace(/\//g, '')
    // see if the first part of the pathname matches an available locale
    isLocaleAvailableFromPathname = localesSettings.hasOwnProperty(possibleLocale);
  }
  if (isLocaleAvailableFromPathname == true) {
    return possibleLocale;
  } else if (possibleLocaleBase = useLocaleBaseAsLocale(possibleLocale)){
    return possibleLocaleBase;
  } else {
    return null;
  }
}

function setDocumentDirection(currentLocale) {
  const direction = localesSettings[currentLocale]["direction"];
  setBulmaStyleSheet(direction);
  document.body.setAttribute('dir', direction);
}

function setBulmaStyleSheet(direction) {
  let styleSheetLink;
  if (direction == 'rtl') {
    styleSheetLink = '/css/bulma-rtl.min.css';
  } else {
    styleSheetLink = '/css/bulma.min.css';
  }
  document.getElementById("bulmaCssLink").href = 
    styleSheetLink;
}

export {
  setUpI18n,
  setLocaleSettings,
  isLocaleLoaded,
  localesSettings,
  getStoredLocale,
  setBaseURL
};
