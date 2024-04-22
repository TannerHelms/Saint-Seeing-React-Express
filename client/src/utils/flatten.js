/**
 * Flatten a multidimensional object
 *
 * For example:
 *   flattenObject{ a: 1, b: { c: 2 } }
 * Returns:
 *   { a: 1, c: 2}
 */
export const flattenObject = (obj) => {
    const flattened = {}

    Object.keys(obj).forEach((key) => {
        const value = obj[key]

        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            Object.assign(flattened, { ...flattenObject(value), ...flattened })
        } else {
            if (key.includes("Image") && !value.includes("http")) {
                flattened[key] = import.meta.env.VITE_SERVER_URL + value;
            } else {
                flattened[key] = value
            }
        }
    })

    return flattened
}