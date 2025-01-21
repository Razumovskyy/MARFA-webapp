export const getUnitsTargetValue = (targetValue: string) => {
  return targetValue === "volume absorption coefficient" ? "km<sup>-1</sup>" : "cm<sup>2</sup>"
}