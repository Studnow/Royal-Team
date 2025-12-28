# Steps to make html from figma

1. Make github repo from template
2. clone repo to folder + npm i
3. make .env for figma fetch
4. fetch figma data
  - figma link to .env
  - page name to SEED_PAGES in keys.js
  - delete old figmaFrames.js (настроить чтобы его не было при создании нового репо или просто удалить после тестов)
  - run node scripts/figmaFrames.js
  - run node scripts/figma.js
5. make data structure
6. sorting images and icons
  - on/off preview section in src/config/pagesConfig/homePage and other pages
7. adding images and icons to data structure
8. Make sections structure
9. adding data to sections and layouts
10. adopting styles for figma mockup