# 🖼️ Download Steam Achievements (Image Extractor)

This is a command-line application that automatically extracts **achievement images** from public Steam profile pages. It’s ideal for users who want to download and store achievement icons locally for visual archives, dashboards, or personal collections.

---

## ✨ Features

- 🔍 Accesses public Steam achievement pages
- 🖼️ Extracts achievement icons (`.achieveRow` elements)
- 📁 Automatically saves images into local folders
- 📦 Can be bundled as a `.exe` file using `pkg`
- ⚙️ Built https native node module and Cheerio for lightweight scraping
- 🧑‍💻 Runs directly in the command prompt

---

## ⚙️ Technologies Used

| Tech             | Description                     |
|------------------|---------------------------------|
| Node.js          | JavaScript runtime environment  |
| TypeScript       | Optional for type safety        |
| Cheerio          | Server-side HTML parser (jQuery style) |
| pkg              | For packaging the app as `.exe` |

---

## 📌 Notes

- This tool **only extracts achievement images** from the page.
- It does **not** fetch descriptions, titles, or achievement status.

---

## 🧑‍💻 How to Use (Command Line)

If you're running the raw Node.js project:
```bash
npm index.js
yarn start
pnpm index.js
```

Packaging executables (macOS and Windows)

You can package this project as a native executable for macOS and Windows. The packaging flow we use does not change the application logic — the packaged binary behaves like `pnpm start`. The difference is that generated files (images and logs) will be created next to the executable itself.

Quick local steps:

```bash
pnpm install
pnpm run build     # transpile TypeScript -> dist/
pnpm run bundle    # bundle with ncc -> dist-bundle/
pnpm run pkg:mac   # build macOS binaries into build/
pnpm run pkg:win   # build Windows .exe into build/
```

When you run the packaged binary (for example `./build/download-steam-achievements-macos-x64`), the `img/` folder and the `log/log.txt` file will be created next to the executable (e.g. `build/img/...`).

Quick test after packaging (macOS):

```bash
./build/download-steam-achievements-macos-x64
# answer the prompt with a URL and the program will download images to build/img/<GameName>/...
```

CI / automatic builds

You can automate building these binaries using GitHub Actions. I can add a workflow that builds and uploads artifacts automatically if you want.
