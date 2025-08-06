import { registerBlockType } from "@wordpress/blocks";
import Card from "./card";
import DynamicCard from "./dynamic-card";
import Slide from "./slide"
import Slider from "./slider"
import ImageCarousel from "./image-carousel"

registerBlockType("blocks/card", Card);
registerBlockType("blocks/dynamic-card", DynamicCard);
registerBlockType("blocks/slide", Slide);
registerBlockType("blocks/slider", Slider);
registerBlockType("blocks/image-carousel", ImageCarousel);
