const Paths = ["/", "/login", "/upload", "/table", "/grid", "*"] as const;

export type TPath = (typeof Paths)[number];

export function isTPath(value: string): value is TPath {
    return Paths.includes(value as TPath);
}