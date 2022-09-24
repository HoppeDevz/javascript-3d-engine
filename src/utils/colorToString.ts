import { Color } from "../classes/color";

export function colorToString(color: Color) {

    return `rgba(${color.r},${color.g},${color.b},${color.a})`;
}