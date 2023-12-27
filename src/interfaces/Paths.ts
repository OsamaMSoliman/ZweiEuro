const Paths = ["/", "/login", "/upload", "/table", "/grid", "*"] as const;

export type TPath = (typeof Paths)[number];