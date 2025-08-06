import metadata from "./block.json"
import Edit from "./edit"
import Save from "./save"
import IconSlider from "./icon"
import "./style.scss"

const Slider = {
  ...metadata,
  icon: IconSlider,
  edit: Edit,
  save: Save,
}

export default Slider
