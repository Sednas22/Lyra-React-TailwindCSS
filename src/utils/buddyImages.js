const modules = import.meta.glob(
  "../assets/personalizacao/*.png",
  { eager: true }
);

const IMAGE_MAP = {};
for (const [path, mod] of Object.entries(modules)) {
  const filename = path.split("/").pop().replace(".png", "");
  IMAGE_MAP[filename] = mod.default;
}

const FALLBACK = IMAGE_MAP["buddy"];

export function getBuddyImg(imageName) {
  return IMAGE_MAP[imageName] ?? FALLBACK;
}

export { IMAGE_MAP };
