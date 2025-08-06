import metadata from "./block.json"
import Edit from "./edit"
import Save from "./save"
import IconImageCarousel from "./icon"
import "./style.scss"

const ImageCarousel = {
  ...metadata,
  icon: IconImageCarousel,
  edit: Edit,
  save: Save,
}

export default ImageCarousel
