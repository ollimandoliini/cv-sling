import fs from "fs/promises";
import puppeteer from "puppeteer";
import http from "http";
import { renderToString } from "react-dom/server";
import CVPage from "./layout";
import { Profile } from "./types";
import { isRight } from "fp-ts/lib/Either";
import { PathReporter } from "io-ts/PathReporter";
import * as t from "io-ts";
import { command, run, positional, optional, string } from "cmd-ts";
import { File } from "cmd-ts/batteries/fs";

const generateCV = async (
  profilePath: string,
  picPath?: string,
  outputPath?: string
): Promise<void> => {
  const profile = await readProfile(profilePath);
  const styles = await fs
    .readFile("./src/styles.css")
    .then((x) => x.toString("utf-8"));
  const pic = picPath
    ? await fs.readFile(picPath).then((x) => x.toString("base64"))
    : null;

  const html = renderToString(
    CVPage({ profile: profile, picB64: pic, styles: styles })
  );

  const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.write(html);
    res.end();
  });

  server.listen(80);

  const browser = await puppeteer.launch({});
  try {
    const pdfPath =
      outputPath || `./${profile.name.toLowerCase().replace(" ", "-")}.pdf`;

    const page = await browser.newPage();
    await page.goto("http://localhost:80/");
    await page.pdf({
      path: pdfPath,
      margin: { top: "100px", right: "50px", bottom: "100px", left: "50px" },
      printBackground: true,
      format: "A4",
    });
  } finally {
    await browser.close();
    server.close();
  }
};

const readProfile = async (
  filePath: string
): Promise<t.TypeOf<typeof Profile>> => {
  const profile = await fs
    .readFile(filePath)
    .then((x) => JSON.parse(x.toString()))
    .then(Profile.decode);

  if (isRight(profile)) {
    return profile.right;
  } else {
    throw Error(
      `Could not validate data: ${PathReporter.report(profile).join("\n")}`
    );
  }
};

const cmd = command({
  name: "cv-sling",
  version: "1.0.0",
  args: {
    profile: positional({
      type: File,
      displayName: "profile",
      description: "Path to profile json file",
    }),
    pic: positional({
      type: optional(File),
      displayName: "pic",
      description: "Path to a profile picture file",
    }),
    output: positional({
      type: optional(string),
      displayName: "output",
      description: "PDF output path",
    }),
  },
  handler: (args) => {
    generateCV(args.profile, args.pic, args.output);
  },
});

run(cmd, process.argv.slice(2));
