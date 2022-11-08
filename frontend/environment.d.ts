declare namespace NodeJS {
    export interface ProcessEnv {
        readonly NEXT_PUBLIC_SERVER_URL: string;
        readonly NEXT_PUBLIC_API_URL: string;
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
