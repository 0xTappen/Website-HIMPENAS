export const imageAccept = "image/jpeg,image/png,image/webp,image/heic,image/heif,.heic,.heif";

const acceptedImageTypes = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
]);

export function isAcceptedImageFile(file: File) {
  return acceptedImageTypes.has(file.type) || /\.(heic|heif)$/i.test(file.name);
}

export const acceptedImageMessage = "Gunakan JPG, PNG, WebP, HEIC, atau HEIF";
