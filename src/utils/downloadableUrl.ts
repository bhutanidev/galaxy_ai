export default function transformCloudinaryURL(url: string): string {

    if (!url.includes("/upload/")) {
      return"";
    }
    return url.replace("/upload/", "/upload/fl_attachment/");
  }