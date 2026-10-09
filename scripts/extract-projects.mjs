import fs from "fs";

const experiencePath = "src/lib/experience.js";
const markupPath = "src/content/markup.ts";
let src = fs.readFileSync(experiencePath, "utf8");

const start = src.indexOf("var projects=");
const datesAt = src.indexOf("var postDates=");
const featuredAt = src.indexOf("var featuredOrder=");
const forEachAt = src.indexOf("projects.forEach(function(p,i){p.date=");
const sortAt = src.indexOf("projects.sort(function");
if ([start, datesAt, featuredAt, forEachAt, sortAt].some((n) => n < 0)) {
  throw new Error("Could not find project data markers");
}

const projects = JSON.parse(src.slice(start + "var projects=".length, datesAt).trim().replace(/;$/, ""));
const postDates = JSON.parse(src.slice(datesAt + "var postDates=".length, featuredAt).trim().replace(/;$/, ""));
const featuredOrder = JSON.parse(
  src.slice(featuredAt + "var featuredOrder=".length, forEachAt).trim().replace(/;$/, "")
);

projects.forEach((project, index) => {
  project.id = "p" + String(index + 1).padStart(2, "0");
  project.date = postDates[index];
  project.featured = featuredOrder[project.n] || 0;
  project.l = project.l || "";
  project.u = project.u || "";
  project.s = project.s || [];
  project.imgs = project.imgs || [];
});

fs.mkdirSync("src/data", { recursive: true });
fs.writeFileSync("src/data/projects.json", JSON.stringify(projects, null, 2) + "\n");

const replacement = `var projects=(window.__PORTFOLIO_PROJECTS||[]).map(function(p){return {id:p.id,n:p.n,c:p.c,t:p.t,l:p.l||"",d:p.d||"",s:Array.isArray(p.s)?p.s:[],u:p.u||"",tone:p.tone||"#9b6cff",imgs:Array.isArray(p.imgs)?p.imgs:[],cover:p.cover||(p.imgs&&p.imgs[0])||"",date:p.date||"2024-01-01",featured:Number(p.featured)||0};});
      `;
src = src.slice(0, start) + replacement + src.slice(sortAt);
if (!src.includes("function syncProjectCounts()")) {
  src = src.replace(
    "function formatDate(value)",
    `function syncProjectCounts(){var n=String(projects.length);var walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);var nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);nodes.forEach(function(node){if(!node.nodeValue||!/\\b45\\b/.test(node.nodeValue))return;var context=node.parentElement?node.parentElement.textContent:"";if(node.nodeValue.trim()!=="45"&&!/project|\\bAll\\b/i.test(context))return;if(/years|20\\d{2}/i.test(context))return;node.nodeValue=node.nodeValue.replace(/\\b45\\b/g,n);});}
      function formatDate(value)`
  );
  src = src.replace(
    "return b.date.localeCompare(a.date)});",
    "return b.date.localeCompare(a.date)});\n      syncProjectCounts();"
  );
}
fs.writeFileSync(experiencePath, src);

let markup = fs.readFileSync(markupPath, "utf8");
const needle = 'data-filter=\\"web\\">Web</button>';
const insert =
  'data-filter=\\"web\\">Web</button><button class=\\"filter\\" data-filter=\\"wp\\">WordPress</button>';
if (!markup.includes('data-filter=\\"wp\\"')) {
  if (!markup.includes(needle)) throw new Error("filter button not found");
  markup = markup.replace(needle, insert);
  fs.writeFileSync(markupPath, markup);
}

console.log("projects", projects.length);
