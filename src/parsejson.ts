import Image from "./model/Image";
function parseImagesFromJson(images: string): {
  data: Map<String, Image[]>;
  pages: number;
} {
  const imagesJson = JSON.parse(images);
  const data = new Map<String, Image[]>();
  let pages = 0;

  for (let key in imagesJson) {
    pages++;
    let arr = [] as Image[];
    for (let im in imagesJson[key]) {
      const imJson = imagesJson[key][im];
      arr.push({
        orig: imJson["orig"],
        lg: imJson["lg"],
        md: imJson["md"],
        sm: imJson["sm"],
        th: imJson["th"],
      } as Image);
    }
    data.set(key, arr);
  }
  return { data, pages };
}

export default parseImagesFromJson;
