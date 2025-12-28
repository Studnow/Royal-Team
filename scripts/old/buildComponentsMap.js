// Node.js скрипт для объединения компонентов - дополняет sectionsMap
// Этот скрипт автоматически генерирует файл componentsMap.js, который содержит все компоненты
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const componentsDir = path.resolve(__dirname, '../src/data/components');
const outputFile = path.resolve(__dirname, '../src/data/core/componentsMap.js');

// Получаем все .js файлы компонентов
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.js'));

const importStatements = [];
const mapEntries = [];

for (const file of files) {
  const name = path.basename(file, '.js');
  const varName = name.replace(/[-.]/g, '_'); // если в названии дефисы
  importStatements.push(`import ${varName} from '../components/${file}';`);
  mapEntries.push(`  "${name}": ${varName},`);
}

const output = `// 🚀 Автоматически сгенерировано скриптом buildComponentsMap.js

${importStatements.join('\n')}

export const componentsMap = {
${mapEntries.join('\n')}
};
`;

fs.writeFileSync(outputFile, output, 'utf8');
console.log(`✅ Сгенерирован файл: ${outputFile}`);
