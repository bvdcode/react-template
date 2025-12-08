import type { Resource, ResourceKey } from "i18next";

const modules = import.meta.glob("./locales/**/*.json", {
  eager: true,
}) as Record<string, { default: ResourceKey }>;

const resources: Resource = {};

for (const path in modules) {
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
