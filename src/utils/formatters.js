export function capitalizeFirstLetter(string) {
    return string.length ? string.charAt(0).toUpperCase() + string.slice(1) : '';
}

export function formatTemperature(value) {
    return `${value.toFixed()}°`
}

export function getWindDirection(degrees) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return directions[Math.floor(Math.round(degrees % 360) / 45)];
}
