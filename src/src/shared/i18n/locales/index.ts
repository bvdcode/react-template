// Vite прочитает все json’ы внутри ./locales
const modules = import.meta.glob("./locales/**/*.json", {
  eager: true,
}) as Record<string, { default: unknown }>;

type Resources = Record<string, Record<string, unknown>>;

const resources: Resources = {};

for (const path in modules) {
  // ./locales/en/common.json -> locale = en, ns = common
  const match = path.match(/\.\/locales\/([^/]+)\/([^/]+)\.json$/);
  if (!match) {
    continue;
  }

  const [, locale, namespace] = match;
  if (!resources[locale]) {
    resources[locale] = {};
  }

  resources[locale][namespace] = modules[path].default;
}

export { resources };
