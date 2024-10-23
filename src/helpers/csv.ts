import fs from 'node:fs/promises';

function textToArray(text: string, separator = ';', initialLine = 0) {
  return text
    .split(separator)
    .slice(initialLine)
    .map((i) => i.trim())
    .filter(Boolean);
}

export async function readCSV(path: string, initialLine = 0) {
  const buffer = await fs.readFile(path);

  const content = buffer.toString('utf-8');

  const [keys, ...values] = textToArray(content, '\n', initialLine);

  return {
    keys: textToArray(keys),
    values: values.map((value) => textToArray(value)),
  };
}
