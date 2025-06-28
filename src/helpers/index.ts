export function isJsonObject(value: unknown): boolean {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function flatErrorMessages(error: any, defaultMessage: string = ''): string {
    if (isJsonObject(error) && error) {
        return Object.values(error).flat().join('<br />');
    }
    return error || defaultMessage;
}