




















export function imageLoader({
    src,
    width,
    quality = 75
}: {
    src: string,
    width: number,
    quality?: number
}): string {
    return `${src}?w=${width}&q=${quality}`
}