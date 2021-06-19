import translations from './zh.js';

export default function customTranslate(template, replacements) {
  replacements = replacements || {};
  template = (localStorage.getItem('lang') === 'zh' ? translations[template] : template) || '';
  // Replace
  return template.replace(/{([^}]+)}/g, function(_, key) {
    return replacements[key] || '{' + key + '}';
  });
}