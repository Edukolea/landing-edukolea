import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import ts from "typescript";

// Exercise the real consent component with browser and React hook doubles.
const source = (await readFile("app/components/analytics-consent.tsx", "utf8"))
  .replace(/^import .*;\r?\n/gm, "").replace("export function", "function");
const compiled = ts.transpileModule(source, { compilerOptions: { jsx: ts.JsxEmit.React } }).outputText;
let states = [], cursor = 0, hydrated = true, blocked = false;
const storage = new Map();
const deleted = [];
globalThis.localStorage = {
  getItem: key => { if (blocked) throw Error("blocked"); return storage.get(key) ?? null; },
  setItem: (key, value) => { if (blocked) throw Error("blocked"); storage.set(key, value); },
};
globalThis.window = {};
globalThis.location = { hostname: "www.example.test" };
globalThis.document = {
  get cookie() { return "_ga=one; _ga_TEST=two; essential=keep"; },
  set cookie(value) { deleted.push(value); },
};
const React = { createElement: (type, props, ...children) => ({ type, props, children }) };
const GA = "GA";
const component = new Function("React", "useState", "useSyncExternalStore", "GoogleAnalytics", "styles",
  `${compiled}; return AnalyticsConsent;`)(React,
  initial => { const i = cursor++; if (!(i in states)) states[i] = initial; return [states[i], value => { states[i] = value; }]; },
  (_subscribe, read, server) => hydrated ? read() : server(), GA, {});
const render = (gaId = "G-919EY3HVWT") => { cursor = 0; return component({ gaId }); };
function nodes(tree) { return tree && typeof tree === "object" ? [tree, ...tree.children.flat(Infinity).flatMap(nodes)] : []; }
const tags = tree => nodes(tree).filter(node => node.type === GA);
const click = (tree, label) => nodes(tree).find(node => node.type === "button" && node.children.includes(label)).props.onClick();

hydrated = false;
assert.equal(render(), null, "SSR loads no analytics");
hydrated = true;
assert.equal(tags(render()).length, 0, "No analytics before consent");
click(render(), "Rechazar");
assert.equal(tags(render()).length, 0);
assert.equal(window["ga-disable-G-919EY3HVWT"], true);
click(render(), "Cookies analíticas");
click(render(), "Aceptar analítica");
assert.equal(tags(render()).length, 1, "Exactly one integration after acceptance");
assert.equal(window["ga-disable-G-919EY3HVWT"], false);
states = [];
assert.equal(tags(render()).length, 1, "Remember acceptance after remount");
click(render(), "Cookies analíticas");
click(render(), "Rechazar");
assert.equal(tags(render()).length, 0);
assert.ok(deleted.some(value => value.startsWith("_ga_TEST=")));
assert.ok(!deleted.some(value => value.startsWith("essential=")));
states = [];
assert.equal(tags(render()).length, 0, "Remember rejection");
blocked = true; states = [];
assert.equal(tags(render()).length, 0, "Blocked storage defaults to no analytics");
click(render(), "Aceptar analítica");
assert.equal(tags(render()).length, 1, "Consent works for this visit without storage");
assert.equal(render(""), null);
assert.equal(render("invalid"), null);
console.log("Analytics consent verified: SSR, opt-in, rejection, persistence, revocation, cookies, blocked storage and single integration.");
