#Задачи по доработке бойлерплейта

[+] При билде не появляется combinedData.json, потому что emptyOutDir: true. Файл генерируется раньше, чем очищается папка dist, соответственно он тоже удаляется. Временно - генерировать в assets, а потом перемещать в dist. Починить, чтобы сразу попадал в dist.

<!-- 1. Адаптировать компонент рейтинга для статики и WordPress в компоненте dForm
2. Сделать рефакторинг компонента testimonial-dForm

- убрать обработку отправки и весь лишний php
- Адаптировать это к dForm
- -->

1. Сделать dForm универсальным компонентом для форм.

# В последнем коммите:

- вынес функции в отдельные файлы
- 

## Изменены

- modified:   configure/admin.php
- modified:   configure/cpt-taxonomy.php
- modified:   configure/shortcodes.php
- modified:   configure/utilities.php
- modified:   draft.md
- modified:   functions.php
- modified:   header.php
- modified:   index.php
- modified:   page-drawer.php
- modified:   src/data/dataConfig/pageConfig.js
- modified:   src/data/sections/form.js
- modified:   src/data/sections/section.js
- modified:   tailwind.config.cjs
- modified:   template-parts/components/complex/dForm.php
- modified:   template-parts/components/simple/dropdown.php
- modified:   template-parts/components/simple/logo.php
- modified:   template-parts/components/simple/section-title.php
- modified:   template-parts/sections/form.php
- modified:   template-parts/sections/testimonials.php
- modified:   vite.config.js

## Добавлены:

- new file:   configure/functions/image-utils.php
- new file:   configure/functions/menu-walker.php
- new file:   configure/functions/render.php
- new file:   configure/functions/svg-utils.php
- new file:   configure/functions/testimonials.php
- new file:   template-parts/components/complex/testimonial-form.php
- new file:   template-parts/components/simple/cf7-form.php
