# Internationalizaion

## Adding a New Locale

Steps for adding a new locale (<my-new-locale>):
- Add the new locale to the API (see the API for details).
- Add the new locale folder as `/src/routes/<my-new-locale>`.
- Add the new locale folder name as a destination for updating files in the shell script file `/dev_shell_scripts/update_locales.sh`; by adding it to the array '# All locales should be included here:'.
- From inside the `/dev_shell_scripts/` folder, run `update_locales.sh` (run: `./update_locales.sh` so bash finds it in the current directory).

- If any locale-specific customization is needed for any pages in <my-new-locale>:
  - Add the new locale folder as `/src/routes/_custom-locale-pages/<my-new-locale>`.
  - A customized page for a locale can be created by copying any page from `src/routes/_all-locales/` to the '/src/routes/<my-new-locale>/' folder.
  - Once the customization is complete, **make sure to copy the customized file** to the `/src/routes/_custom-locale-pages/<my-new-locale/` folder, **otherwise the changes will be lost when running the 'update_locales.sh` script**, as noted above.

- Add a new dictionary file as '/src/lib/locales/dictionaries/<my-new-locale>.json'


## Making Global Changes to Locale Files

Steps for making global changes to locale files:
- Change any or all files in `/src/routes/_templates-for-new-locales`.
- Change any or all files in `/src/routes/_custom-locale-pages`.
- From inside the `/dev_shell_scripts/` folder, run `update_locales.sh` (run: `./update_locales.sh` so bash finds it in the current directory).


## Page Protection (Only Allowing Authenticated Users to View a Page)

The files in `src/routes/_templates_for_new_locales/` are a clean copy of files to be used in any new locale.

All these files do is:
- import a component with the matching filename from `src/routes/_all-locales`.
- for a protected page, ensure the user is authenticated

See the file `src/routes/_templates_for_new_locales/_page-protection-module-options.svelte`, for 2 options for adding page protection to any page.  One option is just for page protection, and the other allows for adding other functions to run when the 'load' function is called, in addition to providing page protection.
