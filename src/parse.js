import yaml from 'js-yaml';

export default (data, fileFormat) => {
  if (fileFormat === 'json') {
    return JSON.parse(data);
  }
  if (fileFormat === 'yaml' || fileFormat === 'yml') {
    return yaml.load(data);
  }
  throw new Error(`Unsupported file format: ${fileFormat}`);
};
