import parseImagesFromJson from "./parsejson";
import pondyImages from "./json/pondy.json";

const pondy = parseImagesFromJson(JSON.stringify(pondyImages));
export default pondy;
