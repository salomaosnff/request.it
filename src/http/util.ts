import pick from "lodash.pick";

export function getString(template:string, vars: Record<string, any> = {}) {
    return template.replace(/\{\{(\s*.+?\s*)\}\}/, (_, name) => {
        const value = pick(vars, name.trim());
        return value === undefined ? name : value;
    });
}