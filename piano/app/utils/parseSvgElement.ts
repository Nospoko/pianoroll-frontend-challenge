const parseSvgElement = (svgString: string): Element => {
  return new DOMParser().parseFromString(svgString, "image/svg+xml")
    .firstChild as Element;
};
export default parseSvgElement;
