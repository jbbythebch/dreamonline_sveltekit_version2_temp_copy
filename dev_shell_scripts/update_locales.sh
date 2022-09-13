#!/bin/bash

# IMPORTANT NOTES:
# This file should be run from its folder, as file paths are relative to 
# that location.

# This file DELETES ALL FILES in each locale folder, and then 
# updates the individual locales folders, including updating any custom locale 
# pages for specific locales

echo " "
echo "This shell script will delete ALL files in each locale, and then"
echo "replace them with files from '_templates-for-new-locales' and"
echo "then from '_custom_locale_pages'."
echo " "
echo "IMPORTANT:"
echo "Has all your work been committed?"
echo "Have you copied or moved ALL new or updated custom locale pages to the"
echo "'_custom_locale_pages' folder? " 
echo " "
read -p "Continue? (press y or Y to continue)" -n 1 -r
echo    # (optional) move to a new line
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
  exit 1
fi

# All locales should be included here:
all_locales=("ar" "en-us" "en" "es")

echo
echo "all_locales: ${all_locales[@]}"
echo

for locale in ${all_locales[@]}; do
  echo "processing locale:  $locale"
  echo "---------------------------"
  echo "deleting all files in the $locale locale folder..."
  read -n 1 -s -r -p "Press any key to continue"
  rm -rfv ../src/routes/"${locale}"/*
  echo
  echo "copying files from _templates-for-new-locales to the $locale folder..."
  read -n 1 -s -r -p "Press any key to continue"
  echo
  cp -Rfv ../src/routes/_templates-for-new-locales/* ../src/routes/"${locale}"/
  rm ../src/routes/"${locale}"/_page-protection-module-options.svelte
  echo
done
 
 echo "copying all custom locale pages..."
 read -n 1 -s -r -p "Press any key to continue"
 cp -Rfv "../src/routes/_custom-locale-pages/" "../src/routes/"

echo
echo "Updating locales completed."
echo
