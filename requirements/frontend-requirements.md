# Project overview
Use this guide to build a web app where users can give a text prompt to generate images using model hosted on Replicate. You will use 4 different models for 4 different images.

# Models
- SDXL Lightning: https://replicate.com/bytedance/sdxl-lightning-4step/
- Stability Diffusion: https://replicate.com/stability-ai/stable-diffusion
- Proteus: https://replicate.com/datacte/proteus-v0.2
- SDXL Emoji: https://replicate.com/fofr/sdxl-emoji

# Feature requirements
- We will use Next.js, Shadcn, Lucid
- Create a form where users can put in prompt, and clicking on button that calls the replicate model to generate image
- Have a nice UI & animation when the iamge is blank or generating
- Display all the images ever generated in grid
- When hovering on each image, an icon button for download, and an icon button for like should be shown up
- When clicking on the like button, the like count should be increased, and the button text should be toggled to "Unlike"
- The like count and the image grid should be persisted on refresh
- The user can only like an image once
- The user can generate an image once

# Rules
- EXTREMELY IMPORTANT: The UI must be slick and modern. Use shadcn for the UI. Use your best judgement on what looks modern.
- All new components should go in /components and be named like example-component.tsx unless otherwise specified
- All new pages go in /app
- Use shadcn for the UI
- Use Lucid for the animation
- Use Replicate for the model
- Use Next.js for the framework
- Use TypeScript for the language
- Use ESLint for the linter
- Use Prettier for the formatter

# Relevant docs:
## Model 1:
### Replicate model schema:
https://replicate.com/bytedance/sdxl-lightning-4step/api/schema

### Replicate model API:
# Token is stored in .env: REPLICATE_API_TOKEN
import Replicate from "replicate";
const replicate = new Replicate();

const input = {
    prompt: "self-portrait of a woman, lightning in the background"
};

const output = await replicate.run("bytedance/sdxl-lightning-4step:5f24084160c9089501c1b3545d9be3c27883ae2239b6f412990e82d4a6210f8f", { input });
console.log(output)

## Model 2:
### Replicate model schema:
https://replicate.com/stability-ai/stable-diffusion/api/schema

### Replicate model API:
# Token is stored in .env: REPLICATE_API_TOKEN
import Replicate from "replicate";
const replicate = new Replicate();

const input = {
    prompt: "an astronaut riding a horse on mars, hd, dramatic lighting",
    scheduler: "K_EULER"
};

const output = await replicate.run("stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4", { input });
console.log(output)

## Model 3:
### Replicate model schema:
https://replicate.com/datacte/proteus-v0.2/api/schema

### Replicate model API:
# Token is stored in .env: REPLICATE_API_TOKEN
import Replicate from "replicate";
const replicate = new Replicate();

const input = {
    prompt: "cinematic film still of Kodak Motion Picture Film: (Sharp Detailed Image) An Oscar winning movie for Best Cinematography a woman in a kimono standing on a subway train in Japan Kodak Motion Picture Film Style, shallow depth of field, vignette, highly detailed, high budget, bokeh, cinemascope, moody, epic, gorgeous, film grain, grainy"
};

const output = await replicate.run("datacte/proteus-v0.2:06775cd262843edbde5abab958abdbb65a0a6b58ca301c9fd78fa55c775fc019", { input });
console.log(output)

## Model 4:
### Replicate model schema:
https://replicate.com/fofr/sdxl-emoji/api/schema

### Replicate model API:
# Token is stored in .env: REPLICATE_API_TOKEN
import Replicate from "replicate";
const replicate = new Replicate();

const input = {
    prompt: "A TOK emoji of a man",
    apply_watermark: false
};

const output = await replicate.run("fofr/sdxl-emoji:dee76b5afde21b0f01ed7925f0665b7e879c50ee718c5f78a9d38e04d523cc5e", { input });
console.log(output)

# Design reference
Use this as a reference for the design:
![Design reference](./design/design.png)
Note that this design includes support for 4 images, but we will only build one model first.

# Current file structure
app
├── fonts
│   ├── GeistMonoVF.woff
│   ├── GeistVF.woff
├── favicon.ico
├── globals.css
├── layout.tsx
├── page.tsx
components
├── ui
node_modules
requirements
├── frontend-requirements.md
.eslintrc.json
.gitignore
bun.lockb
next-env.d.ts
next.config.mjs
package.json
postcss.config.mjs
README.md
tailwind.config.ts
tsconfig.json

