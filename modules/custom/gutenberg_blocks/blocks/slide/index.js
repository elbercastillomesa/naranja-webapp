import metadata from "./block.json";
import Edit from "./edit";
import Save from "./save";
import IconSlide from "./icon";
import "./style.scss";
// import deprecated from "./deprecated";

const Slide = {
  ...metadata,
  icon: IconSlide,
  edit: Edit,
  save: Save,
  // deprecated,
};

export default Slide;